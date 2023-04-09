# next js

## Modal 창 만들기

> react에서 사용했던 모달창 만드는 방법과 약간의 차이가 존재하는 듯 함

```TS
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const rootElement = document.getElementById('modal');
  return ReactDOM.createPortal(children, rootElement);
};

export default Portal;
```

- 이러한 방법으로 modal을 생성하려 했는데 에러가 발생했음.
  `error: document is not defined`

```TS
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps {
  children: ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: PortalProps) => {
  const element =
    typeof window !== 'undefined' && document.getElementById(selector);

  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
```

### 에러의 원인

- next는 SSR로 서버에서 보여질 HTML을 미리 준비해 클라이언트에 응답해줌
- 웹페이지를 렌더링할 때 초기에 window, document 전역객체는 선언되지 않아 해당 변수를 참조할 수 없어서 발생한 에러.
- 즉, window나 document가 undefined가 아닐 때 modal창을 렌더링 시켜주면 됨

<br>

### utils로 isBrowse 함수 만들기

```ts
// utils
export const isBrowser = () => typeof window !== "undefined";

// Portals
const Portal = ({children, selector}: PortalProps) => {
  const element = isBrowser && document.getElementById(selector);

  return element && children ? ReactDOM.createPortal(children, element) : null;
};
```

- 다음과 같이 수정해줬음.

<br>

### 참고자료

[NextJS : document is not defined 오류](https://ryuhojin.tistory.com/8)

[Portal 사용법 (nextjs, cra)](https://kyounghwan01.github.io/blog/React/next/use-portal/#next%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-portal-%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%80%E1%85%B5)

- document is not defined 또는 window is not defined 에러 해결방법

---

[How to solve "window is not defined" errors in React and Next.js](https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97/comments)

[Gatsby - the window is not defined error, what and how to fix it?](https://blog.greenroots.info/gatsby-the-window-is-not-defined-error-what-and-how-to-fix-it)

- isBrowse 함수 만드는 아이디어를 얻음
