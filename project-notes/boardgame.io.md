所有从 boardgame.io 里学到的边角知识点：

## jsDoc

使用 jsDoc，照着模板写注释，最后生成 api document
http://usejsdoc.org/about-getting-started.html

## issue/random in redux

今天看到 boardgame.io 的作者提的新 issue：randomness in game:

> Dice, shuffling etc. all require randomness, but having impure reducers (using `Math.random()`, for example) breaks the ability to view earlier game states (and is an anti-pattern in Redux).
>
> Suggestions:
>
> Have a field in `ctx` called `seed` that people can tap into in order to seed their RNG's.
> Provide library calls (`random()` and `shuffle()` perhaps?), that use `ctx.seed`.
> `ctx.seed` is stripped away from the client using `Secret State`.

reducer 必须是 pure function, 所以要在 redux 里引入随机会使其 impure

pure 的定义：
A pure function is one that follows these rules:

* No side effects – it can’t change anything outside the function’s scope (this also means it can’t modify its arguments)
* Same output for same input – calling it with a given set of inputs must produce the same return value, every time (this means no saved state between calls)

往常我们讲的 impure 主要是不能修改参数：

```js
function addItem(items, item) {
  items.push(item)
}
```

但还有一种 impure 是同样的输入得到不一样的输出：

```js
function makePerson(firstName, lastName) {
  // Make an age between 1 and 99
  const age = Math.floor(Math.random() * 99) + 1

  return {
    name: firstName + ' ' + lastName,
    age: age,
  }
}
```

两篇文章谈到如何解决 randomness:  
https://daveceddia.com/random-numbers-in-redux/  
https://blog.ohlman.io/random-in-redux-b6b9932ad061

1. 思想上不太同意第一篇，唯一的好处是简单。此办法属于形式上的转嫁。简言之，就是不能在 reducer 里 impure 就在 actionCreator 或者传入的参数里使用`Math.random()`的做法。pure function 本来是为了引入一种 best practice，此法虽没有犯规，但违背了 redux 的用意。  
   话虽如此，对于随机 id 这类我们不在意也不需要测试的随机，还是可以一用的，因为简单。比如 Dan 的 todolist 教程，生成新 todo，需要一个随机 id，当时我就奇怪这一步为何不在 reducer 里完成。Dan 在 actionCreator 里引入了随机 id。

2. 真正解决 random，可以用伪随机，给 reducer 提供一个 seed，随机数都是由 seed 生成的，只是看似随机其实下一个是什么数是完全决定的。

一个用 seed 生成随机数的例子

```js
const game = (state, action) => {
  switch (action.type) {
    case 'InitializeGameBoard':
      state = {}
      state.rand = seededRandom(action.seed)
      state.initialPosition = {
        x: state.rand(-15, 15),
        y: state.rand(-15, 15),
      }
      return state
    // ...
    case 'CreateRandomCreature':
      var creature = {
        position: {
          x: state.rand(-15, 15),
          y: state.rand(-15, 15),
        },
      }
      return _.extend({}, state, { creatures: [...state.creatures, creature] })
  }
}
// seed
const seededRandom = seed => {
  return (max, min) => {
    max = max || 1
    min = min || 0

    Math.seed = (Math.seed * 9301 + 49297) % 233280
    var rnd = Math.seed / 233280

    return min + rnd * (max - min)
  }
}

export default seededRandom
```

个人完全认同使用 seed 的解决办法。
