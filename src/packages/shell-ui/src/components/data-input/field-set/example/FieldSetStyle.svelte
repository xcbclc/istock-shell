<script lang="ts">
  import { ShFieldSet, ShField, ShInput } from '@istock/shell-ui';
</script>

<ShFieldSet title="页面标题" class="w-xs bg-base-200 border border-base-300 p-4 rounded-box">
  <ShField label={{ title: '您可以稍后从设置中编辑页面标题', position: 'after' }}>
    <ShInput placeholder="请输入页面标题" />
  </ShField>
</ShFieldSet>
