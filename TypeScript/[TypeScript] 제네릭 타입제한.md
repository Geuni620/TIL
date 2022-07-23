# TypeScript

## 제네릭 타입제한

1. 제네릭 타입제한

```TSX
function getNumberAndArray<T>(value: T): T {
  value.length; // X
  return value;
}

function getNumberAndArray<T>(value: T[]): T[] {
  value.length; // O
  return value;
}
```

- lenth API 내장함수를 사용하기 위해 T로 받고, 이 T는 배열안에 타입이라는 것을 알려주면, lenth 사용가능

<br>

2. 정의된 타입으로 타입제한하기

```TSX
interface lengthType {
  length: number;
}

function logTextLength<T extends lengthType>(text: T): T {
  text.length;
  return text;
}
logTextLength("hi"); // O
logTextLength(10); // Error
```

- extends를 이용해서 lengthType하위 속성으로 T를 지정해줌
  - T에 string은 들어갈 수 있음
  - string의 내장 API에는 length가 있음 하지만, number는 에러가 발생
    - number 내장 API에 string이 존재하지 않음

<br>

3. keyof로 타입제한하기

```TSX
function getAllowedOptions<T, O extends keyof T>(obj: T, key: O) {
  return obj[key];
}

let obj = {
  name: "이근휘",
  age: 31,
};

getAllowedOptions(obj, "name"); // O
getAllowedOptions(obj, "age"); // O
getAllowedOptions(obj, "length"); // X
```

<br>

### 참고자료

https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD-%EC%A0%9C%EC%95%BD-%EC%A1%B0%EA%B1%B4
