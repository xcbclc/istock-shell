# 代理服务

`iStock Shell`的设计理念是尽量不依赖自有后端服务。但如果想访问其它网站数据，就会存在`跨域`问题。为了突破`跨域`的限制，我们提供了一个简单的代理服务。

## istock-any-proxy

[`istock-any-proxy`](https://gitee.com/xcbclc/istock-any-proxy)是一个可以代理到任何站点的程序，访问[https://gitee.com/xcbclc/istock-any-proxy](https://gitee.com/xcbclc/istock-any-proxy)下载即可。

### 如何使用

1. windows下执行istock-any-proxy.exe文件，确保运行成功
2. http://localhost:8000 + 代理地址路径，组成访问地址
3. 请求header头添加x-target，值为代理地址
4. 发起请求即可

如代理地址为
https://istock.red/api/akshare/stock_sse_summary
，则请求为：

```shell
curl --location 'http://localhost:8000/api/akshare/stock_sse_summary' \
--header 'x-target: https://istock.red' \
--data ''
```

```javascript
const myHeaders = new Headers();
myHeaders.append('x-target', 'https://istock.red');
const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: '',
};

fetch('http://localhost:8000/api/akshare/stock_sse_summary', requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
```
