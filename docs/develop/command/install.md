# 开发环境设置

在开始`iStock Shell`命令的开发之前，请确保你已经正确配置了开发环境。下面介绍的是简单易懂的步骤和说明。

## 依赖环境

确保你的开发环境满足以下要求：

- **Node.js版本**：使用Node.js v16或更高版本。你可以从官方网站 [Node.js](https://nodejs.org/) 下载并安装最新版本。

- **包管理工具**：确保你已安装pnpm，建议使用pnpm v8或更高版本。你可以通过以下命令安装：

  ```bash
  npm install -g pnpm
  ```

## 获取最新代码

使用以下命令从代码仓库拉取最新的项目代码：

```bash
git clone https://gitee.com/xcbclc/istock-shell
```

## 安装依赖包

进入项目`根目录`，并执行以下命令安装项目所需的依赖包：

```bash
pnpm i
```

这将自动下载并安装项目所需的所有依赖项。

## 运行开发服务

一旦依赖安装完成，你可以运行以下命令启动开发服务：

```bash
pnpm run dev
```

这将启动开发服务器[`http://localhost:5173/`](http://localhost:5173/)，让你能够实时预览和调试你的`iStock Shell`命令。

通过按照以上步骤设置开发环境，这将为你顺利进行`iStock Shell`命令开发打下基础。如果在配置过程中遇到问题，请参考相关文档或向开发团队寻求帮助。
