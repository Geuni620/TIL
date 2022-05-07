## Vscode Code.

> 언제부턴지 모르겠지만 터미널에서 경로 이동 후 code .을 눌렀을 때 `zsh: command not found: code`와 같은 메시지가 뜨면서 동작하지 않음

### 해결방법 1.

```
Command(Ctrl) + Shift + p

Shell Command: Install 'code' command in PATH // 선택지 중 보기와 같은 문구 선택하기
```

보통 블로그에선 이렇게 했을 때 해결된다고 적혀 있었지만, 나는 다음과 같은 에러를 마주했음.

```
EACCES: permission denied, unlink '/usr/local/bin/code'
```

### 해결방법 2.

```
cd /usr/local/bin
sudo rm -rf code
```

터미널에서 다음과 같은 작업을 진행한 후 해결방법 1번을 따라가보면 해결가능

### 참고자료

https://dianakang.tistory.com/44  
해결방법 1을 참고했음

https://velog.io/@kkamyang/%EC%97%90%EB%9F%AC-EACCES-permission-denied-unlink-usrlocalbincode  
해결방법 2을 참고했음
