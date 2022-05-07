## CSS로 클릭 막기

> Nav Bar를 만들고 있음. map을 이용해서 nav bar를 구성했는데, 경계선 역시 map으로 구성했음.  
> 문제는 이 경계선도 클릭이 가능하다는 점. 이를 막아보기 위해 CSS 요소를 찾아봄

```
 pointer-events: none;
```

- 다음과 같이 style를 추가하니 클릭 요소에서 빠짐

### 참고자료

https://meanbymin.tistory.com/98
