# TypeScript & JavaScript

> 사이드프로젝트를 진행하며 해결하고, 알게된 점 기록

## styled components 타입 매기기

- 모달 컴포넌트에 스타일을 적용할 때 조건부로 걸어주기 위해 props를 내려줌.
- props로 내려줄 때 typescript에선 다음과 같이 type을 매김

```TSX
const ModalWrapper = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const ModalOverlay = styled.div<{ name: string; visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};

  background: ${({ name }) =>
    name === 'loading' ? 'white' : 'rgba(0,0,0,0.6)'};
`;
```

<br>

### 참고자료

https://velog.io/@hwang-eunji/styled-component-typescript  
styped components에 타입을 매김
