# TypeScript

> 타입으로 함수를 지정해보자.

```TS
function add(number1: number, number2: number): number {
  return number1 + number2;
}

function printResult(number: number): void {
  console.log(`Result : ${number}`);
}

console.log(printResult(add(5, 12)));

let conbineValues: Function;

conbineValues = add;

console.log(conbineValues(8, 8));  // 16
```

- `tsc app.ts` 이후 `open index.html`로 브라우저를 열고 console을 확인해보면 결괏값이 잘 나와있음.  
  → 하지만 완벽하지 않음.

<br>

```TS
function add(number1: number, number2: number): number {
  return number1 + number2;
}

function printResult(number: number): void {
  console.log(`Result : ${number}`);
}

console.log(printResult(add(5, 12)));

let conbineValues: Function;

conbineValues = add;
conbineValues = printResult; // -> 매개변수 1개

console.log(conbineValues(8, 8)); // 8 -> 매개변수를 한 개만 받기 때문.
// 하지만 에러가 나지 않고 컴파일 됨.
```

<br>

## 엄격하게 함수 타입 매기기

```TS
function add(number1: number, number2: number): number {
  return number1 + number2;
}

function printResult(number: number): void {
  console.log(`Result : ${number}`);
}

console.log(printResult(add(5, 12)));

let conbineValues: (a: number, b: number) => number;
// 화살표함수로 매개변수와 타입을 지정해주고, 리턴으로 number를 지정해줌.

conbineValues = add;  // 잘 동작함!!!
conbineValues = printResult; // 매개변수 1개만 받기 때문에 ERROR!!!

/*
'(number: number) => void' 형식은 '(a: number, b: number) => number' 형식에 할당할 수 없습니다.
  'void' 형식은 'number' 형식에 할당할 수 없습니다.ts(2322)
*/
console.log(conbineValues(8, 8));
```

- 위와 같이 함수타입을 매개변수와 함께 엄격히 매겨주면 캡처처럼 매개변수의 개수가 맞지 않거나, 타입이 맞지 않을 시 개발자에게 알려줌.

<br>

![Type Error](../screen/typescript%20error.png)

- 다음과 같은 타입에러가 뜸
