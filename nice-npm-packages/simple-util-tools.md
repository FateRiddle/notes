### value-equal

js 里常需要比较两个数组，对象是否值相同。 "===" 比较的是两者的指针（内存地址），所以总不同。

```shell
yarn add value-equal
```

```js
import valueEqual from 'value-equal'
valueEqual([1, 2, 3], [1, 2, 3])
```
