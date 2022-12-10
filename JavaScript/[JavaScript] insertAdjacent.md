# Javascript

## insertAdjacentElement, insertAdjacentHTML, insertAdjacentText의 차이

```JS
// position은 모두 동일하게 사용됨 (beforebegin, afterbegin, beforeend, afterend)
insertAdjacentElement(position, element) // element는 Elemenet node or Text node

insertAdjacentHTML(position, text)  // text는 HTML, XML로 해석할 수 있는 문자열

insertAdjacentText(position, data) // data는 Text

```

<br>

### 참고자료

[[DOM] innerHTML vs insertAdjacentHTML vs appendChild 비교](https://velog.io/@jangws/innerHTML-vs-insertAdjacentHTML-vs-appendChild-%EB%B9%84%EA%B5%90)

[[JavaScript] element.insertAdjacentElement() - 특정 element를 기준으로 노드 삽입하기 및 이동하기 (ft. insertAdjacentHTML, insertAdjacentText)](https://mine-it-record.tistory.com/587)
