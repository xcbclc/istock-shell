<script lang="ts">
  import { onDestroy } from 'svelte';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import { getCmdWindows, getCmdWindowStyles } from '@/store/window';
  import CmdWindow from './CmdWindow.svelte';

  const cmdWindowsManager = CmdWindowsManager.getInstance();
  const cmdWindows = getCmdWindows();
  const cmdWindowStyles = getCmdWindowStyles();
  const unsubscriber = cmdWindowStyles.onCmdWindowChangeUpdate();

  onDestroy(() => {
    unsubscriber();
  });
</script>

<section class="window-warp">
  {#each $cmdWindows as window, index (index)}
    <CmdWindow {window} {cmdWindowsManager} style={$cmdWindowStyles[index]} />
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
