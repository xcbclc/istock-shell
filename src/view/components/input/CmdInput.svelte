<script lang="ts" module>
  export interface CmdInputProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { getQueryParam, ScopeError } from '@istock-shell/util';
  import { shShowMessage } from '@istock-shell/ui';
  import {
    CommandEditor,
    CommandEditorEventNames,
    type CommandEditorRecommendCmdData,
    type CommandEditorCustomEvent,
    type CommandEditorRecommendCmdEvent,
  } from '@istock-shell/editor';
  import { CmdWindowsManager } from '@/window';
  import { RecommendStoreType, type RecommendStoreModel } from '@/store';
  import CmdRecommendList from '../action/CmdRecommendList.svelte';

  const { windowId }: CmdInputProps = $props();
  const ctx = CmdWindowsManager.cmdWindowsManager.getCmdContext(windowId);
  const { input, output, recommend } = ctx.store;
  const { user } = ctx.cmdWindow.store;

  let cmdInputView: HTMLElement;
  let commandEditor: CommandEditor;

  let tabindex: number = $state(-1);
  if (ctx.cmdWindow.isDemoMode) {
    tabindex = 0;
  }
  let contenteditable = $derived.by(() => {
    return !ctx.cmdWindow.isDemoMode && input.canInput;
  });

  const onRecommendClose = () => {
    recommend.data.list = [];
  };
  const onRecommendSelected = (type: RecommendStoreType, inputRecommendItem?: RecommendStoreModel) => {
    if (inputRecommendItem?.value) {
      onCommandInput(type, inputRecommendItem.value);
    }
    onRecommendClose();
  };
  const onCommandInput = (type: RecommendStoreType, input: string = '') => {
    if (commandEditor) {
      commandEditor.commandInput.focus();
      switch (type) {
        case RecommendStoreType.cmd:
          commandEditor.handleCommandInputAppend(input);
          break;
        case RecommendStoreType.alias:
          commandEditor.handleCommandInput(input, input);
          break;
        default:
          throw new ScopeError(`view`, `未找到推荐命令类型，推荐程序未处理`);
      }
    }
  };
  const onSendCmd = async () => {
    if (input.canInput) {
      const cmdStr = commandEditor.input;
      await input.sendCmd(cmdStr);
      // 重置
      commandEditor.syncVNodeAndHtml([]);
      await input.nodeUpdate([], true);
    } else {
      shShowMessage.info('上次命令执行未结束');
    }
  };
  const onRecommendCmd = (event: CustomEvent<CommandEditorCustomEvent<CommandEditorRecommendCmdData>['detail']>) => {
    const { action, target } = event.detail.data;
    if (action && target) recommend.onInputRecommendCmd(action, target);
  };

  onMount(() => {
    commandEditor = new CommandEditor(cmdInputView);
    commandEditor.onMount();

    commandEditor.commandInput.addEventListener(CommandEditorEventNames.SendCmd, onSendCmd);
    commandEditor.commandInput.addEventListener(CommandEditorEventNames.RecommendCmd, onRecommendCmd);

    return () => {
      commandEditor.commandInput.removeEventListener(CommandEditorEventNames.SendCmd, onSendCmd);
      commandEditor.commandInput.removeEventListener(CommandEditorEventNames.RecommendCmd, onRecommendCmd);
      commandEditor && commandEditor.destroy();
    };
  });

  $effect(() => {
    if (ctx.cmdWindow.isDemoMode && ctx.isInitialized) {
      // demo演示逻辑
      let cmd = getQueryParam('cmd');
      if (!cmd) return;
      cmd = decodeURIComponent(cmd);
      commandEditor.handleCommandInput(cmd, cmd);
      input.sendCmd(cmd);
    }
  });
</script>

<div class="relative">
  <div
    class="min-h-[2em] py-1 px-2 break-all tracking-wider outline-none text-primary font-mono rounded-md bg-base-100 shadow-xs border border-base-200/80 ring-primary/80 focus-within:border-primary/80 focus-within:ring-1"
    {tabindex}
    autofocus
    {contenteditable}
    spellcheck="false"
    bind:this={cmdInputView}
  ></div>
  <CmdRecommendList
    style={recommend.data.list.length ? '' : 'display:none'}
    list={recommend.data.list}
    {onRecommendClose}
    onRecommendSelected={(inputRecommendItem) => onRecommendSelected(recommend.data.type, inputRecommendItem)}
  />
</div>

<style>
  @reference "@istock-shell/ui/style";
  :global(span.is-command) {
    font-weight: 600;
    @apply text-primary;
  }
  :global(span.is-optionKey) {
    @apply text-secondary;
  }
  :global(span.is-parameter) {
    @apply text-accent;
  }
</style>
