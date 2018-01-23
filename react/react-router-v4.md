# React Router v4 教程

## 1. React Router v4 不同在哪里，为什么这样设计？

react router v4 和大多数 router 解决方法都不同。用行话说，react-router 是“动态路由”，相较其他的都是“静态”。用白话来说，大多数的路由解决方式都在 UI 代码之外，和 UI 的渲染时分离的，并且在一开始就要定好。基本会有个`router.js`的文件写明一切的路由路径以及渲染的组件。`vue-router`是这样,`react-router`版本 4 之前也是这样。

“动态路由”其实是说，路由已经是渲染的一部分了，所有 react-router 提供的，只是带了路由专门的 props 的一组 react 组件。像写普通组件一样写路由。如果你愿意随时随地在任意组件内部都可以写“路由”。

为什么？  
自然，自由。因为只是组件，所以没有刻意的语法，没有“魔法”，一切自然，像组件一样使用即可。同时，没有任何顾虑，大致上组件能做的事，你都可以做。

## 2. 如何使用

### 基础用法

见[官网基础例子](https://reacttraining.com/react-router/web/example/basic)，这已经是一个涵盖主体使用方法的例子了。由 Router、Route 和 Link 组件组成。

```js
import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

const BasicExample = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/topics" component={Topics} />
    </div>
  </BrowserRouter>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route exact path={match.url} render={() => <h3>Please select a topic.</h3>} />
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample
```

最简单最核心的部分：

```js
const BasicExample = () => (
  <BrowserRouter>
    <div>
      <Link to="/">Home</Link>
      <Link to="/topics">Topics</Link>

      <Route exact path="/" component={Home} />
      <Route path="/about" render={() => <h2>About</h2>} />
    </div>
  </BrowserRouter>
)

const Home = () => <h2>Home</h2>
```

Router 和 Link 的用法一目了然。重点是：

### Route 用法：

Route 的渲染方式三种：

```html
<Route component> //渲染一个组件
<Route render>  //直接在同行写出渲染的组件
<Route children>  //不论url是否匹配都渲染
```

Route 的 Props（重点）：

1. `match`
   最常用到的 props，包含了大多数信息。

```js
//比如url是 '/users/123'
{
  params, // id:123
    isExact, // true
    path, //'/users/:id'
    url // '/users/123'
}
```

2. `location`
   更专门情况下使用。比如当有搜索字段，hash 或者要判断跳转到此页的是哪个页面而写了状态时，在 location 里读。

```js
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}

//关于state的说明，通常不需要state
<Link to="/somewhere"/>

// state是人为添加的状态信息，这里用于记录是从Dashboard跳转过来的
const location = {
  pathname: '/somewhere'
  state: { fromDashboard: true }
}

<Link to={location} />
```

3. `history`
   在渲染时我几乎没用过，更多是为了人为操作路由提供方法。比如`history.go(-1)` 回退一页。

```js
length - (number) The number of entries in the history stack
action - (string) The current action (PUSH, REPLACE, or POP)
location - (object) The current location. May have the following properties:
  pathname - (string) The path of the URL
  search - (string) The URL query string
  hash - (string) The URL hash fragment
  state - (string) location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.

push(path, [state]) - (function) Pushes a new entry onto the history stack
replace(path, [state]) - (function) Replaces the current entry on the history stack
go(n) - (function) Moves the pointer in the history stack by n entries
goBack() - (function) Equivalent to go(-1)
goForward() - (function) Equivalent to go(1)
block(prompt) - (function) Prevents navigation (see the history docs)
```

### 多层组件如何方便读取 match/location?

用 withRouter。注意和 redux 一起用时，顺序一点要对：

```js
// This gets around shouldComponentUpdate
withRouter(connect(...)(MyComponent))
```

### Link、NavLink

### Switch、Redirect

### matchPath

This lets you use the same matching code that `<Route>` uses except outside of the normal render cycle, like gathering up data dependencies before rendering on the server.

```js
import { matchPath } from 'react-router'

const match = matchPath('/users/123', {
  path: '/users/:id',
  exact: true,
  strict: false,
})
```

#### pathname

The first argument is the pathname you want to match. If you're using
this on the server with Node.js, it would be `req.path`.

#### props

The second argument are the props to match against, they are identical
to the matching props `Route` accepts:

```js
{
  path, // like /users/:id
    strict, // optional, defaults to false
    exact // optional, defaults to false
}
```

## 复杂路径的匹配

## 在组件外手动路由

## 现实项目里使用的最佳实践：
