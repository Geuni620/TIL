# Node

### DB에 id 설정해서 저장해주기

![collection add](./screen/mongodb%20atlas%20collection%20add.png)

- 위 스크린샷과 같이 hover 했을 때 '+' 버튼이 생긴다. 클릭한 후 counter collection을 추가해주었음

<br>

!`[counter collection 구성](./screen/counter%20collection%20%EA%B5%AC%EC%84%B1.png)

- counter collection은 id, totalPost, name로 구성했음
- 게시물이 하나 추가될 때마다, totalPost가 +1씩 올라감

<br>

```JS
app.get("/write", (요청, 응답) => {
  응답.sendFile(__dirname + "/write.html");
});

app.post("/add", (요청, 응답) => {
  응답.send("전송완료");

// localhost:8080/write에서 format을 작성한 후 findOne 메서드로 name:"게시물개수"를 counter collection에서 찾아옴
  db.collection("counter").findOne({name: "게시물개수"}, function (에러, 결과) {
    console.log(결과.totalPost);
    var 총게시물개수 = 결과.totalPost;

// post는 총 게시물 개수의 +1로 id가 설정되고, 제목과 날짜는 format에서 사용자가 작성한 내용을 토대로 구성됨.
    db.collection("post").insertOne(
      {_id: 총게시물개수 + 1, 제목: 요청.body.title, 날짜: 요청.body.date},
      function (에러, 결과) {
        if (에러) console.log(에러);

        console.log("저장완료");

// updateOne의 인자 순서는 ({이런 이름의 자료를}, {이렇게 수정해주세요}, function (에러, 결과){})로 구성된다.
// 그래서 아래 코드는 counter collection의 name: 게시물개수를 찾아, totalPost 값을 +1 해주세요. callback으로 에러 뜨면 log 띄워주세요.
// 여기서 $inc는 기존 값의 더하기이다, $set도 존재하는데, 이건 해당 값으로 수정해달라는 뜻이다
        db.collection("counter").updateOne(
          {name: "게시물개수"},
          {$inc: {totalPost: 1}},
          function (에러, 결과) {
            if (에러) {
              return console.log(에러);
            }
          }
        );
      }
    );
  });
});

/*
예를들어,

{$inc: {totalPost: 5}}라면, 기존 totalPost에 +5해달라는 뜻이다.
{$set: {totlaPost: 100}}라면, 기존 totalPost에 값을 100으로 변경해달라는 뜻이다.

*/
```

- 코드의 위에 주석을 달아서 코드를 설명해두었음.

<br>

### 참고자료

[Node.js, MongoDB로 2시간 만에 빠르게 웹서비스 만들기](https://codingapple.com/course/node-express-mongodb-server/)
