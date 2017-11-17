```js
ReactDOM.render(<App />, document.getElementById('root'))
```
改为：

```js
const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('./App', render)  //注意到这里一定用相对路径，最顶上App的import也一定要用相对路径
}

render()
```

参见Dan的解答：https://github.com/facebookincubator/create-react-app/issues/2317


其他人提出了three.js的解决方法 https://medium.com/superhighfives/hot-reloading-create-react-app-73297a00dcad
不过这个答案比较旧。