# 开发规范

为确保 `iStock Shell` 项目的可维护性、一致性和高质量，所有贡献者必须遵循以下开发规范。本规范涵盖代码风格、架构设计、命名约定及开发流程。

## 1. 技术栈概览

- **核心语言**: [TypeScript](https://www.typescriptlang.org/) (强类型 JavaScript 超集)
- **构建工具**: [Vite](https://vitejs.dev/) (极速前端构建工具)
- **UI 框架**: [Svelte](https://svelte.dev/) (高性能组件框架)
- **包管理**: [pnpm](https://pnpm.io/) (高效的包管理器，使用 Workspaces)
- **代码规范**: ESLint + Prettier + Husky + Lint-staged

## 2. 项目架构

本项目采用 Monorepo 结构，核心代码位于 `src/packages` 目录下：

- **`iswork`**: 核心业务框架。实现了 IOC 容器、CMDP 协议、ORM、消息总线等基础设施。
- **`command-parser`**: 命令解析器。负责词法分析、语法分析及 AST 构建。
- **`cli`**: 命令行工具。提供开发辅助和脚手架功能。
- **`shell-ui`**: UI 组件库。包含终端界面、图表展示等 Svelte 组件。
- **`util`**: 通用工具库。提供底层 helper 函数。

## 3. 核心概念与分层

`iswork` 框架采用类似于 NestJS 的模块化分层架构：

### 3.1 Application (应用)

整个系统的入口，负责初始化上下文、加载配置和启动服务。

### 3.2 Domain (域/模块)

功能模块的逻辑单元。通过 `@Domain` 装饰器定义，类似于 Angular/NestJS 的 Module。

- **职责**：组织相关的 Controller、Service 和 Provider。
- **规范**：每个独立的功能块（如股票、期货、系统设置）应作为一个 Domain。

### 3.3 Controller (控制器)

负责处理命令请求。通过 `@Controller` 装饰器定义。

- **职责**：接收 CMDP 消息，解析参数，调用 Service，返回结果。
- **规范**：文件名以 `.controller.ts` 结尾。

### 3.4 Service/Provider (服务)

封装业务逻辑。通过 `@Injectable` 装饰器定义。

- **职责**：处理复杂业务、数据计算、API 调用。
- **规范**：文件名以 `.service.ts` 结尾。

### 3.5 Model (模型)

定义数据结构和持久化逻辑。

- **职责**：映射数据库表或 API 数据结构。
- **支持**：IndexedDB, Memory, Fetch 等多种驱动。

## 4. 命名规范

### 4.1 文件与目录

- **强制**：所有文件名和目录名统一使用 **kebab-case**（短横线命名法）。
- **结构**：`[功能].[类型].[扩展名]`
  - 正例：`user-profile.controller.ts`, `auth.service.ts`, `stock-data.model.ts`
  - 反例：`UserProfileController.ts`, `AuthService.ts`

### 4.2 代码标识符

- **类 (Class)**: PascalCase (大驼峰)，如 `UserController`。
- **方法/变量**: camelCase (小驼峰)，如 `getUserInfo`。
- **常量**: UPPER_SNAKE_CASE (全大写下划线)，如 `MAX_RETRY_COUNT`。
- **接口 (Interface)**: PascalCase，建议不加 `I` 前缀。

## 5. 命令描述文件规范

在定义命令配置时，必须使用 `export default` 导出配置对象，以便 CLI 工具能够自动生成文档和类型定义。

```typescript
// 示例：cmd-config.ts
export default {
  cmd: 'hq',
  description: '获取行情数据',
  options: [{ name: 'market', parameter: ['m'], parameterType: ['string'], description: '市场代码' }],
};
```

## 6. 开发流程与工具

### 6.1 环境准备

确保本地安装了 Node.js (>=16) 和 pnpm (>=7)。

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建项目
pnpm build
```

### 6.2 代码提交

提交代码前，Husky 会自动触发 pre-commit 钩子，执行 lint 和 format 检查。
请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范撰写提交信息：

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档变更
- `style`: 代码格式调整（不影响逻辑）
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动
