<script lang="ts">
  import { ShSelect } from '@istock/shell-ui';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<ShSelect {options} color="primary" />
<ShSelect {options} color="secondary" />
<ShSelect {options} color="accent" />
<ShSelect {options} color="neutral" />
<ShSelect {options} color="info" />
<ShSelect {options} color="success" />
<ShSelect {options} color="warning" />
<ShSelect {options} color="error" />
