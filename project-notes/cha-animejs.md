# 学习写网站。尤其是 anime.js 实践动画部分。

https://chackathon.com/ 是 greensock 官方推荐的 demo 网站之一。尝试使用 anime.js 写。

## p 和 div 的区别

https://stackoverflow.com/questions/2226562/what-is-the-difference-between-p-and-div
They have semantic difference - a <div> element is designed to describe a container of data whereas a <p> element is designed to describe a paragraph of content.

The semantics make all the difference. HTML is a markup language which means that it is designed to "mark up" content in a way that is meaningful to the consumer of the markup. Most developers believe that the semantics of the document are the default styles and rendering that browsers apply to these elements but that is not the case.

The elements that you choose to mark up your content should describe the content. **Don't mark up your document based on how it should look - mark it up based on what it is**.

If you need a generic container purely for layout purposes then use a <div>. If you need an element to describe a paragraph of content then use a <p>.

Note: It is important to understand that both <div> and <p> are block-level elements which means that most browsers will treat them in a similar fashion.

使用上类似。语义上不同。 a container of data _vs_ a paragraph of content

## accessibility

Aria. roles

## js 使用 media query (js 动画，不同屏幕不同排版造成不同动画)

```js
if (window.matchMedia('(min-width: 400px)').matches) {
  /* the viewport is at least 400 pixels wide */
} else {
  /* the viewport is less than 400 pixels wide */
}
```

https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Testing_media_queries

```js
var mediaQueryList = window.matchMedia('(orientation: portrait)')
if (mediaQueryList.matches) {
  /* The viewport is currently in portrait orientation */
} else {
  /* The viewport is not currently in portrait orientation, therefore landscape */
}
// 可以使用的api
mql.matches
mql.media
mql.onchange
mql.addListener()
mql.removeListener()
```

```js
var mediaQueryList = window.matchMedia("(orientation: portrait)"); // Create the query list.
function handleOrientationChange(mql) { ... } // Define a callback function for the event listener.
mediaQueryList.addListener(handleOrientationChange); // Add the callback function as a listener to the query list.

handleOrientationChange(mediaQueryList); // Run the orientation change handler once.
```

当 mediaQuery 变化时触发事件。或者检测 mediaQuery 是否满足（比如判定横屏竖屏）
https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList
https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryListListener

```js
var para = document.querySelector('p')

var mql = window.matchMedia('(max-width: 600px)')

function screenTest(e) {
  if (e.matches) {
    /* the viewport is 600 pixels wide or less */
    para.textContent = 'This is a narrow screen — less than 600px wide.'
    document.body.style.backgroundColor = 'red'
  } else {
    /* the viewport is more than than 600 pixels wide */
    para.textContent = 'This is a wide screen — more than 600px wide.'
    document.body.style.backgroundColor = 'blue'
  }
}

mql.addListener(screenTest)
```

### SVG 的使用

将所有用到的 svg 标签在 body 开头, display:none ,之后用 `<use>` 标签调用注意在 react 中
<use xlinkHref="#logo_symbol" /> 取代一般的 `xlink:href` 属性

svg 的颜色：

```css
svg {
  fill: currentColor;
}
```

https://css-tricks.com/cascading-svg-fill-color/

# CSS Stacking context

## 没有 z-index 时：

* root 的 border 和 background -> non-positioned 元素按顺序堆叠 -> positioned 元素按顺序堆叠 （后写的元素堆在最顶上）
* `non-positioned`: position:static (default)
* `positioned`: position: absolute/fixed/relative/sticked

## flexbox 的 order 属性会改变元素顺序。

* `z-index` 改变元素 positioned 和 flexbox 内的元素的层级(layer), 默认层级是 0
* `z-index` 相同的元素，按照顺序堆叠
* `display: flex` 元素的子元素即使没有 position，也接受 `z-index`。但如果没有 `z-index` 属性，则只被视作 non-positioned 元素。所以

```css
.parent {
  display: flex;
}

.child {
  /* 此处 z-index: 0 和不写z-index结果不同 */
  z-index: 0;
}
```
