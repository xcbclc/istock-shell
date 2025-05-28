<script lang="ts">
  import { ShSelect } from '@istock-shell/ui';
  let value = $state<number>();
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<ShSelect bind:value {options} variant="ghost" placeholder="请选择" />
