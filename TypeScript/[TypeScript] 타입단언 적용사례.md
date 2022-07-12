# TypeScript

## 타입단언

> 사이드프로젝트를 진행하며 에러가 발생한 구간 타입단언을 통해 해결한 내용 기록.

```TSX
const handleBasicInfo = (value: string | unknown, name: string) => {
  setBasicInfo({ ...basicInfo, [name]: value });
};
```

- handleBasicInfo는 다음과 같은 기능을 수행함.
  - 사용자가 회원가입을 할 시 회원가입에 필요한 정보를 입력, 선택하게 됨
  - 사용자가 선택 및 입력한 정보를 백엔드로 보내기 위해 state하나에 저장해주는 기능을 수행.

```TSX
<StyledSelect
  placeholder="사용할 기술 스택을 골라주세요."
  bordered={false}
  mode="multiple"
  maxTagCount="responsive"
  showArrow
  onChange={(value) => handleBasicInfo(value, 'stacks')}
>
```

- 사용자가 기술선택을 위한 컴포넌트로 handleBasicInfo를 props로 내려줬음
- 사용자가 기술스택을 선택하면, onChange이벤트로 선택한 데이터를 배열로 만듦
  - 배열로 만들어주는 로직은 antd 라이브러리를 사용했음

<br>

### 문제발생

```
'unknown' 형식의 인수는 'string' 형식의 매개 변수에 할당될 수 없습니다.
```

- handleBasicInfo에 value 타입으로 string 또는 unknown을 사용했는데, 다음과 같은 타입에러가 발생했음
- unknown이 문제라면 unknown을 지우면 되지 않을까 하고 지웠으나, 똑같은 에러문구가 뜸

<br>

### 해결방법

> 타입단언을 사용

```TSX
<StyledSelect
  placeholder="사용할 기술 스택을 골라주세요."
  bordered={false}
  mode="multiple"
  maxTagCount="responsive"
  showArrow
  onChange={(value) => handleBasicInfo(value as string, 'stacks')}
>
```

- as string으로 value에 들어갈 타입이 string이라고 typeScript에게 알려줌으로써 해결가능.

<br>

### 참고자료

https://bobbyhadz.com/blog/typescript-argument-type-unknown-not-assignable-parameter-type  
블로그에선 타입단언과 타입가드로 unknown 에러를 해결할 수 있다고 제시함.

https://github.com/Team-Cotchen/wesalad-FE  
같은 팀원인 효정님 creation 코드의 변수명 및 로직을 참고했음.
