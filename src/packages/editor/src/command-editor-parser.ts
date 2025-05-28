import { TokenType, type Token } from '@istock-shell/command-parser';

/**
 * 命令编辑器内容节点类型
 * 扩展Token类型，添加唯一标识符
 * @public
 */
export type CommandEditorContentNode = {
  /** 节点唯一标识符 */
  id?: number;
} & Token;

/**
 * 命令编辑器范围信息类型
 * 用于描述光标或选择范围的位置信息
 * @public
 */
export type CommandEditorRangInfo = {
  /** 结束容器节点 */
  endContainer: Node;
  /** 在结束容器中的偏移量 */
  endOffset: number;
};

/**
 * 命令编辑器解析器类
 * 负责虚拟节点与DOM、文本之间的转换和解析
 * @public
 */
export class CommandEditorParser {
  /** 块级标签名称数组 */
  static blockTagNames = ['DIV'];
  /** 换行标签名称 */
  static brTagName = 'BR';
  /** 空格字符匹配正则表达式 */

  static spaceRegMatch = /[\u0020\u3000' ']/g;
  static lineBreak = '\n';
  /** 空格字符 */
  static space = ' ';

  /**
   * 生成br标签HTML
   * 用于表示换行的空行
   * @param node - 内容节点
   * @returns br标签HTML字符串
   * @private
   */
  #getBrTagHtml(node: CommandEditorContentNode) {
    return `<br data-id="${node.id}" data-type="${node.type}">`;
  }

  /**
   * 生成token标签HTML
   * 为token内容添加样式类和数据属性
   * @param node - 内容节点
   * @param value - 显示值
   * @returns span标签HTML字符串
   * @private
   */
  #geTokenTagHtml(node: CommandEditorContentNode, value: string) {
    return `<span class="is-${node.type}" data-id="${node.id}" data-type="${node.type}">${value}</span>`;
  }

  /**
   * 生成行标签HTML
   * 将一行内容包装在div容器中
   * @param node - 内容节点
   * @param value - 行内容
   * @returns div标签HTML字符串
   * @private
   */
  #getLineTagHtml(node: CommandEditorContentNode, value: string) {
    return `<div class="is-${node.type}" data-id="${node.id}">${value}</span></div>`;
  }

  /**
   * 将DOM元素解析为纯文本字符串
   * 递归遍历DOM节点，提取文本内容并处理换行
   * @param rootEl - 根DOM元素
   * @returns 解析后的文本字符串
   * @public
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
    return text;
  }

  /**
   * 获取指定节点和位置之前的所有文本内容
   * 用于计算光标位置前的文本，支持复杂的DOM结构
   * @param rootEl - 包含offsetNode的根元素
   * @param offsetNode - 目标节点（通常是range.endContainer）
   * @param offsetIndex - 在目标节点中的偏移量，-1表示节点末尾
   * @returns 指定位置之前的所有文本内容
   * @public
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
    return offsetText;
  }

  /**
   * 将虚拟节点数组解析为HTML字符串
   * 根据token类型生成相应的HTML标签和样式
   * @param vNodes - 虚拟节点数组
   * @returns 生成的HTML字符串
   * @public
   */
  parseVNodeToHtml(vNodes: CommandEditorContentNode[]): string {
    const htmls: string[] = [];
    let html = '';
    vNodes.forEach((node) => {
      // 换行
      if ([TokenType.lineR, TokenType.lineN].includes(node.type)) {
        // 放入一行后保存
        htmls.push(html ? this.#getLineTagHtml(node, html) : this.#getBrTagHtml(node));
        // 重新开始
        html = '';
      }
      // 空格
      if (TokenType.space === node.type) {
        html += this.#geTokenTagHtml(node, '&nbsp;');
      }
      // token
      if (
        [
          TokenType.parentheses,
          TokenType.command,
          TokenType.parameter,
          TokenType.optionKey,
          TokenType.pipe,
          TokenType.keyCommand,
          TokenType.keyCommandContent,
        ].includes(node.type)
      ) {
        html += this.#geTokenTagHtml(node, node.value);
      }
    });
    // 查找是否有未闭合标签
    if (html) {
      htmls.push(this.#getLineTagHtml(vNodes[vNodes.length - 1], html));
    }
    return htmls.join('');
  }

  /**
   * 将虚拟节点数组解析为纯文本字符串
   * 提取虚拟节点中的文本内容，统一处理换行和空格
   * @param vNodes - 虚拟节点数组
   * @returns 解析后的纯文本字符串
   * @public
   */
  parseVNodeToText(vNodes: CommandEditorContentNode[]): string {
    let text = '';
    vNodes.forEach((node) => {
      let value = node.value;
      // 换行
      if ([TokenType.lineR, TokenType.lineN].includes(node.type)) {
        value = CommandEditorParser.lineBreak; // 统一换行符
      }
      // 空格
      if (TokenType.space === node.type) {
        value = CommandEditorParser.space; // 空格
      }
      text += value;
    });
    return text;
  }

  /**
   * 根据文本偏移量在DOM中查找对应的光标位置信息
   * 通过遍历DOM节点匹配文本内容，确定光标应该位于的具体节点和偏移量
   * @param rootEl - 根DOM元素
   * @param offsetText - 光标位置前的文本内容
   * @returns 光标位置信息，包含容器节点和偏移量，找不到时返回null
   * @public
   */
  findCursorInfoForDom(rootEl: Element, offsetText: string): CommandEditorRangInfo | null {
    let range: CommandEditorRangInfo | null = null;
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
    return range;
  }
}
