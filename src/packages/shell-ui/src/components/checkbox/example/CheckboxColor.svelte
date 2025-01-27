<script lang="ts">
  import { ShCheckbox } from '../index';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <div class="flex gap-2"><ShCheckbox {options} color="primary" /></div>
  <div class="flex gap-2"><ShCheckbox {options} color="secondary" /></div>
  <div class="flex gap-2"><ShCheckbox {options} color="accent" /></div>
  <div class="flex gap-2"><ShCheckbox {options} color="neutral" /></div>
  <div class="flex gap-2"><ShCheckbox {options} color="info" /></div>
  <div class="flex gap-2"><ShCheckbox {options} color="success" /></div>
  <div class="flex gap-2"><ShCheckbox {options} color="warning" /></div>
  <div class="flex gap-2"><ShCheckbox {options} color="error" /></div>
</div>
