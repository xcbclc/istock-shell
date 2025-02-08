<script lang="ts">
  import { ShRadio } from '../index';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1, disabled: true },
    { label: '基金', value: 2, disabled: true },
  ];
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <div class="flex gap-2">
    <ShRadio {options} disabled />
  </div>
  <div class="flex gap-2">
    <ShRadio {options} />
  </div>
  <div class="flex gap-2">
    <ShRadio {options} color="primary" />
  </div>
</div>
