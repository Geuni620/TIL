# Javascript

> 최근 gatsby blog를 리뉴얼하면서 Table of Content(이하 TOC)에 해당 제목이 tracking되면 Active 되도록 구현하고 싶었음.  
> 즉, 스크롤을 내리다가 H1에 해당하는 제목이 보였을 때 TOC에 H1과 동일한 제목의 태그에 active 클래스를 입혀서 bold 처리하는 등의 효과들.  
> Scroll Event를 읽어서 적용하는 방법만 알고 있었다가, Intersection Observer라는 API에 대해 알게 됨.

<br>

## Table Of Contents

- Gatsby에서는 TableOfContent를 쉽게 구현할 수 있도록 plugin을 제공함.

```JS
// gatsby-config.js
module.exports = {
  siteMetadata: {
    //..
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              className: 'table-of-contents',
            },
          },
        ],
      },
    },
  ],
}
```

<br>

```TSX
// post_template.tsx
const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
}) {
  const {
    node: {
      html,
      tableOfContents,
    },
  } = edges[0]

  return (
    <Template title={title} description={summary} url={href}>
      <Layout>
        <Post>
          <PostHead title={title} date={date} categories={categories} />
          <PostContent html={html} />
        </Post>
        <TableOfContents contents={tableOfContents} />
      </Layout>

      <CommentWidget />
    </Template>
  )
}
```

- graphql query를 통해 매개변수로 `tableOfContents`를 받아서 컴포넌트 props로 내려줌

<br>

## Intersection Observer

```TSX
// TableOfContents.tsx
const TableOfContents: React.FC<TableOfContentElement> = ({ contents }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const headerElement = entry.target

          if (entry.isIntersecting) {
            headerElement.classList.add('active')
          } else {
            headerElement.classList.remove('active')
          }
        })
      },
    )

    const headerElements = document.querySelectorAll('h1, h2, h3')

    headerElements.forEach(headerElement => {
      observer.observe(headerElement)
    })
  }, [])

  return (
    <Layout>
      <Contents id="post-toc" dangerouslySetInnerHTML={{ __html: contents }} />
    </Layout>
  )
}
```

- useEffect를 통해 blog post가 렌더링되면 observer로 뷰 포트를 tracking 하려고 했음.
- `headerElements`에 h1, h2, h3 tag에 해당하는 Element를 NodeList로 담아줌
- 담긴 headerElement에 Element 하나하나를 observer로 tracking을 시작함.
- entries에는 다양한 속성들이 존재하는데, 이는 [이 블로그](https://heropy.blog/2019/10/27/intersection-observer/)에 자세히 설명되어 있음.
- isIntersecting 속성을 통해 관찰 대상이 교차하면 tracking 되도록 했음.

![intersection observer](../screen/Intersection%20Observer.png)

- 스크린샷에서 볼 수 있듯이 나의 뷰포트를 기준으로 빨간색 박스친 Header Tag들이 오른쪽 상단(TOC)에 Tracking 되어 있다.

<br>

### 참고자료

<br>

[공식문서 Table of Contents in Gatsby](https://www.gatsbyjs.com/plugins/gatsby-remark-table-of-contents/)

[Intersection Observer - 요소의 가시성 관찰](https://heropy.blog/2019/10/27/intersection-observer/)

[웹페이지에 스크롤 애니메이션 쉽게 주는 법](https://youtu.be/e4Afka5IOZ8)

[Gatsby 블로그 TOC 만들기](https://ha-young.github.io/2021/gatsby/2021-01-06-Gatsby-%EB%B8%94%EB%A1%9C%EA%B7%B8-TOC%EB%A7%8C%EB%93%A4%EA%B8%B0/)

- 블로그 코드를 많이 참고했음.
