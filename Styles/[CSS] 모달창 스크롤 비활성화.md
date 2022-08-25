# CSS

## docuement.body.style.overflow

- overflow 사용해서 스크롤 비활성화
- portal을 이용해서 css 상속으로부터 자유로웠음

```TSX
const openModal = () => {
  // 스크롤 비활성화
  document.body.style.overflow = 'hidden';
  dispatch(setModalVisible(true));
};

const closeModal = () => {
  // 스크롤 활성화
  document.body.style.overflow = 'auto';
  dispatch(setModalVisible(false));
};
```

- 모달창이 열리고 닫힐 때 외부 스크롤 활성화와 비활성화 방법

<br>

### 참고자료

https://gisastudy.tistory.com/72  
https://joylee-developer.tistory.com/185  
스크롤 활성화 & 비활성화

https://ko.reactjs.org/docs/portals.html  
react portal 공식문서
