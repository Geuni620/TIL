# 초기 세팅

## next js 초기세팅 error

> next js 초기세팅은 다음과 같이 했음.  
> 13버전이 아닌 12버전 기준 eslint prettier tsconfig.

```JSON
tsconfig.json
{
  "compilerOptions": {
    "allowJs": true, // JS파일의 컴파일을 허용
    "alwaysStrict": true, // strict mode에서 파싱하고 각 소스 파일에 대해 "use strict"를 내보냅니다.
    "esModuleInterop": true, // 기본 값, /* 모든 imports에 대한 namespace 생성을 통해 CommonJS와 ES Modules 간의 상호 운용성이 생기게할 지 여부,  'allowSyntheticDefaultImports'를 암시적으로 승인합니다. */
    "forceConsistentCasingInFileNames": true, // 동일 파일 참조에 대해 일관성 없는 대소문자를 비활성화합니다.
    "isolatedModules": true, // false	추가 검사를 수행하여 별도의 컴파일 (예를 들어 트랜스파일된 모듈 혹은 @babel/plugin-transform-typescript) 이 안전한지 확인합니다.
    "jsx": "preserve",
    "lib": ["dom", "dom.iterable", "esnext"], // 컴파일에 포함될 파일목록
    "module": "esnext",
    "moduleResolution": "node", // 모듈 해석 방법 결정. Node.js/io.js 스타일 해석의 경우, "Node" 또는 "Classic" 중 하나.
    "noEmit": true, // 결과 파일 내보낼지 여부
    "resolveJsonModule": true, // .json 확장자로 import된 모듈을 포함합니다.
    "skipLibCheck": true, // 모든 선언 파일(*.d.ts)의 타입 검사를 건너뜁니다.
    "strict": true, // 모든 엄격한 타입 검사 옵션을 활성화합니다.
    "target": "es5", // ECMAScript 대상 버전 지정
    "baseUrl": ".",
    "paths": { // /* 'baseUrl'를 기준으로 불러올 모듈의 위치를 재지정하는 엔트리 시리즈 */
      "#/*": ["./src/*"]
    },
    "noUnusedLocals": true, // 사용하지 않는 지역변수 에러보고 여부
    "noUnusedParameters": true, // 사용되지 않은 파라미터에 대한 에러보고 여부
    "noImplicitAny": true // // any 타입으로 암시한 표현식과 선언에 오류를 발생시킴
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "next.config.js"],
  "exclude": ["node_modules"]
}
```

[tsconfig.json 컴파일 옵션 정리](https://geonlee.tistory.com/214)
[컴파일러 옵션 (Compiler Options)](https://typescript-kr.github.io/pages/compiler-options.html)

<br>

```JSON
// eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended", // ESLint 공식문서에서 권장하는 규칙들이 적용된 옵션
    "plugin:react/recommended", // React 권장 설정 옵션(react-hooks 플러그인이 추가되었으므로 해당 확장 옵션을 통해 규칙을 적용해준다.)
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended",
    "next/core-web-vitals", // 이 옵션은 Next.js에서 ESLint를 구성 시, 기본으로 제공되는 옵션이다.
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "simple-import-sort"
  ],
  "ignorePatterns": ["node_modules/*", ".next/*"],
  "rules": {
    "no-empty": "warn", // 빈칸 있을 시 error
    "react-hooks/exhaustive-deps": "warn", // useEffect내에 사용하고 있는 state를 배열안에 추가시켜 달라는 의미입니다.
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "react/react-in-jsx-scope": "off", // 리액트 17 부터 import React from 'react'문을 쓰지 않아도 되는데 ESLint가 잔소리하는 문제
    "react/prop-types": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ]
  },
  "settings": {}
}
```

[Next.js + TypeScript + ESLint + Prettier + 절대경로 + styled-components + Recoil + React Query 프로젝트 세팅](https://velog.io/@bjy100/Next.js-Next.js-TypeScript-ESLint-Prettier-%EC%A0%88%EB%8C%80%EA%B2%BD%EB%A1%9C-styled-components-Recoil-React-Query-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%84%B8%ED%8C%85)
[ESLint 사용 시 React import문 생략하기](https://velog.io/@100pearlcent/ESLint-%EC%82%AC%EC%9A%A9-%EC%8B%9C-React-import%EB%AC%B8-%EC%83%9D%EB%9E%B5%ED%95%98%EA%B8%B0)
[ESLint의 no-unused-vars 규칙과 typescript 인터페이스 충돌 해결!](https://blog.pumpkin-raccoon.com/79)

<br>

```js
next.config.js;
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // babel 안쓰고 swc로 build할 때 훨씬 속도가 빠름
};

module.exports = nextConfig;
```

[NextJS Babel에서 SWC로 이사가기](https://kir93.tistory.com/entry/NextJS-Babel%EC%97%90%EC%84%9C-SWC%EB%A1%9C-%EC%9D%B4%EC%82%AC%EA%B0%80%EA%B8%B0)
[next js 공식문서 swc styled components 적용](https://nextjs.org/docs/advanced-features/compiler#styled-components)

<br>

### 그 외 참고자료

[나만의 포트폴리오 제작기](https://velog.io/@junghyeonsu/%EB%82%98%EB%A7%8C%EC%9D%98-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4-%EC%A0%9C%EC%9E%91%EA%B8%B0)
[Next.js + Typescript 초기세팅 하기](https://velog.io/@devstone/Next.js-Typescript-%EC%B4%88%EA%B8%B0%EC%84%B8%ED%8C%85-%ED%95%98%EA%B8%B0)

<br>

### 그리고 발생한 에러

![nextjs error](../screen/nextjs%20error.png)

```JSON
// eslintrc.json
{
  "extends": [
    "plugin:@next/next/recommended",
    "next/core-web-vitals", // 이 옵션은 Next.js에서 ESLint를 구성 시, 기본으로 제공되는 옵션이다.
    // 여기 이 내용이 겹친다고 error가 발생
  ],
}
```

`next/core-web-vitals`가 기본 제공하는 옵션이니, 제거해줬고 에러 해결.
