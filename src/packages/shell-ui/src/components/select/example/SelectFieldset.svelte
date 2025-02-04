<script lang="ts">
  import { ShSelect } from '../index';
  let value = $state<number>();
  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<div class="flex items-center justify-center">
  <fieldset class="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-64">
    <legend class="fieldset-legend">请选择</legend>
    <ShSelect {options} bind:value />
    <span class="fieldset-label">Optional: {value ?? ''}</span>
  </fieldset>
</div>
