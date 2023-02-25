# Docker

## 컨테이너로 변환하기

```LINUX
docker build .
```

- Dockerfile을 기반으로 새 커스텀 이미지를 빌드하도록 도커에게 지시.
- 마지막 .은 경로표시, 명령을 실행하는 동일한 폴더에서 Dockerfile이 존재함을 알림.

<br>

```LINUX
docker run imageID
```

- 컨테이너가 시작되며 완료되지 않고 계속 실행되는 것을 볼 수 있는데, 그 이유는 노드 서버를 시작하기 때문

```DOCKER
CMD ["node", "server.js"]
```

<br>

- 하지만, localhost를 방문하면, Dockerfile에 포트를 노출했는데도 불구하고 표시되지 않음.

```LINUX
// 실행중인 목록 확인
docker ps

// 컨테이너 종료
docker stop containerID
```

- localhost에 표시되게 하기 위해선, 하나의 옵션을 추가해주어야함

```LINUX
docker run -p 3000:80 imageID
```

- 여기서 -p 플래스를 넣었음, 이는 publish를 나타냄
- 이를 통해 도커에서 어떤 로컬 포트가 있는지 알려줄 수 있음.
- 우리의 로컬 머신의 어떤 포트가 이 내부의 도커 특정 포트에서 액세스 할 수 있는지 알려줘야함.
- 즉, `엑세스하려는 로컬 포트:내부 도커 컨테이너 노출포트`를 넣어줄 것
- 이 경우엔 액세스하려는 로컬 포느는 3000, 내부 도커 컨테이너 노출포트는 위에서 작성한 80을 넣어줌.
