<!--
@component
虚拟列表组件，用于高效渲染大数据集。支持以下功能：
- 动态计算可见区域，仅渲染可见项
- 支持垂直/水平滚动方向
- 自动计算滚动位置和内容尺寸
- 支持头部和尾部固定区域
- 滚动到指定索引或偏移量
- 自适应尺寸变化（ResizeObserver集成）
- 自定义项渲染模板

用法示例:
```html
<ShVirtualList
  list={largeDataSet}
  keeps={30}
  estimateSize={40}
  mainItemRender={(item) => <div>{item.name}</div>}
  scrollToIndex={100}
/>
```
-->

<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Action } from 'svelte/action';
  import { VirtualDirection, type VirtualCoreRange } from './core/index';

  export type VirtualListResizeAction = Action<HTMLElement, string>;

  /**
   * 虚拟列表组件属性接口
   * @template T - 列表项数据类型（默认为任意对象）
   */
  export interface VirtualListProps<T = Record<string, any>> extends HTMLAttributes<HTMLDivElement> {
    list?: T[]; // 数据源数组（默认空数组）
    thresholdTop?: number; // 顶部预渲染阈值（像素，默认0）当滚动到距离顶部该值时开始加载更多
    thresholdBottom?: number; // 底部预渲染阈值（像素，默认0）当滚动到距离底部该值时开始加载更多
    keeps?: number; // 始终保留渲染的最小项数（默认25，影响滚动流畅性）
    direction?: VirtualDirection; // 滚动方向（默认垂直方向，可选值：VerticalDirection.vertical/horizontal）
    dataKey?: string | ((item: T, index: number) => string); // 项唯一标识键（默认'id'），支持函数动态生成
    headerSize?: number; // 头部固定区域高度（默认0，需要配合headerRender使用）
    footerSize?: number; // 尾部固定区域高度（默认0，需要配合footerRender使用）
    estimateSize?: number; // 项尺寸预估值（默认32px，用于初始渲染计算）
    shepherdElement?: HTMLElement; // 关联滚动元素（用于嵌套滚动场景）
    scrollToIndex?: number; // 初始化时滚动到指定索引（优先级高于scrollToOffset）
    scrollToOffset?: number; // 初始化时滚动到指定偏移量（像素）
    headerRender?: () => ReturnType<Snippet<[]>>; // 头部固定区域渲染模板（返回Svelte片段）
    mainItemRender?: Snippet<[item: T]>; // 主项内容渲染模板（参数：当前项数据）
    footerRender?: () => ReturnType<Snippet<[]>>; // 尾部固定区域渲染模板（返回Svelte片段）
    onRangeChange?: (range: VirtualCoreRange) => void; // 可视区域变化回调（参数包含start/end索引等元数据）
  }
</script>

<script lang="ts">
  import { tuc, isString } from '@istock-shell/util';
  import { Virtual } from './core/index';

  // 响应式状态声明
  let sizeChangeInfo: Record<string, { id: string; size: number }> = {};
  let virtual: Virtual;
  let hasVirtualInstance = $state(false);
  let range = $state<VirtualCoreRange>({
    offset: 0,
    start: 0,
    end: 0,
    padFront: 0,
    padBehind: 0,
    totalHeight: 0,
  });
  let scrollElement: HTMLElement | undefined = $state();
  let wrapperStyle = $state('');

  // 属性解构
  const {
    list = [],
    thresholdTop = 0,
    thresholdBottom = 0,
    keeps = 25,
    direction = VirtualDirection.vertical,
    dataKey = 'id',
    headerSize = 0,
    footerSize = 0,
    estimateSize = 32,
    shepherdElement,
    scrollToIndex,
    scrollToOffset,
    headerRender,
    mainItemRender,
    footerRender,
    onRangeChange,
    class: className = '',
    children,
    ...otherProps
  }: VirtualListProps = $props();

  // 滚动处理
  const onScroll = (event: Event) => {
    virtual?.onScroll(event);
  };

  // 虚拟列表初始化
  $effect(() => {
    if (!scrollElement) return;

    virtual = new Virtual({
      dataSources: list,
      keeps,
      direction,
      dataKey,
      topThreshold: thresholdTop,
      bottomThreshold: thresholdBottom,
      slotHeaderSize: headerSize,
      slotFooterSize: footerSize,
      estimateSize,
      scrollElement,
      shepherdElement,
    });
    const handleRangeUpdate = (newRange: VirtualCoreRange) => {
      range = newRange;
    };
    virtual.eventEmitter.on('syncRange', handleRangeUpdate);
    scrollElement.addEventListener('scroll', onScroll);
    range = virtual.core.getRange();
    hasVirtualInstance = true;
    return () => {
      virtual.eventEmitter.off('syncRange', handleRangeUpdate);
      scrollElement?.removeEventListener('scroll', onScroll);
      virtual.destroy();
      hasVirtualInstance = false;
    };
  });

  // 尺寸改变观察逻辑
  const updateItemResize = (node: HTMLElement, id: string) => {
    const newSize = virtual?.isVertical() ? node.offsetHeight : node.offsetWidth;

    if (sizeChangeInfo[id]?.size !== newSize) {
      sizeChangeInfo = {
        ...sizeChangeInfo,
        [id]: { id, size: Number(newSize.toFixed(2)) },
      };
    }
  };

  // 虚拟列表容器样式
  $effect(() => {
    if (!hasVirtualInstance) return;

    const { padFront, padBehind } = range;

    wrapperStyle =
      (virtual?.isVertical() ?? true)
        ? `padding: ${padFront}px 0 ${padBehind}px`
        : `padding: 0 ${padBehind}px 0 ${padFront}px`;
  });

  $effect(() => {
    if (!hasVirtualInstance) return;

    // 数据源变化处理
    virtual.syncDataSources(list);
    virtual.core.updateParam('uniqueIds', virtual.getUniqueIdFromDataSources());

    // 滚动定位逻辑
    if (scrollToIndex !== undefined) {
      virtual.scrollToIndex(scrollToIndex);
    } else if (scrollToOffset !== undefined) {
      virtual.scrollToOffset(scrollToOffset);
    }

    // 配置更新（修复方法调用）
    virtual.core.updateParam('keeps', keeps);
    virtual.setTopThreshold(thresholdTop);
    virtual.setBottomThreshold(thresholdBottom);
  });

  // 数据范围改变时触发
  $effect(() => {
    onRangeChange?.(range);
  });

  // 优化ResizeObserver处理
  export const onItemResize: VirtualListResizeAction = (node: HTMLElement, id: string) => {
    const update = () => {
      updateItemResize(node, id);
    };
    const observer = new ResizeObserver(update);

    update(); // 初始测量
    observer.observe(node);

    return {
      update: (newId: string) => {
        delete sizeChangeInfo[id];
        id = newId;
        update();
      },
      destroy: () => {
        delete sizeChangeInfo[id];
        observer.disconnect();
      },
    };
  };
  // 滚动到末尾
  export const scrollToLastChild = () => {
    scrollElement?.lastChild?.scrollIntoView?.(false);
  };

  // 滚动到指定元素
  export const scrollToElement = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };
</script>

<div bind:this={scrollElement} class={[tuc('virtual-list'), className]} {...otherProps}>
  <div style={wrapperStyle}>
    {#if headerRender}
      {@render headerRender()}
    {/if}
    {#if mainItemRender}
      <div class={[tuc('virtual-main')]}>
        {#each list.slice(range.start, range.end + 1) as item, index}
          <div
            class={[tuc('virtual-item')]}
            use:onItemResize={`${item[isString(dataKey) ? dataKey : dataKey(item, index)]}`}
          >
            {@render mainItemRender(item)}
          </div>
        {/each}
      </div>
    {:else}
      {@render children?.()}
    {/if}
    {#if footerRender}
      {@render footerRender()}
    {/if}
  </div>
</div>

<style>
  @layer components {
    :global(.virtual-list) {
      @apply overflow-auto;
    }

    :global(.virtual-main) {
    }
  }
</style>
