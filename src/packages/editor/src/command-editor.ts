import { getEndAndStartOverlapStr } from '@istock-shell/util';
import { Tokenizer, type Token } from '@istock-shell/command-parser';
import { CommandEditorCursor } from './command-editor-cursor';
import { CommandEditorParser, type CommandEditorContentNode } from './command-editor-parser';

/**
 * 命令编辑器事件名称枚举
 * @public
 */
export enum CommandEditorEventNames {
  /** 推荐命令事件 */
  RecommendCmd = 'recommendCmd',
  /** 发送命令事件 */
  SendCmd = 'sendCmd',
  /** 重新渲染命令事件 */
  ReRenderCmd = 'reRenderCmd',
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
 * 命令编辑器类
 * 提供命令行输入、编辑、语法高亮、历史记录等功能
 * @public
 */
export class CommandEditor {
  /** 命令输入DOM元素 */
  readonly #commandInput: HTMLElement;
  /** 是否正在进行中文输入 */
  #inputComposing = false;
  /** 自动生成的节点ID计数器 */
  #autoNodeId: number = 0;
  /** 虚拟节点数组 */
  #vNodes: CommandEditorContentNode[] = [];
  /** 词法分析器实例 */
  readonly #tokenizer: Tokenizer;
  /** 编辑器解析器实例 */
  readonly #editorParser: CommandEditorParser;
  /** 光标操作实例 */
  readonly #cursor: CommandEditorCursor;
  /** 历史记录数组，存储[文本内容, 光标位置]元组 */
  #historys: Array<[string, number]> = [];
  /** 当前历史记录索引 */
  #historyIndex: number = 0;

  /**
   * 获取命令输入DOM元素
   * @returns 命令输入DOM元素
   */
  get commandInput() {
    return this.#commandInput;
  }

  /**
   * 获取当前输入的文本内容
   * @returns 解析后的文本内容
   */
  get input() {
    return this.#editorParser.parseDomToText(this.#commandInput);
  }

  /**
   * 获取虚拟节点数组
   * @returns 虚拟节点数组
   */
  get vNodes() {
    return this.#vNodes;
  }

  /**
   * 构造函数
   * @param commandInput - 命令输入DOM元素
   */
  constructor(commandInput: HTMLElement) {
    this.#commandInput = commandInput;
    this.#cursor = new CommandEditorCursor(this.#commandInput);
    this.#editorParser = new CommandEditorParser();
    this.#tokenizer = new Tokenizer();
  }

  /**
   * 组件挂载时调用
   * 设置焦点到输入框并初始化事件监听
   * @public
   */
  onMount() {
    this.#commandInput.focus();
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
      this.#commandInput[add]('compositionstart', this.#handleCompositionStart.bind(this));
      this.#commandInput[add]('compositionupdate', this.#handleCompositionUpdate.bind(this));
      this.#commandInput[add]('compositionend', this.#handleCompositionEnd.bind(this));
      this.#commandInput[add]('input', this.#handleInput.bind(this));
      this.#commandInput[add]('keyup', this.#handleKeyup.bind(this));
      this.#commandInput[add]('keydown', this.#handleKeydown.bind(this));
      this.#commandInput[add]('focus', this.#handleFocus.bind(this));
      this.#commandInput[add]('blur', this.#handleBlur.bind(this));
    }
    if (method === 'removeEventListener') {
      const remove = 'removeEventListener';
      this.#commandInput[remove]('compositionstart', this.#handleCompositionStart.bind(this));
      this.#commandInput[remove]('compositionupdate', this.#handleCompositionUpdate.bind(this));
      this.#commandInput[remove]('compositionend', this.#handleCompositionEnd.bind(this));
      this.#commandInput[remove]('input', this.#handleInput.bind(this));
      this.#commandInput[remove]('keyup', this.#handleKeyup.bind(this));
      this.#commandInput[remove]('keydown', this.#handleKeydown.bind(this));
      this.#commandInput[remove]('focus', this.#handleFocus.bind(this));
      this.#commandInput[remove]('blur', this.#handleBlur.bind(this));
    }
  }

  /**
   * 获取新的节点ID
   * @returns 新的节点ID
   * @private
   */
  #getNewNodeId() {
    return this.#autoNodeId++;
  }

  /**
   * 处理焦点获得事件
   * @param _event - 焦点事件
   * @private
   */
  #handleFocus(_event: FocusEvent) {}

  /**
   * 处理焦点失去事件
   * @param _event - 焦点事件
   * @private
   */
  #handleBlur(_event: FocusEvent) {
    // console.log('handleBlur', this.#cursor.getOneRange());
  }

  /**
   * 处理输入事件
   * 当不在中文输入状态时处理命令输入
   * @param event - 输入事件
   * @private
   */
  #handleInput(event: Event) {
    if (!this.#inputComposing) {
      this.#handleCommandInput(event);
    }
  }

  /**
   * 处理按键抬起事件
   * @param _event - 键盘事件
   * @private
   */
  #handleKeyup(_event: KeyboardEvent) {}

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
          this.#handleCommandInput(event, { newLine: true });
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
            this.#reDoInput(event);
            break;
          }
          if (ctrlKey || metaKey) {
            // 撤销
            this.#unDoInput(event);
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
   * 执行撤销操作
   * 回退到历史记录中的上一个状态
   * @param event - 键盘事件
   * @private
   */
  #unDoInput(event: KeyboardEvent) {
    if (this.#historyIndex < 0) {
      this.#historyIndex = -1;
    } else {
      this.#historyIndex--;
    }
    let [text, index] = this.#historys[this.#historyIndex] ?? [];
    if (!text) text = '';
    if (index === undefined) index = 0;
    this.handleCommandInput(text, text.substring(0, index + 1), {
      action: CommandEditorActionTypes.Redo,
      event,
    });
  }

  /**
   * 执行重做操作
   * 前进到历史记录中的下一个状态
   * @param event - 键盘事件
   * @private
   */
  #reDoInput(event: KeyboardEvent) {
    if (this.#historyIndex >= this.#historys.length - 1) {
      this.#historyIndex = this.#historys.length - 1;
    } else {
      this.#historyIndex++;
    }
    let [text, index] = this.#historys[this.#historyIndex] ?? [];
    if (!text) text = '';
    if (index === undefined) index = 0;
    this.handleCommandInput(text, text.substring(0, index + 1), {
      action: CommandEditorActionTypes.Redo,
      event,
    });
  }

  /**
   * 处理中文输入开始事件
   * 设置中文输入状态为true，防止在输入过程中触发命令处理
   * @param _event - 组合输入事件
   * @private
   */
  #handleCompositionStart(_event: CompositionEvent) {
    this.#inputComposing = true;
  }

  /**
   * 处理中文输入更新事件
   * 保持中文输入状态为true
   * @param _event - 组合输入事件
   * @private
   */
  #handleCompositionUpdate(_event: CompositionEvent) {
    this.#inputComposing = true;
  }

  /**
   * 处理中文输入结束事件
   * 结束中文输入状态并处理最终的输入内容
   * @param event - 组合输入事件
   * @private
   */
  #handleCompositionEnd(event: CompositionEvent) {
    this.#inputComposing = false;
    // 更新数据
    this.#handleCommandInput(event);
  }

  /**
   * 处理命令输入的内部方法
   * 获取当前输入内容和光标位置，并调用公共的处理方法
   * @param event - 输入事件
   * @param config - 配置选项
   * @param config.newLine - 是否添加新行
   * @private
   */
  #handleCommandInput(event: Event, config?: { newLine?: boolean }) {
    // const { inputType } = event;
    let input = this.input;
    let offsetText: string = this.getCursorOffsetText();
    if (config?.newLine) {
      const offset = offsetText.length;
      offsetText += '\n';
      input = [input.substring(0, offset), input.substring(offset)].join('\n');
    }
    this.handleCommandInput(input, offsetText, { event });
  }

  /**
   * 处理命令输入的公共方法
   * 解析输入文本为token，更新虚拟节点，并渲染到HTML
   * @param input - 输入的完整文本
   * @param offsetText - 光标位置前的文本内容
   * @param options - 输入选项
   * @public
   */
  handleCommandInput(
    input: string,
    offsetText: string = this.getCursorOffsetText(),
    options: CommandEditorInputOption = {}
  ) {
    const tokens = this.#tokenizer.parse(input, false);
    const newVNodes = this.#getNewVNodes(tokens, this.#vNodes);
    this.#vNodes = newVNodes;
    this.#updateNodeToHtml(this.#vNodes, offsetText, options);
    this.#createEvent(CommandEditorEventNames.ReRenderCmd);
  }

  /**
   * 向当前输入内容追加字符串
   * 智能处理重叠部分，避免重复内容
   * @param str - 要追加的字符串
   * @public
   */
  handleCommandInputAppend(str: string) {
    let input = this.input;
    let offsetText = this.getCursorOffsetText();
    const isInputEl = this.#cursor.getOneRange().endContainer === this.#commandInput;
    if (isInputEl) {
      offsetText = offsetText.replace(/\n$/, '');
    }
    const overlap = getEndAndStartOverlapStr(offsetText, str);
    const newOffsetText = offsetText.substring(0, offsetText.length - overlap.length) + str;
    input = input.replace(offsetText, newOffsetText);
    offsetText = newOffsetText;
    this.handleCommandInput(input, offsetText);
  }

  /**
   * 同步虚拟节点数据并更新HTML显示
   * 直接设置虚拟节点数组并重新渲染
   * @param vNodes - 新的虚拟节点数组
   * @public
   */
  syncVNodeAndHtml(vNodes: CommandEditorContentNode[]) {
    this.#vNodes = vNodes;
    this.#updateNodeToHtml(this.#vNodes);
    this.#createEvent(CommandEditorEventNames.ReRenderCmd);
  }

  /**
   * 获取光标位置前的所有文本内容
   * @returns 光标前的文本字符串
   * @public
   */
  getCursorOffsetText() {
    const range = this.#cursor.getOneRange();
    const offsetText = this.#editorParser.getOffsetTextForDom(this.#commandInput, range.endContainer, range.endOffset);
    return offsetText;
  }

  /**
   * 将虚拟节点更新到HTML并处理历史记录
   * 渲染虚拟节点为HTML，更新历史记录，设置光标位置
   * @param vNodes - 虚拟节点数组
   * @param offsetText - 光标位置前的文本
   * @param options - 输入选项
   * @private
   */
  #updateNodeToHtml(
    vNodes: CommandEditorContentNode[],
    offsetText: string = '',
    options: CommandEditorInputOption = {}
  ) {
    this.#commandInput.innerHTML = this.#editorParser.parseVNodeToHtml(vNodes);
    const range = this.#editorParser.findCursorInfoForDom(this.#commandInput, offsetText);
    if (
      options.action == null ||
      ![CommandEditorActionTypes.Undo, CommandEditorActionTypes.Redo].includes(options.action)
    ) {
      this.#historys = this.#historys.slice(0, this.#historyIndex + 1);
      this.#historys.push([this.#editorParser.parseVNodeToText(vNodes), offsetText.length - 1]);
      this.#historyIndex = this.#historys.length - 1;
    }
    if (range) {
      this.#cursor.moveNodeOffset(range.endContainer, range.endOffset);
    } else {
      this.#cursor.moveToEnd();
    }
  }

  /**
   * 通过对比token和现有虚拟节点生成新的虚拟节点数组
   * 尽可能复用现有节点以保持节点ID的稳定性
   * @param tokens - 新解析的token数组
   * @param vNodes - 现有的虚拟节点数组
   * @returns 新的虚拟节点数组
   * @private
   */
  #getNewVNodes(tokens: Token[], vNodes: CommandEditorContentNode[]) {
    const newVNodes: CommandEditorContentNode[] = [];
    for (let i = 0; i < tokens.length; i++) {
      for (let j = 0; j < vNodes.length; j++) {
        if (tokens[i].value === vNodes[j].value) {
          newVNodes.push(vNodes[j]);
          vNodes.splice(0, j + 1);
          j = 0;
          break;
        }
      }
      if (i > newVNodes.length - 1) {
        newVNodes.push({
          ...tokens[i],
          id: this.#getNewNodeId(),
        });
      }
    }
    return newVNodes;
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
   * 销毁编辑器实例
   * 移除所有事件监听器，清理资源
   * @public
   */
  destroy() {
    this.#eventHandle('removeEventListener');
  }
}
