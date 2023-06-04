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
