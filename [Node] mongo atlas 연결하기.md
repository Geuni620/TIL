# Node

### MongoDB 연결하기

```
npm install mongodb@3.6.4
```

- version에 따라 문법이 조금 다른 듯하다. 그래서 3.6.4 version으로 설치해주었음.

<br>

```JS
//server.js
// MongoClient로 atlas를 연결시켜주기
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
  "본인의 mongo db url",
  function (에러, client) {
    if (에러) return console.log(에러);

    app.listen(8080, function () {
      console.log("listening on 8080");
    });
  }
);
// ...
```

<br>

```JS
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
app.use(express.urlencoded({extended: true}));

let db;
MongoClient.connect(
  "본인의 mongo db url",

  function (에러, client) {
    if (에러) return console.log(에러);
    db = client.db("todoapp"); // todoapp이라는 database에 접속해주세요.

    db.collection("post").insertOne(
      {name: "John", _id: 100},
      function (에러, 결과) {
        console.log("저장완료");
      }
    );

    app.listen(8080, function () {
      console.log("listening on 8080");
    });
  }
);

app.get("/", (요청, 응답) => {
  응답.sendFile(__dirname + "/index.html");
});

app.get("/write", (요청, 응답) => {
  응답.sendFile(__dirname + "/write.html");
});

app.post("/add", (요청, 응답) => {
  console.log(요청.body);
  응답.send("전송완료");
});

```

### db에 데이터 전송하기

<br>

- db를 연결했다면 db로 데이터를 전송해보자.
- `let db`로 선언해준 뒤, `db = client.db("todoapp)`을 추가해준다.

```JS
    db.collection("post").insertOne(
      {name: "KeunHwee", _id: 100},
      function (에러, 결과) {
        console.log("저장완료");
      }
    );
```

- db collection 중 post에 insertOne으로 자료를 추가할 수 있는데,

```JS
    client.db('todoapp').collection('post').insertOne(추가할 자료, 콜백함수)
```

- 이렇게 한 줄로 작성할 수도 있음.

<br>

```JS
app.post("/add", (요청, 응답) => {
  // 이 응답.send()는 항상 넣어주어야 함
  응답.send();

  db.collection("post").insertOne(
    {제목: 요청.body.title, 날짜: 요청.body.date},
    function (에러, 결과) {
      console.log("저장완료");
    }
  );
});
```

- localhost:8080/write에서 html form에 해당 내용을 작성한 후, 확인을 누르면 localhost:8080/add로 이동하게 되는데, 이때 위 코드가 동작해서 title와 data를 db에 담아줄 수 있음.  
  [write.html코드는 여기서 확인할 수 있음](https://github.com/Geuni620/TIL/blob/main/%5BNode%5D%20Express%20%EA%B0%84%EB%8B%A8%ED%95%9C%20%EB%AC%B8%EB%B2%95%20%EC%A0%95%EB%A6%AC.md)

- 여기서 중요한게 한 가지 있는데 `응답.send()`를 넣지 않으면 웹사이트가 멈춰버린다. 즉, 전송이 성공하든 실패하든 뭔가 서버에서 보내주어야함.

<br>

### /list 방문하면 ejs 파일 보내기

```JS
npm install ejs

// server.js 에서 아래부분을 추가해주어야함.
app.set("view engine", "ejs")
```

- 즉, ejs를 사용하면 HTML안에서 서버데이터를 입력할 수 있음.
- `<%=  변수이름 %>`과 같이 사용함.
- 단, EJS 파일은 꼭 views 폴더 안에 넣어줘야 함.

<br>

```JS
// /list로 get요청으로 접속하면, HTML 보여줌
// 실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML 보여줌.
app.get("/list", (요청, 응답) => {
  응답.render("list.ejs");
});
```

- localhost:8080/list에 접속하면 list.ejs에 작성한 HTML을 확인할 수 있음.

<br>

### DB에 담겨진 데이터를 보여주기

```JS
// /list로 get요청으로 접속하면, HTML 보여줌
// 실제 DB에 저장된 데이터들로 예쁘게 꾸며진 HTML 보여줌.
app.get("/list", (요청, 응답) => {
  db.collection("post")
    .find() // post에 있는 모든 데이터를 가져옴, 특정 하나만 가져오고 싶다면 findOne()
    .toArray((에러, 결과) => {
      console.log(결과);
      /*
      [
        {  // 다음과 같이 DB에 저장된 데이터를 find().toArray()가 모두 가져와서 보여줌.
          _id: 641f1cb48fb03732c7012b4a,
          '제목': '백엔드 연습하기',
          '날짜': '2023-03-26'
        }
      ]
      */
    });
});
```

- db에 담겨진 데이터를 보여주기 위해선 다음과 같이 작성하면 됨.
  - /list에 접속하면 db collection 중 "post"에 해당하는 모든 데이터를 console.log로 출력해줌

<br>

- 이걸 ejs에서 데이터를 뿌려주도록 해보자.

```JS
// server.js
app.get("/list", (요청, 응답) => {
  db.collection("post")
    .find()
    .toArray((에러, 결과) => {
      console.log(결과);
      응답.render("list.ejs", {posts: 결과}); // 결과를 posts로 내려줌.
    });
});
```

```HTML
    서버에서 가져온 할일 리스트
    <h4>할일 제목: <%= posts[0].제목 %></h4>
    <h4>할일 마감날짜: <%= posts[0].날짜 %></h4>

<!-- 반복문을 돌리고 싶다면, -->
    <% for (let i = 0; i < posts.length; i ++) { %>
    <h4>할일 제목: <%= posts[i].제목 %></h4>
    <h4>할일 마감날짜: <%= posts[i].날짜 %></h4>
    <% } %>
```

- 위와 같이 작성하면 HTML내에서 JS를 사용할 수 있음.
- 결과적으로 다음과 같이 화면에 표현됨.

<br>

![list.ejs에 랜더링된 예시](./screen/list.ejs%20%EC%98%88%EC%8B%9C.png)

<br>

### 참고자료

[Node.js, MongoDB로 2시간 만에 빠르게 웹서비스 만들기](https://codingapple.com/course/node-express-mongodb-server/)
