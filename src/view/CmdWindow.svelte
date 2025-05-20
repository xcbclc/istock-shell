<script lang="ts" module>
  import type { TCmdWindow } from '@/store/cmd/cmd-window';
  export interface CmdWindowProp {
    window: TCmdWindow;
    class?: string;
  }
</script>

<script lang="ts">
  import { onDestroy } from 'svelte';
  import { ScopeError } from '@istock/util';
  import { getWorker } from '@/worker';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import type { TSearchListItem } from '@/store/domains/global/search';
  import Cmd from './Cmd.svelte';
  import CmdAddAliasModal from './components/modal/CmdAddAliasModal.svelte';
  import CmdCookieManageModal from './components/modal/CmdCookieManageModal.svelte';
  import CmdSearchMain from './components/search/CmdSearchMain.svelte';

  const { window, class: className = '' }: CmdWindowProp = $props();
  const worker = getWorker();
  const cmdWindowCtx = CmdWindowsManager.cmdWindowsManager.getCmdContext(window.id);
  const { search, cookieManage, addCmdAlias, themeConfig } = cmdWindowCtx.domainStore;
  const { cmdWindow } = cmdWindowCtx.cmdStore;
  let canListened = $state(false);

  // 等待worker监听初始化store
  const onListened = (event: MessageEvent) => {
    if (event?.data?.address === 'event://@istock.application:0/lifecycle.listened') {
      canListened = true;
    }
  };
  worker.addEventListener('message', onListened);

  const onKeydown = (ev: KeyboardEvent) => {
    if (cmdWindowCtx.isExample) return;
    cmdWindow.onCmdWindowKeyAction(ev, window, cmdWindowCtx);
  };

  const onSelectedSearchResult = (data: TSearchListItem) => {
    search.close();
    search.runAction(data);
  };

  $effect(() => {
    if (canListened && cmdWindowCtx) {
      cmdWindowCtx
        .initStore()
        .then(async () => {
          const themeName = document.documentElement.getAttribute('data-theme') ?? '';
          if (themeName) {
            const keys = [
              'color-scheme',
              '--color-base-100',
              '--color-base-200',
              '--color-base-300',
              '--color-base-content',
              '--color-primary',
              '--color-primary-content',
              '--color-secondary',
              '--color-secondary-content',
              '--color-accent',
              '--color-accent-content',
              '--color-neutral',
              '--color-neutral-content',
              '--color-info',
              '--color-info-content',
              '--color-success',
              '--color-success-content',
              '--color-warning',
              '--color-warning-content',
              '--color-error',
              '--color-error-content',
            ];
            const variables = keys.reduce<Record<string, string>>((record, key) => {
              record[key] = getComputedStyle(document.documentElement).getPropertyValue(key);
              return record;
            }, {});
            await themeConfig.createOrUpdate({
              name: themeName,
              variables,
            });
          }
        })
        .catch((e: any) => {
          throw e instanceof Error ? e : new ScopeError('view', '初始化store报错');
        });
    }
  });

  onDestroy(() => {
    worker.removeEventListener('message', onListened);
    cmdWindowCtx.destroy();
  });
</script>

<div
  class={`relative box-border transition-all duration-300 bg-base-100 ${className}`}
  style={window.styleRecord[window.id]}
  data-window-id={window.id}
  onkeydown={onKeydown}
  tabindex="-1"
>
  <Cmd windowId={window.id} />
  {#if $addCmdAlias.modal.visible}
    <CmdAddAliasModal windowId={window.id} />
  {/if}
  {#if $cookieManage.isOpen}
    <CmdCookieManageModal windowId={window.id} />
  {/if}
  {#if $search.isOpen}
    <CmdSearchMain windowId={window.id} {onSelectedSearchResult} onClose={search.close} />
  {/if}
</div>
