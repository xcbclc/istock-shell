<script lang="ts">
  import { onDestroy } from 'svelte';
  import { ScopeError } from '@istock/util';
  import { getWorker } from '@/worker';
  import type { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import type { TCmdWindow } from '@/store/window';
  import CmdInfo from './CmdInfo.svelte';
  import Cmd from './Cmd.svelte';
  import ModalAddCmdAlias from './components/modal/ModalAddCmdAlias.svelte';
  import ModalCookieManage from './components/modal/ModalCookieManage.svelte';
  import CmdSearchMain from './components/search/CmdSearchMain.svelte';
  import type { TSearchListItem } from '@/store/domains/global/search';

  export let window: TCmdWindow;
  export let cmdWindowsManager: CmdWindowsManager;

  const worker = getWorker();
  const cmdWindowCtx = cmdWindowsManager.getCmdContext(window.id);
  const { search, cookieManage } = cmdWindowCtx.domainStore;
  const { showCmdInfo, cmdWindow } = cmdWindowCtx.cmdStore;
  let canListened = false;

  // 等待worker监听初始化store
  const onListened = (event: MessageEvent) => {
    if (event?.data?.address === 'event://@istock.application:0/lifecycle.listened') {
      canListened = true;
    }
  };
  worker.addEventListener('message', onListened);
  $: if (canListened && cmdWindowCtx) {
    cmdWindowCtx.initStore().catch((e: any) => {
      throw e instanceof Error ? e : new ScopeError('view', '初始化store报错');
    });
  }

  const onKeydown = (ev: KeyboardEvent) => {
    if (cmdWindowCtx.isExample) return;
    cmdWindow.onCmdWindowKeyAction(ev, window, cmdWindowCtx);
  };

  const onSelectedSearchResult = (ev: CustomEvent<TSearchListItem>) => {
    search.close();
    search.runAction(ev.detail);
  };

  onDestroy(() => {
    worker.removeEventListener('message', onListened);
    cmdWindowCtx.destroy();
  });
</script>

<div
  class="window"
  style={window.styleRecord[window.id]}
  data-window-id={window.id}
  on:keydown={onKeydown}
  tabindex="-1"
>
  {#if $showCmdInfo}
    <CmdInfo windowId={window.id} />
  {/if}
  <Cmd windowId={window.id} />
  <ModalAddCmdAlias windowId={window.id} />
  {#if $search.isOpen}
    <CmdSearchMain windowId={window.id} on:selectedSearchResult={onSelectedSearchResult} />
  {/if}
  {#if $cookieManage.isOpen}
    <ModalCookieManage windowId={window.id} />
  {/if}
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
