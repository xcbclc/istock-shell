<script lang="ts">
  import { ShTextarea, ShFieldSet, ShField } from '@istock-shell/ui';

  let value: string = $state('');
</script>

<ShFieldSet title="您的简介?">
  <ShField label={{ title: `简介: ${value ?? ''}`, position: 'after' }}
    ><ShTextarea bind:value placeholder="请输入" /></ShField
  >
</ShFieldSet>
