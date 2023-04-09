# Webpack

> React 사용자에겐 CRA가 굉장히 익숙하다.  
> 하지만, CRA보다 훨-씬 빠르다고 주장하는 Vite를 사용해보고 싶었다.  
> 간단한 To-do-App을 만들어보며 firebase 환경변수를 설정하는데 기존의 CRA와는 조금 다른 방식이란 것을 알게 됐고, 해당내용을 기록해두려고 한다.

<br>

## Vite 환경변수 설정 방법

.env 파일

```
VITE_FIREBASE_APIKEY="foo"
VITE_FIREBASE_AUTHDOMAIN="foo"
VITE_FIREBASE_PROJECTID="foo"
VITE_FIREBASE_STORAGEBUCKET="foo"
VITE_FIREBASE_MESSAGINGSENDERID="foo"
VITE_FIREBASE_APPID="foo"
VITE_FIREBASE_MEASUREMENTID="foo"
```

App.jsx

```JSX
const {
  VITE_FIREBASE_APIKEY,
  VITE_FIREBASE_AUTHDOMAIN,
  VITE_FIREBASE_PROJECTID,
  VITE_FIREBASE_STORAGEBUCKET,
  VITE_FIREBASE_MESSAGINGSENDERID,
  VITE_FIREBASE_APPID,
  VITE_FIREBASE_MEASUREMENTID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_FIREBASE_APIKEY,
  authDomain: VITE_FIREBASE_AUTHDOMAIN,
  projectId: VITE_FIREBASE_PROJECTID,
  storageBucket: VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGINGSENDERID,
  appId: VITE_FIREBASE_APPID,
  measurementId: VITE_FIREBASE_MEASUREMENTID,
};
```

- React CRA에선 `REACT_APP_`을 prefix로 써야 리액트 앱이 설정을 인식할 수 있음
- 그리고 앱에서 `process.env.`으로 접근하여 사용할 수 있었음

<br>

- Vite는 dotenv 패키지를 설치하지 않아도 됨
- **prefix를 `VITE_`로 적어주어야 함**
- 앱에서는 `import.meta.env.`로 접근할 수 있음

<br>

### 참고자료

[Vite 공식문서](https://vitejs-kr.github.io/guide/env-and-mode.html#env-files)

[vite에서 환경변수 .env 설정하기](https://velog.io/@riley_dev/React-vite%EC%97%90%EC%84%9C-%ED%99%98%EA%B2%BD%EB%B3%80%EC%88%98-.env-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
