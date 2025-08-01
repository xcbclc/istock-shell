<!--
@component
ShVirtualList 虚拟列表组件

一个高性能的虚拟列表组件，专为大数据集的高效渲染而设计。
基于虚拟化技术，仅渲染可视区域内的列表项，大幅提升大数据量场景下的渲染性能。

功能特性：
- 支持大数据集的高效虚拟化渲染，仅渲染可见区域项
- 支持垂直和水平两种滚动方向
- 自动计算滚动位置和内容尺寸，动态调整可视区域
- 支持头部和尾部固定区域，适用于复杂布局需求
- 提供滚动到指定索引或偏移量的定位功能
- 集成ResizeObserver实现列表项尺寸自适应
- 支持自定义项渲染模板和内容插槽
- 提供可视区域变化监听，便于实现懒加载等功能
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShVirtualList } from '@istock-shell/ui';

  const largeDataSet = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `项目 ${i}`,
    description: `这是第 ${i} 个项目的描述`
  }));

  function handleRangeChange(range) {
    console.log('可视区域变化:', range);
  }
</script>

<p>基础虚拟列表</p>
<ShVirtualList
  list={largeDataSet}
  keeps={30}
  estimateSize={40}
  mainItemRender={(item) => (
    <div class="p-2 border-b">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  )}
/>

<p>带头部和尾部的虚拟列表</p>
<ShVirtualList
  list={largeDataSet}
  headerSize={50}
  footerSize={30}
  headerRender={() => (
    <div class="bg-gray-100 p-4 font-bold">列表头部</div>
  )}
  footerRender={() => (
    <div class="bg-gray-100 p-2 text-center">列表底部</div>
  )}
  onRangeChange={handleRangeChange}
/>

<p>滚动定位的虚拟列表</p>
<ShVirtualList
  list={largeDataSet}
  scrollToIndex={100}
  thresholdTop={200}
  thresholdBottom={200}
/>
```
-->

<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Action } from 'svelte/action';
  import { VirtualDirection, type VirtualCoreRange } from './core/index';

  /**
   * 虚拟列表项尺寸监听动作类型
   * 用于监听列表项元素尺寸变化的Svelte动作类型定义
   * @typedef {Action<HTMLElement, string>} VirtualListResizeAction
   */
  export type VirtualListResizeAction = Action<HTMLElement, string>;

  /**
   * 虚拟列表组件属性接口
   * 继承所有原生 div 元素的 HTML 属性，并扩展虚拟列表特有的功能属性
   * @template T - 列表项数据类型（默认为任意对象）
   * @typedef {HTMLAttributes<HTMLDivElement> & VirtualListPropsExtension} VirtualListProps
   */
  export interface VirtualListProps<T = Record<string, any>>
    extends HTMLAttributes<HTMLDivElement> {
    /** 数据源数组，用于渲染列表项 */
    list?: T[];
    /** 顶部预渲染阈值（像素），当滚动到距离顶部该值时开始加载更多内容 */
    thresholdTop?: number;
    /** 底部预渲染阈值（像素），当滚动到距离底部该值时开始加载更多内容 */
    thresholdBottom?: number;
    /** 始终保留渲染的最小项数，影响滚动流畅性和性能平衡 */
    keeps?: number;
    /** 滚动方向，支持垂直和水平两种方向 */
    direction?: VirtualDirection;
    /** 项唯一标识键，支持字符串键名或函数动态生成 */
    dataKey?: string | ((item: T, index: number) => string);
    /** 头部固定区域高度（像素），需要配合headerRender使用 */
    headerSize?: number;
    /** 尾部固定区域高度（像素），需要配合footerRender使用 */
    footerSize?: number;
    /** 项尺寸预估值（像素），用于初始渲染计算和性能优化 */
    estimateSize?: number;
    /** 关联滚动元素，用于嵌套滚动场景的滚动事件委托 */
    shepherdElement?: HTMLElement;
    /** 初始化时滚动到指定索引，优先级高于scrollToOffset */
    scrollToIndex?: number;
    /** 初始化时滚动到指定偏移量（像素） */
    scrollToOffset?: number;
    /** 头部固定区域渲染模板，返回Svelte片段 */
    headerRender?: () => ReturnType<Snippet<[]>>;
    /** 主项内容渲染模板，参数为当前项数据 */
    mainItemRender?: Snippet<[item: T]>;
    /** 尾部固定区域渲染模板，返回Svelte片段 */
    footerRender?: () => ReturnType<Snippet<[]>>;
    /** 可视区域变化回调函数，参数包含start/end索引等元数据 */
    onRangeChange?: (range: VirtualCoreRange) => void;
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { tuc, isString } from '@istock-shell/util';
  import { Virtual } from './core/index';

  // 响应式状态声明
  /** 列表项尺寸变化信息记录，用于跟踪每个项的尺寸变化 */
  let sizeChangeInfo: Record<string, { id: string; size: number }> = {};
  /** 虚拟列表核心实例，负责虚拟化逻辑处理 */
  let virtual: Virtual;
  /** 虚拟列表实例是否已创建的状态标识 */
  let hasVirtualInstance = $state(false);
  /** 当前可视区域范围信息，包含起始索引、结束索引、填充等数据 */
  let range = $state<VirtualCoreRange>({
    offset: 0, // 滚动偏移量
    start: 0, // 可视区域起始索引
    end: 0, // 可视区域结束索引
    padFront: 0, // 前置填充高度
    padBehind: 0, // 后置填充高度
    totalHeight: 0, // 总高度
  });
  /** 滚动容器元素引用 */
  let scrollElement: HTMLElement | undefined;
  /** 内容包装器的动态样式字符串，用于设置填充 */
  let wrapperStyle = $state('');

  // 属性解构：从props中提取组件属性，设置默认值
  const {
    list = [], // 数据源数组（默认空数组）
    thresholdTop = 0, // 顶部预渲染阈值（默认0像素）
    thresholdBottom = 0, // 底部预渲染阈值（默认0像素）
    keeps = 25, // 保持渲染的最小项数（默认25项）
    direction = VirtualDirection.vertical, // 滚动方向（默认垂直）
    dataKey = 'id', // 数据项唯一标识键（默认'id'）
    headerSize = 0, // 头部固定区域高度（默认0）
    footerSize = 0, // 尾部固定区域高度（默认0）
    estimateSize = 32, // 项尺寸预估值（默认32px）
    shepherdElement, // 关联滚动元素（可选）
    scrollToIndex, // 初始滚动到指定索引（可选）
    scrollToOffset, // 初始滚动到指定偏移量（可选）
    headerRender, // 头部内容渲染函数（可选）
    mainItemRender, // 主项内容渲染函数（可选）
    footerRender, // 尾部内容渲染函数（可选）
    onRangeChange, // 可视区域变化回调函数（可选）
    class: className = '', // 自定义CSS类名（默认空字符串）
    children, // 子内容插槽
    ...otherProps // 其他原生div元素属性
  }: VirtualListProps = $props();

  /**
   * 滚动事件处理函数
   * 将滚动事件委托给虚拟列表核心实例处理
   * @param event - 滚动事件对象
   */
  const onScroll = (event: Event) => {
    virtual?.onScroll(event);
  };

  /**
   * 虚拟列表容器样式计算副作用
   * 根据可视区域范围动态计算内容包装器的填充样式
   */
  $effect(() => {
    if (!hasVirtualInstance) return;

    // 从可视区域范围中提取前置和后置填充值
    const { padFront, padBehind } = range;

    // 根据滚动方向设置对应的填充样式
    wrapperStyle =
      (virtual?.isVertical() ?? true)
        ? `height: ${range.totalHeight}px;padding: ${padFront}px 0 ${padBehind}px 0` // 垂直方向：上下填充
        : `height: ${range.totalHeight}px;padding: 0 ${padBehind}px 0 ${padFront}px`; // 水平方向：左右填充
  });

  /**
   * 虚拟列表配置和数据同步副作用
   * 处理数据源变化、滚动定位和配置参数更新
   */
  $effect(() => {
    if (!hasVirtualInstance) return;

    // 数据源变化处理：同步新的数据源到虚拟列表实例
    virtual.syncDataSources(list);
    // 更新唯一标识列表，用于优化渲染性能
    virtual.core.updateParam('uniqueIds', virtual.getUniqueIdFromDataSources());

    // 滚动定位逻辑：优先处理索引定位，其次处理偏移量定位
    if (scrollToIndex !== undefined) {
      virtual.scrollToIndex(scrollToIndex); // 滚动到指定索引位置
    } else if (scrollToOffset !== undefined) {
      virtual.scrollToOffset(scrollToOffset); // 滚动到指定偏移量位置
    }

    // 配置参数更新：同步最新的配置到虚拟列表核心
    virtual.core.updateParam('keeps', keeps); // 更新保持渲染项数
    virtual.setTopThreshold(thresholdTop); // 更新顶部预渲染阈值
    virtual.setBottomThreshold(thresholdBottom); // 更新底部预渲染阈值
  });

  /**
   * 可视区域范围变化监听副作用
   * 当可视区域范围发生变化时，触发外部回调函数
   */
  $effect(() => {
    onRangeChange?.(range);
  });

  /**
   * 虚拟列表初始化
   */
  onMount(() => {
    if (!scrollElement) return;
    // 创建虚拟列表核心实例，传入配置参数
    virtual = new Virtual({
      dataSources: list, // 数据源
      keeps, // 保持渲染项数
      direction, // 滚动方向
      dataKey, // 数据键
      topThreshold: thresholdTop, // 顶部阈值
      bottomThreshold: thresholdBottom, // 底部阈值
      slotHeaderSize: headerSize, // 头部插槽尺寸
      slotFooterSize: footerSize, // 尾部插槽尺寸
      estimateSize, // 预估尺寸
      scrollElement, // 滚动容器元素
      shepherdElement, // 关联滚动元素
    });
    // 可视区域范围更新处理函数
    const handleRangeUpdate = (newRange: VirtualCoreRange) => {
      range = newRange;
    };

    // 监听可视区域范围同步事件
    virtual.eventEmitter.on('syncRange', handleRangeUpdate);
    // 添加滚动事件监听器
    scrollElement.addEventListener('scroll', onScroll, { passive: true });
    // 获取初始可视区域范围
    range = virtual.core.getRange();
    // 标记虚拟列表实例已创建
    hasVirtualInstance = true;
    // 清理函数：移除事件监听器并销毁实例
    return () => {
      virtual.eventEmitter.off('syncRange', handleRangeUpdate);
      scrollElement?.removeEventListener('scroll', onScroll);
      virtual.destroy();
      hasVirtualInstance = false;
    };
  });

  /**
   * 列表项尺寸变化更新逻辑
   * 检测并记录列表项元素的尺寸变化
   * @param node - 列表项DOM元素
   * @param id - 列表项唯一标识
   */
  const updateItemResize = (node: HTMLElement, id: string) => {
    // 根据滚动方向获取对应的尺寸（垂直方向取高度，水平方向取宽度）
    const newSize = virtual?.isVertical() ? node.offsetHeight : node.offsetWidth;
    virtual.onItemResized(id, newSize);
    // 如果尺寸发生变化，更新尺寸信息记录
    if (sizeChangeInfo[id]?.size !== newSize) {
      sizeChangeInfo = {
        ...sizeChangeInfo,
        [id]: { id, size: Number(newSize.toFixed(2)) }, // 保留两位小数精度
      };
    }
  };

  /**
   * 列表项尺寸监听动作实现
   * 使用ResizeObserver监听列表项元素尺寸变化，优化虚拟列表渲染性能
   * @param node - 要监听的DOM元素
   * @param id - 元素的唯一标识
   * @param updateCallback - 更新回调
   * @returns 返回包含update和destroy方法的动作对象
   */
  export const onItemResize: VirtualListResizeAction = (
    node: HTMLElement,
    id: string,
    updateCallback?: (node: HTMLElement, id: string) => void
  ) => {
    // 尺寸更新处理函数
    const update = () => {
      updateItemResize(node, id);
      updateCallback?.(node, id);
    };
    // 创建ResizeObserver实例监听元素尺寸变化
    const observer = new ResizeObserver(update);

    update(); // 执行初始测量
    observer.observe(node); // 开始监听元素

    return {
      // 更新方法：当元素ID发生变化时调用
      update: (newId: string) => {
        delete sizeChangeInfo[id]; // 删除旧ID的尺寸信息
        id = newId; // 更新ID
        update(); // 重新测量
      },
      // 销毁方法：清理监听器和尺寸信息
      destroy: () => {
        delete sizeChangeInfo[id]; // 删除尺寸信息记录
        observer.disconnect(); // 断开ResizeObserver连接
      },
    };
  };

  /**
   * 滚动到列表末尾
   * 将滚动容器滚动到最后一个子元素位置
   */
  export const scrollToLastChild = () => {
    scrollElement?.lastChild?.scrollIntoView?.(false);
  };

  /**
   * 滚动到指定索引位置
   * @param index - 目标索引
   * @param align - 与视窗的对齐方式，类似原生scrollIntoView的block参数
   *   - 'start': 元素顶部与视窗顶部对齐
   *   - 'center': 元素中心与视窗中心对齐
   *   - 'end': 元素底部与视窗底部对齐
   *   - 'nearest': 选择最近的对齐方式（最小滚动距离）
   */
  export const scrollByIndex = (
    index: number,
    align: 'start' | 'center' | 'end' | 'nearest' = 'start'
  ) => {
    virtual?.scrollViewByIndex(index, align);
  };
</script>

<!-- 虚拟列表滚动容器：绑定滚动元素引用，应用样式类和属性 -->
<div bind:this={scrollElement} class={[tuc('virtual-list'), className]} {...otherProps}>
  <div class="virtual-list-content" style={wrapperStyle}>
    <!-- 头部固定区域：当配置了headerRender时渲染头部内容 -->
    {#if headerRender}
      {@render headerRender()}
    {/if}

    <!-- 主要内容区域：根据是否配置mainItemRender决定渲染方式 -->
    {#if mainItemRender}
      <!-- 虚拟列表主容器：包含可视区域内的列表项 -->
      <div class={[tuc('virtual-main')]}>
        <!-- 遍历可视区域内的数据项，仅渲染当前可见的项 -->
        {#each list.slice(range.start, range.end + 1) as item, index}
          <!-- 列表项容器：应用尺寸监听动作，传入项的唯一标识 -->
          <div
            class={[tuc('virtual-item')]}
            use:onItemResize={`${item[isString(dataKey) ? dataKey : dataKey(item, index)]}`}
          >
            <!-- 渲染列表项内容：使用mainItemRender函数渲染当前项 -->
            {@render mainItemRender(item)}
          </div>
        {/each}
      </div>
    {:else}
      <!-- 自定义内容渲染：当没有配置mainItemRender时，渲染子内容插槽 -->
      {@render children?.()}
    {/if}

    <!-- 尾部固定区域：当配置了footerRender时渲染尾部内容 -->
    {#if footerRender}
      {@render footerRender()}
    {/if}
  </div>
</div>

<style>
  @reference "../../../style/daisyui.css";
  @layer components {
    :global(.virtual-list) {
      @apply relative overflow-auto;
      overflow-anchor: none; /* 禁用浏览器的自动滚动锚定 */
    }
    :global(.virtual-list-content) {
    }
    :global(.virtual-main) {
    }
  }
</style>
