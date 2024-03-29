### react 프로젝트 만들기

```
create-react-app react-docker-yt
```

<br>

```DOCKER
FROM node:18.15.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

<br>

### docker build 하기

```
// . 찍으면 root를 기준으로 Dockerfile을 찾는다.
docker build .
```

<br>

### build 됐는지 확인하기

```
// 둘은 똑같은 결과물을 보여줌.
docker image ls
docker images
```

<br>

### 방금 build한 것은 삭제하고 이미지 이름을 넣어서 build 해보자

```
// 방금 이름없이 생성된 이미지 삭제
docker image rm 35f840f6e74d

// react-image라는 이름으로 build
docker image -t react-image .
```

<br>

### 이미지는 만들었으니 이제 컨테이너를 만들어보자.

```
// docker run -d --name <컨테이너 이름> <이미지 이름>
docker run -d --name react-app react-image
```

- -d 옵션은 detached 모드이고, 이건 TIL 참고

<br>

```
// 실행 중인 컨테이너를 확인할 수 있음.
docker ps

// 만약 모든 컨테이너를 확인하고 싶다면
docker ps -a
```

<br>

- 하지만 localhost:3000으로 들어가면 연결되지 않음

<br>

- 컨테이너는 호스트 환경과 격리된 파일 시스템과 네트워크를 가지기 때문
- 호스트에서 컨테이너로 접근 가능하도록 포트 포워딩을 시켜줘야 한다.

### 다시 연결시켜보자

```
// 기존 docker container 삭제
docker rm react-app -f
```

<br>

```
// 아까 입력한 건 이거.
docker run -d --name  react-app react-image

// -p 옵션을 추가해주자, -p <호스트 포트>:<컨테이너 포트>
docker run -d --name  react-app -p 3307:3000 react-image
```

- 호스트 포트를 3307으로 줬음
- localhost:3307번 포트로 접근하는 모든 트래픽을 도커 컨테이너의 3000으로 보낸다는 뜻.
  - 즉, 3307로 접근하면 된다. → 도커 3000번으로 접근하는 것과 같음.
- `EXPOSE의 역할은 뭐지??`

<br>

### docker container 터미널 환경으로 접속해보기

```
// docker exec -it <컨테이너 이름> bash
docker exec -it react-app bash
```

- 접속한 후 ls를 눌러보면 개발환경의 모든 파일이 복사되었는지 확인할 수 있음.
- 불필요한 것까지 복사되었음 (node_modules, package-lock.json 등)

<br>

### dockerignore

```
// .dockerignore 파일을 만들어서 불필요한 파일들을 제외시킬 수 있음.
node_modules
Dockerfile
.git
.gitignore
.dockerignore
.env
```

- 기존 컨테이너 / 이미지를 모두 제거하고 다시 build하고 컨테이너 띄우기

```
docker rm react-app -f
docker image rm react-image -f
docker build -t react-image .
docker run -d --name react-app -p 3000:3000 react-image

// 이제 ls 찍어서 확인해보기
docker exec -it react-app bash

// 단 node_modules는 복사되어있는데, 이건 컨테이너 내부에서 npm install 한 결과임
```

<br>

### 코드 변경 후 컨테이너의 프로젝트 업데이트하기

```
// 기존 로컬 App.js를 업데이트한 후
docker exec -it react-app bash
cd src

cat App.js
// 코드가 업데이트 되지 않았음

```

<br>

```
// docker container 종료하기
docker rm react-app -f

// re-build → container 다시 만듦
docker build -t react-image .
docker run -d --name react-app -p 3000:3000 react-image
```

- 더 쉬운 솔루션이 필요함

<br>

### docker Volume & bind mount

```
// docker run -d --name <컨테이너 이름> -v <호스트 디렉토리>:<컨테이너 디렉토리> <이미지 이름>
docker run -d --name react-app -v $(pwd)/src:/app/src -d -p 3000:3000 --name react-app react-image
```

- local dir과 docker container로 띄운 app dir를 동기화시킴

<br>

```
docker exec -it react-app bash
cd src/
touch hello // 도커 컨테이너 내부에 파일을 만듦


exit

docker rm react-app -f // 그리고 hello 파일도 삭제할 것.
```

- 의도치 않게 컨테이너 환경에서 소스 코드를 수정할 수 있음.
- 이 경우 도커 컨테이너에서 호스트를 수정하지 못하도록 읽기 전용 모드를 사용하면 양방향 Sync에서 호스트 → 컨테이너로 동기화 됨

<br>

```
// :ro를 추가해서 읽기전용으로 만듦
docker run -d --name react-app -v $(pwd)/src:/app/src:ro -d -p 3000:3000 --name react-app react-image

docker exec -it react-app bash
cd src
touch hello // 에러 발생, touch: cannot touch 'hello': Read-only file system
```

<br>

### docker Environment Variables

- .env 파일로 설정

```
docker run --env-file ./.env -d --name react-app -v $(pwd)/src:/app/src:ro -d -p 3000:3000 --name react-app react-image
```

<br>

### docker-compose

`docker-compose.yml`

```YML
# docker 컨테이너 버전을 명시
version: "3"

# services는 컨테이너
services:
  react-app:
    # 현재 경로에 이미지 빌드
    build: .
    # 포트 포워딩
    ports:
      - "3000:3000"
    # 호스트 디렉토리에 바인드 마운트
    volumes:
      - ./src:/app/src:ro
    # 환경 변수 설정
    env_file:
      - ./.env
```

<br>

```
// docker-compose.yml 명시된 모든 서비스 컨테이너를 생성하고 실행시켜주는 명령어
docker-compose up -d

// 모든 서비스 컨테이너를 한 번에 정지시키고 삭제한다.
docker-compose down
```

<br>

Dockerfile에 명시된 사항이 변경되었음

```
FROM node:18.15.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV REACT_APP_NAME="Add text"
EXPOSE 3000
CMD ["npm", "start"]
```

- 이 경우 docker-compose는 image를 다시 빌드하지 않는다.

<br>

- 새로운 ENV 속성이 추가 되었다는 것을 docker-compose에 알려주어야함.

```
docker-compose up -d --build
```

<br>

### Production Environment

- Dockerfile.dev와 Dockerfile.prod를 분리한다.
- Dockerfile은 Dockerfile.dev로 이름을 변경한 후

```
// 다시 build 시켜준다.
 docker build -f Dockerfile.dev .

// docker-compose.yml
# docker 컨테이너 버전을 명시
version: "3"

# services는 컨테이너
services:
  react-app:
    # -it 옵션을 위해 사용됨 (표준입출력), 사용중인 도커파일의 경우 -it 넣는것과 같은 효과
    # stdin_open: true
    # tty: true
    # 현재 경로에 이미지 빌드
    <!-- 여기를 변경시켜줘야한다. -->
    build:
      context: .
      dockerfile: Dockerfile.dev
    # 포트 포워딩
    ports:
      - "3000:3000"
    # 호스트 디렉토리에 바인드 마운트
    volumes:
      - ./src:/app/src:ro
    # 환경 변수 설정
    env_file:
      - ./.env

```

<br>

```
// Dockerfile.dev
FROM node:18.15.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV REACT_APP_NAME="Add text"
EXPOSE 3000
CMD ["npm", "start"]

// Dockerfile.prod
FROM node:18.15.0 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
```

- 그리고 command에 다음과 같이 입력

```
docker build -f Dockerfile.prod -t docker-image-prod .
```

<br>

```
 docker run --env-file ./.env -d --name react-app -v -d -p 8000:80 --name react-app-prod docker-image-prod
```

- production server에 띄우고 나서는 해당 코드를 변경해도 코드가 변경되지 않는다.

<br>

```
docker rm docker-image-prod
```

<br>

###

```
// dev를 docker로 띄움
 docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d --build

 // dev를 down 시킴
 docker-compose -f docker-compose.yml -f docker-compose-dev.yml down

 // prod를 docker로 띄움
  docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build
```
