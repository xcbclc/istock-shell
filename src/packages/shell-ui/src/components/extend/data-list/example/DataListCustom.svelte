<script lang="ts">
  import { ShDataList, ShDataListOption, ShInput } from '@istock-shell/ui';

  const options = $state([
    {
      value: 'user1',
      label: '用户1',
      icon: '👤',
      description: '普通用户',
    },
    {
      value: 'user2',
      label: '用户2',
      icon: '👑',
      description: 'VIP用户',
    },
  ]);
</script>

<ShInput list="custom-list" placeholder="请选择用户" />
<ShDataList id="custom-list">
  {#each options as option}
    <ShDataListOption value={option.value}>
      <div class="flex items-center gap-8">
        <span class="icon">{option.icon}</span>
        <span class="label">{option.label}</span>
        <span class="text-sm">{option.description}</span>
      </div>
    </ShDataListOption>
  {/each}
</ShDataList>
