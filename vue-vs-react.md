vue 文档有详细 react vs vue 对比

这里谈一些细节的不同：

1. react 可以轻松在同一个文件写多个组件，互相复用。.vue 文件只能是一个组件
2. vue 的变量在模板使用必须存入 data/ computed
3. vue 的 watch 很好用。react 更多需要在 life cycle 里写。
4. vue 的动画过渡已经整合，而且简洁好用。react 要使用 transition group plus
5. react 所有的数据都是变动和绑定的，不需要为此多余思考。props => 依赖 props 算出的变量，
   不用特地放在 computed
6. react 到处可以`console.log`
7. redux 的分解（数组分解）用 vuex 并不能做到
8. react 的报错比 vue 强大准确太多
9. vue 模板初始就支持热加载和绝对路径。CRA 需要自己添加相应功能代码
10. vue 的模块确实比 react 更易读
11. vue 更接近 html，DOM 的操作比较放心，react 要使用 refs
12. vue 里 onClick 函数带参数的情况是最优化的。

```js
@click='sayHello'  @click='sayHello()'  @click="say('hello')"
```

三种写法都支持 , 对于新手比较舒适\
react 里只支持两种

```js
onClick={sayHello}  onClick={()=>say('hello')}
```

而且第二种写法还不是最优化的

13. vue 的`v-model`双向绑定相当的方便，也不会产生 react 当年放弃双向绑定所称会发生的数据流
    向不明，代码难懂等问题。
14. vue 文档强调 props down, events up. 但事实上，vue 是完全可以把 event 函数作为 props 也
    往下传的，和 react 一样的做法在 vue 是行得通的。而且如果使用 vuex，这是我觉得唯一可行
    的做法。
15. vue 的 props 类别系统比 react 要书写简单。而且 react 将 prop-types 分离的做法虽然消瘦
    里最终 build 的输出 js，但个人不喜欢这么细碎化。
16. 个人更喜欢 react router v4, 纯天然的 react，自然易学。不过说实话容易让 route 变得非常
    松散，在多个文件中。但是自由啊。
17. css ， vue 的解决办法比任何 react 方式都自然简洁。不过我大爱的 tachyons 解决了 react
    的样式。个人不喜欢 styled component，有种思维倒置的感觉。
18. prettier 对 .vue 文件的 html 部分的支持有硬伤。作为 prettier 的脑残粉，有点难过。
