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

/**
 * 命令编辑器选项类型
 * @public
 */
export type CommandEditorOptions = {
  commandHighlighter?: Partial<CommandHighlighterOption>;
  mention?: Partial<MentionOptions> & { suggestionOption?: MentionSuggestionOption };
  keyboardShortcuts?: KeyboardShortcutsOption;
};

/**
 * 命令编辑器提及数据类型
 * @public
 */
export interface CommandEditorMentionData {
  id: string;
  label: string;
  mentionSuggestionChar: string;
}

/**
 * 命令编辑器JSON节点类型
 * @public
 */
type CommandEditorJsonNode = {
  type: string;
  attrs?: CommandEditorMentionData;
  content?: Array<{ type: string; attrs?: CommandEditorMentionData }>;
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
    return this.#editor.getText({
      textSerializers: {
        mention: ({ node }) => {
          const { attrs } = node;
          const text = attrs.label ?? '';
          if (attrs.mentionSuggestionChar && attrs.id) {
            return `${attrs.mentionSuggestionChar}[${attrs.id},${text}]`;
          }
          return attrs.mentionSuggestionChar ? `${attrs.mentionSuggestionChar}${text}` : text;
        },
      },
    });
  }

  /**
   * 获取当前输入的文本内容的JSON表示
   * @returns 文本内容的JSON表示
   */
  get inputJson() {
    return this.#editor.getJSON();
  }

  /**
   * 获取当前输入的文本内容中的提及数据
   * @returns 提及数据数组
   */
  get mentions(): CommandEditorMentionData[] {
    const json = this.inputJson;
    const mentions: CommandEditorMentionData[] = [];
    function findMention(content: Array<CommandEditorJsonNode>) {
      content.forEach((node) => {
        if (node.content) {
          findMention(node.content);
        }
        if (node.type === 'mention' && node.attrs) {
          mentions.push(node.attrs as CommandEditorMentionData);
        }
      });
    }
    findMention(json.content as Array<CommandEditorJsonNode>);
    return mentions;
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
    const content = this.#parseMention(input);

    if (Array.isArray(content) && content.length > 0) {
      const lastItem = content[content.length - 1];
      if (lastItem.type === 'mention') {
        content.push({
          type: 'text',
          text: ' ',
        });
      }
    }

    this.#editor.commands.insertContent(content);
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
    const content = this.#parseMention(insetText);
    this.#editor.commands.insertContent(content);
  }

  /**
   * 解析包含提及格式的文本
   * @param text - 待解析文本
   * @returns Tiptap内容数组
   * @private
   */
  #parseMention(text: string) {
    const content = [];
    let currentIndex = 0;

    while (currentIndex < text.length) {
      const hashIndex = text.indexOf('#[', currentIndex);
      const atIndex = text.indexOf('@[', currentIndex);

      let startIndex = -1;
      let char = '';

      if (hashIndex !== -1 && (atIndex === -1 || hashIndex < atIndex)) {
        startIndex = hashIndex;
        char = '#';
      } else if (atIndex !== -1) {
        startIndex = atIndex;
        char = '@';
      }

      if (startIndex === -1) {
        content.push({
          type: 'text',
          text: text.slice(currentIndex),
        });
        break;
      }

      if (startIndex > currentIndex) {
        content.push({
          type: 'text',
          text: text.slice(currentIndex, startIndex),
        });
      }

      const commaIndex = text.indexOf(',', startIndex + 2);

      if (commaIndex === -1) {
        content.push({
          type: 'text',
          text: text.slice(startIndex, startIndex + 2),
        });
        currentIndex = startIndex + 2;
        continue;
      }

      const id = text.slice(startIndex + 2, commaIndex);
      let bracketCount = 1;
      let endIndex = -1;

      for (let i = commaIndex + 1; i < text.length; i++) {
        if (text[i] === '[') {
          bracketCount++;
        } else if (text[i] === ']') {
          bracketCount--;
        }

        if (bracketCount === 0) {
          endIndex = i;
          break;
        }
      }

      if (endIndex !== -1) {
        const label = text.slice(commaIndex + 1, endIndex);
        content.push({
          type: 'mention',
          attrs: {
            id,
            label,
            mentionSuggestionChar: char,
          },
        });
        currentIndex = endIndex + 1;
      } else {
        content.push({
          type: 'text',
          text: text.slice(startIndex, startIndex + 2),
        });
        currentIndex = startIndex + 2;
      }
    }

    return content.length > 0 ? content : text;
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
    return new DOMRect(cursorPos.left, cursorPos.top, 0, editorRect.height);
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
