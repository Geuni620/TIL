# TypeScript

## 기본구조

> Context API를 공부하던 중 type 지정이 되지 않아 에러가 떴음.  
> 기본이라고 생각했지만, 놓치면 당황하기 쉬운 것 같아서 기록.

```JSX
function App() {
  return <AwesomeComponent value="Hello" />;
}

export default App;

type valueProps = {value: string}

function AwesomeComponent({ value }: { value: string }) { // 형식이 제대로 됨
// function AwesomeComponent({ value }: string) { // 형식이 잘못 됨
// function AwesomeComponent({ value }: valueProps) { // 형식이 제대로 됨
  return (
    <div>
      {value}
      <FirstComponent />
      <SecondComponent />
      <ThirdComponent />
    </div>
  );
}
```
