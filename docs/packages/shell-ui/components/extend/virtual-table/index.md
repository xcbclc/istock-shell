---
title: VirtualTable 虚拟表格组件 | IStock Shell UI
description: VirtualTable虚拟表格组件提供高性能的大数据量表格渲染功能，支持虚拟化滚动、表头固定、自适应行高、可视区间监听等特性，基于虚拟列表技术构建，专为处理万级数据量表格场景优化，适用于数据监控、日志展示、金融数据、实时报表等高性能表格需求。
keywords:
  [
    VirtualTable虚拟表格,
    大数据表格组件,
    Svelte虚拟表格,
    高性能表格,
    虚拟化滚动,
    表头固定,
    数据监控表格,
    UI组件库,
    前端组件,
    Web组件,
    用户界面,
    UX设计,
    响应式表格,
  ]
aside: false
editLink: false
outline: [2, 4]
---

# VirtualTable 虚拟表格组件 <Badge type="tip">shell</Badge>

虚拟表格是专为大数据量场景设计的高性能表格组件，结合虚拟列表与表格渲染技术，仅渲染可视区域内的表格行，大幅提升万级数据量表格的渲染性能和滚动体验。IStock Shell UI 的 VirtualTable 组件基于虚拟化技术构建，提供了完整的表格功能和灵活的配置选项。

## 快速开始

### 安装引入

```bash
npm install @istock-shell/ui
```

```svelte
<script>
  import { ShVirtualTable } from '@istock-shell/ui';
</script>
```

### 基础用法

最简单的虚拟表格用法，适用于大数据量场景：

```svelte
<script>
  import { ShVirtualTable } from '@istock-shell/ui';

  const tbody = Array.from({ length: 10000 }, (_, index) => ({
    id: `${index + 1}`,
    name: `用户 ${index + 1}`,
    email: `user${index + 1}@example.com`,
    status: index % 2 === 0 ? '活跃' : '非活跃',
  }));

  const thead = [
    { value: '编号', dataKey: 'id' },
    { value: '姓名', dataKey: 'name' },
    { value: '邮箱', dataKey: 'email' },
    { value: '状态', dataKey: 'status' },
  ];
</script>

<ShVirtualTable {thead} {tbody} class="w-full max-h-96" />
```

## 组件特性

- 🚀 **虚拟化渲染**：仅渲染可视区域内的表格行，支持万级数据量的流畅滚动
- 📌 **表头固定**：支持表头固定功能，滚动时表头始终可见
- 📏 **自适应高度**：自动检测和适应表格行的动态高度变化
- 👁️ **可视区间监听**：提供可视区域变化回调，便于实现懒加载和数据联动
- 🔧 **完整表格功能**：继承所有标准表格组件的属性和功能
- 🎯 **自动ID生成**：自动为没有唯一标识符的数据行生成ID
- ♿ **无障碍友好**：基于标准表格元素，支持键盘导航和屏幕阅读器
- 📱 **响应式设计**：支持不同设备和屏幕尺寸的适配

## 使用场景

| 场景       | 推荐配置                | 说明                             |
| ---------- | ----------------------- | -------------------------------- |
| 数据监控   | 大数据量 + 实时更新     | 系统监控、性能指标、实时日志展示 |
| 金融数据   | 高频数据 + 表头固定     | 股票行情、交易记录、财务报表     |
| 用户管理   | 万级用户数据 + 搜索筛选 | 用户列表、权限管理、客户关系管理 |
| 日志查看   | 大量日志数据 + 时间排序 | 系统日志、操作记录、错误追踪     |
| 报表展示   | 复杂数据结构 + 多列展示 | 业务报表、数据分析、统计图表     |
| 文件管理   | 大量文件列表 + 文件信息 | 文件浏览器、资源管理、媒体库     |
| 订单管理   | 历史订单数据 + 状态筛选 | 电商订单、交易记录、物流跟踪     |
| 移动端优化 | `size="sm"` + 紧凑布局  | 移动设备上的大数据量表格展示     |

## 示例演示

### 虚拟化表格基础示例

展示 `ShVirtualTable` 组件的基础用法，专为大数据量表格场景设计。通过 `thead` 配置表头结构，`tbody` 传入数据源，支持万级数据的高性能虚拟化渲染。组件内置固定表头、动态行高计算、可视区域智能渲染等核心功能，确保在处理海量数据时保持流畅的滚动体验和优异的性能表现。适用于股票行情、数据报表、大型列表等高性能数据展示场景。

::: raw
<IStockShellUiExample src="./extend/virtual-table/example/VirtualTableDefault.svelte"></IStockShellUiExample>
:::

## API 参考

### VirtualTable API

#### VirtualTable 属性

| 属性名    | 类型                                              | 默认值 | 说明                                          |
| --------- | ------------------------------------------------- | ------ | --------------------------------------------- |
| `tbody`   | [`VirtualTableListItem[]`](#virtualtablelistitem) | `[]`   | 表格数据数组，支持万级数据量的高效渲染        |
| `thead`   | [`TableThead`](../../data-view/table/#tablethead) | -      | 表头配置数组，定义列标题和数据键映射          |
| `size`    | [`TableSize`](../../data-view/table/#tablesize)   | `'sm'` | 表格尺寸大小，虚拟表格默认使用紧凑尺寸        |
| `pinRows` | `boolean`                                         | `true` | 是否固定表头，虚拟表格默认启用表头固定功能    |
| `class`   | `string`                                          | -      | 自定义CSS类名，建议设置最大高度以启用虚拟滚动 |

#### VirtualTable 继承属性

`VirtualTable`继承所有[`ShTable`](../../data-view/table/#api-参考)组件的属性，包括但不限于：

- `columns` - 列配置数组
- `bordered` - 是否显示边框
- `striped` - 是否显示斑马纹
- `hover` - 是否启用悬停效果
- `compact` - 是否使用紧凑模式
- `onRender` - 行渲染回调函数
- `onSyncAreaHeight` - 区域高度同步回调

#### VirtualTable 事件

`VirtualTable`继承所有原生HTML元素事件和表格组件事件：

- `scroll` - 滚动事件（由内部虚拟列表处理）
- `click` - 点击事件
- `keydown` - 键盘按下事件
- `keyup` - 键盘释放事件

### 类型定义

#### VirtualTableListItem

虚拟表格行数据项接口：

```typescript
interface VirtualTableListItem {
  /** 行数据的唯一标识符，用于虚拟列表的高效渲染和更新 */
  id: string;
  /** 其他任意属性，支持表格行的自定义数据字段 */
  [k: string]: any;
}
```

#### VirtualTableProps

虚拟表格组件属性接口：

```typescript
interface VirtualTableProps extends TableProps {
  // 继承所有表格组件的属性
  // 无额外特有属性，专注于性能优化
}
```

## 设计指南

### 性能优化原则

- **数据量阈值**：建议在数据量超过1000行时使用虚拟表格
- **高度设置**：必须为容器设置固定高度或最大高度以启用虚拟滚动
- **ID字段要求**：确保每行数据都有唯一的`id`字段，或依赖自动生成
- **滚动缓冲**：组件内置40px的滚动缓冲区，优化滚动体验

### 数据结构设计

- **唯一标识符**：每行数据必须包含唯一的`id`字段
- **数据一致性**：保持数据结构的一致性，避免动态字段变化
- **字段命名**：使用有意义的字段名，便于表头配置和数据绑定
- **数据类型**：确保数据类型的一致性，便于排序和筛选

### 表头配置建议

- **列宽设置**：为重要列设置固定宽度，避免布局抖动
- **数据键映射**：确保`dataKey`与数据字段名称完全匹配
- **列标题**：使用简洁明了的列标题，考虑移动端显示
- **排序支持**：为需要排序的列配置相应的排序功能

### 滚动体验优化

- **平滑滚动**：组件内置平滑滚动，无需额外配置
- **表头同步**：表头高度自动同步，确保固定表头正确显示
- **可视区间**：仅渲染可视区域内的行，大幅提升性能
- **缓冲机制**：内置缓冲机制，减少滚动时的白屏现象

### 无障碍支持

- 基于标准HTML表格元素，完整支持屏幕阅读器
- 支持键盘导航（Tab、方向键、Enter、Space）
- 提供适当的`aria-label`和`role`属性
- 确保颜色对比度符合WCAG 2.0 AA标准
- 为大数据量表格提供合适的导航和定位功能

## 最佳实践

### 数据管理

1. **数据预处理**：在传入组件前完成数据的清洗和格式化
2. **ID生成策略**：优先使用业务ID，避免依赖自动生成的索引ID
3. **数据更新**：使用不可变数据更新模式，确保组件正确响应变化
4. **内存管理**：及时清理不需要的数据引用，避免内存泄漏

### 性能优化

1. **合理分页**：对于超大数据集，结合分页或无限滚动使用
2. **懒加载**：利用可视区间变化回调实现数据懒加载
3. **防抖处理**：对于搜索和筛选功能使用防抖减少重渲染
4. **缓存策略**：合理缓存计算结果和渲染状态

### 用户体验

1. **加载状态**：为数据加载提供适当的加载指示器
2. **错误处理**：优雅处理数据加载失败和网络错误
3. **空状态**：为空数据提供友好的空状态提示
4. **响应式设计**：在不同设备上提供合适的交互体验

### 集成建议

1. **状态管理**：与全局状态管理库（如Svelte stores）良好集成
2. **路由集成**：支持URL参数控制表格状态（排序、筛选等）
3. **表单集成**：与表单组件配合实现数据的增删改查
4. **导出功能**：提供数据导出功能，支持CSV、Excel等格式

## 常见问题

### Q: 虚拟表格与普通表格的性能差异有多大？

A: 在处理万级数据时，虚拟表格的性能优势显著：

- **DOM节点数量**：普通表格会创建所有行的DOM节点，虚拟表格仅创建可视区域的节点
- **内存占用**：虚拟表格的内存占用基本恒定，不随数据量增长
- **滚动性能**：虚拟表格保持60fps的流畅滚动，普通表格在大数据量时会出现卡顿

### Q: 如何处理动态行高的表格？

A: 虚拟表格支持动态行高，通过以下方式优化：

```svelte
<script>
  // 为包含动态内容的表格设置合理的预估行高
  const estimateRowHeight = 60; // 根据实际内容调整
</script>

<ShVirtualTable
  {thead}
  {tbody}
  class="w-full max-h-96"
  onRender={(node, index) => {
    // 行渲染完成后，组件会自动调整高度
    console.log(`Row ${index} rendered with height:`, node.offsetHeight);
  }}
/>
```

### Q: 如何实现表格数据的实时更新？

A: 可以通过响应式数据和定时更新实现：

```svelte
<script>
  let tableData = $state([]);

  // 定时更新数据
  setInterval(async () => {
    const newData = await fetchLatestData();
    tableData = newData; // 触发重新渲染
  }, 5000);

  // 或者使用WebSocket实时推送
  const ws = new WebSocket('ws://localhost:8080');
  ws.onmessage = (event) => {
    const update = JSON.parse(event.data);
    // 更新特定行数据
    tableData = tableData.map((row) => (row.id === update.id ? { ...row, ...update } : row));
  };
</script>
```

### Q: 如何实现表格的搜索和筛选功能？

A: 建议在数据层面实现搜索筛选，然后更新表格数据：

```svelte
<script>
  let originalData = [];
  let filteredData = $state([]);
  let searchTerm = $state('');

  // 搜索筛选逻辑
  $effect(() => {
    if (searchTerm) {
      filteredData = originalData.filter((row) =>
        Object.values(row).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
      );
    } else {
      filteredData = originalData;
    }
  });
</script>

<input bind:value={searchTerm} placeholder="搜索..." />
<ShVirtualTable thead={columns} tbody={filteredData} />
```

### Q: 虚拟表格是否支持行选择功能？

A: 支持，可以通过状态管理实现行选择：

```svelte
<script>
  let selectedRows = $state(new Set());

  const handleRowClick = (row, index) => {
    if (selectedRows.has(row.id)) {
      selectedRows.delete(row.id);
    } else {
      selectedRows.add(row.id);
    }
    selectedRows = new Set(selectedRows); // 触发响应式更新
  };

  const enhancedColumns = columns.map((col) => ({
    ...col,
    cellRender:
      col.dataKey === 'selection'
        ? (row) => `<input type="checkbox" ${selectedRows.has(row.id) ? 'checked' : ''} />`
        : undefined,
  }));
</script>
```

### Q: 如何优化移动端的虚拟表格体验？

A: 针对移动端进行以下优化：

```svelte
<script>
  // 移动端优化配置
  const isMobile = window.innerWidth < 768;
</script>

<ShVirtualTable
  {thead}
  {tbody}
  size={isMobile ? 'sm' : 'md'}
  class="w-full {isMobile ? 'max-h-80' : 'max-h-96'}"
  compact={isMobile}
/>

<style>
  /* 移动端样式优化 */
  @media (max-width: 768px) {
    :global(.virtual-table) {
      font-size: 0.875rem;
    }

    :global(.virtual-table th),
    :global(.virtual-table td) {
      padding: 0.5rem 0.25rem;
    }
  }
</style>
```

## 更新日志

查看 [GitHub Releases](https://github.com/xcbclc/istock-shell/releases) 了解详细的更新历史。
