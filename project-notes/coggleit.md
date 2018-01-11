看了 coggle.it 的实现

1. 如何混搭 html 和 svg？

html 使用 position:absolute,transform:translate()确认中心点, top 和 left 来定位。

svg 则使用 position: relative, viewBox 确认画布大小和中心点（注意确保画布不被压缩，因为单位长度要和 html 里的一致） 里面每个元素 position:absolute, svg 元素的定位简单。

为项目管理的流程设计写了个例子。
