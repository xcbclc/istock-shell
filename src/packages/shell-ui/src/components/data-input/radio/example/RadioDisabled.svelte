<script lang="ts">
  import { ShRadio } from '../index';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1, disabled: true },
    { label: '基金', value: 2, disabled: true },
  ];
</script>

<ShRadio {options} disabled />
<ShRadio {options} />
<ShRadio {options} color="primary" />
