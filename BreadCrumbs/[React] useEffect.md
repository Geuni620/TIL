## 배운 내용

### useEffect를 활용해보기

> useEffect를 이용해서 다음과 같은 기능을 구현해보고자 함.

1. `setInterval`이 동작하면 count가 +1 되도록 구현
2. +1 되자마자 `cleanInterval`이 동작해서 그 이후의 +1은 동작하지 않도록 구현
3. 사용자가 button을 누를 때마다 +1이 되도록 구현

```JS
import React from "react";
import { useEffect } from "react";

const Timer = () => {
  useEffect(() => {
    const Timer = setInterval(() => {
      console.log("Timer 시작");
    }, 1000);
    return () => {
      clearInterval(Timer);
      console.log("Timer 종료");
    };
  }, []);

  return (
    <div>
      <span>Test</span>
    </div>
  );
};

export default Timer;
```
