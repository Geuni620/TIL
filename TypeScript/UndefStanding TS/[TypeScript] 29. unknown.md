# TypeScript

## unknown

```TS
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

userName = userInput; // 'unknown' 형식은 'string' 형식에 할당할 수 없습니다.ts(2322)
```

- 다음과 같이 타입을 지정하면 Type Error이 발생함.
- userName을 string로 지정하더라도 unknown은 문자열로 확실히 인식되지 않음.

 <br>

```TS
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

if (typeof userInput === "string") {
  userName = userInput;
}
```

- userInput에 타입을 지정해주기 위해선 다음과 같이 타입가드를 작성해주어야함.
- unknown을 사용하기 위해선 추가적인 타입검사가 필요함(타입가드처럼)
