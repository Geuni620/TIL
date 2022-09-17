# Webpack

> eslint와 prettier에 대해서 알아보기

<br>

## ESLint

- 설정 파일의 이름은 항상`.eslintrc`가 되어야하며, 원하는 포맷에 따른 파일 확장자를 사용하면 됨
- `.eslintrc.json`, `.eslintrc.yml`, `.eslintrc.yaml` 등등
- `package.json` 파일의 `eslintConfig` 속성을 통해서 ESLint 설정을 하는 것도 가능
- CRA로 react 프로젝트를 생성해보면 package.json 파일 내에 ESLint 설정을 발견하게 됨

```JSON
{
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  }
}
```

단, `package.json`으로 ESLint 설정하는 것은 소규모의 개인프로젝트라면 몰라도 팀 단위의 프로젝트라면 추천하지 않음.

<br>

### ESLint 프로젝트 셋업

- 매번 터미널에서 ESLint를 실행하는 것은 비현실적일 것.
- 그래서 일반적으로 ESLint를 사용할 때는, 프로젝트 레벨에서 설정을 해두고 사용하는 경우가 대부분.
- 먼저 프로젝트의 전체 파일을 상대로 ESLint를 실행하는 NPM 스크립트를 추가

<br>

```JSON
// package.json
  "scripts": {
    //...
    "lint": "eslint ."
  },
```

- `npm run lint`라고 실행하면 전체 파일을 상대로 ESLint가 실행 됨.
- `.eslintignore` 파일을 생성하여 ESLint를 실행할 때 예외 시킬 파일이나 폴더 지정.
- `node_modules`는 외부 라이브러리의 소스코드를 담고 있기 때문에 린트를 해줄 필요 없음.  
  → 즉 `.eslintignore`에 추가

<br>

### Plugins 옵션

- ESLint에서 기본으로 제공하는 규칙 외에도 추가적인 규칙을 사용할 수 있도록 만들어주는 다양한 플러그인(plugin).
- 플러그인은 설정 파일의 plugins 옵션을 통해 설정함.
- 불러오기(import)와 React와 관련된 규칙은 다음과 같이 추가 할 수 있음.

```
// .eslintrc.json
{
 "plugins": ["react", "import"],
}
```

- 당연히 먼저 프로젝트에 해당하는 플러그인을 개발 의존성으로 설치해놓아야함.
- 보통 ESLint 플러그인의 npm 패키지 이름은 `eslint-plugin-`로 시작함.

<br>

`npm i -D eslint-plugin-import eslint-plugin-react` // 참고로 import, react는 CRA 설치하면 자동으로 설치 됨.

- react는 react 관련 린트를, import는 ES2015+의 import/export 구문을 지원해줌.

<br>

- 플러그인을 설정할 때 단순히 플러그인만 추가해주면 관련 규칙이 바로 활성화된다고 생각할 수 있으나, 그렇지 않음.
- 사실 플러그인은 새로운 규칙을 단순히 설정이 가능한 상태로 만들어주기만 함.
- **규칙을 위반하면 오류를 낼지 경고를 낼지 아니면 해당 규칙을 끌지에 대해서는 `extends` 옵션이나 `rules` 옵션을 통해 추가 설정을 해줘야함.**

<br>

### extends 옵션

> Airbnb에서 npm 저장소에 공개한 ESLint 설정인 eslint-config-airbnb를 기반 설정으로 사용해보자.

```JSON
// .eslintrc.json
{
  "extends": ["airbnb"]
}
```

- 이렇게 확장이 가능한 ESLint 설정은 npm 패키지 이름이 eslint-config-로 시작하여 extends 옵션에 명시할 때는 위와 같이 앞 부분을 생략해도 무방 함.
- 뿐만 아니라 대부분의 ESLint 플러그인은 추천 설정을 제공함.
  - extends 옵션은 이러한 추천 설정을 사용할 때도 사용됨.
  - 위에서 설정한 import, react 플러그인에서 제공하는 추천 설정을 사용해보자
  ```JSON
  // .eslintrc.json
  {
    "plugins": ["import", "react"],
    "extends": ["plugin:import/recommended", "plugin:react/recommended"]
  }
  ```
- 이러한 ESLint의 확장성 덕분에 매 번 백지 상태에서 설정을 하지 않아도 됨.

<br>

### rules 옵션

- 설정 파일에서 rules 옵션은 규칙 하나하나를 세세하게 제어하기 위해서 사용함.
- 일반적으로는 extends 옵션을 통해서 설정된 규칙을 덮어쓰고 싶을 때 유용하게 쓸 수 있음.
- Airbnb 기반 설정에서는, no-console 규칙을 어기면 경고를 내고, import/prefer-default-export 규칙을 어기면 오류를 내도록 되어 있음.
- no-console 규칙을 어겼을 시, 경고 대신 오류를 내고, import/prefer-default-export 규칙을 비활성화 해보자.

```JSON
.eslintrc.json
{
  "extends": ["airbnb"],
  "rules": {
    "no-console": "error",
    "import/prefer-default-export": "off"
  }
}
```

- 이렇게 ESLint는 rules 옵션으로 명시된 규칙을 extends 옵션을 통해서 가져온 규칙보다 우선 시 해줌.
- rules 옵션을 많이 사용하면 사용할수록 직접 관리해야하는 설정이 늘어나는 부작용이 있으니 주의할 필요가 있음.

<br>

## ESLint와 Prettier 통합방법

> 포맷팅은 프리티어에게 맡기더라도 코드 품질과 관련된 검사는 ESLint의 몫임.
> 따라서, 둘을 같이 사용하는 것이 최선

### eslint-config-prettier

- 프리티어와 충돌하는 ESLint 규칙을 끄는 역할을 함.
- 둘 다 사용하는 경우 규칙이 충돌하기 때문,

`npm i -D eslint-config-prettier`

<br>

```JS
// .eslintrc.js
{
  extends: [
    "eslint:recommended",
    "eslint-config-prettier"
  ]
}
```

- eslint-config-prettier를 extends에 추가하면 lint와 prettier 충돌시, ESLint 규칙을 비활성화 함.
- 즉, prettier 우선.

<br>

### eslint-plugin-prettier

`npm i -D eslint-plugin-prettier`

- 설정파일에서 다음과 같이 추가.

```JS
  // .eslintrc.js
  {
    plugins: [
    "prettier"
    ],
    rules: {
    "prettier/prettier": "error"
    },
  }
```

- 프리티어의 모든 규칙을 ESLint 규칙으로 가져온 설정.
- 이제 ESLint 실행만으로 프리티어 포메팅 기능을 가져올 수 있음.

### 참고자료

[ESLint로 소스 코드의 문제 찾기](https://www.daleseo.com/js-eslint/)
[ESLint 상세 설정 가이드](https://www.daleseo.com/eslint-config/)
[Prettier로 코딩 스타일 통일하기](https://www.daleseo.com/js-prettier/)

<br>

[프론트엔드 개발환경의 이해: 린트](https://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html#11-%EB%A6%B0%ED%8A%B8%EA%B0%80-%ED%95%84%EC%9A%94%ED%95%9C-%EC%83%81%ED%99%A9)

<br>

[타입스크립트 프로젝트 환경 구성](https://github.com/joshua1988/learn-typescript/tree/master/setup)
