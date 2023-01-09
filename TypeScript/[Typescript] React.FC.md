# TypeScript

## React.FC type

`React.FC` Type과 `FunctionComponent` Type은 같음.

<br>

### React.FC Children은 없어짐

![React.FC type have note children](../screen/React.FC%20have%20not%20Children.png)

- children이 옵셔널 형태로 들어가 있었는데, React 18 version이 되면서 수정됨

<br>

```TSX
type Props = {
  children: React.ReactNode;
};

const Greetings: React.FC<Props> = ({children}) => <div>Hello, {name}</div>;
```

이 컴포넌트는 자식 컴포넌트가 꼭 필요하다는 의도를 타입으로 정의(children이 꼭 필요함.)

<br>

```TSX
import React from "react";

type Props = {
  title?: string;
};


export const Greetings: React.FC<React.PropsWithChildren<Props>> = ({  }) => <div>{children}</div>;
```

![React.FC default Children](../screen/React.FC%20chilren%20default.png)

좀 더 표준적인 방법은 PropsWithChildren을 사용
단, 제네릭이 겹칠수록 코드는 복잡해짐.

### 참고자료

[리액트 18의 타입스크립트 타입 변경점](https://blog.shiren.dev/2022-04-28/)

<br>

## React.FC defaultProps

```TSX
// Greeting.tsx
import React from "react";

type GreetingsProps = {
  name: string;
  mark: string;
};

const Greetings: React.FC<GreetingsProps> = ({name, mark}) => (
  <div>
    Hello, {name} {mark}
  </div>
);

Greetings.defaultProps = {
  mark: "!",
};

export default Greetings;

// App.tsx
import React from "react";
import Greetings from "./Greeting";

const App: React.FC = () => {
  return <Greetings name="Hello" />;
};

export default App;
```

defaultProps를 지정해줬지만, Greeting 컴포넌트에선 Error가 발생함.  
![default Error](../screen/defaultProps%20error.png)

<br>

```TSX
import React from "react";

type GreetingsProps = {
  name: string;
  mark: string;
};

const Greetings = ({name, mark}: GreetingsProps) => (
  <div>
    Hello, {name} {mark}
  </div>
);

Greetings.defaultProps = {
  mark: "!",
};

export default Greetings;
```

- React.FC를 제거하고 매개변수의 타입을 지정해주면, Error가 없어짐.

### 참고자료

[2. 리액트 컴포넌트 타입스크립트로 작성하기](https://react.vlpt.us/using-typescript/02-ts-react-basic.html)

<br>

### 전체 참고자료

[React.FC를 사용하지 않는 이유](https://yceffort.kr/2022/03/dont-use-react-fc)

<br>

[타입스크립트 : React.FC는 그만! children 타이핑 올바르게 하기](https://itchallenger.tistory.com/641)

- 해당 블로그 내용 인용, 함수 타입을 return으로 적지않는 이유
  `타입스크립트의 멘탈 모델은 타입 추론을 최대한 활용하여 컴파일러에 최대한 타입과 관련한 작업을 위임하고, 사용자가 사용하는 타입을 단순화 하는 것입니다. 제네릭 타입은 일반적으로 복접도가 높으며, 타입을 장황하게 만듭니다. React.FC의 경우 이 장황함이라는 정도가 그렇게 크지 않음은 인정합니다. 개인적으로 저는 아래 게시물들과 유사한 컨벤션을 선호하기에, 익명 함수를 이용해 컴포넌트를 만들 때 사용하는 FC 타입을 사용하지 않습니다.`

<br>

[How to write a React Component in TypeScript](https://kentcdodds.com/blog/how-to-write-a-react-component-in-typescript)

- Remix Team의 Ken C. Dodds는 다음과 같이 말함  
  `Ok, so what about the return value? Well, we could type it as React.ReactElement or even wider as a JSX.Element. But honestly, I side with my friend Nick McCurdy when he says that mistakes can easily be made causing the return type to be too wide. So even outside a react context, I default to not specifying the return type (rely on inference) unless necessary. And that's the case here.`
  - 반환값을 적절하게 정해줘야함. 타입은 타이트하게 잡을수록 좋음
  - 그래서 오히려 타입을 지정해주는 것보다, 적절히 추론되도록 하는게 좋을 수도 있을 거 같음.

<br>

[Remove React.FC from Typescript template](https://github.com/facebook/create-react-app/pull/8177)
React.FC의 장점과 단점, 정리해보면 크게,

- Select.Item와 같은 component as namespace pattern 불가

```JSX
<Select>
  <Select.Item />
</Select>
```

- 컴포넌트 제네릭화 안됨
- defaultProps 사용 불가
