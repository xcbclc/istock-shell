---
title: Alert 警告提示组件 | IStock Shell UI
description: Alert警告提示组件用于展示重要的提示信息，支持8种语义化类型、4种样式变体（默认、柔和、轮廓、虚线）、自定义标题描述、图标展示等特性，基于原生div元素构建，适用于系统通知、操作反馈、状态提示等各种信息展示场景。
keywords:
  [
    Alert警告提示,
    Svelte警告框,
    消息通知组件,
    提示框组件,
    反馈组件,
    状态提示,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式提示,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Alert 警告提示组件

警告提示组件是用户界面中重要的反馈元素，用于向用户传达系统状态、操作结果或重要信息。IStock Shell UI 的 Alert 组件基于原生 HTML div 元素构建，提供了丰富的样式变体和语义化的类型区分，满足各种信息展示需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShAlert } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的警告提示用法，适用于大多数场景：

```svelte
<script>
  import { ShAlert } from '@istock-shell/ui';
</script>

<ShAlert type="info" title="提示" description="这是一条信息提示" />
```

## 组件特性

- 🎨 **丰富类型**：8种语义化类型（info、success、warning、error等）支持不同场景
- 🎭 **样式变体**：4种视觉样式（默认、柔和、轮廓、虚线）满足不同设计需求
- 📝 **内容灵活**：支持标题、描述文本分层展示和完全自定义内容
- 🎯 **图标集成**：内置图标系统，根据类型自动匹配合适图标
- 🔧 **高度定制**：基于原生div元素，继承所有HTML属性和事件
- ♿ **无障碍友好**：遵循WCAG 2.0标准，支持屏幕阅读器和键盘导航

## 使用场景

| 场景         | 推荐配置                  | 说明                             |
| ------------ | ------------------------- | -------------------------------- |
| 操作成功反馈 | `type="success"`          | 保存成功、提交完成等正面操作反馈 |
| 错误信息提示 | `type="error"`            | 操作失败、验证错误等错误状态展示 |
| 警告提醒     | `type="warning"`          | 需要用户注意的重要提醒信息       |
| 信息通知     | `type="info"`             | 系统通知、帮助说明等一般信息展示 |
| 柔和提示     | `soft` + 对应类型         | 不太紧急的提示信息，视觉更柔和   |
| 轮廓样式     | `outline` + 对应类型      | 需要突出边框但保持背景简洁的场景 |
| 虚线边框     | `dash` + 对应类型         | 临时性、草稿状态的提示信息       |
| 自定义内容   | 使用默认插槽              | 需要复杂布局或交互元素的警告框   |
| 页面顶部通知 | `type="info"` + 全宽布局  | 系统维护通知、重要公告等         |
| 表单验证反馈 | `type="error"` + 简洁描述 | 表单字段验证失败的即时反馈       |

## 示例演示

### 基础警告提示配置

通过 `description` 属性驱动的警告提示展示。Alert 组件支持简洁的文本描述配置，特别适用于标准信息通知场景，为用户提供清晰直观的反馈信息和基础的视觉提示效果。

::: raw
<IStockShellUiExample src="./feedback/alert/example/AlertDefault.svelte" layout="column"></IStockShellUiExample>
:::

### 语义化类型配置

通过 `type` 属性控制警告提示的语义类型。Alert 组件提供四种核心类型：`info`/`success`/`warning`/`error`，支持不同场景的信息传达需求，自动匹配对应的颜色主题和图标样式，特别适用于状态反馈和操作结果通知场景，为用户提供准确的视觉语义识别和情感化的交互体验。

::: raw
<IStockShellUiExample src="./feedback/alert/example/AlertType.svelte" layout="column"></IStockShellUiExample>
:::

### 柔和样式展示

使用 `soft` 属性实现柔和视觉效果。Alert 组件支持浅色背景的柔和样式，提供更温和的视觉层次感，降低信息的紧迫感和视觉冲击力，特别适用于次要信息展示和长时间显示的通知场景，为用户提供舒适的阅读体验和优雅的界面呈现效果。

::: raw
<IStockShellUiExample src="./feedback/alert/example/AlertSoft.svelte" layout="column"></IStockShellUiExample>
:::

### 轮廓样式展示

使用 `outline` 属性实现边框轮廓效果。Alert 组件支持透明背景的轮廓样式，仅保留边框和文字颜色，减少视觉重量和背景干扰，特别适用于卡片内部展示和需要保持背景简洁的场景，为用户提供清晰的边界定义和轻量化的视觉体验。

::: raw
<IStockShellUiExample src="./feedback/alert/example/AlertOutline.svelte" layout="column"></IStockShellUiExample>
:::

### 虚线边框展示

使用 `dash` 属性实现虚线边框效果。Alert 组件支持虚线样式的边框设计，提供更轻量化的视觉呈现，传达临时性和非正式的信息特征，特别适用于草稿状态、临时通知和可选信息展示场景，为用户提供灵活的视觉层次和友好的交互提示体验。

::: raw
<IStockShellUiExample src="./feedback/alert/example/AlertDash.svelte" layout="column"></IStockShellUiExample>
:::

### 响应式布局展示

使用响应式CSS类实现自适应布局。Alert 组件支持垂直和水平布局的自动切换，内容区域具备弹性伸缩能力，按钮组支持自动换行适配，特别适用于跨设备兼容和复杂内容展示场景，为用户在不同屏幕尺寸下提供最优的信息布局和交互体验。

::: raw
<IStockShellUiExample src="./feedback/alert/example/AlertResponsive.svelte"></IStockShellUiExample>
:::

### 自定义内容展示

使用默认插槽实现复杂内容定制。Alert 组件支持标题与描述的分层信息展示，集成自定义操作按钮和图标元素，提供灵活的内容布局结构，特别适用于需要丰富交互和详细信息展示的场景，让开发者能够创建功能完整的通知界面和操作引导体验。

::: raw
<IStockShellUiExample src="./feedback/alert/example/AlertTitleAndDescription.svelte"></IStockShellUiExample>
:::

## API 参考

### Alert 属性

| 属性名        | 类型                      | 默认值  | 说明                                       |
| ------------- | ------------------------- | ------- | ------------------------------------------ |
| `type`        | [`AlertType`](#alerttype) | -       | 警告提示的语义类型，决定颜色主题和默认图标 |
| `title`       | `string`                  | -       | 警告提示的标题文本，显示在内容区域顶部     |
| `description` | `string`                  | -       | 警告提示的详细描述，显示在标题下方         |
| `soft`        | `boolean`                 | `false` | 是否使用柔和样式，较浅背景色和柔和视觉效果 |
| `outline`     | `boolean`                 | `false` | 是否使用轮廓样式，仅显示边框和文字         |
| `dash`        | `boolean`                 | `false` | 是否使用虚线边框样式，替代实线边框         |
| `class`       | `string`                  | `''`    | 自定义CSS类名                              |

### 代码片段插入位置

- `children`：

```svelte
<div class="alert">
  <!-- ...code -->
  {@render children?.()}
  <!-- ...code -->
</div>
```

### 事件

`Alert`继承所有原生HTML div元素事件，如：

- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件
- `keydown` - 键盘按下事件
- `keyup` - 键盘释放事件

### 类型定义

#### AlertType

```typescript
// 警告提示类型
type AlertType = 'info' | 'success' | 'warning' | 'error';
```

## 设计指南

### 类型使用建议

- **Info（信息）**：系统通知、帮助说明、一般性信息提示
- **Success（成功）**：操作成功、保存完成、任务完成等正面反馈
- **Warning（警告）**：需要用户注意但不危险的提醒信息
- **Error（错误）**：操作失败、验证错误、系统错误等负面反馈

### 样式变体选择

- **默认样式**：标准的警告提示，适用于大多数场景
- **柔和样式（soft）**：视觉冲击较小，适合频繁出现的提示
- **轮廓样式（outline）**：简洁的边框样式，适合复杂背景
- **虚线样式（dash）**：临时性、草稿状态的提示信息

### 内容组织原则

- **标题简洁**：使用简短有力的标题概括主要信息
- **描述详细**：在描述中提供具体的操作建议或详细说明
- **层次清晰**：通过标题和描述建立清晰的信息层次
- **行动导向**：在适当时候提供明确的下一步操作指引

### 无障碍支持

- 使用语义化的 `role="alert"` 属性支持屏幕阅读器
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 提供适当的文本描述，不仅依赖颜色传达信息
- 支持键盘导航和焦点管理
- 为图标提供替代文本说明

## 最佳实践

### 内容编写

1. **明确性**：使用清晰、具体的语言描述问题或状态
2. **简洁性**：避免冗长的文本，突出关键信息
3. **一致性**：在同一应用中保持提示信息的语调和格式一致
4. **可操作性**：在错误提示中提供解决方案或下一步操作

### 视觉设计

1. **适度使用**：避免在页面中同时显示过多警告提示
2. **位置合理**：将提示放置在相关内容附近
3. **时机恰当**：在合适的时机显示和隐藏提示
4. **响应式**：确保在不同设备上都有良好的显示效果

### 交互设计

1. **自动消失**：对于成功类提示，考虑设置自动消失时间
2. **手动关闭**：为重要提示提供手动关闭功能
3. **状态管理**：合理管理提示的显示和隐藏状态
4. **防止重复**：避免相同提示的重复显示

## 常见问题

### Q: 如何自定义警告提示的样式？

A: 可以通过 `class` 属性添加自定义CSS类，或使用CSS变量覆盖默认样式：

```svelte
<ShAlert class="custom-alert" type="info" title="自定义样式" />
```

```css
.custom-alert {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### Q: 如何实现警告提示的自动消失？

A: 可以使用定时器控制组件的显示状态：

```svelte
<script>
  let showAlert = $state(true);

  function autoHide() {
    setTimeout(() => {
      showAlert = false;
    }, 3000);
  }

  onMount(autoHide);
</script>

{#if showAlert}
  <ShAlert type="success" title="操作成功" description="数据已保存" />
{/if}
```

### Q: 如何在警告提示中添加操作按钮？

A: 使用默认插槽可以完全自定义内容，包括添加按钮：

```svelte
<ShAlert type="warning">
  <div class="flex items-center justify-between w-full">
    <div>
      <h3 class="font-bold">确认删除</h3>
      <p>此操作不可撤销，请确认是否继续？</p>
    </div>
    <div class="flex gap-2">
      <button class="btn btn-sm">取消</button>
      <button class="btn btn-sm btn-error">删除</button>
    </div>
  </div>
</ShAlert>
```

### Q: 如何根据不同的错误类型显示不同的图标？

A: 组件会根据 `type` 属性自动选择合适的图标。如需自定义图标，可以使用插槽：

```svelte
<ShAlert type="error">
  <ShIcon name="custom-error" size="xl" class="text-error" />
  <div>
    <h3 class="font-bold">自定义错误</h3>
    <p>使用自定义图标的错误提示</p>
  </div>
</ShAlert>
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
