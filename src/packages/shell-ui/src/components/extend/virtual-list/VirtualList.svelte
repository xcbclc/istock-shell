<!--
@component
ShVirtualList 虚拟列表组件

一个高性能的虚拟滚动列表组件，基于视窗锚定和双向尺寸缓存技术，专为大数据量列表的高效滚动渲染而设计。
基于虚拟化技术，仅渲染可视区域内的列表项，大幅提升大数据量列表场景下的渲染性能和用户体验。

功能特性：
- 支持大数据集的高效虚拟化渲染，仅渲染可见区间的列表项
- 动态高度自适应，支持不同高度的列表项混合渲染
- 智能滚动优化，支持滚动到顶部/底部的无限加载
- 支持自定义头部、尾部和列表项渲染插槽
- 提供可视区间变化监听，便于实现懒加载或数据联动
- 支持列表项尺寸自适应，通过ResizeObserver动态调整
- 内置防抖和性能优化机制，确保流畅的滚动体验
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShVirtualList } from '@istock-shell/ui';

  const largeListData = Array.from({ length: 10000 }, (_, i) => ({
    id: `item-${i}`,
    name: `项目 ${i + 1}`,
    description: `这是第 ${i + 1} 个列表项的描述信息`
  }));

  const handleRangeChange = (range) => {
    console.log('可见范围变化:', range);
  };

  const handleScrollToBottom = () => {
    console.log('滚动到底部，可以加载更多数据');
  };
</script>

<p>基础虚拟列表</p>
<ShVirtualList
  list={largeListData}
  estimateSize={60}
  onRangeChange={handleRangeChange}
  onScrollToBottom={handleScrollToBottom}
  class="h-96"
>
  {#snippet itemChildrenRender(item, index)}
    <div class="p-4 border-b">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  {/snippet}
</ShVirtualList>
```
-->

<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Action } from 'svelte/action';

  /**
   * 虚拟列表元素尺寸监听动作类型
   * @typedef {Action<HTMLElement, string>} VirtualListResizeAction
   *
   * @description 用于监听虚拟列表项尺寸变化的Svelte动作类型
   *
   * @template HTMLElement - 监听的DOM元素类型
   * @template string - 元素唯一标识符类型
   *
   * @features
   * - 自动监听元素尺寸变化
   * - 防抖优化避免频繁更新
   * - 并发控制防止重复监听
   * - 内存泄漏防护机制
   *
   * @example
   * ```svelte
   * <div use:onItemResize={itemId}>
   *   <!-- 内容 -->
   * </div>
   * ```
   */
  export type VirtualListResizeAction = Action<HTMLElement>;

  /**
   * 虚拟列表组件属性接口
   * 继承所有HTML div元素的属性，支持虚拟化渲染的大数据列表
   * @typedef {HTMLAttributes<HTMLDivElement>} VirtualListProps
   */
  export interface VirtualListProps<T = Record<string, any>>
    extends HTMLAttributes<HTMLDivElement> {
    /**
     * 数据列表
     * @type {T[]}
     * @default []
     * @description 要渲染的数据数组，支持任意类型的数据项
     */
    list?: T[];

    /**
     * 顶部阈值
     * @type {number}
     * @default 0
     * @description 距离顶部多少像素时触发onScrollToTop事件，用于无限滚动加载
     */
    thresholdTop?: number;

    /**
     * 底部阈值
     * @type {number}
     * @default 0
     * @description 距离底部多少像素时触发onScrollToBottom事件，用于无限滚动加载
     */
    thresholdBottom?: number;

    /**
     * 保持渲染的元素数量
     * @type {number}
     * @default 25
     * @description 可见区域内保持渲染的元素数量，影响性能和内存使用
     */
    keeps?: number;

    /**
     * 滚动方向
     * @type {'vertical' | 'horizontal'}
     * @default 'vertical'
     * @description 虚拟滚动的方向，目前主要支持垂直滚动
     */
    direction?: 'vertical' | 'horizontal';

    /**
     * 数据项唯一标识
     * @type {string | ((item: T, index: number) => string)}
     * @default 'id'
     * @description 用于生成列表项key的字段名或函数，确保列表项的唯一性
     */
    dataKey?: string | ((item: T, index: number) => string);

    /**
     * 头部区域高度
     * @type {number}
     * @default 0
     * @description 列表头部固定区域的高度（像素）
     */
    headerSize?: number;

    /**
     * 尾部区域高度
     * @type {number}
     * @default 0
     * @description 列表尾部固定区域的高度（像素）
     */
    footerSize?: number;

    /**
     * 元素预估高度
     * @type {number}
     * @default 32
     * @description 列表项的预估高度，用于初始计算和未测量元素的占位
     */
    estimateSize?: number;

    /**
     * 滚动到指定索引
     * @type {number}
     * @description 组件初始化时滚动到的目标索引位置
     */
    scrollToIndex?: number;

    /**
     * 滚动到指定偏移量
     * @type {number}
     * @description 组件初始化时滚动到的目标像素位置
     */
    scrollToOffset?: number;

    /**
     * 头部渲染插槽
     * @type {() => ReturnType<Snippet<[]>>}
     * @description 用于渲染列表头部内容的Svelte插槽函数
     */
    headerRender?: () => ReturnType<Snippet<[]>>;

    /**
     * 主要内容渲染插槽
     * @type {Snippet<[item: T, index: number]>}
     * @description 用于渲染每个列表项的Svelte插槽，接收数据项和索引作为参数
     */
    itemRender?: Snippet<[item: T, index: number]>;

    /**
     * 列表项子内容渲染插槽
     * @type {Snippet<[item: T, index: number]>}
     * @description 用于渲染列表项内部内容的Svelte插槽，支持自定义列表项布局和样式
     */
    itemChildrenRender?: Snippet<[item: T, index: number]>;

    /**
     * 尾部渲染插槽
     * @type {() => ReturnType<Snippet<[]>>}
     * @description 用于渲染列表尾部内容的Svelte插槽函数
     */
    footerRender?: () => ReturnType<Snippet<[]>>;

    /**
     * 可见范围变化回调
     * @type {(range: any) => void}
     * @description 当可见区域范围发生变化时的回调函数
     */
    onRangeChange?: (range: any) => void;

    /**
     * 滚动到顶部回调
     * @type {() => void}
     * @description 滚动到列表顶部时的回调，通常用于加载历史数据
     */
    onScrollToTop?: () => void;

    /**
     * 滚动到底部回调
     * @type {() => void}
     * @description 滚动到列表底部时的回调，通常用于标记消息已读
     */
    onScrollToBottom?: () => void;
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { tuc, isString } from '@istock-shell/util';
  import { VirtualCore, type VirtualRange } from './core/index.ts';

  const {
    list = [],
    thresholdTop = 0,
    thresholdBottom = 0,
    keeps = 25,
    direction = 'vertical',
    dataKey = 'id',
    headerSize = 0,
    footerSize = 0,
    estimateSize = 32,
    scrollToIndex,
    scrollToOffset,
    headerRender,
    itemRender,
    itemChildrenRender,
    footerRender,
    onRangeChange,
    onScrollToTop,
    onScrollToBottom,
    class: className = '',
    children,
    ...otherProps
  }: VirtualListProps = $props();

  /** 虚拟列表核心引擎实例，负责滚动计算和渲染优化 */
  let virtualCore: VirtualCore;

  /** 虚拟实例初始化状态标识，用于控制组件生命周期 */
  let hasVirtualInstance = $state(false);

  /** 当前可视区域范围状态，用于跟踪渲染区间和滚动位置 */
  let range: VirtualRange = $state({
    start: 0,
    end: 0,
    totalHeight: estimateSize * list.length,
    paddingTop: 0,
    paddingBottom: 0,
  });

  /** 滚动容器DOM元素引用，用于滚动事件监听和位置计算 */
  let scrollElement: HTMLElement | undefined;

  /** 当前可见区间的列表数据，基于range动态切片原始数据实现虚拟化渲染 */
  let currentList: Array<Record<string, any>> = $derived.by(() => {
    return list.slice(range.start, range.end + 1);
  });

  /**
   * 滚动事件处理函数
   * 处理滚动容器的滚动事件，更新虚拟列表的渲染范围和状态
   * @param _event - 滚动事件对象
   * @description 核心滚动处理逻辑，负责计算可视区域并触发虚拟渲染更新，限制鼠标拖动滚动条的滚动行为
   */
  const onScroll = (_event: Event) => {
    // 安全检查：确保虚拟实例和滚动元素已初始化
    if (!hasVirtualInstance || !scrollElement) return;

    // 获取当前滚动状态：位置和视窗尺寸
    const scrollTop = scrollElement.scrollTop;
    const viewportHeight = scrollElement.clientHeight;

    // 使用RAF确保滚动处理的流畅性，避免阻塞主线程
    virtualCore.handleScroll(scrollTop, viewportHeight);
  };

  /**
   * 获取列表项的唯一标识
   * 为虚拟列表项生成唯一的key值，确保列表项的正确渲染和更新
   * @param item - 列表项数据对象
   * @param index - 列表项在当前可见区间中的相对索引
   * @returns {string} 列表项的唯一标识符
   * @description 支持字符串字段名和自定义函数两种key生成方式
   */
  const getItemKey = (item: Record<string, any>, index: number) => {
    // 边界检查：计算绝对索引，防止越界
    const absoluteIndex = Math.min(range.start + index, list.length - 1);
    const safeIndex = Math.max(0, absoluteIndex);
    // 生成唯一标识：支持字符串字段名和函数两种方式
    return String(isString(dataKey) ? item[dataKey] : dataKey(item, safeIndex));
  };

  /**
   * 智能数据同步效应
   * 响应式监听数据变化，自动更新虚拟列表配置和滚动位置
   * @description 当list、keeps等关键属性变化时，自动同步虚拟核心配置并处理滚动定位
   */
  $effect(() => {
    if (!hasVirtualInstance) return;

    // 更新配置
    virtualCore.updateOptions({
      totalCount: list.length,
      keeps,
      headerSize,
      footerSize,
      estimateSize,
      thresholdTop,
      thresholdBottom,
    });

    // 滚动定位
    if (scrollToIndex !== undefined && scrollElement) {
      scrollElement.scrollTop = virtualCore.getOffsetByIndex(scrollToIndex);
    } else if (scrollToOffset !== undefined && scrollElement) {
      scrollElement.scrollTop = scrollToOffset;
    }
  });

  onMount(() => {
    if (!scrollElement) return;

    // 创建虚拟核心实例
    virtualCore = new VirtualCore(
      {
        keeps,
        estimateSize,
        headerSize,
        footerSize,
        totalCount: list.length,
        thresholdTop,
        thresholdBottom,
      },
      (newRange) => {
        onRangeChange?.(newRange);
        range = newRange;
      },
      onScrollToTop,
      onScrollToBottom
    );

    // 设置滚动元素引用
    virtualCore.setScrollElement(scrollElement);

    // 添加滚动监听
    scrollElement.addEventListener('scroll', onScroll, { passive: true });

    hasVirtualInstance = true;

    return () => {
      scrollElement?.removeEventListener('scroll', onScroll);
      virtualCore?.destroy();
      hasVirtualInstance = false;
    };
  });

  /**
   * 滚动到列表底部
   * 智能滚动到列表的最底部位置，常用于聊天应用的新消息自动滚动
   * @description 调用虚拟核心引擎的底部滚动方法，确保滚动位置准确
   */
  export const scrollToBottom = () => {
    // 安全检查：确保虚拟实例已初始化
    if (hasVirtualInstance) {
      // 调用核心引擎：执行智能底部滚动
      virtualCore.scrollToBottom();
    }
  };

  /**
   * 元素尺寸监听动作 - 性能优化版本
   * @param {HTMLElement} node - 要监听的DOM元素
   * @param {number }index
   * @returns {ActionReturn} Svelte动作返回对象
   *
   * @description 高性能的虚拟列表项尺寸监听动作，专为大数据量场景优化
   */
  export const onItemResize: VirtualListResizeAction = (node: HTMLElement) => {
    let isDestroyed = false;

    /**
     * 更新元素尺寸
     */
    const update = () => {
      if (isDestroyed || !hasVirtualInstance || !scrollElement || !node || !document.contains(node))
        return;

      const size = direction === 'vertical' ? node.offsetHeight : node.offsetWidth;
      const dataIndex = node.getAttribute('data-index');
      if (!dataIndex) return;
      const index = Number(dataIndex);
      virtualCore.updateItemSize(Math.max(0, Math.min(index, list.length)), size, scrollElement);
    };

    /**
     * ResizeObserver回调
     */
    const observer = new ResizeObserver(() => {
      if (!isDestroyed) {
        update();
      }
    });

    // 初始化
    update();
    observer.observe(node);

    /**
     * 清理资源
     */
    const cleanup = () => {
      isDestroyed = true;
      observer.disconnect();
    };

    return {
      update: () => {
        if (!isDestroyed) {
          update();
        }
      },
      destroy: cleanup,
    };
  };

  /**
   * 获取列表项的绝对位置
   * 计算每个元素在虚拟列表中的top偏移量，用于绝对定位渲染
   * @param offsetIndex - 列表项在当前可见区间中的相对索引
   * @returns {number} 列表项距离容器顶部的像素偏移量
   * @description 使用虚拟核心引擎精确计算元素位置，确保渲染位置准确
   */
  export const getItemTop = (offsetIndex: number): number => {
    if (!hasVirtualInstance || !virtualCore) return 0;

    // 使用虚拟核心引擎计算元素的top偏移量
    return virtualCore.getOffsetByIndex(range.start + offsetIndex);
  };
</script>

<!--
  组件结构说明：
  - 外层为滚动容器，负责滚动事件监听和可视区域管理
  - 内部通过条件渲染支持自定义children或默认插槽渲染
  - 头部、主内容、尾部区域分别对应headerRender、itemChildrenRender/itemRender、footerRender插槽
  - 主内容区域使用绝对定位实现虚拟化渲染，仅渲染可见区间的列表项
  - 通过onItemResize动作监听列表项尺寸变化，实现动态高度自适应
-->
<div bind:this={scrollElement} class={[tuc('virtual-list'), className]} {...otherProps}>
  {#if children}
    {@render children()}
  {:else}
    <!-- 头部区域 -->
    {#if headerRender}
      {@render headerRender()}
    {/if}
    <!-- 内容容器 -->
    <div class={tuc('virtual-main')} style:--virtual-total-size={`${range.totalHeight}px`}>
      <!-- 主内容区域 -->
      {#each currentList as item, index (getItemKey(item, index))}
        {#if itemChildrenRender}
          <div
            class={tuc('virtual-item absolute left-0 w-full')}
            style={`top: ${getItemTop(index) || 0}px `}
            data-index={range.start + index}
            use:onItemResize
          >
            {@render itemChildrenRender(item, range.start + index)}
          </div>
        {/if}
        {#if itemRender}
          {@render itemRender(item, range.start + index)}
        {/if}
      {/each}
    </div>
    <!-- 尾部区域 -->
    {#if footerRender}
      {@render footerRender()}
    {/if}
  {/if}
</div>

<style>
  @reference "../../../style/daisyui.css";
  @layer components {
    :global(.virtual-list) {
      @apply overflow-auto relative will-change-transform;
      /* 确保滚动容器正确处理溢出内容，禁用浏览器的自动滚动锚定 */
      overflow-anchor: none;
    }

    :global(.virtual-main) {
      @apply relative h-[var(--virtual-total-size)];
    }

    :global(.virtual-item) {
      @apply absolute;
    }
  }
</style>
