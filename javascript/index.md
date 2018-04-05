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
