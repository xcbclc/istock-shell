<script lang="ts">
  import { ShFieldSet, ShField } from '../index';
  import { ShInput } from '../../input/index';
  import { ShTextarea } from '../../textarea/index';
</script>

<div class="flex items-center justify-center gap-2">
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
</div>
