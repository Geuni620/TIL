# TypeScript

> 함수 파라미터를 객체로 받기 → 변화에 대응하기 쉬움

1.  인자가 늘어날 때
2.  인자가 늘어나는데 optional 값들이 추가 될 때

<br>

## 함수 파라미터 객체로 받기

타입스크립트 React Props 전달하는 방법 및 `IntrinsicAttributes` 오류

```TSX
// index.pages.tsx
export const PAGE_SETTING_ACCORDION_ITEMS: AccordionItemProps[] = [
  { id: 0, title: '기본 설정', content: 'BasicSetting' },
  { id: 1, title: '말풍선', content: 'DialogBubble' },
];

const PageSettingsTab = () => {
  return (
      <Accordion items={PAGE_SETTING_ACCORDION_ITEMS} />
  );
};

// Accordion.tsx
export interface AccordionItemProps {
  id: number;
  title: string;
  content?: 'BasicSetting' | 'DialogBubble' | 'PublicSetting';
}

const Accordion = ({ items }: AccordionItemProps[]) => {
  // items를 다음과 같이 작성하면 Error이 발생함
};
```

![type error](../screen/IntrinsicAttributes%20error.png)
AccordionItemProps[]에 items 속성이 없다고 error가 뜸

<br>

객체를 디스트럭처링한다면, Type을 다음과 같이 작성해야함.

```TSX
const Accordion = ({ items }: {items: AccordionItemProps[] }) => {
  //
};
```

<br>

### 참고자료

[[Error] IntrinsicAttributes props in React Typescript component](https://velog.io/@ye-ji/Error-IntrinsicAttributes-props-in-React-Typescript-component-6nak5n7m)  
[타입스크립트 React props 전달하는 방법 및 IntrinsicAttributes 오류](https://cpro95.tistory.com/656?category=929244)
