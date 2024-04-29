import { getEndAndStartOverlapStr } from '@istock/util';
import { Tokenizer, type TToken } from '@istock/command-parser';
import { CommandEditorCursor } from './command-editor-cursor';
import { CommandEditorParser, type TCommandEditorContentNode } from './command-editor-parser';

export enum ECommandEditorEventNames {
  RecommendCmd = 'recommendCmd',
  SendCmd = 'sendCmd',
  ReRenderCmd = 'reRenderCmd',
}
export enum ECommandEditorActionTypes {
  Auto = 'auto',
  Up = 'up',
  Down = 'down',
  Undo = 'undo',
  Redo = 'redo',
}
export type TCommandEditorInputOption = {
  action?: ECommandEditorActionTypes;
  event?: Event;
};
export type TCommandEditorRecommendCmdData = {
  action?: ECommandEditorActionTypes;
  target: CommandEditor;
};
export type TCommandEditorCustomEvent<Data = unknown> = {
  detail: { data: Data; sourceEvent?: Event };
} & Event;
export type TCommandEditorRecommendCmdEvent = TCommandEditorCustomEvent<TCommandEditorRecommendCmdData>;

export class CommandEditor {
  readonly #commandInput: HTMLElement;
  #inputComposing = false;
  #autoNodeId: number = 0;
  #vNodes: TCommandEditorContentNode[] = [];
  readonly #tokenizer: Tokenizer;
  readonly #editorParser: CommandEditorParser;
  readonly #cursor: CommandEditorCursor;
  #historys: Array<[string, number]> = [];
  #historyIndex: number = 0;

  get commandInput() {
    return this.#commandInput;
  }

  get input() {
    return this.#editorParser.parseDomToText(this.#commandInput);
  }

  get vNodes() {
    return this.#vNodes;
  }

  constructor(commandInput: HTMLElement) {
    this.#commandInput = commandInput;
    this.#cursor = new CommandEditorCursor(this.#commandInput);
    this.#editorParser = new CommandEditorParser();
    this.#tokenizer = new Tokenizer();
  }

  // 当组件加载完时，将焦点设置为输入框，初始事件
  onMount() {
    this.#commandInput.focus();
    this.#initEvent();
  }

  #initEvent() {
    this.#eventHandle('addEventListener');
  }

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

  #getNewNodeId() {
    return this.#autoNodeId++;
  }

  #handleFocus(_event: FocusEvent) {}
  #handleBlur(_event: FocusEvent) {
    // console.log('handleBlur', this.#cursor.getOneRange());
  }

  /**
   * 输入处理
   * @param event
   */
  #handleInput(event: Event) {
    if (!this.#inputComposing) {
      this.#handleCommandInput(event);
    }
  }

  #handleKeyup(_event: KeyboardEvent) {}

  /**
   * 快捷键处理
   * @param event
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
          this.#createEvent(ECommandEditorEventNames.RecommendCmd, ECommandEditorActionTypes.Up, event);
          break;
        case 'ArrowDown':
          this.#createEvent(ECommandEditorEventNames.RecommendCmd, ECommandEditorActionTypes.Down, event);
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
          this.#createEvent(ECommandEditorEventNames.SendCmd);
          break;
        case 'Tab':
          this.#createEvent(ECommandEditorEventNames.RecommendCmd, ECommandEditorActionTypes.Auto, event);
          break;
        // 其他按键的处理
      }
    }
  }

  /**
   * 撤销输入操作
   * @param event
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
      action: ECommandEditorActionTypes.Redo,
      event,
    });
  }

  /**
   * 撤销输入操作
   * @param event
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
      action: ECommandEditorActionTypes.Redo,
      event,
    });
  }

  /**
   * 处理中文输入问题
   * @param type
   * @param event
   */
  #handleCompositionStart(_event: CompositionEvent) {
    this.#inputComposing = true;
  }

  #handleCompositionUpdate(_event: CompositionEvent) {
    this.#inputComposing = true;
  }

  #handleCompositionEnd(event: CompositionEvent) {
    this.#inputComposing = false;
    // 更新数据
    this.#handleCommandInput(event);
  }

  /**
   * 命令输入处理
   * @param event
   * @param config
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
   * 处理input输入字符串
   * @param input
   * @param offsetText
   * @param event
   */
  handleCommandInput(
    input: string,
    offsetText: string = this.getCursorOffsetText(),
    options: TCommandEditorInputOption = {}
  ) {
    const tokens = this.#tokenizer.parse(input, false);
    const newVNodes = this.#getNewVNodes(tokens, this.#vNodes);
    this.#vNodes = newVNodes;
    this.#updateNodeToHtml(this.#vNodes, offsetText, options);
    this.#createEvent(ECommandEditorEventNames.ReRenderCmd);
  }

  /**
   * 向后追加字符串
   * @param str
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
   * 同步节点数据及更新到html
   * @param vNodes
   */
  syncVNodeAndHtml(vNodes: TCommandEditorContentNode[]) {
    this.#vNodes = vNodes;
    this.#updateNodeToHtml(this.#vNodes);
    this.#createEvent(ECommandEditorEventNames.ReRenderCmd);
  }

  /**
   * 获取光标前面字符串
   */
  getCursorOffsetText() {
    const range = this.#cursor.getOneRange();
    const offsetText = this.#editorParser.getOffsetTextForDom(this.#commandInput, range.endContainer, range.endOffset);
    return offsetText;
  }

  /**
   * 更新vNode节点到html
   * @param vNodes
   * @param offsetText
   * @private
   */
  #updateNodeToHtml(
    vNodes: TCommandEditorContentNode[],
    offsetText: string = '',
    options: TCommandEditorInputOption = {}
  ) {
    this.#commandInput.innerHTML = this.#editorParser.parseVNodeToHtml(vNodes);
    const range = this.#editorParser.findCursorInfoForDom(this.#commandInput, offsetText);
    if (
      options.action == null ||
      ![ECommandEditorActionTypes.Undo, ECommandEditorActionTypes.Redo].includes(options.action)
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
   * 简单对比生成最新虚拟节点数据
   * @param tokens
   * @param vNodes
   * @private
   */
  #getNewVNodes(tokens: TToken[], vNodes: TCommandEditorContentNode[]) {
    const newVNodes: TCommandEditorContentNode[] = [];
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
   * 创建自定义事件
   * @param name
   * @param detail
   * @private
   */
  #createEvent(name: string, action?: ECommandEditorActionTypes, event?: Event) {
    const detail: TCommandEditorCustomEvent<TCommandEditorRecommendCmdData>['detail'] = {
      data: { action, target: this },
      sourceEvent: event,
    };
    const customEvent = new CustomEvent(name, {
      detail,
    });
    this.#commandInput.dispatchEvent(customEvent);
  }

  /**
   * 销毁时解绑事件
   */
  destroy() {
    this.#eventHandle('removeEventListener');
  }
}
