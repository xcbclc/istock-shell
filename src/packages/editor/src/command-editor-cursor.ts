/**
 * 编辑框光标操作
 */
export class CommandEditorCursor {
  selection: Selection;
  // 定义组件的变量和方法
  readonly #commandInput: HTMLElement;

  constructor(commandInput: HTMLElement) {
    this.#commandInput = commandInput;
    const selection = window.getSelection();
    if (!selection) throw new Error('未获取到selection');
    this.selection = selection;
  }

  /**
   * 获取Range对象
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
   * 设置光标位置
   * @param offset
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
   * 移动光标到开始位置
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
   * 移动光标到开始位置
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
   * 光标向前或后移动指定个token位置
   * @param number
   * @param isBefore
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
   * 移动到指定节点及对应偏移位置
   * @param endNode
   * @param endOffset
   */
  moveNodeOffset(endNode: Node | Element, endOffset: number) {
    const range = this.getOneRange();
    range.setStart(endNode, endOffset);
    range.setEnd(endNode, endOffset);
    range.collapse(false);
  }
}
