<script lang="ts">
  import { ShVirtualList, type VirtualListProps } from '@istock-shell/ui';

  // 定义列表项数据类型
  type ListItem = {
    id: string;
    name: string;
    description: string;
  };

  // 生成示例数据 - 10000条记录演示虚拟滚动性能
  let list: ListItem[] = $state(
    Array.from({ length: 10000 }).map((_, index) => ({
      id: `item-${index}`,
      name: `项目 ${index + 1}`,
      description: `这是第 ${index + 1} 个列表项的描述信息`,
    }))
  );

  // 添加新项目到列表
  const addItem = () => {
    const newIndex = list.length;
    list.push({
      id: `item-${newIndex}`,
      name: `新项目 ${newIndex + 1}`,
      description: `这是新添加的第 ${newIndex + 1} 个项目`,
    });
  };

  // 清空列表
  const clearList = () => {
    list = [];
  };

  // 重置列表
  const resetList = () => {
    list = Array.from({ length: 10000 }).map((_, index) => ({
      id: `item-${index}`,
      name: `项目 ${index + 1}`,
      description: `这是第 ${index + 1} 个列表项的描述信息`,
      color: `hsl(${(index * 137.5) % 360}, 70%, 85%)`,
    }));
  };
</script>

<p class="text-primary text-lg font-semibold">总计: {list.length} 项</p>
<!-- 操作按钮 -->
<div class="mb-4 flex gap-2">
  <button class="btn btn-primary btn-sm" onclick={addItem}> 添加项目 </button>
  <button class="btn btn-warning btn-sm" onclick={clearList}> 清空列表 </button>
  <button class="btn btn-secondary btn-sm" onclick={resetList}> 重置列表 </button>
</div>

<!-- 虚拟列表容器 -->
<ShVirtualList {list} class="w-full h-96 border border-base-300 rounded-lg">
  {#snippet itemChildrenRender(item: ListItem, index: number)}
    <div class="p-4 border-b border-base-200 hover:bg-base-100 transition-colors">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-semibold text-base-content">{item.name}</h3>
          <p class="text-sm text-base-content/70 mt-1">{item.description}</p>
        </div>
        <div class="text-xs text-base-content/50">
          索引: {index}
        </div>
      </div>
    </div>
  {/snippet}
</ShVirtualList>
