# Webpack

## 웹팩시작하기

> 강의에선 웹팩 4버전 사용

```
npm i webpack@4 webpack-cli -D
```

- 웹팩과 웹팩 cli 설치
  - 웹팩 cli는 웹팩을 터미널 명령어로 사용할 수 있게 해줌.

```
"devDependencies": {
  "webpack": "^4.46.0",
  "webpack-cli": "^4.10.0"
}
```

<br>

**mode**

- 개발용 환경일 경우 Development,
- 운영용 환경일 경우 Production

**entry**

- 모듈이 시작되는 시작점

**output**

- entry를 통해서 웹팩의 모든 모듈을 합치고, 결과를 저장하는 경로를 설정하는 곳

`node_modules/.bin/webpack --help`명령어 입력시 기본 설정 명령어를 알려줌

```
//
// 다음과 같이 3가지 옵션 선택함
node_modules/.bin/webpack --mode development  --entry ./src/app.js --output-path dist/main.js
```

![웹팩생성](/screen/%EC%9B%B9%ED%8C%A9%EC%83%9D%EC%84%B1.png)

- 웹팩생성결과는 다음과 같이 뜸

<br>

```
  <script type="module" src="./dist/main.js/"></script>
```

- `index.html`에 웹팩생성 결과 output으로 설정했던 `dist/main.js`를 경로로 지정해놓고 브라우저 열어보면 이전과 동일한 결과 확인 가능

<br>

---

<br>

### webpack.config.js

> 매번 이렇게 긴 명령어를 터미널에 입력하긴 힘듦, webpack.config.js 생성

```JS
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
};
```

- output은 두 개의 인자가 옴
  - path는 절대경로를 지정해주는데, node의 path module을 가져와서 지정
  - filename은 위의 main.js와 동일함. 즉 번들링 된 파일명임.
  - `[name].js`의 name은 main이라는 값으로 치환 될 예정
  - 이렇게 지정하는 이유는, entry과 여러 개 일 수 있음.
    - 그에 맞는 output도 여러 개 일 것. 이를 동적으로 지정해주기 위함임.

<br>

## webpack을 npm script에 등록하기

package.json에 가서

```
{
/...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "bulid": "webpack"
  },
/...
}

```

- `npm run build` 눌러서 실행
