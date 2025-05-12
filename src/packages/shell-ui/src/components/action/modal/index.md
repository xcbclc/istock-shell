---
title: Modal 对话框组件
description: 对话框（Modal）组件用于展示重要信息或需要用户交互的内容，支持多种配置（遮罩层、关闭按钮、响应式布局等）和自定义内容，适用于表单提交、信息确认等场景。
keywords: [对话框, Svelte Modal, 弹窗组件, 交互反馈, Modal组件]
aside: false
editLink: false
outline: [2, 3]
---

## Modal 对话框组件

**对话框（Modal）是一个用于展示重要信息和获取用户交互的浮层组件。通过遮罩层聚焦用户注意力，支持灵活的内容定制和交互方式。**

## 使用场景

- 需要用户进行重要操作确认时
- 展示详细信息或复杂表单时
- 系统重要通知需要强制用户关注时
- 需要临时中断用户操作获取反馈时

## 功能特性

- 支持遮罩层点击关闭
- 提供右上角关闭按钮
- 可自定义标题和内容
- 支持自定义操作按钮
- 响应式布局适配移动端
- ESC 键快捷关闭

## 示例演示

<IStockShellUiExample src="./example/ModalDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ModalMaskClosable.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ModalCloseButton.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ModalCustom.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/ModalResponsive.svelte"></IStockShellUiExample>

## API 参考

### 属性说明

| 属性名       | 说明                 | 类型                                                  | 默认值  |
| ------------ | -------------------- | ----------------------------------------------------- | ------- |
| show         | 控制对话框显示状态   | `boolean`                                             | `false` |
| title        | 对话框标题           | `string`                                              | -       |
| content      | 对话框内容           | `string`                                              | -       |
| closeButton  | 是否显示关闭按钮     | `boolean`                                             | `false` |
| maskClosable | 点击遮罩层是否可关闭 | `boolean`                                             | `false` |
| actions      | 操作按钮配置         | Array<[`ButtonProps`](../button/#属性说明)<'button'>> | `[]`    |
| onClose      | 关闭时的回调函数     | `() => void`                                          | -       |
