# UI 交互规范

本文档定义了 **istock-shell** 项目中用户界面（UI）开发的标准和规范，依托于 `@istock-shell/ui` 组件库，旨在统一应用的视觉风格和交互体验。

## 1. 视觉体系

### 1.1 技术架构

UI 系统基于以下技术栈构建：

- **Tailwind CSS**: 原子化 CSS 框架，用于快速构建样式。
- **DaisyUI**: 基于 Tailwind 的组件库，提供语义化的 CSS 类名。
- **Svelte**: 组件实现框架。

### 1.2 颜色系统

项目定义了语义化的颜色变量，开发者**必须**优先使用这些语义变量，而非硬编码颜色值。

| 语义变量      | 对应 CSS 变量 | 用途   | 示例场景                         |
| :------------ | :------------ | :----- | :------------------------------- |
| **Primary**   | `--primary`   | 主色调 | 核心操作按钮、选中状态、品牌标识 |
| **Secondary** | `--secondary` | 次要色 | 辅助按钮、次级信息               |
| **Accent**    | `--accent`    | 强调色 | 突出显示的元素、高亮提示         |
| **Neutral**   | `--neutral`   | 中性色 | 背景、边框、普通文本             |
| **Info**      | `--info`      | 信息色 | 普通提示消息                     |
| **Success**   | `--success`   | 成功色 | 操作成功反馈                     |
| **Warning**   | `--warning`   | 警告色 | 风险操作提示                     |
| **Error**     | `--error`     | 错误色 | 错误反馈、破坏性操作（如删除）   |

### 1.3 尺寸规格

组件尺寸统一遵循以下 T-shirt size 规范：

- `xs` (Extra Small): 紧凑布局
- `sm` (Small): 辅助区域
- `md` (Medium): **默认尺寸**
- `lg` (Large): 突出显示
- `xl` (Extra Large): 巨幅展示

## 2. 组件规范

### 2.1 组件命名

所有 UI 组件均以 `Sh` (Shell) 为前缀，采用 PascalCase 命名。

- ✅ `ShButton`, `ShInput`, `ShDialog`
- ❌ `Button`, `MyInput`, `sh-dialog`

### 2.2 引入方式

统一从 `@istock-shell/ui` 包中解构引入。

```svelte
<script>
  import { ShButton, ShInput } from '@istock-shell/ui';
</script>
```

### 2.3 核心组件分类

#### 动作组件

用于触发操作。

- **ShButton**: 按钮。支持 `color`, `size`, `variant` (outline, ghost, link) 等属性。
- **ShDropdown**: 下拉菜单。

#### 数据录入

用于表单场景。

- **ShInput**: 文本输入框。
- **ShSelect**: 下拉选择器。
- **ShCheckbox**: 复选框。
- **ShToggle**: 开关。

#### 反馈组件

用于系统状态反馈。

- **ShAlert**: 警告提示框。
- **ShModal**: 模态对话框。
- **ShToast**: 轻量级消息提示。
- **ShProgress**: 进度条。

## 3. 开发最佳实践

### 3.1 响应式设计

使用 Tailwind CSS 的响应式前缀（`sm:`, `md:`, `lg:`）来适配不同屏幕尺寸，确保应用在移动端和桌面端均有良好表现。

### 3.2 暗黑模式 (Dark Mode)

系统内置暗黑模式支持。所有自定义样式应使用 CSS 变量或 Tailwind 的 `dark:` 修饰符，避免硬编码白色或黑色背景。

```html
<!-- ✅ 推荐 -->
<div class="bg-base-100 text-base-content">内容</div>

<!-- ❌ 避免 -->
<div style="background: white; color: black">内容</div>
```

### 3.3 可访问性 (Accessibility)

- 为交互元素（如按钮、链接）添加 `aria-label` 或有意义的文本内容。
- 确保颜色对比度符合 WCAG 标准（使用系统预设颜色通常已满足）。
