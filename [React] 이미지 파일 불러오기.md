## 배운 내용

### React 이미지 파일 불러오기

> 프로젝트를 진행하면서 항상 헷갈려했던 이미지 파일 불러오기, 불러왔다고 생각했지만 항상 이미지 파일이 깨져있었음. Notion으로 지난 프로젝트 기록들을 정리하다가 적어놓은 부분을 공유해보려 함

<br>

- 모든 이미지들은 `public/images`에서 관리함
  - public/images로 접근 가능
  - "/" -> 오직 JS파일에서만 가능
    - background-image는 CSS 파일, 즉 접근 불가능함
- background-image 쓰려고 한다면 다음의 방법을 이용할 것
  - src 밑에 images 만들고 이 밑에 넣어주기
  - 상대경로로 불러오기

```
// 정리하자면 JS images는
public/image -> "/"

// CSS
src/assets/images => "../../assets/images"

```
