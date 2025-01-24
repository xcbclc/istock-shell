<script lang="ts" module>
  import { ShRadio } from '../index';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <div class="flex gap-2"><ShRadio {options} size="xs" /></div>
  <div class="flex gap-2"><ShRadio {options} size="sm" /></div>
  <div class="flex gap-2"><ShRadio {options} size="md" /></div>
  <div class="flex gap-2"><ShRadio {options} size="lg" /></div>
  <div class="flex gap-2"><ShRadio {options} size="xl" /></div>
</div>
