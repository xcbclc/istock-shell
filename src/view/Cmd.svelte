<script lang="ts" module>
  export interface CmdProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import CmdInfo from './CmdInfo.svelte';
  import CmdMain from './components/main/CmdMain.svelte';
  import CmdForm from './components/form/CmdForm.svelte';

  const { windowId }: CmdProps = $props();
  const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);
  const { showCmdInfo } = ctx.cmdStore;
</script>

<section class="flex flex-col h-full box-border">
  <div class="flex-auto overflow-auto">
    {#if $showCmdInfo}
      <CmdInfo {windowId} />
    {:else}
      <CmdMain {windowId} />
    {/if}
  </div>
  <CmdForm {windowId} />
</section>
