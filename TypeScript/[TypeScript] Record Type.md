# Typescript

## Record<Key, Type> 또는 mapped 타입

> 다음과 같은 타입을 좀 더 매끄럽게 개선할 수 있는 방법은 없을까?

```TS
interface IgetPages {
  currentPage: number;
  min_page: number;
  max_page: number;
}
```

이 [블로그](https://velog.io/@baby_dev/%EC%97%84%EA%B2%A9%ED%95%98%EA%B2%8C-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EB%8A%94-9%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95)글을 읽고 다음과 같이 개선할 수 있었음.

<br>

```TS
interface IgetPages {
  [key: string]: number;
}
```

- 이렇게 개선할 수 있으나, 실제로 key를 string 으로만 정했기때문에 IgetPages의 타입으로 정의된 객체는 내부의 키가 자동완성 되지 않음.

<br>

```TS
// Record 타입
type IgetPages = Record<'currentPage' | 'min_page' | 'max_page', number>;


// mapped 타입
type IgetPages = {
  [key in 'currentPage' | 'min_page' | 'max_page']: number;
};
```

- mapped타입과 Record 타입으로 지정해서 사용할 수 있음.

<br>

### 참고자료

[Record Type 사용 방법](https://developer-talk.tistory.com/296)  
[엄격하게 타입스크립트를 이용하는 9가지 방법](https://velog.io/@baby_dev/%EC%97%84%EA%B2%A9%ED%95%98%EA%B2%8C-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EB%8A%94-9%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95)
