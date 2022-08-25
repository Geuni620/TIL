# CSS

## em? rem?

- 모달창 구현시 필요한 width는 675px, height는 30rem을 적용했음
  - 30rem을 적용하고 난 후 480px로 고정되어 있었음
  - 이 부분은 [hola](https://holaworld.io/) 페이지 모달창 hegiht를 참고했음
- rem의 기준이 무엇인지 궁금해졌음.

  - padding 값을 조정해주어야 했는데 480px이 어떻게 나온 것인지 알아야 그 기준에 맞게 padding을 줄 수 있기 때문

- em과 rem은 상대단위임
  - 절대적 단위로는 px을 많이 사용함
  - 하지만 상대적으로 width와 height를 적용할 땐 em 또는 rem을 사용

<br>

## font-size

- em과 rem의 기준은 **font-size임**

  - 예를 들어 font-size가 16px일 경우 em과 rem은 다음과 같이 값을 줄 수 있음

    ```
        0.5em = 16 px x 0.5 = 8px
        1em = 16 px x 1 = 16px
        2em = 16 px x 2 = 32px
        3em = 16 px x 3 = 48px
    ```

  <br>

  - 여기서 font-size를 20px로 늘릴 경우, 상대 단위도 다음과 같이 비례해서 증가함
    ```
        0.5em = 20 px x 0.5 = 10px
        1em = 20 px x 1 = 20px
        2em = 20 px x 2 = 40px
        3em = 20 px x 3 = 60px
    ```

<br>

## em과 rem의 차이

- 정확히 어디에 있는 font-size 속성 값인지에 따라 차이가 발생함.
- em은 해당 단위가 사용되고 있는 요소의 font-size 속성 값이 기준이 됨.
- rem은 html의 font-size가 기준임

```CSS
html {
    font-size: 16px
}

// em의 경우 해당 단위가 사용되고 있는 요소의 font-size
div {
  font-size: 20px;
  width: 10em; /* 200px */
}

// rem의 경우 html의 font-size, defalut는 16px
div {
  font-size: 20px;
  width: 10rem; /* 160px */
}
```

- html default font-size가 16px이라는 것을 [stackoverflow](https://stackoverflow.com/questions/29511983/is-the-default-font-size-of-every-browser-16px-why)에서 확인할 수 있었음
- em은 유동적으로 변할 가능성이 농후함, 즉 rem을 사용하자.

<br>

### 참고자료

https://www.daleseo.com/css-em-rem/  
em과 rem 설명

https://www.codingfactory.net/10748  
html 기본 font-size 16px
