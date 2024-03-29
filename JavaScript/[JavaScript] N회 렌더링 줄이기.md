# Javascript

> DOM 조작시 N회 렌더링 줄이기

```JS
// racingCar.map에서 carWrapper이 만들어질 때마다 DOM에 추가됨 → N회 렌더링이 발생
const createRacingCar = (racingCar) => {
  racingCar.map((car) => {
    const carWrapper = document.createElement("div");
    const carElement = document.createElement("div");

    carWrapper.className = "mt-4 d-flex flex-col car";
    carElement.className = "car-player";
    carElement.textContent = car.name;

    carWrapper.appendChild(carElement);
    DOM.RACING_CAR_RENDER_SECTION.appendChild(carWrapper);

    showElement(DOM.RACING_CAR_RENDER_SECTION);
  });
}
```

<br>

```JS
// map으로 carWrapper을 만들고, fragment에 추가해줌
  export const createRacingCar = (racingCar) => {
  const fragment = document.createDocumentFragment();

  racingCar.forEach((car) => {
    const carWrapper = document.createElement("div");
    const carElement = document.createElement("div");

    carWrapper.className = "mt-4 d-flex flex-col car";
    carElement.className = "car-player";
    carElement.innerText = car.name;

    carWrapper.appendChild(carElement);
    fragment.appendChild(carWrapper);
  });

  return fragment;
};

// 생성된 fragment를 DOM에 1번 주입해줌.
  const createdRacingCar = createRacingCar(carNamesArr);
  DOM.RACING_CAR_RENDER_SECTION.appendChild(createdRacingCar);
```

<br>

### 참고자료

[모단자바스크립트 DeepDive 39장 DOM-2](https://glorious-hope-8b0.notion.site/230dd370289046d293097f7f3f1fdc3a?v=a1d8ecd17fb942bc9435d273232534bb)
