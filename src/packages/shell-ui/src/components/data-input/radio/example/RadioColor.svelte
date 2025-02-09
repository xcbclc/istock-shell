<script lang="ts">
  import { ShRadio } from '@istock/shell-ui';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<ShRadio {options} color="primary" />
<ShRadio {options} color="secondary" />
<ShRadio {options} color="accent" />
<ShRadio {options} color="neutral" />
<ShRadio {options} color="info" />
<ShRadio {options} color="success" />
<ShRadio {options} color="warning" />
<ShRadio {options} color="error" />
