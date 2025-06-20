<script lang="ts">
  import { onMount } from 'svelte';
  import { getQueryParam } from '@istock-shell/util';
  import { CmdWindowsManager, type TCmdWindowsManagerOptions } from '@/window/cmd-windows-manager';
  import { type CmdWindowMode } from '@/window/cmd-window-context';
  import { getWorker } from '@/worker';
  import CmdWindow from './CmdWindow.svelte';
  import CmdAddAliasModal from './components/action/CmdAddAliasModal.svelte';
  import CmdSearchMain from './components/action/CmdSearchMain.svelte';
  import CmdSetting from './components/setting/CmdSetting.svelte';

  const worker = getWorker();

  const mode = getQueryParam('mode') as CmdWindowMode;
  const cmdWindowsManagerOptions: TCmdWindowsManagerOptions = {};
  if (mode) {
    cmdWindowsManagerOptions.mode = mode;
  }
  CmdWindowsManager.getInstance(cmdWindowsManagerOptions);
  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { windowView, cmdAlias, search } = cmdWindow.store;
  let messageListened: boolean = $state(false);

  const onWindowKeydown = (event: KeyboardEvent) => {
    if (cmdWindow.isDemoMode) return;
    windowView.onWindowViewKeyAction(event);
  };
  const onMessageListened = (event: MessageEvent) => {
    if (event?.data?.address === 'event://@istock.application:0/lifecycle.listened') {
      messageListened = true;
      cmdWindow.init();
    }
  };
  worker.addEventListener('message', onMessageListened);
  onMount(() => {
    return () => {
      worker.removeEventListener('message', onMessageListened);
    };
  });
</script>

{#if messageListened && cmdWindow.isInitialized}
  <section
    onkeydown={onWindowKeydown}
    class="flex flex-wrap w-full h-screen bg-base-100 text-base-content overflow-hidden"
  >
    {#each windowView.data as windowViewItem, index (index)}
      <CmdWindow
        windowId={windowViewItem.id}
        style={windowView.styleRecord[windowViewItem.id] ?? ''}
        class={windowView.windowCount > 1 ? 'border border-base-300/20' : ''}
      />
    {/each}
  </section>
  {#if cmdAlias.modal.show}
    <CmdAddAliasModal windowId={window.id} />
  {/if}
  {#if search.show}
    <CmdSearchMain windowId={window.id} />
  {/if}
  <CmdSetting />
{/if}
