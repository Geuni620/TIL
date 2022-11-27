## ??(null 병합 연산자)

- 좌항의 피연산자가 null 또는 undefined인 경우 우항의 피연산자를 반환
- 그렇지 않을 경우 좌항의 피연산자를 반환

```JS
var foo = null ?? "default string";
console.log(foo); // default string
```

<br>

## ||과 ??의 차이

- ||는 "", undefined, null, 0, -0, NaN, false 값을 전부 검사하는 연산자
- ??는 null과 undefined만 검사하는 연산자

```JS
const a = false || "어떻게?";
console.log(a); // 어떻게?

const b = false ?? "하이";
console.log(b); // false

const c = undefined ?? null ?? "엄";
console.log(c); // "엄""
```
