# redux toolkit

> redux는 상태관리할 때 사용하는 라이브러리

<br>

## configureStore

### redux

```JSX
const {createStore, applyMiddleware, compose} = require("redux");
const {composeWithDevTools} = require("redux-devtools-extension");
const reducer = require("./reducers");

const initialState = {
  user: {
    isLoggingIn: false,
    data: null,
  },
  posts: [],
};

const firstMiddleware = (store) => (dispatch) => (action) => {
  console.log("로깅", action);
  dispatch(action);
};

const thunkMiddleware = (store) => (dispatch) => (action) => {
  if (typeof action === "function") {
    // 비동기
    return action(store.dispatch, store.getState());
  }
  return dispatch(action);
};

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(firstMiddleware, thunkMiddleware))
    : composeWithDevTools(applyMiddleware(firstMiddleware, thunkMiddleware));

const store = createStore(reducer, initialState, enhancer);
```

<br>

### redux-toolkit

```JSX
const {configureStore, getDefaultMiddleware} = require("@reduxjs/toolkit");
const reducer = require("./reducers");

const firstMiddleware = (store) => (dispatch) => (action) => {
  console.log("로깅", action);
  dispatch(action);
};

const store = configureStore({
  reducer,
  middleware: [firstMiddleware, ...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== "production",
});
```

- firstMiddleware만 넣으면 기존에 가지고 있던 thunkmiddleware 이런건 제외됨
- 그래서 `...getDefaultMiddleware()`를 import 시키고 추가

<br>

## createSlice

### redux

```JSX
// reducers/index.js
const {combineReducers} = require("redux");
const userReducer = require("./user");
const postReducer = require("./post");

module.exports = combineReducers({
  user: userReducer,
  posts: postReducer,
});

```

<br>

### redux-toolkit

```JSX
// reducers/index.js
const {combineReducers} = require("redux");
const userSlice = require("./user");
const postSlice = require("./post");

module.exports = combineReducers({
  user: userSlice.reducer,
  posts: postSlice.reducer,
});
```

- slice는 다양한 것을 다 합쳐놓은 개념
- reducer도 있고, action도 있음.
- 그래서 conbineReducers는 [createStore에 넘길 수 있는 하나의 reducer 함수로 바꿔주는 기능](https://redux.js.org/api/combinereducers)을 하니, slice안에 있는 reducer를 지정해주어야 함.

<br>

```JSX
// reducers/user.js
const {createSlice} = require("@reduxjs/toolkit");

const initialState = [
  {
    isLoggingIn: false,
    data: null,
  },
];

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // 동기적 or 내부적()
    // 로그아웃을 예시로 동기적으로 처리된다고 가정
    logout(state, action) {
      // state는 initialstate 구조를 따라갈 것
      state.data = null;
    },
  },
  extraReducers: {
    // 비동기적 or 외부적()
  },
});
```

- reducers과 extraReducers가 있는데 둘의 차이는 다음과 같음
  - reducers: 동기적, 내부적
  - extraReducers: 비동기적, 외부적

<br>

### action

- action은 따로 다시 만들필요 없음.
  - 이젠 slice가 알아서 만들어줌
  - 더이상 action을 따로 관리할 필요가 없음

```JSX
// App.js
const userSlice = require("./reducers/user");

const onLogout = useCallback(() => {
    dispatch(
      userSlice.actions.logout({
        id: null,
        pw: null,
      })
    );
  }, []);
```

<br>

- redux에서는 action에 동기, 비동기 모두 함께 사용했음
- toolkit에선 slice안에 동기적인 관리 모두 들어있음
- 비동기처리는 action에서 관리
  - 즉, `toolkit의 action은 비동기적인 관리를 하는 곳`

```JSX
// action/user.js
const {createAsyncThunk} = require("@reduxjs/toolkit");

const login = createAsyncThunk("user/login");

// 서버가 없음, 비동기처리 구현하기 위해 delay함수 추가
const delay = (time, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

// 비동기처리 구현
const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  // const state = thunkAPI.getState(); // 현재 reducer의 state를 가져올 수 있음.
  // console.log(state.user.data);

  // 여기에 비동기요청을 하면 됨
  const result = await delay(500, {
    userId: 1,
    nickName: "KeunHwee",
  });
  return result;
});
```

<br>

### pending, fulfilled, rejected

```JSX

// reducers/user.js
const {login} = require("../actions/user");

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // 동기적 or 내부적()
    // 로그아웃을 예시로 동기적으로 처리된다고 가정
    logout(state, action) {
      // state는 initialstate 구조를 따라갈 것
      state.data = null;
    },
  },
  extraReducers: {
    // 비동기적 or 외부적()
    [login.pendgin](state, action) {
      state.isLoggingIn = true;
    },
    [login.fulfilled](state, action) {
      state.data = action.payload;
      state.isLoggingIn = false;
    },
    [login.rejected](state, action) {
      state.isLoggingIn = true;
    },
  },
});

```

- action에 대한 data는 action.payload에 담겨있음.
- 현재 action.payload에 담기는 데이터는 `actions/user.js`
- result 안에 들어있는 데이터가 됨.

<br>

```JSX
const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  // App.js의 login에 지정해준 data를 담아서 서버로 보냄
  console.log(data);

  // const state = thunkAPI.getState(); // 현재 reducer의 state를 가져올 수 있음.
  // console.log(state.user.data);
  // 여기에 비동기요청을 하면 됨
  const result = await delay(500, {
    // 서버의 응답을 여기에 담아주면 되는데, 우리는 서버없어서 mocking했음
    userId: 1,
    nickName: "KeunHwee",
  });
  return result;
});
```

<br>

### 참고자료

https://www.inflearn.com/course/redux-mobx-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%8F%84%EA%B5%AC/dashboard
