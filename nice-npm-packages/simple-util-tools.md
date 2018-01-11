### value-equal

js 里常需要比较两个数组，对象是否值相同。 "===" 比较的是两者的指针（内存地址），所以总不同。

```shell
yarn add value-equal
```

```js
import valueEqual from 'value-equal'
valueEqual([1, 2, 3], [1, 2, 3])
```

###uppy

上传文件 js 插件

https://github.com/transloadit/uppy

```js
const Uppy = require('uppy/lib/core')
const Dashboard = require('uppy/lib/plugins/Dashboard')
const GoogleDrive = require('uppy/lib/plugins/GoogleDrive')
const Instagram = require('uppy/lib/plugins/Instagram')
const Webcam = require('uppy/lib/plugins/Webcam')
const Tus = require('uppy/lib/plugins/Tus')

const uppy = Uppy({ autoProceed: false })
  .use(Dashboard, { trigger: '#select-files' })
  .use(GoogleDrive, { target: Dashboard, host: 'https://server.uppy.io' })
  .use(Instagram, { target: Dashboard, host: 'https://server.uppy.io' })
  .use(Webcam, { target: Dashboard })
  .use(Tus, { endpoint: 'https://master.tus.io/files/' })
  .run()
  .on('complete', result => {
    console.log('Upload result:', result)
  })
```
