# TypeScript

## 함수의 타입 및 콜백

```JS
function addAndHandle(n1: number, n2: number, cd: (num: number) => void) {
  const result = n1 + n2;
  cd(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result); // 20
  return result; // cd의 반환값은 void인데 에러가 뜨지 않음.
});
```

- cd의 반환값이 void이고, void는 반환값을 설정할 수 없는 타입
- 하지만 `return result`로 반환값을 지정해도 에러가 발생하지 않음.

<br>

### 에러가 나지 않는 이유

- callback 타입에 void를 지정함으로써 여기서 반환할 수 있는 모든 값을 무시하게 됨.
- 그래서 addAndHandle에서 callback함수가 return 타입으로 아무 작업도 수행하지 않을 것이라고 입력한 것.

<br>

```JS
addAndHandle(10, 20, (result) => {
  console.log(result);
  return result;
});
```

![콜백함수 타입](../../screen/callback%20%ED%95%A8%EC%88%98%20%ED%83%80%EC%9E%85.png)

- 즉 callback이 여기서 반환되는 값으로는 아무 작업도 수행하지 않는다고 callback 타입에 명확하게 지정되어 있기 때문.
- 따라서 함수 내의 addAndHandle은 값을 반환하는 어떤 작업도 수행하지 않음.
- 즉 void로 반환값 타입이 설정되어 있으니, return으로 반환값을 설정해놓는다 한들, 타입스크립트에서 알아서 무시해버림.

<br>

### 검증해보기

```JS
function addAndHandle(n1: number, n2: number, cd: (num: number) => void) {
  const result = n1 + n2;
  return cd(result);
}

const test = addAndHandle(10, 20, (result) => {
  return result;
});

const b = 10;
const c = test + b; // error
```

- return을 지정해줬으나 사용하지 않았다면 타입스크립트는 알아서 무시함
- 하지만 다음과 같이 callback의 반환값 타입을 void로 지정해준 상태에서 return으로 반환값을 설정
- 이를 다시 test라는 변수에 담아줬음
- test + b를 c라는 변수에 담아줬을 때 타입에러가 발생함

<br>

![void로 지정된 타입의 반환값 설정](../../screen/void%EB%A1%9C%20%EC%A7%80%EC%A0%95%EB%90%9C%20%ED%83%80%EC%9E%85%EC%9D%98%20%EB%B0%98%ED%99%98%EA%B0%92%20%EC%84%A4%EC%A0%95.png)

<br>

### 정리

- 반환값이 void로 설정된 타입에 반환값을 지정했음
- 하지만 사용되진 않았음. 그러면 타입스크립트가 알아서 무시함(error를 보여주지 않음)
- 하지만 다른 변수 또는 함수로 사용되었다면, 타입스크립트가 에러를 발생시킴(error 발생)
