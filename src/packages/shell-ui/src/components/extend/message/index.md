---
title: Message 全局消息提示
description: 全局消息提示（Message）组件用于展示操作反馈信息，支持多种提示类型（成功、警告、错误等）和自定义配置，可用于表单提交反馈、操作结果通知等场景。
keywords: [消息提示, Svelte Message, 全局提示, 操作反馈, Toast提示]
aside: false
editLink: false
outline: [2, 3]
---

## Message 全局消息提示

**全局消息提示（Message）是一个轻量级的反馈组件，在页面顶部居中显示，用于展示简短的提示信息。支持多种类型和自动关闭功能。**

## 使用场景

- 操作后需要全局反馈结果时
- 系统主动推送简短消息时
- 表单提交后的状态提示
- 需要用户短暂关注的信息展示

## 功能特性

- 支持4种语义化类型（info/success/warning/error）
- 自动关闭和持续时间控制
- 支持多条消息队列展示
- 提供优雅的过渡动画效果
- 可自定义样式和配置项

## 示例演示

<IStockShellUiExample src="./example/MessageDefault.svelte"></IStockShellUiExample>

## API 参考

### 方法说明

| 方法名              | 说明         | 参数类型                                      | 返回值          |
| ------------------- | ------------ | --------------------------------------------- | --------------- |
| showMessage.alert   | 显示普通提示 | `(message: string, options?: MessageOptions)` | `Promise<void>` |
| showMessage.info    | 显示信息提示 | `(message: string, options?: MessageOptions)` | `Promise<void>` |
| showMessage.success | 显示成功提示 | `(message: string, options?: MessageOptions)` | `Promise<void>` |
| showMessage.warning | 显示警告提示 | `(message: string, options?: MessageOptions)` | `Promise<void>` |
| showMessage.error   | 显示错误提示 | `(message: string, options?: MessageOptions)` | `Promise<void>` |

### 配置项说明

```typescript
export interface MessageProps {
  message: string; // 消息内容
  duration?: number; // 显示持续时间（毫秒）  当为0时禁用自动关闭
  onClose: () => void; // 关闭回调函数
  alertProps?: Partial<AlertProps>; // Alert 组件的可选配置
}
```

### 基础用法

```typescript
// 信息提示
showMessage.info('这是一条信息提示');

// 成功提示
showMessage.success('操作成功！');

// 警告提示
showMessage.warning('请注意这个警告信息');

// 错误提示
showMessage.error('操作失败！');
```

### 自定义配置

```typescript
showMessage.info('自定义配置的消息', {
  duration: 5000, // 显示 5 秒
  alertProps: {
    soft: true, // 使用柔和样式
  },
});
```

### 注意事项

1. ShMessage 组件会全局创建一个消息容器
2. 多个消息会按顺序排列显示
3. 可以通过设置 duration 为 0 来禁用自动关闭
4. 建议消息内容简短明了，避免过长
