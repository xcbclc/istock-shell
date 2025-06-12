---
title: Modal 对话框组件 | IStock Shell UI
description: Modal对话框组件提供强大的模态交互功能，支持多种尺寸规格、自定义内容渲染、操作按钮配置、遮罩层关闭等特性，基于原生HTML dialog元素构建，适用于信息确认、表单提交、详情展示等各种交互场景。
keywords: [Modal对话框组件, Svelte对话框, 模态框, 弹窗组件, 交互反馈, UI组件库, Web组件, 用户界面, UX设计, 响应式对话框]
aside: false
editLink: false
outline: [2, 4]
---

# Modal 对话框组件

对话框是用户界面中重要的模态交互组件，用于展示关键信息、获取用户确认或处理复杂表单。IStock Shell UI 的 Modal 组件基于原生 HTML dialog 元素构建，提供了丰富的配置选项和优秀的用户体验。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShModal } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的对话框用法，适用于大多数场景：

```svelte
<script>
  import { ShModal, ShButton } from '@istock-shell/ui';
  let show = $state(false);
</script>

<ShButton onclick={() => (show = true)}>打开对话框</ShButton>
<ShModal bind:show title="提示" content="这是一个基础对话框" />
```

## 组件特性

- 🎯 **原生基础**：基于 HTML dialog 元素构建，性能优异且语义化
- 📏 **多种尺寸**：支持多种预设尺寸规格，适应不同内容需求
- 🎨 **高度定制**：支持自定义标题、内容、操作按钮和完全自定义内容
- 🖱️ **灵活交互**：支持遮罩层点击关闭、ESC键关闭、右上角关闭按钮
- 📱 **响应式友好**：自动适应不同屏幕尺寸，移动端优化
- ♿ **无障碍支持**：遵循 WCAG 2.0 标准，支持键盘导航和屏幕阅读器
- ⚡ **动画效果**：内置淡入淡出过渡动画，提升用户体验
- 🔧 **TypeScript**：完整的类型安全支持，开发体验优秀

## 使用场景

| 场景       | 推荐配置                                | 说明                           |
| ---------- | --------------------------------------- | ------------------------------ |
| 操作确认   | `title` + `content` + `actions`         | 删除、提交等重要操作的二次确认 |
| 信息展示   | `title` + `content` + `closeButton`     | 展示详细信息、帮助说明等       |
| 表单输入   | 自定义内容 + `size="lg"`                | 复杂表单、数据编辑等           |
| 图片预览   | 自定义内容 + `maskClosable`             | 图片、视频等媒体内容预览       |
| 系统通知   | `title` + `content` + 单个确认按钮      | 系统消息、错误提示等           |
| 快速操作   | `maskClosable` + `closeButton`          | 快速设置、简单选择等           |
| 移动端适配 | `class="sm:modal-middle"` + 响应式配置  | 小屏幕底部显示，大屏幕居中     |
| 重要警告   | `color="error"` 操作按钮 + 禁用遮罩关闭 | 危险操作警告，强制用户选择     |

## 示例演示

<IStockShellUiExample src="./example/ModalDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ModalMaskClosable.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ModalCloseButton.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ModalCustom.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ModalResponsive.svelte"></IStockShellUiExample>

## API 参考

### 属性说明

| 属性名          | 类型                                                  | 默认值  | 说明                         |
| --------------- | ----------------------------------------------------- | ------- | ---------------------------- |
| `show`          | `boolean`                                             | `false` | 对话框显示状态，支持双向绑定 |
| `title`         | `string`                                              | -       | 对话框标题文本               |
| `content`       | `string`                                              | -       | 对话框内容文本               |
| `contentRender` | `() => ReturnType<Snippet<[]>>`                       | -       | 自定义内容渲染函数           |
| `size`          | [`ModalBoxSize`](#modalboxsize)                       | -       | 对话框尺寸规格               |
| `closeButton`   | `boolean`                                             | `false` | 是否显示右上角关闭按钮       |
| `maskClosable`  | `boolean`                                             | `false` | 点击遮罩层是否可关闭         |
| `actions`       | Array<[`ButtonProps`](../button/#属性说明)<'button'>> | `[]`    | 操作按钮配置数组             |
| `onClose`       | `() => void`                                          | -       | 对话框关闭时的回调函数       |
| `class`         | `string`                                              | -       | 自定义CSS类名                |

### 代码片段插入位置

- `children`：

```svelte
<dialog>
  <!-- ...code -->
  {@render children?.()}
  <!-- ...code -->
</dialog>
```

- `contentRender`:

```svelte
<dialog class="modal">
  <div class="modal-box">
    <h3></h3>
    <div>
      {@render contentRender?.()}
    </div>
    <!-- ...code -->
  </div>
</dialog>
```

### 事件

继承所有原生 HTML dialog 元素事件，如：

- `close` - 对话框关闭事件
- `cancel` - 对话框取消事件（ESC键触发）
- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件

### 类型定义

#### ModalBoxSize

```typescript
// 对话框尺寸类型（从主题配置中动态提取）
type ModalBoxSize = keyof ModalBoxVariantConfig['variants']['size'];
```

## 设计指南

### 尺寸选择建议

- **默认尺寸**：适用于大多数信息展示和简单确认场景
- **大尺寸（lg）**：适用于复杂表单、详细信息展示
- **超大尺寸（xl）**：适用于数据表格、图片预览等需要更多空间的内容
- **自定义尺寸**：通过 `class` 属性自定义宽度和高度

### 交互方式选择

- **操作按钮**：适用于需要明确用户选择的场景（确认/取消）
- **关闭按钮**：适用于信息展示类对话框，提供快速关闭方式
- **遮罩关闭**：适用于非关键操作，提供便捷的关闭体验
- **ESC键关闭**：所有对话框都支持，符合用户习惯

### 内容组织原则

1. **标题简洁**：使用简短、明确的标题描述对话框用途
2. **内容清晰**：重要信息突出显示，避免过长的文本
3. **操作明确**：按钮文案要明确表达操作结果
4. **层次分明**：使用合适的视觉层次组织内容

### 无障碍支持

- 所有对话框都支持键盘导航（Tab、Enter、Escape）
- 自动管理焦点：打开时焦点移至对话框，关闭时返回触发元素
- 提供适当的 `aria-label` 和 `role` 属性
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 支持屏幕阅读器的语音提示

## 最佳实践

### 性能优化

1. **懒加载**：对于复杂内容，考虑在对话框打开时才渲染
2. **状态管理**：合理使用 `show` 状态，避免不必要的重渲染
3. **事件处理**：及时清理事件监听器，防止内存泄漏

### 用户体验

1. **响应式设计**：在移动端使用合适的尺寸和布局
2. **加载状态**：对于异步操作，及时显示加载状态
3. **错误处理**：提供清晰的错误信息和恢复方式
4. **一致性**：在同一应用中保持对话框的样式和行为一致

### 开发建议

1. **类型安全**：充分利用 TypeScript 类型定义
2. **组件复用**：将常用的对话框封装为独立组件
3. **状态管理**：使用合适的状态管理方案处理复杂交互
4. **测试覆盖**：编写充分的单元测试和集成测试

## 常见问题

### Q: 如何处理对话框的关闭事件？

A: 使用 `onClose` 回调函数：

```svelte
<ShModal
  bind:show
  title="确认删除"
  content="此操作不可撤销，确定要删除吗？"
  onClose={() => {
    console.log('对话框已关闭');
    // 执行清理操作
  }}
/>
```

### Q: 如何禁用 ESC 键关闭对话框？

A: 监听 `cancel` 事件并阻止默认行为：

```svelte
<ShModal
  bind:show
  title="重要操作"
  content="请完成所有必填项"
  oncancel={(e) => {
    e.preventDefault(); // 阻止 ESC 键关闭
  }}
/>
```

### Q: 如何实现多层对话框？

A: 使用不同的 `z-index` 值和状态管理：

```svelte
<script>
  let showFirst = $state(false);
  let showSecond = $state(false);
</script>

<ShModal bind:show={showFirst} title="第一层对话框">
  <div class="modal-box">
    <p>这是第一层对话框</p>
    <button onclick={() => (showSecond = true)}>打开第二层</button>
  </div>
</ShModal>

<ShModal bind:show={showSecond} class="z-[60]" title="第二层对话框">
  <div class="modal-box">
    <p>这是第二层对话框</p>
  </div>
</ShModal>
```

### Q: 如何实现对话框的动画效果？

A: 使用 CSS 过渡或 Svelte 的 transition 指令：

```svelte
<script>
  import { fade, scale } from 'svelte/transition';
</script>

<ShModal bind:show>
  <div class="modal-box" transition:scale={{ duration: 300 }}>
    <h3>带动画的对话框</h3>
    <p>使用 Svelte transition 实现动画效果</p>
  </div>
</ShModal>
```

### Q: 如何实现对话框的拖拽功能？

A: 结合鼠标事件实现拖拽：

```svelte
<script>
  let isDragging = $state(false);
  let position = $state({ x: 0, y: 0 });

  function handleMouseDown(e) {
    isDragging = true;
    // 拖拽逻辑实现
  }
</script>

<ShModal bind:show>
  <div
    class="modal-box cursor-move"
    style="transform: translate({position.x}px, {position.y}px)"
    onmousedown={handleMouseDown}
  >
    <h3>可拖拽对话框</h3>
    <p>点击标题栏可拖拽移动</p>
  </div>
</ShModal>
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
