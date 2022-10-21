# TypeScript

## enum 사용의 효용

```JSX
const enum BasicInfoKeys {
  name = 'name',
  ordinal_number = 'ordinal_number',
}

const handleLoginStep = () => {
  if (basicInfo[BasicInfoKeys.name] === '') {
    message.warning('이름을 적어주세요.');
    return;
  } else if (basicInfo[BasicInfoKeys.name].length > 10) {
    message.warning('이름의 최대길이는 10글자 입니다.');
    return;
  }

  if (basicInfo[BasicInfoKeys.ordinal_number] <= 0) {
    message.warning('기수를 숫자로 입력해주세요.');
    return;
  }

  dispatch(nextStep(loginStep));
};
```

<br>

- 사이드프로젝트 당시, 다음과 같이 enum을 사용하려 했음.
- 하지만 결과적으론, 비효율을 낳게됐고, 해당 코드는 다음과 같이 수정했음.

<br>

```JSX
const handleLoginStep = () => {
    if (basicInfo.name === '') {
      message.warning('이름을 적어주세요.');
      return;
    } else if (basicInfo.name.length > 10) {
      message.warning('이름의 최대길이는 10글자 입니다.');
      return;
    }

    if (basicInfo.ordinal_number <= 0) {
      message.warning('기수를 숫자로 입력해주세요.');
      return;
    }

    dispatch(nextStep(loginStep));
  };
```

- 이 과정에서 Tree shaking이라는 단어에 대해서 알게 됨.

<br>

## Tree Shaking(트리쉐이킹)

> 트리쉐이킹이란?

- 사용하지 않는 코드를 삭제하는 기능을 말함.
- 트리쉐이킹을 통해 export했지만 아무 곳에서도 import하지 않는 모듈이나, 사용하지 않는 코드를 삭제해서 번들 크기를 줄이고, 페이지가 표시되는 시간을 단축할 수 있음.

<br>

## TypeScript에서 enum을 사용하면 트리쉐이킹이 되지 않음

- enum은 Typescript가 자체적으로 구현했고, JavaScript에서는 사용할 수 없음
- TypeScript 코드를 작성한 경우를 생각해보자

```JSX
// LoginModal.tsx
enum BasicInfoKeys {
  name = 'name',
  ordinal_number = 'ordinal_number',
}
```

- 해당 코드를 트랜스파일하면 아래와 같은 JavaScript 코드가 됨

```JSX
(function (BasicInfoKeys) {
    BasicInfoKeys["name"] = "name";
    BasicInfoKeys["ordinal_number"] = "ordinal_number";
})(BasicInfoKeys || (BasicInfoKeys = {}));
```

- TypeScript에서 enum을 사용하면 Tree-shaking이 되지 않음
- JavaScript에 존재하지 않는 것을 구현하기 위해 TypeScript 컴파일러는 IIFE(즉시 실행 함수)를 포함한 코드를 생성함  
  → Rollup과 같은 번들러는 IIFE를 `사용하지 않는 코드`라고 판단할 수 없어서 Tree-shaking이 되지 않음

- 결국 BasicInfoKeys를 import하고 실제로는 사용하지 않더라도 최종 번들에는 포함되는 것.

<br>

## 정리

- 결과적으론 나의경우엔 enum을 어떻게해서든 써보고 싶어서 사용한 경우였고, 불필요한 요소 였기때문에 삭제를 했음.
- 하지만 enum을 어쩔 수 없이 사용해야하는 경우에는, 최대한 `Union type`으로 사용할 것을 권하고 있음.
- union type으로 사용시, Tree-shaking을 잘 적용할 수 있기 때문.
- [이 블로그](https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/)에선 다음과 같이 추천함

  ```JSX
  Union Types > const enum > enum
  ```

### 참고자료

[TypeScript enum을 사용하지 않는 게 좋은 이유를 Tree-shaking 관점에서 소개합니다.](https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/)

[enum 보다 union type을 사용하자](https://yrnana.dev/post/2022-02-04-enum-union-type)

[타입스크립트 꿀팁](https://fe-developers.kakaoent.com/2021/211012-typescript-tip/)
