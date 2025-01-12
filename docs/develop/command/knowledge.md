# 开发前准备

在开始开发之前，确保你具备以下知识和技能，这将帮助你更顺利地进行开发工作。

## 基础技能

- **`前端基础`**：掌握`HTML`、`CSS`和`JavaScript`的基本知识。这是进行前端开发的基石，能够帮助你理解网页的结构、样式和行为。
- **`TypeScript`**：熟悉`TypeScript`的基本语法和特性。`TypeScript`为`JavaScript`添加了类型系统和编译时检查，是构建大型应用和提高代码质量的重要工具。
- **`Git`**：了解`Git`的基本操作，包括版本控制、分支管理和协作工作流。`Git`是目前最流行的代码版本控制系统，能够帮助你高效地管理和协作代码。

## 领域知识

- **`金融基础知识`**：了解金融领域的基本概念和术语，如股票、债券、汇率等。这对于开发金融相关的应用特别重要，能够帮助你更好地理解需求和技术实现。

## 技术栈

### 前端

`typescript`、`svelte`、`vite`、`antv`、`eslint + prettier + husky + lint-staged`

### 后端

`nodejs`、`nestjs`

### 文档

`vitepress`

## 目录结构

```
docs // 文档
cli // 脚手架工具
src
├─assets  // 静态资源目录
├─packages  // 本地依赖包
│  ├─command-parser // 命令解析库
│  ├─editor // 命令编辑输入库
│  ├─iswork // 运行在WebWorker中的前端命令服务库
│  ├─shell-ui // 终端命令行界面库
│  └─util // 通用工具函数
├─store // UI对应模型数据
├─style // 样式
├─use // 通用业务逻辑
├─view // 终端命令行界面
├─window // 窗口相关业务逻辑
└─worker // WebWorker中的命令服务
  ├─common // 命令服务的通用代码
  └─domains // 命令服务业务逻辑
      ├─*.domain.ts // 命令域
      ├─*.controller.ts // 命令控制器类
      ├─*.cmd.ts // 命令描述
      ├─*.service.ts // 命令服务
      └─*.model.ts // 命令数据模型
```
