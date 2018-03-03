当滚动到时动画。一些滚动相关的属性

https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight

The following equivalence returns true if an element is at the end of its scroll, false if it isn't.

```
element.scrollHeight - element.scrollTop === element.clientHeight
```

When the container does not scroll, but has overflowing children, these checks determine if the container can scroll:

```
window.getComputedStyle(element).overflowY !== 'visible'
window.getComputedStyle(element).overflowY !== 'hidden'
```

## scrollY

https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY

returns the number of pixels that the document is currently scrolled vertically.

## 优化 scroll

Scroll optimization with window.requestAnimationFrame

```
// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scroll_pos) {
  // do something with the scroll position
}

window.addEventListener('scroll', function(e) {

  last_known_scroll_position = window.scrollY;

  if (!ticking) {

    window.requestAnimationFrame(function() {
      doSomething(last_known_scroll_position);
      ticking = false;
    });

    ticking = true;
  }
});
```

## scrollTo()

```
window.scrollTo( 0, 1000 );
```

## 检查一个元素是否可见

https://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling

## 将元素滚动至可见区

https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView

The `Element.scrollIntoView()` method scrolls the element on which it's called into the visible area of the browser window.

## 计算元素所在绝对位置

https://stackoverflow.com/questions/8070639/find-elements-position-in-browser-scroll

```
element.getBoundingClientRect();
```

## offsetTop

https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetTop

The `HTMLElement.offsetTop` read-only property returns the distance of the current element relative to the top of the offsetParent node.

## 现成的 scroll 到 anime

https://github.com/michalsnik/aos

## 滚动事件优化（中文）

https://www.cnblogs.com/coco1s/p/5499469.html

## passive event listener (优化滚动事件，防止对其他事件的 block)

https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
