<script lang="ts">
  import { ShFieldSet, ShField, ShToggle } from '@istock-shell/ui';

  let value: boolean = $state(false);
</script>

<ShFieldSet title="登录选项" class="p-4 bg-base-100 border border-base-300 rounded-box w-64">
  <ShField label={{ title: '记住我', position: 'after' }}><ShToggle bind:value /></ShField>
</ShFieldSet>
