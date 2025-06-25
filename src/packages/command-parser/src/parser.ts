import {
  ScopeError,
  isArray,
  isBoolean,
  isNil,
  isNumber,
  isRegExp,
  isStrRegExp,
  isUndefined,
  isPlainObject,
  isString,
} from '@istock-shell/util';
import { Ast, AstTreeType, type AstTreeItem, type AstTreeOption, type AstTreeParameter } from './ast';

/**
 * 命令参数接口
 *
 * 定义命令行位置参数的结构和属性。位置参数是按照特定顺序出现的命令行参数，
 * 不需要前缀标识符，直接跟在命令名称后面。
 *
 * @example
 * ```typescript
 * const fileArgument: Argument = {
 *   name: 'file',
 *   parameterType: ['string'],
 *   description: '要处理的文件路径',
 *   optional: false
 * };
 * ```
 *
 * @public
 */
export interface Argument {
  /** 参数名称 */
  name: string;
  /** 参数类型列表，如 string、number、boolean 等 */
  parameterType: string[];
  /** 参数的描述信息 */
  description?: string;
  /** 参数的默认值 */
  default?: any;
  /** 是否为可选参数 */
  optional?: boolean;
  /** 用于验证参数值的正则表达式 */
  regex?: RegExp;
  /** 数值类型参数的最小值 */
  min?: number;
  /** 数值类型参数的最大值 */
  max?: number;
  /** 参数的可选值列表 */
  choices?: Array<string | number | boolean | null>;
}

/**
 * 命令选项接口
 *
 * 定义命令行选项的结构和属性。选项是可选的命名参数，
 * 通常以 - 或 -- 开头，可以在命令行的任意位置出现。
 *
 * @example
 * ```typescript
 * const verboseOption: Option = {
 *   name: 'verbose',
 *   parameter: ['v'],
 *   parameterType: ['boolean'],
 *   description: '启用详细输出',
 *   default: false
 * };
 * ```
 *
 * @public
 */
export interface Option {
  /** 选项名称 */
  name: string;
  /** 选项的参数名称列表，如 ['v', 'verbose'] */
  parameter: string[];
  /** 参数类型列表，如 string、number、boolean 等 */
  parameterType: string[];
  /** 选项的描述信息 */
  description?: string;
  /** 选项的默认值 */
  default?: any;
  /** 是否为可选选项 */
  optional?: boolean;
  /** 用于验证选项值的正则表达式 */
  regex?: RegExp;
  /** 数值类型选项的最小值 */
  min?: number;
  /** 数值类型选项的最大值 */
  max?: number;
  /** 选项的可选值列表 */
  choices?: Array<string | number | boolean | null>;
}

/**
 * 命令接口
 *
 * 定义完整命令的结构，包括命令名称、描述、参数、选项、
 * 子命令和执行动作。这是命令解析器的核心数据结构。
 *
 * @example
 * ```typescript
 * const copyCommand: Command = {
 *   name: 'copy',
 *   cmd: 'copy',
 *   description: '复制文件或目录',
 *   arguments: [
 *     { name: 'source', parameterType: ['string'], optional: false },
 *     { name: 'destination', parameterType: ['string'], optional: false }
 *   ],
 *   options: [
 *     { name: 'recursive', parameter: ['r'], parameterType: ['boolean'] }
 *   ],
 *   callback: (args) => {
 *     // 执行复制操作
 *   }
 * };
 * ```
 *
 * @public
 */
export interface Command {
  /** 命令名称 */
  name: string;
  /** 命令 */
  cmd: string;
  /** 用法 */
  usage?: string;
  /** 命令描述 */
  description?: string;
  /** 选项参数列表 */
  options?: Option[];
  /** 参数 */
  arguments?: Argument[];
  /** 子命令列表 */
  commands?: Command[];
  /** 回调函数 */
  callback?: (args: any) => void;
}

/**
 * 关键字命令解析结果
 *
 * 表示解析后的关键字命令（如 ai:、ss: 等）的结构
 *
 * @public
 */
export type KeyCommandResult = {
  /** 结果类型，固定为关键字命令类型 */
  type: AstTreeType.keyCommand;
  /** 命令名称 */
  cmd: string;
  /** 命令参数列表 */
  arguments: any[];
};

/**
 * 普通命令解析结果
 *
 * 表示解析后的普通命令的结构，包含命令名称、参数、选项和可能的子命令
 *
 * @public
 */
export type CommandResult = {
  /** 结果类型，固定为命令类型 */
  type: AstTreeType.command;
  /** 命令名称 */
  cmd: string;
  /** 位置参数列表 */
  arguments: unknown[];
  /** 选项参数映射 */
  options: Record<string, unknown>;
  /** 子命令（如果存在） */
  subCommand?: CommandResult;
};

/**
 * 圆括号分组解析结果
 *
 * 表示被圆括号包围的命令组的结构
 *
 * @public
 */
export type CommandParenthesesResult = {
  /** 结果类型，固定为圆括号类型 */
  type: AstTreeType.parentheses;
  /** 子命令项列表 */
  children: CommandItemResult[];
};

/**
 * 管道操作符解析结果
 *
 * 表示命令之间的管道连接操作符（如 |、&、||、&& 等）
 *
 * @public
 */
export type CommandPipeResult = {
  /** 结果类型，固定为管道类型 */
  type: AstTreeType.pipe;
  /** 管道操作符的值 */
  value: string;
};

/**
 * 命令项解析结果联合类型
 *
 * 表示命令解析树中的任意节点类型，可以是圆括号分组、管道操作符、关键字命令或普通命令
 *
 * @public
 */
export type CommandItemResult = CommandParenthesesResult | CommandPipeResult | KeyCommandResult | CommandResult;

/**
 * 命令解析器结果
 *
 * 表示完整的命令解析结果，包含所有解析出的命令项
 *
 * @public
 */
export type CommandParserResult = {
  /** 结果类型，固定为根节点类型 */
  type: AstTreeType.root;
  /** 子命令项列表 */
  children: CommandItemResult[];
};

/**
 * 命令行解析器类
 *
 * 这是一个功能完整的命令行解析器，负责将用户输入的命令行字符串
 * 解析为结构化的命令、参数和选项。支持复杂的命令行语法，包括：
 *
 * - 嵌套命令和子命令
 * - 命名选项和位置参数
 * - 管道操作和命令组合
 * - 圆括号分组
 * - 类型验证和默认值处理
 *
 * 解析流程：
 * 1. 使用词法分析器将输入转换为 Token 序列
 * 2. 使用语法分析器构建抽象语法树（AST）
 * 3. 遍历 AST 并匹配预定义的命令结构
 * 4. 验证参数和选项的类型及必需性
 * 5. 返回解析结果或错误信息
 *
 * @example
 * ```typescript
 * const parser = new CmdParser();
 *
 * // 添加命令定义
 * parser.addCommand({
 *   name: 'copy',
 *   cmd: 'copy',
 *   arguments: [
 *     { name: 'source', parameterType: ['string'], optional: false },
 *     { name: 'dest', parameterType: ['string'], optional: false }
 *   ],
 *   options: [
 *     { name: 'recursive', parameter: ['r'], parameterType: ['boolean'] }
 *   ]
 * });
 *
 * // 解析命令行
 * const result = parser.parse('copy file1.txt file2.txt -r');
 * ```
 *
 * @public
 */
export class CmdParser {
  /** 全局选项列表 */
  readonly #options: Option[] = [];

  /** 命令定义列表 */
  readonly #commands: Command[] = [];

  /** 全局参数列表 */
  readonly #arguments: Argument[] = [];

  /** 抽象语法树解析器实例 */
  readonly #ast: Ast;

  /**
   * 获取符号表实例
   *
   * @returns 符号表实例
   * @readonly
   */
  get symbol() {
    return this.#ast.symbol;
  }

  /**
   * 获取词法分析器实例
   *
   * @returns 词法分析器实例
   * @readonly
   */
  get tokenizer() {
    return this.#ast.tokenizer;
  }

  /**
   * 构造函数
   *
   * 初始化命令行解析器，创建必要的内部组件。
   */
  constructor() {
    this.#ast = new Ast();
  }

  /**
   * 添加全局选项
   *
   * 向解析器添加一个全局选项定义。全局选项可以在任何命令中使用，
   * 通常用于定义通用的配置选项，如 --verbose、--help 等。
   *
   * @param option - 要添加的选项定义
   * @returns 返回解析器实例，支持链式调用
   *
   * @example
   * ```typescript
   * parser.addOption({
   *   name: 'verbose',
   *   parameter: ['v'],
   *   description: '启用详细输出',
   *   parameterType: ['boolean'],
   *   default: false
   * });
   * ```
   *
   * @public
   */
  public addOption(option: Option): this {
    this.#options.push(option);
    return this;
  }

  /**
   * 添加全局参数
   *
   * 向解析器添加一个全局参数定义。全局参数是位置参数，
   * 按照添加的顺序从命令行中获取值。
   *
   * @param argument - 要添加的参数定义
   * @returns 返回解析器实例，支持链式调用
   *
   * @example
   * ```typescript
   * parser.addArgument({
   *   name: 'inputFile',
   *   description: '输入文件路径',
   *   optional: false,
   *   parameterType: ['string']
   * });
   * ```
   *
   * @public
   */
  public addArgument(argument: Argument): this {
    this.#arguments.push(argument);
    return this;
  }

  /**
   * 添加命令定义
   *
   * 向解析器添加一个命令定义。命令定义包含命令名称、描述、
   * 参数、选项和执行动作等信息。
   *
   * @param command - 要添加的命令定义
   * @returns 返回解析器实例，支持链式调用
   *
   * @example
   * ```typescript
   * parser.addCommand({
   *   name: 'copy',
   *   cmd: 'copy',
   *   description: '复制文件',
   *   arguments: [
   *     { name: 'source', parameterType: ['string'], optional: false },
   *     { name: 'destination', parameterType: ['string'], optional: false }
   *   ],
   *   options: [
   *     { name: 'recursive', parameter: ['r'], parameterType: ['boolean'] }
   *   ],
   *   callback: (args) => {
   *     console.log(`Copying ${args.source} to ${args.destination}`);
   *   }
   * });
   * ```
   *
   * @public
   */
  public addCommand(command: Command): this {
    const index = this.#commands.findIndex((item) => item.cmd === command.cmd);
    if (index === -1) {
      this.#commands.push(command);
    } else {
      this.#commands.splice(index, 1, command);
    }
    return this;
  }

  /**
   * 解析命令行字符串
   *
   * 这是解析器的主要入口方法，将输入的命令行字符串解析为
   * 结构化的命令执行结果。解析过程包括：
   *
   * 1. 词法分析 - 将字符串分解为 Token 序列
   * 2. 语法分析 - 构建抽象语法树（AST）
   * 3. 语义分析 - 匹配命令定义并验证参数
   * 4. 结果生成 - 返回可执行的命令结果
   *
   * @param input - 要解析的命令行字符串
   * @returns 解析结果，包含匹配的命令、参数和选项
   *
   * @example
   * ```typescript
   * // 解析简单命令
   * const result1 = parser.parse('copy file1.txt file2.txt');
   *
   * // 解析带选项的命令
   * const result2 = parser.parse('copy file1.txt file2.txt --recursive');
   *
   * // 解析管道命令
   * const result3 = parser.parse('ls -la | grep test');
   *
   * // 解析分组命令
   * const result4 = parser.parse('(echo hello && echo world) | grep hello');
   * ```
   *
   * @throws {ScopeError} 当命令语法错误或找不到匹配的命令定义时抛出
   *
   * @public
   */
  public parse(input: string) {
    const topCommand = { name: '', cmd: '', options: this.#options, commands: this.#commands };
    const commandTree = this.#ast.parse(input);
    const result: CommandParserResult = { type: AstTreeType.root, children: [] };
    result.children = this.#parseCommand(topCommand, commandTree.children, result.children);
    return result;
  }

  /**
   * 解析命令行参数逻辑
   *
   * 递归解析 AST 节点列表，将抽象语法树转换为可执行的命令结构。
   * 该方法是解析器的核心逻辑，负责处理各种类型的 AST 节点：
   *
   * - parentheses: 圆括号分组，递归处理内部节点
   * - pipe: 管道操作符，保留操作符信息
   * - keyCommand: 关键字命令，提取命令和参数
   * - command: 普通命令，匹配命令定义并解析参数选项
   *
   * @param topCommand - 顶级命令上下文，包含可用的命令和选项定义
   * @param nodes - 要解析的 AST 节点数组
   * @param resultChildren - 解析结果数组，用于存储解析后的命令结构
   * @returns 解析后的命令结果数组
   *
   * @throws {ScopeError} 当遇到未知命令或无法识别的节点类型时抛出
   *
   * @private
   */
  #parseCommand(topCommand: Command, nodes: AstTreeItem[], resultChildren: CommandItemResult[]) {
    if (nodes.length === 0) return [];
    let index: number = 0;

    const parseCommand = (node: AstTreeItem): CommandItemResult => {
      if (node.type === AstTreeType.parentheses) {
        const parentheses: CommandParenthesesResult = {
          type: AstTreeType.parentheses,
          children: [],
        };
        node.children.forEach((item) => {
          parentheses.children.push(parseCommand(item));
        });
        return parentheses;
      }
      if (node.type === AstTreeType.pipe) {
        return { type: AstTreeType.pipe, value: node.value };
      }
      if (node.type === AstTreeType.keyCommand) {
        const keyCommand: KeyCommandResult = {
          type: AstTreeType.keyCommand,
          cmd: node.value.replace(':', ''),
          arguments: [],
        };
        keyCommand.arguments = node.children.map((item) => item.value);
        return keyCommand;
      }
      if (node.type === AstTreeType.command) {
        let commandResult: CommandResult = {
          type: AstTreeType.command,
          cmd: node.value,
          arguments: [],
          options: {},
        };
        // 查找当前命令
        const command = topCommand.commands?.find((c) => c.cmd === commandResult.cmd);
        if (!command) {
          throw new ScopeError(`iswork.command.${this.constructor.name}`, `没找到该命令(${commandResult.cmd})`);
        }

        // 先查找所有子命令
        const subCommands: Command[] = [];
        const nodeChildren = node.children.filter((item, index) => {
          if (item.type === AstTreeType.parameter && subCommands.length === index) {
            const subCommand = command?.commands?.find((c) => c.cmd === item.value);
            if (subCommand) {
              subCommands.push(subCommand);
              return false;
            }
          }
          return true;
        });

        // 处理子命令及命令参数
        commandResult = this.#getCommandResult(commandResult, [command, ...subCommands], nodeChildren);
        return commandResult;
      }

      throw new ScopeError(`command.${this.constructor.name}`, `未知命令节点：${JSON.stringify(node)}`);
    };

    while (index < nodes.length) {
      resultChildren.push(parseCommand(nodes[index]));
      index++;
    }

    return resultChildren;
  }

  /**
   * 根据相关信息获取命令解析结果
   *
   * 处理命令的详细解析逻辑，包括子命令处理、参数解析和选项验证。
   * 该方法负责将 AST 节点中的参数和选项映射到命令定义中，
   * 并进行类型转换和验证。
   *
   * 处理流程：
   * 1. 如果有多个命令（存在子命令），递归处理子命令结构
   * 2. 遍历节点子元素，区分选项键和参数值
   * 3. 将选项键映射到命令定义中的选项
   * 4. 将参数值按顺序添加到参数列表
   * 5. 验证必需选项和参数的完整性
   *
   * @param commandResult - 命令解析结果对象，用于存储解析后的数据
   * @param commands - 命令定义数组，第一个为主命令，后续为子命令
   * @param nodeChildren - AST 节点的子元素数组，包含参数和选项
   * @returns 完整的命令解析结果
   *
   * @throws {ScopeError} 当找不到匹配的选项或参数验证失败时抛出
   *
   * @private
   */
  #getCommandResult(
    commandResult: CommandResult,
    commands: Command[],
    nodeChildren: Array<AstTreeParameter | AstTreeOption>
  ) {
    if (commands.length > 1) {
      // 处理子命令结构数据
      const [, ...subcommands] = commands;
      const command = subcommands[0];
      commandResult.subCommand = {
        type: AstTreeType.command,
        cmd: command.cmd,
        arguments: [],
        options: {},
      };
      this.#getCommandResult(commandResult.subCommand, subcommands, nodeChildren);
      return commandResult;
    } else {
      const command: Command = commands[0];
      let nowParam: Option | null = null;
      nodeChildren.forEach((node) => {
        if (node.type === AstTreeType.optionKey) {
          const param = command.options?.find((param) => param.parameter.includes(node.value));
          if (!param) {
            throw new ScopeError(`iswork.command.${this.constructor.name}`, `没有找到该参数(${node.value})`);
          }
          commandResult.options[param.name] = param.default;
          nowParam = param;
          return;
        }
        if (node.type === AstTreeType.parameter) {
          if (nowParam) {
            commandResult.options[nowParam.name] = this.#parseParamsValue(
              nowParam.parameterType,
              node.value ?? nowParam.default
            );
            nowParam = null;
          } else {
            commandResult.arguments.push(node.value);
          }
        }
      });

      if (command.options) {
        this.#checkOptions(command.options, commandResult.options, command);
      }
      return commandResult;
    }
  }

  /**
   * 检查校验选项参数
   *
   * 验证命令选项的完整性和正确性，确保所有必需的选项都已提供，
   * 并且选项值符合定义的类型和约束条件。
   *
   * 验证项目包括：
   * - 必需选项的存在性检查
   * - 选项值的类型验证
   * - 选项值的范围和格式验证
   * - 默认值的应用
   *
   * @param options - 命令定义中的选项列表
   * @param optionResult - 解析后的选项值对象
   * @param command - 当前命令定义，用于错误报告
   *
   * @throws {ScopeError} 当必需选项缺失或选项值不符合要求时抛出
   *
   * @private
   */
  #checkOptions(options: Option[], optionResult: Record<string, unknown>, command: Command) {
    const keyMap = new Map<string, boolean>();
    Object.keys(optionResult).forEach((key) => {
      keyMap.set(key, true);
    });
    options.forEach((option) => {
      if (keyMap.get(option.name)) {
        this.#checkParams(optionResult[option.name], option);
      } else {
        if (!option.optional) {
          throw new ScopeError(
            `iswork.command.${this.constructor.name}`,
            `该${command.cmd}命令的参数(${option.parameter.join(',')})为必填`
          );
        }
      }
    });
  }

  /**
   * 检查校验参数
   *
   * 验证单个参数或选项值的类型、范围和格式是否符合定义要求。
   * 支持多种数据类型的验证，包括基本类型和复合类型。
   *
   * 支持的验证类型：
   * - string: 字符串类型验证
   * - number: 数字类型验证，支持最小值和最大值限制
   * - boolean: 布尔类型验证
   * - array: 数组类型验证
   * - RegExp: 正则表达式类型验证
   *
   * @param paramValue - 要验证的参数值
   * @param checkInfo - 参数或选项的定义信息，包含类型和约束条件
   *
   * @throws {ScopeError} 当参数值不符合定义要求时抛出详细的错误信息
   *
   * @example
   * ```typescript
   * // 验证数字参数
   * this.#checkParams(42, {
   *   name: 'count',
   *   parameterType: ['number'],
   *   min: 1,
   *   max: 100
   * });
   * ```
   *
   * @private
   */
  #checkParams(paramValue: unknown, checkInfo: Option | Argument) {
    let key: string;
    if ('parameter' in checkInfo && checkInfo.parameter) {
      key = checkInfo.parameter.join(',');
    } else {
      key = checkInfo.name;
    }
    const errMsgs: string[] = [];
    if (!checkInfo.optional && isUndefined(paramValue)) {
      throw new ScopeError(`iswork.command.${this.constructor.name}`, `该参数${key}为必填`);
    }
    if (checkInfo.parameterType.includes('boolean') && isNil(paramValue)) {
      errMsgs.push('布尔值');
    }
    if (checkInfo.parameterType.includes('array') && isNil(paramValue)) {
      errMsgs.push('数组');
    }
    if (checkInfo.parameterType.includes('RegExp') && isNil(paramValue)) {
      errMsgs.push('正则表达式');
    }
    if (checkInfo.parameterType.includes('number')) {
      const paramNumber = Number(paramValue);
      if (isNil(paramValue)) {
        errMsgs.push('数字');
      } else if (checkInfo.min && paramNumber < checkInfo.min) {
        errMsgs.push(`不小于${checkInfo.min}(${key}=${paramNumber})`);
      } else if (checkInfo.max && paramNumber > checkInfo.max) {
        errMsgs.push(`不大于${checkInfo.max}(${key}=${paramNumber}`);
      }
    }
    if (errMsgs.length > 0 && errMsgs.length === checkInfo.parameterType.length) {
      throw new ScopeError(
        `iswork.command.${this.constructor.name}`,
        `该参数（${key}=${isNil(paramValue) ? '' : JSON.stringify(paramValue)}）应为` + errMsgs.join('或')
      );
    }
  }

  /**
   * 根据参数类型解析值
   *
   * 将字符串形式的参数值转换为指定的数据类型。支持多种类型的自动转换，
   * 并处理特殊格式的字符串（如带引号的字符串、数字、布尔值等）。
   *
   * 支持的类型转换：
   * - string: 处理带引号的字符串，去除外层引号
   * - number: 将字符串转换为数字类型
   * - boolean: 将字符串转换为布尔值（true/false）
   * - array: 解析 JSON 格式的数组字符串
   * - RegExp: 创建正则表达式对象
   *
   * @param parameterType - 支持的参数类型数组，按优先级排序
   * @param val - 要转换的原始值（通常为字符串）
   * @returns 转换后的值，如果所有类型转换都失败则返回原始值
   *
   * @example
   * ```typescript
   * // 转换字符串
   * const str = this.#parseParamsValue(['string'], '"hello world"');
   * // 返回: "hello world"
   *
   * // 转换数字
   * const num = this.#parseParamsValue(['number'], '42');
   * // 返回: 42
   *
   * // 转换布尔值
   * const bool = this.#parseParamsValue(['boolean'], 'true');
   * // 返回: true
   * ```
   *
   * @private
   */
  #parseParamsValue(parameterType: string[], val: any) {
    return parameterType
      .map((type) => {
        if (isUndefined(val)) return val;
        if (type === 'string' && isString(val)) {
          if (/^["“][\s\S]*["”]$/g.test(val)) {
            return val.substring(1, val.length - 1);
          }
          return val;
        }
        if (type === 'boolean' && !isBoolean(val)) {
          if (['true', '1'].includes(val)) {
            return true;
          }
          if (['false', '0'].includes(val)) {
            return false;
          }
          return null;
        }
        if (type === 'number' && !isNumber(val)) {
          if ([null, undefined, ''].includes(val)) {
            return null;
          }
          const number = Number(val);
          if (isNaN(number)) return null;
          return number;
        }
        if (type === 'array' && !isArray(val)) {
          try {
            return JSON.parse(val);
          } catch (e) {
            return (val as string).split(/,|，/).map((v) => v.trim());
          }
        }
        if (type === 'RegExp' && !isRegExp(val)) {
          if (isStrRegExp(val)) return new RegExp(val);
          return null;
        }
        if (type === 'object' && !isPlainObject(val)) {
          try {
            return JSON.parse(val);
          } catch (e) {
            return val;
          }
        }
        return val;
      })
      .find((v) => !isNil(v));
  }
}
