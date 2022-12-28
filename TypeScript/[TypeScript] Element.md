# TypeScript

## DOM 함수 관련 타입 오류 분석

![](/screen/innerText%20%ED%83%80%EC%9E%85%EC%97%90%EB%9F%AC.png)

- 캡처사진에서 볼 수 있듯이 innerText type에러가 생긴 것을 볼 수 있음
- 이런 DOM 함수 관련 타입 오류를 분석해보고 해결해보자

<br>

![](/screen/Element%20InnerText.png)

- innerText 마우스를 올려보면 TS2339에러가 발생한 것을 확인할 수 있음.
- Element 형식에 innerText 속성이 없다는 에러를 확인.

<br>

![](/screen/deathTotal%20type.png)

- deathTotal 타입을 확인해본 결과 Element인 것을 확인.

<br>

```TSX
// utils
function $(selector: string) {
  return document.querySelector(selector);
}

// DOM
Element
const deathsTotal = $(".deaths");
```

- `.deaths`라는 클래스에 DOM으로 접근한 것이 deathsTotal임

```HTML
<p class="total deaths">0</p>
```

- 그리고 deathsTotal이 DOM으로 접근했던 class의 HTML tag는 P태그임.

<br>

### Element | HTMLElement | HTMLParagraphElement

> Element, HTMLElement, HTMLParagraphElement가 뭐지?

- Element에서 확장을 통해 더 구체적으로 정의한 것이 **HTMLElement**
- HTMLElement에서 확장을 통해 더 구체적으로 정의한 것은 **HTMLParagraphElement**임

```TSX
const deathsTotal:HTMLParagraphElement = $(".deaths");
```

- 이렇게 정의하면 deathTotal에서 에러가 발생함

![](/screen/Element%EC%99%80%20HTMLparagraph%20Element%20%EC%B0%A8%EC%9D%B4.png)

- 원인은 호환문제

  - Element에서 구체화한게 HTMLParagraphElement인데 이 속성은 여기에 없음
  - `missing following properties`에러 문구의 단서를 기억하기.

<br>

## DOM 함수 타입 오류 해결하기

- 내부적으로 뜯어보면 다음과 같은 타입정의를 확인할 수 있음

```TSX
// HTMLElement
interface HTMLElement extends Element {
    accessKey: string;
    readonly accessKeyLabel: string;
    autocapitalize: string;
    // ... 확장된 정의들
}

// HTMLParagraphElement
interface HTMLParagraphElement extends HTMLElement {
    // ... 확장된 정의들
}
```

- 위에서도 언급했듯 HTMLElement는 Element 타입을 상속받아 추가적으로 정의하였음
- 그리고 HTMLParagraphElement는 HTMLElement를 상속받음
- 위의 HTMLElement 인터페이스에서 Element를 상속받아 추가적으로 정의한 것들은 위에 호환문제로 발생했던 에러의 캡처본에서 속성이 없다고 뜬 문구의 키워드와 동일한 것을 확인할 수 있었음.
- 즉 Element에는 accessKey, accessKeyLabel, autocapitalize과 같은 타입이 정의되어 있지 않아서 호환문제가 발생했음

<br>

### 타입단언으로 해결하기

> Element에는 없는데 더 구체적으로 작성한 타입이 있다면, 이것으로 타입단언해주기

```TSX
const deathsTotal = $(".deaths") as HTMLParagraphElement;
const confirmedTotal = $(".confirmed-total") as HTMLSpanElement;
```

- deathsTotal은 HTML p태그 클래스에 접근해서 DOM을 조작함
- 그래서 HTMLParagraphElement로 타입단언해줌
- Span태그의 DOM에 접근했다면 아래와 같이 HTMLSpanElement로 타입단언해주면 됨

<br>

### 참고자료

https://www.inflearn.com/course/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8B%A4%EC%A0%84/dashboard
