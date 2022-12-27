# React

## debounce vs useEffect

> 복사를 눌렀을 때 setTimeout으로 "복사가 되었습니다."는 문구를 보여주고 싶은데,  
> 5번 연속으로 눌렀다가 1초 후 1번 누르면 원하는대로 동작하지 않음

```
// 리뷰해주신 내용
연속으로 클릭할 경우에도 항상 첫번째 클릭한 시점의 2초뒤에 버튼이 사라져요.

예)
11시 40분 20초 000: 클릭
11시 40분 21초 300: 클릭 -> 유저는 이 시점부터 2초 뒤(23초 300)에 메세지가 사라지길 기대
11시 40분 22초 000: 메세지 사라짐
```

<br>

### Debounce

```TSX
const timerIdRef = useRef<NodeJS.Timeout>();
const [isUrlCopy, setIsUrlCopy] = useState(false);

const handleShowMessage = () => {
setIsUrlCopy(true);
clearTimeout(timerIdRef.current);

timerIdRef.current = setTimeout(() => {
    setIsUrlCopy(false);
}, 2000);
};
```

<br>

### useEffect

> 테오 대화방에서 답변받은 내용을 인용.

```TSX
const [lastClickTime, setLastClickTime] = useState<number | null>(null);
const [isUrlCopy, setIsUrlCopy] = useState(false);

useEffect(() => {
const timeout = setTimeout(() => setIsUrlCopy(false), 2000);

return () => clearTimeout(timeout);
}, [lastClickTime]);

const onClick = () => {
setIsUrlCopy(true);
setLastClickTime(new Date().getTime());
};
```

<br>

```TSX
const useModeWithDelay = () => {
  const [modeStartTime, setModeStartTime] = useState<number>();

  useEffect(() => {
    if (modeStartTime === undefined) return;

    // 종료 시점까지 남은 시간만큼 timeout 설정
    const timeout = setTimeout(() => {
      setModeStartTime(undefined);
    }, modeStartTime + delay + new Date().getTime());

    return () => {
      clearTimeout(timeout);
    };
  }, [delay, modeStartTime]);

  const isMode = modeStartTime === null;

  const startMode = () => {
    setModeStartTime(new Date().getTime());
  };

  return { isMode, startMode };
};
```

- 당시엔 ref를 사용해서 해결했음.
- 장 단점이 있다고 생각했는데, Ref를 사용하게 되면 DOM을 직접적으로 조작하는 것이니, state로 가는게 낫지 않을까? 하는 고민이 들었었고,
- useEffect를 이용해서 동작하도록 하는건 조금 복잡하지 않을까? 하는 고민이 들었던 거 같음.
