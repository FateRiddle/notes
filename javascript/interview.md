## 自己的疑问

1.  prettier 和 eslint 如何共用，我的规则
2.  css 基本布局方式
3.  css 适配需要做些啥

## CSS

1.  怪异盒模型
    css 属性：Box Model 分为两种：W3C 标准和 IE 标准盒子模型。大多数浏览器采用 W3C 标准模型，而 IE 中采用 Microsoft 自己的标准。怪异模式是“部分浏览器在支持 W3C 标准的同时还保留了原来的解析模式”，怪异模式主要表现在 IE 内核的浏览器。**当不定义 Doctype 时，会触发怪异模式**。

https://www.jianshu.com/p/9a3090f1924a
在标准模式下，一个块的总宽度=width+margin(左右)+padding(左右)+border(左右)
在怪异模式下，一个块的总宽度=width+margin（左右）（既 width 已经包含了 padding 和 border 值）

用法：

```css
box-sizing: content-box || border-box || inherit;
```

2.  居中的方法

- flex
- transform
- display: table/ table-cell vertical-align

3.  animation & transition

4)  meta/media

## js

1.  函数 curry 化

常见的是 middleware。就是函数接受第一参数，返回一个函数，接受第二参数。。。直到返回结果

```js
const addLoggingToDispatch = store => {
  return next => {
    if (!console.group) {
      return next
    }

    return action => {
      console.group(action.type)
      console.log('%c prev state', 'color: gray', store.getState())
      console.log('%c action', 'color: blue', action)

      const returnValue = next(action)

      console.log('%c next state', 'color: green', store.getState())
      console.groupEnd(action.type)
      return returnValue
    }
  }
}
```

Why not

```js
const addLoggingToDispatch = (store, next) => {
  return action => {
    if (!console.group) {
      return next
    } else {
      console.group(action.type)
      console.log('%c prev state', 'color: gray', store.getState())
      console.log('%c action', 'color: blue', action)

      const returnValue = next(action)

      console.log('%c next state', 'color: green', store.getState())
      console.groupEnd(action.type)
      return returnValue
    }
  }
}
```

https://github.com/reactjs/redux/issues/1744 Dan 的回答。turns out 这里的 curry 化只是他的个人偏好而已(汗)。其实想改，最后大家意见不一而没改。

## promise

## Closure

Closures are inner functions that have access to the outer function’s variables and parameters.
