# Docker

### 컨테이너 삭제하기

```DOCKER
docker rm containerID

// 실행 중인 컨테이너를 제거하려 했을 때
Error response from daemon: You cannot remove a restarting container.
Stop the container before attempting removal or force remove
```

- 위 명령어로 컨테이너를 제거할 수 있음.
- 단, 실행 중인 컨테이너를 제거하려 하면 제거할 수 없다고 에러가 뜸.
- 따라서 `docker stop` 이후에 `docker rm`으로 컨테이너를 제거할 수 있음.

<br>

### 이미지 삭제하기

```DOCKER
// ps 명령은 컨테이너를 리스팅해줌.
docker ps

// images 명령은 이미지를 리스팅해줌.
docker images
```

<br>

- 리스팅 이후 필요없는 image를 제거하고 싶다면

```DOCKER
docker rmi imageID
```

- 이것 또한 이미지를 기반으로 컨테이너가 실행 중일 경우 제거할 수 없음.
- 중지했다고 이미지를 바로 지울 수 있는 것도 아님.
- 따라서 컨테이너를 중지한 이후, 컨테이너를 제거하고 → 이미지를 제거하여야 함.

<br>

```DOCKER
// docker images가 아니라
docker image prune
```

- 만약 현재 실행 중인 컨테이너에서 사용되지 않는 모든 이미지를 제거하기 위해선 위 명령어를 실행하면 됨.

<br>

### 중지된 컨테이너 자동 제거하기

```DOCKER
 docker run -p 3000:80 -d --rm 3eda4e2c1e28(ImageID)
```

- `--rm` 플래그를 넣어줌으로써 docker 컨테이너가 종료될 때마다 컨테이너가 알아서 제거되도록 할 수 있음.
- 이렇게 실행된 컨테이너를 stop 했을 때 `docker ps -a`로 컨테이너 리스팅 해보면, 중지했던 컨테이너는 알아서 제거되어 있음.

<br>

### 그 외

```DOCKER
docker image inspect ImageID
```

- 위 명령어를 통해 이미지에 대한 정보가 길게 출력 됨.
  - 이미지 전체 ID, 생성된 날짜와 시간, 노출될 포트, 사용 중인 도커 버전, 사용 중인 운영체제,
