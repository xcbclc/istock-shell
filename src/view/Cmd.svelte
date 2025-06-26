<script lang="ts" module>
  export interface CmdProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { CmdWindowsManager } from '@/window';
  import CmdInfo from './components/display/CmdInfo.svelte';
  import CmdMain from './components/output/CmdMain.svelte';
  import CmdForm from './components/input/CmdForm.svelte';

  const { windowId }: CmdProps = $props();
  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { shellInfo } = cmdWindow.store;
</script>

<section class="flex flex-col h-full box-border">
  <div class="flex-auto overflow-auto">
    {#if shellInfo.readState}
      <CmdMain {windowId} />
    {:else}
      <CmdInfo {windowId} />
    {/if}
  </div>
  <CmdForm {windowId} />
</section>
