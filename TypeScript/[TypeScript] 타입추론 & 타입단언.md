# TypeScript

## 타입추론

```TSX
// 타입추론
interface Dropdown<T> {
  value: T;
  title: string;
}

interface DetailedDropdown<K> extends Dropdown<K> {
  description: string;
  tag: K;
}

var detailedItem: DetailedDropdown<number> = {
  title: "abc",
  description: "description",
  value: "value",
  tag: "tag",
};
```

- `DetailedDropdown<number>`로 타입을 매겼을 때, value와 tag에서 Error이 발생함
  1.  number로 타입을 매기면 DetailedDropdown의 타입이 number로 매겨짐
  2.  Dropdown의 value타입도 number로 매겨짐

<br>

---

<br>

## 객체의 키값이 여러 개일 경우 Type지정

```TSX
interface PhoneNumberDictionary {
  [key: string]: {
    // key로 들어오는 건 총 3개 (home, office, studio)
    value: number;
  };
}

interface Contact {
  name: string;
  address: string;
  phones: PhoneNumberDictionary;
}


const contacts:Contact[] = [
    {
      name: 'Tony',
      address: 'Malibu',
      phones: {
        home: {
          num: 11122223333,
        },
        office: {
          num: 44455556666,
        },
      },
    },
    {
      name: 'Banner',
      address: 'New York',
      phones: {
        home: {
          num: 77788889999,
        },
      },
    },
    {
      name: '마동석',
      address: '서울시 강남구',
      phones: {
        home: {
          num: 213423452,
        },
        studio: {
          num: 314882045,
        },
      },
    },
  ];
```

<br>

## enum 활용

```TSX
enum PhoneType{
  Home = "home",
  Office = 'office',
  Studio = 'studio'
}
```

- 다음과 같이 enum을 지정하면 다음과 같이 활용가능

  - 휴먼에러에 대처할 수 있음

    ![이넘 활용법 캡처](/screen/enum%ED%99%9C%EC%9A%A9.png)

<br>

## 타입단언

> 타입스크립트보다 개발자가 타입을 더 정확히 알고있다는 생각에서 시작.  
> 개발자가 타입을 명시적으로 선언해주는 방법

```TSX
// 타입 단언
var a;
a = 20;
a = "abc";
// var b = a;
var b = a as string;
```

- 개발자(우리)는 타입스크립트보다 더 정확히 타입을 추론할 수 있음
- 위의 경우 a는 문자열이 될 것이란 것을 알고 있음
- 하지만 타입스크립트는 any를 선언했음
- 이때 타입스크립트에게 any가 아니라 string이라고 알려주는 방법이 **타입단언**

<br>

DOM API조작시 많이 사용함

```TSX
var div = document.querySelector('div')
if(div){
 div.innerHTML; // 타입을 한번 보장해주어야함.
}
```

![타입단언 전](/screen/%ED%83%80%EC%9E%85%EB%8B%A8%EC%96%B8%20%EC%A0%84.png)

- if로 div를 감싸주지 않았을 시 에러가 발생함
  - div가 있다는 보장이 없음 -> null일 수도 있음
- 이때 사용할 수 있는게 **타입단언**

```TSX
var div = document.querySelector('div') as HTMLDivElement
  div.innerHTML
```

다음과 같이 타입이 지정 됨
![타입단언 후](/screen/%ED%83%80%EC%9E%85%EB%8B%A8%EC%96%B8%20%ED%9B%84.png)

### 참고자료

https://www.inflearn.com/course/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9E%85%EB%AC%B8/dashboard
