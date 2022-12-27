# React

## Checkbox 구현을 위한 단계적 개선

### Step 1 싱글 체크

```TSX
const imagesMocking = [
  { id: 1, name: 'Photo1' },
  { id: 2, name: 'Photo2' },
  { id: 3, name: 'Photo3' },
  { id: 4, name: 'Photo4' },
  { id: 5, name: 'Photo5' },
  { id: 6, name: 'Photo6' },
];

const CardContainerModal = () => {
  const [checkedList, setCheckedList] = useState([]);

  const handleSingleCheckedBox = (checked: boolean, id: number) => {
    if (checked) setCheckedList((prev) => [...prev, id]);
    else setCheckedList(checkedList.filter((el) => el !== id));
  };

  return (
    <Container>
      <CardList>
        {imagesMocking.map((photo) => (
          <Card key={photo.name}>
            <CheckBoxSection>
              <input
                type="checkbox"
                id={photo.name}
                onChange={(e) =>
                  handleSingleCheckedBox(e.target.checked, photo.id)
                }
                checked={checkedList.includes(photo.id) ? true : false}
              />
              <label htmlFor={photo.name}></label>
            </CheckBoxSection>
            <BackgroundImg />
          </Card>
        ))}
      </CardList>
    </Container>
  );
};
export default CardContainerModal;
```

- 맨 처음엔 다음과 같이 작성했음

<br>

### Step 2 싱글 체크 개선

```TSX
const CardContainerModal = () => {
  const [photoList, setPhotoList] = useState([
    {
      id: 1,
      name: 'Photo1',
      checked: false,
    },
    {
      id: 2,
      name: 'Photo2',
      checked: false,
    },
    {
      id: 3,
      name: 'Photo3',
      checked: false,
    },
  ]);

  const handlePhotoClick = (id: number) => {
    setPhotoList(
      photoList.map((photo) => {
        if (photo.id === id) {
          photo.checked = !photo.checked;
        }

        return photo;
      }),
    );
  };

  return (
    <Container>
      <CardList>
        {photoList.map((photo) => {
          return (
            <Card key={photo.id}>
              <CheckBoxSection>
                <input
                  id={photo.name}
                  type="checkbox"
                  onClick={() => handlePhotoClick(photo.id)}
                />
                <label htmlFor={photo.name}></label>
              </CheckBoxSection>
              <BackgroundImg />
            </Card>
          );
        })}
      </CardList>
    </Container>
  );
};

export default CardContainerModal;
```

- 네이밍을 명시적으로 변경했음, Single이라는 표현을 사용하지 않음.
  - 사실 handleAllCheckedList라는 함수가 존재하는 페이지가 있는데, 여기는 All Check가 필요하진 않음.
- imagesMocking과 checkedList를 합쳐줬음

<br>

### Step 3 싱글 체크 + 멀티 체크

```TSX
// 개선 전
interface images {
  id: number;
  name: string;
}

const imagesMocking: images[] = Array.from({ length: 50 }, (_, i) => {
  return { id: i + 1, name: `Photo${i + 1}` };
});

const photoAlbumIndexPages = () => {
  const [checkedList, setCheckedList] = useState([]);

  const handleSingleCheckedBox = (checked: boolean, id: number) => {
    if (checked) setCheckedList((prev) => [...prev, id]);
    else setCheckedList(checkedList.filter((el) => el !== id));
  };

  const handleAllCheckedBox = (checked: boolean) => {
    if (checked) {
      const idArray: number[] = [];
      imagesMocking.forEach((el) => idArray.push(el.id));
      setCheckedList(idArray);
    } else {
      setCheckedList([]);
    }
  };

  return (
    <Wrapper>
      <Contents>
        <PageHeader
          title="제조도 사진첩"
          questionBoxText="새로운 사진 추가하기"
        />

        <CardSelectContainer
          checkedList={checkedList}
          imagesMocking={imagesMocking}
          handleAllCheckedBox={handleAllCheckedBox}
        />

        <CardListContainer
          imagesMocking={imagesMocking}
          checkedList={checkedList}
          handleSingleCheckedBox={handleSingleCheckedBox}
        />
      </Contents>

      <SidePanel />

      <Link href="photo-album/add-picture">
        <AddPictureToAlbum />
      </Link>
    </Wrapper>
  );
};

export default photoAlbumIndexPages;
```

<br>

```TSX
// 개선
interface Photo {
  id: number;
  name: string;
  checked: boolean;
}

const photoAlbumIndexPages = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [photoList, setPhotoList] = useState<Photo[]>(
    Array.from({ length: 50 }, (_, i) => {
      return { id: i + 1, name: `Photo${i + 1}`, checked: false };
    }),
  );

  const handlePhotoClick = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedList(checkedList.filter((checkedId) => checkedId !== id));
    } else {
      setCheckedList([...checkedList, id]);
    }
  };

  const handleAllCheckedBox = (checked: boolean) => {
    if (checked) {
      setCheckedList([]);
    } else {
      setCheckedList(
        photoList.map((photo) => {
          return photo.id;
        }),
      );
    }
  };

  return (
    <Wrapper>
      <Contents>
        <PageHeader
          title="제조도 사진첩"
          questionBoxText="새로운 사진 추가하기"
        />

        <CardSelectContainer
          photoList={photoList}
          checkedList={checkedList}
          handleAllCheckedBox={handleAllCheckedBox}
        />

        <CardListContainer
          photoList={photoList}
          checkedList={checkedList}
          handlePhotoClick={handlePhotoClick}
        />
      </Contents>

      <SidePanel />

      <Link href="photo-album/add-picture">
        <AddPictureToAlbum />
      </Link>
    </Wrapper>
  );
};
```

- checkedList와 photoList, State를 2개 만들어서 관리
- checkedList는 체크된 photo.id만 관리

<br>

### Step 3 싱글 체크 + 멀티 체크

> new Set()으로 관리

```TSX
const photoAlbumIndexPages = () => {
  const [checkedById, setCheckedById] = useState<Set<number>>(new Set());
  const [photoList] = useState<Photo[]>(
    Array.from({ length: 50 }, (_, i) => {
      return { id: i + 1, name: `Photo${i + 1}`, checked: false };
    }),
  );

  const handleSingleCheckedBox = (id: number) => {
    const updatedCheckedById = new Set(checkedById);
    if (updatedCheckedById.has(id)) {
      updatedCheckedById.delete(id);
    } else {
      updatedCheckedById.add(id);
    }

    setCheckedById(updatedCheckedById);
  };

  const handleAllCheckedBox = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allChecked = new Set(photoList.map((photo) => photo.id));
      setCheckedById(allChecked);
    } else {
      setCheckedById(new Set());
    }
  };

  return (
    <Wrapper>
      <Contents>
        <PageHeader
          title="제조도 사진첩"
          questionBoxText="새로운 사진 추가하기"
        />

        <CardSelectContainer
          photoList={photoList}
          checkedById={checkedById}
          handleAllCheckedBox={handleAllCheckedBox}
        />

        <CardListContainer
          photoList={photoList}
          checkedById={checkedById}
          handleSingleCheckedBox={handleSingleCheckedBox}
        />
      </Contents>

      <SidePanel />

      <Link href="photo-album/add-picture">
        <AddPictureToAlbum />
      </Link>
    </Wrapper>
  );
};

export default photoAlbumIndexPages;
```

<br>

### 참고자료

[(번역) 데이터 구조를 개선하여 코드 43% 줄이기](https://velog.io/@lky5697/react-junior-code-review-and-refactoring?utm_source=substack&utm_medium=email)
