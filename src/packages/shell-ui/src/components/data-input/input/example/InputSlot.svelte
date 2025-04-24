<script lang="ts">
  import { ShInput, ShIcon } from '@istock/shell-ui';
</script>

<ShInput placeholder="搜索">
  {#snippet prefixRender()}
    <ShIcon name="search" />
  {/snippet}
  {#snippet suffixRender()}
    <kbd class="kbd kbd-sm">⌘</kbd>
    <kbd class="kbd kbd-sm">K</kbd>
  {/snippet}
</ShInput>
<ShInput placeholder="index.php">
  {#snippet suffixRender()}
    <ShIcon name="file" />
  {/snippet}
</ShInput>
<ShInput placeholder="src/app/">
  {#snippet prefixRender()}
    路径
  {/snippet}
  {#snippet suffixRender()}
    <span class="badge badge-neutral badge-xs">选项</span>
  {/snippet}
</ShInput>
