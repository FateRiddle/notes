https://twitter.com/malyw/status/970659453925318656

private class fields (stage 3):

```js
class Counter {
  #x = 0
  getCount() {
    return this.#x
  }
}
```

`Counter.x` 或 `Counter.#x` 都读不到。`getCount()` 返回 0

# 作用域 scope

a well-defined set of rules for storing variables in some location, and for finding those variables at a later time.
就是如何储存及找回变量的一套规则

更具体的定义
collects and maintains a look-up list of all the declared identifiers (variables), and enforces a strict set of rules as to how these are accessible to currently executing code.

# obj,array 转换

```js
// array => obj
const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {})
// obj => array
// const obj = {a:1,b:2,c:3}
Object.entries(obj) // [["a":1],["b",2],["c",3]]
Object.keys(obj) // ["a","b","c"]
Object.values(obj) // [1,2,3]
```

https://twitter.com/mattdesl/status/1013896537166888960 画一坨乱线
