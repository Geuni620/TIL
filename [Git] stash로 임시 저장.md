# git

### git stash

```Shell
git stash // 하던 작업 임시로 저장

git stash list // 저장한 stash 목록 확인

git stash apply // 가장 최근의 stash를 가져와 적용함
git stash apply [stash 이름] // ex. stash@{2}에 해당하는 stash를 적용함

git stash drop // 가장 최근의 stash를 제거함.
git stash drop [stash 이름] // ex. stash@{2}에 해당하는 stash를 제거

git stash pop // apply + drow의 형태, 적용과 동시에 스택에서 해당 stash를 제거하고 싶을 때

```

### 참고자료

[git stash 명령어 사용하기](https://gmlwjd9405.github.io/2018/05/18/git-stash.html)
