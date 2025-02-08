<script lang="ts">
  import { ShCheckbox } from '@istock/shell-ui';
  let value = $state<number[]>([]);
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<ShCheckbox bind:value {options} label={{ position: 'before' }} />
<ShCheckbox bind:value {options} label={{ position: 'after' }} />
