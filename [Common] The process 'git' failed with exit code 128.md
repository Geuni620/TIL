## github action error

> gatsby를 이용한 블로그를 만들었는데, 여러 이유로 해당 블로그는 개인적인 기록, 또는 매 달 읽은 블로그 및 키워드를 기록하는 용도로 사용하려 함.  
> 매달 하나의 게시물을 올리다보니 관리가 소홀했는데, 어김없이 github Action에서 에러가 발생

<br>

![github action error](./screen/git%20action%20error.png)
에러 문구는 다음과 같음

- 블로그를 찾아본 결과 Token이 만료되어 갱신을 완료했는데 업데이트가 반영되지 않아서 생기는 에러였음

<br>

## 해결방법

1. github 오른쪽 상단 프로필 이미지를 클릭한 후 > settings 클릭
2. settings 창으로 이동한 후 Developer settings 클릭
3. Personal access tokens에서 Gatsby 블로그 Token을 갱신함

   - 갱신하려는 Token 클릭하여 Update 해주기
   - 꼭 `Regenerate Token` 눌러서 갱신 후 해당 Token 복사해주기
   - 아래에서 레포에 Token 붙여넣어주어야 함.

<br>

4. 갱신 완료 후 Gatsby blog 해당 레포로 이동한 후 레포의 상단에 Settings 클릭
5. 오른쪽 메뉴바에서 Secrets > Actions 클릭
6. Update 눌러서 위에서 복사한 Token 붙여넣고 완료누르기
7. 다시 git push 날리기

<br>

![Token 갱신](./screen/Token%20%EA%B0%B1%EC%8B%A0.png)

<br>

### 참고자료

[GitHub Actions가 에러날 때 해결방법](https://get6.github.io/devops/2021/github-actions-failed/)
