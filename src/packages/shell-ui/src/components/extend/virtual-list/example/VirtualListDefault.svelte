<script lang="ts">
  import {
    ShVirtualList,
    ShList,
    ShListRow,
    ShButton,
    type VirtualListProps,
    type ListRowProps,
    type VirtualCoreRange,
  } from '@istock-shell/ui';

  // 生成虚拟列表测试数据（10000条）
  let list: Array<ListRowProps & { id: string }> = $state(
    Array.from({ length: 10000 }).map((_, index) => ({
      id: `${index + 1}`, // 唯一标识符
      text: `Dio Lupa ${index + 1}`, // 主标题
      // 动态描述内容（两种格式交替）
      description:
        index % 2 === 0
          ? 'Remaining Reason'
          : '"Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.',
      picture: {
        img: {
          class: 'size-10 rounded-box',
          src: 'https://img.daisyui.com/images/profile/demo/1@94.webp',
        },
      },
      actions: [
        // 操作按钮配置
        { size: 'sm', icon: { name: 'play', size: 'sm' } }, // 播放按钮
        { size: 'sm', icon: { name: 'heart', size: 'sm' } }, // 收藏按钮
      ],
    }))
  );

  // 虚拟列表核心配置属性（类型安全）
  const virtualListProps: VirtualListProps<ListRowProps> = $state({ list });

  // 当前可视区域范围状态（用于跟踪渲染区间）
  let range: VirtualCoreRange | undefined = $state();

  // 虚拟列表组件实例引用（用于调用组件方法）
  let virtualList: ShVirtualList;

  // 可视区域变化回调（当用户滚动时触发）
  const onRangeChange = (newRange: VirtualCoreRange) => {
    range = newRange; // 更新当前可见范围
  };

  // 动态改变列表项高度（测试自适应高度功能）
  const onChangeHeight = () => {
    list = list.map((item) => {
      item.description =
        Math.random() < 0.5
          ? 'Remaining Reason'
          : '"Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.';
      return item;
    });
  };

  // 列表项尺寸变化回调（当元素尺寸变化时通知虚拟列表）
  const onItemResize = (node: HTMLElement, id: string) => {
    virtualList?.onItemResize(node, id); // 调用虚拟列表的尺寸更新方法
  };
</script>

<!-- 动态高度测试按钮 -->
<ShButton onclick={onChangeHeight}>动态高度</ShButton>

<ShVirtualList
  bind:this={virtualList}
  {...virtualListProps}
  {onRangeChange}
  class="w-full max-h-100"
>
  <ShList>
    {#if range}
      {#each list.slice(range?.start, range?.end + 1) as item (item.id)}
        <!-- 动态渲染可视区域内的列表项 -->
        <ShListRow
          {...item}
          onRender={(node: HTMLElement) => {
            onItemResize(node, item.id); // 在渲染完成时触发尺寸更新
          }}
        />
      {/each}
    {/if}
  </ShList>
</ShVirtualList>
