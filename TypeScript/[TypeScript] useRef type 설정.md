# TypeScript

> Dropdown bar를 만드는데 useRef의 타입을 정의하고

<br>

## useRef type 설정

```TSX
const LoginUser = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  return (
    <>
      <ProfileSection
        ref={menuRef}
        onClick={() => setMenuVisible(!menuVisible)}
      >
        // ...
      </ProfileSection>
      {menuVisible && <DropdownItem />}
    </>
  );
};

export default LoginUser;
```

- ProfileSection에 ref을 걸어서 DOM을 조작하려고 했음.

  - click했을 때 click event를 걸어서 menuVisible가 true면 bar가 표출, false면 보이지 않도록 설정했음.

- Type을 정하는데 null 또는 undefined 타입에러가 떠서 타입가드를 써보았지만 적용되지 않음.

  - `React.MutableRefObject<HTMLDivElement>`로 타입단언해줌.

<br>

## useRef로 EventLister

- useEffect를 이용해 bar의 외부를 클릭했을 때 닫히도록 설정

```TSX
  useEffect(() => {
    const handleCloseMenu = (event: React.BaseSyntheticEvent | MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target))
        setMenuVisible(false);
    };

    document.addEventListener('click', handleCloseMenu);
    return () => document.removeEventListener('click', handleCloseMenu);
  }, [menuRef]);
```

- 여기서도 event 타입 에러가 발생했음.
  - MouseEvent로 적용해보았지만, menuRef.current.contains 함수의 파라미터 타입이 맞지 않는다는 에러가 발생
  - 이 [블로그](https://velog.io/@ptcookie78/TypeScript-React.js%EC%97%90%EC%84%9C-useRef-Hook-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)에서 답을 알게 됐음.
  - 그리고 여기서 사용한 `React.BaseSyntheticEvent`는 이 [블로그](https://blog.mathpresso.com/react-deep-dive-react-event-system-1-759523d90341)에서 자세히 설명되어있었음

<br>

## 리팩토링

> 위의 BaseSyntheticEvent와 같은 내용은 아직 나에게 이해하기 어려움.  
> 내가 이해할 수 있는 방법대로 리팩토링 해보기

```TSX
const menuRef = useRef<HTMLDivElement>(null);
```

- 먼저 `React.MutableRefObject<HTMLDivElement>`에서 `HTMlDivElement`로 간소화 시켰음.
- `React.MutableRefObject`와 같이 작성하니 복잡해보이고, 코드를 보기 더 어렵게 느껴짐
- HTMLDivElement로 타입을 지정한 뒤 null값을 넣어줌
- 자세한 설명은 이 [블로그](https://driip.me/7126d5d5-1937-44a8-98ed-f9065a7c35b5#7126d5d5-1937-44a8-98ed-f9065a7c35b5)에서 확인할 수 있었음

<br>

```TSX
  const handleCloseMenu = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        setMenuVisible(false);
    };
```

- 기존의 event는 `React.BaseSyntheticEvent | MouseEvent`로 타입이 매겨져 있었음
- MouseEvent로 수정을 해주고, event.target에서 발생하는 타입에러는 타입단언으로 Node를 지정해줌
- 리팩토링시 이 [블로그](https://close-up.tistory.com/entry/React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%8A%B9%EC%A0%95-%EC%98%81%EC%97%AD-%EC%99%B8-%ED%81%B4%EB%A6%AD-%EA%B0%90%EC%A7%80)를 참고함

- 참고로 `event.target as Node`에서 Node를 들어가면 `EventTarget`을 상속받아 확장함.
  ![](../screen/Node%20interface.png)

<br>

### 참고자료

[useRef "Object is possibly null" error in React](https://bobbyhadz.com/blog/react-useref-object-is-possibly-null)

[TypeScript React.js에서 useRef Hook 사용하기](https://velog.io/@ptcookie78/TypeScript-React.js%EC%97%90%EC%84%9C-useRef-Hook-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

[React Deep Dive— React Event System](https://blog.mathpresso.com/react-deep-dive-react-event-system-1-759523d90341)

[TypeScript React에서 useRef의 3가지 정의와 각각의 적절한 사용법](https://driip.me/7126d5d5-1937-44a8-98ed-f9065a7c35b5#7126d5d5-1937-44a8-98ed-f9065a7c35b5)

[React 컴포넌트 특정 영역 외 클릭 감지](https://close-up.tistory.com/entry/React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%8A%B9%EC%A0%95-%EC%98%81%EC%97%AD-%EC%99%B8-%ED%81%B4%EB%A6%AD-%EA%B0%90%EC%A7%80)

[click 외부 클릭 감지](https://velog.io/@miyoni/TIL37)

- 외부클릭감지 설명 참고
