### 20.1 strict mode

---

**암묵적 전역**

```
function foo() {
  x = 10;
}

foo();
console.log(x); // 10
```

- foo 함수 내에서 선언하지 않은 x 변수에 값 10을 할당
- 전역 스코프에도 x 변수의 선언이 존재하지 않기 때문에 `ReferenceError`를 발생시킬 것 같지만 자바스크립트 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성함.
- 이때 전역 객체의 x 프로퍼티는 마치 전역변수처럼 사용할 수 있음.
- 개발자의 의도와는 상관없이 발생한 암묵적 전역은 오류를 발생시키는 원인이 될 가능성이 큼.
  - 따라서 var let const 키워드를 사용하고 변수를 선언한 다음 사용해야함.

### 20.2 strict mode의 적용

```
"use strict";

function foo() {
  x = 10;
}

foo();
console.log(x); //ReferenceError: x is not defined
```

- 함수 몸체의 선두에 추가하면 해당 함수와 중첩 함수에 strict가 적용됨.
- 코드의 선두에 `use strict`를 위치시키지 않으면 strict mode가 제대로 동작하지 않음

**주의할 점**

1. 전역에 strict mode를 적용하는 것은 피하기

```
<!DOCTYPE html>
<html>
<body>
  <script>
    'use strict';
  </script>
  <script>
    x = 1; // 에러가 발생하지 않는다.
    console.log(x); // 1
  </script>
  <script>
    'use strict';

    y = 1; // ReferenceError: y is not defined
    console.log(y);
  </script>
</body>
</html>
```

2. 함수 단위로 strict mode를 적용하는 것도 피하기

```
(function () {
  // non-strict mode
  var lеt = 10; // 에러가 발생하지 않는다.

  function foo() {
    'use strict';

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
}());
```

따라서

```
// 즉시실행 함수에 strict mode 적용
(function () {
  'use strict';

  // Do something...
}());
```

- 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분
- 즉시 실행 함수의 선두에 `strict mode`를 적용

  <br>

### 참고자료

---

https://poiemaweb.com/js-strict-mode  
strict mode 예시 참고

https://poiemaweb.com/eslint  
ESLine 사용방법
