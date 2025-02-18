<script lang="ts">
  import { ShEmpty, ShIcon, ShText } from '@istock/shell-ui';
</script>

<ShEmpty class="text-error">
  <ShIcon size={48} name="error" />
  <ShText size="sm" texts={[{ text: '获取数据错误' }]} />
</ShEmpty>
