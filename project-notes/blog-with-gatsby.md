[`Gatsby.js`](https://github.com/gatsbyjs/gatsby)（“盖茨比”js）是目前创建个人博客的最佳工具之一。

`Gatsby.js` 是一个静态 `PWA`（渐进式网页 App） 生成器。相对于 `Wordpress` 或是 `Jekyll` 这些老字号，`Gatsby` 的优势在于它结合了最新的技术，同时很好平衡了开发的简易性：

* 前端 `React` + `Webpack`
* 后台数据读取使用 `Graphql`
* 自带谷歌的`PRPL`标准（谷歌对于 `PWA` 的最佳实践）

这些技术选择带来的好处显而易见：

* 自由性，可以完成高度定制化的网站
* 使用最新技术，像大 boss 一样开发
* 无卡顿，浏览体验极佳

## 前提

最好先对`Graphql`有个大概的了解。

## 起步

类似于 `create-react-app` 和 `vue-cli`，首先全局安装 `gatsby.js`

```bash
npm i -g gatsby-cli
```

然后创建项目

```bash
gatsby new gatsby-blog https://github.com/gatsbyjs/gatsby-starter-blog
# 这里使用了gatsby官方提供的一个blog模板
```

最后进入 `gatsby-blog` 文件夹，运行

```bash
gatsby develop
```

好了，打开`localhost:8000`一个 [demo 个人博客](https://gatsbyjs.github.io/gatsby-starter-blog/) 就完成了。之后只要在 `pages` 文件夹下添加 `.md` 文件就能自动生成新博客文章了。是不是很方便？

不过以这个 starter kit 作为起手，对于理解如何使用 `Gatsby.js` 并不合适。所以本文希望从白板的 `hello world` 开始，搭建一个

* 可以自动将你写的 `.md` 文件转换成博文
* 主页显示列表
* 可以“上一篇”、“下一篇”切换

的极简博客。

## 创建

```
gatsby new my-blog
# 进入文件夹运行
gatsby develop
```

如`console`的提示，`localhost:8000`是网站，`localhost:8000/___graphql`则可以打开 graphql 的 GUI。一般称为`graphiQL`。

`graphiQL`小教学：  
打开`localhost:8000/___graphql`看看`gatsby`的后台已经包含的信息吧。点击页面右上角的 Docs, 弹出 api 文档。点击`query: RootQueryType`,我们看到目前已经可以调用的 api，如`allSitePage`,`allSitePlugin`等，主要是插件列表，和 page 文件列表。在左侧的输入界面可以调用所有的 api 并获得调用结果。让我们尝试输入吧：

```json
{
  allSitePage {
    edges {
      node {
        path
        layout
        jsonName
        component
      }
    }
    totalCount
  }
}
```

点击播放按钮（或快捷键 ctrl + enter），成功得到输出如下：

```json
{
  "data": {
    "allSitePage": {
      "edges": [
        {
          "node": {
            "path": "/dev-404-page/",
            "layout": "index",
            "jsonName": "dev-404-page.json",
            "component": "D:/code/test/gatsby-test/.cache/dev-404-page.js"
          }
        },
        {
          "node": {
            "path": "/404/",
            "layout": "index",
            "jsonName": "404.json",
            "component": "D:/code/test/gatsby-test/src/pages/404.js"
          }
        },
        {
          "node": {
            "path": "/",
            "layout": "index",
            "jsonName": "index.json",
            "component": "D:/code/test/gatsby-test/src/pages/index.js"
          }
        },
        {
          "node": {
            "path": "/page-2/",
            "layout": "index",
            "jsonName": "page-2.json",
            "component": "D:/code/test/gatsby-test/src/pages/page-2.js"
          }
        },
        {
          "node": {
            "path": "/404.html",
            "layout": "index",
            "jsonName": "404-html.json",
            "component": "D:/code/test/gatsby-test/src/pages/404.js"
          }
        }
      ],
      "totalCount": 5
    }
  }
}
```

这正是`pages`文件夹下的所有文件。`all`开头的 api 的主要信息在`edges/node`下，是`gatsby`的一个约定俗成，之后代码中会多次出现。

谈到文件夹结构，`gatsby`类似于 `next.js` 的文件风格：

```
src
├── components # 组件
├── layouts    # 公用UI，比如 header/footer
├── pages      # 所有的页面，文件名即访问路径
└── templates  # 模板，之后详细讲
```

只要会 React, 相信简单读一下代码已经可以上手开发了。不过博客的重点是实现 `.md` 到 `html` 的转换。  
这里需要安装两个插件

```bash
yarn add gatsby-transformer-remark gatsby-source-filesystem
```

然后修改配置文件 `gatsby-config.js`：

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    // 添加以下两个插件，一个用于读取md文件，一个用于转换其为html
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src`,
      },
    },
  ],
```

重新跑一遍`gatsby develop`。打开`graphiQL`，查看 Docs，我们看到多了两个 api，`allFile`和`allDirectory`，这是`gatsby-source-filesystem`插件的作用，现在我们可以读取所有本地的文件的信息了。但为什么没有操作`.md`相关的 api 呢？那是因为我们还没有创建任何*md*文件！

## 写第一篇 Markdown

在`pages`文件夹下建立`pages/2018-01-23-first-blog/index.md`  
个人觉得是一种不错的文件命名规范。(并非强制)

建立第一篇`.md`文如下：

```md
---
path: "/first-blog"
date: "2018-01-23"
title: "我的第一篇博文"
excerpt: "新年新气象"
---

# 第一篇博文！

新的一年，我的打算如下：

1. 吃饭
2. 睡觉
3. 打豆豆
```

打开`graphiQL`的 Docs，现在又多了一个 api `allMarkdownRemark`。

注意在开头用 `---` 隔开的部分会被 `gatsby-transformer-remark` 插件识别，并保存到 `frontmatter` 部分。尝试调用：

```
{
  allMarkdownRemark {
    edges {
      node {
        fileAbsolutePath
        html
        frontmatter {
          title
          path
          date
          excerpt
        }
      }
    }
  }
}
```

注意到`html`字段的返回值，我们的`.md`文件的主体已经被转化为`html`了！后台万事就绪。

下篇教程，我们将把这些信息转化为博客的 UI。`gatsby`为此提供了`gaysby-node`api 以及 templates（模板）。
