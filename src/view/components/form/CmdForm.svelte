<script lang="ts">
  // 依赖处理
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import CmdPrompt from '../prompt/CmdPrompt.svelte';
  import CmdInput from './CmdInput.svelte';
  import RecommendList from '../recommend/List.svelte';
  import type { TInputRecommendItem, EInputRecommendType } from '@/store/domains/global/input-recommend';

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
  const handleRecommendSelect = (type: EInputRecommendType, data: CustomEvent<TInputRecommendItem>) => {
    const { detail } = data;
    if (detail?.value) {
      cmdInputComponent.handleCommandInput(type, detail.value);
    }
    handleRecommendClose();
  };
</script>

<div class="cmd-form">
  <CmdPrompt texts={$cmdPromptTexts} />
  <RecommendList
    list={$inputRecommend.list}
    on:close={handleRecommendClose}
    on:select={(event) => {
      handleRecommendSelect($inputRecommend.type, event);
    }}
  />
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
