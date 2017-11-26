`npm install -g graphcool`\
`graphcool init server` server 是你希望的名字\
`graphcool deploy`\
`graphcool playground`\
`graphcool info` 查看`apollo-link-http`需要使用的 url

for frontend, dependencies:

`apollo-client-preset`包括：

* `apollo-client` 建立类似于 redux 的 store，提供给 provider HOC，包裹`<App />`
* `apollo-cache-inmemory`
* `apollo-link`
* `apollo-link-http` 用于建立 apollo 的 api 请求 api

`react-apollo` 类似于`react-redux`，提供 graphql（类似于 connect）\
`graphql-tag` 提供`gql`, 用于生成请求的 query，mutation\
`graphql`
