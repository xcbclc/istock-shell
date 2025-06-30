---
title: DataList 数据列表组件 | IStock Shell UI
description: DataList数据列表组件基于原生HTML datalist元素构建，为input元素提供预设选项列表和输入建议功能，支持自定义选项内容、动态数据更新、异步搜索等特性，提供完整的类型安全和响应式支持，适用于搜索建议、表单输入、数据筛选等场景。
keywords:
  [
    DataList数据列表,
    输入建议组件,
    Svelte数据列表,
    HTML datalist,
    搜索建议,
    表单输入,
    预设选项,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    数据筛选,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# DataList 数据列表组件 <Badge type="tip">shell</Badge>

数据列表组件是现代表单输入中的重要辅助工具，用于为输入框提供预设选项列表和智能建议功能。IStock Shell UI 的 DataList 组件基于原生 HTML datalist 元素构建，提供了完整的类型安全和响应式支持，支持自定义选项内容和动态数据更新，满足各种输入建议需求。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShDataList, ShDataListOption, ShInput } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的数据列表用法，为输入框提供预设选项：

```svelte
<script>
  import { ShDataList, ShInput } from '@istock-shell/ui';

  const browserOptions = [
    { label: 'Google Chrome', value: 'chrome' },
    { label: 'Mozilla Firefox', value: 'firefox' },
    { label: 'Microsoft Edge', value: 'edge' },
    { label: 'Safari', value: 'safari' },
  ];
</script>

<ShInput list="browsers" placeholder="选择或输入浏览器" />
<ShDataList id="browsers" options={browserOptions} />
```

## 组件特性

- 🎯 **原生实现**：基于原生 HTML datalist 元素，性能优异且兼容性好
- 📝 **预设选项**：支持预设选项列表配置，快速生成标准选项
- 🎨 **自定义渲染**：提供自定义选项内容插槽，支持复杂选项展示
- ⚡ **动态更新**：支持动态选项数据绑定和实时更新
- 🔍 **搜索建议**：与输入框配合实现智能搜索建议功能
- 🎭 **类型安全**：完整的 TypeScript 类型定义，支持泛型值类型
- ♿ **无障碍友好**：基于原生元素，完整支持键盘导航和屏幕阅读器
- 🔧 **灵活配置**：支持混合使用预设选项和自定义选项内容

## 使用场景

| 场景     | 推荐配置                  | 说明                             |
| -------- | ------------------------- | -------------------------------- |
| 搜索建议 | 动态 `options` + 防抖更新 | 实时搜索建议、关键词提示         |
| 表单输入 | 预设 `options` + 自由输入 | 常用选项快速选择，支持自定义输入 |
| 数据筛选 | 分类选项 + 筛选条件       | 数据表格筛选、条件查询           |
| 地址输入 | 地理位置选项 + 自动补全   | 地址选择、位置输入               |
| 标签输入 | 标签选项 + 多选支持       | 文章标签、分类标签输入           |
| 用户选择 | 用户列表 + 头像展示       | @用户功能、协作者选择            |
| 历史记录 | 历史输入 + 时间排序       | 搜索历史、输入历史回显           |
| 配置选项 | 预定义配置 + 自定义配置   | 系统配置、参数设置               |

## 示例演示

<IStockShellUiExample src="./example/DataListDefault.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/DataListCustom.svelte"></IStockShellUiExample>
<IStockShellUiExample src="./example/DataListDynamic.svelte"></IStockShellUiExample>

## API 参考

### DataList API

#### DataList 属性

| 属性名    | 类型                                            | 默认值 | 说明                                            |
| --------- | ----------------------------------------------- | ------ | ----------------------------------------------- |
| `id`      | `string`                                        | -      | 数据列表的唯一标识符，必须与input的list属性对应 |
| `options` | [`DataListOptionProps[]`](#datalistoptionprops) | `[]`   | 预设选项配置列表，用于快速生成标准选项          |
| `class`   | `string`                                        | `''`   | 自定义CSS类名                                   |

#### DataList 代码片段插入位置

- `children`：

```svelte
<datalist {id}>
  {#if children}
    <!-- 自定义内容渲染：优先渲染通过插槽传入的自定义选项内容 -->
    {@render children()}
  {:else}
    <!-- 预设选项渲染：遍历options数组，为每个选项配置创建选项组件 -->
    {#each options as option}
      <ShDataListOption {...option} />
    {/each}
  {/if}
</datalist>
```

#### DataList 事件

`DataList`继承所有原生HTML datalist元素事件，主要包括：

- `input` - 输入事件（通过关联的input元素触发）
- `change` - 值变更事件（通过关联的input元素触发）

### DataListOption API

#### DataListOption 属性

| 属性名  | 类型     | 默认值 | 说明                                     |
| ------- | -------- | ------ | ---------------------------------------- |
| `label` | `string` | -      | 选项标签文本，用于显示给用户的可读文本   |
| `value` | `any`    | -      | 选项值，表单提交时的实际值，支持泛型类型 |
| `class` | `string` | `''`   | 自定义CSS类名                            |

#### DataListOption 代码片段插入位置

- `children`：

```svelte
<option {value}>
  {#if children}
    <!-- 自定义内容渲染：优先渲染通过插槽传入的自定义内容 -->
    {@render children()}
  {:else}
    <!-- 显示标签文本，如果没有则显示值，都没有则显示空字符串 -->
    {label ?? value ?? ''}
  {/if}
</option>
```

#### DataListOption 事件

`DataListOption`继承所有原生HTML option元素事件。

### 类型定义

#### DataListProps

数据列表组件属性接口：

```typescript
interface DataListProps extends HTMLAttributes<HTMLDataListElement> {
  /** 预设选项配置列表，用于快速生成标准选项 */
  options?: DataListOptionProps[];
}
```

#### DataListOptionProps

数据列表选项组件属性接口：

```typescript
interface DataListOptionProps<V = any> extends HTMLAttributes<HTMLOptionElement> {
  /** 选项标签文本，用于显示给用户的可读文本 */
  label?: string;
  /** 选项值，表单提交时的实际值，支持泛型类型 */
  value?: V;
}
```

## 设计指南

### 选项设计原则

- **数量控制**：建议单个数据列表的选项数量不超过10个，避免选择困难
- **内容简洁**：选项文本保持简洁明了，避免过长的描述信息
- **逻辑排序**：按照使用频率、字母顺序或逻辑关系排列选项
- **一致性**：保持同类选项的格式和样式一致性

### 交互设计

- **即时反馈**：用户输入时立即显示匹配的选项
- **模糊匹配**：支持部分匹配和模糊搜索功能
- **键盘导航**：支持方向键选择和回车确认
- **清晰提示**：为用户提供清晰的操作提示和状态反馈

### 性能优化

- **防抖处理**：对于动态选项更新使用防抖机制，避免频繁请求
- **数据缓存**：合理缓存选项数据，减少重复加载
- **懒加载**：大量选项时考虑按需加载策略
- **内存管理**：及时清理不需要的选项数据

### 无障碍支持

- 基于原生 datalist 和 option 元素，完整支持屏幕阅读器
- 提供适当的 `aria-label` 和语义化标签
- 确保键盘导航的完整性和流畅性
- 支持高对比度模式和缩放功能
- 为选项提供描述性的标签文本

## 最佳实践

### 数据组织

1. **选项分类**：对相关选项进行逻辑分组，提升用户体验
2. **数据验证**：确保选项数据的完整性和有效性
3. **默认选项**：为常用场景提供合理的默认选项
4. **动态更新**：根据用户输入动态调整选项列表

### 用户体验

1. **搜索优化**：实现智能搜索算法，提升匹配准确性
2. **历史记录**：保存用户的输入历史，提供便捷的重复输入
3. **错误处理**：优雅处理数据加载失败和网络异常
4. **加载状态**：为异步数据加载提供适当的状态提示

### 性能考虑

1. **防抖策略**：合理设置防抖延迟，平衡响应速度和性能
2. **数据量控制**：限制单次加载的选项数量，避免性能问题
3. **缓存机制**：实现有效的数据缓存策略，减少重复请求
4. **内存优化**：及时清理不需要的数据，避免内存泄漏

### 开发规范

1. **ID唯一性**：确保每个DataList组件都有唯一的ID标识
2. **类型安全**：充分利用TypeScript类型系统，提升代码质量
3. **错误边界**：设置适当的错误边界，防止组件崩溃
4. **测试覆盖**：编写完整的单元测试和集成测试

## 常见问题

### Q: 如何实现动态搜索建议功能？

A: 可以结合输入事件和防抖处理实现动态搜索：

```svelte
<script>
  let options = $state([]);
  let inputValue = $state('');
  let timeout;

  const searchOptions = async (keyword) => {
    const response = await fetch(`/api/search?q=${keyword}`);
    return await response.json();
  };

  $effect(() => {
    clearTimeout(timeout);
    if (inputValue) {
      timeout = setTimeout(async () => {
        options = await searchOptions(inputValue);
      }, 300);
    } else {
      options = [];
    }
  });
</script>

<ShInput list="search-list" bind:value={inputValue} placeholder="输入关键词搜索" />
<ShDataList id="search-list" {options} />
```

### Q: 如何自定义选项的显示内容？

A: 可以使用自定义插槽渲染复杂的选项内容：

```svelte
<ShInput list="custom-list" placeholder="选择用户" />
<ShDataList id="custom-list">
  {#each users as user}
    <ShDataListOption value={user.id}>
      <div class="flex items-center gap-2">
        <img src={user.avatar} alt={user.name} class="w-6 h-6 rounded-full" />
        <span>{user.name}</span>
        <span class="text-sm text-gray-500">{user.email}</span>
      </div>
    </ShDataListOption>
  {/each}
</ShDataList>
```

### Q: DataList组件与Select组件有什么区别？

A: 主要区别在于交互方式和使用场景：

- **DataList**：允许自由输入，提供输入建议，适用于搜索和开放式输入
- **Select**：限制在预定义选项中选择，适用于固定选项的选择场景

### Q: 如何处理大量选项的性能问题？

A: 可以采用以下策略优化性能：

1. **分页加载**：按需加载选项数据
2. **虚拟滚动**：对于大量选项使用虚拟滚动技术
3. **搜索过滤**：通过搜索关键词过滤选项
4. **缓存策略**：合理缓存常用选项数据

### Q: 如何确保DataList的ID唯一性？

A: 建议使用以下方式生成唯一ID：

```svelte
<script>
  import { generateId } from '@istock-shell/ui/utils';

  const listId = generateId('datalist');
</script>

<ShInput list={listId} />
<ShDataList id={listId} {options} />
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
