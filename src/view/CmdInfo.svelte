<script lang="ts">
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';

  export let windowId: number;

  const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);
  const { cmdInfo } = ctx.cmdStore;
</script>

<section class="cmd-info">
  <h1>
    {#if $cmdInfo.title === 'iStock Shell'}
      <pre>{$cmdInfo.asciiTitle}</pre>
    {:else}
      {$cmdInfo.title}
    {/if}
  </h1>
  <p>版本：v{$cmdInfo.version}</p>
  <p>免责声明：</p>
  <div class="cmd-info-doc">
    {#each ($cmdInfo.disclaimer || '').split('\n') as str}
      <p>{str}</p>
    {/each}
  </div>
</section>

<style lang="scss">
  :root {
    --cmd-info-title: 1.4em;
    --cmd-info-description: var(--font-size-default);
    --cmd-info-pre: var(--font-size-smaller);
    --cmd-info-gap: var(--gap-default);
    --cmd-info-color: var(--color-primary);
  }
  .cmd-info {
    position: absolute;
    top: 0;
    left: var(--cmd-info-gap);
    right: var(--cmd-info-gap);
    padding: var(--cmd-info-gap);
    overflow: auto;
    color: var(--cmd-info-color);
    z-index: 0;
  }
  .cmd-info-doc {
    p {
      font-size: var(--font-size-default);
    }
  }
  h1 {
    font-size: var(--cmd-info-title);
    font-weight: var(--font-weight);
    pre {
      font-size: var(--cmd-info-pre);
    }
  }
  p {
    font-size: var(--cmd-info-description);
  }
</style>
