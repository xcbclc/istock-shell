<script lang="ts">
  import { ShInput, ShFieldSet, ShField } from '@istock/shell-ui';

  let value: string = $state('');
</script>

<ShFieldSet title="您的姓名是?">
  <ShField label={{ title: `姓名: ${value ?? ''}`, position: 'after' }}>
    <ShInput bind:value placeholder="请输入" />
  </ShField>
</ShFieldSet>
