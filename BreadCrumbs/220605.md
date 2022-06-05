# 배운 내용

### Sort 메서드

> 알고리즘 풀다가 sort에 대해서 알게 된 점 정리

```JS
var numbers = [5, 0, 2, 7, 15, 21];
solution(numbers);
function solution(numbers) {
  console.log(numbers.sort()); // [ 0, 15, 2, 21, 5, 7 ]
}
```

- sort정렬을 쓰면 number 타입으로 숫자 정렬이 이루어 지지 않고, string 타입으로 정렬이 이루어짐

<br>

- 해결방법은 다음과 같이 할 수 있음

```JS
var numbers = [5, 0, 2, 7, 15, 21];
solution(numbers);
function solution(numbers) {
  console.log(numbers.sort((a, b) => a - b)); // [ 0, 2, 5, 7, 15, 21 ]
}
```

- a - b로 오름차순 정렬 할 수 있음
- b - a로 내림차순 정렬 할 수 있음

### 참고자료

https://codechacha.com/ko/javascript-sorting-arr/  
sort() 숫자타입 정렬 방법에 대해서 알게 됨.

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort  
MDN에서도 확인가능
