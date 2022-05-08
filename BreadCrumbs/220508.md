## 배운 내용

### git rebase commit 여러 개 뭉쳐주기

```
git rebase -i master
git rebase -i main
```

- rebase 명령어를 실행하기 전에 commit이 완전 많을 경우 (10개 이상)
  > master로 pull당겨진 commit들과 지금까지 기록해놓은 commit들을 한번에 정리해야한다면 conflict 지옥에 빠질 수 있음.
- 그래서 사전에 내가 작업해놓은 commit들을 뭉쳐주는 명령어를 알게 됨

```
git rebase -i HEAD~5
```

- 다음과 같이 명령어를 실행하면 최근 작업했던 commit 5개를 먼저 뭉쳐줄 수 있음.
  - 뒤에 숫자는 뭉쳐주고 싶은 개수를 지정해주면 됨
- 이 과정을 통해 하나의 commit으로 뭉쳐준 후, pull 당겨온 commit들을 합쳐준다면 보다 수월하게 작업할 수 있음.

### 참고자료

https://meetup.toast.com/posts/39  
rebase 뭉쳐주는 방법 알게 됨
