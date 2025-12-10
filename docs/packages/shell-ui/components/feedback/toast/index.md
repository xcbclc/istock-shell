---
title: Toast 轻提示组件 | IStock Shell UI
description: Toast轻提示组件提供强大的消息反馈功能，支持9种位置布局（上中下×左中右）、多种Alert类型集成、自定义内容渲染、淡入淡出过渡动画等特性，基于固定定位设计，适用于操作反馈、消息通知、状态提示、用户引导等各种反馈场景。
keywords:
  [
    Toast轻提示组件,
    消息提示组件,
    Svelte Toast,
    反馈组件,
    消息通知,
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

# Toast 轻提示组件

轻提示组件是用户界面中重要的反馈组件，用于在不打断用户操作的情况下提供即时的状态反馈和消息通知。IStock Shell UI 的 Toast 组件基于固定定位设计，提供了灵活的位置配置和丰富的内容展示选项，满足各种消息提示需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShToast } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的轻提示用法，适用于大多数场景：

```svelte
<script>
  import { ShToast } from '@istock-shell/ui';

  const alerts = [
    { message: '操作成功！', type: 'success' },
    { message: '请注意检查输入', type: 'warning' },
  ];
</script>

<ShToast {alerts} />
```

## 组件特性

- 🎯 **灵活定位**：支持9种位置布局（上中下×左中右），精确控制提示位置
- 🎨 **Alert集成**：完全集成Alert组件特性，支持多种类型和样式变体
- 🎭 **内容灵活**：支持Alert数组渲染和自定义内容插槽两种模式
- ✨ **过渡动画**：内置淡入淡出过渡效果，提供流畅的用户体验
- 🔧 **高度定制**：支持自定义样式类名和原生div属性透传
- ♿ **无障碍友好**：基于语义化HTML结构，支持屏幕阅读器和键盘导航

## 使用场景

| 场景         | 推荐配置                                    | 说明                                     |
| ------------ | ------------------------------------------- | ---------------------------------------- |
| 操作反馈     | `vertical="top"` + `horizontal="end"`       | 表单提交、数据保存等操作的成功/失败反馈  |
| 系统通知     | `vertical="top"` + `horizontal="center"`    | 系统消息、公告通知等重要信息提示         |
| 错误提示     | `vertical="top"` + `horizontal="start"`     | 表单验证错误、操作失败等错误信息展示     |
| 状态更新     | `vertical="bottom"` + `horizontal="end"`    | 数据同步、连接状态等实时状态更新         |
| 用户引导     | `vertical="middle"` + `horizontal="center"` | 功能介绍、操作提示等用户引导信息         |
| 多消息队列   | 固定位置 + 多个alerts                       | 批量操作结果、消息列表等场景             |
| 临时提示     | 任意位置 + 自定义内容                       | 临时性的提示信息、快捷操作反馈           |
| 全屏遮罩提示 | `vertical="middle"` + `horizontal="center"` | 重要通知、确认对话框等需要用户关注的信息 |

## 示例演示

### 基础轻提示配置

通过 `alerts` 属性驱动的消息提示展示。Toast 组件支持 `message` 文本内容配置，内置 `type` 类型样式（info/success/warning/error），默认低部居右显示，提供轻量级的用户反馈体验，适用于操作结果通知、系统消息推送和状态变更提醒场景。

::: raw
<IStockShellUiExample src="./feedback/toast/example/ToastDefault.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
:::

### 顶部左侧位置配置

通过 `horizontal="start"` 和 `vertical="top"` 实现顶部左侧显示。Toast 组件支持左上角位置展示，提供多消息堆叠展示能力，保持消息的时序性和可读性，适用于多任务进度通知、批量操作反馈和需要同时展示多条消息的场景。

::: raw
<IStockShellUiExample src="./feedback/toast/example/ToastTopStart.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
:::

### 顶部居中位置配置

通过 `horizontal="center"` 和 `vertical="top"` 实现顶部居中显示。Toast 组件默认采用顶部居中布局，提供标准的消息展示位置，确保信息的即时可见性和用户关注度，适用于全局通知消息、系统状态更新和需要优先展示的重要信息场景。

::: raw
<IStockShellUiExample src="./feedback/toast/example/ToastTopCenter.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
:::

### 顶部右侧位置配置

通过 `horizontal="end"` 和 `vertical="top"` 实现顶部右侧显示。Toast 组件支持右上角位置展示，提供经典的通知消息布局，符合用户对系统通知的视觉预期，适用于系统级通知、应用状态提醒和需要持续可见的消息展示场景。

::: raw
<IStockShellUiExample src="./feedback/toast/example/ToastTopEnd.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
:::

### 中部左侧位置配置

通过 `horizontal="start"` 和 `vertical="middle"` 实现中部左侧显示。Toast 组件支持左侧中央位置展示，提供区域性的信息关联展示，保持与左侧内容的视觉连贯性，适用于侧边导航反馈、区域功能提示和与左侧布局相关的消息展示场景。

::: raw
<IStockShellUiExample src="./feedback/toast/example/ToastStartMiddle.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
:::

### 中部居中位置配置

通过 `horizontal="center"` 和 `vertical="middle"` 实现中部居中显示。Toast 组件支持屏幕中央位置展示，提供最强的视觉聚焦效果，确保用户注意力集中，适用于重要通知提醒、关键操作确认和需要用户立即关注的消息展示场景。

::: raw
<IStockShellUiExample src="./feedback/toast/example/ToastCenterMiddle.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
:::

### 中部右侧位置配置

通过 `horizontal="end"` 和 `vertical="middle"` 实现中部右侧显示。Toast 组件支持侧边中央位置展示，平衡视觉注意力和界面干扰，提供适中的信息优先级，适用于辅助功能提示、侧边栏操作反馈和需要持续可见的状态信息展示场景。

::: raw
<IStockShellUiExample src="./feedback/toast/example/ToastEndMiddle.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
:::

### 底部左侧位置配置

通过 `horizontal="start"` 和 `vertical="bottom"` 实现底部左侧显示。Toast 组件支持左下角位置展示，避免干扰主要内容阅读流程，提供温和的信息提醒方式，适用于进度更新通知、后台处理状态和不打断用户操作的消息展示场景。

::: raw
<IStockShellUiExample src="./feedback/toast/example/ToastStartBottom.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
:::

### 底部居中位置配置

通过 `horizontal="center"` 和 `vertical="bottom"` 实现底部居中显示。Toast 组件支持精确的位置控制，底部居中布局不遮挡主要内容区域，提供清晰的视觉层次，适用于操作反馈确认、表单提交结果和用户行为响应的消息展示场景。

::: raw
<IStockShellUiExample src="./feedback/toast/example/ToastCenterBottom.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
:::

### 底部右侧位置配置

通过 `horizontal="end"` 和 `vertical="bottom"` 实现底部右侧显示。Toast 组件支持边角位置展示，提供低干扰的信息呈现方式，保持界面整洁性，适用于次要信息通知、后台任务状态和不影响主流程的辅助消息展示场景。

::: raw
<IStockShellUiExample src="./feedback/toast/example/ToastEndBottom.svelte" demoStyle="min-height:300px"></IStockShellUiExample>
:::

## API 参考

### 属性说明

| 属性名       | 类型                                  | 默认值     | 说明                                            |
| ------------ | ------------------------------------- | ---------- | ----------------------------------------------- |
| `horizontal` | [`ToastHorizontal`](#toasthorizontal) | `'end'`    | 水平位置配置，控制Toast在屏幕水平方向的显示位置 |
| `vertical`   | [`ToastVertical`](#toastvertical)     | `'bottom'` | 垂直位置配置，控制Toast在屏幕垂直方向的显示位置 |
| `alerts`     | [`ToastAlertItem[]`](#toastalertitem) | `[]`       | 提示项列表，包含多个需要显示的消息提示          |
| `class`      | `string`                              | -          | 自定义CSS类名                                   |

### 代码片段插入位置

- `children`：

```svelte
<div class="toast">
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</div>
```

### 事件

`Toast`继承所有原生 HTML div 元素事件，如：

- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

### 类型定义

#### ToastHorizontal

```typescript
// Toast水平位置类型
type ToastHorizontal = 'start' | 'center' | 'end';
```

#### ToastVertical

```typescript
// Toast垂直位置类型
type ToastVertical = 'top' | 'middle' | 'bottom';
```

#### ToastAlertItem

```typescript
// Toast提示项接口
interface ToastAlertItem extends AlertProps {
  /** 提示消息内容，显示给用户的文本信息 */
  message: string;
}
```

## 设计指南

### 位置选择建议

- **右上角（top + end）**：最常用的位置，适用于操作反馈和通知
- **顶部居中（top + center）**：重要系统消息、全局通知
- **左上角（top + start）**：错误提示、警告信息
- **右下角（bottom + end）**：状态更新、后台任务完成提示
- **底部居中（bottom + center）**：移动端友好的提示位置
- **屏幕中央（middle + center）**：重要通知、用户引导
- **左侧中间（middle + start）**：侧边栏相关的提示
- **右侧中间（middle + end）**：内容区域相关的提示

### 内容设计原则

- **简洁明了**：提示文本应简短、清晰，避免冗长描述
- **语义化表达**：使用有意义的动词和状态描述
- **一致性**：同类型操作使用一致的提示文案
- **国际化支持**：考虑多语言环境下的文本长度和排版

### 视觉层次

- **Alert类型**：合理使用不同的Alert类型表达信息重要性
- **位置层次**：重要信息使用更显眼的位置
- **动画效果**：利用内置的淡入淡出效果提升用户体验
- **多消息管理**：合理控制同时显示的消息数量

### 无障碍支持

- 基于语义化的HTML结构（div容器）
- 支持屏幕阅读器识别提示内容
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 提供适当的 `aria-label` 属性描述提示状态
- 支持键盘导航和焦点管理

## 最佳实践

### 内容管理

1. **消息去重**：避免显示重复的提示消息
2. **时效控制**：合理设置消息的显示时长
3. **优先级管理**：重要消息优先显示，次要消息可以排队
4. **批量处理**：多个相似操作的结果可以合并显示

### 用户体验

1. **即时反馈**：操作触发后立即显示相应的提示
2. **状态同步**：确保提示内容与实际操作状态同步
3. **非阻塞性**：提示不应阻碍用户的正常操作流程
4. **可关闭性**：为长时间显示的提示提供关闭选项

### 性能优化

1. **合理使用**：避免在页面中同时显示过多Toast组件
2. **内存管理**：及时清理不需要的提示消息
3. **动画优化**：确保过渡动画流畅，避免卡顿
4. **响应式适配**：在不同设备上提供合适的显示效果

### 状态管理

1. **全局状态**：对于全局提示使用统一的状态管理
2. **组件状态**：局部提示可以使用组件内部状态
3. **持久化**：重要提示可以考虑持久化存储
4. **错误边界**：设置错误边界防止提示组件异常

## 常见问题

### Q: 如何实现Toast的自动关闭功能？

A: 可以结合Alert组件的关闭功能和状态管理：

```svelte
<script>
  let alerts = $state([
    {
      id: 1,
      message: '可关闭的提示',
      type: 'info',
      onClose: () => removeAlert(1),
    },
  ]);

  function removeAlert(id) {
    alerts = alerts.filter((alert) => alert.id !== id);
  }
</script>

<ShToast {alerts} />
```

### Q: 如何在Toast中添加操作按钮？

A: 可以使用自定义内容模式或Alert组件的操作功能：

```svelte
<ShToast horizontal="center" vertical="top">
  <div class="bg-white p-4 rounded-lg shadow-lg">
    <p>确认删除此项目？</p>
    <div class="flex gap-2 mt-2">
      <button class="btn btn-sm btn-error">删除</button>
      <button class="btn btn-sm btn-ghost">取消</button>
    </div>
  </div>
</ShToast>
```

### Q: 如何实现多个Toast的堆叠显示？

A: 使用多个Toast组件或在alerts数组中管理多个消息：

```svelte
<script>
  const alerts = [
    { message: '第一条消息', type: 'info' },
    { message: '第二条消息', type: 'success' },
    { message: '第三条消息', type: 'warning' },
  ];
</script>

<!-- 消息会自动堆叠显示 -->
<ShToast {alerts} vertical="top" horizontal="end" />
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
