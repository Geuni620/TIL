# 배운 내용

## Git revert or Git cherry-pick

상황은 대충 이러하다.

1. 2주 전쯤 A 브랜치에서 PR 날려놓은게 있음
2. 오늘 오전 B 브랜치로 변경 후 Push를 날렸음
   - 근데 실수로 A 브랜치로 push를 날려버림
   - "PR작성만 안하면 괜찮겠지" 해서 B 브랜치 생성 후 Push 날림
3. 2주 전쯤 날린 PR이 merge 됨
   - merge 됐을 때 commit 기록에 오전에 PR 잘못 날린 것까지 merge 됨

<br>

## 되돌리기

- github에서 force push 할지, revert할지 고민하다가 revert 했음

  ![revert button](./screen/revert%20button.png)

- revert한 후 dev branch에서 hotfix 브랜치 생성
- 생성한 hotfix브랜치에서 revert 또는 reset하면 되지않을까?
  - 안됨. git commit 기록이 같아서 push 날려도 변동사항 없음.

<br>

## cherry-pick

```
git cherry-pick <가져오고 싶은 커밋ID>
```

- hotfit 기준으로 cherry-pick을 이용해 가져오고 싶은 commit을 하나씩 가져온 후 PR 작성해서 문제를 해결할 수 있었음.

### 참고자료

[내가 원하는 commit만 merge 하고 싶을 때](https://novemberfirst.tistory.com/97)
