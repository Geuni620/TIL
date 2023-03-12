# TypeScript

## Pick 적용시 타입으로 선언

typeScript Pick 적용에 interface는 에러가 뜨지만 type은 에러가 뜨지 않음

```TSX
type IStacksData = Pick<OptionModel, 'STACKS'>; // 에러 안뜸
interface IStacksData = Pick<OptionModel, 'STACKS'>; // 에러 발생
```

<br>

### 참고자료

[Partial, Required, Pick 사용방법](https://ithub.tistory.com/239)

[타입스크립트 type과 interface의 공통점과 차이점](https://yceffort.kr/2021/03/typescript-interface-vs-type)
