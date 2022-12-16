# JavaScript

> 4개의 메서드는 정말 많이 이용하는데 어떻게 동작하는지 원리를 공부할 기회가 있어서 작성함.

### 1. forEach

```JS
function forEach(predicate, thisArg) {
  // 여기는 뇌피셜, 이해를 돕기 위해
  for (let i = 0; i < a.length; i++) {
    predicate(a[i], i);
  }
}

let a = [11, 12, 13, 14, 15, 16];
a.forEach(
  function (v, i) {
    console.log(v, i, this); // 배열의 요소, idx, this
  },
  [1, 2] // 여기는 thisArg
);
```

<br>

---

<br>

### 2. map

- map은 배열의 요소들을 이용해서 새로운 배열을 생성함

```JS
function map(predicate, thisArg) {
  // 여기는 뇌피셜, 이해를 돕기 위해
  let list = [];
  for (let i = 0; i < a.length; i++) {
    list.push(predicate(a[i], i));
  }
  return list;
}

let a = [11, 12, 13, 14, 15, 16];
let answer = a.map(
  function (v, i) {
    return v * v;
  },
  [1, 2]
);
console.log(answer); // 121, 144, 169, 196, 225, 256
```

- 근데 여기서 이렇게하면 예측한 결과랑 조금 다르게 나왔음

```JS
// forEach
let a = [11, 12, 13, 14, 15, 16];
let answer = a.map(
  function (v, i) {
    if (v % 2) return v;
  },
  [1, 2]
);
console.log(answer); // [11, undefined, 13, undefined, 15, undefined]
```

- map은 원본배열을 탐색하면서 새로운 배열을 만들어줌.
  - 근데 **새롭게 만든 배열은 원본배열과 길이는 동일함**

<br>

---

<br>

### 3. filter

- filter는 콜백함수가 참을 리턴했을 때 그 요소만 새로운 배열의 요소로 저장함
- 원하는 요소만 딱 뽑아내는 기능을 담당함.

```JS
function filter(predicate, thisArg) {
  // 여기는 뇌피셜, 이해를 돕기 위해
  let list = [];
  for (let i = 0; i < a.length; i++) {
    if (predicate(a[i], i)) return list.push(a[i]);
  }
  return list;
}

let a = [11, 12, 13, 14, 15, 16];
let answer = a.filter(
  function (v, i) {
    return v % 2 === 0; // 콜백함수가 참을 리턴했을 때 그 요소만 새로운 배열의 요소로 저장함
  },
  [1, 2]
);
console.log(answer); // [12 ,14, 16]
```

<br>

---

<br>

### 4. reduce

```JS
// reduce
function reduce(predicate, val) {
  // 여기는 뇌피셜, 이해를 돕기 위해
  let result = val; // 초기값은 val
  for (let i = 0; i < a.length; i++) {
    result = predicate(result, a[i]);
  }
  return result;
}

let a = [11, 12, 13, 14, 15, 16];
let answer = a.reduce(function (acc, v) {
  return acc + v;
}, 0);
console.log(answer); // 81
```

- 초기 값을 두 번째 인자로 설정해 준 후 배열 요소를 하나씩 더해서 누산해줌

```
  1. 초기값(0) + 11 = 11
  2. 11 + 12 = 23
  3. 23+ 13 = 36
  4. 36 + 14 = 50
  5. 50 + 15 = 65
  6. 65 + 16 = 81
     retrun 81
```
