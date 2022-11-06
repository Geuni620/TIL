# Typescript

## Typeof로 type 매기기

> 회사에서 다음과 같은 type을 발견했음

```JSX
type TabBarType = React.ComponentProps<"div"> & {
  current?: typeof tabs[number]["name"] | string;
};
```

신기해서 작성하신 분께 여쭤봤고, 처음엔 복잡했지만 결과적으론 타입을 추상화해서 사용하기 좋다고 판단했음

<br>

```TS
const SIDE_BAR_MENU_LIST = [
  {
    id: 0,
    name: '...',
    link: '/',
    iconSrc: '/images/icon/icon_dashboard.svg',
  },
  {
    id: 1,
    name: '...',
    iconSrc: '/images/icon/icon_island.svg',
    link: '/island-manager/jejodo/contents/popup/',
    menus: [
      {
        //...
      }
    ],
  },
];
```

다음과 같은 엄청 복잡한 type이 있다고 가정했을 때, 해당 타입을 정의하려면 기존에 내가 알고 있던 방법으론 하나씩 타이핑 해줘야했음

<br>

```TS
interface typeProps {
  //... 하나씩 입력
}
```

<br>

하지만 typeof를 사용하면 타입을 유연하게 사용할 수 있음

```JSX
type SideBarType = typeof SIDE_BAR_MENU_LIST[number];
```

- 위 코드는 다음의 캡처사진처럼 타입을 매겨줌

  ![객체 타입 빼오기](../../screen/typeof%EB%A1%9C%20%EA%B0%9D%EC%B2%B4%20%ED%83%80%EC%9E%85%20%EB%B9%BC%EC%98%A4%EA%B8%B0.png)

<br>

```TS
// 특정 key값의 type을 빼오고 싶다면 key를 입력해주면 됨
type SideBarType = typeof SIDE_BAR_MENU_LIST[number]["menus"];
```

- 위 코드는 다음의 캡처사진처럼 타입을 매겨줌
  ![객체에서 특정 key값 타입 빼오기](../../screen/typeof%EC%97%90%20%ED%8A%B9%EC%A0%95%20key%EA%B0%92%EC%97%90%20%ED%95%B4%EB%8B%B9%ED%95%98%EB%8A%94%20%ED%83%80%EC%9E%85.png)

<br>

만약 enum의 key를 타입으로 매기고 싶다면

```TS
enum HttpMethod {
  GET,
  POST,
}

// GET | POST
type Method = keyof typeof HttpMethod;
```

### 참고자료

[[번역] 타입스크립트 Typeof 연산자를 위한 5가지 유용한 트릭](https://velog.io/@surim014/5-very-useful-tricks-for-thetypescript-typeof-operator)
