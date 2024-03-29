# Refactor

### 추상화하기

리뷰를 받은 후

```TSX
export interface DeviceUserCount {
  desktopCount: number;
  mobileCount: number;
}

interface DeviceUserRate {
  desktopRatio: number;
  mobileRatio: number;
}

export const getDeviceRate = ({
  desktopCount,
  mobileCount,
}: DeviceUserCount): DeviceUserRate => {
  if (desktopCount === 0 && mobileCount === 0)
    return { desktopRatio: 0, mobileRatio: 0 };

  const total = desktopCount + mobileCount;
  const desktopRatio = Math.round((desktopCount / total) * 100);
  const mobileRatio = 100 - desktopRatio;

  return { desktopRatio, mobileRatio };
};
```

- device와 mobile의 가입기기 count를 ratio로 만드는 함수를 하나 만들었음
- 이걸 DeviceRate components내에서만 사용했고, test code도 이 page 내에 test 폴더를 만들어서 작성했음

<br>

리뷰를 받은 후

> 도메인에 의존하는게 있을까요? 조금 더 추상화 할 순 없을까요?

- 여기에 추가로 이 함수를 추상화시킬 "필요성"이 생겼음.
- 지금은 DeviceRate 도메인에 의존적이지만, 가입경로 비율을 구할 때도 다음과 같은 함수를 사용해야했고, 인자 값이 2개가 아닌 3개, 4개일 수도 있음.
- 이걸 어떻게 추상화할 수 있을까?

```TSX
// utils/index.tsx
export const calcRatio = (...args: number[]): number[] => {
  const total = args.reduce((acc, val) => acc + val, 0);
  const ratios = args.map((value) => Math.round((value / total) * 100));

  return ratios;
};
```

- 기존 DeviceRate의 컴포넌트에서 utils 폴더로 옮겨주었음.
  - 왜냐하면, 이 함수는 이제 도메인에 의존적이지 않은, utils function으로 사용하려고 했음(조금 더 범용적으로)
- `..args`를 이용해서 인자 값이 몇 개가 들어오던, 상관없이 total을 구하고, 이 total을 토대로 비율을 구하려고 했음.

<br>

- 이렇게 했을 때 코드도 더 짧게 작성할 수 있었고, test code 작성하기도 더 용이했음.
- 무엇보다 도메인에 의존적이던 코드를 도메인과 분리시킴으로써 재활용하기 쉬워짐.
