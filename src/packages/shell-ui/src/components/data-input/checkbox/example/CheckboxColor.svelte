<script lang="ts">
  import { ShCheckbox } from '@istock-shell/ui';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<ShCheckbox {options} color="primary" />
<ShCheckbox {options} color="secondary" />
<ShCheckbox {options} color="accent" />
<ShCheckbox {options} color="neutral" />
<ShCheckbox {options} color="info" />
<ShCheckbox {options} color="success" />
<ShCheckbox {options} color="warning" />
<ShCheckbox {options} color="error" />
