# 添加文档

当我们开发了一个`命令`，或者在`packages`目录下添加或修改了代码包里面的一些功能，就需要维护相关的说明文档。

## 启动文档服务

进入项目`根目录`，并执行以下命令启动文档服务：

```bash
pnpm run docs:dev
```

这将启动文档开发服务器[`http://localhost:5172/`](http://localhost:5172/)，让你能够实时预览写好的文档。

## 文档自动生成

命令文档可以自动生成，`packages`目录下的代码包可以根据typescript类型和代码注释自动生成文档，具体使用方式可以查看[`文档自动生成`](/develop/doc/cli.html#文档自动生成)说明。

## 文档开发

文档服务基于[`vitepress`](https://vitepress.dev/zh/)开发，请直接访问[`vitepress`](https://vitepress.dev/zh/)官方站点获取开发文档。
