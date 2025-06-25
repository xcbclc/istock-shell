---
title: Message 全局消息提示组件 | IStock Shell UI
description: Message全局消息提示组件提供轻量级的操作反馈功能，支持5种语义化类型（普通、信息、成功、警告、错误）、自动关闭控制、自定义样式配置等特性，基于Toast和Alert组件构建，适用于表单提交反馈、操作结果通知、系统消息推送等各种反馈场景。
keywords:
  [
    Message全局消息提示,
    消息反馈组件,
    Svelte消息提示,
    Toast提示,
    操作反馈,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    全局提示,
    状态反馈,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Message 全局消息提示组件 <Badge type="tip">shell</Badge>

全局消息提示是用户界面中重要的反馈组件，用于在操作完成后向用户提供即时的状态反馈。IStock Shell UI 的 Message 组件基于 Toast 和 Alert 组件构建，在页面顶部居中显示，提供了轻量级且优雅的消息提示解决方案。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { shShowMessage } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的消息提示用法，适用于大多数反馈场景：

```svelte
<script>
  import { shShowMessage } from '@istock-shell/ui';

  function handleSuccess() {
    shShowMessage.success('操作成功！');
  }
</script>

<button onclick={handleSuccess}>触发成功提示</button>
```

## 组件特性

- 🎨 **丰富类型**：5种语义化消息类型（普通、信息、成功、警告、错误）
- ⏰ **时间控制**：支持自定义显示时长和自动关闭功能
- 🎭 **样式变体**：支持柔和（soft）、轮廓（outline）、虚线（dash）等Alert样式
- 📍 **固定定位**：页面顶部居中显示，不影响页面布局
- 🔧 **灵活配置**：支持自定义样式和Alert组件的所有配置选项
- ♿ **无障碍友好**：基于Toast和Alert组件，支持屏幕阅读器和键盘导航

## 使用场景

| 场景         | 推荐配置                    | 说明                           |
| ------------ | --------------------------- | ------------------------------ |
| 表单提交反馈 | `success` 或 `error` 类型   | 表单提交成功或失败的状态反馈   |
| 操作确认     | `info` 类型                 | 操作执行中或需要用户知晓的信息 |
| 警告提醒     | `warning` 类型              | 需要用户注意但不阻断的提醒     |
| 错误通知     | `error` 类型                | 操作失败、系统错误等负面反馈   |
| 成功确认     | `success` 类型              | 保存成功、操作完成等正面反馈   |
| 普通提示     | `alert` 类型                | 一般性提示信息，无特殊语义     |
| 系统消息     | 自定义 `duration` 配置      | 系统推送的重要消息             |
| 临时提示     | 短 `duration` 配置          | 快速消失的轻量级提示           |

## 示例演示

<IStockShellUiExample src="./example/MessageDefault.svelte"></IStockShellUiExample>

## API 参考

### 全局方法

| 方法名                | 说明         | 参数类型                                                | 返回值            |
| --------------------- | ------------ | ------------------------------------------------------- | ----------------- |
| `shShowMessage.alert` | 显示普通提示 | `(message: string, options?: Partial<MessageOptions>)` | `SvelteComponent` |
| `shShowMessage.info`  | 显示信息提示 | `(message: string, options?: Partial<MessageOptions>)` | `SvelteComponent` |
| `shShowMessage.success` | 显示成功提示 | `(message: string, options?: Partial<MessageOptions>)` | `SvelteComponent` |
| `shShowMessage.warning` | 显示警告提示 | `(message: string, options?: Partial<MessageOptions>)` | `SvelteComponent` |
| `shShowMessage.error` | 显示错误提示 | `(message: string, options?: Partial<MessageOptions>)` | `SvelteComponent` |

### Message 组件属性

| 属性名      | 类型                    | 默认值  | 说明                                   |
| ----------- | ----------------------- | ------- | -------------------------------------- |
| `message`   | `string`                | -       | 消息内容文本                           |
| `duration`  | `number`                | `3000`  | 显示持续时间（毫秒），设为0时禁用自动关闭 |
| `onClose`   | `() => void`            | -       | 关闭回调函数                           |
| `alertProps` | `Partial<AlertProps>`   | `{}`    | Alert 组件的配置选项                   |
| `class`     | `string`                | `''`    | 自定义CSS类名                          |

### 事件

`Message`继承所有原生HTML元素事件，主要包括：

- `click` - 点击事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

### 类型定义

#### MessageOptions

```typescript
// 消息配置选项接口
interface MessageOptions extends Partial<AlertProps> {
  message: string; // 消息内容
  duration?: number; // 显示时长（毫秒）
}
```

#### MessageProps

```typescript
// Message 组件属性接口
export interface MessageProps extends Omit<ToastProps, 'alerts'> {
  message: string; // 消息内容
  duration?: number; // 显示持续时间（毫秒）
  onClose: () => void; // 关闭回调函数
  alertProps?: Partial<AlertProps>; // Alert 组件的可选配置
}
```

## 设计指南

### 消息类型使用建议

- **Alert（普通）**：一般性提示信息，无特殊语义含义
- **Info（信息）**：操作执行中或需要用户知晓的信息
- **Success（成功）**：操作成功、保存完成等正面反馈
- **Warning（警告）**：需要用户注意但不阻断操作的提醒
- **Error（错误）**：操作失败、系统错误等负面反馈

### 显示时长建议

- **短消息（1-2秒）**：简单的成功确认、状态更新
- **标准消息（3秒）**：默认时长，适用于大多数场景
- **重要消息（5-8秒）**：需要用户仔细阅读的信息
- **手动关闭（duration: 0）**：错误信息、重要警告等需要用户主动确认

### 无障碍支持

- 基于Toast和Alert组件，支持屏幕阅读器
- 消息出现时会自动获得焦点
- 支持键盘导航和操作
- 提供适当的ARIA属性和语义化标签
- 确保颜色对比度符合WCAG 2.0 AA标准

### 最佳实践

1. **消息内容**：保持简洁明了，避免过长的文本
2. **显示频率**：避免短时间内显示过多消息
3. **类型选择**：根据操作结果选择合适的消息类型
4. **时长设置**：根据消息重要性和内容长度设置合适的显示时长
5. **样式一致**：在同一应用中保持消息样式的一致性
6. **错误处理**：重要错误信息建议设置手动关闭

## 基础用法示例

### 简单消息提示

```typescript
// 信息提示
shShowMessage.info('这是一条信息提示');

// 成功提示
shShowMessage.success('操作成功！');

// 警告提示
shShowMessage.warning('请注意这个警告信息');

// 错误提示
shShowMessage.error('操作失败！');

// 普通提示
shShowMessage.alert('这是一个普通提示');
```

### 自定义配置

```typescript
// 自定义显示时长
shShowMessage.info('自定义配置的消息', {
  duration: 5000, // 显示 5 秒
});

// 自定义样式
shShowMessage.success('操作成功', {
  duration: 2000,
  alertProps: {
    soft: true, // 使用柔和样式
    outline: false, // 不使用轮廓样式
  },
});

// 禁用自动关闭
shShowMessage.error('严重错误，请手动关闭', {
  duration: 0, // 禁用自动关闭
  alertProps: {
    dash: true, // 使用虚线样式
  },
});
```

### 在异步操作中使用

```svelte
<script>
  import { shShowMessage } from '@istock-shell/ui';

  async function handleSubmit() {
    try {
      await submitForm();
      shShowMessage.success('表单提交成功！');
    } catch (error) {
      shShowMessage.error('提交失败：' + error.message);
    }
  }
</script>

<button onclick={handleSubmit}>提交表单</button>
```

## 常见问题

### Q: 如何控制消息的显示位置？

A: Message组件固定在页面顶部居中显示，位置不可自定义。如需其他位置的提示，建议使用Toast组件。

### Q: 多个消息同时显示时如何排列？

A: 多个消息会在同一个容器中垂直排列显示，新消息会添加到容器底部。

### Q: 如何自定义消息样式？

A: 可以通过 `alertProps` 参数传递Alert组件的样式配置，或者使用CSS覆盖默认样式。

### Q: 消息组件支持HTML内容吗？

A: 目前只支持纯文本内容，不支持HTML标签。如需富文本内容，建议直接使用Toast和Alert组件组合。

### Q: 如何在组件卸载时清理消息？

A: 消息组件会自动处理清理逻辑，无需手动清理。每个消息实例在关闭时会自动从DOM中移除。

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
