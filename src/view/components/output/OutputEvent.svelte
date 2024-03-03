<script lang="ts">
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  export let windowId: number;
  export let data: unknown;
  export let eventAddress: string;
  export let source: string;
  if (source === 'message' && eventAddress) {
    const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);
    void ctx.event.emit(eventAddress, data);
  }
</script>
