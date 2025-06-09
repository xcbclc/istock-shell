---
title: FieldSet 字段集组件 | IStock Shell UI
description: FieldSet字段集组件提供语义化的表单分组功能，基于原生fieldset元素构建，支持标题显示、自定义样式、无障碍访问，配合Field字段组件实现灵活的标签布局，适用于复杂表单的逻辑分组和视觉组织。
keywords:
  [
    FieldSet字段集组件,
    Svelte表单分组,
    UI组件库,
    表单容器,
    字段集布局,
    前端组件,
    Web组件,
    表单可访问性,
    语义化表单,
    响应式表单,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# FieldSet 字段集组件

字段集组件是表单组织的基础容器，通过语义化的分组方式提升表单的可读性和可访问性。基于原生 HTML fieldset 元素构建，提供标题显示和灵活的内容布局支持。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShFieldSet, ShField } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的字段集用法，适用于表单分组场景：

```svelte
<script>
  import { ShFieldSet, ShField, ShInput } from '@istock-shell/ui';
</script>

<ShFieldSet title="个人信息">
  <ShField label="姓名">
    <ShInput placeholder="请输入姓名" />
  </ShField>
  <ShField label="邮箱">
    <ShInput type="email" placeholder="请输入邮箱" />
  </ShField>
</ShFieldSet>
```

## 组件特性

- 🏗️ **语义化结构**：基于原生 HTML fieldset 和 legend 元素，提供完整的语义化支持
- 🏷️ **灵活标签**：ShField 组件支持字符串或对象形式的标签配置，可控制标签位置
- 🎨 **样式定制**：支持通过 class 属性进行样式定制，兼容 TailwindCSS
- ♿ **无障碍友好**：遵循 WCAG 2.0 标准，支持屏幕阅读器和键盘导航
- 🔧 **类型安全**：完整的 TypeScript 类型定义，提供优秀的开发体验
- 📱 **响应式支持**：适配各种屏幕尺寸和设备类型

## 使用场景

| 场景         | 推荐配置                              | 说明                             |
| ------------ | ------------------------------------- | -------------------------------- |
| 基础表单分组 | `title="分组标题"`                    | 将相关表单控件进行逻辑分组       |
| 长表单分区   | 多个 ShFieldSet 嵌套使用              | 长表单需要分区块展示时           |
| 登录注册表单 | 配合 ShInput、ShButton 等组件         | 典型的用户认证表单场景           |
| 设置页面     | `class="bg-base-200 p-4 rounded-box"` | 配置项分组，增强视觉层次         |
| 复合表单     | ShField 组件混合不同输入类型          | 文本框、文本域、选择器等混合使用 |
| 无障碍表单   | 配合适当的 aria 属性                  | 符合 WCAG 2.1 的表单可访问性标准 |
| 响应式布局   | 结合 TailwindCSS 响应式类             | 不同设备上的表单布局适配         |

## 示例演示

<IStockShellUiExample src="./example/FieldSetDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/FieldSetStyle.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/FieldSetMultiple.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/FieldSetLogin.svelte"></IStockShellUiExample>

## API 参考

### 属性说明

#### FieldSet 属性

| 属性名  | 类型     | 默认值 | 说明                             |
| ------- | -------- | ------ | -------------------------------- |
| `title` | `string` | -      | 字段集标题，将显示为 legend 元素 |
| `class` | `string` | -      | 自定义CSS类名                    |

#### Field 属性

| 属性名  | 类型                                    | 默认值 | 说明          |
| ------- | --------------------------------------- | ------ | ------------- |
| `label` | `string` \| [`FieldLabel`](#fieldlabel) | -      | 字段标签配置  |
| `class` | `string`                                | -      | 自定义CSS类名 |

### 代码片段插入位置

- `FieldSet`的`children`：

```svelte
<fieldset>
  <!-- ...code -->
  <!-- FieldSet 内容插入位置 -->
  {@render children()}
  <!-- ...code -->
</fieldset>
```

- `Field`的`children`：

```svelte
<div class="field">
  <!-- ...code -->
  <!-- Field 内容插入位置 -->
  {@render children()}
  <!-- ...code -->
</div>
```

### 事件

#### FieldSet 事件

继承所有原生 fieldset 元素事件，如：

- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `click` - 点击事件

#### Field 事件

继承所有原生 div 元素事件，如：

- `click` - 点击事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

## 类型定义

### FieldLabel

```typescript
// 字段标签配置类型
export type FieldLabel = {
  /** 标签显示文本 */
  title?: string;
  /** 标签位置，相对于字段内容的位置 @default 'before' */
  placement?: 'before' | 'after';
};
```

## 设计指南

### 标题使用建议

- **简洁明确**：标题应简洁明确地描述字段组的用途
- **层次清晰**：避免过深的嵌套，保持表单结构的清晰性
- **语义化**：使用有意义的标题，提升可访问性

### 标签位置选择

- **前置标签（before）**：适用于大多数表单控件，如输入框、选择器
- **后置标签（after）**：适用于复选框、单选框等需要标签在右侧的控件

### 样式定制建议

- **背景色**：使用 `bg-base-200` 等浅色背景区分不同分组
- **边框**：使用 `border border-base-300` 添加边框增强视觉分组
- **圆角**：使用 `rounded-box` 或 `rounded-lg` 增加现代感
- **间距**：使用 `p-4` 或 `p-6` 添加内边距，`gap-4` 控制字段间距

### 无障碍支持

- 使用原生 fieldset 和 legend 元素提供语义化结构
- 确保标签与表单控件的正确关联
- 提供适当的 aria 属性支持屏幕阅读器
- 保证键盘导航的流畅性

## 最佳实践

### 表单组织

1. **逻辑分组**：将相关的表单字段组织在同一个 ShFieldSet 中
2. **适度分组**：避免过度分组，保持表单的简洁性
3. **一致性**：在同一个应用中保持字段集样式的一致性
4. **响应式**：确保在不同设备上的良好显示效果

### 性能优化

1. **合理嵌套**：避免过深的组件嵌套影响性能
2. **样式复用**：使用CSS类而非内联样式提高渲染效率
3. **按需加载**：对于复杂表单考虑分步加载

### 用户体验

1. **视觉层次**：通过样式区分不同重要级别的字段组
2. **错误提示**：在字段集级别提供统一的错误提示
3. **加载状态**：为异步加载的表单提供适当的加载提示

## 常见问题

### Q: 如何实现字段集的嵌套？

A: 可以在 ShFieldSet 内部嵌套另一个 ShFieldSet，但建议避免过深的嵌套：

```svelte
<ShFieldSet title="用户信息">
  <ShFieldSet title="基本信息">
    <ShField label="姓名">
      <ShInput placeholder="请输入姓名" />
    </ShField>
  </ShFieldSet>
  <ShFieldSet title="联系方式">
    <ShField label="邮箱">
      <ShInput type="email" placeholder="请输入邮箱" />
    </ShField>
  </ShFieldSet>
</ShFieldSet>
```

### Q: 如何自定义字段集的样式？

A: 通过 `class` 属性添加 TailwindCSS 类或自定义CSS类：

```svelte
<ShFieldSet title="设置" class="bg-base-200 border border-base-300 p-6 rounded-lg shadow-sm">
  <!-- 字段内容 -->
</ShFieldSet>
```

### Q: Field 组件的标签位置如何选择？

A: 根据表单控件类型选择合适的标签位置：

```svelte
<!-- 输入框：前置标签 -->
<ShField label="用户名">
  <ShInput />
</ShField>

<!-- 复选框：后置标签 -->
<ShField label={{ title: '同意条款', placement: 'after' }}>
  <input type="checkbox" />
</ShField>
```

### Q: 如何实现响应式的字段布局？

A: 结合 TailwindCSS 的响应式类实现不同设备上的布局：

```svelte
<ShFieldSet class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <ShField label="姓名">
    <ShInput />
  </ShField>
  <ShField label="邮箱">
    <ShInput type="email" />
  </ShField>
</ShFieldSet>
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
