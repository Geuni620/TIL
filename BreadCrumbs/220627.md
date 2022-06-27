# Web API

> google 로그인을 구현하며 겪은 시행착오들 정리

<br>

### 문제점 발견해보기

> 최근 백엔드분과 통신을 맞춰봤는데 제대로 동작하지 않았음.  
> 내가 구현한 방식과 다른 분이 구현한 방식을 비교해보며 무엇을 놓쳤는지 확인해보려 함.

<br>

### 로직

1. 구글 console에 가서 client_id와 Redirect URL 설정
2. 구글에서 버튼을 누르면 redirect를 해주고 여기서 code를 쿼리로 넣어줌

- 여기서 약간의 차이점이 발생함

  - 기존에는 **a 태그를 이용해서 해당 URL로 이동시켰고, 이동시킨 곳에 router를 걸어서 해당 컴포넌트가 실행되도록 구현되어 있었음**
  - 그 컴포넌트는 다음과 같이 작성되어 있음

  ```TSX
  const GoogleLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  const navigate = useNavigate();

  useEffect(() => {
    const option: { url: string } = {
      url: `url?code=${code}`,
    };
    axios(option.url).then((res) => {
      console.log(res);
      // localstorage 내용
    });
  }, [code]);
  };
  ```

### window.location.href VS window.location.replace

- 하지만 나는 click event를 걸어서 페이지를 이동시키고 Redirect되는 곳에서 code를 담고싶음

  - 여기서 href와 replace를 알게 됐음
  - 차이점은 해당 history를 남기고 싶으면 href를 써도되고, 남기고 싶지 않다면 replace를 사용하면 됨.
    - 만약 html파일이 1번 2번 3번이 있다고 가정
    - 1번 2번 3번이 순차적으로 이동하지만, 클릭을 했을 땐 2번이 보이지 않고 3번으로 바로 이동시키도록 구현되어 있음.
    - 이때 3번으로 이동했다가 뒤로가기를 누르면 2번이 열림.
    - 하지만 2번의 내용이 중요한 정보를 담고 있다고 가정했을 때 2번이 열리지 않도록 해야함 → 이때 `replace()`를 사용하면 2번이 열리지 않음

### Click event + window.location.replace를 사용 + qs

- 큰틀에서 로직은 똑같지만 qs라이브러리를 써보고 싶었고, button으로 click event를 주고 싶었음
- 따라서 다음과 같이 구현함

```TSX
const queryStr = qs.stringify({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URL,
  response_type: 'code',
  // scope: 'email%20profile%20openid',
  scope: 'https://www.googleapis.com/auth/contacts.readonly',
});
const loginUrl = AUTHORIZE_URI + '?' + queryStr;

const onClickGoogleLogin = () => {
    window.location.replace(loginUrl);
  };

  useEffect(() => {
    AuthCodeLoginPage();
  }, [onClickGoogleLogin]);

```

- 다음과 같이 qs 라이브러리를 사용해봤음
- onClickGoogleLogin으로 click event를 줬음
- replace되면 AuthCodeLoginPage()가 실행되도록 함
  - 참고로 위의 GoogleLogin과 AuthCodeLoginPage는 동일함
- 하지만 다음과 같은 에러가 발생했음.

```
Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
```

<br>

### Invaild Hooks

> 공식문서에서는 이 에러를 다음과 같은 상황에서 직면할 수 있다고 설명함.

- React와 React DOM의 버전이 일치하지 않을 수 있음.
  - React와 React DOM 버전을 최신으로 변경했으나 여전히 에러가 떴음.
- Hooks 규칙을 위반했을 수 있음.

  - **이것때문이었음.**

    > 공식문서 내용 인용

    - 혼란을 주지 않기 위해 다른 경우에는 Hooks를 호출하는 것이 지원되지 않습니다.

      🔴 클래스 컴포넌트에서 Hooks를 호출하지 마세요.  
      🔴 이벤트 핸들러에서 호출하지 마세요.  
      🔴 useMemo, useReducer 또는 useEffect에 전달 된 함수 내에서 Hooks를 호출하지 마세요.

    - **여기서 나는 세 번째를 지키기 않음**
      <br>
      Login.tsx

    ```TSX
      useEffect(() => {
        AuthCodeLoginPage();
      }, []);
    ```

    ```TSX
    const AuthCodeLoginPage = () => {
      const navigate = useNavigate();
    }
    ```

    - useEffect안에서 useNavigate라는 또 다른 hooks을 호출해서 에러가 떴었음.

<br>

### 참고자료

https://github.com/wecode-bootcamp-korea/31-2nd-GoCloud-frontend/tree/main/src/pages/Login  
카카오로그인이지만 auth code 로직을 참고함

https://shanepark.tistory.com/206  
window.location.href와 replace() 비교

https://www.daleseo.com/google-oauth/  
qs 라이브러리 사용 참고

https://velog.io/@___pepper/React-OAuth-2.0-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-w-authorization-code-grant  
AuthCodeLoginPage 부분 참고

https://ko.reactjs.org/warnings/invalid-hook-call-warning.html  
![Invaild warning](/screen/Invalid%20Hook%20Call%20Warning.png)  
위 에러 메세지 참고
