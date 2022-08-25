# Styled components

> 사이드 프로젝트를 진행하다가 형광펜 효과를 줄 일이 있어서 애니메이션으로 만들었음

### 1. styled components 애니메이션 주기

- 처음엔 `box-shadow`를 이용해서 형관펜 효과를 주려고 했음

  - 애니메이션 효과를 주기위해 `width`를 조정하여 밑줄을 그어지게 만들었는데 글자프레임까지 깨져버려서 다른 방법을 고안하게 됐음.

<br>

- 결과적으론 가상요소 `:after`를 이용했음

```SCSS
  &:after {
    content: '';
    display: block;
    width: 40%;
    height: 20px;
    position: absolute;
    transform: translateY(-10px);
    z-index: -100;
    animation: ${SubTitleHightLight} 1.5s linear;
    animation-delay: 1s;
    animation-fill-mode: forwards;
```

- transform으로 밑줄 그어진 선의 위치를 조정했음
- z-index를 이용해서 글자가 덮혀지지 않도록 선의 레이어를 하단으로 낮춤

* keyframe은 다음과 같이 만들어줌

  ```SCSS
  const SubTitleHightLight = keyframes`
  0% {
    width:0%;
    box-shadow: inset 0 -25px #2de466;
  }
  50% {
    width:20%;
    box-shadow: inset 0 -25px #2de466;
  }
  100% {
    width:40%;
    box-shadow: inset 0 -25px #2de466;
  }
  `;
  ```

  <br>

### 2. 새롭게 적용해본 animation 효과

```SCSS
animation-delay: 1s;
animation-fill-mode: forwards;
```

- `animation-delay`를 줘서 title과 subtitle 시간차를 적용
  - title이 형광펜 칠해진 이후 subtitle의 형광펜 적용
- `animation-fill-mode`를 이용해서 줄그어진 이후 효과가 사라지지 않도록 만들어줌.
  - 처음부터 subtitle에 형광펜 적용한 이후, animation을 적용하니, 처음 구상했던 효과가 나타나지 않았음.
    - → title이 줄그어진 이후 subTitle이 줄그어져야하는데 title의 애니메이션효과가 적용될 시점에, subTitle에는 이미 형광펜이 칠해져있었음.
  - 그래서 subTitle의 형광펜 효과를 없애고 난 이후, animation을 이용해서 효과를 적용하고 `animation-fill-mode forward`로 효과가 지속되도록 만듦

<br>

### 참고자료

https://bomee88.github.io/css/highlight/css-highlight/  
 처음 box-shadow를 적용할 때 참고한 자료

https://webisfree.com/2018-09-19/css-animation-%EA%B5%AC%ED%98%84%EC%8B%9C-%EB%A7%88%EC%A7%80%EB%A7%89-%EC%83%81%ED%83%9C-%EC%9C%A0%EC%A7%80%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95  
애니메이션 효과 마지막 상태 유지하는 방법
