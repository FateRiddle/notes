# 如何发布一个 React 组件到 npm （最佳实践）

### 准备工作

1. 先用 create-react-app 环境开发好你的组件
2. 注册 npm 账号（https://npmjs.org）

### 文件配置（最重要一步）

思路：此项目的开发目录是`/src`, 输出目录是`/build`。\
webpack 将`/src`打包成`/build/index.js`, 然后将`package.json`的`main`设为`/build/index.js`，
以作为 default import。下面开工吧：

0. 创建项目文件夹`fancy-component`

1. 惯例首先 `npm init`，最终 `package.json` 如下

```json
{
  "name": "fancy-component",
  "version": "1.0.0",
  "description": "a fancy component",
  "main": "build/index.js", // 主export文件
  "files": ["css"], //如果除了主export外还要别的导出，在此声明
  "keywords": ["react"], //搜索关键词
  "scripts": {
    "build": "webpack -p"
  },
  "author": "xxx", //自己的用户名，邮箱，网站
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-2": "^6.24.1",
    "react": "^16.1.1",
    "webpack": "^3.8.1"
  },
  "peerDependencies": {
    "react": "^0.14.0 || ^15.0.0 || ^16.0.0"
  }
}
```

2. `.babelrc`

```json
{
  "presets": ["env", "stage-2", "react"]
}
```

3. `.gitignore`

```
# 上传github时，忽略build文件夹
/node_modules
/build
.DS_Store
```

4. `.npmignore`

```
# 发布时，忽略src文件夹，你不希望用户下载src的内容
/node_modules
/src
.DS_Store
```

5. `webpack.config.js`

```js
var path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2', //此行重要！
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-2', 'react'],
          },
        },
      },
    ],
  },
  externals: {
    react: 'commonjs react', //使用用户的react。
  },
}
```

此时项目根目录如下：

```
fancy-component
  /build
  /src
  .babelrc
  .gitignore
  .npmignore
  package.json
  webpack.config.js
```

运行 `npm i` 安装所有依赖。至此完成了教程的 80%。事实上此时，只要

1. 将你写好的组件放入 src 文件夹。
2. webpack 打包
3. `npm publish`

就完成了发布。不过在发布前，我们首先需要

### `npm link` 测试组件是否可用
