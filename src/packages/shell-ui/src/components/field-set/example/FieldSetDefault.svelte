<script lang="ts">
  import { ShFieldSet, ShField } from '../index';
  import { ShInput } from '../../input/index';
</script>

<div class="flex items-center justify-center gap-2">
  <ShFieldSet title="页面标题">
    <ShField label={{ title: '您可以稍后从设置中编辑页面标题', position: 'after' }}>
      <ShInput placeholder="请输入页面标题" />
    </ShField>
  </ShFieldSet>
</div>
