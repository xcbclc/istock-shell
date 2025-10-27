import { Extension } from '@tiptap/core';
import { Plugin } from '@tiptap/pm/state';
import type { Node } from '@tiptap/pm/model';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { type Tokenizer, TokenType } from '@istock-shell/command-parser';

export interface CommandHighlighterOption {
  tokenizer: Tokenizer;
}

function findCommandHighlights(tokenizer: Tokenizer, doc: Node): DecorationSet {
  const decorations: Decoration[] = [];

  doc.descendants((node, position) => {
    if (!node.text) {
      return;
    }
    const text = node.text;
    try {
      const tokens = tokenizer.parse(text, false); // 不进行语法检查，只做词法分析

      let textOffset = 0;
      for (const token of tokens) {
        const tokenStart = position + textOffset;
        const tokenEnd = position + textOffset + token.value.length;

        // 根据 TokenType 添加相应的样式类
        let className = '';
        switch (token.type) {
          case TokenType.command:
            className = 'is-command';
            break;
          case TokenType.parameter:
            className = 'is-parameter';
            break;
          case TokenType.optionKey:
            className = 'is-optionKey';
            break;
          case TokenType.pipe:
            className = 'is-pipe';
            break;
          case TokenType.keyCommand:
            className = 'is-keyCommand';
            break;
          case TokenType.keyCommandContent:
            className = 'is-keyCommandContent';
            break;
          case TokenType.parentheses:
            className = 'is-parentheses';
            break;
          case TokenType.space:
          case TokenType.lineR:
          case TokenType.lineN:
            // 空白字符不需要高亮
            break;
        }

        if (className) {
          decorations.push(
            Decoration.inline(tokenStart, tokenEnd, {
              class: className,
            })
          );
        }

        textOffset += token.value.length;
      }
    } catch (error) {
      // 如果解析失败，不添加高亮
      console.warn('Command highlighting failed:', error);
    }
  });

  return DecorationSet.create(doc, decorations);
}

export const getCommandHighlighter = (option: CommandHighlighterOption) => {
  return Extension.create({
    name: 'commandHighlighter',
    addProseMirrorPlugins() {
      return [
        new Plugin({
          state: {
            init(_, { doc }) {
              return findCommandHighlights(option.tokenizer, doc);
            },
            apply(transaction, oldState) {
              return transaction.docChanged ? findCommandHighlights(option.tokenizer, transaction.doc) : oldState;
            },
          },
          props: {
            decorations(state) {
              return this.getState(state);
            },
          },
        }),
      ];
    },
  });
};
