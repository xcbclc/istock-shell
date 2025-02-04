<script lang="ts">
  import { ShSelect } from '../index';
  let value = $state<number>();
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <ShSelect bind:value {options} placeholder="请选择" />
  <p>您选择了：{value}</p>
</div>
