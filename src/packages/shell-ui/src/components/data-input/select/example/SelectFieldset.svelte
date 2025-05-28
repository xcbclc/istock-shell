<script lang="ts">
  import { ShSelect, ShFieldSet, ShField } from '@istock-shell/ui';
  let value = $state<number>();
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<ShFieldSet title="请选择" class="p-4 bg-base-100 border border-base-300 rounded-box w-64">
  <ShField
    label={{ title: `选择了: ${options.find((option) => option.value === value)?.label ?? ''}`, position: 'after' }}
  >
    <ShSelect {options} bind:value />
  </ShField>
</ShFieldSet>
