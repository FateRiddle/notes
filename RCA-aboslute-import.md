`npm i -D cross-env`

然后打开`package.json`。在所有的`scripts`前都添加
```json
"scripts": {
    "start": "cross-env NODE_PATH=src react-scripts start",
    "build": "cross-env NODE_PATH=src react-scripts build",
    "test": "cross-env NODE_PATH=src react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
```

之前的方法是在跟目录新建一个`.env`文件，并写入`NODE_PATH=src`。不过在升级react 16之后，这一方法在CRA已经无效

详细讨论在：https://github.com/facebookincubator/create-react-app/issues/2230