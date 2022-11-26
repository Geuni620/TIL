# TypeScript

## Typescript keyof 사용하기

```TSX
interface UserInfoProps {
  info: string;
  birthday: string;
  gender: string;
  signUpDate: string;
  visaExpDate: string;
  visaType: string;
  postcode?: number;
  address?: string;
}

const initialState = {
  info: '',
  birthday: '',
  gender: '남성',
  signUpDate: '2022-06-20',
  visaExpDate: '3년',
  visaType: '',
};


const [userInfo, serUserInfo] = useState<UserInfoProps>(initialState);


  const handleUserInfo = (key: string, value: string) => {
    serUserInfo({ ...userInfo, [key]: value });
  };
```

- 처음엔 다음과 같이 작성했음.
- 사용자가 회원가입을 한다고 가정했을 때, key와 value에 따라 state에 저장하고 싶었음

<br>

### 의도에 따라 조금 더 명확히 표현하기

- 위와 같이 작성해도 큰 문제는 없으나, 좀 더 의도에 맞게 작성하면 다음과 같음.

```TSX
  const handleUserInfo = (key: keyof UserInfoProps, value: UserInfoProps[keyof UserInfoProps]) => {
    serUserInfo({ ...userInfo, [key]: value });
  };
```

- keyof를 이용하여 UserInfoProps의 key값을 타입으로 빼옴.
- handler 함수를 다음과 같이 수정하여 타입을 매겨줬음.
- 이제 UserInfoProps안에 타입을 추가하면 알아서 key value에서 타입이 추가됨
- 일일히 작성할 필요가 없음. 타입추론도 더 잘 됨
