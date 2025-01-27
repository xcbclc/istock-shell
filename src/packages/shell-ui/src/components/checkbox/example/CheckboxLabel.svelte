<script lang="ts">
  import { ShCheckbox } from '../index';
  let value = $state<number[]>([]);
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <div class="flex gap-2"><ShCheckbox bind:value {options} label={{ position: 'before' }} /></div>
  <div class="flex gap-2"><ShCheckbox bind:value {options} label={{ position: 'after' }} /></div>
</div>
