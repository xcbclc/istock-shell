<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { ScopeError } from '@istock/util';
  import { CommandEditor, ECommandEditorEventNames } from '@istock/editor';
  import type { TCommandEditorRecommendCmdEvent } from '@istock/editor';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import { EInputRecommendType } from '@/store/domains/global/input-recommend';

  export let windowId: number;

  const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);
  const { cmdInput, cmdOutput } = ctx.cmdStore;
  let cmdInputView: HTMLElement;
  let commandEditor: CommandEditor;
  let disabled = false;

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

  onMount(() => {
    commandEditor = new CommandEditor(cmdInputView);
    commandEditor.onMount();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    commandEditor.commandInput.addEventListener(ECommandEditorEventNames.SendCmd, async () => {
      try {
        if (!disabled) {
          disabled = true;
          const cmdStr = commandEditor.input;
          await cmdOutput.sendCmd(cmdStr);
          // 重置
          commandEditor.syncVNodeAndHtml([]);
          await cmdInput.inputUpdate([], true);
        }
      } finally {
        disabled = false;
      }
    });
    commandEditor.commandInput.addEventListener(ECommandEditorEventNames.RecommendCmd, (event: Event) => {
      const { action, target } = (event as TCommandEditorRecommendCmdEvent).detail.data;
      void ctx.event.emit(`event://@istock.ui:${ctx.windowId}/cmd.recommend`, { target, action });
    });
  });

  onDestroy(() => {
    commandEditor && commandEditor.destroy();
  });
</script>

<div class="cmd-input" tabindex="0" autofocus contenteditable spellcheck="false" bind:this={cmdInputView}></div>

<style lang="scss">
  .cmd-input {
    min-height: 1.5em;
    word-break: break-all;
    letter-spacing: 1px;
    outline: none;
    caret-color: var(--color-primary-lighter);
    color: var(--color-primary);
    :global(span.is-command) {
      font-weight: var(--font-weight);
      color: var(--color-text-command);
    }
    :global(span.is-optionKey) {
      color: var(--color-text-option);
    }
    :global(span.is-parameter) {
      color: var(--color-text-parameter);
    }
  }
</style>
