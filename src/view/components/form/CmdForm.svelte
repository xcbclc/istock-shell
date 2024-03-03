<script lang="ts">
  // 依赖处理
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import CmdPrompt from '../prompt/CmdPrompt.svelte';
  import CmdInput from './CmdInput.svelte';
  import RecommendList from '../recommend/list.svelte';

  export let windowId: number;
  let cmdInputComponent: CmdInput;

  const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);

  const { cmdPromptTexts } = ctx.cmdStore;
  const { inputRecommend } = ctx.domainStore;

  const handleRecommendClose = () => {
    inputRecommend.update((data) => {
      data.list = null;
      return data;
    });
  };
  const handleRecommendSelect = (data: CustomEvent) => {
    const { detail } = data;
    if (detail?.value) {
      cmdInputComponent.handleCommandInput(detail.value);
    }
    handleRecommendClose();
  };
</script>

<div class="cmd-form">
  <CmdPrompt texts={$cmdPromptTexts} />
  <RecommendList list={$inputRecommend.list} on:close={handleRecommendClose} on:select={handleRecommendSelect} />
  <CmdInput {windowId} bind:this={cmdInputComponent} />
</div>

<style lang="scss">
  :root {
    --form-border-color: rgba(0, 0, 0, 0.1);
    --form-gap: var(--gap-default);
    --form-box-shadow: rgba(0, 0, 0, 0.05);
  }
  .cmd-form {
    border-top: 1px solid var(--form-border-color);
    box-shadow: 0 -1px 1px 1px var(--form-box-shadow);
    padding: var(--form-gap);
  }
</style>
