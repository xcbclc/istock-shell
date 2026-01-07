<script lang="ts">
  import { onMount } from 'svelte';
  import { getQueryParam } from '@istock-shell/util';
  import { shShowMessage } from '@istock-shell/ui';
  import { CmdWindowsManager, type CmdWindowMode, type CmdWindowsManagerOptions } from '@/window';
  import CmdWindow from './CmdWindow.svelte';
  import CmdAddAliasModal from './components/action/CmdAddAliasModal.svelte';
  import CmdSearchMain from './components/action/CmdSearchMain.svelte';
  import CmdSetting from './components/setting/CmdSetting.svelte';

  const mode = getQueryParam('mode') as CmdWindowMode;
  const cmdWindowsManagerOptions: CmdWindowsManagerOptions = {};
  if (mode) {
    cmdWindowsManagerOptions.mode = mode;
  }
  CmdWindowsManager.getInstance(cmdWindowsManagerOptions);
  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { windowView, cmdAlias, search, user } = cmdWindow.store;
  const isInitialized = $derived.by(() => cmdWindow.isInitialized); // 解决 CmdWindows 初始化后才未显示的问题
  const onWindowKeydown = (event: KeyboardEvent) => {
    if (cmdWindow.isDemoMode) return;
    windowView.onWindowViewKeyAction(event);
  };
  window.CmdWindowsManager = CmdWindowsManager;
  onMount(() => {
    return () => {
      cmdWindow.destroy();
    };
  });

  $effect(() => {
    if (user.loginStatus.status && user.loginStatus.message) {
      shShowMessage.info(user.loginStatus.message);
    }
  });
</script>

{#if isInitialized}
  <section
    role="application"
    onkeydown={onWindowKeydown}
    class="flex flex-wrap w-full h-screen bg-base-100 text-base-content overflow-hidden"
  >
    {#each windowView.list as windowViewItem, index (index)}
      <CmdWindow
        windowId={windowViewItem.id}
        style={windowView.styleRecord[windowViewItem.id] ?? ''}
        class={windowView.windowCount > 1 ? 'border border-base-300/20' : ''}
      />
    {/each}
  </section>
  {#if cmdAlias.modal.show}
    <CmdAddAliasModal windowId={windowView.currentFocusWindowId} />
  {/if}
  {#if search.show}
    <CmdSearchMain windowId={windowView.currentFocusWindowId} />
  {/if}
  <CmdSetting windowId={windowView.currentFocusWindowId} />
{/if}
