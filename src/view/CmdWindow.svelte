<script lang="ts" module>
  export interface CmdWindowProp {
    windowId: number;
    class?: string;
    style?: string;
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { ScopeError } from '@istock-shell/util';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import Cmd from './Cmd.svelte';

  const { windowId, class: className = '', style = '' }: CmdWindowProp = $props();
  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const cmdWindowCtx = CmdWindowsManager.cmdWindowsManager.getCmdContext(windowId);

  const onMouseenter = () => {
    cmdWindow.store.windowView.currentFocusWindowId = windowId;
  };

  cmdWindowCtx.initStore().catch((e: any) => {
    throw e instanceof Error ? e : new ScopeError('view', '初始化store报错');
  });

  onMount(() => {
    return () => cmdWindowCtx.destroy();
  });
</script>

<div
  class={`relative box-border transition-all duration-300 bg-base-100 ${className}`}
  {style}
  data-window-id={window.id}
  onmouseenter={onMouseenter}
  tabindex="-1"
>
  <Cmd windowId={window.id} />
</div>
