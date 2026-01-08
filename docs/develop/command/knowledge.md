# 知识储备与项目结构

在深入开发之前，了解项目所使用的技术栈和目录结构至关重要。

## 技术栈

本项目采用现代化的前端技术栈构建：

### 核心框架

- **TypeScript**: 全面使用 TypeScript 进行开发，保证类型安全。
- **Svelte 5**: 下一代 Web 框架，用于构建高性能的 UI。
- **Vite**: 极速的构建工具。

### 业务逻辑 (Worker)

- **@istock-shell/iswork**: 自研的 Web Worker 服务框架，设计灵感来源于 NestJS。支持依赖注入 (DI)、装饰器 (Decorators) 和面向切面编程 (AOP)。
- **AkShare**: 强大的开源金融数据接口库。

### 工具链

- **pnpm**: 高效的包管理器。
- **ESLint + Prettier**: 代码规范与格式化。
- **Husky + Lint-staged**: Git 提交规范检查。

## 目录结构

项目采用了 Monorepo 风格的结构（尽管在一个仓库中），核心逻辑模块化。

```
istock-shell/
├── docs/                   # 项目文档 (VitePress)
├── src/
│   ├── assets/             # 静态资源
│   ├── packages/           # 核心功能包
│   │   ├── cli/            # CLI 脚手架工具 (@istock-shell/cli)
│   │   ├── command-parser/ # 命令解析器
│   │   ├── editor/         # 命令编辑器组件
│   │   ├── iswork/         # Worker 核心框架
│   │   ├── shell-ui/       # UI 组件库
│   │   └── util/           # 通用工具库
│   ├── store/              # 全局状态管理 (Svelte Stores)
│   ├── style/              # 全局样式
│   ├── view/               # 视图层 (Svelte Components)
│   ├── worker/             # 业务逻辑代码 (用户开发主要在此处)
│   │   ├── common/         # 通用业务代码
│   │   └── domains/        # 业务应用域 (Domains)
│   │       ├── akshare/         # 示例：akshare应用域
│   │       └── ...
│   ├── App.svelte          # 应用根组件
│   └── main.ts             # 应用入口
├── pnpm-workspace.yaml     # Workspace 配置
└── package.json
```

## 核心概念

- **Domain (域)**: 业务逻辑的集合，类似于微服务或模块。
- **Command (命令)**: 用户输入的指令，对应一个具体的功能。
- **Controller (控制器)**: 接收命令请求，调用 Service 处理。
- **Service (服务)**: 处理具体的业务逻辑和数据获取。
