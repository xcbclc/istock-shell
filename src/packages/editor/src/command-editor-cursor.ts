/**
 * 命令编辑器光标操作类
 * 提供光标定位、移动、范围选择等功能
 * @public
 */
export class CommandEditorCursor {
  /** 浏览器选择对象 */
  selection: Selection;
  /** 命令输入DOM元素 */
  readonly #commandInput: HTMLElement;

  /**
   * 构造函数
   * @param commandInput - 命令输入DOM元素
   * @throws 当无法获取到selection对象时抛出错误
   */
  constructor(commandInput: HTMLElement) {
    this.#commandInput = commandInput;
    const selection = window.getSelection();
    if (!selection) throw new Error('未获取到selection');
    this.selection = selection;
  }

  /**
   * 获取当前有效的Range对象
   * 如果当前选择在命令输入元素内，返回当前Range；否则创建一个默认Range
   * @returns 当前有效的Range对象
   * @public
   */
  getOneRange() {
    const selection = this.selection;
    if (
      selection?.anchorNode &&
      selection?.focusNode &&
      this.#commandInput.contains(selection.anchorNode) &&
      this.#commandInput.contains(selection.focusNode)
    ) {
      return selection.getRangeAt(0);
    }
    const range = document.createRange();
    range.selectNodeContents(this.#commandInput);
    range.collapse(false); // 折叠到末尾
    return range;
  }

  /**
   * 根据文本偏移量设置光标位置
   * 自动处理边界情况，超出范围时移动到开始或结束位置
   * @param offset - 文本偏移量（字符数）
   * @public
   */
  setOffset(offset: number): void {
    const maxOffset = this.#commandInput.textContent?.length ?? 0;

    if (offset < 0) {
      this.moveToStart();
      return;
    }
    if (offset > maxOffset) {
      this.moveToEnd();
      return;
    }
    const range = this.getOneRange();
    let offsetNode!: Node;
    const findNodeSetRange = (node: Node, currentOffset: number) => {
      if (node.hasChildNodes()) {
        const childNodes = Array.from<Node>(node.childNodes);
        for (const childNode of childNodes) {
          if (childNode.nodeType === Node.TEXT_NODE) {
            const length = childNode.textContent?.length ?? 0;
            if (length >= currentOffset) {
              offsetNode = childNode;
              break;
            }
            currentOffset -= length;
          } else {
            currentOffset = findNodeSetRange(childNode, currentOffset);
          }
        }
      }
      return currentOffset;
    };
    let currentOffset = findNodeSetRange(this.#commandInput, offset);
    if (!offsetNode) {
      offsetNode = this.#commandInput;
      currentOffset = offset;
    }
    if (this.selection) {
      const length = offsetNode.textContent?.length;
      range.setStart(offsetNode, currentOffset);
      if (length && length === currentOffset) {
        range.setEndAfter(offsetNode);
      } else {
        range.setEnd(offsetNode, currentOffset);
      }
      this.selection.removeAllRanges();
      this.selection.addRange(range);
    }
  }

  /**
   * 移动光标到输入框的开始位置
   * @public
   */
  moveToStart(): void {
    const range = this.getOneRange();
    const element = this.#commandInput;
    const node = element.firstChild;
    if (node) {
      range.setStartBefore(node);
      range.setEndBefore(node);
    }
  }

  /**
   * 移动光标到输入框的结束位置
   * @public
   */
  moveToEnd(): void {
    const range = this.getOneRange();
    const element = this.#commandInput;
    const node = element.lastChild;
    if (node) {
      range.setStartAfter(node);
      range.setEndAfter(node);
    }
  }

  /**
   * 按token单位移动光标位置
   * 根据data-id属性查找token元素并移动光标
   * @param number - 移动的token数量，默认为1
   * @param isBefore - 是否向前移动，true为向前，false为向后
   * @public
   */
  moveTokenOffset(number: number = 1, isBefore = true): void {
    const range = this.getOneRange();
    const tokenElements = Array.from(this.#commandInput.querySelectorAll('[data-id]'));
    let currentIndex = tokenElements.findIndex((el) => el === range.endContainer);
    if (currentIndex === -1) {
      currentIndex = tokenElements.length - 1;
    }
    if (isBefore) {
      currentIndex -= number;
    } else {
      currentIndex += number;
    }
    if (currentIndex <= 0) {
      this.moveToStart();
      return;
    }
    if (currentIndex >= tokenElements.length - 1) {
      this.moveToEnd();
      return;
    }
    const node = tokenElements[currentIndex];
    range.setStartAfter(node);
    range.setEndAfter(node);
  }

  /**
   * 移动光标到指定节点的指定偏移位置
   * 精确控制光标在DOM节点中的位置
   * @param endNode - 目标节点
   * @param endOffset - 在目标节点中的偏移量
   * @public
   */
  moveNodeOffset(endNode: Node | Element, endOffset: number) {
    const range = this.getOneRange();
    range.setStart(endNode, endOffset);
    range.setEnd(endNode, endOffset);
    range.collapse(false);
  }
}
