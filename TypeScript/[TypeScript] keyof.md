# TypeScript

## keyof 사용법

> 객체의 속성을 제한하는 방법

```TS
interface ShoppingItem {
  name: string;
  price: number;
  stock: number;
}

// getShoppingItemOption에 인자로 Shopping 요소들 중 하나만 설정할 수 있음.
function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T {
  return itemOption;
}

getShoppingItemOption("name");
```

- 즉 object에서 key값을 interface에서 지정해놓은 값들로만 사용하고자 할 때 keyof를 사용할 수 있음.

<br>

한가지 예시를 더 들어보면

```TS
function getProperty<T, O extends keyof T>(obj: T, key: O) {
  return obj[key];
}
let obj = { a: 1, b: 2, c: 3 };

getProperty(obj, "a"); // okay
getProperty(obj, "z"); // error: "z"는 "a", "b", "c" 속성에 해당하지 않습니다.
```

- key값인 a는 obj에 존재하므로 사용할 수 있음
- z는 key값으로 존재하지 않기때문에 에러가 발생

<br>

### 참고자료

https://joshua1988.github.io/ts/  
강의내용

https://www.typescriptlang.org/docs/handbook/2/keyof-types.html  
공식문서
