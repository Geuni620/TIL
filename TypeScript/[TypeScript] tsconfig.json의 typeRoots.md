# TypeScript

## tsconfig.json의 typeRoots

- typeScirpt에서 라이브러리로 axios를 설치했다고 가정해보자
  - axios를 설치하고 나면 node_modules > axios > lib > index.d.ts
  - 해당위치에 들어가면 axios에 관련된 타입이 모두 정의되어 있음.

<br>

- 하지만 라이브러리의 타입이 정의되어 있지 않을 경우도 있음 (js기반 라이브러리, 또는 typescript로 제공하지 않는 경우)
  - 이럴경우라면 npm 공식홈페이지에서 `@type/라이브러리명`을 검색해서 정의되어 있는 타입이 있다면 npm으로 설치
  - 그것마저 없다면 정의를 해주어야 함.

```JSON
// tsconfig.json
{
  "compilerOptions": {
    //...
    "typeRoots": ["./node_modules/@types", "types"]
  },
}
```

- typeRoots는 기본적으로 `./node_modules/@types`안에서 타입을 찾아나감
- 하지만 node_modules안에 해당하는 타입이 없다면,

  - src폴더밖에 types라는 폴더를 만들기
  - types > 해당 라이브러리명 > index.d.ts 폴더 생성
  - index.d.ts안에 declare 선언하고 타입정의

  ```TS
  declare module "chart.js" {
   interface Mychart {
    //.. 타입정의
   }
  }
  ```

  <br>

## tsconfig.json lib 적용

![tsconfig.json lib 적용](/screen/tsconfig.json%20lib%EC%A0%81%EC%9A%A9.png)

> 다음과 같은 에러가 떴을 때 tsconfig.json의 lib를 적용해서 해결해보자

- tsconfig.json에 lib의 내용을 보면 배열형태로 사용할 라이브러리들을 정의하고 있음.
- lib를 정의하지 않았다면 target 항목에서 지정한 ECMAScript의 버전에 따라 기본값이 정의 됨.

```
ES5의 기본 값: dom, es5, scripthost
ES6의 기본 값: dom, dom.iterable, es6, scripthost
```

- 위의 기본 값 대신에 커스텀하게 라이브러리를 쓰려고 할 때, lib을 정의하여 사용함.

- 현재 진행 중인 프로젝트의 target은 ES5임
  - 하지만 작성한 코드나, 코드에서 참조하는 모듈들(node_modules)에서 ES6에 등장한 Promise를 사용하려면 lib에 추가적인 적용을 해주어야함
  - 위 캡처에서 에러가 뜬 이유도 `ES5`로 target이 정의되어있었으나, `async await`은 ES6 문법이기 때문에 에러를 발생시킴
- lib를 적용하여 컴파일에 포함될 파일을 추가해주면 됨

```JSON
{
  "compilerOptions": {
    //...
    "target": "ES5",
    "lib": ["ES2015", "DOM", "DOM.Iterable"]
  },
}
```

### 참고자료

https://norux.me/59  
https://joshua1988.github.io/ts/config/tsconfig  
tsconfig.json lib
