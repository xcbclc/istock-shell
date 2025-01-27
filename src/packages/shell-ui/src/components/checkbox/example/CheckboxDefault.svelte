<script lang="ts">
  import { ShCheckbox } from '../index';
  let value = $state<number[]>([0]);
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<div class="flex items-center justify-center gap-2">
  <ShCheckbox bind:value {options} />
</div>
{#if value.length}<p>您选择了：{value.join('、')}</p>{/if}
