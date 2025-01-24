<script lang="ts" module>
  import { ShRadio } from '../index';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <div class="flex gap-2">
    <ShRadio
      {options}
      class="bg-red-100 border-red-300 checked:bg-red-200 checked:text-red-600 checked:border-red-600"
    />
  </div>
  <div class="flex gap-2">
    <ShRadio
      {options}
      class="bg-blue-100 border-blue-300 checked:bg-blue-200 checked:text-blue-600 checked:border-blue-600"
    />
  </div>
</div>
