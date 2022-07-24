# Webpack

## 웹팩이란?

- 최신 프런트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러

## 모듈번들링이란?

- 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javscript, Images 등)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구를 의미

## 모듈 번들링이란?

- 웹 애플리케이션을 구성하는 몇십, 몇백개의 자원들을 하나의 파일로 병합 및 압축 해주는 동작

## 웹팩 시작하기

```
"scripts": {
  "build": "webpack --mode=none"
}
```

- package.json 안에 script에 build를 추가

  - `npm run build` 실행
  - dist 폴더 생성 되고 안에 `main.js`가 생성됨
  - 만약 `"build": "webpack"`만 작성하고 **mode를 넣지 않으면**, `dist > main.js`의 파일을 열었을 때 알아볼 수 없는 문자로 나옴.

<br>

- 웹팩에 세부사항을 입력할 땐 `webpack.config.js` 파일로 관리할 수 있음

  ```
  // webpack.config.js
  // `webpack` command will pick up this config setup by default

  var path = require('path');
  module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(\_\_dirname, 'dist')
    }
  };
  ```

* 그리고 package.json에서 mode부분은 webpack.config.js에 적혀있으니 아래처럼만 적어주면 됨

  ```
  "scripts": {
    "build": "webpack"
  }
  ```

<br>

## 웹팩 적용하기 전 후 index.html 비교

> 화면상의 큰 차이는 없음.

- 크롬 네트워크창에서 웹팩 적용 전 후를 비교해보면, 웹팩 적용한 이후 네트워크로 요청하는 횟수(request)가 더 **적음**
- 요청할 때 자바스크립트 파일이 여러 개일 경우 웹팩이 하나로 합쳐서 통으로 요청 1번을 보냄

  - 즉 웹팩을 쓰지않으면 자바스크립트 파일이 여러 개 일 경우, 요청을 여러 번 보내야하지만 웹팩을 이용하면 자바스크립트 파일을 하나로 합쳐주기 때문에 요청을 1번 보내면 됨

<br>

### 참고자료

https://joshua1988.github.io/webpack-guide/
