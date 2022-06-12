# Webpack

> Node.js와 NPM에 대해서 배워보자

### NPM

- node package manager
- 자바스크립트 라이브러리를 관리해주는 도구

<br>

```
// package.json 생성하기

npm init // 하나하나 설정해가면서
npm init -y // 바로 생성
```

<br>

### NPM 사용하는 이유와 장점

```HTML
 <article>
    <script
        src="https://code.jquery.com/jquery-3.6.0.js"
        integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
        crossorigin="anonymous"
    ></script>
    <script>
        $.Callbacks;
    </script>
    <div class="date-picker">
        <!-- 날짜선택기 라이브러리를 적용하려고 할 때 -->
    </div>
</article>
```

- 라이브러리를 가져와서 여기에다가 집어 넣으면 안됨.

  - 라이브러리가 중간에 들어와도 돌아가긴 함, 웹페이지의 유연함.
  - 하지만 협업하는 과정에서 다른사람이 사용하는 라이브러리를 확인해야할 때 일일히 검색해야함.
  - 라이브러리 관리하기가 굉장히 복잡해짐. - 라이브러리가 한 두개면 상관없지만, 수십개일 경우 특히 서로서로 영향을 받는 의존관계일 경우, 관리하기 어려워짐.

<br>

- package.json에 라이브러리 버전이 깔끔하게 정리되어 있다는게 **npm을 사용하는 첫 번째 이유**

- 만약 내가 필요한게 jquery ui일 경우 커맨드에 한 문장으로 설치가능 및 package.json에서 관리가능

```
npm install jquery-ui
```
