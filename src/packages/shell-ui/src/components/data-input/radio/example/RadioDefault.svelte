<script lang="ts">
  import { ShRadio } from '../index';
  let value = $state<number>();
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<div class="flex items-center justify-center gap-2">
  <ShRadio bind:value {options} />
</div>
{#if value !== undefined}<p>您选择了：{options[value]?.label}</p>{/if}
