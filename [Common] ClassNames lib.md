## classNames library

> className으로 조건식 스타일 주기

```JS
// index.js
import React from "react";
import classnames from "classnames";

const TestComponent = () => {
  const data = ["abc"];

  const valid = data.find((item) => item === "abc");

  return (
    <div className={classnames("box-info", {"mg-10": valid})}>Test</div>
  );
};
export default TestComponent;
```

```CSS
.box-info {
  text-align: center;
}

.mg-10 {
  margin: 10px;
  color: red;
}
```

- data에 `abc`가 포함되어 있으면 valid가 true가 됨
- valid가 true라면 classNames안에 "mg-10" 클래스가 true가 되므로 colo가 red가 됨

<br>

### 참고자료

[[React] 리액트 classnames 활용하기 (classnames, !! 연산자)](https://ekgoddldi.tistory.com/98)
[https://velog.io/@jinhengxi/React-classnames](https://velog.io/@jinhengxi/React-classnames)
