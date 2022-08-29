# redux toolkit

> 백엔드 통신으로 부터 받은 google_number를 전역으로 관리하기 위해 contextAPI와 redux를 고민했음.
> 결과적으론 redux를 선택했고, redux-toolkit을 적용함

### contextAPI가 아니라 redux를 사용한 이유

- 가장 큰 이유는 redux를 사용해보고 싶어서.
- 기존 redux과 redux-toolkit 모두 사용해보고 싶었음.(비교))
- 의견은 다양했음
  - contextAPI로 처리할 수 있다면 contextAPI를 사용하는게 베스트하다.
  - 아니다. contextAPI로 구현하다보면 결국 코드만 방대해 질 뿐 redux로 관리하는게 훨씬 깔끔하고, 간결하다 등등
  - contextAPI로 사용했다가 확장성을 고려해서 redux로 변경하는 작업을 하는 것보단, redux를 익히고 추후에 recoil과 react-query 등도 다뤄보고 싶은 욕심에 redux로 선택했음.
    - 어쨌든 사이트 프로젝트이니까. 회사였다면 contextAPI를 사용했을 뜻.

### React-redux toolkit + typeScript

- redux폴더에 redux 관련된 모든 파일을 관리함

```TSX
// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './reducers/loginSlice';

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

- configureStore는 reducer와 action을 모두 사용할 수 있게 해줌.

<br>

```JSX
//reducers/userSlice

import { createSlice } from '@reduxjs/toolkit';
import logIn from '../actions/login';

const initialState = {
  isLogginIn: false,
  data: [],
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // google_access_id 만 전역으로 관리할 예정.
  },
  extraReducers: (builder) =>
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.data = action.payload;
    }),
});

export default loginSlice;
```

- 초기 initialState를 설정
- `reducers`는 동기처리를 하기 위함
- `extraReducers`는 비동기처리를 하기 위함
  - google_number는 네트워크 통신을 통해 받아야하므로 비동기처리
  - 즉, `extraReducers`를 사용해야함

<br>

```JSX
// actions/login.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface MyData {
  id: string;
  age: number;
}

const logIn = createAsyncThunk('user/logIn', async (data, thunkAPI) => {
  return axios({
    method: 'get',
    url: 'url/user/sign',
  }).then((response) => response.data);
});

export default logIn;
```

- actions 폴더는 redux-toolkit에서 비동기처리를 위한 action만 관리.
- 동기처리는 reducers로 관리가능함 -> `createSlice`덕분
- 참고로 포스트맨을 사용해서 임의로 비동기처리를 구현해봄.

<br>

```JSX
// Login/Login.tsx
import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import logIn from '../../redux/actions/login';
export type RootState = ReturnType<typeof store.getState>;

// 주의!!!
export const useAppDispatch = () => useDispatch<AppDispatch>();

const login = useSelector((state: RootState) => state.login.data);
  const dispatch = useDispatch<AppDispatch>();

  const getGoogleNumber = useCallback(() => {
    console.log('hi');
    dispatch(logIn());
  }, []);

return (
  <LoginBtn onClick={getGoogleNumber}>
    <FcGoogle size={50} />
    <div>구글로 로그인하기</div>
  </LoginBtn>
)
```

- 주의!!! 라고 적힌 부분을 주목해보기

* useDisPatch에 타입을 지정해주지 않았을 때, `dispatch(logIn())`에서 타입에러가 발생했음
* state에 any 타입으로 줬다가 변경했음
  - store.js의 `<RootState>`를 import하고 지정해주니 에러가 발생하지 않음

<br>

### 참고자료

https://ko.redux.js.org/  
공식문서

https://cocoder16.tistory.com/65  
https://cocoder16.tistory.com/64  
https://velog.io/@raejoonee/createAsyncThunk  
redux-toolkit 비동기 통신 참고

https://stackoverflow.com/questions/70143816/argument-of-type-asyncthunkactionany-void-is-not-assignable-to-paramete  
useDispatch 타입에러 근본적 해결

https://www.inflearn.com/course/redux-mobx-%EC%83%81%ED%83%9C%EA%B4%80%EB%A6%AC-%EB%8F%84%EA%B5%AC/dashboard  
redux-toolkit 코드참고

https://stackoverflow.com/questions/57472105/react-redux-useselector-typescript-type-for-state/60885506#60885506  
useSelector의 타입에러가 발생했을 때 RootState를 알려줌
