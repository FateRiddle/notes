vue文档有详细react vs vue对比

这里谈一些细节的不同：

1. react可以轻松在同一个文件写多个组件，互相复用。.vue文件只能是一个组件
2. vue的变量在模板使用必须存入data/ computed
3. vue的watch很好用。react更多需要在life cycle里写。
4. vue的动画过渡已经整合，而且简洁好用。react要使用transition group plus
5. react所有的数据都是变动和绑定的，不需要为此多余思考。props => 依赖props算出的变量，不用特地放在computed
6. react到处可以`console.log`
7. redux的分解（数组分解）用vuex并不能做到
8. react的报错比vue强大准确太多
9. vue模板初始就支持热加载和绝对路径。CRA需要自己添加相应功能代码
10. vue的模块确实比react更易读
11. vue更接近html，DOM的操作比较放心，react要使用refs
12. vue里onClick函数带参数的情况是最优化的。
```js
@click='sayHello'  @click='sayHello()'  @click="say('hello')"
```
三种写法都支持,对于新手比较舒适  
react里只支持两种
```js
onClick={sayHello}  onClick={()=>say('hello')}
```
而且第二种写法还不是最优化的  

13. vue的`v-model`双向绑定相当的方便，也不会产生react当年放弃双向绑定所称会发生的数据流向不明，代码难懂等问题。
14. vue文档强调 props down, events up. 但事实上，vue是完全可以把event函数作为props也往下传的，和react一样的做法在vue是行得通的。而且如果使用vuex，这是我觉得唯一可行的做法。
15. vue的props类别系统比react要书写简单。而且react将prop-types分离的做法虽然消瘦里最终build的输出js，但个人不喜欢这么细碎化。
16. 个人更喜欢react router v4, 纯天然的react，自然易学。不过说实话容易让route变得非常松散，在多个文件中。但是自由啊。
17. css，vue的解决办法比任何react方式都自然简洁。不过我大爱的tachyons解决了react的样式。个人不喜欢styled component，有种思维倒置的感觉。
18. prettier对.vue 文件的html部分的支持有硬伤。作为prettier的脑残粉，有点难过。

