<script lang="ts" module>
  export interface CmdInputProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { computePosition, shift } from '@floating-ui/dom';
  import { getQueryParam, ScopeError } from '@istock-shell/util';
  import { shShowMessage } from '@istock-shell/ui';
  import {
    CommandEditor,
    CommandEditorEventNames,
    type CommandEditorRecommendCmdEvent,
    type MentionSuggestionData,
    type CommandEditorMentionData,
  } from '@istock-shell/editor';
  import { CmdWindowsManager, type CmdWindowContextData } from '@/window';
  import { RecommendType, type RecommendStoreModel } from '@/store';
  import CmdRecommendList from '../action/CmdRecommendList.svelte';

  const { windowId }: CmdInputProps = $props();
  const ctx = CmdWindowsManager.cmdWindowsManager.getCmdContext(windowId);
  const { input, recommend, history, prompt } = ctx.store;

  let cmdInputView: HTMLElement;
  let cmdRecommendListView: CmdRecommendList;
  let commandEditor: CommandEditor;
  let cmdRecommendListPositionStyle = $state<{ x: number; y: number; position: string }>({
    x: 0,
    y: 0,
    position: '',
  });
  let onSelectedCallback: ((item: MentionSuggestionData) => void) | undefined;
  let tabindex: number = $state(-1);
  if (ctx.cmdWindow.isDemoMode) {
    tabindex = 0;
  }
  let contenteditable = $derived.by(() => {
    return !ctx.cmdWindow.isDemoMode && input.canInput;
  });

  // 响应式更新编辑器的可编辑状态
  $effect(() => {
    if (commandEditor) commandEditor.editor.setEditable(contenteditable);
  });

  const getSendCmdContext = (mentions: CommandEditorMentionData[]): CmdWindowContextData => {
    return ctx.getContextData('mention', history.findListById(mentions.map((item) => item.id)));
  };

  const onRecommendClose = () => {
    recommend.data.list = [];
    if (commandEditor) {
      commandEditor.editor.commands.focus();
    }
  };
  const onRecommendSelected = (type: RecommendType, inputRecommendItem?: RecommendStoreModel) => {
    if (inputRecommendItem?.value) {
      if (onSelectedCallback && inputRecommendItem.type === 'history') {
        onSelectedCallback({
          ...inputRecommendItem,
          id: inputRecommendItem.id.toString(),
        });
      } else {
        onCommandInput(type, inputRecommendItem.value);
      }
    }
    onRecommendClose();
  };
  const onCommandInput = (type: RecommendType, input: string = '') => {
    if (commandEditor) {
      commandEditor.editor.commands.focus();
      switch (type) {
        case RecommendType.cmd:
          commandEditor.handleCommandInputAppend(input);
          break;
        case RecommendType.alias:
          commandEditor.handleCommandInput(input);
          break;
        default:
          throw new ScopeError(`view`, `未找到推荐命令类型，推荐程序未处理`);
      }
    }
  };
  const onSendCmd = async () => {
    if (input.canInput) {
      const cmdStr = commandEditor.input;
      await input.sendCmd(cmdStr, getSendCmdContext(commandEditor.mentions));
      // 重置
      commandEditor.handleCommandInput('');
      await input.nodeUpdate([], true);
    } else {
      shShowMessage.info('上次命令执行未结束');
    }
  };
  const onRecommendCmd = async (event: CommandEditorRecommendCmdEvent) => {
    const { action, target } = event.detail.data;
    if (action && target) {
      await recommend.onInputRecommendCmd(action, target);
      await tick();
      const recommendElement = cmdRecommendListView?.getElement();
      if (recommendElement && commandEditor?.editor) {
        const virtualElement = {
          getBoundingClientRect: () => commandEditor.getCursorClientRect(),
        };
        computePosition(virtualElement, recommendElement, {
          placement: 'top-start',
          middleware: [shift()],
        }).then(({ x, y, strategy }) => {
          cmdRecommendListPositionStyle = { x, y, position: strategy };
        });
      }
    }
  };

  onMount(() => {
    commandEditor = new CommandEditor(cmdInputView, '', {
      commandHighlighter: {},
      mention: {
        deleteTriggerWithBackspace: true,
        suggestionOption: {
          char: '#',
          decorationClass: 'is-mention',
          getSuggestionList: async (query: string) => {
            const list: RecommendStoreModel[] = history.list
              .map((item) => {
                const data: RecommendStoreModel = {
                  id: item.id,
                  label: item.input,
                  value: `${item.id}`,
                  type: 'history',
                  description: prompt.getPromptDescription(item.promptTexts),
                };
                return data;
              })
              .filter((item) => !query || item.label.indexOf(query) !== -1);
            recommend.data.list = list;
            return list.map((item) => ({
              ...item,
              id: item.id.toString(),
            }));
          },
          renderSuggestionList: async (
            _list: MentionSuggestionData[],
            _state: 'start' | 'update',
            selectedCallback?: (item: MentionSuggestionData) => void
          ) => {
            onSelectedCallback = selectedCallback;
            await tick();
            return cmdRecommendListView?.getElement();
          },
          updateSuggestionListPosition: (x: number, y: number, position: string) => {
            cmdRecommendListPositionStyle = { x, y, position };
          },
          onKeyDownSuggestion: (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
              recommend.data.list = [];
              return true;
            }
            return false;
          },
          onDestroySuggestion: () => {
            recommend.data.list = [];
          },
        },
        renderHTML: ({ options, node }) => {
          return [
            'div',
            { ...options.HTMLAttributes, class: 'is-mention', title: node.attrs.label },
            ['span', {}, `${node.attrs.mentionSuggestionChar}${node.attrs.label ?? node.attrs.id}`],
            // ['i', { 'class': 'i-carbon:mention' }, '✕'],
          ];
        },
      },
      keyboardShortcuts: {},
    });
    commandEditor.onMount();
    input.bindCommandEditor(commandEditor);

    commandEditor.commandInput.addEventListener(CommandEditorEventNames.SendCmd, onSendCmd as EventListener);
    commandEditor.commandInput.addEventListener(CommandEditorEventNames.RecommendCmd, onRecommendCmd as EventListener);

    if (ctx.cmdWindow.isDemoMode && ctx.isInitialized) {
      // demo演示逻辑
      let cmd = getQueryParam('cmd');
      if (!cmd) return;
      cmd = decodeURIComponent(cmd);
      commandEditor.handleCommandInput(cmd);
      input.sendCmd(cmd, getSendCmdContext(commandEditor.mentions));
    }

    return () => {
      commandEditor.commandInput.removeEventListener(CommandEditorEventNames.SendCmd, onSendCmd as EventListener);
      commandEditor.commandInput.removeEventListener(
        CommandEditorEventNames.RecommendCmd,
        onRecommendCmd as EventListener
      );
      commandEditor && commandEditor.destroy();
    };
  });
</script>

<div class="cmd-input command-container relative">
  <div
    class="min-h-[2.2em] py-1 px-2 break-all tracking-wider outline-none text-base-content rounded-md bg-base-100 shadow-xs border border-base-200/80 ring-primary/80 focus-within:border-primary/80 focus-within:ring-1"
    {tabindex}
    bind:this={cmdInputView}
  ></div>
  <CmdRecommendList
    bind:this={cmdRecommendListView}
    style={`display: ${recommend.data.list.length ? 'block' : 'none'}; left: ${cmdRecommendListPositionStyle.x}px; top: ${cmdRecommendListPositionStyle.y}px; position: ${cmdRecommendListPositionStyle.position || 'absolute'};`}
    list={recommend.data.list}
    {onRecommendClose}
    onRecommendSelected={(inputRecommendItem) => onRecommendSelected(recommend.data.type, inputRecommendItem)}
  />
</div>

<style>
  @reference "@istock-shell/ui/style";
  :global(.cmd-input) {
    @apply text-sm;
  }
  :global(.cmd-input .tiptap:focus-visible) {
    @apply outline-0;
  }
</style>
