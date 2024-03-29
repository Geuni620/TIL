# TypeScript

### visaType을 Refactoring

- 변경 전에는 다음과 같았음.

```TSX
// markup-data/user-manager.ts
interface Gender {
  id: number;
  name: string;
}

export const SELECTED_VISA_YEAR: VisaYear[] = [
  {
    id: 0,
    name: '3년',
  },
  {
    id: 1,
    name: '5년',
  },
  {
    id: 2,
    name: '10년',
  },
];


// addItem.page.tsx
  const [closetItemInfo, setClosetItemInfo] = useState({
    name: '',
    mainImg: null,
    subImg: null,
    visaType: `비자 ${'3년'}`,
  });

  const appendClosetItemInfo = (key: string, value: string) => {
    setClosetItemInfo({ ...closetItemInfo, [key]: value });
  };

// DropdownSelect
    <DropdownSelect
    initialValue={closetItemInfo.visaType}
    optionsList={SELECTED_VISA_YEAR.map(({ name }) => name)}
    onSelect={(selectValue) => {
        appendClosetItemInfo('visaType', `비자 ${selectValue}`);
    }}
    />
```

<br>

- 리뷰를 받고 다음과 같이 수정할 수 있었음 🙏

```TSX
// markup-data//user-manager.ts
// name을 period로 변경하고, type을 타이트하게 잡을 수 있었음.
export interface VisaYear {
  id: number;
  period: '3년' | '5년' | '10년';
}


// type을 import 할 경우 type이라고 표현해주면 런타임시 빌드 되지 않음 (type-only imports/exports)
import type { VisaYear } from 'markup_data/data-manager/user-manager';
import { SELECTED_VISA_YEAR } from 'markup_data/data-manager/user-manager';



interface CloseItemInfo {
  name: string;
  mainImg: null | string;
  subImg: null | string;
  visaYear: VisaYear['period']; // VisaYear의 period를 타입으로 매겨줌
}

  const [closetItemInfo, setClosetItemInfo] = useState<CloseItemInfo>({
    name: '',
    mainImg: null,
    subImg: null,
    visaYear: SELECTED_VISA_YEAR[0].period,
  });

  const appendClosetItemInfo = <K extends keyof CloseItemInfo>(
    key: K,
    value: CloseItemInfo[K],
  ) => {
    setClosetItemInfo({ ...closetItemInfo, [key]: value });
  };


    <DropdownSelect
    className="w-[118px] ml-[8px]"
    initialValue={`비자 ${closetItemInfo.visaYear}`}
    hasIcon
    optionsList={SELECTED_VISA_YEAR.map(
        ({ period }) => `비자 ${period}`,
    )}
    iconSrc={'/images/icon/caret_down.svg'}
    onSelect={(selectValue) => {
        appendClosetItemInfo('visaYear', selectValue.slice(3));
    }}
    />
```

- 이때 조금 꼬였었는데, 동료분께서 도와주셔서 해결 했음
- 꼬였던 이유는, DropDownBar 공통으로 사용하는 common component임 (변경불가)
- 그래서 onSelect를 내려 줄 때 slice로 해당 연도까지만 짤라서 표현해줬음, `비자 5년` → `5년`

<br>

- 리뷰 내용에서는 `SELECTED_VISA_YEAR`의 값을 하드코딩 하기 보단, 값을 직접 가져오는 것이 더 좋은 방법이고,
- useState 타이핑도 명확히 해주면 좋다고 말씀해주심
- 이렇게 수정 했을 때 **컴포넌트들의 관계(=의존성)가 명확해져서** 코드를 파악하기 좋다는 리뷰를 받음.

<br>

### event type 수정

```TSX
interface Event<T = EventTarget> {
  target: T;
}

// 변경 전
  const saveMainImage = (e: Event<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      setClosetItemInfo({ ...closetItemInfo, mainImg: reader.result });
    };
    return reader.readAsDataURL(e.target.files[0]);
  };
```

- 리액트에서 이벤트 핸들러 타이핑은, 리액트의 이벤트 타입을 사용함
- `onChange` 같은 경우는 `React.ChangeEvent<...>` 사용
- 그래서 다음과 같이 수정했음

```TSX
// 변경 후
  const saveMainImage = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      //  'string | ArrayBuffer' 형식은 'string' 형식에 할당할 수 없습니다.
      //  위와 같은 에러가 발생. → 타입가드로 해결.
      if (reader.result instanceof ArrayBuffer) return;

      setClosetItemInfo({
        ...closetItemInfo,
        mainImg: reader.result,
      });
    };
    return reader.readAsDataURL(e.target.files[0]);
  };
```

- 기존에는 타입단언을 사용하려 했지만, 타입가드로 사용하는게 더 낫겠다고 판단

<br>

### 참고자료

[[TypeScript/3.8] 타입스크립트 3.8에서 바뀐 것들에 대하여](https://im-developer.tistory.com/187)

- type import는 런타임시, 완전히 지워진다.

[Type-Driven Development with Idris 리뷰](https://harfangk.github.io/2017/10/23/tdd-with-idris-review-ko.html)

- 타입 주도 개발
  - 코드를 읽거나 작성할 때 일단 정의된 타입과 함수의 타입 표기를 살펴보곤 한다.
  - 타입 주도 개발은 그런 접근법을 정리하고 발전시킨 방식
