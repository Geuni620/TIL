# JavaScript

## target과 currenttarget의 차이점

```JSX
const onLogin = e => {
    console.log(e.target);
    console.log(e.currentTarget);
  };

<li>
  <button onClick={onLogin}>
    <span>Test</span>
  </button>
</li>
```

![target 차이점 비교](../screen/target%20vs%20currentTarget.png)

- e.target은 **자식 요소**인 span을 리턴
- e.currentTarget은 **자기 자신**인 button을 반환

<br>

좀 더 명확히 말하면,

- **currentTarget은 이벤트 핸들러가 바인딩된 DOM 요소**
- **target은 이벤트를 발생시킨 DOM 요소**

### 참고자료

https://velog.io/@edie_ko/JavaScript-event-target%EA%B3%BC-currentTarget%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90  
target vs currentTarget
