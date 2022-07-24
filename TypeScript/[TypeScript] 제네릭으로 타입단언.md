# TypeScript

## 제네릭을 활용한 DOM 유틸함수 정의

```TSX
function $(selector: string) {
  return document.querySelector(selector);
}

const confirmedTotal = $('.confirmed-total') as HTMLSpanElement;
const deathsTotal = $('.deaths') as HTMLParagraphElement;
const recoveredTotal = $('.recovered') as HTMLParagraphElement;
const lastUpdatedTime = $('.last-updated-time') as HTMLParagraphElement;
const rankList = $('.rank-list') as HTMLOListElement;
const deathsList = $('.deaths-list') as HTMLOListElement;
const recoveredList = $('.recovered-list') as HTMLOListElement;
```

- 다음과 같이 하나하나 타입단언으로 선언해주어야했음.
  - 제네릭을 이용해서 리팩토링 해보자

<br>

```TSX
// 전체코드
function $<T extends HTMLElement = HTMLDivElement>(selector: string) {
  const element = document.querySelector(selector);
  return element as T; // 제네릭으로 타입단언
}


const Test = $('.abc');
const confirmedTotal = $<HTMLSpanElement>('.confirmed-total');
const deathsTotal = $<HTMLParagraphElement>('.deaths');
const recoveredTotal = $<HTMLParagraphElement>('.recovered');
const lastUpdatedTime = $<HTMLParagraphElement>('.last-updated-time');
const rankList = $<HTMLOListElement>('.rank-list');
const deathsList = $<HTMLOListElement>('.deaths-list');
const recoveredList = $<HTMLOListElement>('.recovered-list');
```

- 먼저 제네릭 T로 타입을 받은 후, 이 타입이 HTMLElement의 상속받은 속성이 아닐 경우, 에러가 뜨도록함

  ```TSX
  const Test1 = $<string>('.abc') // error
  ```

- 타입을 제네릭으로 넘기지 않았을 경우 default 값을 설정할 수 있음

  ```TSX
  function $<T extends HTMLElement = HTMLDivElement>(selector: string) {
    const element = document.querySelector(selector);
  return element as T;
  }

  const Test = $('abc') // HTMLDivElemtn
  ```

  - default를 `HTMLDivElement`로 설정해놓음

<br>

```TSX
function $<T extends HTMLElement = HTMLDivElement>(selector: string) {
  const element = document.querySelector(selector);
  return element as T;
}
```

- return되는 element의 타입을 T로 타입단언해줌

<br>

### 참고자료

https://www.inflearn.com/course/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8B%A4%EC%A0%84/dashboard
