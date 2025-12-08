import { ScopeError } from '@istock-shell/util';
import { TokenType, Tokenizer } from './tokenizer';

/**
 * AST（抽象语法树）节点类型枚举
 *
 * 定义了命令解析过程中可能出现的所有节点类型
 *
 * @public
 */
export enum AstTreeType {
  /** 根节点类型 */
  'root',
  /** 圆括号分组节点类型 */
  'parentheses',
  /** 管道操作符节点类型 */
  'pipe',
  /** 普通命令节点类型 */
  'command',
  /** 关键字命令节点类型（如 ai:、ss: 等） */
  'keyCommand',
  /** 参数节点类型 */
  'parameter',
  /** 选项键节点类型（如 -v、--help 等） */
  'optionKey',
  /** 提及节点类型 */
  'mention',
}

/**
 * AST 提及节点类型定义
 *
 * 表示命令行中的提及（如 @[id,label] 等）
 *
 * @public
 */
export type AstTreeMention = {
  /** 节点类型标识 */
  type: AstTreeType.mention;
  /** 提及值 */
  value: string;
};

/**
 * AST 参数节点类型定义
 *
 * 表示命令行中的参数值
 *
 * @public
 */
export type AstTreeParameter = {
  /** 节点类型标识 */
  type: AstTreeType.parameter;
  /** 参数值 */
  value: string;
};

/**
 * AST 选项键节点类型定义
 *
 * 表示命令行中的选项键（如 -v、--verbose 等）
 *
 * @public
 */
export type AstTreeOption = {
  /** 节点类型标识 */
  type: AstTreeType.optionKey;
  /** 选项键值 */
  value: string;
};

/**
 * AST 管道节点类型定义
 *
 * 表示命令行中的管道操作符（如 |、&、||、&& 等）
 *
 * @public
 */
export type AstTreePipe = {
  /** 节点类型标识 */
  type: AstTreeType.pipe;
  /** 管道操作符值 */
  value: string;
};

/**
 * AST 普通命令节点类型定义
 *
 * 表示命令行中的普通命令及其参数和选项
 *
 * @public
 */
export type AstTreeCommand = {
  /** 节点类型标识 */
  type: AstTreeType.command;
  /** 命令名称 */
  value: string;
  /** 子节点列表，包含参数和选项 */
  children: Array<AstTreeParameter | AstTreeOption>;
};

/**
 * AST 关键字命令节点类型定义
 *
 * 表示特殊的关键字命令（如 ai:、ss: 等）
 *
 * @public
 */
export type AstTreeKeyCommand = {
  /** 节点类型标识 */
  type: AstTreeType.keyCommand;
  /** 关键字命令值 */
  value: string;
  /** 子节点列表，仅包含参数 */
  children: (AstTreeParameter | AstTreeMention)[];
};

/**
 * AST 节点联合类型
 *
 * 表示所有可能的 AST 节点类型
 *
 * @public
 */
export type AstTreeItem = AstTreeParentheses | AstTreeCommand | AstTreeKeyCommand | AstTreePipe;

/**
 * AST 圆括号分组节点类型定义
 *
 * 表示用圆括号包围的命令组
 *
 * @public
 */
export type AstTreeParentheses = {
  /** 节点类型标识 */
  type: AstTreeType.parentheses;
  /** 子节点列表 */
  children: AstTreeItem[];
};

/**
 * AST 根节点类型定义
 *
 * 表示整个命令行解析结果的根节点
 *
 * @public
 */
export type AstTreeRoot = {
  /** 节点类型标识 */
  type: AstTreeType.root;
  /** 子节点列表 */
  children: AstTreeItem[];
};

/**
 * AST 树类型别名
 *
 * 等同于 AstTreeRoot，表示完整的抽象语法树
 *
 * @public
 */
export type AstTree = AstTreeRoot;

/**
 * AST（抽象语法树）解析器类
 *
 * 负责将词法分析器产生的 Token 序列转换为抽象语法树结构。
 * 该类是命令解析流程中的核心组件，将线性的 Token 序列转换为
 * 具有层次结构的语法树，便于后续的语义分析和命令执行。
 *
 * @example
 * ```typescript
 * const ast = new Ast();
 * const tree = ast.parse('ls -la | grep test');
 * console.log(tree);
 * // 输出包含命令、选项和管道操作符的抽象语法树结构
 * ```
 *
 * @public
 */
export class Ast {
  /** 词法分析器实例，用于将输入字符串转换为 Token 序列 */
  readonly #tokenizer: Tokenizer;

  /**
   * 获取词法分析器的符号配置
   *
   * @returns 符号配置对象，包含各种操作符和分隔符的定义
   */
  get symbol() {
    return this.#tokenizer.symbol;
  }

  /**
   * 获取词法分析器实例
   *
   * @returns 词法分析器实例
   */
  get tokenizer() {
    return this.#tokenizer;
  }

  /**
   * 构造函数
   *
   * 初始化 AST 解析器，创建内部的词法分析器实例
   */
  constructor() {
    this.#tokenizer = new Tokenizer();
  }

  /**
   * 解析输入字符串为抽象语法树
   *
   * 该方法是 AST 解析的主入口，接收命令行字符串输入，
   * 通过词法分析器生成 Token 序列，然后递归构建语法树结构。
   *
   * @param input - 待解析的命令行字符串
   * @returns 解析后的抽象语法树
   *
   * @throws {@link ScopeError} 当遇到未知类型的 Token 时抛出
   *
   * @example
   * ```typescript
   * const ast = new Ast();
   *
   * // 解析简单命令
   * const tree1 = ast.parse('ls -la');
   * // 输出: {type: 'root', children: [{type: 'command', value: 'ls', children: [{type: 'optionKey', value: '-la'}]}]}
   *
   * // 解析管道命令
   * const tree2 = ast.parse('ls | grep test');
   * // 输出包含命令、管道和参数的抽象语法树结构
   *
   * // 解析带圆括号的复杂命令
   * const tree3 = ast.parse('(ls -la && pwd) | grep home');
   * // 输出包含圆括号分组、命令、管道和参数的复杂抽象语法树结构
   *
   * // 解析关键字命令
   * const tree4 = ast.parse('ai: 帮我写一个函数');
   * // 输出包含关键字命令和内容的抽象语法树结构
   * ```
   */
  parse(input: string) {
    // 创建根节点
    const ast: AstTree = { type: AstTreeType.root, children: [] };

    // 使用词法分析器解析输入字符串，并过滤掉空白字符和换行符
    const tokens = this.#tokenizer.parse(input).filter((token) => {
      return ![TokenType.space, TokenType.lineN, TokenType.lineR].includes(token.type);
    });

    // 当前处理的 Token 索引
    let index = 0;

    /**
     * 递归函数：将 Token 转换为 AST 节点
     *
     * 该函数根据当前 Token 的类型，递归地构建对应的 AST 节点。
     * 支持处理圆括号分组、管道操作符、普通命令和关键字命令。
     *
     * @returns 构建的 AST 节点
     * @throws {@link ScopeError} 当遇到未知类型的 Token 时抛出
     */
    const toAst: () => AstTreeItem = () => {
      const { symbol } = this.#tokenizer;
      let token = tokens[index];

      // 处理左圆括号：创建分组节点
      if (token.type === TokenType.parentheses && symbol.parenthesesLeft.includes(token.value)) {
        const parenthesesNode: AstTreeItem = { type: AstTreeType.parentheses, children: [] };
        token = tokens[++index];

        // 递归处理圆括号内的所有内容，直到遇到右圆括号
        while (token && !symbol.parenthesesRight.includes(token.value)) {
          parenthesesNode.children.push(toAst());
          token = tokens[index];
        }

        index++; // 跳过右圆括号
        return parenthesesNode;
      }

      // 处理管道操作符
      if (token.type === TokenType.pipe) {
        index++;
        return { type: AstTreeType.pipe, value: token.value };
      }

      // 处理命令（普通命令和关键字命令）
      if ([TokenType.command, TokenType.keyCommand].includes(token.type)) {
        let commandNode: AstTreeCommand | AstTreeKeyCommand | undefined;

        // 创建普通命令节点
        if (TokenType.command === token.type) {
          commandNode = { type: AstTreeType.command, children: [], value: token.value };
        }

        // 创建关键字命令节点
        if (TokenType.keyCommand === token.type) {
          commandNode = { type: AstTreeType.keyCommand, children: [], value: token.value };
        }

        if (commandNode) {
          token = tokens[++index];

          // 处理命令的参数和选项
          while (
            token &&
            [TokenType.keyCommandContent, TokenType.optionKey, TokenType.parameter, TokenType.mention].includes(
              token.type
            )
          ) {
            // 处理关键字命令内容
            if (token.type === TokenType.keyCommandContent) {
              (commandNode as AstTreeKeyCommand).children.push({
                type: AstTreeType.parameter,
                value: token.value,
              });
            }

            // 处理选项键
            if (TokenType.optionKey === token.type) {
              (commandNode as AstTreeCommand).children.push({
                type: AstTreeType.optionKey,
                value: token.value,
              });
            }

            // 处理参数
            if (TokenType.parameter === token.type) {
              (commandNode as AstTreeCommand).children.push({
                type: AstTreeType.parameter,
                value: token.value,
              });
            }

            // 处理提及
            if (TokenType.mention === token.type) {
              if (commandNode.type === AstTreeType.keyCommand) {
                (commandNode as AstTreeKeyCommand).children.push({
                  type: AstTreeType.mention,
                  value: token.value,
                });
              }
            }

            token = tokens[++index];
          }

          return commandNode;
        }
      }

      // 遇到未知类型的 Token，抛出错误
      throw new ScopeError(`command.${this.constructor.name}`, `未知类型token：${JSON.stringify(token)}`);
    };

    // 遍历所有 Token，构建完整的 AST
    while (index < tokens.length) {
      ast.children.push(toAst());
    }

    return ast;
  }
}
