---
title: NavList 导航列表组件 | IStock Shell UI
description: NavList导航列表组件提供结构化导航菜单解决方案，支持分组导航、自定义内容、响应式布局等特性，基于语义化HTML构建，适用于门户网站导航、帮助中心、文档分类等各种导航场景。
keywords:
  [
    NavList导航列表,
    导航菜单组件,
    Svelte导航列表,
    分组导航,
    网站导航,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式导航,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# NavList 导航列表组件

导航列表组件是用户界面中重要的导航元素，用于组织和展示结构化的导航菜单。IStock Shell UI 的 NavList 组件基于语义化 HTML 元素构建，提供了灵活的分组配置和自定义选项，满足各种导航展示需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShNavList, ShNavListItem, ShNavListItemDetail } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的导航列表用法，通过数据驱动渲染：

```svelte
<script>
  import { ShNavList } from '@istock-shell/ui';

  const navData = [
    {
      title: '产品',
      items: [
        { text: '功能', href: '/features' },
        { text: '定价', href: '/pricing' },
        { text: '演示', href: '/demo' },
      ],
    },
    {
      title: '支持',
      items: [
        { text: '文档', href: '/docs' },
        { text: '联系我们', href: '/contact' },
      ],
    },
  ];
</script>

<ShNavList list={navData} />
```

## 组件特性

- 🗂️ **分组导航**：支持导航项分组显示，清晰的层次结构
- 🎨 **数据驱动**：基于配置对象驱动，易于维护和动态更新
- 🔧 **高度定制**：支持自定义内容插槽和链接配置
- 🏷️ **语义化HTML**：基于 div、dl、dt、dd 元素构建，SEO友好
- 🎯 **灵活配置**：支持链接属性、打开方式、样式定制
- ♿ **无障碍友好**：遵循 WCAG 2.0 标准，支持键盘导航和屏幕阅读器

## 使用场景

| 场景         | 推荐配置              | 说明                         |
| ------------ | --------------------- | ---------------------------- |
| 门户网站导航 | 多分组 + 外链配置     | 新闻、财经类网站的导航菜单   |
| 帮助中心     | 文档分类 + 内链导航   | 文档分类导航、知识库导航     |
| 产品导航     | 功能分组 + 描述性链接 | 产品功能介绍、服务展示       |
| 友情链接     | 分类链接 + 新窗口打开 | 合作伙伴、相关网站链接       |
| 侧边栏导航   | 层级导航 + 自定义样式 | 管理后台、文档站点侧边栏     |
| 底部导航     | 多列分组 + 响应式布局 | 网站底部的分类导航链接       |
| 移动端菜单   | 简化分组 + 触摸友好   | 移动设备上的导航菜单         |
| 目录导航     | 嵌套结构 + 锚点链接   | 长文档的目录导航、页面内跳转 |

## 示例演示

<IStockShellUiExample src="./example/NavListDefault.svelte" layout="auto"></IStockShellUiExample>

## API 参考

### NavList API

#### NavList 属性

| 属性名  | 类型                                      | 默认值 | 说明                                     |
| ------- | ----------------------------------------- | ------ | ---------------------------------------- |
| `list`  | [`NavListItemProps[]`](#navlistitemprops) | `[]`   | 导航项列表配置，用于数据驱动渲染导航分组 |
| `class` | `string`                                  | `''`   | 自定义CSS类名                            |

#### NavList 代码片段插入位置

- `children`：

```svelte
<div class="nav-list">
  {@render children()}
</div>
```

#### NavList 事件

`NavList`继承所有原生 HTML div 元素事件，如：

- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

### NavListItem API

#### NavListItem 属性

| 属性名  | 类型                                                  | 默认值 | 说明                                         |
| ------- | ----------------------------------------------------- | ------ | -------------------------------------------- |
| `title` | `string`                                              | -      | 分组标题，显示在导航项详情列表上方           |
| `items` | [`NavListItemDetailProps[]`](#navlistitemdetailprops) | `[]`   | 导航项详情列表，用于渲染该分组下的具体导航项 |
| `class` | `string`                                              | `''`   | 自定义CSS类名                                |

#### NavListItem 代码片段插入位置

- `children`：

```svelte
<dl class="flex flex-col gap-2 pt-2 pb-2">
  {@render children()}
</dl>
```

#### NavListItem 事件

`NavListItem`继承所有原生 HTML dl 元素事件，如：

- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `keydown` - 键盘按下事件
- `keyup` - 键盘释放事件

### NavListItemDetail API

#### NavListItemDetail 属性

| 属性名   | 类型                                              | 默认值     | 说明                                     |
| -------- | ------------------------------------------------- | ---------- | ---------------------------------------- |
| `text`   | `string`                                          | -          | 显示文本内容                             |
| `href`   | `string`                                          | -          | 链接地址 URL                             |
| `target` | [`TextTarget`](#texttarget)                       | `'_blank'` | 链接打开方式，如 \_blank、\_self 等      |
| `link`   | [`NavListItemDetailLink`](#navlistitemdetaillink) | `{}`       | 链接配置对象，用于自定义链接的样式和行为 |
| `class`  | `string`                                          | `''`       | 自定义CSS类名                            |

#### NavListItemDetail 代码片段插入位置

- `children`：

```svelte
<dd>
  {@render children()}
</dd>
```

#### NavListItemDetail 事件

`NavListItemDetail`继承所有原生 HTML dd 元素事件，如：

- `click` - 点击事件
- `focus` - 获得焦点事件
- `blur` - 失去焦点事件
- `mouseenter` - 鼠标进入事件
- `mouseleave` - 鼠标离开事件

## 类型定义

### NavListItemProps

```typescript
interface NavListItemProps {
  /** 分组标题 */
  title: string;
  /** 导航项详情列表 */
  items: NavListItemDetailProps[];
}
```

### NavListItemDetailProps

```typescript
interface NavListItemDetailProps {
  /** 显示文本内容 */
  text: string;
  /** 链接地址 URL */
  href: string;
  /** 链接打开方式 */
  target?: TextTarget;
  /** 链接配置对象 */
  link?: NavListItemDetailLink;
}
```

### NavListItemDetailLink

```typescript
interface NavListItemDetailLink {
  /** 链接的自定义属性配置 */
  [key: string]: any;
}
```

### TextTarget

```typescript
type TextTarget = '_blank' | '_self' | '_parent' | '_top' | string;
```

## 设计指南

### 导航结构

- **分组标题**：使用简洁明了的标题描述导航分组
- **导航项**：每个导航项应该有清晰的文本描述和有效的链接
- **层级关系**：保持导航层级的逻辑性和一致性

### 链接行为

- **默认行为**：默认在新窗口打开链接（`target="_blank"`）
- **内部链接**：对于站内链接，建议使用 `target="_self"`
- **外部链接**：对于外部链接，保持默认的新窗口打开行为

### 无障碍支持

- 使用语义化的 HTML 结构（`dl`、`dt`、`dd`）
- 确保所有链接都有明确的文本描述
- 支持键盘导航和屏幕阅读器

### 最佳实践

1. **数据结构**：使用统一的数据结构来管理导航配置
2. **响应式设计**：确保导航在不同设备上的良好显示
3. **性能优化**：避免过深的导航层级，保持良好的用户体验
4. **一致性**：在整个应用中保持导航样式和行为的一致性

## 基础用法

### 简单导航列表

```svelte
<script>
  import { ShNavList } from '@istock/shell-ui';

  const navData = [
    {
      title: '产品中心',
      items: [
        { text: '股票分析', href: '/stocks' },
        { text: '基金投资', href: '/funds' },
        { text: '债券市场', href: '/bonds' },
      ],
    },
    {
      title: '服务支持',
      items: [
        { text: '帮助中心', href: '/help' },
        { text: '联系我们', href: '/contact' },
      ],
    },
  ];
</script>

<ShNavList list={navData} />
```

### 自定义链接行为

```svelte
<script>
  import { ShNavList } from '@istock/shell-ui';

  const navData = [
    {
      title: '快速链接',
      items: [
        {
          text: '内部页面',
          href: '/internal',
          target: '_self',
        },
        {
          text: '外部链接',
          href: 'https://example.com',
          target: '_blank',
        },
      ],
    },
  ];
</script>

<ShNavList list={navData} />
```

### 使用组合组件

```svelte
<script>
  import { ShNavList, ShNavListItem, ShNavListItemDetail } from '@istock/shell-ui';
</script>

<ShNavList>
  <ShNavListItem title="自定义分组" items={[]}>
    <ShNavListItemDetail text="自定义项目1" href="/custom1" />
    <ShNavListItemDetail text="自定义项目2" href="/custom2" target="_self" />
  </ShNavListItem>
</ShNavList>
```

## 常见问题

### 如何自定义导航样式？

可以通过 `class` 属性添加自定义CSS类名：

```svelte
<ShNavList class="custom-nav" list={navData} />
```

### 如何处理动态导航数据？

```svelte
<script>
  import { ShNavList } from '@istock/shell-ui';

  let navData = [];

  // 异步加载导航数据
  async function loadNavData() {
    const response = await fetch('/api/navigation');
    navData = await response.json();
  }

  onMount(loadNavData);
</script>

<ShNavList list={navData} />
```

### 如何实现导航项的点击统计？

```svelte
<script>
  import { ShNavListItemDetail } from '@istock/shell-ui';

  function handleNavClick(event, item) {
    // 发送统计数据
    analytics.track('nav_click', {
      text: item.text,
      href: item.href,
    });
  }
</script>

<ShNavListItemDetail
  text="统计链接"
  href="/analytics"
  on:click={(e) => handleNavClick(e, { text: '统计链接', href: '/analytics' })}
/>
```

## 更新日志

查看 [GitHub Releases](https://github.com/your-org/istock-shell/releases) 了解详细的版本更新信息。
