# React

> React 18버전에서 새롭게 생긴 것 중 기억나는거 있어요?

## useTransition, useDeferredValue

### useTransition

- input창에 값을 입력하면 만 개의 div에 값을 표출해주는 기능을 하는 웹사이트를 만듦.
- 입력하는 값에 따라서 만 개의 div에 입력값을 표출해주다보니, 반응속도가 느림.

```JSX
const Test = () => {
  const [name, setName] = useState('');
  const a = new Array(10000).fill(0);

  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      {a.map((item, i) => (
        <div key={i}>{name}</div>
      ))}
    </div>
  );
};
export default Test;
```

- useTransition을 사용하면 일부 상태 업데이트를 긴급한 것, 긴급하지 않은 것으로 표시할 수 있음
- 즉 상태 업데이트를 긴급한 것, 긴급하지 않은 것으로 나누어 개발자에게 렌더링 성능을 튜닝하는데 많은 자유를 주었다고 볼 수 있음.

<br>

- useTransition은 두 가지 변수(`isPending`, `startTransition`)를 사용할 수 있게 해줌
- `startTransition`로 성능저하를 일으키는 요소를 감싸줌 (감싸준 부분은 긴급하지 않은 것으로 간주하여, 코드 시작을 뒤로 늦춰줌.)

- `isPending`은 `startTransition`이 처리 중일 경우 true를 반환함.
  - 그래서 isPending이 true라면 '로딩중', false일 경우 'div 만 개 표출'로 조건문을 걸어줄 수 있음.

```JSX
import React, { useState, useTransition } from 'react';

const Test = () => {
  const [name, setName] = useState('');
  const a = new Array(10000).fill(0);
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <input
        type="text"
        onChange={(e) =>
          startTransition(() => {
            setName(e.target.value);
          })
        }
      />

      {isPending ? '로딩중' : a.map((item, i) => <div key={i}>{state}</div>)}
    </div>
  );
};
```

<br>

### 2. useDeferredValue

- useDefferedValue안에 넣은 state는 늦게 처리가 되도록 해줌.
- useTransition과 useDefferedValue는 비슷한 기능을 수행함.

```JSX
import React, { useState, useDeferredValue } from 'react';

const Test = () => {
  const [name, setName] = useState('');
  const a = new Array(10000).fill(0);

  const state = useDeferredValue(name);
  return (
    <div>
      <input type="text" onChange={(e) => setName(e.target.value)} />

      {a.map((item, i) => (
        <div key={i}>{state}</div>
      ))}
    </div>
  );
};
```

### useTranstion과 useDeferredValue 차이점

- 두 hooks를 함께 쓰는 것을 추천하지 않음
- [이 블로그](https://academind.com/tutorials/react-usetransition-vs-usedeferredvalue)에서는 useTransition은 상태 업데이트 코드를 래핑
- useDefferedValue는 상태 업데이트의 영향을 받은 값을 래핑한다는 점이 큰 차이점이라고 말함.
- 즉, 같은 목표를 달성하므로 두 가지를 함께 사용할 필요가 없으며, 함께 사용하지 말라고 제시함.
- useTransition은 상태 제어가 가능할 때 사용하기, props에서 값에만 접근이 가능한 경우엔 useDefferedValue를 사용하면 좋을 것 같음
  - 해당내용은 [이 블로그 글](https://yrnana.dev/post/2022-04-12-react-18)을 인용했음
  - [이 영상](https://youtu.be/lDukIAymutM)에서도 똑같이 말함.

<br>

### 참고자료

[리액트 18버전의 지리는 신기능 3개](https://www.youtube.com/watch?v=wZiOGxOhJNs)

[리액트 v18 버전 톺아보기](https://yceffort.kr/2022/04/react-18-changelog#starttransition-usetransition)

[useDeferredValue로 성능 최적화하기](https://vroomfan.tistory.com/45)

[React 18 에 추가된 useDeferredValue, useTransition 을 써 보자](https://velog.io/@ktthee/React-18-%EC%97%90-%EC%B6%94%EA%B0%80%EB%90%9C-useDeferredValue-%EB%A5%BC-%EC%8D%A8-%EB%B3%B4%EC%9E%90)

[React: useTransition() vs useDeferredValue()](https://academind.com/tutorials/react-usetransition-vs-usedeferredvalue)

[React 18 둘러보기](https://yrnana.dev/post/2022-04-12-react-18)

[useTransition() vs useDeferredValue | React 18](https://youtu.be/lDukIAymutM)
