import { ScopeError } from '@istock/util';
import { ETokenType, Tokenizer } from './tokenizer';

export enum EAstTreeType {
  'root',
  'parentheses',
  'pipe',
  'command',
  'keyCommand',
  'parameter',
  'optionKey',
}

export type TAstTreeParameter = {
  type: EAstTreeType.parameter;
  value: string;
};

export type TAstTreeOption = {
  type: EAstTreeType.optionKey;
  value: string;
};

export type TAstTreePipe = {
  type: EAstTreeType.pipe;
  value: string;
};

export type TAstTreeCommand = {
  type: EAstTreeType.command;
  value: string;
  children: Array<TAstTreeParameter | TAstTreeOption>;
};

export type TAstTreeKeyCommand = {
  type: EAstTreeType.keyCommand;
  value: string;
  children: TAstTreeParameter[];
};

export type TAstTreeItem = TAstTreeParentheses | TAstTreeCommand | TAstTreeKeyCommand | TAstTreePipe;

export type TAstTreeParentheses = {
  type: EAstTreeType.parentheses;
  children: TAstTreeItem[];
};

export type TAstTreeRoot = {
  type: EAstTreeType.root;
  children: TAstTreeItem[];
};

export type TAstTree = TAstTreeRoot;

export class Ast {
  readonly #tokenizer: Tokenizer;
  get symbol() {
    return this.#tokenizer.symbol;
  }

  get tokenizer() {
    return this.#tokenizer;
  }

  constructor() {
    this.#tokenizer = new Tokenizer();
  }

  parse(input: string) {
    const ast: TAstTree = { type: EAstTreeType.root, children: [] };
    const tokens = this.#tokenizer.parse(input).filter((token) => {
      return ![ETokenType.space, ETokenType.lineN, ETokenType.lineR].includes(token.type);
    });
    let index = 0;
    const toAst: () => TAstTreeItem = () => {
      const { symbol } = this.#tokenizer;
      let token = tokens[index];
      // 圆括号处理层级
      if (token.type === ETokenType.parentheses && symbol.parenthesesLeft.includes(token.value)) {
        const parenthesesNode: TAstTreeItem = { type: EAstTreeType.parentheses, children: [] };
        token = tokens[++index];
        while (token && !symbol.parenthesesRight.includes(token.value)) {
          parenthesesNode.children.push(toAst());
          token = tokens[index];
        }
        index++; // 右圆括号直接丢弃
        return parenthesesNode;
      }
      // 管道
      if (token.type === ETokenType.pipe) {
        index++;
        return { type: EAstTreeType.pipe, value: token.value };
      }
      // 命令
      if ([ETokenType.command, ETokenType.keyCommand].includes(token.type)) {
        let commandNode: TAstTreeCommand | TAstTreeKeyCommand | undefined;
        if (ETokenType.command === token.type) {
          commandNode = { type: EAstTreeType.command, children: [], value: token.value };
        }
        if (ETokenType.keyCommand === token.type) {
          commandNode = { type: EAstTreeType.keyCommand, children: [], value: token.value };
        }
        if (commandNode) {
          token = tokens[++index];
          while (
            token &&
            [ETokenType.keyCommandContent, ETokenType.optionKey, ETokenType.parameter].includes(token.type)
          ) {
            if (token.type === ETokenType.keyCommandContent) {
              (commandNode as TAstTreeKeyCommand).children.push({
                type: EAstTreeType.parameter,
                value: token.value,
              });
            }
            if (ETokenType.optionKey === token.type) {
              (commandNode as TAstTreeCommand).children.push({
                type: EAstTreeType.optionKey,
                value: token.value,
              });
            }
            if (ETokenType.parameter === token.type) {
              (commandNode as TAstTreeCommand).children.push({
                type: EAstTreeType.parameter,
                value: token.value,
              });
            }
            token = tokens[++index];
          }
          return commandNode;
        }
      }
      throw new ScopeError(`command.${this.constructor.name}`, `未知类型token：${JSON.stringify(token)}`);
    };
    while (index < tokens.length) {
      ast.children.push(toAst());
    }
    return ast;
  }
}
/*

const ast = new Ast();

console.log(ast.parse('ping a -a && (npm run | docker start aaa -t mm)'));
*/
