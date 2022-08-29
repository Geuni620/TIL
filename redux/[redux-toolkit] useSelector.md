# TypeScript

> useSelector을 custom hook으로 만드는 기술 블로그를 보고 따라 작성했음.
> 작성한 내용으로 사이드프로젝트에 적용했는데, 다음 날 다른 팀원분의 댓글이 달렸음.  
> 답변으로 작성한 내용을 바탕으로 TIL 작성.

<br>

## useSelector

```JSX
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'redux/store';

const loginStep = useSelector((state: RootState) => state.login.currentStep);
```

- currentStep를 간략히 소개하면 다음과 같음

  - 로그인 회원가입시 사이드프로젝트에서 만든 창은 Modal임.
  - 모달창이 url 전환없이, currentStep에 따라서 단계별로 렌더링이 되도록 만듦.
  - 즉, currentStep이 1에서 2, 3, 하나씩 올라갈수록 회원가입에 필요한 정보를 입력하는 창이 렌더링 되도록 구현함.

<br>

## Custom hooks

- 사실 Custom Hooks를 만들었다기 보단 블로그를 보고 참고해서 `적용`해보았다는 표현이 더 정확함

- 이 [블로그](https://ridicorp.com/story/how-to-use-redux-in-ridi/)의 글을 참조했음.

<br>

### 적용한 이유

- RootState는 단지 type만을 지정하기 위해 사용했음.
  - 그리고 타입지정을 위해서 사용하는 RootState를 useSelector을 사용할 때마다 import 시켜주어야하는게 번거로웠음.
- 코드상으로도 간결해보이지도 않았음
- 그래서 useRootState라는 custom hooks을 적용해봄

```JSX
// hooks/useRootstate.tsx
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

type StateSelector<T> = (state: RootState) => T;
type EqualityFn<T> = (left: T, right: T) => boolean;

export function useRootState<T>(
  selector: StateSelector<T>,
  equalityFn?: EqualityFn<T>,
) {
  return useSelector(selector, equalityFn);
}
```

다음과 같이 hooks을 만들고 나서 사용할 땐 이렇게 사용했음

```TSX
import { useRootState } from 'redux/hooks/useRootState';
const loginStep = useRootState((state) => state.login.currentStep);
```

- Rootstate를 import 시키지 않아도 된다는 점과 state 타입으로 Rootstate를 적지 않아도 된다는 점이 번거로움을 덜어주었음.

<br>

### 두 번째 매개변수를 hooks를 만들 때 사용한 이유

> 사실 만든게 아니라 적용해본 것이기 때문에 이 질문을 처음 댓글로 보았을 땐 당황했음, 하지만 다음과 같이 정리할 수 있었음.

- useSelector은 매개변수를 두 개 받음
  - selector과 하나는 equalityFn을 받음
  - selector은 위에 state로 받았듯이 필요한 값을 리덕스 store에서 꺼내오는 역할을 해줌.
  - equalityFn은 이전 것과 비교해서 변경된게 있다면 boolean으로 변경사항을 알려주어, 최적화 하는데 이용됨.
    - 즉 변경사항이 있을 때만 렌더링이 되도록 최적화 시킬 수 있음.

<br>

**근데, equalityFn은 코드상에 적용하지 않았는데, 왜 hooks에 적어놓은건가요?**

- 주관적인 생각은 다음과 같음

  - hooks를 만들 땐 틀을 만들어놓고, 만든 hooks를 이용해 간결히 사용함
  - 하나의 정형화 된 틀을 만들어 놓기 위해 selector와 equalityFn 둘 다 매개변수로 적어놓았음.  
    (사실 equalityFn 지워도 에러 나지 않음)

<br>

- 코드상에서 필요없는 매개변수라면 지우는게 마땅하지만, hooks는 다르다고 생각했음. 클래스와 비슷하게 생각했음.

<br>

### 발상의 전환

> 같은 팀원분이 대댓글로 남겨준 글을 보고 참고함.  
> 이렇게 하는건 어떠냐고 대댓글을 남겨주심. 🙏

```JSX
export function useLogin() {
  const loginStep = useSelector((state: RootState) => state.login.currentStep);
  const imageUrl = useSelector((state: RootState) => state.login.imageUrl);
  const modalVisible = useSelector(
    (state: RootState) => state.login.modalVisible,
  );

  return { loginStep, imageUrl, modalVisible };
}

// custom hook 사용할 때
const {loginStep } = useLogin();
```

<br>

**220829**

> [Redux vs MobX](https://www.inflearn.com/course/redux-mobx-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%8F%84%EA%B5%AC/dashboard)에서 키워드를 얻게 됨.

<br>

```JSX
// loginSlice.ts
const initialState = {
  currentStep: 1,
  id: undefined,
  imageUrl: undefined,
  modalVisible: false,
};


// LoginModal.tsx
// #1
const loginStep = useSelector((state: RootState) => state.login.currentStep);
const modalVisible = useSelector((state: RootState) => state.login.modalVisible);

// #2
const {loginStep, modalVisible} = useSelector((state: RootState) => state.login);
```

- #1의 경우 redux store에서 하나씩 값을 가져온 형태이고, #2는 구조분해 할당을 통해서 값을 가져온 형태임
- useSelector는 언제 함수컴포넌트(지금의 경우 LoginModal.tsx)를 언제 재렌더링 시키는가?

  - #1의 loginStep의 경우 state.login.currentStep이 변경되었을 때 함수컴포넌트 재 렌더링
  - #2의 {loginStep, modalVisible}의 경우 state.login이 변경되었을 때 함수컴포넌트 재 렌더링

<br>

- 그럼 login 또는 login.currentStep, login.modalVisible은 언제 바뀌는가?
  - loginSlice.ts에 있는 initialState가 변경되었을 때 해당하는 값들이 바뀌게 됨.
- 즉 login.currentStep가 변경되면 initialState에 있는 currentStep과 비교하여 재 렌더링을 함
- 하지만, login이 변경되면 initialState에 어떤 값과 비교되든 상관없이 재렌더링이 되고, 그로인해 loginStep, modalVisible가 변경되지 않았더라도 구조분해할당으로 값을 가져왔을 땐 재렌더링됨

  - 상태가 바뀌었는지 바뀌지 않았는지 확인할 방법이 없기때문.

- 즉 프로젝트를 진행하며 useSelector으로 #2와 같이 불러온다면 loginStep이 변경되지 않았더라도, login이 변경된다면 loginStep이 재렌더링되고, 해당 함수컴포넌트가 재렌더링 되어버림.
- 이를 막기 위해 `shallowEqual`를 useSelector의 두 번째 인자로 넣어주어야 함.

- 단 성능적으로 크게 문제가 발생하지 않는다고 판단이 되면 구조분해할당으로 값을 가져와도 무방함.

<br>

### 참고자료

https://react-redux.js.org/api/hooks#equality-comparisons-and-updates  
리덕스 공식문서

https://react.vlpt.us/redux/08-optimize-useSelector.html  
벨로퍼트님 useSelector 최적화

https://ridicorp.com/story/how-to-use-redux-in-ridi/  
리디 기술블로그
