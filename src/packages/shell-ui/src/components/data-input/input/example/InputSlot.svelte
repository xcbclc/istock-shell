<script lang="ts">
  import { ShInput, type InputRenderOption, ShIcon } from '@istock/shell-ui';
</script>

<ShInput prefixRender={searchRender} suffixRender={kbdRender} placeholder="搜索" />
<ShInput suffixRender={phpRender} placeholder="index.php" />
<ShInput prefixRender={pathRender} suffixRender={badgeRender} placeholder="src/app/" />

{#snippet searchRender(_opt: InputRenderOption)}
  <ShIcon name="search" />
{/snippet}
{#snippet kbdRender(_opt: InputRenderOption)}
  <kbd class="kbd kbd-sm">⌘</kbd>
  <kbd class="kbd kbd-sm">K</kbd>
{/snippet}
{#snippet phpRender(_opt: InputRenderOption)}
  <ShIcon name="file" />
{/snippet}
{#snippet pathRender(_opt: InputRenderOption)}
  路径
{/snippet}
{#snippet badgeRender(_opt: InputRenderOption)}
  <span class="badge badge-neutral badge-xs">选项</span>
{/snippet}
