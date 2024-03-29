# JavaScript

- 웹사이트에서 페이지 이동시 Modal창이 알아서 열림
- 열린 모달창을 닫지않고 `앞으로가기`, `뒤로가기` 클릭시 route는 이동하지만 모달창은 닫히지 않은채 이동 됨

```JS
return (
    <div
      onWheel={preventEventPropagation}
      onTouchMove={preventEventPropagation}
    >
      {modal.data.map((x, i) => (
        <Modal key={i} {...x} />
      ))}
      {cardnews.data &&
        (cardnews.data.action === 'customCardnews' ? (
          <CustomCardNews slug={cardnews.data.slug} />
        ) : (
          <Cardnews {...cardnews.data} />
        ))}
      {storybook.data &&
        (storybook.data.data?.isMobile ? (
          <MbBookContainer {...storybook.data} />
        ) : (
          <BookContainer {...storybook.data} />
        ))}
    </div>
  );
```

- return 내의 구조는 다음과 같음, 조건식이 걸려있음.

<br>

### window.onpopstate

- 검색을 해보다가 onpopstate를 알게됐음
- onpopstate는 사용자의 세션 기록 탐색으로 인해 현재 활성화된 기록 항목이 바뀔 때(페이지 이동) 발생함
- 주의할 점은 브라우저마다 다르게 동작한다는 점
  - Chrome와 Safari는 popstate 이벤트를 페이지 로딩시에 발생시킴
  - 하지만 Firefox는 그렇지 않음.
  - 확인 결과 크리티컬 하지 않음. (모바일 웹브라우저 모두.)

```JS
// GlobalComponents.js
  window.onpopstate = () => {
    closeCardnews();
    closeStorybook();
    closeAllModal();
  };
```

- Modal창을 관리하는 가장 상위 components에 다음과 같은 기능을 만들었음
- 하나씩 Modal, BookContainer 등등 넣어줘서 각각을 분리시켜줬어도 됐지만, 위에 return이 조건식으로 되어있어서 하나씩 관리하는게 가독성이 좋아보이지 않았음
  - 그래서 전체 닫기를 수행하는 기능으로 만듦

<br>

### window.pushState()

> pushState와 onpopstate에 대해서 좀 더 자세히 살펴보기

```JS
window.onpopstate = (e) => {
    console.log(
      `${JSON.stringify(e.state)} | ${location.origin} | ${location.pathname}`,
    );
  };

const state = { page_id: 1, data: 'Test' };
const url = location.origin + '/hwa-sum';
history.pushState(state, null, url);
```

<br>

- 다음과 같이 적용하면 이렇게 동작함.

1. chrome 열고나서 `http://localhost:3000`을 누르면 뒤에 hwa-sum이 붙은 상태인 `http://localhost:3000/hwa-sum`으로 url이 찍히고, 페이지는 main페이지로 이동함
2. 뒤로가기를 누르면 console이 찍히고, hwa-sum에 해당하는 url로 이동함.
3. 다시 뒤로가기 누르면 console만 찍힘

- 앞으로가기는 안 됨(비활성화).

<br>

### 참고자료

[pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)  
[popstate](https://developer.mozilla.org/ko/docs/Web/API/Window/popstate_event)
[history.pushState](https://kwangsunny.tistory.com/28)
