## How to write good tutorials

starting from why! 反向。

解应用题时，解答一定是从条件出发一步步推导的，但思路一般是从问题出发尝试的。好的教程，要从问题出发，因为这才是思路的自然方向：比如介绍 graphql 的 dataloader。

先写给出使用方法，更易懂并了解全局。我们希望 dataloader 是这样的（userLoader ），

```js
user: async ({userId}, data, {dataloaders: {userLoader}}) => {
    return await userLoader.load(userId);
  },
```

然后再具体到如何写 userLoader。

```js
module.exports = ({ Users }) => ({
  // 3
  userLoader: new DataLoader(keys => batchUsers(Users, keys), {
    cacheKeyFn: key => key.toString(),
  }),
})
```

这比正常顺序的教程更易懂。

2. put reader on a task. 明确告诉读者最终成果，甚至挑战他们先尝试完成。这更能激发读者的情绪，并促使他们思考 / 并更有重点地阅读。

3. demo 和 gif。工具 recordit.io, codesandbox, codepen。或者自己 deploy，用 netlify
