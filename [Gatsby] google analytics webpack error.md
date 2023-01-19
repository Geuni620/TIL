# Gatsby

## Google Analytics 붙이기

> google analytics를 블로그에 붙이기 위해 plugin으로 `gatsby-plugin-google-gtag`를 설치하고,  
>  타 블로그를 참고하여 적용하려 했으나 다음과 같은 에러가 발생.

![gatsby build error](./screen/gatsby%20bundle%20error.png)

[gatsby github issues](https://github.com/gatsbyjs/gatsby/issues)를 확인하며 webpack error라고 해서 덜컥 겁부터 냈음.

<br>

- 그리고 error 문구에 나와있듯이 [Debugging](https://www.gatsbyjs.com/docs/debugging-the-build-process/)내용 링크를 걸어줘서 SSR 에러인가, 하는 생각도 했음.

<br>

## 해결방법

[gatsby-plugin-google-gtag](https://www.gatsbyjs.com/plugins/gatsby-plugin-google-gtag/)공식문서 내용을 살펴보면 trackingIds에 배열로 넣어줘야 함.

<br>

하지만, 몇몇 타 블로그에는 배열 행태가 아닌 String으로 적혀있음.  
**다시 한 번 공식문서부터 default로 찾아봐야 겠다는 생각이 들었음.**
