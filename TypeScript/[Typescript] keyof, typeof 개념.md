# Typescript

## typeof

- 객체 데이터를 객체 타입으로 변환해주는 연산자

```TSX
const obj = {
  red: "apple",
  yellow: "banana",
  green: "cucumber",
};

// 위의 객체를 타입으로 변환하여 사용하고 싶을때
type Fruit = typeof obj;

/*
 type Fruit = {
     red: string;
     yellow: string;
     green: string;
 }
 */

let obj2: Fruit = {
  red: "pepper",
  yellow: "orange",
  green: "pinnut",
};
```

<br>

## keyof

- 객체 형태의 타입을, 따로 속성들(key값)만 뽑아 모아 유니온 타입으로 만들어주는 연산자

```TSX
type Type = {
   name: string;
   age: number;
   married: boolean;
}

type Union = keyof Type;
// type Union = name | age | married

const a:Union = 'name';
const b:Union = 'age';
const c:Union = 'married';
```

<br>

- obj 객체의 키값인 red, yellow, green을 상수 타입으로 사용하고 싶을 때는 typeof obj 자체에 keyof 키워드를 붙여주기

```TSX
const obj = {red: "apple", yellow: "banana", green: "cucumber"} as const;
// 상수 타입을 구성하기 위해서는 타입 단언을 해준다.

// 위의 객체에서 red, yellow, green 부분만 꺼내와 타입으로서 사용하고 싶을떄
type Color = keyof typeof obj; // 객체의 key들만 가져와 상수 타입으로

let ob2: Color = "red";
let ob3: Color = "yellow";
let ob4: Color = "green";
```

<br>

- 반대로 apple, banana, cucumber을 상수 타입으로 사용하고 싶다면 다음과 같이 사용

```TSX
const obj = {red: "apple", yellow: "banana", green: "cucumber"} as const;

type Key = typeof obj[keyof typeof obj]; // 객체의 value들만 가져와 상수 타입으로

let ob2: Key = "apple";
let ob3: Key = "banana";
let ob4: Key = "cucumber";
```

<br>

## keyof typeof 사용하기

- 제네릭 사용하기

> 만일 함수의 매개변수 key가 반드시 매개변수 obj의 제네릭 타입 T(객체를 받게되는)에 존재하여야 할때,  
> keyof T 를 하면 객체의 key 값을 모아 유니온 타입으로 만들 수 있다.

```TSX
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = {a: 1, b: 2, c: 3, d: 4};

getProperty(x, "a"); // 성공
getProperty(x, "m"); // 오류: 인수의 타입 'm' 은 'a' | 'b' | 'c' | 'd'에 해당되지 않음.
```

### 참고자료

[[TS] 📘 객체를 타입으로 변환 keyof / typeof 사용법](https://inpa.tistory.com/entry/TS-%F0%9F%93%98-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-keyof-typeof-%EC%82%AC%EC%9A%A9%EB%B2%95)

- 모든 예시 및 자료는 여기서 그대로 가져왔음.
