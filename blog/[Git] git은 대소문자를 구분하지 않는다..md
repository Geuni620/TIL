### github은 대소문자를 구분하지 않는다.

오늘 컴포넌트명 중 SearchbarInput를 SearchBarInput으로 수정하였다.  
하지만, git이 tracking이 잘 되지 않아 push 하고 merge 했음에도 불구하고 계속 빨간줄이 떴다.

<br>

해결 방법으론 두 가지가 있었는데, 나의 경우엔 다음과 같다.

```
git mv -f SearchbarInput.js SearchBarInput.js
```

해당 컴포넌트명칭을 다음과 같이 변경해서 git이 잘 tracking 되도록 해주는 것이 있다.

<br>

이전에도 똑같은 방법으로 해결했던 경험이 있어서 잘 될거라 생각하고 merge 이후 dev 브랜치에서 pull 당기니 다음과 같은 에러가 떴다.

```
From https://github.com/jejodo-dev-team/admin-next-front
 * branch            dev        -> FETCH_HEAD
Updating 68758e0..c765780
error: The following untracked working tree files would be overwritten by merge:
        components/Datatable/SearchBarInput.tsx
Please move or remove them before you merge.
Aborting
```

<br>

pull 당기기 전에 다음과 같은 명령어를 실행했는데 이게 원인이었다.

```
git config core.ignorecase false
```

이건 git config 상에서 대소문자를 구분하지 않는다는 설정이다.
이렇게 설정해놓고 pull 당기니, 당연히 변경된 부분이 tracking 되지 않았던 것.

<br>

블로그나 다른 사이트에선 stash를 하면 된다고 했지만, 되지 않았다...
결국 해결 방법은 true로 변경한 후 pull 당기는 것이었다.

```
git config core.ignorecase true
```

<br>

### 참고자료

[How do I commit case-sensitive only filename changes in Git?](https://stackoverflow.com/questions/17683458/how-do-i-commit-case-sensitive-only-filename-changes-in-git)
