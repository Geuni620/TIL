# TypeScript

## 맵드타입

```TSX
type Heroes = "Hulk" | "Capt" | "Thor";
type HeroAges = {[K in Heroes]: number};

const ages: HeroAges = {
  Hulk: 33,
  Capt: 100,
  Thor: 1000,
};
```

<br>

![맵드타입](../screen/%EB%A7%B5%EB%93%9C%ED%83%80%EC%9E%85.png)

- 맵드타입을 이용해서 type을 for문 돌리듯 사용할 수 있음.

<br>

### 참고자료

https://joshua1988.github.io/ts/usage/mapped-type.html
