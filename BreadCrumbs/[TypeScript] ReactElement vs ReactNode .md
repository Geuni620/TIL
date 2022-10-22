# React

## ReactElement vs ReactNode vs JSX.Element

> Typescript + react로 코드를 작성하다보면, 컴포넌트 타입을 지정해줘야할 때가 있음.

### ReactElement

- 클래스 컴포넌트는 render메서드에서 `ReactNode`를 리턴함.
- 함수형 컴포넌트는 `ReactElement`를 리턴해줌.
- JSX는 바벨에 의해 `React.createElement(component, props, ...children)` 함수로 트랜스파일 됨.

<br>

### 참고자료

[JSX.Element vs ReactNode vs ReactElement의 차이](https://simsimjae.tistory.com/426)
