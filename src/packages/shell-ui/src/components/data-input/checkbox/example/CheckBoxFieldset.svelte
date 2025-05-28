<script lang="ts">
  import { ShCheckbox, ShFieldSet } from '@istock-shell/ui';
</script>

<ShFieldSet title="登录选项" class="p-4 bg-base-100 border border-base-300 rounded-box w-64">
  <ShCheckbox options={[{ value: true, label: '记住我' }]} size="sm" />
</ShFieldSet>
