# Typescirpt

## 유니온 타입 특징

- 일반적인 유니온 타입은 합집합의 개념으로 적용됨

```TS
// 유니온타입, 하나이상의 타입을 지정할 때 사용함
var geuni: string | number | boolean;
function logMessage(value: string | number) {
  // 유니온타입을 지정한 후 typeof를 통해서 타입이 number인 경우 console.log(value 여기선 number 타입으로 사용 됨 )
  if (typeof value === "number") {
    console.log(value.toLocaleString());
  }

  if (typeof value === "string") {
    console.log(value.toString());
  }

  throw new TypeError("value must be string or number");
}

logMessage("hi");
logMessage(100);
```

---

<br>

### 유니온 타입 주의할 점

```TS
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

function askSomeone(someone: Developer | Person) {
  // 두 개의 인터페이스를 지정해놨을 때 두개의 인터페이스 안에 모든 타입종류를 사용할 수 있는게 아니라, 공통된 타입(name)만 사용할 수 있음
  someone.name;
  someone.skill;
  someone.age;
}
```

- interface로 두 개씩 type을 지정해놓고, `askSomeone`의 매개변수로 두 interface를 유니온타입으로 지정해줬을 때,
  - 일반적으로 두 interface를 `합집합`으로 사용할 수 있을 것이라고 생각함.
  - 하지만, typeScript는 이것을 `교집합`으로 받아들이며, 위 예시의 경우에는 `name`만 사용할 수 있고, `skill`과 `age`는 Error가 발생함.
  - 즉, 공통된 속성만 접근할 수 있음

<br>

---

<br>

### 인터섹션 타입

```TS
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

// & 연산자에 대해서 배워보자
function askSomeone(someone: Developer & Person) {
  // & 연산자로 묶어주니, 위의 유니온과 다르게 에러표시가 사라짐
  // 여기서 설명은 Developer과 Person이 가지고 있는 3개의 type을 모두 포함하는 타입이 someone으로 지정된 형태임. 즉, 위에 유니온은 교집합, 인터넥션은 합집합
  // 실무에선 유니온타입이 더 많이 쓰이게 될 것
  someone.name;
  someone.skill;
  someone.age;
}

askSomeone({name: "디벨로퍼", skill: "웹 개발", age: 31});
askSomeone({name: "캡틴", age: 31}); // skill에 대한 속성도 필요하다고 에러가 뜸!!!

// var seho: string | number | boolean;
// stringdㅣ면서 number면서 boolean을 만족하는 하나의 타입을 intersection이라고 함
// var capt: string & number & boolean;
```

- 동일하게 두 interface로 타입을 지정해준 후, &로 묶어주는 방식
  - askSomeone 함수에 Developer & Person으로 묶어줬을 때 일반적 사고로는 교집합이라고 생각이 들지만, 여기선 합집합으로 인식 함
  - 호출을 할 때도 `askSomeone({name: xxx, skill: xxx, age: 31})`로 했을 때 에러가 뜨지않음
  - 하지만 프로퍼티 하나라도 없을 시 에러가 발생함.

<br>

---

<br>

## 정리

1. 즉 함수를 정의할 시, 유니온 타입은 **`교집합`**, 인터섹션 타입은 **`합집합`**
2. 하지만 일반적인 type을 지정할 시 **`유니온타입은 합집합`**
3. 유니온타입으로 함수를 정의한 후, 호출할 때에는 조금 다름

- 이 경우엔 예시가 필요함.

```TS
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}


function askSomeone(someone: Developer | Person) {
  someone.name;
  someone.skill; // 에러발생
  someone.age;  // 에러발생
}

askSomeone({name: "keunhwee", skill: "react"})
askSomeone({name: "keunhwee", age: 31})
```

- 함수 호출 시 각각 사용하는 경우는 호출가능함.

<br>

### 참고자료

https://joshua1988.github.io/ts/guide/operator.html#union-type
