---
title: ErrorInfo 错误信息组件 | IStock Shell UI
description: ErrorInfo错误信息组件提供标准化的错误信息展示方案，支持错误标题、详细描述和堆栈信息的结构化显示，基于ShText组件构建，提供完整的类型安全和响应式支持，适用于接口异常、开发调试、错误恢复等各种错误处理场景。
keywords: [ErrorInfo错误信息组件, Svelte错误展示, 异常反馈UI, 错误处理组件, 堆栈信息展示, UI组件库, 错误调试, Web组件, 用户界面, UX设计, 错误恢复]
aside: false
editLink: false
outline: [2, 4]
---

# ErrorInfo 错误信息组件 <Badge type="tip">shell</Badge>

错误信息组件是用户界面中重要的反馈元素，用于向用户展示系统异常、操作失败或需要注意的问题信息。IStock Shell UI 的 ErrorInfo 组件提供了标准化的错误信息展示方案，支持结构化的错误内容显示和完整的堆栈信息展示。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShErrorInfo } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的错误信息展示，适用于大多数场景：

```svelte
<script>
  import { ShErrorInfo } from '@istock-shell/ui';
</script>

<ShErrorInfo title="错误标题" description="错误描述信息" />
```

## 组件特性

- 🎯 **结构化展示**：支持错误标题、描述和堆栈信息的分层显示
- 🔍 **堆栈信息**：完整的错误堆栈信息逐行展示，便于开发调试
- 🎨 **统一主题**：使用错误颜色主题（error），保持视觉一致性
- 📝 **灵活内容**：支持仅标题、标题+描述、完整堆栈等多种展示模式
- 🔧 **继承属性**：继承 TextBase 组件的所有样式属性
- ♿ **无障碍友好**：遵循 WCAG 2.0 标准，支持屏幕阅读器

## 使用场景

| 场景类型     | 配置建议                                    | 适用情况                       |
| ------------ | ------------------------------------------- | ------------------------------ |
| 接口异常     | `title` + `description`                    | API请求失败、网络错误等        |
| 开发调试     | `title` + `description` + `stack`          | 开发环境的错误堆栈展示         |
| 用户操作错误 | `title` + `description`                    | 表单验证失败、操作权限不足等   |
| 系统异常     | `title` + `description` + `stack`          | 系统内部错误、运行时异常等     |
| 简单提示     | `title`                                     | 简单的错误提示信息             |
| 404错误      | `title="页面未找到"` + `description`      | 页面不存在、资源丢失等         |
| 权限错误     | `title="访问被拒绝"` + `description`      | 用户权限不足、登录过期等       |
| 数据错误     | `title` + `description`                    | 数据格式错误、数据缺失等       |

## 示例演示

<IStockShellUiExample src="./example/ErrorInfoDefault.svelte" layout="auto"></IStockShellUiExample>

## API 参考

### 属性说明

| 属性名        | 类型                                | 默认值 | 说明                                   |
| ------------- | ----------------------------------- | ------ | -------------------------------------- |
| `title`       | `string`                            | -      | 错误标题，主要错误信息的标题文本       |
| `description` | `string`                            | -      | 错误描述，详细的错误说明信息           |
| `stack`       | `string[]`                          | `[]`   | 错误堆栈信息数组，每个元素代表堆栈一行 |
| `class`       | `string`                            | -      | 自定义CSS类名                          |
| `...`         | [`TextBaseProps`](#textbaseprops)   | -      | 继承 TextBase 组件的所有属性（除tag）  |

### 代码片段插入位置

- `children`：

```svelte
<!-- 错误标题渲染 -->
{#if title}
  <ShText color="error" weight="bold" texts={[{ text: title }]} {...otherProps} />
{/if}

<!-- 错误描述渲染 -->
{#if description}
  <ShText color="error" texts={[{ text: description }]} {...otherProps} />
{/if}

<!-- 错误堆栈信息渲染 -->
{#each stack as line}
  <ShText color="error" texts={[{ text: line }]} {...otherProps} />
{/each}
```

### 事件

继承 TextBase 组件的所有事件。

### 类型定义

#### ErrorProps

```typescript
// 错误信息组件属性接口
interface ErrorProps extends Omit<TextBaseProps, 'tag'> {
  /** 错误标题，主要错误信息的标题文本 */
  title?: string;
  /** 错误描述，详细的错误说明信息 */
  description?: string;
  /** 错误堆栈信息数组，每个元素代表堆栈的一行 */
  stack?: string[];
  /** 自定义CSS类名 */
  class?: string;
}
```

#### TextBaseProps

```typescript
// 继承自 TextBase 组件的属性（除 tag 属性外）
type TextBaseProps = {
  color?: string;
  weight?: string;
  size?: string;
  // ... 其他 TextBase 属性
};
```

## 设计指南

### 错误信息层次

- **标题（Title）**：简洁明了的错误概述，使用粗体样式突出显示
- **描述（Description）**：详细的错误说明，帮助用户理解问题
- **堆栈（Stack）**：技术细节，主要用于开发调试

### 颜色使用

- 统一使用 `error` 颜色主题，确保视觉一致性
- 错误信息应与页面其他内容形成明显对比
- 遵循品牌色彩规范，保持设计统一性

### 内容编写原则

1. **用户友好**：使用通俗易懂的语言，避免技术术语
2. **具体明确**：提供具体的错误原因和解决建议
3. **积极引导**：告诉用户下一步应该怎么做
4. **简洁有效**：避免冗长的错误描述

### 无障碍支持

- 支持屏幕阅读器正确读取错误信息
- 提供适当的语义化标记
- 确保足够的颜色对比度
- 支持键盘导航

## 最佳实践

### 使用建议

1. **分层展示**：根据用户类型选择合适的信息层次
   ```svelte
   <!-- 普通用户：仅显示友好信息 -->
   <ShErrorInfo title="操作失败" description="请检查网络连接后重试" />
   
   <!-- 开发者：显示完整信息 -->
   <ShErrorInfo 
     title="API请求失败" 
     description="服务器返回500错误" 
     stack={errorStack} 
   />
   ```

2. **条件渲染**：根据环境和用户权限显示不同内容
   ```svelte
   <ShErrorInfo 
     title={error.title}
     description={error.description}
     stack={isDev ? error.stack : undefined}
   />
   ```

### 性能优化

1. **堆栈信息优化**：避免显示过长的堆栈信息，影响页面性能
2. **条件渲染**：仅在需要时渲染堆栈信息
3. **内容截断**：对于过长的错误信息进行适当截断

### 用户体验

1. **及时反馈**：在错误发生时立即显示错误信息
2. **清晰指引**：提供明确的解决方案或下一步操作
3. **情感化设计**：使用合适的语调，避免让用户感到挫败
4. **状态管理**：合理管理错误状态的显示和隐藏

### 开发规范

1. **错误分类**：建立统一的错误分类和编码规范
2. **国际化支持**：为错误信息提供多语言支持
3. **日志记录**：重要错误信息应同时记录到日志系统
4. **测试覆盖**：确保各种错误场景都有对应的测试用例

## 常见问题

### Q: 如何自定义错误信息的样式？

A: 可以通过 `class` 属性添加自定义CSS类，或者使用继承自 TextBase 的样式属性（如 `color`、`weight`、`size` 等）。

### Q: 错误堆栈信息过长怎么处理？

A: 建议在生产环境中不显示堆栈信息，或者对堆栈信息进行截断处理。可以通过条件判断来控制堆栈的显示。

### Q: 如何实现错误信息的国际化？

A: 可以使用 Svelte 的国际化库（如 svelte-i18n），将错误信息的 `title` 和 `description` 替换为对应的翻译函数调用。

### Q: 组件支持哪些 TextBase 属性？

A: 组件继承 TextBase 的所有属性（除了 `tag` 属性），包括颜色、字重、尺寸等样式属性，这些属性将应用到所有错误信息文本上。

### Q: 如何处理异步错误？

A: 建议结合状态管理，在异步操作的 catch 块中设置错误状态，然后通过响应式变量控制 ErrorInfo 组件的显示。

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
