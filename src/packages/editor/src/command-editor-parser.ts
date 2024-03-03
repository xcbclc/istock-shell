import { ETokenType, type TToken } from '@istock/command-parser';

export type TCommandEditorContentNode = {
  id?: number;
} & TToken;

export type TCommandEditorRangInfo = {
  endContainer: Node;
  endOffset: number;
};

export class CommandEditorParser {
  static blockTagNames = ['DIV'];
  static brTagName = 'BR';
  // eslint-disable-next-line no-irregular-whitespace
  static spaceRegMatch = /[\u0020\u3000' ']/g;
  static lineBreak = '\n';
  static space = ' ';

  /**
   * 获取br标签
   * @param node
   * @private
   */
  #getBrTagHtml(node: TCommandEditorContentNode) {
    return `<br data-id="${node.id}" data-type="${node.type}">`;
  }

  /**
   * 获取token标签
   * @param node
   * @param value
   * @private
   */
  #getTokenTagHtml(node: TCommandEditorContentNode, value: string) {
    return `<span class="is-${node.type}" data-id="${node.id}" data-type="${node.type}">${value}</span>`;
  }

  /**
   * 获取一行数据
   * @param node
   * @param value
   * @private
   */
  #getLineTagHtml(node: TCommandEditorContentNode, value: string) {
    return `<div class="is-${node.type}" data-id="${node.id}">${value}</span></div>`;
  }

  /**
   * 解析元素成字符串
   * @param rootEl
   */
  parseDomToText(rootEl: Element): string {
    const parseDom = (nodes: NodeListOf<Node>) => {
      let text = '';
      for (const node of nodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element;
          text += parseDom(el.childNodes);
          // 需判断删除时一行里面有br标签
          if (
            !el.querySelector('br') &&
            (CommandEditorParser.brTagName === el.tagName || CommandEditorParser.blockTagNames.includes(el.tagName))
          ) {
            text += CommandEditorParser.lineBreak;
          }
        }
        if (node.nodeType === Node.TEXT_NODE) {
          text += node.textContent;
        }
      }
      return text;
    };
    const text = parseDom(rootEl.childNodes).replaceAll(CommandEditorParser.spaceRegMatch, CommandEditorParser.space);
    console.log('parseDomToText：\n', text);
    return text;
  }

  /**
   * 获取指定节点指定位置前面所有字符串
   * @param rootEl 包含offsetNode的元素
   * @param offsetNode range.endContainer
   * @param offsetIndex range.endOffset，-1表示末尾
   */
  getOffsetTextForDom(rootEl: Element, offsetNode: Node, offsetIndex = -1): string {
    let found = false;
    let offsetText = '';

    const parseDom = (nodes: NodeListOf<Node>) => {
      for (const node of nodes) {
        if (node === offsetNode) {
          if (node.nodeType === Node.TEXT_NODE) {
            offsetText += (offsetIndex === -1 ? node.textContent : node.textContent?.substring(0, offsetIndex)) ?? '';
          }
          found = true;
          break;
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element;

          if (el.childNodes.length) parseDom(el.childNodes);
          if (found) break;

          // 需判断删除时一行里面有br标签
          if (
            !el.querySelector('br') &&
            (CommandEditorParser.brTagName === el.tagName || CommandEditorParser.blockTagNames.includes(el.tagName))
          ) {
            offsetText += CommandEditorParser.lineBreak;
          }
        }
        if (node.nodeType === Node.TEXT_NODE) {
          offsetText += node.textContent ?? '';
        }
      }
    };

    if (rootEl === offsetNode && offsetIndex !== -1 && offsetIndex < rootEl.childNodes.length) {
      offsetNode = rootEl.childNodes[offsetIndex];
      offsetIndex = -1;
    }

    parseDom(rootEl.childNodes);
    offsetText = offsetText.replaceAll(CommandEditorParser.spaceRegMatch, CommandEditorParser.space);
    console.log('getOffsetTextForDom：\n', offsetText);
    return offsetText;
  }

  /**
   * 将vNode解析成html
   * @param vNodes
   */
  parseVNodeToHtml(vNodes: TCommandEditorContentNode[]): string {
    const htmls: string[] = [];
    let html = '';
    vNodes.forEach((node) => {
      // 换行
      if ([ETokenType.lineR, ETokenType.lineN].includes(node.type)) {
        // 放入一行后保存
        htmls.push(html ? this.#getLineTagHtml(node, html) : this.#getBrTagHtml(node));
        // 重新开始
        html = '';
      }
      // 空格
      if (ETokenType.space === node.type) {
        html += this.#getTokenTagHtml(node, '&nbsp;');
      }
      // token
      if (
        [
          ETokenType.parentheses,
          ETokenType.command,
          ETokenType.parameter,
          ETokenType.optionKey,
          ETokenType.pipe,
          ETokenType.keyCommand,
          ETokenType.keyCommandContent,
        ].includes(node.type)
      ) {
        html += this.#getTokenTagHtml(node, node.value);
      }
    });
    // 查找是否有未闭合标签
    if (html) {
      htmls.push(this.#getLineTagHtml(vNodes[vNodes.length - 1], html));
    }
    return htmls.join('');
  }

  /**
   * 将vNode解析成text
   * @param vNodes
   */
  parseVNodeToText(vNodes: TCommandEditorContentNode[]): string {
    let text = '';
    vNodes.forEach((node) => {
      let value = node.value;
      // 换行
      if ([ETokenType.lineR, ETokenType.lineN].includes(node.type)) {
        value = CommandEditorParser.lineBreak; // 统一换行符
      }
      // 空格
      if (ETokenType.space === node.type) {
        value = CommandEditorParser.space; // 空格
      }
      text += value;
    });
    return text;
  }

  /**
   * 根据DOM元素和光标位置之前的所有文本，获取光标的endContainer、endOffset信息
   * @param rootEl
   * @param offsetText
   */
  findCursorInfoForDom(rootEl: Element, offsetText: string): TCommandEditorRangInfo | null {
    let range: TCommandEditorRangInfo | null = null;
    const parseDom = (nodes: NodeListOf<Node>, isRoot: boolean) => {
      for (const node of nodes) {
        if (range) break;
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element;
          if (el.childNodes.length) {
            parseDom(el.childNodes, false);
            if (range) break;
          }
          if (isRoot) {
            if (offsetText.startsWith(CommandEditorParser.lineBreak)) {
              offsetText = offsetText.substring(CommandEditorParser.lineBreak.length);
              continue;
            } else {
              range = { endContainer: el, endOffset: el.childNodes.length };
              break;
            }
          }
        }
        if (node.nodeType === Node.TEXT_NODE) {
          let text = node.textContent;
          if (
            text &&
            offsetText.startsWith(text.replaceAll(CommandEditorParser.spaceRegMatch, CommandEditorParser.space))
          ) {
            offsetText = offsetText.substring(text.length);
            if (offsetText === '') {
              // 如果offsetText已经为空，我们找到了正确的位置
              range = {
                endContainer: node,
                endOffset: text.length,
              };
              break;
            }
            continue;
          } else {
            text = text ?? '';
            range = {
              endContainer: node,
              endOffset: offsetText.length > text.length ? text.length : offsetText.length,
            };
            break;
          }
        }
      }
    };
    parseDom(rootEl.childNodes, true);
    console.log('range', range);
    return range;
  }
}
