# TypeScript

## 타입가드

문제상황

```TSX
interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

function Introduce(): Developer | Person {
  return {name: "KeunHwee", age: 31, skill: "Iron Making"};
}

var tony = Introduce();
console.log(tony.skill); // Error 발생
```

![name만 접근가능](/screen/%EC%9C%A0%EB%8B%88%EC%98%A8%20name%EB%A7%8C%20%EC%A0%91%EA%B7%BC.png)

- Interface로 타입을 선언하고, Introduce 타입은 유니온(Develop + Person)으로 선언했음
- Introduce을 tony 변수에 담고 tony.skill을 출력하려 할 때, 에러가 발생함.
- 유니온타입은 타입의 공통된 속성만 접근할 수 있음. 즉, `tony.name`만 접근가능함.

<br>

## 타입단언을 이용해서 skill 뽑아내기

```TSX
if (tony as Developer ).skill{
  var skill = (tony as Developer).skill
  console.log(skill)
}
```

- 하지만 age를 찍으려면 또 이런 if문을 만들어야함.
- 가독성이 떨어짐 → **타입가드를 사용하기**

<br>

## 타입가드를 이용해서 skill 뽑아내기

```TSX
//타입가드 정의
function isDeveloper(target: Developer | Person): target is Developer {
  return (target as Developer).skill !== undefined;
}

//타입가능 활용
if (isDeveloper(tony)) {
  tony.skill;
} else {
  tony.age;
}

```

- 인자로 넘긴 target이 Developer이라면 skill이 undefined가 아니므로 target은 **Developer을 타입으로 지정**
- Developer.skill이 undefined라면 type은 **Person으로 지정**

<br>

- 타입가드를 사용하면 다음과 같이 ifelse를 이용해서 key값을 사용가능   

  ![target의 타입이 Developer일 때](/screen/%ED%83%80%EC%9E%85%EC%9D%B4%20Developer.png)

  <br>

  ![target의 타입이 Person일 때](/screen/%ED%83%80%EC%9E%85%EC%9D%B4%20Person.png)
