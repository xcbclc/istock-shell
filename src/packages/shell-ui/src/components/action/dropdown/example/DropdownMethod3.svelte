<script lang="ts">
  import { ShDropdown } from '@istock/shell-ui';
</script>

<p class="text-xs">点击外面关闭</p>
<ShDropdown items={[{ text: '项目 1' }, { text: '项目 2' }]} triggerElement={{ text: '打开或关闭' }}></ShDropdown>
