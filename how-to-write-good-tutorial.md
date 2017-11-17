## How to write good tutorials

starting from why! 反向。

解应用题时，思路是从问题出发，但解答却从条件出发。
好的教程，要从问题出发，因为这才是思路的自然方向：
比如介绍graphql的dataloader。

先写给出使用方法，更易懂并了解全局。我们希望dataloader是这样的（userLoader），
```js
user: async ({userId}, data, {dataloaders: {userLoader}}) => {
    return await userLoader.load(userId);
  },
```
然后在具体到如何写userLoader。
```js
module.exports = ({Users}) =>({
  // 3
  userLoader: new DataLoader(
    keys => batchUsers(Users, keys),
    {cacheKeyFn: key => key.toString()},
  ),
});
```
这比正常顺序的教程更易懂。