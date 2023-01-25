# Web API

## FileReader

> 스터디를 진행하다가 알게된 내용을 정리

```TSX
const DialogBubble = () => {
  const [dialogBubbleData, setDialogBubbleData] = useState({
    image: null,
  });

  const saveImage = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      setDialogBubbleData({ ...dialogBubbleData, image: reader.result });
    };

    return reader.readAsDataURL(extractSelectedFile(e.target.files));
  };

  return (
    <>
      <div className="flex flex-col w-auto gap-5 px-6 pb-5 overflow-y-scroll">
        <CharacterImage>
          <p className="subTitle5">캐릭터 이미지</p>
          <p className="mt-1 mb-3 caption text-JGray">
            말풍선에 들어갈 캐릭터 이미지를 올려주세요!
          </p>
          <ItemUpload>
            <ItemImage src={dialogBubbleData.image} />
            <input
              type="file"
              id="main-file"
              accept="image/*"
              onChange={(e) => saveImage(e)}
            />
            <label htmlFor="main-file">파일 등록하기</label>
          </ItemUpload>
        </CharacterImage>
      </div>
    </>
  );
};
```

- 위 코드는 `파일 등록하기`를 클릭했을 때, 이미지를 선택할 수 있는 창이 뜨고 파일을 선택했을 때 state에 파일 URL을 담는 로직임.
- Type Driven Development에 대해서 설명하다가 스터디원 한 분의 질문에 궁금증이 생겼음

> "saveImage 함수의 return 타입은 무엇인가요?"

당시엔 당연히 FileReader일 거라고 생각했는데, 타입추론된 결과가 void 였음.

<br>

```TSX
  const saveImage = (e: ChangeEvent<HTMLInputElement>): FileReader => {
    const reader = new FileReader();
    reader.onload = () => {
      setDialogBubbleData({ ...dialogBubbleData, image: reader.result });
    };

    reader.readAsDataURL(extractSelectedFile(e.target.files));
    return reader;
  };
```

- return으로 reader를 지정했을 때 추론된 타입이 FileReader였음.
- 하지만, `onload`와 `readAsDataURL`가 어떤 식으로 동작하는지 좀 더 명확히 확인할 필요가 있었음.

<br>

동작은 다음과 같음.

1. 파일이 선택되면 `readAsDataURL`메서드가 파일의 URL을 읽음.
2. readAsDataURL이 파일을 읽은 후, `onload` 메서드가 동작함.
3. onload 메서드는 "읽기 동작이 성공적으로 완료 되었을 때마다 발생한다"
   - 즉, readAsDataURL이 성공적으로 완료 되었을 때, onload 메서드가 동작
4. onload 메서드는 State에 파일 url을 담아준다.

<br>

```TSX
  const saveImage = (e: ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();
    reader.readAsDataURL(extractSelectedFile(e.target.files));

    reader.onload = () => {
      setDialogBubbleData({ ...dialogBubbleData, image: reader.result });
    };
  };
```

- 동작하는 로직엔 큰 차이가 없지만, 순서를 조금 변경시켜봤음
- 이렇게 순서를 변경시켰을 때 코드를 읽는 사람이 조금 더 이해하기 편하지 않을까 하는 생각에.

### 참고자료

[FileReader](https://developer.mozilla.org/ko/docs/Web/API/FileReader)
[load 이벤트](https://developer.mozilla.org/ko/docs/Web/API/Window/load_event)
[FileReader.readAsDataURL()](https://developer.mozilla.org/ko/docs/Web/API/FileReader/readAsDataURL)
