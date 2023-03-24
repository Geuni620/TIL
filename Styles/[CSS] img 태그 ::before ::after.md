# CSS

### img태그는 ::before ::after 가상요소를 적용할 수 없음

```CSS
const ProfileImageCircle = styled.div(() => [
  tw`relative cursor-pointer select-none `,

  css`
    &:hover {
      &::after {
        position: absolute;
        content: '편집';
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        top: 50%;
        left: 50%;
        background-color: black;
        color: white;
        font-size: 14px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.6;
      }
    }
  `,
]);
```

### 참고자료

[MDN ::before (:before)](https://developer.mozilla.org/ko/docs/Web/CSS/::before)

- 참고: ::before와 ::after로 생성한 의사 요소는 원본 요소의 서식 박스에 포함되므로, <img>나 <br> 등 대체 요소에 적용할 수 없습니다.

<br>

[Does :before not work on img elements?](https://stackoverflow.com/questions/5843035/does-before-not-work-on-img-elements/5843164)
