# 环境搭建

本指南将帮助你快速搭建 iStock Shell 的开发环境。

## 前置要求

在开始之前，请确保你的系统满足以下要求：

- **Node.js**: v18+ (推荐使用 LTS 版本)
- **包管理器**: pnpm v8+ (项目强制使用 pnpm)
- **Git**: 最新版本

如果你尚未安装 `pnpm`，可以使用以下命令安装：

```bash
npm install -g pnpm
```

## 获取代码

```bash
git clone https://github.com/xcbclc/istock-shell
cd istock-shell
```

::: tip 提示
[gitee备份地址](https://gitee.com/xcbclc/istock-shell)
:::

## 安装依赖

在项目根目录下执行：

```bash
pnpm install
```

## 启动开发服务

```bash
pnpm run dev
```

启动成功后，浏览器访问 `http://localhost:5173/` 即可看到开发环境。

## 推荐工具

- **IDE**: [Visual Studio Code](https://code.visualstudio.com/)
- **插件**:
  - Eslint
  - Prettier
  - Svelte for VS Code
