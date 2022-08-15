# JavaScript

## splice & slice

> 항상 헷갈리는 개념인 splice와 slice,  
> 해당 내용은 자바스크립트 Deep Dive 인용

<br>

## 27.8.8 Array.prototype.splice

원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 제거하는 경우 splice 메서드를 사용

<br>

매개변수

```JSX
splice(start, deleteCount,items)
```

<br>

splice 메서드는 원본 배열을 `직접`변경함.

```JSX
const arr = [1, 2, 3, 4];

// 원본 배열의 인덱스 1부터 2개의 요소를 제거하고 그 자리에 새로운 요소 20, 30을 삽입
const result = arr.splice(1, 2, 20, 30);

// 제거한 요소가 배열로 반환
console.log(result); // [2, 3]

// splice 메서드는 원본 배열을 직접 변경함.
console.log(arr); // [1, 20, 30, 4]
```

<br>

헷갈리던 점

- splice는 마지막 idx를 포함함.
- splice는 첫 번째 매개변수를 기준(1)으로 두 번째 매개변수까지 추출

```JSX
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = arr.splice(2, 4);
// 3(첫 번째)부터 시작해서 6(네 번째)까지
console.log(result); // [3, 4, 5, 6]
```

<br>

그 외

- splice 메서드의 두 번째 인수, 즉 제거할 요소의 개수를 0으로 지정하면 아무런 요소도 제거하지 않고 새로운 요소를 삽입함.

```JSX
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = arr.splice(1, 0, 100);

console.log(arr); // [1, 100, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(result); // []
```

- splice 메서드의 세 번째 인수, 즉 제거한 위치에 추가할 요소들의 모곡을 전달하지 않으면, 원본 배열에서 지정된 요소를 제거하기만 함

```JSX
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = arr.splice(1, 2);

console.log(arr); // [1, 4, 5, 6, 7, 8, 9, 10]
console.log(result); // [2, 3]
```

- splice 메서드의 두 번째 인수, 즉 제거할 요소의 개수를 생략하면 첫 번째 인수로 전달된 시작 인덱스부터 모든 요소를 제거함

```JSX
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = arr.splice(1);

console.log(arr); // [1]
console.log(result); // [2, 3, 4, 5, 6, 7, 8, 9, 10]
```

- 배열에서 특정요소를 제거하려면 splice + indexOf를 사용하거나, filter를 사용함

indexOf + splice

```JSX
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const remove = (array, item) => {
  const index = array.indexOf(item);
  if (index !== -1) array.splice(index, 1);
  return array;
};

console.log(remove(arr, 5)); // [1, 2, 3, 4, 6, 7, 8, 9 ,10]
```

filter

```JSX
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const removeAll = (array, item) => {
  return array.filter((v) => v !== item);
};

console.log(removeAll(arr, 5)); // [1, 2, 3, 4, 6, 7, 8, 9 ,10]
```

<br>

## 27.8.9 Array.prototype.slice

splice는 배여릐 원본을 변경하지만, slice는 원본은 변경하지 않음.

<br>

매개변수

```JSX
slice(start, end)
```

<br>

```JSX
const arr = [1, 2, 3, 4];
// arr[0]부터 arr[1] 이전(arr[1] 미포함)까지 복사하여 반환
console.log(arr.slice(0, 1)); // [1]

// 원본은 변경되지 않음.
console.log(arr); // [1, 2, 3, 4]
```

<br>

헷갈리던 점

- slice는 마지막 idx를 미 포함.
- slice는 splice와 다르게 무조건 idx 0을 기준으로 계산함

```JSX
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = arr.slice(2, 4);
// 3부터 5이전까지(5 미포함)), idx 0을 기준으로 추출함
console.log(result); // [3, 4]
```

<br>

그 외

- slice의 두 번째 인수를 생략하면 첫 번째 인수로 전달받은 인덱스부터 모든 요소를 복사하여 배열로 반환

```JSX
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = arr.slice(1);

console.log(result); // [2, 3, 4, 5, 6, 7, 8, 9, 10]
```

- slice 메서드의 첫 번째 인수가 음수인 경우 배열의 끝에서부터 요소를 복사하여 배열로 반환

```JSX
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = arr.slice(-1);

console.log(result); // [10]

//---

const result = arr.slice(-5);
console.log(result); // [6, 7, 8, 9, 10]

//---

const result = arr.slice(-3);
console.log(result); // [ 8, 9, 10]
```

- slice 메서드의 인수를 모두 생략하면 원본 배열의 복사본을 생성하여 반환

```JSX
const arr = [1, 2, 3];

const copy = arr.slice();

console.log(copy); // [1, 2, 3]

// 생성된 복사본은 얕은 복사를 통해 생성 됨.
console.log(arr === copy); // false


const todos = [
  {id: 1, content: "HTML", completed: false},
  {id: 2, content: "CSS", completed: true},
  {id: 3, content: "JavaScript", completed: false},
];

// 얕은 복사
const _todos = todos.slice();
// const _todos = [...todos]

// 참조값이 다른 별개의 객체, 하지만 배열요소의 참조값은 같음.
// 즉, 얕은복사 됨
console.log(_todos === todos); // false
console.log(_todos[0] === todos[0]); // true
```

\*참고  
slice, 스프레드 문법, Object.assign 메서드 모두 얕은 복사를 수행
깊은 복사를 위해서는 Lodash 라이브러리의 cloneDeep 메서드 사용

<br>

- slice 메서드가 복사본을 생성하는 것을 이용하여 arguments, HTMLCollection, NodeList 같은 유사 배열 객체를 배열로 변환할 수 있음

```JSX
function sum() {
  // 유사 배열 객체를 배열로 변환(3 가지 모두)
  var arr = Array.prototype.slice.call(arguments);
  var arr = Array.from(arguments);
  var arr = [...arguments];

  console.log(arr); // 1, 2, 3
}

console.log(sum(1, 2, 3));
```

<br>

### 정리

1. splice는 원본도 변경시키지만, slice는 원본은 그대로
2. splice는 맨 마지막 포함, slice는 맨 마지막 미 포함
3. 둘 다 배열의 index를 기준으로 계산함
4. splice는 첫 번째 매개변수(1)부터 마지막 매개변수까지 추출,  
   하지만, slice는 첫 번째 매개변수(1)을 기준으로 하지 않고, 항상 idx 0을 기준으로 계산함

```JSX
const arr = [1, 2, 3, 4, 5, 6];

console.log(arr.slice(2, 4)); // [3, 4]
console.log(arr.splice(2, 4)); // [3, 4, 5, 6]
```
