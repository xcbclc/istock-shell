<script lang="ts">
  import { onDestroy } from 'svelte';
  import { getQueryParam } from '@istock/util';
  import { CmdWindowsManager, type TCmdWindowsManagerOptions } from '@/window/cmd-windows-manager';
  import { getCmdWindow } from '@/store/cmd/cmd-window';
  import CmdWindow from './CmdWindow.svelte';

  const mode = getQueryParam('mode');
  const cmdWindowsManagerOptions: TCmdWindowsManagerOptions = {};
  if (mode) {
    cmdWindowsManagerOptions.mode = mode;
  }
  const cmdWindowsManager = CmdWindowsManager.getInstance(cmdWindowsManagerOptions);
  const cmdWindow = getCmdWindow();
  onDestroy(() => {});
</script>

<section class="window-warp">
  {#each $cmdWindow as window, index (index)}
    <CmdWindow {window} {cmdWindowsManager} />
  {/each}
</section>

<style lang="scss">
  .window-warp {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100vh;
  }
</style>
