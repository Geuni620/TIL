# Styled components

> styled component를 이용해서 transition 적용

<br>

## styled components 화살표 회전주기

```TSX
const ArrowIcon = styled(IoMdArrowDropdown)<{ menuVisible: boolean }>`
  transform: translateY(5px);
  color: grey;
  transition: all 0.2s ease-in;

  transform-origin: center 60%;
  ${({ menuVisible }) => menuVisible && `transform: rotate(-180deg);`};
`;
```

- react-icons로 화살표를 하나 추가해주고, 클릭했을 때 회전하도록 만들고 싶었음.

  - props로 menuVisible boolean을 내려줬고, true면 화살표가 180도 회전하도록 구현.

  - 하지만 기준점이 center라서 화살표가 해당 위치에서 조금 올라가서 자리를 잡아버림.

- transform-origin이라는 속성을 알게됐고, 기준점을 center(50%)에서 조금 아래로 잡아줬음(60%)

  - 수정결과는 화살표 중심 기준으로 회전시킬 수 있었음.

<br>

<details>
<summary>수정 전/후</summary>

### 수정 전

![](../screen/%ED%9A%8C%EC%A0%84%20%EC%A0%84.gif)

<br>

### 수정 후

![](../screen/%ED%9A%8C%EC%A0%84%20%ED%9B%84.gif)

<br>

</details>

<br>

### Warning

![](./screen/styled%20components%20props%20warning.png)

- 다음과 같은 warning이 뜨는데 원인은 대문자를 사용해서 그런 것 같음.
- 블로그에 있는 수정사항들을 적용해보려 했는데, 결국 안되어서 삭제.
- 추후 방법을 알게 되면 다시 적용해보고 싶음

<br>

### 참고자료

[Dropdown 자바스크립트 없이 만들기](https://surviveasdev.tistory.com/entry/Dropdown-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%97%86%EC%9D%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0React)

- 화살표 회전 아이디어는 이 블로그에서 얻음

<br>
