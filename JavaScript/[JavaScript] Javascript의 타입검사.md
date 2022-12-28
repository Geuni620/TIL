# JavaScript

## 타입검사

### typeof

```JS
// 타입검사
console.log(typeof "문자열"); // string
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof 123); // number
console.log(typeof Symbol()); // symbol
```

<br>

**단점이 있음. → 원시값과, 객체 중 객체(object, array, function, Date)는 typeof로 간별해내기 어려움.**

```JS
// typeof는 reference(객체)의 type을 잘 구분하지 못함, 만능이 아니다.
function myFunction() {}
class MyClass {}
const str = new String();

console.log(typeof myFunction); // function
console.log(typeof MyClass); // function
console.log(typeof str); // object

// 특히 null이 문제, JavaScript에서는 오류로 인정했음.
console.log(typeof null); // object
```

<br>

### instanceof

> prototype 속성이 객체의 프로토타입 체인 어딘가 존재하는지 판별해줌.

```JS
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const geuni = new Person("geuni", 31);

console.log(geuni); // Person { name: 'geuni', age: 31 }
console.log(geuni instanceof Person); // true

const test = {
  name: "geuni",
  age: 99,
};

console.log(test instanceof Person); // false
```

<br>

```JS
const arr = [];
const func = function () {};
const date = new Date();

console.log(arr instanceof Array); // true
console.log(func instanceof Function); // true
console.log(date instanceof Date); // true

// 이렇게 하면 혼란이 생김, 결국 reference type이기 때문에 최상위는 Object.
// 결국 prototype chain을 타다보면, 최상위에 Object가 있음.
console.log(arr instanceof Object); // true
console.log(func instanceof Object); // true
console.log(date instanceof Object); // true
```

<br>

### Object.prototype.toString.call()

```JS
console.log(Object.prototype.toString.call("")); //[object String]
console.log(Object.prototype.toString.call(new String(""))); //[object String]

const arr = [];
const func = function () {};
const date = new Date();

// 이렇게도 검사할 수 있음.
console.log(Object.prototype.toString.call(arr)); //[object Array]
console.log(Object.prototype.toString.call(func)); //[object Function]
console.log(Object.prototype.toString.call(date)); //[object Date]
```

<br>

### 참고자료

[클린코드 자바스크립트 중 10.타입검사](https://www.udemy.com/course/clean-code-js/)  
[MDN, Object.prototype.toString()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)  
[MDN, instanceof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
