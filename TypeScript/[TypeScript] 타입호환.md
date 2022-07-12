# TypeScript

## 타입호환

### 변수

```TS
// 인터페이스
interface Developer {
name: string;
skill: string;
}

interface Person {
name: string;
}

var developer: Developer;
var person: Person;

person = developer; // 호환가능
developer = person; // 호환불가능

```

- person의 속성은 name밖에 없지만, Developer은 name과 skill 둘 다 가지고 있음.
- 이런 경우 오른쪽의 변수가 왼쪽으로 할당 될 수 없음.
- 즉 오른쪽의 변수가 더 많은 속성을 가지고 있어야함.

<br>

### 함수

```TS
var add = function (a: number) {
// ...
};

var sum = function (a: number, b: number) {
// ...
};

sum = add; // 호환가능
add = sum; // 호환불가능
```

- 함수는 sum이 구조적으로 더 많은 타입을 가지고 있음.
- 즉 sum 함수가 왼쪽의 add함수와 호환가능함.
  - 변수의 호환과는 반대

<br>

### 제네릭

```TS
interface Empty<T> {
// ...
}
var empty1: Empty<string>;
var empty2: Empty<number>;

empty1 = empty2; // 호환가능

interface NotEmpty<T> {
data: T;
}

var notempty1: NotEmpty<string>;
var notempty2: NotEmpty<number>;

notempty1 = notempty2; // 호환불가능, number !== string
```

- interface안에 제네릭으로 넘겨받을 type이 없다면 호환가능.
- interface안에 제네릭으로 넘겨받을 type이 있고, 다른 type으로 넘겨받게 된다면, 호환불가능.

<br>

### 참고자료

https://www.inflearn.com/course/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9E%85%EB%AC%B8/dashboard
