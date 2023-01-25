# React

## useAutoResize hooks

- useRef를 이용해서 testarea에 글을 쓸 때, 한 줄 이상으로 글이 길어질 때마다 textarea의 box 크기가 반응하여 커지도록 만들고 싶음
- 이때 event.target에서 `as(타입단언)`을 사용했는데, as도 제거하고 불필요한 부분도 제거해보자.

```TSX
    const textareaRef = useRef(null);

    const autoResizeTextarea = ({ target }: KeyboardEvent) => {
    const DEFAULT_HEIGHT = '36px';
    countInfoMaxLength(target);

    if (textRef) {
        textRef.current.style.height = DEFAULT_HEIGHT;
        const height = textRef.current.scrollHeight; // 높이
        textRef.current.style.height = `${height}px`;
    }

    if (!(target as HTMLTextAreaElement).value.length)
        textRef.current.style.height = `${DEFAULT_HEIGHT}`;
    };


return (
    <TextareaUserInfo
        name="info"
        placeholder="소개를 입력하세요!"
        value={userInfoProps.info}
        onChange={(e) => handleUserInfo('info', e.target.value)}
        ref={textareaRef}
        onKeyUp={autoResizeTextarea}
        maxLength={150}
    />
)
```

- 처음은 다음과 같은 모습이었음.
- 하지만, autoResizeTextarea가 다른 컴포넌트에서 점점 많이 쓰이게 되면서, hooks으로 만들어야겠다는 필요성을 느낌

<br>

```TSX
import { useRef, MutableRefObject, KeyboardEvent } from 'react';

interface UseAutoResizeTextarea {
  textareaRef: MutableRefObject<HTMLTextAreaElement>;
  autoResizeTextarea: ({ currentTarget }: KeyboardEvent) => void;
}

export const useAutoResizeTextarea = (): UseAutoResizeTextarea => {
  const textareaRef = useRef(null);

  const autoResizeTextarea = ({
    currentTarget,
  }: KeyboardEvent<HTMLTextAreaElement>) => {
    const defaultHeight = textareaRef.current.style.minHeight;

    if (textareaRef) {
      const height = textareaRef.current.scrollHeight; // 높이
      textareaRef.current.style.height = `${height}px`;
    }

    if (!currentTarget.value.length) {
      textareaRef.current.style.height = defaultHeight;
    }
  };

  return {
    textareaRef,
    autoResizeTextarea,
  };
};
```

- 맨 처음 작성했던 코드에서 함수로 만들었던 `countInfoMaxLength`는 이제 더 이상 필요 없음. 아니, 애초에 필요가 없었음.
- state에 담아준 뒤 length로 글자수를 count 할 수 있었기 때문.

<br>

- 또 hooks로 만들면서 event.target을 event.currentTarget으로 변경했음.
- 이유는 event.target.value에서 typeError이 발생
- currentTarget으로 변경했을 때 value를 지정해 줄 수 있었음.
- 이를 통해 as를 제거할 수 있었음.

**단 정확히는 아직 이해하지 못했음**

<br>

## `KeyboardEvent<HTMLTextAreaElement>`는 뭘까?

- KeyBoardEvent를 Textarea에 걸어줬음.
- 그럼 TextArea에 해당하는 타입을 지정해주는게 좋음.
- 만약 KeyBoardEvent를 Div에 걸어줬다면 다음과 같이 수정할 수 있음

```TSX
KeyBoardEvent<HTMLDivElement>
```

<br>

## 매개변수는 객체형태로 넘겨보자

```TSX
// before
// 매개변수
export const useAutoResizeTextarea = (defaultHeight) => {
  // ...
}

// 인자로 넘김
const { textareaRef, autoResizeTextarea } = useAutoResizeTextarea("36px");


// after
// 매개변수
export const useAutoResizeTextarea = ({defaultHeight}: {defaultHeight: string}) => {
  // ...
}

// 인자로 넘김
const { textareaRef, autoResizeTextarea } = useAutoResizeTextarea({defaultHeight: "36px"});
```

- 객체로 만들어 넘기기
- 단, 여기서 defaultHeight는 불필요한 매개변수이므로 제거했음
- 여기서 하고자하는 말은 인자, 매개변수를 객체로 넘기는게 더욱 확장성 좋게 넘길 수 있다는 것을 말하고 싶었음.
  - 매개변수가 3개 이상 되었을 경우, 헷갈리는 요소가 많이 생김(before, after 등등), 객체로 넘기며 key를 지정해주면 코드를 읽는 입장에서 더욱 명확히 파악할 수 있다고 생각했음.

<br>

### 참고자료

[[TypeScript] 'EventTarget' 형식에 id 속성이 없습니다.](https://velog.io/@e_juhee/TypeScript-EventType)
