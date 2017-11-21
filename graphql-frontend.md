`npm install -g graphcool`  
`graphcool init server` server是你希望的名字  
`graphcool deploy`  
`graphcool playground`  
`graphcool info`  查看`apollo-link-http`需要使用的url  

for frontend, dependencies:

`apollo-client-preset`包括：  
* `apollo-client`   建立类似于redux的store，提供给provider HOC，包裹`<App />`
* `apollo-cache-inmemory`
* `apollo-link`
* `apollo-link-http`  用于建立apollo的api请求api  

`react-apollo` 类似于`react-redux`，提供graphql（类似于connect）  
`graphql-tag` 提供`gql`, 用于生成请求的query，mutation  
`graphql` 
