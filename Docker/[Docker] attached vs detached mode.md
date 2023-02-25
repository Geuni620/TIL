# Docker

### docker start와 docker run의 차이

```DOCKER
docker run -p 3000:80 ImageID

docker start nameID 또는 ContainerId
```

- 참고로 docker run은 image 기반으로 새 컨테이너를 띄우는 명령어
- docker start는 기존에 존재하는, 중지된 컨테이너를 다시 띄우는 명령어

<br>

### attached mode vs detached mode

> 프로세스에서 막히고 안막히는 차이

- docker run -p 3000:80 ImageID로 작성했을 땐 터미널이 막힘.

  - 터미널에서 다음 동작을 실행시킬 수 없음 → 다른 터미널을 열어서 작업해야함
  - 터미널에서 log를 확인할 수 있음
  - attached모드가 default임

![docker attached](../screen/docker%20run%20attached%20mode.png)  
attached mode로 실행되었을 땐 터미널이 막힘

<br>

- 만약 attached → detached 모드로 변경하고 싶다면 `-d`를 추가해주면 됨.

```DOCKER
docker run -p 3000:80 -d ImageID
```

<br>

- 이렇게 detached 모드로 실행했다가, 다시 attached로 변경하고 싶다면, 다음과 같이 입력하면 됨

```DOCKER
docker attach Name or ContainerID
```

### docker start nameID는 detached mode가 디폴트.

- detached모드가 default임, 아래와 같이 입력하면 detached로 실행 됨

```DOCKER
docker start Name
```

- 여기서 log를 확인할 수 있는 방법은 총 두 가지 있음

```
// 위에서 봤듯이 attached로 변경
docker attach Name or ContainerID

// logs
docker logs Name
```

![docker logs](../screen/docker%20logs.png)

위 캡처와 다르게 로그를 계속 확인하고 싶다면 follow mode를 실행시키면 됨

```DOCKER
docker logs -f Name
```

![docker logs follow](../screen/docker%20logs%20follow%20mode.png)

follow mode 로 실행하면 위 캡처와 같이 log를 확인할 수 있음

<br>

- 마지막으로 `docker start Name` → `docker logs -f Name` → `docker stop Name`
- 위와 같은 순서로 진행되었다가 docker를 정지시켰다고 가정해보자. `docker stop Name`
- 이때 다시 follow mode로 실행시키고 싶다면 이렇게 작성하면 됨

```DOCKER
docker start -a Name
```
