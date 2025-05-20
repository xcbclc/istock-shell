<script lang="ts">
  import { getQueryParam } from '@istock/util';
  import { CmdWindowsManager, type TCmdWindowsManagerOptions } from '@/window/cmd-windows-manager';
  import { type ECmdWindowContextMode } from '@/window/cmd-window-context';
  import { getCmdWindow } from '@/store/cmd/cmd-window';
  import CmdWindow from './CmdWindow.svelte';

  const mode = getQueryParam('mode') as ECmdWindowContextMode;
  const cmdWindowsManagerOptions: TCmdWindowsManagerOptions = {};
  if (mode) {
    cmdWindowsManagerOptions.mode = mode;
  }
  CmdWindowsManager.getInstance(cmdWindowsManagerOptions);
  const cmdWindow = getCmdWindow();
  cmdWindow.onCmdWindowChangeUpdate();
</script>

<section class="flex flex-wrap w-full h-screen bg-base-100 text-base-content overflow-hidden">
  {#each $cmdWindow as window, index (index)}
    <CmdWindow {window} class={$cmdWindow.length > 1 ? 'border border-base-300/20' : ''} />
  {/each}
</section>
