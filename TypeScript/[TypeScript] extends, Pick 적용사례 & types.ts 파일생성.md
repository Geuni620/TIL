# TypeScript

> 사이드프로젝트를 진행하며 해결하고, 알게된 점 기록

## interface 확장(extends) 적용사례

```TSX
// Portal.tsx
export interface PortalProps {
  children?: ReactNode;
}
```

```TSX
// Modal.tsx
export interface ModalProps extends PortalProps {
  onClose: () => void;
  visible: boolean;
  name?: string;
}
```

- interface를 통해 선언했던 type에 extends를 적용해서 다른 컴포넌트에 타입을 지정해줌
- 타입별칭은 확장이 불가능하지만, 인터페이스는 확장가능

<br>

## 타입폴더 생성 및 관리

- 한 컴포넌트에 interface가 많아지기 시작했음.
- [Gatsby로 기술블로그 만들기](https://www.inflearn.com/course/gatsby-%EA%B8%B0%EC%88%A0%EB%B8%94%EB%A1%9C%EA%B7%B8/dashboard) 강의를 수강할 때 types를 별도의 파일로 빼고 import 시켜서 사용하던 것이 기억나, 적용해봄
- 로그인과 회원가입을 한 모달창으로 관리하다보니, types이 여러 개 생겨났고 컴포넌트별로 나눠줬지만, 필요할 경우 import해서 extends할 수도 있고 Pick할 때도 있다보니, 복잡해지는 걸 느낌
- `loginStep.types.ts`로 폴더명을 생성하고 다음과 같이 관리해줌

<br>

```TS
// loginStep.types.ts
export interface ITitle {
  fontSize: string;
  marginBottom: string;
}

export interface IProgressBar {
  min: number;
  max: number;
  value: number;
}

export interface IBacisInfo {
  name: string;
  generation: string;
  answers: number[];
  stacks: string;
}

export interface IInfoSection {
  handleBasicInfo: (value: string, name: string) => void;
  handleCheckBox: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export interface IQuestionSection {
  questionNum: number;
  handleBtnNum(num: number, name: string): void;
}
```

<br>

## 유틸리티 Pick 적용사례

- 위 types 관리 파일을 생성하고 필요할 경우 import 시켜줬음

```TSX
import { ITitle, IInfoSection } from 'components/LoginStep/loginStep.types';

const setStacksSection = ({
  handleBasicInfo,
}: Pick<IInfoSection, 'handleBasicInfo'>) => {
  //...
  return (
    <>
      <StacksSection>
        //...
      </StacksSection>
    </>
  );
};
```

- import 시킨 타입에서 handleBasicInfo만 필요했고 Pick을 통해 필요한 것만 사용해줌

![Pick적용사례 캡처](../screen/%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0%20Pick%20%EC%A0%81%EC%9A%A9%EC%82%AC%EB%A1%80.png)

- type이 잘 찍히는 것을 확인할 수 있음.
