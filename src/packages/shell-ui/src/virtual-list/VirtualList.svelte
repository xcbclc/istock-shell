<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Virtual, EVirtualDirection } from './virtual';
  import type { TVirtualCoreRange } from './virtual-core';

  enum EViewType {
    'custom',
    'list',
  }
  export let viewType: number = EViewType.custom; // 显示方式
  export let dataSources: Array<Record<string, any> | Array<Record<string, any>>> = []; // 整个列表数组
  export let keeps: number = 25; // 保持元素个数
  export let direction: EVirtualDirection = EVirtualDirection.vertical; // 滚动方向
  export let dataKey: string | Function = 'id'; // id key
  export let topThreshold: number = 0; // 头部触发域值
  export let bottomThreshold: number = 0; // 底部触发域值
  export let slotHeaderSize: number = 0; // 头部插槽尺寸
  export let slotFooterSize: number = 0; // 底部插槽尺寸
  export let estimateSize: number = 32; // 元素平均大小
  export let scrollElement: Element | null = null; // 滚动元素，用来监听滚动事件
  export let scrollToIndex: number; // 滚动到索引位置
  export let scrollToOffset: number; // 滚动到该位置

  const sizeChangeInfo: Record<string, { id: string; size: number }> = {};
  let clearSizeChangeTimeout: number;
  let virtual: Virtual;
  let initVirtual: boolean = false;
  const shepherdElement: Element | null = null;
  let range: TVirtualCoreRange = {
    start: 0,
    end: 0,
    padFront: 0,
    padBehind: 0,
    totalHeight: 0,
  };
  let wrapperStyle: string = '';

  const onScroll = (event: Event) => {
    virtual.onScroll(event);
  };

  $: if (initVirtual) {
    virtual.syncDataSources(dataSources);
    virtual.core.updateParam('uniqueIds', virtual.getUniqueIdFromDataSources());
    virtual.core.handleDataSourcesChange();
  }

  $: if (initVirtual) {
    virtual.core.updateParam('keeps', keeps);
    virtual.core.handleSlotSizeChange();
  }

  $: if (initVirtual) {
    virtual.scrollToIndex(scrollToIndex);
  }

  $: if (initVirtual) {
    virtual.scrollToOffset(scrollToOffset);
  }

  $: if (initVirtual) {
    clearTimeout(clearSizeChangeTimeout);
    clearSizeChangeTimeout = window.setTimeout(() => {
      virtual.core.batchSaveSize(Object.values(sizeChangeInfo));
    }, 0);
  }

  $: if (initVirtual) {
    const { padFront, padBehind } = range;
    const paddingValue = virtual.isVertical()
      ? `${padFront}px 0px ${padBehind}px`
      : `0px ${padBehind}px 0px ${padFront}px`;
    wrapperStyle = `padding: ${paddingValue}`;
  }
  $: if (scrollElement && !initVirtual) {
    virtual = new Virtual({
      dataSources,
      keeps,
      direction,
      dataKey,
      topThreshold,
      bottomThreshold,
      slotHeaderSize,
      slotFooterSize,
      estimateSize,
      scrollElement,
      shepherdElement,
    });
    initVirtual = true;
    if (range.start) {
      virtual.scrollToIndex(range.start);
    } else if (range.offset) {
      range.scrollToOffset(range.offset);
    }
    virtual.eventEmitter.on('syncRange', (newRange: TVirtualCoreRange) => {
      console.log('syncRange', newRange);
      range = newRange;
    });
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    scrollElement.addEventListener('scroll', onScroll);
  }

  const updateItemResize = (node: HTMLElement, id: string) => {
    const item = sizeChangeInfo[id];
    const newItem = { id, size: Number(node.getBoundingClientRect().height.toFixed(2)) };
    if (item) {
      item.id = newItem.id;
      item.size = newItem.size;
    } else {
      sizeChangeInfo[id] = newItem;
    }
  };
  const onItemResize = (node: HTMLElement, id: string) => {
    updateItemResize(node, id);
    let resizeObserver: ResizeObserver | null = new ResizeObserver(() => {
      updateItemResize(node, id);
    });
    resizeObserver.observe(node);
    return {
      update(id: string) {
        updateItemResize(node, id);
      },
      destroy() {
        resizeObserver && resizeObserver.disconnect();
        resizeObserver = null;
      },
    };
  };

  onMount(() => {});
  onDestroy(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    scrollElement?.removeEventListener('scroll', onScroll);
    if (virtual) {
      initVirtual = false;
      virtual.destroy();
      virtual = undefined;
    }
  });
</script>

<div style={wrapperStyle} class="virtual-list-wrapper">
  {#if viewType === EViewType.custom}
    <slot
      name="custom"
      currentList={dataSources.slice(range.start, range.end + 1)}
      startIndex={range.start}
      {onItemResize}
    />
  {/if}
  {#if viewType === EViewType.list}
    <slot name="header" />
    {#each dataSources.slice(range.start, range.end + 1) as item}
      <slot name="item" {item} />
    {/each}
    <slot name="footer" />
  {/if}
</div>

<style lang="scss">
  .virtual-list-wrapper {
    will-change: padding;
  }
</style>
