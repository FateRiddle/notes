```js
ReactDOM.render(<App />, document.getElementById('root'))
```

改为：

```js
const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

if (module.hot) {
  module.hot.accept('./App', render) //注意到这里一定用相对路径，最顶上App的import也一定要用相对路径
}

render()
```

参见 Dan 的解答：https://github.com/facebookincubator/create-react-app/issues/2317

其他人提出了 three.js 的解决方法
https://medium.com/superhighfives/hot-reloading-create-react-app-73297a00dcad 不过这个答案比较旧。

Edit：
新参考 google 的 boardgame.io 的例子，发现写法可以更简洁：

```js
ReactDOM.render(<App />, document.getElementById('root'))
//简单的说,就是在源代码基础上加上这句即可。
if (module.hot) {
  module.hot.accept()
}
```
