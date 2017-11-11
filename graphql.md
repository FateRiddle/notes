# GraphQl

follow howtographql.com  tutorial


### Schema

query / mutation / subscription

1. 类型  
* 最常用的是`scalar` (常量) 和`type` (对象) 类型，包括  
`Int, Float, String, Boolean, ID`  
* 其他类型  
`interface`  
`union`  
`enum`  
`input`   参数

2. 类型修饰  
`String` 可null  
`String!` 不可null  
`[String]` 数组（可空，元素可null）  
`[String!]!` 不可空，元素不可null

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
query和mutation类似函数声明，具体函数要在`resolver`里定义

4. 开始搭建。  
`npm i express body-parser apollo-server-express graphql-tools graphql`

* `express body-parser` express服务器   
* `apollo-server-express`   使用schema处理服务器req和res
* `graphql-tools`   
    * 简化graphql schema的书写
    * 提供`makeExecutableSchema`, 接受typeDefs (一个string), resolvers(objects), 生成真正可用的graphql schema。
* `graphql`


