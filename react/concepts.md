1/4/18

* 这么久之后，在思考 life cycle 的问题时，一组 life cycle 是根据 re-render 是否发生来决定是否运行的。那 rerender 发生的条件到底是什么呢？（有时候即使 props 和 state 没有变，组件也会 rerender）

acemarke 的解答：
components re-render for three reasons:

1. The component called this.setState(), which queues a state update and a re-render
2. The component called this.forceUpdate(), which queues a re-render
3. The parent component re-rendered, which causes all of its children to start to re-render even if the props being passed down from the parent to the child are 100% identical to before

React's default behavior is "re-render all the way down the tree"

* 那 rerender 发生了，这组 life cycle 中会不会有几个运行有几个不呢？写程序时似乎会有某个 life cycle 执行了好几遍，但其他的似乎不是的情况。答案是：

if `shouldComponentUpdate` returns true, `componentDidUpdate` always invoke after every `componentWillReceiveProps`, in fact, the complete rendering lifecycle will fire if sCU returns true.

* 那么对于 react-redux 和 mobx 之类的状态控制 lib，是使用了哪种方式完成 rerender 的呢？

MobX calls `forceUpdate()`. The React-Redux `connect()` function calls `this.setState(dummyObject)`, so it almost might as well be `forceUpdeate()` anyway
