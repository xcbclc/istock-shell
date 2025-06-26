<script lang="ts" module>
  export interface CmdFormProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { CmdWindowsManager } from '@/window';
  import CmdPrompt from '../display/CmdPrompt.svelte';
  import CmdInput from './CmdInput.svelte';

  const { windowId }: CmdFormProps = $props();

  const ctx = CmdWindowsManager.cmdWindowsManager.getCmdContext(windowId);

  const { prompt } = ctx.store;
</script>

<div
  class="flex flex-col gap-1 px-3 py-2 bg-base-200 border-t-2 border-base-300 rounded-t-md shadow-[0_-1px_5px_1px_var(--color-base-300)]"
>
  <CmdPrompt texts={prompt.promptTexts} />
  <CmdInput {windowId} />
</div>
