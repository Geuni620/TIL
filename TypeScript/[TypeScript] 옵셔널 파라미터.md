# TypeScript

## 옵셔널 파라미터

```TS
// 함수의 선택적 파라미터(= 옵셔널 파라미터)
function log(a: string, b: string, c: string) {}

// 어쩔 땐 인자를 한 개만 넘기고, 어쩔 땐 인자를 두 개 이상 넘겨야할 경우도 있음.
log("Hello World");
log("Hello World", "Hello");
```

- 이럴 경우 함수를 각각 만드는게 아니라 다음과 같이 옵셔널 파라미터를 적용해주면 됨

  <br>

```TS
// 함수의 선택적 파라미터(= 옵셔널 파라미터)
function log(a: string, b?: string, c?: string) {}


// 어쩔 땐 인자를 한 개만 넘기고, 어쩔 땐 인자를 두 개 이상 넘겨야할 경우도 있음.
log("Hello World");
log("Hello World", "Hello");
```

- 매개변수 옆에 `?`를 붙여주면 됨
- 특정 파라미터를 선택적으로 사용하고 싶은 경우 옵셔널 파라미터를 사용함

## 물음표(?) vs 느낌표(!)

- 물음표는 위의 설명처럼 옵셔널 파라미터로 사용됨
- 느낌표는 `non-null assertion`
  - 특정 코드가 null이 아니다라는 것을 사용자가 타입스크립트에게 알려주는 것

<br>

---

<br>

### 참고자료

https://www.inflearn.com/questions/83684
