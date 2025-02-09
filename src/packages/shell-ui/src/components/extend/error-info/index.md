---
title: ErrorInfo 错误信息组件
description: 用于页面错误信息展示，支持错误堆栈展示、状态图标、操作按钮等功能，提供清晰的异常反馈和问题诊断能力。
keywords: [错误信息组件,异常反馈UI,错误处理,Svelte错误展示,ErrorInfo API]
editLink: false
outline: [2, 3]
---

## ErrorInfo 错误信息组件<Badge type="tip">shell</Badge>

**提供标准化的错误信息展示方案。**

## 使用场景
- 接口请求异常时的全局提示
- 开发环境的错误堆栈展示
- 需要引导用户进行错误恢复时

## 功能特性
- 支持错误标题(title)和友好消息(description)分离
- 可以显示完整堆栈信息

## 示例演示
<IStockShellUiExample src="./example/ErrorInfoDefault.svelte" layout="auto"></IStockShellUiExample>

## API 参考
### 属性说明
ErrorInfo组件属性继承`ShText`组件属性。

| 参数       | 说明       | 类型                                                                                             | 默认值 |
|----------|----------|------------------------------------------------------------------------------------------------|-----|
| title    | 错误信息标题   | string |     |
| description | 错误信息描述   | string |     |
| stack    | 错误信息堆栈信息 | string[] | []  |
