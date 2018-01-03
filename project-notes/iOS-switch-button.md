如何用 css 写一个 iOS 的 switch button

图例

本例使用 React，Vue 完全同理。

### 建立项目

```bash
create-react-app ios-switch-button
cd ios-switch-button
npm start
```

### 文件结构

新建 `components` 文件夹，并创建我们的 `Switch.js` 组件

```
/components
  Switch.js
  Switch.css
App.js
App.css
index.js
index.css
```

`Switch.js`

```jsx
import React from 'react'
import './Switch.css'

const Switch = ({ on = false, onClick = () => {} }) => (
  <button className={`switch ${on ? 'switch-on' : 'switch-off'}`} onClick={onClick} />
)

export default Switch
```

在 `App.js` 里引入 `Switch`

```jsx
import React, { Component } from 'react'
import Switch from './components/Switch'
import './App.css'

class App extends Component {
  state = { on: false }
  toggle = () => this.setState(({ on }) => ({ on: !on }))
  render() {
    const { on } = this.state
    return (
      <div className="App">
        <Switch on={on} onClick={this.toggle} />
        <p>{on ? '开' : '关'}</p>
      </div>
    )
  }
}

export default App
```

`App.css` 修改为

```css
.App {
  font-size: 2em;
  text-align: center;
  padding-top: 5em;
}
```

`Switch.css` 给基础宽高

```css
.switch {
  display: inline-block;
  height: 4em;
  width: 8em;
}
```

一个基本的开关组件就写好了。

总结：

* 没有使用惯用的<input type='checkbox' /> + `label` 的组合，因为有 React/Vue 方便状态控制的 ui 框架，不再需要如此 “hack”。html 结构更清晰。
* 使用 `button` 标签而不是 `div`，唯一原因是 `button` 有`:focus` 的 css 类。事实本例没有用到`:focus`，使用 div 更好（没有那么多默认样式需要操心）。
* 使用了[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)的做法（但这些都不是本文的重点）。
* Css 类名 `switch` 为整个组件，`switch-on`/`switch-off` 为 button 的开关状态。

### 进入主题

之后所有工作都在 `Switch.css` 里进行。

1. 使用 `::after` 元素创建按钮, 并重置一些基本属性：

```css
.switch {
  display: inline-block;
  outline: 0;
  height: 8em;
  width: 16em;
  user-select: none;
  cursor: pointer;
  padding: 2px;
}

.switch::after {
  content: '';
  display: block;
  height: 100%;
  width: 50%;
  background: red;
}
```

`::after`的美在于，不用为了实现酷炫的 UI 添加多余的 html 标签。

2. 使用 `position` 让按钮动起来

```css
.switch {
  ...
  position: relative;
}

.switch::after {
  ...
  position: relative;
  left: 0;
}

.switch.switch-on::after {
  left: 50%;
}
```

一个简单的按钮已经呼之欲出。

3. 调整形状和颜色

```css
.switch {
  ...
  border-radius: 8em;
  background: #fbfbfb;
  border: 4px solid #e8eae9;
}

.switch::after {
  ...
  border-radius: 8em;
  background: #fbfbfb;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1), 0 16px 0 rgba(0, 0, 0, 0.08);
}

.switch.switch-on {
  background: #86d993;
}
```

瞬间高大上。

4. transition 动画

```css
.switch {
  ...
  transition: all 0.4s ease;
}

.switch::after {
  ...
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

颜色变化（0.4s）比按键滚动（0.3s）略长。非常舒服的回滚效果。至此，一个富有立体感的 Switch 已经完成。

5. 精益求精，增加“按着不放”时的效果。  
   css 的`:active` 类专门用于完成“按着不放”时的效果。我们会添加一个简单的背景变色，以及按钮的“液态效果”。

```css
/* 背景变灰 */
.switch.switch-off:active {
  background: rgba(0, 0, 0, 0.08);
}
/* 液态效果，是不是非常简单 */
.switch:active::after {
  padding-right: 3em;
}
```

6. 液态效果完善

注意到

* 液态效果在“关”时往右超出边界了
* 液态效果的动画曲线应该如同被施加压力一样平滑扩散

```css
.switch.switch-on:active::after {
  margin-left: -3em;
}

.switch::after {
  ...
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),padding 0.3s ease,margin 0.3s ease;
}
```

至此，一个 iOS 切换按钮就完成了。附[Vue 的 demo](https://codesandbox.io/s/ox5norrx4y)。
