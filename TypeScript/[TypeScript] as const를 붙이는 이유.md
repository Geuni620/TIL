# TypeScript

### as const를 붙이는 이유

```TSX
export const userManagerKeys = {
  userManager: ['userManager'] as const,
  userList: () => [...userManagerKeys.userManager, 'userList'] as const,
  adminList: () => [...userManagerKeys.userManager, 'adminList'] as const,
  userDetail: () => [...userManagerKeys.userManager, 'userDetail'],
  adminDetail: () => [...userManagerKeys.userManager, 'adminDetail'] as const,
  userNicknameCheck: (id: string) =>
    [...userManagerKeys.userManager, 'userNicknameCheck', id] as const,
};
```

- 이런 코드가 있다, react-query에서 queryKeys를 관리하기 위해 만든 factory이다.
- 여기서 한 value에 as const를 제외하면 다음과 같이 타입이 추론된다.

![as const 제거](../screen/as%20const%20%EC%A0%9C%EA%B1%B0.png)

- `userList: () => string[]`

<br>

![as const 추가](../screen/as%20const%20%EC%B6%94%EA%B0%80.png)

- `userList: () => readonyl ["userManager", "userList"]`

<br>

- 타입을 훨씬 한정적으로 가둬놓고 사용할 수 있다.

### 참고자료

[[Typescript] --downlevelIteration](https://points.tistory.com/106)

<br>
