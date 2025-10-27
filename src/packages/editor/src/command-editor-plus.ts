import { Editor, type Extensions } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Mention, { type MentionOptions } from '@tiptap/extension-mention';
import { Tokenizer } from '@istock-shell/command-parser';
import { getNonOverlapStr } from '@istock-shell/util';
import { getCommandHighlighter, type CommandHighlighterOption } from './command-highlight';
import { getMentionSuggestions, type MentionSuggestionOption } from './mention-suggestion';
import { getKeyboardShortcuts, type KeyboardShortcutsOption } from './keyboard-shortcuts';

/**
 * 命令编辑器事件名称枚举
 * @public
 */
export enum CommandEditorEventNames {
  /** 推荐命令事件 */
  RecommendCmd = 'recommendCmd',
  /** 发送命令事件 */
  SendCmd = 'sendCmd',
}

/**
 * 命令编辑器操作类型枚举
 * @public
 */
export enum CommandEditorActionTypes {
  /** 自动操作 */
  Auto = 'auto',
  /** 向上操作 */
  Up = 'up',
  /** 向下操作 */
  Down = 'down',
  /** 撤销操作 */
  Undo = 'undo',
  /** 重做操作 */
  Redo = 'redo',
}

/**
 * 命令编辑器输入选项类型
 * @public
 */
export type CommandEditorInputOption = {
  /** 操作类型 */
  action?: CommandEditorActionTypes;
  /** 触发事件 */
  event?: Event;
};

/**
 * 命令编辑器推荐命令数据类型
 * @public
 */
export type CommandEditorRecommendCmdData = {
  /** 操作类型 */
  action?: CommandEditorActionTypes;
  /** 目标编辑器实例 */
  target: CommandEditor;
};

/**
 * 命令编辑器自定义事件类型
 * @public
 * @template Data - 事件数据类型
 */
export type CommandEditorCustomEvent<Data = unknown> = {
  /** 事件详情 */
  detail: { data: Data; sourceEvent?: Event };
} & Event;

/**
 * 命令编辑器推荐命令事件类型
 * @public
 */
export type CommandEditorRecommendCmdEvent = CommandEditorCustomEvent<CommandEditorRecommendCmdData>;

export type CommandEditorOptions = {
  commandHighlighter?: Partial<CommandHighlighterOption>;
  mention?: Partial<MentionOptions> & { suggestionOption?: MentionSuggestionOption };
  keyboardShortcuts?: KeyboardShortcutsOption;
};

/**
 * 命令编辑器类
 * 提供命令行输入、编辑、语法高亮、历史记录等功能
 * @public
 */
export class CommandEditor {
  /** 命令输入DOM元素 */
  readonly #commandInput: HTMLElement;
  /** 词法分析器实例 */
  readonly #tokenizer: Tokenizer;
  readonly #editor: Editor;
  /**
   * 获取命令输入DOM元素
   * @returns 命令输入DOM元素
   */
  get commandInput() {
    return this.#commandInput;
  }

  get editor(): Editor {
    return this.#editor;
  }

  /**
   * 获取当前输入的文本内容
   * @returns 解析后的文本内容
   */
  get input() {
    return this.#editor.getText();
  }

  /**
   * 获取当前输入的文本内容的JSON表示
   * @returns 文本内容的JSON表示
   */
  get inputJson() {
    return this.#editor.getJSON();
  }

  /**
   * 构造函数
   * @param commandInput - 命令输入DOM元素
   */
  constructor(commandInput: HTMLElement, content: string = '', options: CommandEditorOptions = {}) {
    this.#commandInput = commandInput;
    this.#tokenizer = new Tokenizer();
    const extensions: Extensions = [StarterKit];
    if (options.commandHighlighter) {
      extensions.push(getCommandHighlighter({ ...options.commandHighlighter, tokenizer: this.#tokenizer }));
    }
    if (options.mention) {
      extensions.push(
        Mention.configure(
          options.mention.suggestionOption
            ? {
                ...Object.assign(
                  {
                    HTMLAttributes: {
                      class: 'is-mention',
                    },
                    suggestions: getMentionSuggestions(options.mention.suggestionOption),
                  },
                  options.mention
                ),
              }
            : options.mention
        )
      );
    }
    if (options.keyboardShortcuts) {
      extensions.push(getKeyboardShortcuts(options.keyboardShortcuts));
    }
    this.#editor = new Editor({
      element: this.#commandInput,
      extensions,
      content,
    });
  }

  /**
   * 组件挂载时调用
   * 设置焦点到输入框并初始化事件监听
   * @public
   */
  onMount() {
    // 设置焦点
    this.#editor.commands.focus('end');
    this.#initEvent();
  }

  /**
   * 初始化事件监听
   * @private
   */
  #initEvent() {
    this.#eventHandle('addEventListener');
  }

  /**
   * 事件处理器，用于添加或移除事件监听
   * @template T - 事件处理方法类型
   * @param method - 事件处理方法名称
   * @private
   */
  #eventHandle<T extends 'addEventListener' | 'removeEventListener'>(method: T) {
    // todo 优化合并事件绑定和事件解绑
    if (method === 'addEventListener') {
      const add = method as 'addEventListener';
      this.#commandInput[add]('keydown', this.#handleKeydown.bind(this));
    }
    if (method === 'removeEventListener') {
      const remove = 'removeEventListener';
      this.#commandInput[remove]('keydown', this.#handleKeydown.bind(this));
    }
  }

  /**
   * 处理按键按下事件
   * 处理各种快捷键组合，包括回车、方向键、撤销重做等
   * @param event - 键盘事件
   * @private
   */
  #handleKeydown(event: KeyboardEvent) {
    const { key, altKey, shiftKey, ctrlKey, metaKey } = event;
    const isModifierKey = altKey || shiftKey || ctrlKey || metaKey;

    if (isModifierKey && ['Enter', 'ArrowUp', 'ArrowDown', 'z', 'Z'].includes(key)) {
      event.preventDefault();
      switch (key) {
        case 'Enter':
          // Shift+Enter 执行换行操作
          if (shiftKey && !ctrlKey && !metaKey && !altKey) {
            this.#editor.commands.insertContent('\n');
            return;
          }
          break;
        case 'ArrowUp':
          this.#createEvent(CommandEditorEventNames.RecommendCmd, CommandEditorActionTypes.Up, event);
          break;
        case 'ArrowDown':
          this.#createEvent(CommandEditorEventNames.RecommendCmd, CommandEditorActionTypes.Down, event);
          break;
        case 'z':
        case 'Z':
          if (shiftKey && (ctrlKey || metaKey)) {
            // 恢复
            if (this.#editor.can().redo()) {
              this.#editor.commands.redo();
            }
            break;
          }
          if (ctrlKey || metaKey) {
            // 撤销
            if (this.#editor.can().undo()) {
              this.#editor.commands.undo();
            }
            break;
          }
          break;
        // 其他按键的处理
      }
      return;
    }
    if (['Enter', 'Tab'].includes(key)) {
      event.preventDefault();
      switch (key) {
        case 'Enter':
          // 普通回车键发送命令
          this.#createEvent(CommandEditorEventNames.SendCmd);
          break;
        case 'Tab':
          this.#createEvent(CommandEditorEventNames.RecommendCmd, CommandEditorActionTypes.Auto, event);
          break;
        // 其他按键的处理
      }
    }
  }

  /**
   * 向输入框填充输入内容
   * @param input - 需要填充的内容
   * @public
   */
  handleCommandInput(input: string) {
    // 清空当前内容并设置新内容
    this.#editor.commands.clearContent();
    this.#editor.commands.insertContent(input);
    // 设置焦点到编辑器末尾
    this.#editor.commands.focus('end');
  }

  /**
   * 合并当前光标位置的文本内容
   * @param str - 要合并的字符串
   * @public
   */
  handleCommandInputAppend(str: string) {
    // 获取光标位置前的文本
    let offsetText = this.getCursorOffsetText();
    const insetText = getNonOverlapStr(offsetText, str);
    this.#editor.commands.insertContent(insetText);
  }

  /**
   * 获取当前光标位置前的文本内容
   * @returns 光标前的文本字符串
   * @public
   */
  getCursorOffsetText(): string {
    const { from } = this.#editor.state.selection;
    const doc = this.#editor.state.doc;

    // 获取从文档开始到光标位置的文本
    return doc.textBetween(0, from, '\n');
  }

  /**
   * 获取当前光标位置的客户端矩形信息
   * @returns 光标位置的DOMRect对象
   * @public
   */
  getCursorClientRect() {
    const editorDom = this.#editor.view.dom;
    const selection = this.#editor.state.selection;
    const cursorPos = this.#editor.view.coordsAtPos(selection.from);
    const editorRect = editorDom.getBoundingClientRect();
    return {
      ...editorRect,
      left: cursorPos.left,
      right: cursorPos.left,
      width: 0,
    };
  }

  /**
   * 创建并派发自定义事件
   * 用于通知外部组件编辑器状态变化
   * @param name - 事件名称
   * @param action - 操作类型
   * @param event - 源事件对象
   * @private
   */
  #createEvent(name: string, action?: CommandEditorActionTypes, event?: Event) {
    const detail: CommandEditorCustomEvent<CommandEditorRecommendCmdData>['detail'] = {
      data: { action, target: this },
      sourceEvent: event,
    };
    const customEvent = new CustomEvent(name, {
      detail,
    });
    this.#commandInput.dispatchEvent(customEvent);
  }

  /**
   * 销毁编辑器实例及副作用
   * @public
   */
  destroy() {
    this.#eventHandle('removeEventListener');
    this.#editor.destroy();
  }
}
