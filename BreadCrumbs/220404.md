## 배운 내용

### 1. 조건부 렌더링 구현

> 회원가입 페이지 구현시 유효성 검토를 조건부 렌더링으로 구현함

- 회원가입 input창을 하드코딩으로 각각 만들었을 경우, 각각에 onChange 이벤트를 걸어서 함수를 만들고 유효성 검토를 구현할 수 있었을 것 같음.
- 하지만 상수데이터를 이용해서 컴포넌트를 나누고 map으로 구현했음.
- 그래서 id에 값을 입력했을 경우 유효성 검토를 어떻게 구분할 수 있는지 로직적으로 고민하게 됨.
- 인터넷에서 수 많은 블로그 글을 참조했지만, state를 엄청나게 많이 만들거나, map으로 구현한게 아니라 여러개의 input을 만들어넣고 하나하나에 onChange이벤트를 걸어주는게 대부분이었음.

<br>

- 결과적으론 동기님에게 여쭈어보기도 했고 이전 세션의 내용을 인용하게 됨. 또한 객체 value에 함수를 넣을 수 있다는 사실도 알게 됨.

```JS
const validator = {
  id: input => input.length >= 6,
  pw: input => input.length >= 8,
  repw: input => input.length >= 6,
  name: input => null,
  email: input => input?.includes('@'),
};
```

- validator에 input 값이 들어오면 input의 validation을 체크할 수 있음.
- name은 따로 지정해주지 않았음
- 여기서 `input => input?.includes('@')`에서 input?이 오타라고 생각했으나 아니었음.
  - console을 찍어보면 다음과 같이 출력됨
  - `input => input === null || input === void 0 ? void 0 : input.includes('@')`

<br>

즉, 객체가 `undefined` 또는 `null`일 때 연산의 결과 대신 `undefined를` 반환해줌

### 참고자료

https://sbarrys.tistory.com/104  
물음표 연산자(?) 달러 연산자($)에 대한 설명
