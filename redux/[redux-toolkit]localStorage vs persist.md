# redux

- redux에 회원가입시 imageUrl을 store에 담아줬음.  
  그리고 로그인을 하면 프로필에 해당 url을 띄워줬음.
- 하지만 새로고침을 했을 때 redux의 store가 리셋된다는 사실을 알게 됐고, image url 역시 리셋되어버림.
- 결과적으론 get으로 요청을 보내서 유저정보를 state에 담고 imageUrl을 렌더링 해주었음.
- 그 과정에서 persist라는 redux 기능을 알게 됨

<br>

- 사용방법은 아주 간단함.
- 불필요한 부분을 삭제하면 다음과 같이 작성하면 끝

```TSX
// store.ts
const reducers = combineReducers({
  counter: counterReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});


// index.tsx
const container = document.getElementById("root");
const root = createRoot(container as Element);
let persistor = persistStore(store);

root.render(
  <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
  </React.StrictMode>
);
```

다양한 블로그를 참고했지만 본인은 이 [블로그](https://edvins.io/how-to-use-redux-persist-with-redux-toolkit)가 가장 도움됐던 것 같음.

<br>

## persist 삭제한 이유

- 결과적으론 사이드프로젝트에서 삭제했음.
  - redux store안에는 visible이라는 모달창을 띄워주는 boolean 타입의 state를 관리하고 있음.
  - 회원가입 또는 로그인을 하고 새로고침을 하면 ImageUrl이 localStorage에 잘 보관됨.  
    하지만, visible도 따로 분리없이 보관되어 있다보니, **`로그인을 하면 visible도 같이 떠버림`**
  - 즉 로그인을 하고나서 로그인이 완료되었다는 alert 창이 뜨는데, 여기서 다시 login을 하라는 Modal창이 뜸.
  - redux의 reducer를 분리하면 간단하게 해결될 문제지만, 지금은 백엔드와 프론트엔드 같은 도메인을 사용하기 위해 배포를 한 번에 진행하고 있음.
  - 백엔드쪽에서 자동배포가 완료되어 있지 않은 상황에서 프론트측이 수정을 한 이후 백엔드분들에게 배포를 부탁해야하는 상황,  
    즉 하나하나 확인해볼 수 있는 상황이 아니고 **`확실한경우`**에만 PR을 날리고 배포를 최소화하려고 하고 있음.
  - 이러한 문제점으로 결국엔 원래 잘 돌아가던 get으로 user정보를 받아온 후 image를 렌더링 해주는 방향으로 가닥을 잡았음.

<br>

## 로컬스토리지와 persist의 차이

- persist는 redux를 이용해서 localStoreage 또는 SessionStoreage에 접근할 수 있도록 해주는 라이브러리
- reducer를 이용하면 Storage에 저장한 값을 업데이트 할 수 있다는 장점이 있음.

<br>

### 참고자료

https://edvins.io/how-to-use-redux-persist-with-redux-toolkit  
기능 구현을 위해 가장 많이 참고

<br>

https://velog.io/@_jouz_ryul/LocalStorage-SessiongStorage-%EA%B7%B8%EB%A6%AC%EA%B3%A0-Redux-Persist  
하나하나 설명이 잘 되어있음.
