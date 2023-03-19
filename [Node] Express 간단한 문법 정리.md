# Express

### Part1

> Express에서 간단한 문법들

```JS
const express = require("express");
const app = express();


// port번호 8080의 server를 띄운다.
app.listen(8080, () => {
  console.log("listening on 8080");
});


// localhost:8080/pet에 접속하면 다음과 같은 메세지를 보낸다.
app.get("/pet", (요청, 응답) => {
  응답.send("펫 용품 사시오");
});


// localhost:8080에 접속하면 현재 파일 경로를 기준으로 index.html를 serving 한다.
app.get("/", function (요청, 응답) {
  응답.sendFile(__dirname + "/index.html");
});
```

<br>

```HTML
<div class="container mt-3">
    <form action="/add" method="POST">
        <div class="form-group">
            <label>오늘의 할일</label>
            <input type="text" class="form-control" name="title" />
        </div>
        <div class="form-group">
            <label>날짜</label>
            <input type="text" class="form-control" name="date" />
        </div>
        <button type="submit" class="btn btn-outline-secondary">Submit</button>
    </form>
</div>
```

- 폼 전송 버튼을 클릭하면 /add 라는 경로로 POST 요청을 하는 폼이 완성.
- action은 어떤 경로로 요청할건지를 정하는 부분

```JS
app.post("/add", (요청, 응답) => {
  console.log(요청.body);
  응답.send("전송완료");
});

// console.log(요청.body) 의 결과로 아래와 같이 출력됨.
// { title: '라이브러리 학습하기', date: '2023-03-19' }
```

<br>

### 참고자료

[Node.js, MongoDB로 2시간 만에 빠르게 웹서비스 만들기](https://codingapple.com/course/node-express-mongodb-server/)
