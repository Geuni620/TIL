# CSS

> min(), max(), clamp()

### clamp()

```CSS
div{width: clamp(350px, 50%, 500px)} // clamp(min, prefered, max)
```

- 부모태그 width 사이즈는 1920px임
- 부모태그 너비가 1000px까지는 → div박스의 크기가 500px로 유지됨
- 부모태그 너비가 1000px이 되면 → div박스는 부모너비의 50%를 유지함.
- 부모태그 너비가 700px 미만으로 떨어지면 → div 박스의 크기는 350px로 고정 됨

### min()

```CSS
div {width: min(50%, 400px)}
```

- 다음은 div박스의 부모 element가 800px되기 전까지 div박스는 400px를 유지하다가, 800px 미만으로 떨어지면 div는 부모 element의 50% 크기로 줄어들게 됨.

<br>

### max()

```CSS
div {width: max(50%, 400px)}
```

- 다음은 div박스의 부모 element가 800px되기 전까지 div박스는 부모의 50%크기를 유지하다가, 800px 미만으로 떨어지면 400px로 고정 됨

<br>

### min-width / max-width

```CSS
min-width: 700px
max-width: 700px
```

- min-width는 element의 width값이 700px보다 작아지는 것을 방지함.
- max-width는 element의 width값이 700px보다 커지는 것을 방지함.

### 참고자료

[min(), max() 및 clamp(): 오늘날 사용할 수 있는 세 가지 논리적 CSS 함수](https://web.dev/i18n/ko/min-max-clamp/)

<br>

[min() 예시](https://codepen.io/una/pen/rNeGNVL)
[max() 예시](https://codepen.io/una/pen/RwaZXqR)
[clamp() 예시](https://codepen.io/una/pen/bGpoGdJ)
