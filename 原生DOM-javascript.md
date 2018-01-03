Node.childNodes 返回 childNodes 数组（greensock 等动画插件用到）

```js
var nodeList = elementNodeReference.childNodes
```

Usage:

```js
//遍历子元素
if (parg.hasChildNodes()) {
  var children = parg.childNodes

  for (var i = 0; i < children.length; i++) {
    // do something with each child as children[i]
    // NOTE: List is live, adding or removing children will change the list
  }
}

//移除所有子元素
while (box.firstChild) {
  //The list is LIVE so it will re-index each call
  box.removeChild(box.firstChild)
}
```
