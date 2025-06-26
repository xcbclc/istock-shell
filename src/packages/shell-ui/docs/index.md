---
title: IStock Shell UI - 专业的终端与AI交互UI组件库
description: 基于Svelte 5构建的现代化UI组件库，专为交互式命令终端与对话式AI场景设计，提供30+高质量组件，支持TypeScript，具备完整的主题系统。
keywords: [IStock Shell UI, Svelte组件库, 终端UI, AI交互, TypeScript, 组件库文档, 前端组件, Web组件]
---

# IStock Shell UI

<p class="text-xl text-gray-600 mb-8">
  专为交互式命令终端与对话式AI场景设计的现代化UI组件库
</p>

## 🎯 设计理念

**IStock Shell UI** 是一个专业的UI组件库，专注于为现代Web应用中的终端界面和AI交互场景提供最佳的用户体验。我们深度理解命令行工具和AI助手的交互特点，为这些特殊场景量身定制了一套完整的组件解决方案。

### 核心优势

- **🎯 专业定位**：专为终端和AI交互场景优化
- **⚡ 高性能**：基于Svelte 5，编译时优化，运行时轻量
- **🔧 TypeScript**：完整类型定义，开发体验友好
- **🎨 主题系统**：基于Tailwind CSS + DaisyUI，支持深度定制
- **📱 响应式**：移动端适配，多屏幕尺寸支持
- **♿ 无障碍**：遵循WCAG 2.0标准，支持键盘导航

## 🚀 快速开始

### 安装

```bash
# 使用 npm
npm install @istock-shell/ui

# 使用 pnpm (推荐)
pnpm add @istock-shell/ui

# 使用 yarn
yarn add @istock-shell/ui
```

### 基础使用

```svelte
<script>
  import { ShButton, ShInput, ShAlert } from '@istock-shell/ui';
  
  let message = '';
  let showAlert = false;
  
  function handleSubmit() {
    showAlert = true;
    setTimeout(() => showAlert = false, 3000);
  }
</script>

<!-- 输入框 -->
<ShInput 
  bind:value={message} 
  placeholder="输入你的消息"
  color="primary"
/>

<!-- 按钮 -->
<ShButton 
  color="primary" 
  size="lg"
  onclick={handleSubmit}
>
  发送消息
</ShButton>

<!-- 提示信息 -->
{#if showAlert}
  <ShAlert color="success">
    消息发送成功！
  </ShAlert>
{/if}
```

### 样式引入

在你的主CSS文件中引入组件样式：

```css
/* main.css */
@import '@istock-shell/ui/src/index.css';
```

## 📦 组件概览

### 🎬 动作组件 (3个)
用于触发操作和用户交互
- **Button** - 按钮组件，支持8种颜色主题和多种样式变体
- **Dropdown** - 下拉菜单，支持位置自适应和键盘导航
- **Modal** - 模态框，支持层级管理和焦点锁定

### 📝 数据录入 (7个)
用于用户输入和数据收集
- **Input** - 输入框，支持多种类型和验证状态
- **Textarea** - 文本域，支持自适应高度
- **Select** - 选择器，支持单选/多选和搜索过滤
- **Checkbox** - 复选框，支持全选/半选状态
- **Radio** - 单选框，支持分组管理
- **Toggle** - 开关，支持动画效果
- **FieldSet** - 字段集，用于表单分组

### 📊 数据展示 (4个)
用于数据可视化和信息展示
- **Table** - 表格，支持排序、筛选、分页
- **List** - 列表，支持虚拟滚动和无限加载
- **Stat** - 统计数值，支持趋势指示
- **Kbd** - 键盘按键，用于快捷键展示

### 🔔 反馈组件 (4个)
用于用户反馈和状态提示
- **Alert** - 警告提示，支持4种类型
- **Toast** - 消息提示，支持自动消失
- **Loading** - 加载状态，支持多种样式
- **Tooltip** - 工具提示，支持智能定位

### 🧭 导航组件 (2个)
用于页面导航和路径指示
- **Menu** - 菜单，支持多级嵌套
- **Breadcrumbs** - 面包屑，支持路径导航

### 🎨 扩展组件 (13个)
专业功能组件，满足复杂业务需求
- **Chart** - 图表组件，基于AntV G2
- **VirtualTable** - 虚拟表格，支持万级数据渲染
- **VirtualList** - 虚拟列表，大数据量优化
- **Markdown** - Markdown渲染，支持代码高亮
- **DataGrid** - 数据网格，复杂表格操作
- **Form** - 表单，支持验证和布局
- **Icon** - 图标，SVG图标库
- **Message** - 消息，全局消息管理
- **Empty** - 空状态，占位提示
- **ErrorInfo** - 错误信息，错误边界处理
- **Text** - 文本，排版和截断
- **NavList** - 导航列表，侧边栏导航
- **Calendar** - 日历，日期选择和事件标记

## 🎨 主题系统

### 颜色主题
IStock Shell UI 提供8种预设颜色主题：

- `primary` - 主色调
- `secondary` - 次要色
- `accent` - 强调色
- `neutral` - 中性色
- `info` - 信息色
- `success` - 成功色
- `warning` - 警告色
- `error` - 错误色

### 尺寸规格
支持5种尺寸规格：`xs`、`sm`、`md`、`lg`、`xl`

### 自定义主题
```css
:root {
  --primary: #3b82f6;
  --secondary: #64748b;
  --accent: #f59e0b;
  /* 更多自定义变量 */
}
```

## 🌟 使用场景

### 💻 终端应用
- **命令行界面**：现代化的终端UI体验
- **开发工具**：IDE插件、调试工具界面
- **系统监控**：服务器状态、日志查看

### 🤖 AI交互
- **聊天界面**：对话式AI交互
- **代码助手**：AI编程辅助工具
- **智能问答**：知识库查询界面

### 📊 数据应用
- **数据看板**：实时数据监控
- **报表系统**：业务数据展示
- **分析工具**：数据可视化平台

## 📚 学习资源

- [安装指南](./installation.md) - 详细的安装和配置说明
- [快速上手](./getting-started.md) - 从零开始的使用教程
- [组件文档](./components/) - 完整的组件API参考
- [主题定制](./theming.md) - 主题系统使用指南
- [最佳实践](./best-practices.md) - 设计模式和使用建议

## 🤝 社区支持

- **GitHub**: [https://github.com/istock-shell/ui](https://github.com/istock-shell/ui)
- **问题反馈**: [GitHub Issues](https://github.com/istock-shell/ui/issues)
- **讨论交流**: [GitHub Discussions](https://github.com/istock-shell/ui/discussions)
- **NPM**: [https://www.npmjs.com/package/@istock-shell/ui](https://www.npmjs.com/package/@istock-shell/ui)

---

<p class="text-center text-gray-500 mt-12">
  <strong>@istock-shell/ui</strong> - 为现代Web应用打造的专业UI组件库
</p>