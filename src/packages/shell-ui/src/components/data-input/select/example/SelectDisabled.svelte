<script lang="ts">
  import { ShSelect } from '@istock-shell/ui';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2, disabled: true },
  ];
</script>

<ShSelect {options} disabled />
<ShSelect {options} />
