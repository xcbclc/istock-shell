# 环境变量

`iStock Shell`的环境变量由`Vite`提供机制支持，具体文档请访问[`Vite-环境变量和模式`](https://cn.vitejs.dev/guide/env-and-mode.html#env-variables-and-modes)。

## 环境变量说明

### .env

- `VITE_PROXY_API`：代理接口地址前缀
- `VITE_ISTOCK_API`：istock服务接口
- `VITE_SITE_BAIDU_ANALYSIS`：百度统计代码
- `VITE_ISTOCK_TEABLE`：teable服务接口地址
- `VITE_ISTOCK_BASE`：istock服务接口地址
- `VITE_ISTOCK_AKSHARE`：akshare服务接口地址
- `VITE_INDEXED_DB_NAME`：indexedDB数据库名称
- `VITE_INDEXED_DB_VERSION`：indexedDB数据库版本

### .env.development

- `VITE_PROXY`：开发接口代理地址，默认值：https://istock.red
