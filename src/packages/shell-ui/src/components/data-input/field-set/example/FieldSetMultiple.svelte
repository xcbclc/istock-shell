<script lang="ts">
  import { ShFieldSet, ShField, ShInput, ShTextarea } from '@istock/shell-ui';
</script>

<ShFieldSet title="页面详细" class="w-xs bg-base-200 border border-base-300 p-4 rounded-box">
  <ShField label="标题">
    <ShInput placeholder="请输入页面标题" />
  </ShField>
  <ShField label="描述">
    <ShTextarea placeholder="请输入页面描述" />
  </ShField>
  <ShField label="作者">
    <ShInput placeholder="请输入作者" />
  </ShField>
</ShFieldSet>
