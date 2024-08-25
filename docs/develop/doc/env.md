# 环境变量

`iStock Shell`的环境变量由`Vite`提供机制支持，具体文档请访问[`Vite-环境变量和模式`](https://cn.vitejs.dev/guide/env-and-mode.html#env-variables-and-modes)。

## 环境变量说明

### .env

- `VITE_AKSHARE_API`：AkShare服务的接口前缀
- `VITE_ISTOCK_API`：iStock Shell服务的接口前缀
- `VITE_SITE_BAIDU_ANALYSIS`：是否开启百度统计代码，自己部署请设置为`false`

### .env.development

- `VITE_PROXY`：本地启动开发服务时的代理地址，默认值：https://istock.red
