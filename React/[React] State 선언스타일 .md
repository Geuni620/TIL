# React useState 선언 스타일

## useState를 여러 개 만드는게 좋을까?

> "근휘님은 state를 여러 개 만드시나요? 아니면 하나만 선언해주고 객체 형태로 작성하시나요?"

<br>

## 렌더링 관점

- 데이터타입을 객체로 state를 만들었을 때 여러 곳에서 데이터 바인딩 될 가능성이 높음.
- 그렇다면 하나의 값이 변경되었을 시, 객체타입의 state가 리렌더링 될 것이고 데이터 바인딩 되어있는 모든 컴포넌트에서 리렌더링 됨.  
  → 비효율적.

<br>

## 불변성 관점

> 불변성 관점에서 대해서 이야기하기 전 스프레드 문법에 대해 궁금해짐

<br>

### 스프레드 문법은 깊은 복사? 얕은 복사?

- 보통 state를 사용할 때 다음과 같이 사용함

```JSX
const App = () => {
  const [state, setState] = useState({
    name: "Keun",
    age: 31,
  });

  setState({...state, name: "Lee"});
};
```

- 여기서 스프레드 문법으로 기존 prevState를 복사 해준 뒤 name을 변경해줬음
- 이렇게 한 이유는 불변성을 유지하기 위해.

<br>

> 그럼 스프레드 문법은 깊은 복사인가요? 얕은 복사 아닌가요?

- 단톡방에서도 물어보고, 주변사람에게도 물어보고, 블로그도 찾아봤지만 결과적으론(내가 지금 찾아본 기준으론) **깊은 복사**가 맞는 것 같음  
  **`이때까진 깊은 복사가 맞는거라고 생각했음`**

* 그 이유는 불변성과도 연관이 있음

<br>

### 스프레드 문법이 얕은복사라면,

- 스프레드 문법이 얕은 복사라면 setState에서 불변성을 유지하며 값을 변경할 수 없음.

* 객체타입으로 예를 들었을 때, 객체는 값에 의한 복사가 아닌 참조에 의한 복사로 구현 됨
  - 즉, setState(...state, name:"Lee")로 state를 업데이트할 시, 복사된 값이 참조에 의한 복사 즉, 얕은복사라면 변경이 이루어질 수 없다고 생각했음.
  - 리렌더링상에서 변경이 되어야 값이 업데이트 될텐데, 이건 참조에 의한 복사라면 메모리상에서 같은 값을 참조하고 있기 때문에 복사해도 어쨌든 state는 같은 메모리 주소를 가리키고 있음.
  - 즉 자신을 자신이 복사하는 모습이라고 이해함.(결국 자기자신)

<br>

### Deep Dive 책을 참고해서 개념 다시 잡기

> DeepDive에는 다음과 같은 내용이 있음
> 이터러블인 배열을 펼쳐서 요소들을 개별적인 값들의 목록 1 2 3으로 만듦  
>  → 이 때 1 2 3은 값이 아니라 값들의 목록이다.

```JS
// 객체 복사
let objA = {
  name: "Keun",
  age: 31,
};

let objB = objA;

console.log(objA === objB); // true

objB.name = "Lee";

console.log(objA === objB); // true
console.log(objA, objB); // { name: 'Lee', age: 31 } { name: 'Lee', age: 31 }

// ----------------

let objC = {...objA};

console.log(objA === objC); // false

objC.name = "Keun";

console.log(objA === objC); // false
console.log(objA, objC); // { name: 'Lee', age: 31 } { name: 'Keun', age: 31 }

/*
Deep Dive 35장 스프레드
스프레드 문법의 결과는 값이 아님
스프레드 문법의 결과는 값들의 목록
*/
```

<br>

### 결과적으론 스프레드 문법은 얕은 복사로 구현 됨

조금 헷갈리지만 **`스프레드 문법은 얕은 복사가 맞음`**

- 스프레드 문법의 결과는 값이 아님.
  - 스프레드 문법의 결과는 값이 아니라 값들의 목록임.
  - 그래서 이 값들의 목록을 배열 또는 객체에 담아서 리턴하는 것
- 그렇기 때문에 위에서 깊은 복사 효과가 났던 것 같음.
- 즉 값들의 목록을 얕은 복사로 복사해서 새로운 배열 또는 객체에 담아서 리턴하는 것.
  → `그럼 1depths 는 깊은 복사로 이해해도 되지 않을까?`

<br>

### 다시 불변성 관점

> 위에 값들의 목록이 복사되어서 새로운 배열, 또는 객체에 할당되었다면(깊은복사처럼 구현) 불변성 유지가 가능.

- 불변성 관점에서 스프레드 문법으로 복사한 것이 새롭게 생성된 객체 또는 배열이기 때문에, 불변성이 유지될 수 있었던 것.

<br>

### 추가내용

```JS
// ----------------

let objD = {
  name: {
    first: "Lee",
    last: "KeunHwee",
  },
  age: 31,
};

let objE = objD;

console.log(objD === objE); // true

objE.name.first = "Kim";

console.log(objD === objE); // true
console.log(objD, objE); // { name: { first: 'Kim', last: 'KeunHwee' }, age: 31 } { name: { first: 'Kim', last: 'KeunHwee' }, age: 31 }

// ----------------

let objF = {...objD};

console.log(objF, objD);
console.log(objF === objD); // false

objF.name.first = "Keun";

console.log(objF === objD); // false
console.log(objF, objD); // { name: { first: 'Keun', last: 'KeunHwee' }, age: 31 } { name: { first: 'Keun', last: 'KeunHwee' }, age: 31 }
console.log(objF.name === objD.name); // true

// console.log(objF === objD); // false
// console.log(objF, objD); // { name: { first: 'Lee', last: 'KeunHwee' }, age: 31 } { name: { first: 'Lee', last: 'KeunHwee' }, age: 31 }
```

- 그럼 이걸 보면 1depths 이상으로 스프레드 문법으로 복사했을 때 deep copy 되지 않는 것을 확인할 수 있음
- 즉, deep copy는 depths가 얼만큼 있건 모든 것을 재귀적으로 다 복사하는 것.
- 그래서 스프레드문법이 shallow copy라고 하는 것 같음.

---

### 추가내용 2

- 얕은 복사와 참조를 혼동 했던 것 같음
  - objB = objA는 objA주소를 objB라는 변수에 넣은 것.
  - 즉, objB와 objA는 완전히 같은 메모리 공간을 가리킴.

<br>

- 얕은복사는, 말 그대로 다른 메모리 공간에 복사하는 것
  - 단, 참조값 안에 참조값이 있다면 그 연결까지는 끊어내지 못함.

<br>

- 그래서 위 예시와 추가내용을 참고해서 결론을 내려보면
  1. 스프레드 문법은 얕은 복사이고, 깊은 복사는 depths가 얼만큼 있건 모두 복사하는 것.
     - 얕은 복사는 depths가 깊을 수록 모두 복사하지 못함(=참조값을 다 끊어내지 못함, 1depths 정도만 끊는 것 같음.)
     - 왜냐하면 depth를 2까지 깊게 팠을 때, objF.name.first를 변경하면 objD.name.first까지 변경됐음.
