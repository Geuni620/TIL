# twin-macro

> tailwind + styped-components

## 작성방법

사실 작성방법이 여러가지라서 더 헷갈리는 것도 있는 듯.

<br>

## 작성방법

### Case.1

> 일반적인

```TSX
// 기본 작성 방법, 두 가지 모두 유연하게 작성 가능.
const Example = tw.div`w-full h-full`;

const Example = styled.div`
  width: 100%;
  height: 100%;
`;
```

<br>

### Case.2

> styled, css, tailwind 함께 작성할 때

```TSX
import tw, { styled, css } from 'twin.macro';

// tailwind와 styled-component를 함께 사용하는 방법은 이게 다 인듯 함.
const Example = styled.div`
  ${tw`w-full h-full`};
  border-top: 0.7px solid ${({ theme }) => theme.color.gray};
`;

const Example = styled.div(
  tw`w-full h-full`,
  css`
    border-top: 0.7px solid ${({theme}) => theme.color.gray}
  `,
);
```

<br>

### Case.3

Props 내려줄 경우

```TSX
// Modal active, hidden 조건
const ModalWrapper = styled.div(({ visible }: ModalWrapperProps) => [
  tw`
    box-border
    fixed
    inset-0 outline-0
    z-50
    overflow-auto
    `,

  visible ? tw`block` : tw`hidden`,
]);
```
