# NextJS

### useRouter

- useRouter와 withRouter가 있는데, 함수형일 경우 useRouter를 사용하고(react hooks), withRouter는 클래스형 컴포넌트에서 사용되는 고차 컴포넌트다.

<br>

### useRouter 속성값

```TSX
asPath: "/user-manager/user-list/0" // 검색 매개변수를 포함하여 브라우저에 표시되는 경로
pathname: "/user-manager/[editList]/[id]" // 현재 경로 파일의 경로
query : {editList: 'user-list', id: '0'} // 동적 경로 매개 변수를 포함하여 객체로 구문 분석된 쿼리 문자열
```

<br>

### router.push vs router.replace

```
router.push(url, as, options) | router.replace(url, as, options)

 url: 이동할 url
 as: 이동 후 브라우저에 표시될 URL
 options: {
    scroll // boolean, 탐색 후 페이지 상단으로 스크롤하는 것을 제어, 기본값은 true
    shallow // getStaticProps, getServerSideProps 또는 getInitialProps를 다시 실행하지 않고 현재 페이지의 경로를 업데이트, 기본값은 false
    locale // 국제화(i18n) 기능과 관련됨. 페이지 이동 시에 특정 locale을 명시적으로 선택가능
  }
```

<br>

### 참고자료

[next/router](https://nextjs.org/docs/api-reference/next/router)

[[Next.js] next/router 사용하기 (공식문서 내용 정리)](https://im-designloper.tistory.com/102)

<br>

### svg 파일 색상 변경하는 방법

[Next에서 svg 사용하는 방법](https://velog.io/@owlsuri/Next%EC%97%90%EC%84%9C-svg-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
