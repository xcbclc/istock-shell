<script lang="ts">
  import { ShRadio } from '@istock/shell-ui';
  let value = $state<number>();
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<ShRadio bind:value {options} />
<p>您选择了：{value !== undefined ? options[value]?.label : ''}</p>
