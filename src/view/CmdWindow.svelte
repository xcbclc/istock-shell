<script lang="ts">
  import { onDestroy } from 'svelte';
  import { ScopeError } from '@istock/util';
  import { getWorker } from '@/worker';
  import type { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import type { TCmdWindow } from '@/store/window';
  import CmdInfo from './CmdInfo.svelte';
  import Cmd from './Cmd.svelte';
  import ModalAddCmdAlias from './components/modal/ModalAddCmdAlias.svelte';

  export let style: string;
  export let window: TCmdWindow;
  export let cmdWindowsManager: CmdWindowsManager;

  const worker = getWorker();
  const cmdWindowCtx = cmdWindowsManager.getCmdContext(window.id);
  const store = cmdWindowCtx.cmdStore;
  const { showCmdInfo } = store;
  let canListened = false;

  // 等待worker监听初始化store
  const onListened = (event: MessageEvent) => {
    if (event?.data?.address === 'event://@istock.application:0/lifecycle.listened') {
      canListened = true;
    }
  };
  worker.addEventListener('message', onListened);
  $: if (canListened && cmdWindowCtx) {
    cmdWindowCtx.initStore().catch((e) => {
      throw e instanceof Error ? e : new ScopeError('view', '初始化store报错');
    });
  }

  onDestroy(() => {
    worker.removeEventListener('message', onListened);
    cmdWindowCtx.destroy();
  });
</script>

<div class="window" {style} data-window-id={window.id}>
  {#if $showCmdInfo}
    <CmdInfo windowId={window.id} />
  {/if}
  <Cmd windowId={window.id} />
  <ModalAddCmdAlias windowId={window.id} />
</div>

<style lang="scss">
  .window {
    position: relative;
    box-sizing: border-box;
    padding: 0 0 var(--gap-default);
    flex-grow: 1;
    flex-shrink: 0;
    transition: width 0.2s ease-in;
    overflow: auto;
    &:not(:last-child) {
      border-right: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
</style>
