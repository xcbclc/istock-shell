# @istock-shell/cli

> iStock Shell 命令行工具 - 用于快速开发和管理 iStock Shell 命令的 CLI 工具

## 🚀 快速开始

安装完成后，你可以使用 `istock` 命令来访问所有功能：

```bash
# 查看版本
istock --version

# 查看帮助
istock --help
```

## 📋 命令列表

### `istock cmd init`

初始化命令开发环境，创建新的命令模板文件。

```bash
istock cmd init
```

**功能说明：**

- 交互式创建命令域和命令文件
- 自动生成标准的命令模板文件
- 支持 TypeScript 类型定义
- 包含控制器、模型、服务等完整结构

**生成的文件结构：**

```
src/worker/domains/{domain}/{command}/
├── {command}.cmd.ts          # 命令主文件
├── {command}.controller.ts   # 控制器文件
├── {command}.model.ts        # 模型文件
└── {command}.service.ts      # 服务文件
```

### `istock doc <action>`

自动生成各种类型的文档。

#### `istock doc cmd`

生成命令文档，扫描所有命令文件并生成 Markdown 文档。

```bash
istock doc cmd
```

**功能说明：**

- 自动扫描 `src/worker/domains` 目录下的所有命令文件
- 支持 `.ts` 和 `.json` 格式的命令文件
- 生成包含命令描述、参数、示例的完整文档
- 输出到 `docs/develop/command` 目录

#### `istock doc package`

为指定包生成 TypeDoc 文档。

```bash
istock doc package
```

**功能说明：**

- 使用 TypeDoc 生成 API 文档
- 支持 Markdown 格式输出
- 自动处理包的 TypeScript 源码
- 生成详细的 API 参考文档

#### `istock doc merge`

合并指定目录下的 Markdown 文件。

```bash
istock doc merge
```

**功能说明：**

- 递归扫描 `docs` 目录下的所有 Markdown 文件
- 按目录结构组织内容
- 生成统一的文档索引
- 输出到 `docs/all.md`

#### `istock doc ui`

生成 Shell UI 组件文档。

```bash
istock doc ui
```

**功能说明：**

- 处理 Shell UI 包中的组件示例
- 解析 `IStockShellUiExample` 组件标签
- 生成组件使用文档
- 只处理 `README.md` 和 `index.md` 文件

## 🛠️ 开发指南

### 项目结构

```
src/
├── index.mjs              # CLI 主入口文件
├── action/                # 命令实现目录
│   ├── cmd-init.mjs      # 命令初始化功能
│   ├── cmd-doc.mjs       # 命令文档生成
│   ├── package.mjs       # 包文档生成
│   ├── merge-markdown.mjs # Markdown 合并
│   └── shell-ui.mjs      # UI 组件文档
├── utils/                 # 工具函数
│   └── name.mjs          # 字符串格式转换
└── template/             # 模板文件
    ├── cmd/              # 命令模板
    └── doc/              # 文档模板
```

### 核心依赖

- **commander**: 命令行参数解析
- **inquirer**: 交互式命令行界面
- **ejs**: 模板引擎
- **glob**: 文件匹配
- **typedoc**: TypeScript 文档生成

### 字符串格式转换

工具提供了多种字符串格式转换功能：

```javascript
import { toFileName, toClassName, toModelName } from '@istock-shell/cli/src/utils/name.mjs';

// 转换为文件名格式 (kebab-case)
toFileName('MyComponent'); // 'my-component'

// 转换为类名格式 (PascalCase)
toClassName('my-component'); // 'MyComponent'

// 转换为模型名格式 (camelCase)
toModelName('my-component'); // 'myComponent'
```

## 🔧 配置

### 环境要求

- Node.js >= 16.0.0
- 支持 ES Modules
- TypeScript 项目（用于命令开发）

### 目录约定

工具假设以下目录结构：

```
project-root/
├── src/
│   └── worker/
│       └── domains/          # 命令域目录
├── docs/                     # 文档目录
└── packages/                 # 包目录
```

## 📝 示例

### 创建新命令

```bash
# 运行命令初始化
istock cmd init

# 按提示输入：
# ? 请输入命令域名称: user
# ? 请输入命令文件名: login

# 生成的文件：
# src/worker/domains/user/login/login.cmd.ts
# src/worker/domains/user/login/login.controller.ts
# src/worker/domains/user/login/login.model.ts
# src/worker/domains/user/login/login.service.ts
```

### 生成文档

```bash
# 生成所有命令的文档
istock doc cmd

# 生成包的 API 文档
istock doc package

# 合并所有 Markdown 文档
istock doc merge

# 生成 UI 组件文档
istock doc ui
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个工具。

## 📄 许可证

MIT License

## 🔗 相关链接

- [iStock Shell 主项目](https://github.com/xcbclc/istock-shell/istock-shell)
- [问题反馈](https://github.com/xcbclc/istock-shell/istock-shell/issues)
