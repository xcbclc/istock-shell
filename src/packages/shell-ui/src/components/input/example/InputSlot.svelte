<script lang="ts">
  import { ShInput, type InputRenderOption } from '../index';
</script>

<div class="flex items-center justify-center flex-col gap-4">
  <ShInput prefixRender={searchRender} suffixRender={kbdRender} placeholder="搜索" />
  <ShInput suffixRender={phpRender} placeholder="index.php" />
  <ShInput prefixRender={pathRender} suffixRender={badgeRender} placeholder="src/app/" />

  {#snippet searchRender(_opt: InputRenderOption)}
    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      ><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"
        ><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g
      ></svg
    >
  {/snippet}
  {#snippet kbdRender(_opt: InputRenderOption)}
    <kbd class="kbd kbd-sm">⌘</kbd>
    <kbd class="kbd kbd-sm">K</kbd>
  {/snippet}
  {#snippet phpRender(_opt: InputRenderOption)}
    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      ><g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor"
        ><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"
        ></path></g
      ></svg
    >
  {/snippet}
  {#snippet pathRender(_opt: InputRenderOption)}
    Path
  {/snippet}
  {#snippet badgeRender(_opt: InputRenderOption)}
    <span class="badge badge-neutral badge-xs">选项</span>
  {/snippet}
</div>
