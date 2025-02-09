<script lang="ts">
  import { ShRadio } from '@istock/shell-ui';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<ShRadio {options} size="xs" />
<ShRadio {options} size="sm" />
<ShRadio {options} size="md" />
<ShRadio {options} size="lg" />
<ShRadio {options} size="xl" />
