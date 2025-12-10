---
title: Icon 图标组件 | IStock Shell UI
description: Icon图标组件提供丰富的SVG图标库和灵活的配置选项，支持20+内置图标、8种主题色彩、5种尺寸规格、自定义图标内容、数值尺寸设置等特性，基于Tailwind CSS构建，适用于按钮装饰、状态指示、导航菜单、内容标识等各种界面场景。
keywords:
  [
    Icon图标组件,
    SVG图标库,
    Svelte图标,
    图标系统,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式图标,
    动态图标加载,
    自定义图标,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# Icon 图标组件 <Badge type="tip">shell</Badge>

图标是用户界面中重要的视觉元素，用于传达信息、指示状态、装饰内容和引导用户操作。IStock Shell UI 的 Icon 组件基于 SVG 技术构建，提供了丰富的内置图标库和灵活的配置选项，支持动态加载、主题定制和响应式设计，满足各种界面设计需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShIcon } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的图标用法，通过name属性使用内置图标：

```svelte
<script>
  import { ShIcon } from '@istock-shell/ui';
</script>

<ShIcon name="email" />
```

## 组件特性

- 🎨 **丰富图标库**：20+精心设计的内置SVG图标，覆盖常用场景
- 🎭 **多种颜色**：8种预设主题色彩（primary、secondary、accent、neutral、info、success、warning、error）
- 📏 **灵活尺寸**：5种预设尺寸（xs、sm、md、lg、xl）或自定义数值尺寸（像素）
- 🔧 **自定义内容**：支持通过插槽自定义SVG图标内容
- 🚀 **动态加载**：基于Vite的import.meta.glob实现SVG文件的按需动态加载
- ♿ **无障碍友好**：基于原生i元素，支持屏幕阅读器和键盘导航

## 使用场景

| 场景       | 推荐配置                        | 说明                            |
| ---------- | ------------------------------- | ------------------------------- |
| 按钮装饰   | `size="sm"` + 主题色            | 按钮内的图标装饰，提升视觉效果  |
| 状态指示   | `color="success/warning/error"` | 表单验证、操作反馈等状态提示    |
| 导航菜单   | `size="md"` + `color="neutral"` | 侧边栏、顶部导航的功能图标      |
| 内容标识   | `size="lg"` + 自定义颜色        | 文章分类、标签标识等内容区分    |
| 操作提示   | `size="xs"` + 辅助色            | 表格操作、列表项操作等微型图标  |
| 品牌展示   | `size="xl"` + 品牌色            | Logo、品牌标识等大尺寸图标展示  |
| 信息图表   | 数值尺寸 + 多种颜色             | 数据可视化、图表中的图标元素    |
| 自定义场景 | 插槽内容 + 自定义样式           | 特殊设计需求的自定义SVG图标内容 |

## 示例演示

### 内置图标调用

展示 ShIcon 组件的基础用法，通过 `name` 属性调用预置图标。组件内置了 20+ 常用图标，涵盖基础操作、交互反馈、系统功能等场景，支持语义化命名，便于记忆和使用。适用于按钮、导航栏、状态提示等各种 UI 场景，提供一致的视觉体验。

::: raw
<IStockShellUiExample src="./extend/icon/example/IconDefault.svelte"></IStockShellUiExample>
:::

### 预定义颜色主题

展示 ShIcon 组件的颜色主题功能，通过 `color` 属性设置图标颜色。组件提供八种语义化颜色主题，包含系统色系（primary/secondary/accent）、状态指示色（info/success/warning/error）和中性色（neutral），支持主题切换和品牌定制。适用于状态反馈、信息分类、视觉引导等场景，提升用户体验和界面可读性。

::: raw
<IStockShellUiExample src="./extend/icon/example/IconColor.svelte"></IStockShellUiExample>
:::

### 尺寸规格设置

展示 ShIcon 组件的尺寸控制功能，通过 `size` 属性设置图标大小。组件提供五级标准尺寸（xs/sm/md/lg/xl），满足不同场景下的视觉层级需求，默认使用 md 中等尺寸。适用于需要强调视觉层次、适配不同设备显示或与其他元素搭配使用的场景，确保界面布局的协调统一。

::: raw
<IStockShellUiExample src="./extend/icon/example/IconSize.svelte"></IStockShellUiExample>
:::

### 自定义图标集成

展示 ShIcon 组件的自定义图标功能，支持通过插槽方式集成自定义 SVG 图标。组件提供灵活的扩展机制，可直接插入 SVG 代码或引用外部图标资源，保持与内置图标一致的样式和行为。适用于需要使用特定品牌图标、自定义图形或扩展现有图标库的场景，满足个性化定制需求。

::: raw
<IStockShellUiExample src="./extend/icon/example/IconCustom.svelte"></IStockShellUiExample>
:::

## API 参考

### 属性说明

| 属性名  | 类型                                | 默认值 | 说明                                                   |
| ------- | ----------------------------------- | ------ | ------------------------------------------------------ |
| `name`  | `string`                            | `''`   | 图标名称，对应svg文件名，用于动态加载对应的SVG图标文件 |
| `color` | [`IconColor`](#iconcolor)           | -      | 图标颜色主题，控制图标的颜色样式                       |
| `size`  | [`IconSize`](#iconsize) \| `number` | `'md'` | 图标尺寸配置，支持预设尺寸或自定义数值（像素）         |
| `class` | `string`                            | `''`   | 自定义CSS类名                                          |

### 代码片段插入位置

- `children`：

```svelte
<i class="icon">
  <!-- ...code -->
  {@render children()}
  <!-- ...code -->
</i>
```

### 事件

`Icon`继承所有原生 HTML i 元素事件，如：

- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

### 类型定义

#### IconColor

```typescript
// 图标颜色类型
type IconColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error';
```

#### IconSize

```typescript
// 图标尺寸类型
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### IconProps

```typescript
// 图标组件属性接口
interface IconProps extends HTMLAttributes<HTMLElement> {
  /** 图标名称，对应svg文件名，用于动态加载对应的SVG图标文件 */
  name?: string;
  /** 图标颜色主题，控制图标的颜色样式 */
  color?: IconColor;
  /** 图标尺寸配置，支持预设尺寸或自定义数值（像素） */
  size?: IconSize | number;
}
```

## 设计指南

### 颜色使用建议

- **Primary（主要）**：品牌色图标，重要功能标识
- **Secondary（次要）**：辅助功能图标，次要信息提示
- **Success（成功）**：成功状态、正确操作、完成标识
- **Warning（警告）**：警告提示、注意事项、待处理状态
- **Error（错误）**：错误状态、失败操作、危险提示
- **Info（信息）**：信息提示、帮助说明、中性状态
- **Neutral（中性）**：默认图标，无特殊语义的装饰性图标
- **Accent（强调）**：特殊强调、突出显示的图标

### 尺寸选择建议

- **xs（12px）**：表格单元格内、标签内的微型图标
- **sm（14px）**：按钮内、列表项内的小型图标
- **md（16px）**：默认尺寸，适用于大多数内容区域
- **lg（18px）**：标题旁、重要内容区域的大型图标
- **xl（20px）**：页面标题、主要功能区域的超大图标
- **数值尺寸**：特殊设计需求，如24px、32px等自定义尺寸

### 无障碍支持

- 基于原生 i 元素，支持屏幕阅读器
- 提供适当的 `aria-label` 属性描述图标含义
- 确保颜色对比度符合 WCAG 2.0 AA 标准
- 支持键盘导航和焦点管理
- 为装饰性图标添加 `aria-hidden="true"` 属性

## 最佳实践

### 图标选择

1. **语义化**：选择与功能语义匹配的图标
2. **一致性**：在同一应用中保持图标风格的一致性
3. **识别性**：选择用户容易理解和识别的图标
4. **简洁性**：避免过于复杂的图标设计

### 尺寸使用

1. **层次感**：通过不同尺寸建立视觉层次
2. **适配性**：在不同设备上使用合适的尺寸
3. **对齐性**：确保图标与文本基线对齐
4. **间距控制**：合理设置图标与周围元素的间距

### 颜色搭配

1. **主题一致**：与整体设计主题保持一致
2. **对比度**：确保足够的颜色对比度
3. **状态表达**：通过颜色清晰表达不同状态
4. **品牌体现**：在合适场景使用品牌色彩

### 性能优化

1. **按需加载**：利用动态导入减少初始包体积
2. **缓存策略**：合理利用浏览器缓存机制
3. **SVG优化**：确保SVG文件经过优化压缩
4. **避免重复**：复用相同图标避免重复加载

## 常见问题

### Q: 如何添加自定义图标？

A: 有两种方式添加自定义图标：

1. **添加SVG文件**：将SVG文件放入 `./svg/` 目录，通过name属性引用
2. **使用插槽内容**：通过children插槽插入自定义SVG内容

```svelte
<!-- 方式1：添加SVG文件后使用 -->
<ShIcon name="custom-icon" />

<!-- 方式2：使用插槽内容 -->
<ShIcon color="primary">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
</ShIcon>
```

### Q: 如何设置图标的精确尺寸？

A: 可以使用数值类型的size属性设置精确的像素尺寸：

```svelte
<ShIcon name="email" size={24} />
<!-- 24像素 -->
<ShIcon name="user" size={32} />
<!-- 32像素 -->
```

### Q: 图标不显示怎么办？

A: 请检查以下几点：

1. 确认图标名称是否正确（参考内置图标列表）
2. 检查SVG文件是否存在于 `./svg/` 目录
3. 确认构建工具是否正确处理了import.meta.glob
4. 检查控制台是否有相关错误信息

### Q: 如何自定义图标样式？

A: 可以通过以下方式自定义样式：

```svelte
<!-- 使用class属性 -->
<ShIcon name="email" class="custom-icon-style" />

<!-- 使用CSS变量 -->
<ShIcon name="email" style="color: var(--custom-color);" />
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
