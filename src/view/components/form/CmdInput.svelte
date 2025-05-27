<script lang="ts" module>
  export interface CmdInputProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { getQueryParam, ScopeError } from '@istock/util';
  import { CommandEditor, ECommandEditorEventNames } from '@istock/editor';
  import type { TCommandEditorRecommendCmdEvent } from '@istock/editor';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import { ECmdWindowContextMode } from '@/window/cmd-window-context';
  import { EInputRecommendType, type TInputRecommendItem } from '@/store/domains/global/input-recommend';
  import CmdRecommendList from '../recommend/CmdRecommendList.svelte';

  const { windowId }: CmdInputProps = $props();
  const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);
  const { cmdInput, cmdOutput } = ctx.cmdStore;
  const { inputRecommend, user } = ctx.domainStore;
  let cmdInputView: HTMLElement;
  let commandEditor: CommandEditor;
  let disabled = false;
  let canContenteditable = $state(false);
  let tabindex: number;
  if (ctx.mode !== ECmdWindowContextMode.example) {
    tabindex = 0;
  }

  const onRecommendClose = () => {
    inputRecommend.update((data) => {
      data.list = null;
      return data;
    });
  };
  const onRecommendSelected = (type: EInputRecommendType, inputRecommendItem?: TInputRecommendItem) => {
    if (inputRecommendItem?.value) {
      handleCommandInput(type, inputRecommendItem.value);
    }
    onRecommendClose();
  };
  export const handleCommandInput = (type: EInputRecommendType, input: string = '') => {
    if (commandEditor) {
      commandEditor.commandInput.focus();
      switch (type) {
        case EInputRecommendType.cmd:
          commandEditor.handleCommandInputAppend(input);
          break;
        case EInputRecommendType.alias:
          commandEditor.handleCommandInput(input, input);
          break;
        default:
          throw new ScopeError(`view`, `未找到推荐命令类型，推荐程序未处理`);
      }
    }
  };

  $effect(() => {
    canContenteditable = ctx.mode !== ECmdWindowContextMode.example && !disabled;
  });

  onMount(() => {
    commandEditor = new CommandEditor(cmdInputView);
    commandEditor.onMount();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    commandEditor.commandInput.addEventListener(ECommandEditorEventNames.SendCmd, async () => {
      if (disabled) {
        console.error('上次命令执行未结束');
      } else {
        try {
          disabled = true;
          const cmdStr = commandEditor.input;
          await cmdOutput.sendCmd(cmdStr);
          // 重置
          commandEditor.syncVNodeAndHtml([]);
          await cmdInput.inputUpdate([], true);
        } finally {
          disabled = false;
        }
      }
    });
    commandEditor.commandInput.addEventListener(ECommandEditorEventNames.RecommendCmd, (event: Event) => {
      const { action, target } = (event as TCommandEditorRecommendCmdEvent).detail.data;
      void ctx.event.emit(`event://@${user.getUserInfo().username}.ui:${ctx.windowId}/cmd.recommend`, {
        target,
        action,
      });
    });
  });

  ctx.workerMessage.once('CmdWindowContext.initStoreDone', async () => {
    if (ctx.mode === ECmdWindowContextMode.example) {
      // demo演示逻辑
      let cmd = getQueryParam('cmd');
      if (cmd) {
        cmd = decodeURIComponent(cmd);
        commandEditor.handleCommandInput(cmd, cmd);
        await cmdOutput.sendCmd(cmd);
      }
    }
  });

  onDestroy(() => {
    commandEditor && commandEditor.destroy();
  });
</script>

<div class="relative">
  <div
    class="min-h-[2em] py-1 px-2 break-all tracking-wider outline-none text-primary font-mono rounded-md bg-base-100 shadow-xs border border-base-200/80 ring-primary/80 focus-within:border-primary/80 focus-within:ring-1"
    {tabindex}
    autofocus
    contenteditable={canContenteditable}
    spellcheck="false"
    bind:this={cmdInputView}
  ></div>
  <CmdRecommendList
    list={$inputRecommend.list}
    {onRecommendClose}
    onRecommendSelected={(inputRecommendItem) => onRecommendSelected($inputRecommend.type, inputRecommendItem)}
  />
</div>

<style>
  @reference "@istock/shell-ui/src/style/daisyui.css";
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
