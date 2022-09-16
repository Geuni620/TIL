# Webpack

> 사이드프로젝트로 진행 중인 [wesalad](https://wesalad.net/)에서 백엔드분께 빌드시간을 측정해달라고 부탁드린 결과 12분 09초가 나옴.  
> sourcemap을 false로 설정하고 09분 05초로 줄일 수 있었음.

<br>

### sourcemap이란?

- 배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜주는 기능.
- 서버에서 배포할 때 성능 최적화를 위해 build를 하는데 이 build한 파일에서 에러가 난다면 디버깅을 해야함.
- sourcemap을 이용해 배포용 build 파일의 특정 부분이 원본 소스의 어떤 부분인지 확인 할 수 있음.

<br>

### false로 설정해야하는 이유

- 내부 코드가 노출 됨
  - 내부 코드가 그대로 노출되고, 난독화의 이점을 모두 상실 함.
- 빌드시 메모리 부족 이슈가 발생할 수 있음
  - 규모가 큰 프로젝트인 경우, 빌드 시 sourcemap까지 생성한다면 메모리 부족 현상이 일어날 수 있음

<br>

### 적용 방법

```JSON
"scripts": {
  "start": "GENERATE_SOURCEMAP=false craco start",
  "build": "GENERATE_SOURCEMAP=false craco --max_old_space_size=4096 build",
  "test": "craco test"
},
```

- 현재 우리 프로젝트에선 craco를 적용했음.
  - antd에서 alert 문구 폰트크기를 조정하려고 시도했고, antd 공식문서에서 craco를 적용해야한다는 키워드를 얻음.
- `GENERATE_SOURCEMAP=false`로 적용
- 참고로 `--max_old_space_size=4096`은 node V8엔진의 메모리 힙 공간을 늘려주는 기능을 함.
  - 예를 들면 메모리가 2GB인 시스템에서 `--max_old_space_size=1024`로 설정하여 다른 용도를 위해 일부 메모리를 남겨두고 스와핑을 방지해줌.

<br>

### 참고자료

[React build 시 sourcemap 제거하기](https://velog.io/@racoon/React-build-%EC%8B%9C-sourcemap-%EC%A0%9C%EA%B1%B0%ED%95%98%EA%B8%B0)
[[React] 소스 맵(Source Map)](https://24hours-beginner.tistory.com/253)
[How do I determine the correct "max-old-space-size" for node.js?](https://stackoverflow.com/questions/48387040/how-do-i-determine-the-correct-max-old-space-size-for-node-js)
