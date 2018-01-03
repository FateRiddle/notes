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
  "files": ["css"], //除了主export外,我只希望导出css文件。
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
    // 如果你的库要使用css需要这几个包 /////////
    "css-loader": "^0.28.7",
    "style-loader": "^0.19.0",
    "extract-text-webpack-plugin": "^3.0.2",
    ///////////////////////////////////////////
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
  // env直接支持到es2017，stage-2包含了常用的es语法。如果需要装饰符等，安装stage-0
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
// 不带css的组件，这份够用。
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2', //此行重要！详见https://webpack.js.org/configuration/output/#output-librarytarget
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

带 css 以及图片的组件的 webpack 设置有两种选择，我们之后讨论。

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

`npm link` 简单的说就是在发布前，虚拟了发布、安装和导入库的过程，用于测试组件是否可用。

建立一个简单的 hello world 组件真实测试一下吧：

```js
// 创建src/index.js
import React from 'react'

export default () => <div>Fancy Component!</div>
```

运行

```bash
npm run build
```

将会生成`build/index.js`作为 webpack 的输出。

OK, 有了输出文件，运行

```bash
npm link
```

此组件就 “ 虚拟 ” 的在全局安装了

我们需要一个测试环境。选择其他文件夹用`create-react-app`简单生成一个：

```bash
create-react-app test

cd test

npm start
```

运行后首先 “ 虚拟安装 ” 我们的`fancy-component`组件 :

```bash
npm link fancy-component
```

修改`App.js`为

```js
import React, { Component } from 'react'
import Fancy from 'fancy-component'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Fancy />
      </div>
    )
  }
}

export default App
```

打开`localhost:3000`, 我们应该能看到 “Fancy Component!” 几个大字成功显示在浏览器上。说明我
们的组件已经能用了。

那么下一步就是

### `npm publish` 发布你的 npm 包

还记得你注册的 npm 账号和密码吗？在发布前需要本机 " 登录 "：

```bash
npm adduser
```

按照提示输入用户名和密码。这里国内的开发组特别注意，如果你因为某种原因将 npm 的 registry
修改成了淘宝镜像，那么必须修改回来。

注册好之后

```bash
npm publish
```

All Done! 比我想象中简单好多。快去 npmjs.org 上看看你的组件是否发布了吧。

### 关于版本更新

是的，更新维护你的 npm package 是个无法避免的事，其实更新非常非常简单，你要做的仅仅是修
改`package.json`的版本号

```bash
npm version 1.0.1
```

然后重新发布即可

```bash
npm publish
```

### 拾遗

1. 添加一个 README.md。 不论是 github 还是 npm，这是默认的介绍文件。介绍一下自己的包的使用
   方法，写几个 demo 吧。

### 关于 CSS

有三种方案供你选择：

1. 将 CSS 文件直接放在项目目录下（`src`之外，因为`src`文件夹会被`.npmignore`忽略）, 并要求
   用户在使用时引用。

```js
import 'fancy-component/index.css'
```

2. 对于极少数的 CSS 这样做是可以的，如果 CSS 文件较大，还是通过 webpack 压缩一下比较好。那
   么我们就需要修改`webpack.config.js`了。\
   首先在`package.json`里安装注释说明的几个依赖。 `webpack.config.js`将如下：

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
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
      //css loader //////////////////
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
        }),
      },
      ///////////////////////////////

      // 如果你的组件居然带有图片，需要这个loader
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      /////////////////////////////////////
    ],
  },
  // 用于提取css文件的插件
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
    }),
  ],
  externals: {
    react: 'commonjs react',
  },
}
```

当运行`npm run build`会生成 inex.js 和 main.css 两个文件，用户的使用方法同方法 1,

```js
import 'fancy-component/build/main.css'
```

3. 你可能要问，能不能不让用户自己导入样式呀？答案是肯定的，只需要不使
   用`extract-text-webpack-plugin`把 css 从导出文件中提取即可。`webpack.config.js`会变得更
   加简洁。

```js
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
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
      //css loader //////////////////
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      ///////////////////////////////
    ],
  },
  externals: {
    react: 'commonjs react',
  },
}
```

这样，不需要任何多余的导入即可。而且非常神奇的是，用户的 css 居然可以覆盖组件引用的 css。
唯一的弊端是，文件会变大 5k 的样子。
