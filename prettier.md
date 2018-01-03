大爱 prettier

之后要写 prettier 如何兼容 eslint

今天学到如何对一个代码块 prettier 忽略：
https://prettier.io/docs/en/ignore.html#javascript

JS

```js
// prettier-ignore
matrix(
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
)
```

CSS

```css
/* prettier-ignore */
.my    ugly rule
{

}
```

JSX

```jsx
<div>
  {/* prettier-ignore */}
  <span     ugly  format=''   />
</div>
```

MD

```md
<!-- prettier-ignore -->
Do   not    format   this
```
