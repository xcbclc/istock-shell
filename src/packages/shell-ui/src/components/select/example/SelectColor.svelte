<script lang="ts">
  import { ShSelect } from '../index';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <ShSelect {options} color="primary" />
  <ShSelect {options} color="secondary" />
  <ShSelect {options} color="accent" />
  <ShSelect {options} color="neutral" />
  <ShSelect {options} color="info" />
  <ShSelect {options} color="success" />
  <ShSelect {options} color="warning" />
  <ShSelect {options} color="error" />
</div>
