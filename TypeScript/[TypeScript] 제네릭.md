# TypeScript

## 제네릭

```TSX
interface Email {
  value: string;
  selected: boolean;
}

const emails: Email[] = [
  {value: "naver.com", selected: true},
  {value: "gmail.com", selected: false},
  {value: "hanmail.net", selected: false},
];

interface ProductNumber {
  value: number;
  selected: boolean;
}

const numberOfProducts: ProductNumber[] = [
  {value: 1, selected: true},
  {value: 2, selected: false},
  {value: 3, selected: false},
];

function createDropdownItem(item: Email | ProductNumber) {
  const option = document.createElement("option");
  option.value = item.value.toString();
  option.innerText = item.value.toString();
  option.selected = item.selected;
  return option;
}

// NOTE: 이메일 드롭 다운 아이템 추가
emails.forEach(function (email) {
  const item = createDropdownItem(email);
  const selectTag = document.querySelector("#email-dropdown");
  selectTag.appendChild(item);
});
```

- 지금까지는 이런 방법을 많이 사용했음

  - interface를 선언하고, 필요한 타입을 지정해준 뒤 해당 함수 또는 변수에 interface로 타입을 지정
  - 예를들어, 타입을 number 또는 string으로 지정해주어야하는 경우에는 유니온(|)을 적극적으로 사용했음

<br>

- 하지만 단점이 있음
  - 유니온을 사용했을 경우, string과 number에서 둘 다 사용할 수 있는 **`내장 API만`** 사용가능함.
  - 예를 들어 타입을 각각 지정해주었다고 가정
    - string으로 타입을 지정했을 떄는 split("")를 사용할 수 있음
    - number로 지정해주었을 땐 사용할 수 **`없음`**, 내장 API에 split("")를 사용할 수 없기때문
  - 유니온을 사용했을 땐 string과 number **`둘 다 허용되는 내장 API만 사용가능함`**
  - 또한, 동일한 형식의 타입을 지정하는데 interface를 통해서 매번 선언해주어야하기 때문에 코드가 길어짐

<br>

- 제네릭을 이용해보자

```TSX
/* 삭제
interface Email {
  value: string;
  selected: boolean;
}

interface ProductNumber {
  value: number;
  selected: boolean;
}
*/

interface DropdownItem<T> {
  value: T;
  selected: boolean;
}

const emails: DropdownItem<string>[] = [
  {value: "naver.com", selected: true},
  {value: "gmail.com", selected: false},
  {value: "hanmail.net", selected: false},
];

const numberOfProducts: DropdownItem<number>[] = [
  {value: 1, selected: true},
  {value: 2, selected: false},
  {value: 3, selected: false},
];

function createDropdownItem(item: DropdownItem<string> | DropdownItem<number>) {
  const option = document.createElement("option");
  option.value = item.value.toString();
  option.innerText = item.value.toString();
  option.selected = item.selected;
  return option;
}

// NOTE: 이메일 드롭 다운 아이템 추가
emails.forEach(function (email) {
  const item = createDropdownItem(email);
  const selectTag = document.querySelector("#email-dropdown");
  selectTag.appendChild(item);
});
```

- 중복되게 선언했던 interface인 Email과 ProductNumber를 삭제.
- DropdownNumber라는 interface를 선언하고 value를 제네릭으로 받아줌

<br>

- 한 단계 더 나아가서

```TSX
function createDropdownItem(item: DropdownItem<string> | DropdownItem<number>) {
  // ...
}
```

- 이 부분의 유니온이 조금 신경쓰임
  - 위에서도 언급했듯, string과 number를 유니온으로 받으면 둘 다 허용되는 내장 API만 사용가능하기 때문.

<br>

```TSX
function createDropdownItem<T>(item: DropdownItem<T>) {
  const option = document.createElement("option");
  option.value = item.value.toString();
  option.innerText = item.value.toString();
  option.selected = item.selected;
  return option;
}

// NOTE: 이메일 드롭 다운 아이템 추가
emails.forEach(function (email) {
  const item = createDropdownItem<string>(email);
  const selectTag = document.querySelector("#email-dropdown");

  if (!selectTag) {
    return;
  }
  selectTag.appendChild(item);
});
```

- 위와 같이 적용하며 두 가지 에러를 해결했음

1. selectTag에 다음과 같은 에러가 발생함
   ![타입 null에러](/screen/%ED%83%80%EC%9E%85%20null%EC%97%90%EB%9F%AC.png)
   - 여기서도 여러 방법으로 해결 할 수 있는데 타입가드와 타입단언으로 해결해보자
   ```TSX
   emails.forEach(function (email) {
   const item = createDropdownItem<string>(email);
   const selectTag = document.querySelector("#email-dropdown") as Element // 타입단언
   if (!selectTag) {
    return;
   } // 타입가드
   selectTag.appendChild(item);
   });
   ```
   - 타입단언으로 해결할 땐 조심해야함. vscode가 예측하는 null일 수도 있다는 의견을 개발하고 있는 내가 무시하고 '이건 Element타입이다.'라고 vscode에 명령을 내리는 것이기 때문.
     - API 데이터를 받아올 때 특히 조심.
   - 타입가드로 null인 경우 return으로 돌리고, return되지 않을 땐 null이 아니라는 의미이므로 안전하게 타입을 적용할 수 있음.

<br>

2. createDropdownItem의 타입을 T로 받고, 이를 DropdownItem<T>로 넘겨줌으로써 유니온을 제거할 수 있었음

- 하지만 여기서 toString의 에러가 발생함.

  ![](/screen/toString%20%EC%97%90%EB%9F%AC.png)

  ```TSX
  function createDropdownItem<T extends {toString: Function}>(
  item: DropdownItem<T>
  ) {
  const option = document.createElement("option");
  option.value = item.value.toString();
  option.innerText = item.value.toString();
  option.selected = item.selected;
  return option;
  }
  ```

- 제네릭으로 받을 수 있는 타입을 toString() 함수가 있는 타입으로 제한하는 것.

  - toString() API는 객체의 내장 API
  - 따라서 해당 객체를 프로토타입으로 받고 있는 문자, 숫자 등 주요 타입들에도 다 toString() API가 기본적으로 제공됨
  - 즉, 문자 숫자 이외에 더 많은 타입을 수용할 수 있음

- 만약 toString() 함수가 없는 타입이 들어올 시 에러가 발생

<br>

### 참고자료

https://www.inflearn.com/questions/83066  
제네릭 toString 참고
