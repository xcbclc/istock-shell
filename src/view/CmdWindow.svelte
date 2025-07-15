<script lang="ts" module>
  export interface CmdWindowProp {
    windowId: number;
    class?: string;
    style?: string;
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { CmdWindowsManager } from '@/window';
  import Cmd from './Cmd.svelte';

  const { windowId, class: className = '', style = '' }: CmdWindowProp = $props();
  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const ctx = CmdWindowsManager.cmdWindowsManager.getCmdContext(windowId);

  const onMouseenter = () => {
    cmdWindow.store.windowView.currentFocusWindowId = windowId;
  };

  onMount(() => {
    ctx.start();
    return () => ctx.destroy();
  });
</script>

{#if ctx.isInitialized}
  <div
    class={`relative box-border transition-all duration-300 bg-base-100 ${className}`}
    {style}
    data-window-id={windowId}
    onmouseenter={onMouseenter}
    tabindex="-1"
  >
    <Cmd {windowId} />
  </div>
{/if}
