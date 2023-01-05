## tab Renderers 리팩터링

```TSX
const IslandPagesDesignManager = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const tabRenderers = new Map([
    [0, renderPageSettingsTab],
    [1, renderBuildingSettingsTab],
    [2, renderPublishSettingsTab],
  ]);

  return (
    <Wrapper>
      <Container>
        {TAB_NAME_LIST.map(({ id, tab }: MenuTabNameList) => {
          const isSelected = activeTab === id;
          return (
            <Tab
              className={isSelected ? 'text-black' : 'text-JGray'}
              key={id}
              onClick={() => handleTabClick(id)}
            >
              {tab}
            </Tab>
          );
        })}
      </Container>
      <Hr />
      <TabContent>{tabRenderers.get(activeTab)()}</TabContent>
    </Wrapper>
  );
};


const renderBuildingSettingsTab = () => {
  return (
    <BuildingSettings>
    //...
    </BuildingSettings>
  );
};

const renderPublishSettingsTab = () => {
  return (
    <PublishSettings>
    //...
    </PublishSettings>
  );
};

const renderPageSettingsTab = () => {
  return (
    <PageSetting>
    //...
    </PageSetting>
  );
};
```

- Tab을 클릭할 때 activeTab state에 담기는 number에 따라 rendering JSX.Element가 실행되도록 구현.
- 간단하게 표현할 수 있는 코드를 복잡하게 꼬아 놓은 것 같음

<br>

```TSX
    <TabContent>
        {activeTab === 0 && <PageSettingsTab />}
        {activeTab === 1 && <BuildingSettingsTab />}
        {activeTab === 2 && <PublishSettingsTab />}
    </TabContent>
```

- activeTab에 따라서 component가 렌더링 되도록 수정했음.
- 이렇게 했을 때 성능이나, 가독성이 더 좋다는 피드백을 얻음 🙌

<br>

```TSX
const ContentComponents = {
  BasicSetting: <BasicSetting />,
  DialogBubble: <DialogBubble />,
  PublicSetting: <PublicSetting />,
};

{isOpen && ContentComponents[content]}
```

- 해당 페이지 렌더링 되었을 때, Accordion의 ContentComponents는 객체로 적용해봤음.
- 하지만, 여기서도 객체보단 Map이 더 낫지 않을까? 하는 고민이 들기도 했음.
- 이유는 이 두 블로그 글에서 찾을 수 있음
  - [자료구조 | 해시 테이블 hash table](https://velog.io/@edie_ko/hashtable-with-js)
  - [[번역] 자바스크립트 Map을 Object 대신 사용해야할 때는 언제일까요?](https://velog.io/@oneook/%EB%B2%88%EC%97%AD-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Map%EC%9D%84-Object-%EB%8C%80%EC%8B%A0-%EC%82%AC%EC%9A%A9%ED%95%B4%EC%95%BC%ED%95%A0-%EB%95%8C%EB%8A%94-%EC%96%B8%EC%A0%9C%EC%9D%BC%EA%B9%8C%EC%9A%94)
    - 간단히 정리해보면, 성능을 고려했을 때, 객체보다 Map이 더 뛰어나기 때문.
    - 하지만 이 코드에선 객체를 적용했다. 그 이유는, 데이터구조를 구현하기에 객체가 더 알아보기 쉽다고 판단했기 때문.

<br>

[자바스크립트의 Object 와 Map 의 차이점에 대해서 얘기해보세요.](https://jake-seo-dev.tistory.com/348)

- 객체의 key는 string과 symbol만 가능함.
