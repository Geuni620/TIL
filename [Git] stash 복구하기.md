# Git

### git stash drop 복구하기

```
git stash apply stash@{0}
```

- 위 방법 외엔 git stash drop 이후 뜨는 hash 값으로도 북구할 수 있음

<br>

```
git stash apply hash
```

### 참고자료

[git stash drop 시킨 변경사항 복구하기](https://h22y25n.github.io/git/restore-dropped-stash-on-git/)
