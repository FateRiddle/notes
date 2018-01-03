给作者的建议。boardgame.io

1.5
flow 还没有能用。发现 this.props 里

`_initial`
restore 可以直接控制 G,ctx。。全部。而`_initial` 包含所有初始游戏信息。问题是`_initial` 里的`_initial` 是个{}空对象，不太合理以至于我要退回重开游戏，需要 `restore({..._initial,_initial})`
问题是一开始就设置了`_initial`会死循环下去吧。。

setup:
用 setup 不自然。还是原来的 G 好。G 可以直接是对象也可以接受一个 function

UI:
grid 选择使用 svg，可能是受到我的 demo 的影响。其实国际象棋棋盘用 html 更好吧。这里可以参考 Dan 的 react-dnd 的例子。使用者会默认为棋子是 html，会不会有什么使用上的不方便。比如 style，有人会传入 background 吧。

我要做一个 timer。

要做多人。要做移动动画。
