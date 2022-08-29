# redux

> redux는 상태관리할 때 사용하는 라이브러리

store

- 저장공간

```JS
const store = createStore(reducer);
```

reducer

- store안에 있는 state를 어떻게 바꿀 것인가?

```JS
const reducer = (currentState, action) => {
  if (currentState === undefined)
    return {
      // 기본 state를 설정
      number: 1,
    };
  const newState = { ...state };
  return newState;
};
```

- reducer안에 인자로는 state와 action을 받음

<br>

### redux 4인방이 있음

> `import { Provider, useSelector, useDispatch } from 'react-redux';`  
> **이번엔 connect는 사용하지 않음, 제외.**

  <br>

- **1. Provider**
  - Provider로 감싸준 컴포넌트 안에서는 store안에 있는 state를 사용할 수 있음.

```JS
<Provider store={store}>
  <Left1></Left1>
  <Right1></Right1>
</Provider>
```

<br>

- **2. useSelector()**
  - Number의 값을 Left3의 component에 표시해보기

```JS
function Left3(props) {
  const number = useSelector((state) => state.number);
  return (
    <div>
      <h1>Left3 : {number}</h1>
    </div>
  );
}
```

<br>

- **3. useDispatch()**
  - 클릭을 했을 때 Left3의 number를 변경시켜보기
  - `dispatch({ type: 'PLUS' })`로 이벤트를 걸어줬을 때 호출되는 건 **`Reducer`**

```JS
function Right3(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Right3</h1>
      <input
        type="button"
        value="+"
        onClick={() => {
          dispatch({ type: 'PLUS' });
        }}
      ></input>
    </div>
  );
}
```

<br>

- **+Reducer**

  - `Reducer`는 다음과 같이 설정해주기

```JS
function reducer(currentState, action) {
  if (currentState === undefined) {
    return {
      number: 1,
    };
  }
  const newState = { ...currentState };
  if (action.type === 'PLUS') {
    newState.number++;
  }
  return newState;
}
```

<br>

```JS
function Left2(props) {
  console.log('2');
  return (
    <div>
      <h1>Left2 : </h1>
      <Left3></Left3>
    </div>
  );
}
function Left3(props) {
  console.log('3');
  const number = useSelector((state) => state.number);
  return (
    <div>
      <h1>Left3 : {number}</h1>
    </div>
  );
}
```

- console.log('2')와 console.log('3') 주목해보기
  - onClick 이벤트로 number를 변경하면 Left3은 재 렌더링이 일어남, 하지만 Left2에서는 렌더링이 일어나지 않음.
  - 즉, props를 통해서 유선으로 연결됐던 state와 함수가 redux를 이용해서 무선으로 연결되도록 구현.

<br>

### 참고자료

https://www.youtube.com/watch?v=yjuwpf7VH74  
생활코딩

https://stackblitz.com/edit/react-v5cp7a?file=src%2FApp.js  
예시코드
