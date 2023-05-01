# 배운 내용

### useEffect를 활용해보기

> useEffect를 이용해서 다음과 같은 기능을 구현해보고자 함.

1. `setInterval`이 동작하면 count가 +1 되도록 구현
2. +1 되자마자 `cleanInterval`이 동작해서 그 이후의 +1은 동작하지 않도록 구현
3. 사용자가 button을 누를 때마다 +1이 되도록 구현

```JS
import React, { useState, useEffect, useCallback } from 'react';

export const Test = () => {
  const [count, setCount] = useState(0);

  const cleanUp = useCallback(() => {
    setInterval(() => {
      console.log('Timer End');
      setCount(prev => count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      console.log('Timer Start');
      setCount(count + 1);
    }, 1000);

    return cleanUp();
  }, []);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(prev => prev + 1)}>button</button>
    </div>
  );
};
```

- 현재 상황에 console은 계속 반복해서 찍히고, count는 1된 상태에서 버튼을 누르면 2가 됐다가 다시 1로 변경 됨.
- 해결방법을 못찾는 중,,,

---

## 해결방법

> setInterval로 구현하지말고 setTimeout을 사용.

```JS
import React, { useState, useEffect } from 'react';

export const Test = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log('Timer Start');
      setCount(count + 1);
    }, 1000);
  }, []);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(prev => prev + 1)}>button</button>
    </div>
  );
};
```

- 이전에는 setInterval을 사용했는데 setTimeOut을 사용하니 원하는대로 잘 동작함.
- 그래서 위의 1.은 setInterval이 아닌 setTimeOut이라고 수정되어야 함.
- 이후에 cleanup을 따로 설정할 필요도 없이 timeout 이후에 버튼을 클릭하면 숫자가 잘 올라감.
