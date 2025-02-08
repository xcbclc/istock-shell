<script lang="ts">
  import { ShSelect } from '../index';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <ShSelect {options} size="xs" />
  <ShSelect {options} size="sm" />
  <ShSelect {options} size="md" />
  <ShSelect {options} size="lg" />
  <ShSelect {options} size="xl" />
</div>
