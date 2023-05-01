# performance-optimization

> 리액트의 최적화하는 방법에 대해 학습

## 1. useCallback

- 인자로 전달한 콜백함수 그 자체를 메모이제이션 해줌

```JSX
import React, {useState, useCallback, useEffect} from "react";

function Test1() {
  const [number, setNumber] = useState(0);
  const [toggle, setToggle] = useState(true);

  const sumFunction = () => {
    console.log(`number ${number}`);
    return;
  };

  useEffect(() => {
    console.log("sumFunction 변경되었습니다.");
  }, [sumFunction]);

  return (
    <div className="App">
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={sumFunction}>Call</button>
    </div>
  );
}

export default Test1;
```

- 다음과 같이 작성된 코드가 있음

<br>

![useCallback 적용 전](../screen/useCallback%20%EC%A0%81%EC%9A%A9%20%EC%A0%84.png)

- 버튼 클릭해서 숫자를 올리면 그에 따른 console이 올린 숫자 값만큼 찍힘.

<br>

```JSX
  const sumFunction = useCallback(() => {
    console.log(`number ${number}`);
    return;
  }, []);
```

- 의존성 배열에 아무것도 넣지 않은 상태에서 useCallback으로 감싸주자
- 그리고 숫자값을 올려보면, 기존에는 console이 찍혔지만 useCallback으로 감싼 이후엔 console이 찍히지 않음

* useCallback 적용 후엔 함수객체가 더 이상 새롭게 생성되는 것이 아니라, 기존의 값을 메모이제이션 해두고 변화가 없다면 기존의 값을 그대로 사용하기 때문.
* 하지만 의존성배열이 빈 값으로 들어가 있기 때문에 `Call`을 클릭하면 number값이 0으로 console이 찍힘.

<br>

![useCallback+의존배열빈값](../screen/useCallback%EC%A0%81%EC%9A%A9%20%ED%9B%84%20%EC%9D%98%EC%A1%B4%EB%B0%B0%EC%97%B4%20%EB%B9%84%EC%9B%80.png)

<br>

- 의존성배열엔 number 값을 넣어줌.
- 의존성배열에 number 값이 변경 될 때마다 sumFunction이 갱신되고 console창에 `sumFunction이 변경되었습니다.`는 문구가 뜸

<br>

```JSX
function Test1() {


  const sumFunction = useCallback(() => {
    console.log(`number ${number}`);
    return;
  }, [number]);

  useEffect(() => {
    console.log("sumFunction 변경되었습니다.");
  }, [sumFunction]);

  return (
    <div className="App">
//  ...
      <button onClick={() => setToggle((prev) => !prev)}>
        {toggle.toString()}
      </button>
// ...
    </div>
  );
}
```

- 좀 더 명확히 알아보기 위해 toggle state를 하나 추가해주었음.
- useCallback을 적용하지 않았을 땐, 버튼 클릭을 통해 toggle state의 값을 변경하면(true or false), sumFunction이 갱신되고 console창에 toggle의 버튼 클릭 횟수에 따라서도 `sumFunction 변경되었습니다.`는 문구가 뜸.
- 하지만 useCallback을 적용하게 되면, 의존성배열에 number를 기준으로 갱신되기 때문에 togggle의 버튼에 영향을 받지 않고 갱신되지 않음.

<br>

### 2. React.memo

### 참고자료

[React Hooks에 취한다 - useCallback](https://youtu.be/XfUF9qLa3mU)
