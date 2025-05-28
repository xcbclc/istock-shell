<script lang="ts">
  import { ShCheckbox } from '@istock-shell/ui';

  const options = [
    { label: '股票', value: 0 },
    { label: '债券', value: 1 },
    { label: '基金', value: 2 },
  ];
</script>

<ShCheckbox {options} size="xs" />
<ShCheckbox {options} size="sm" />
<ShCheckbox {options} size="md" />
<ShCheckbox {options} size="lg" />
<ShCheckbox {options} size="xl" />
