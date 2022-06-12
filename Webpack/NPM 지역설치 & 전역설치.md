# Webpack

> Node.js와 NPM에 대해서 배워보자

### NPM 지역설치

```
// 두 개는 동일함.
npm install jquery --save-prod
npm i jquery
```

- 설치를 완료하면 프로젝트 폴더안에 `node_modules`라는 폴더가 생기고 그 폴더 아래에 해당 라이브러리 파일들이 설치되어 있음

### NPM 전역설치

```
// gulp라는 걸 설치해보자
// 두 개는 동일함.
npm install gulp --global
npm install gulp -g
```

- NPM 전역 설치는 라이브러리를 불러올 때 사용하는 것이 아니라 시스템(내 컴퓨터)내에 설치하는 것
- 경로는 mac의 경우 다음과 같음
  - `/usr/local/lib/node_modules`

### 지역설치 옵션 두 가지

```
// package.json의 dependencies에 등록
npm install jquery --save-prod
npm i jquery

// 또는

// package.json의 devDependencies에 등록
npm install jquery --save-dev
npm i jquery -D
```

- 둘의 차이점은 다음과 같음

<br>

### 개발용 라이브러리와 배포용 라이브러리 구분하기.

- NPM 지역설치 할 때는 라이브러리가 배포용인지, 개발용인지 꼭 구분할 것!
- jquery와 같이 **화면 로직과 직접적으로 관련된 라이브러리**는 배포용으로 설치
  - npm run build로 빌드를 하면 최종 애플리케이션 코드 안에 포함 됨.
- -D를 주었다면 해당 라이브러리는 빌드하고 배포할 때 애플리케이션 코드에서 빠지게 됨.
  - 즉, **최종 애플리케이션에 포함되어야 하는 라이브러리는 -D로 설치하면 안됨**
  - 개발할 때만 사용하고 배포할 때는 빠져도 되는 라이브러리는 다음과 같음
    1. webpack : 빌드도구
    2. exlint : 코드 문법 검사 도구
    3. imagemin : 이미지 압축 도구

<br>

### 참고자료

https://www.inflearn.com/course/%ED%94%84%EB%9F%B0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%9B%B9%ED%8C%A9/dashboard
