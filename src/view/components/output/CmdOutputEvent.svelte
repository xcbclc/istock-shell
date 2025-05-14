<script lang="ts" module>
  export interface CmdOutputEventProps {
    windowId: number;
    data: unknown;
    eventAddress: string;
    source: string;
  }
</script>

<script lang="ts">
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  const { windowId, data, eventAddress, source }: CmdOutputEventProps = $props();
  if (source === 'message' && eventAddress) {
    const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);
    void ctx.event.emit(eventAddress, data);
  }
</script>
