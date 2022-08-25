## 배운 내용

### 1. & 연산자

- `:hover`, `:focus`와 같은 `Pseudo Selector`을 SCSS로 구현할 때 사용하는 연산자

**CSS로 작성**

```
.feedscontent__left > img,
.feedscontent__right > img {
  width: 25px;
  height: 25px;
  margin: 0 5px;
}

main-right__allstory {
  border: 2px solid rgba(0, 0, 0, 0.1);
  height: 180px;
  overflow-y: scroll;
}

.main-right__allstory::-webkit-scrollbar {
  display: none;
}
```

**SCSS로 작성**

```
.feedscontent__left,
.feedscontent__right {
  & > img {
    width: 25px;
    height: 25px;
    margin: 0 5px;
  }
}

.main-right__allstory {
  border: 2px solid rgba(0, 0, 0, 0.1);
  height: 180px;
  overflow-y: scroll;

  & ::-webkit-scrollbar {
    display: none;
  }
}
```

- & 연산자를 이용해서 `Pseudo Selector`을 묶어줄 수 있음.
