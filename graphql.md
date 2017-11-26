# GraphQl

follow howtographql.com tutorial

https://dev-blog.apollodata.com/the-graphql-stack-how-everything-fits-together-35f8bf34f841

### Why grahpql

1. sql 是很好的数据请求描述方式。一个定义良好的 schema，完整的 doc 了 api
2. decouple( 解耦 , 分离 ) 前后端。rest 里，api 是 endpoint based，返回的数据结构由服务器
   端决定，而在 graphql 里由前端决定，将数据结构和 ui 摆在一起是现代前端开发最自然的方式。
3. 一次请求可以取回 UI 组件所有需要的数据，让 batching 和 caching 更方便。

### Schema

query / mutation / subscription

1. 类型

* 最常用的是`scalar` ( 常量 ) 和`type` ( 对象 ) 类型，包括\
  `Int, Float, String, Boolean, ID`
* 其他类型\
  `interface`\
  `union`\
  `enum`\
  `input` 参数

2. 类型修饰\
   `String` 可 null\
   `String!` 不可 null\
   `[String]` 数组（可空，元素可 null）\
   `[String!]!` 不可空，元素不可 null

3. Query & Mutation, 参数写法

```js
type Query {
    users(limit: Int = 10, sort: String = "asc"): [User]
}
```

```js
input ListUsersInput {
    limit: Int
    since_id: ID
}

type Mutation {
    users(params: ListUsersInput): [User]!
}
```

query 和 mutation 类似函数声明，具体函数要在`resolver`里定义

### resolvers

`fieldName(obj, args, context, info) { result }`

`obj`: 父级 resolver 的返回值（顶层就是 rootValue），使得 nesting 成为可能\
`args`: 参数\
`context`: auth, dataloader, 数据库的值等，所有 resolvers 都接受的值\
`info`: 不常用

### 开始搭建

`npm i express body-parser apollo-server-express graphql-tools graphql`

* `express body-parser` express 服务器
* `apollo-server-express` 使用 schema 处理服务器 req 和 res
* `graphql-tools`
  * 简化 graphql schema 的书写
  * 提供`makeExecutableSchema`, 接受 typeDefs ( 一个 string), resolvers(objects), 生成真正
    可用的 graphql schema。
* `graphql`

### Code in Scale

* **schema**
* **resolvers**

* **models** transformation and aggregation logic
* **connectors** talk to RPC, REST or directly to database
