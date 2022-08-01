# Docker

## Docker 실행하기

```
docker run <이미지이름>

docker run <이미지이름> ls


docker ps
docker ps --format `table${{.Names}}\table${{.Image}}`
```

<br>

## Docker 실행하기

> 두 단계에 걸쳐서 실행

```
docker run <이미지이름>

두 개로 나눌 수 있음
 1. Docker create <이미지이름>
 2. Docker start -a <컨테이너 아이디/이름>
    -a는 도커가 실행될 때, output들을 실행시켜주는 역할 즉, output을 보여주는 역할을 함
```

<br>

## Docker 중지시키기

```
docker stop <중지할 컨테이너 아이디/이름>
docker kill <중지할 컨테이너 아이디/이름>

stop과 kill은 둘 다 docker를 중지시키지만,
stop은 유연하게 중지 (Gracefully)
kill은 바로 중지
```

<br>

## Docker 삭제하기

> 단 docker가 중지되어 있는 경우에만 삭제가능.

```
하나씩 삭제할 경우
docker rm <중지할 컨테이너 아이디/이름>

모두 삭제할 경우
docker rm `docker ps -a -q`

도커 이미지를 삭제하고 싶은 경우
docker rmi <이미지 id>

도커 한번에 이미지, 컨테이너, 네트워크 모두 삭제하고 싶다면,
docker system prune
```

<br>

## 이미 실행중인 컨테이너에 명령어 전달하기

```
실행중인 도커의 컨테이너 아이디를 확인한 후, 아래 명령어를 실행시키면, ls를 통해 실행중인 도커의 디렉토리를 확인할 수 있음.
docker exec <컨테이너 아이디> ls
```

<br>

## 레디스를 이용한 컨테이너 이해

```
1. 터미널 열어서 docker run redis (서버를 작동시킴)
2. 다른 터미널 열어서 redis- cli를 실행
    -> 실행이 안됨, 같은 컨테이너내에서 동작하는 것이 아니기 때문
3. 즉, 같은 컨테이너에서 redis-cli를 실행시켜야 함
    -> 이를 위해 docker exec -it <컨테이너 아이디> redis-cli

* 여기서 it라는 입력어를 추가해주어야 실행 후 동작을 할 수 있음
* it 명령어를 추가하지 않는다면 실행 후 redis-cli만 키고 바로 나와버림
```

<br>

## 실행 중인 컨테이너에서 터미널 생활 즐기기

```
기존에는 실행중인 컨테이너에 명령어를 입력할 시 다음과 같았음
docker exec -it <컨테이너아이디> 명령어

컨테이너 안에 쉘이나 터미널 환경으로 접속해 줄 수 있음.
docker exec -it <컨테이너아이디> sh

sh부분은 sh bash zsh 등등 있지만, sh가 가장 무난함.
sh로 컨테이너 내부 터미널로 접근했다가 다시 나오려면 ctrl + c가 안먹힘
-> ctrl + D로 빠져나올 수 있음.
```

<br>

## docker build시 명령어

```
docker build -t <docker 아이디>/어플리케이션 이름 ./
docker build -t dlrmsgnl620/nodejs ./

그리고 docker 컨테이너 실행
docker run -p 1111:8080 dlrmsgnl620/nodejs
```

- 5000번은 에러가 났음. 다른 PORT 번호를 사용하라는 에러가 발생
