<script lang="ts">
  import { ShCheckbox } from '@istock/shell-ui';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1, disabled: true },
    { label: '基金', value: 2, disabled: true },
  ];
</script>

<ShCheckbox {options} disabled />
<ShCheckbox {options} />
<ShCheckbox {options} color="primary" />
