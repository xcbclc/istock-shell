---
title: Empty 空状态组件 | IStock Shell UI
description: Empty空状态组件提供标准化的空状态解决方案，支持多种预设图标、自定义文本和完全自定义内容渲染，基于Tailwind CSS构建，适用于数据为空、搜索无结果、内容加载失败等各种空状态场景。
keywords:
  [
    Empty空状态组件,
    空状态展示,
    Svelte空状态,
    数据占位组件,
    无数据展示,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式空状态,
    状态反馈,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Empty 空状态组件 <Badge type="tip">shell</Badge>

空状态组件是用户界面中重要的状态反馈组件，用于在数据为空、搜索无结果或内容加载失败时向用户提供友好的视觉反馈。IStock Shell UI 的 Empty 组件基于 Tailwind CSS 构建，提供了标准化的空状态解决方案和灵活的自定义选项，满足各种空状态展示需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShEmpty } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的空状态用法，适用于大多数场景：

```svelte
<script>
  import { ShEmpty } from '@istock-shell/ui';
</script>

<ShEmpty />
```

## 组件特性

- 🎨 **多种图标类型**：支持 empty、info 等预设图标类型，满足不同场景需求
- 📝 **自定义文本**：灵活配置空状态提示文字，支持多语言和个性化文案
- 🎭 **完全自定义**：支持通过插槽完全自定义内容，实现复杂的空状态布局
- 📱 **响应式设计**：基于 Tailwind CSS 的响应式布局，适配各种设备
- 🔧 **类型安全**：完整的 TypeScript 类型定义，提供开发时的类型检查
- ♿ **无障碍友好**：符合 WCAG 2.0 标准，支持键盘导航和屏幕阅读器
- 🏷️ **样式继承**：继承所有原生 div 元素属性和事件，易于集成

## 使用场景

| 场景       | 推荐配置                    | 说明                               |
| ---------- | --------------------------- | ---------------------------------- |
| 数据列表   | `name="empty"` + 自定义文本 | 列表或表格暂无数据时的占位显示     |
| 搜索结果   | `name="empty"` + 搜索提示   | 搜索或过滤操作无结果时的友好提示   |
| 信息提示   | `name="info"` + 说明文案    | 信息说明、操作指引等提示性空状态   |
| 错误状态   | `name="info"` + 错误提示    | 网络错误或数据获取失败的友好提示   |
| 引导操作   | 自定义内容 + 操作按钮       | 引导用户开始使用功能的提示界面     |
| 内容占位   | `name="empty"` + 加载提示   | 内容正在加载前的占位状态           |
| 状态反馈   | 根据状态选择合适配置        | 各种业务场景下的空状态反馈         |
| 自定义场景 | 使用插槽完全自定义          | 复杂布局或特殊设计需求的空状态展示 |

## 示例演示

### 基础空状态展示

展示最基本的空状态组件用法，使用默认配置快速创建标准空状态。组件内置默认的占位图标和"暂无数据"文案，无需任何配置即可使用。提供统一的视觉风格和用户体验，适用于数据列表为空、搜索无结果等常见空状态场景。

::: raw
<IStockShellUiExample src="./extend/empty/example/EmptyDefault.svelte" layout="auto"></IStockShellUiExample>
:::

### 自定义空状态配置

展示如何通过子内容插槽完全自定义空状态的内容和样式。支持使用 `ShIcon` 组件自定义图标类型和尺寸，配合 `ShText` 组件定制文本内容和样式。通过 `class` 属性控制主题颜色和整体样式，提供高度灵活的定制能力。适用于错误提示、特殊状态反馈等需要个性化展示的场景。

::: raw
<IStockShellUiExample src="./extend/empty/example/EmptyCustomize.svelte" layout="auto"></IStockShellUiExample>
:::

## API 参考

### 属性说明

| 属性名     | 类型                      | 默认值       | 说明                             |
| ---------- | ------------------------- | ------------ | -------------------------------- |
| `name`     | [`EmptyName`](#emptyname) | `'empty'`    | 图标名称，控制显示的图标类型     |
| `text`     | `string`                  | `'暂无数据'` | 显示文本内容，空状态的提示文字   |
| `class`    | `string`                  | -            | 自定义CSS类名                    |
| `children` | `Snippet`                 | -            | 子内容插槽，用于自定义空状态内容 |

### 代码片段插入位置

- `children`：

```svelte
<div class="empty gap-2 p-10">
  {#if children}
    {@render children()}
  {:else}
    <!-- ...默认内容 -->
  {/if}
</div>
```

### 事件

继承所有原生HTML div元素事件，如：

- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

### 类型定义

#### EmptyName

```typescript
// 空状态图标类型
type EmptyName = 'empty' | 'info';
```

#### EmptyProps

```typescript
// 空状态组件属性接口
interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  /** 图标名称，控制显示的图标类型，默认为 'empty' */
  name?: EmptyName;
  /** 显示文本内容，空状态的提示文字，默认为 '暂无数据' */
  text?: string;
  /** 自定义CSS类名 */
  class?: string;
}
```

## 设计指南

### 图标选择建议

- **Empty（空状态）**：适用于数据为空、列表无内容等常规空状态场景
- **Info（信息）**：适用于信息提示、说明性的空状态场景
- **自定义图标**：通过插槽可以使用任意图标或自定义内容

### 文案设计原则

- **简洁明了**：使用简短、清晰的文案描述当前状态
- **引导性**：适当提供下一步操作的引导信息
- **友好语调**：使用友好、积极的语调，避免负面表达
- **场景化**：根据具体业务场景定制合适的提示文案
- **国际化**：考虑多语言环境下的文本长度和表达习惯

### 布局设计规范

- **居中对齐**：图标和文字采用垂直居中对齐
- **合适间距**：图标与文字之间保持适当的间距（默认 gap-2）
- **响应式**：在不同屏幕尺寸下保持良好的显示效果
- **一致性**：在同一应用中保持空状态样式的一致性
- **内边距**：提供合适的内边距确保视觉舒适度

### 无障碍支持

- 基于原生 div 元素，支持键盘导航和屏幕阅读器
- 提供适当的 `aria-label` 和语义化内容
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 使用语义化的HTML结构和标签
- 为交互元素提供清晰的焦点指示器

## 最佳实践

### 使用建议

```svelte
<!-- ✅ 推荐：根据场景选择合适的图标和文案 -->
<ShEmpty name="empty" text="暂无商品数据" />
<ShEmpty name="info" text="请先选择筛选条件" />

<!-- ✅ 推荐：自定义内容提供更丰富的交互 -->
<ShEmpty>
  <ShIcon size={48} name="search" />
  <ShText size="sm" texts={[{ text: '暂无搜索结果' }]} />
  <button class="btn btn-primary mt-4">重新搜索</button>
</ShEmpty>

<!-- ✅ 推荐：结合条件渲染使用 -->
{#if loading}
  <ShLoading />
{:else if error}
  <ShEmpty name="info" text="加载失败，请重试" />
{:else if items.length === 0}
  <ShEmpty text="暂无数据" />
{:else}
  <!-- 数据列表 -->
{/if}

<!-- ❌ 避免：文案过于简单或不明确 -->
<ShEmpty text="无" />

<!-- ❌ 避免：在有数据时显示空状态 -->
{#if items.length > 0}
  <ShEmpty />
{/if}
```

### 性能优化

1. **条件渲染**：只在真正需要时渲染空状态组件
2. **图标优化**：使用矢量图标确保在不同分辨率下的清晰度
3. **样式复用**：利用组件的默认样式，减少自定义CSS
4. **内容缓存**：对于静态的空状态内容，可以考虑缓存策略

### 用户体验

1. **及时反馈**：在数据加载失败或为空时立即显示空状态
2. **操作引导**：提供明确的下一步操作指引
3. **视觉层次**：通过图标和文字的层次关系引导用户注意力
4. **情感化设计**：使用友好的图标和文案减少用户的挫败感
5. **状态区分**：明确区分加载中、加载失败、数据为空等不同状态

### 开发规范

1. **统一管理**：在项目中统一管理空状态的文案和样式
2. **类型安全**：充分利用 TypeScript 类型检查
3. **组件复用**：通过配置参数实现不同场景的复用
4. **测试覆盖**：确保空状态在各种场景下的正确显示
5. **文档维护**：及时更新空状态相关的使用文档

## 常见问题

### Q: 如何自定义空状态的图标？

**A:** 可以通过默认插槽传入自定义内容：

```svelte
<ShEmpty>
  <ShIcon name="custom-icon" size={48} />
  <p>自定义提示文案</p>
</ShEmpty>
```

### Q: 如何在不同场景下显示不同的空状态？

**A:** 根据数据状态条件渲染不同的空状态组件：

```svelte
{#if loading}
  <ShLoading />
{:else if error}
  <ShEmpty name="info" text="加载失败，请重试" />
{:else if searchResults.length === 0 && searchQuery}
  <ShEmpty name="empty" text="未找到相关结果" />
{:else if data.length === 0}
  <ShEmpty text="暂无数据" />
{/if}
```

### Q: 空状态组件支持哪些事件？

**A:** Empty 组件继承了原生 div 元素的所有事件，包括：

- `click` - 点击事件
- `mouseenter` / `mouseleave` - 鼠标进入/离开事件
- `focus` / `blur` - 焦点事件
- 其他原生 DOM 事件

### Q: 如何设置空状态的样式？

**A:** 可以通过多种方式自定义样式：

```svelte
<!-- 通过 class 属性 -->
<ShEmpty class="my-custom-empty" text="自定义样式" />

<!-- 通过 CSS 变量 -->
<ShEmpty style="--empty-text-color: #666;" text="自定义颜色" />

<!-- 通过插槽完全自定义 -->
<ShEmpty>
  <div class="custom-empty-content">
    <!-- 自定义内容 -->
  </div>
</ShEmpty>
```

### Q: 组件的无障碍支持如何？

**A:** 组件提供了良好的无障碍支持：

- 基于语义化的 HTML 结构
- 支持键盘导航和屏幕阅读器
- 建议添加适当的 `aria-label` 属性
- 确保颜色对比度符合 WCAG 标准

### Q: 如何处理空状态的国际化？

**A:** 建议使用国际化库管理文案：

```svelte
<script>
  import { t } from '$lib/i18n';
</script>

<ShEmpty text={$t('common.noData')} />
```

### Q: 空状态组件的性能如何？

**A:** 组件经过性能优化：

- 轻量级实现，无额外依赖
- 支持条件渲染，避免不必要的渲染
- 使用矢量图标，适配不同分辨率
- 样式复用，减少 CSS 体积

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
