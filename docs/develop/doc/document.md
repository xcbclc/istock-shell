# 文档开发指南 (Documentation Guide)

在 iStock Shell 项目中，高质量的文档与高质量的代码同等重要。无论是用户指南、开发者手册还是 API 参考，清晰准确的文档都是项目成功的关键。本指南将帮助你了解文档结构、开发流程及自动生成机制。

## 文档架构

项目文档基于 [VitePress](https://vitepress.dev/zh/) 构建，位于项目根目录下的 `docs` 文件夹中。主要包含以下几个部分：

- **用户指南 (`docs/use`)**: 面向最终用户，包含快速开始、命令使用手册等。其中命令文档主要通过 CLI 自动生成。
- **开发指南 (`docs/develop`)**: 面向贡献者和开发者，包含架构设计、开发流程、CLI 工具说明等（即本文档所在区域）。
- **API 参考 (`docs/packages`)**: 面向核心开发者，包含各内部包（如 `iswork`, `shell-ui`）的详细 API 文档，主要由 TypeDoc 自动生成。
- **标准规范 (`docs/std`)**: 包含项目的设计协议、术语表及开发规范。
- **静态资源**: 图片等静态资源通常存放于各文档同级的 `assets` 或 `static` 目录，或统一管理。

## 快速开始

### 1. 启动本地环境

在项目根目录下执行以下命令，启动文档开发服务器：

```bash
pnpm run docs:dev
```

启动成功后，访问 [http://localhost:5172/](http://localhost:5172/) 即可实时预览文档更改。VitePress 支持热重载（HMR），修改 Markdown 文件后浏览器会自动更新。

### 2. 构建生产文档

如果需要构建用于生产环境的静态网站，请执行：

```bash
pnpm run docs:build
```

构建产物将输出到 `docs/.vitepress/dist` 目录。

## 文档编写工作流

文档维护分为**手动编写**和**自动生成**两种模式。

### 手动编写 (Manual Authoring)

适用于编写教程、设计理念、最佳实践等非结构化内容。

1.  **创建文件**: 在 `docs` 目录下相应的子目录中创建 `.md` 文件。
2.  **配置导航**: 如果是新页面，可能需要在 `docs/.vitepress/config.ts` 中更新侧边栏（Sidebar）或导航栏（Nav）配置，以便用户能从菜单访问。
3.  **编写内容**: 使用标准的 Markdown 语法。利用 VitePress 的特性，你还可以使用：
    - [Markdown 扩展](https://vitepress.dev/zh/guide/markdown)：如提示块（Container）、代码块高亮等。
    - [Vue 组件](https://vitepress.dev/zh/guide/using-vue)：在 Markdown 中直接嵌入 Vue 组件以增强交互性。

### 自动生成 (Automatic Generation)

为了保持文档与代码的一致性，减少维护成本，项目大量采用了自动生成技术。

#### 1. 业务命令文档

当你在 `src/worker/domains` 下开发新的业务命令时，**无需**手动在 `docs` 下编写文档。
请在 `*.cmd.ts` 文件中完善命令定义的元数据（描述、参数说明、示例等）。
然后运行：

```bash
istock doc cmd
```

该命令会提取元数据并在 `docs/use/command` 下生成标准化的命令手册。

#### 2. 核心包 API 文档

对于 `iswork`、`util` 等核心包的 API 变更：
请确保代码中有完善的 JSDoc 注释。
然后运行：

```bash
istock doc package
```

该命令基于 TypeDoc 分析代码签名，在 `docs/packages` 下生成详细的 API 参考。

#### 3. UI 组件文档

对于 `shell-ui` 组件库的更新：
运行：

```bash
istock doc ui
```

该命令会处理组件示例，实现“文档即演示”。

> 更多关于 CLI 工具的细节，请参考 [脚手架命令 (CLI Commands)](/develop/doc/cli.html)。

## 编写规范与建议

1.  **保持一致性**: 遵循现有的文档结构和术语。使用“你”称呼读者，保持友好、专业的语调。
2.  **准确性**: 确保代码示例可运行，链接有效。对于自动生成的内容，请修改源码中的注释/元数据，而不是修改生成的 Markdown 文件。
3.  **深度与原创**:
    - 避免仅罗列参数，多提供场景化的**使用示例**。
    - 解释“为什么”这样做，而不仅仅是“怎么做”。
    - 深入剖析背后的设计原理，帮助读者建立完整的知识体系。
4.  **排版美观**: 合理使用标题层级、列表、代码块和提示块（Tip/Warning），提升阅读体验。

## 常见问题

**Q: 我修改了 `*.cmd.ts` 的描述，但文档没变？**
A: 请确保运行了 `istock doc cmd` 命令来重新生成文档。

**Q: 如何在文档中插入图片？**
A: 建议将图片放在文档同级的 `assets` 目录中，使用相对路径引用，例如 `![Alt text](./assets/image.png)`。

**Q: 侧边栏菜单在哪里配置？**
A: 可以在 `docs/.vitepress/config.ts` 文件中找到 `themeConfig.sidebar` 配置项进行修改。
