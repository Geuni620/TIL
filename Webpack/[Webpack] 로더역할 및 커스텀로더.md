# Webpack

## 로더의 역할

- 웹팩은 모든 파일을 모듈로 바라봄.
- 자바스크립트로 만든 모듈 뿐만아니라 스타일시트, 이미지, 폰트까지도 전부 모듈로 보기 때문에 import 구문을 사용하면 자바스크립트 코드 안으로 가져올 수 있음
  - 이것이 가능한 이유는 웹팩의 로더 덕분.
  - 로더는 타입스크립트 같은 다른 언어를 자바스크립트 문법으로 변환해 주거나 이미지를 data URL 형식의 문자열로 변환.
  - CSS 파일을 자바스크립트에서 직접 로딩 할 수 있도록 해줌.

## 커스텀 로더 만들기

```JS

// my-webpack-loader.js 만들기
module.exports = function myWebpackLoader(content) {
  console.log("로더가 동작함");
  return content;
};


// webpack.config.js module 추가
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 로더가 처리해야할 파일들의 패턴, 정규식, js로 끝나는 모든 파일은 로더로 돌리겠다로 정규식 지정
        use: [path.resolve("./my-webpack-loader")], //
      },
    ],
  },
};
```

- `npm run build` 명령어 입력
  <br>

![](/screen/%EC%BB%A4%EC%8A%A4%ED%85%80%20%EB%A1%9C%EB%8D%94.png)

- app.js가 있고, app.js는 math.js를 가져와서 사용함.
  - 모든 자바스크립트 파일마다 로더가 한번씩 실행되도록 만들었기 때문에 app.js에서 한번, math.js에서 한번 로더 실행됨
- 즉 로더는 웹팩의 각 파일을 처리하기 위해 존재함
  - 처리할 파일의 패턴을 test에 작성하고, 패턴에 걸리는 파일들은 use에 설정한 로더함수가(지금은 my-webpack-loader) 실행되도록 함.

<br>

### 참고자료

https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html#31-%EB%A1%9C%EB%8D%94%EC%9D%98-%EC%97%AD%ED%95%A0
