如何通过将 GET 请求的文件直接下载？使用 axios

https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743

```js
axios({
  url: 'http://localhost:5000/static/example.pdf',
  method: 'GET',
  responseType: 'blob', // important
}).then(response => {
  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'file.pdf')
  document.body.appendChild(link)
  link.click()
  // document.body.removeChild(link)
})
```

IE 的处理
https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
