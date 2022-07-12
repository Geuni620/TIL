# TypeScript

## 유틸리티 타입 Pick

> 이미 정의해놓은 타입을 변환할 때 사용하기 좋은 타입,

```TSX
interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

function FetchProduct(): Promise<Product[]> {
  // ...
}

interface ProductDetail {
  id: number;
  name: string;
  price: number;
}
function DeplayProductDetail(shoppingItem: ProductDetail) {
  // ...
}
```

- Product로 FetchProduct에 타입지정.
- ProductDetail은 Product안에 있는 몇 개의 필요한 타입만 사용해서 또 다른 인터페이스를 만들어줘야함.

<br>

- 이미 정의되어 있는 타입의 일부만 뽑아내서 사용해보자

```TSX
function DeplayProductDetail(
  shoppingItem: Pick<Product, "id" | "name" | "price">
) {}
```

- Pick을 이용해서 Product 타입안에 필요한 것만 빼내서 또 다른 함수의 타입으로 지정해줌.

<br>

## 유틸리티 타입 Omit

- 이미 정의되어 있는 타입의 일부만 뽑아내는게 아니라 제외하고 사용해보자

```TSX
function DeplayProductDetail(
  shoppingItem: Omit<Product, "id" | "name" | "price">
) {}
```

- 여기선 id, name, price만 뽑아서 사용하는게 아니라, 제외하고 사용하는 것
- 즉 Product에서 brand와 stock만 사용하는 것
