# 脚手架命令 (CLI Commands)

项目内置了一套强大的命令行工具（CLI），用于加速开发流程、自动生成文档以及维护代码库。这些命令旨在提升开发效率，确保代码规范，并自动化繁琐的文档维护工作。

## 命令概览

所有命令均以 `istock` 开头，主要分为两大类：

1.  **cmd**: 应用命令开发相关工具，用于初始化项目结构和处理接口定义。
2.  **doc**: 文档自动生成相关工具，用于从代码中提取信息生成各类技术文档。

## 应用命令开发 (Command Development)

### 初始化命令 (`init`)

用于快速创建一个新的应用命令域，自动生成标准的 MVC 结构文件。

- **命令**: `istock cmd init`
- **执行位置**: 项目根目录
- **交互流程**:
  1.  **输入命令域名称（domain）**：即 `src/worker/domains` 下的文件夹名。若文件夹不存在会自动创建。
  2.  **输入命令文件名（name）**：建议使用 kebab-case 命名（如 `my-command`，`stock-analysis`）。
- **生成产物**:
  执行成功后，会在 `src/worker/domains/<domain>/<name>` 目录下生成以下四个核心文件：
  - `*.cmd.ts`: **命令定义文件**，定义命令的触发词、参数、选项及描述。
  - `*.controller.ts`: **控制器文件**，处理命令的业务流转和视图响应。
  - `*.model.ts`: **数据模型文件**，定义数据结构和类型。
  - `*.service.ts`: **服务文件**，封装具体的业务逻辑实现。

**示例**:
在 `gpxx`（股票学习）命令域下开发 `zl`（资料）相关命令。

```shell
PS D:\project\istock-shell> istock cmd init
? 在哪个命令域下开发命令？ gpxx
? 您期望命令相关文件名为？ zl
gpxx命令域文件夹创建成功
初始化命令开发已完成
```

### 解析 AKShare 接口 (`akshare`)

用于解析 `docs/akshare` 目录下的 Markdown 文档，自动生成 TypeScript 接口定义文件。

- **命令**: `istock cmd akshare`
- **功能**:
  - 递归扫描 `docs/akshare` 目录下的所有 Markdown 文件。
  - 智能提取文档中的接口描述、输入参数（Request）、输出参数（Response）及数据示例。
  - 在 `src/worker/akshare` 目录下生成强类型的 `.ts` 接口定义文件。
- **用途**: 将非结构化的文档转换为强类型的代码定义，便于在业务逻辑中直接调用 AKShare 接口，并获得代码提示和类型检查支持。

## 文档自动生成 (Documentation Generation)

### 生成命令文档 (`cmd`)

自动扫描项目中的命令定义，生成标准化的命令使用文档。

- **命令**: `istock doc cmd`
- **功能**:
  - **编译代码**: 自动执行 TypeScript 编译，确保获取最新的类型定义。
  - **扫描定义**: 扫描 `src/worker/domains` 下的所有 `*.cmd.ts` 和 `*.cmd.json` 文件，以及 `src/worker/akshare` 下的接口定义。
  - **解析元数据**: 解析命令的参数类型、必选/可选状态、默认值及描述信息。
  - **生成文档**: 在 `docs/use/command` 目录下生成结构化的 Markdown 文档。
- **提示**: 文档生成器高度依赖代码中的元数据。请务必在 `*.cmd.ts` 中编写详细的描述，这些信息将直接呈现在最终文档中。

### 生成包文档 (`package`)

为项目核心包生成 API 参考文档，方便开发者查阅内部 API。

- **命令**: `istock doc package`
- **功能**:
  - 使用 **TypeDoc** 工具深入分析代码结构。
  - 为以下核心包生成 API 文档：
    - `iswork`: 核心工作流引擎
    - `command-parser`: 命令解析器
    - `editor`: 编辑器组件
    - `util`: 通用工具库
  - 自动拷贝各包的 `README.md` 和 `docs` 目录到统一的文档目录 `docs/packages`，确保文档的一致性。

### 生成 UI 组件文档 (`ui`)

处理 Shell UI 组件库的文档，支持组件示例的嵌入与展示，实现“文档即演示”。

- **命令**: `istock doc ui`
- **功能**:
  - 扫描 `src/packages/shell-ui` 下的 Markdown 文件。
  - 解析自定义标签 `<IStockShellUiExample>`。
  - 将 Svelte 组件源码和实际运行效果自动嵌入到文档中。
  - 输出处理后的文档到 `docs/packages/shell-ui`。

### 合并文档 (`merge`)

将所有分散的 Markdown 文档合并为一个文件，通常用于构建全文搜索索引或生成离线文档手册。

- **命令**: `istock doc merge`
- **功能**:
  - 递归遍历 `docs` 目录。
  - 将所有 `.md` 文件内容按序合并到 `docs/.vitepress/dist/all.md` 文件中。

---

::: tip 最佳实践
建议在提交代码前运行相关文档生成命令，以确保文档与代码实现保持同步，避免文档过时带来的困扰。
:::
