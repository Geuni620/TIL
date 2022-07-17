# TypeScript & Redux-toolkit

## Redux toolkit 비동기 처리방법

```TSX
// loginSlice.ts
const loginSlice = createSlice({
  name: 'LoginStep',
  initialState,
  reducers: {
    // 동기처리
  },
  // 비동기처리
  extraReducers: (builder) =>
    builder.addCase(loginAsync.fulfilled, (state, { payload }) => ({
      ...state,
    })),
});
```

- redux toolkit는 비동기처리를 extraReducers에서 정의해줌.

  - extraReducers에 정의하는 방법에는 두 가지가 있음

  ```TSX
  // pending fulfilled reject
  extraReducers: {
    [loginAsync.fulfilled](state, { payload }) {
      state.data = payload;
    },
  },
  ```

  ```TSX
  // pending fulfilled reject
  extraReducers: (builder) =>
      builder.addCase(loginAsync.fulfilled, (state, { payload }) => ({
      ...state,
      })),
  ```

  - 두 가지 모두 적용해보려고 시도했음.
  - typeScript 관점에서 아래의 작성방식이 훨-씬 좋았음
  - 그 이유는 **타입추론이 잘 되기 때문**
    - 위의 방식으로 작성하면 type error가 발생함
  - 즉 타입스크립트에서 redux-thunk을 사용한다면 아래 작성방법으로 할 것!

<br>

## redux-toolkit thunk의 비동기처리 unwrap 적용

```TSX
const result1 = await dispatch(loginAsync());
const result2 = await dispatch(loginAsync()).unwrap();
    console.log(result1.payload);
    console.log(result2);
```

- console.log()를 찍어보면 결과값이 동일하게 출력되는 것을 알 수 있음
- 콜백으로 분기처리가 필요하다면 이렇게도 사용해볼 수 있음

```TSX
const result2 = await dispatch(loginAsync()).unwrap().then((res) => console.log(res));
```

- 좋은 방식인지 잘 모르겠지만, 콜백으로 결괏값을 핸드링 할 수 있음

```TSX
const onClick = () => {
  dispatch(fetchUserById(userId))
    .unwrap()
    .then((originalPromiseResult) => {
      // handle result here
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
    })
}
```

- 공식문서는 click event에 다음과 같은 비동기처리를 구현할 수 있다고 제시함.

<br>

### 참고자료

https://redux-toolkit.js.org/api/createAsyncThunk
https://velog.io/@raejoonee/createAsyncThunk  
unwrap() 사용방법
