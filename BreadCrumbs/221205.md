# Javascript

## 비동기 처리에 대한 헷갈림

```JS
export const progressRacingCar = (racingCar, count = 1) => {
  const numberOfAttempts = DOM.NUMBER_OF_ATTEMPTS_INPUT.valueAsNumber; // 3이라고 가정
  startRacingCar(racingCar);
  console.log(count); // 1

  const intervalId = setInterval(() => {
    const isFinishRacing = count++ > numberOfAttempts;
    startRacingCar(racingCar); // 변수가 할당 → 연산
    console.log(count, isFinishRacing, numberOfAttempts); // 1, false, 3

    if (isFinishRacing) {
      clearInterval(intervalId);
    }
  }, 3000);
};
```

- console을 찍은 위치 때문에 더 헷갈림
- count는 1로 할당되고 isFinishRacing을 검사함
- 근데 console을 찍은 위치때문에 isFinishRacing에서 검토된 count는 1이지만, console은 2라고 찍힘.
- 그래서 count가 5까지 된 이후 멈춤

<br>

![전위연산자와 후위연산자](../screen/%EC%A0%84%EC%9C%84%EC%97%B0%EC%82%B0%EC%9E%90%EC%99%80%20%ED%9B%84%EC%9C%84%EC%97%B0%EC%82%B0%EC%9E%90.png)

<br>

```JS
export const progressRacingCar = (racingCar, count = 1) => {
  const numberOfAttempts = DOM.NUMBER_OF_ATTEMPTS_INPUT.valueAsNumber;
  startRacingCar(racingCar);
  console.log(count);

  const intervalId = setInterval(() => {
    console.log(count, numberOfAttempts); // console의 위치를 변경하고
    const isFinishRacing = count++ > numberOfAttempts; // 평가하고 ++

    console.log(isFinishRacing); // isFinishRacing을 평가

    startRacingCar(racingCar);

    if (isFinishRacing) {
      clearInterval(intervalId);
    }
  }, 3000);
};
```

![전위연산자와 후위연산자 수정](../screen/%EC%A0%84%EC%9C%84%EC%97%B0%EC%82%B0%EC%9E%90%EC%99%80%20%ED%9B%84%EC%9C%84%EC%97%B0%EC%82%B0%EC%9E%902.png)

- 위와 같이 코드를 변경했을 때 명확히 확인이 가능했음.

<br>

### 핵심

- 후위연산자(count++) 같은 경우, 변수에 할당한 후 연산이 진행된다.
- 전위연산자(++count) 같은 경우, 연산이 진행된 후 변수에 할당된다.

<br>

### 참고자료

[JavaScript :: 증감 연산자(++, --) Feat. 전위 연산자, 후위 연산자](https://velog.io/@iamhayoung/JavaScript-%EC%A6%9D%EA%B0%90-%EC%97%B0%EC%82%B0%EC%9E%90-Feat.-%EC%A0%84%EC%9C%84-%EC%97%B0%EC%82%B0%EC%9E%90-%ED%9B%84%EC%9C%84-%EC%97%B0%EC%82%B0%EC%9E%90)
