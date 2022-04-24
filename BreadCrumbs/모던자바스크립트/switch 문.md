### 8.2.2 switch 문

---

- `switch`문은 주어진 표현식을 평가하여 그 값과 일치하는 표현식을 갖는 case 문으로 실행 흐름을 옮김.
- case 문은 상황을 의미하는 표현식을 지정하고 콜론으로 마침.
  - 그리고 그 뒤에 실행할 문들을 위치시킴
- `switch`문의 표현식과 일치하는 ㅊase 문이 없다면 실행 순서는 `default` 문으로 이동
  - `default`문은 사용할 수도 있고 사용하지 않을 수도 있음.

```
switch (표현식){
    case 표현식1:
        switch 문의 표현식과 표현식1이 일치하면 실행될 문;
        break;
    case 표현식2:
        switch 문의 표현식과 표현식2이 일치하면 실행될 문;
        break;
    default:
        switch 문의 표현식과 일치하는 case 문이 없을 때 실행될 문;
}
```

- `if...else`문의 조건식은 불리언 값으로 평가되어야 하지만, switch 문의 표현식은 불리언 값보다는 문자열이나 숫자 값인 경우가 많음.
- 즉, `switch` 문의 논리적 참, 거짓보다는 다양한 상황에 따라 실행할 코드 블록을 결정할 때 사용

```
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = "January";
  case 2:
    monthName = "February";
  case 3:
    monthName = "March";
  case 4:
    monthName = "April";
  case 5:
    monthName = "May";
  case 6:
    monthName = "June";
  case 7:
    monthName = "July";
  case 8:
    monthName = "August";
  case 9:
    monthName = "September";
  case 10:
    monthName = "October";
  case 11:
    monthName = "November";
  case 12:
    monthName = "December";
  default:
    monthName = "Invalid month";
}
console.log(monthName); //Invalid month
```

- 위 예제를 실행해 보면 `Invalid month`가 출력됨.
- `fall through`현상
  - switch 문을 탈출하지 않고 switch 문이 끝날 때까지 이후의 모든 case 문과 default 문을 실행하는 현상
  - 즉 마지막까지 모두 실행되고 `Invalid month`가 재할당 됨.
- 이를 방지하기위해 `break`를 활용해야함

```
var month = 11;
var monthName;

switch (month) {
  case 1:
    monthName = "January";
    break;
  case 2:
    monthName = "February";
    break;
  case 3:
    monthName = "March";
    break;
  case 4:
    monthName = "April";
    break;
  case 5:
    monthName = "May";
    break;
  case 6:
    monthName = "June";
    break;
  case 7:
    monthName = "July";
    break;
  case 8:
    monthName = "August";
    break;
  case 9:
    monthName = "September";
    break;
  case 10:
    monthName = "October";
    break;
  case 11:
    monthName = "November";
    break;
  case 12:
    monthName = "December";
    break;
  default:
    monthName = "Invalid month";
}

console.log(monthName); //November
```

- `if...else`문으로 해결할 수 있다면 `if...else`문을 사용하는 편이 좋음.
- 하지만 조건이 너무 많아서 `if...else`문보다 `switch`문을 사용했을 때 가독성이 더 좋다면 `switch`문을 사용
