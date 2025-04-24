---
title: Markdown 渲染组件 - 文档展示指南
description: 基于Svelte的Markdown渲染解决方案，支持语法高亮、实时预览和自定义扩展，适用于文档展示、内容管理等场景。
keywords: [Markdown组件,Svelte文档渲染,语法高亮,内容管理,Markdown API]
aside: false
editLink: false
outline: [2, 3]
---

## Markdown 渲染组件 <Badge type="tip">shell</Badge>
**安全高效的Markdown解析方案，提供代码高亮、实时渲染和扩展支持。**

## 使用场景
- 技术文档的在线展示
- 用户生成内容的安全渲染
- 需要实时预览的编辑器场景
- 博客/文章内容管理系统
- 代码片段的语法高亮展示

## 功能特性
- 标准Markdown语法支持
- 双向数据绑定

## 示例演示
<IStockShellUiExample src="./example/MarkdownDefault.svelte" raw="false"></IStockShellUiExample>
<IStockShellUiExample src="./example/MarkdownLive.svelte" layout="column"></IStockShellUiExample>

## API 参考
### 属性说明
| 参数      | 说明             | 类型                                    | 默认值    |
|---------|----------------|---------------------------------------|--------|
| content | Markdown原始内容   | `string`                              | ''     |
| options | `Marked`解析器配置项 | [`MarkedExtension`](#markedextension) | {}     |

###
```typescript
import type { MarkedExtension } from 'marked';
```

## 最佳实践
1. **安全防护**：
   - 用户输入内容需过滤危险标签
   - 避免直接渲染未经验证的内容
2. **性能优化**：
   - 大文档使用防抖渲染
   - 静态内容预编译处理
   - 避免频繁更新content属性
3. **代码高亮**：
   - 指定语言类型提升准确性
   - 按需加载高亮语言包
   - 使用暗色主题需调整样式
4. **扩展开发**：
   - 通过options添加自定义渲染器
   - 使用marked插件扩展语法
   - 集成数学公式等扩展语法


> **提示**：参考[`marked`](https://marked.js.org/)了解更多配置   
