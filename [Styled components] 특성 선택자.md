# Styled components

### CSS 특성 선택자

```TSX
<Button
  onClick={() => setPage(page + 1)}
  disabled={page === numPages}
></Button>;

const Button = styled.button`
  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }
`;
```

- styled components를 사용할 때 [특성선택자](https://developer.mozilla.org/ko/docs/Web/CSS/Attribute_selectors)를 이용하여 disabled 되었을 시 스타일을 변경시켜줄 수 있음.

<br>

### 참고자료

https://www.daleseo.com/react-pagination/  
페이지네이션
