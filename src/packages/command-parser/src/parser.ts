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
} from '@istock/util';
import { Ast, EAstTreeType, type TAstTreeItem, type TAstTreeOption, type TAstTreeParameter } from './ast';

interface IArgument {
  name: string; // 参数名称
  parameterType: string[]; // 参数类型，例如 string、number、boolean
  description?: string; // 参数描述
  default?: any; // 默认值
  optional?: boolean; // 是否必填
  regex?: RegExp; // 正则表达式
  min?: number; // 最小值（仅当参数类型为 number 时生效）
  max?: number; // 最大值（仅当参数类型为 number 时生效）
  choices?: Array<string | number | boolean | null>;
}

interface IOption {
  name: string; // 参数名称
  parameter: string[]; // 参数
  parameterType: string[]; // 参数类型，例如 string、number、boolean
  description?: string; // 参数描述
  default?: any; // 默认值
  optional?: boolean; // 是否必填
  regex?: RegExp; // 正则表达式
  min?: number; // 最小值（仅当参数类型为 number 时生效）
  max?: number; // 最大值（仅当参数类型为 number 时生效）
  choices?: Array<string | number | boolean | null>;
}

interface ICommand {
  name: string; // 命令名称
  cmd: string; // 命令
  usage?: string; // 用法
  description?: string; // 命令描述
  options?: IOption[]; // 选项参数列表
  arguments?: IArgument[]; // 参数
  commands?: ICommand[]; // 子命令列表
  callback?: (args: any) => void; // 回调函数
}

export type TKeyCommandResult = {
  type: EAstTreeType.keyCommand;
  cmd: string;
  arguments: any[];
};

export type TCommandResult = {
  type: EAstTreeType.command;
  cmd: string;
  arguments: unknown[];
  options: Record<string, unknown>;
  subCommand?: TCommandResult;
};

export type TCommandParenthesesResult = {
  type: EAstTreeType.parentheses;
  children: TCommandItemResult[];
};

export type TCommandPipeResult = {
  type: EAstTreeType.pipe;
  value: string;
};

export type TCommandItemResult = TCommandParenthesesResult | TCommandPipeResult | TKeyCommandResult | TCommandResult;

export type TCommandParserResult = {
  type: EAstTreeType.root;
  children: TCommandItemResult[];
};

/**
 * 解析命令行工具，把命令字符串解析成规定格式数据
 */
export class CmdParser {
  readonly #options: IOption[] = []; // 全局可选参数列表
  readonly #commands: ICommand[] = []; // 全局命令列表
  readonly #arguments: IArgument[] = []; // 全局命令参数列表
  readonly #ast: Ast;

  get symbol() {
    return this.#ast.symbol;
  }

  get tokenizer() {
    return this.#ast.tokenizer;
  }

  constructor() {
    this.#ast = new Ast();
  }

  /**
   * 添加全局选项参数
   * @param option
   */
  public addOption(option: IOption) {
    this.#options.push(option);
  }

  /**
   * 添加全局命令参数
   * @param arg
   */
  public addArgument(arg: IArgument) {
    this.#arguments.push(arg);
  }

  /**
   * 添加全局命令
   * @param command
   */
  public addCommand(command: ICommand) {
    this.#commands.push(command);
  }

  /**
   * 解析命令行参数入口
   * @param input
   */
  public parse(input: string) {
    const topCommand = { name: '', cmd: '', options: this.#options, commands: this.#commands };
    const commandTree = this.#ast.parse(input);
    const result: TCommandParserResult = { type: EAstTreeType.root, children: [] };
    result.children = this.#parseCommand(topCommand, commandTree.children, result.children);
    return result;
  }

  /**
   * 解析命令行参数逻辑
   * @param topCommand
   * @param nodes
   * @param resultChildren
   * @private
   */
  #parseCommand(topCommand: ICommand, nodes: TAstTreeItem[], resultChildren: TCommandItemResult[]) {
    if (nodes.length === 0) return [];
    let index: number = 0;

    const parseCommand = (node: TAstTreeItem): TCommandItemResult => {
      if (node.type === EAstTreeType.parentheses) {
        const parentheses: TCommandParenthesesResult = {
          type: EAstTreeType.parentheses,
          children: [],
        };
        node.children.forEach((item) => {
          parentheses.children.push(parseCommand(item));
        });
        return parentheses;
      }
      if (node.type === EAstTreeType.pipe) {
        return { type: EAstTreeType.pipe, value: node.value };
      }
      if (node.type === EAstTreeType.keyCommand) {
        const keyCommand: TKeyCommandResult = {
          type: EAstTreeType.keyCommand,
          cmd: node.value.replace(':', ''),
          arguments: [],
        };
        keyCommand.arguments = node.children.map((item) => item.value);
        return keyCommand;
      }
      if (node.type === EAstTreeType.command) {
        let commandResult: TCommandResult = {
          type: EAstTreeType.command,
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
        const subCommands: ICommand[] = [];
        const nodeChildren = node.children.filter((item, index) => {
          if (item.type === EAstTreeType.parameter && subCommands.length === index) {
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
   * @param commandResult
   * @param commands
   * @param nodeChildren
   * @private
   */
  #getCommandResult(
    commandResult: TCommandResult,
    commands: ICommand[],
    nodeChildren: Array<TAstTreeParameter | TAstTreeOption>
  ) {
    if (commands.length > 1) {
      // 处理子命令结构数据
      const [, ...subcommands] = commands;
      const command = subcommands[0];
      commandResult.subCommand = {
        type: EAstTreeType.command,
        cmd: command.cmd,
        arguments: [],
        options: {},
      };
      this.#getCommandResult(commandResult.subCommand, subcommands, nodeChildren);
      return commandResult;
    } else {
      const command: ICommand = commands[0];
      let nowParam: IOption | null = null;
      nodeChildren.forEach((node) => {
        if (node.type === EAstTreeType.optionKey) {
          const param = command.options?.find((param) => param.parameter.includes(node.value));
          if (!param) {
            throw new ScopeError(`iswork.command.${this.constructor.name}`, `没有找到该参数(${node.value})`);
          }
          commandResult.options[param.name] = param.default;
          nowParam = param;
          return;
        }
        if (node.type === EAstTreeType.parameter) {
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
   * @param options
   * @param optionResult
   * @private
   */
  #checkOptions(options: IOption[], optionResult: Record<string, unknown>, command: ICommand) {
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
   * @param paramValue
   * @param checkInfo
   * @private
   */
  #checkParams(paramValue: unknown, checkInfo: IOption | IArgument) {
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
   * @param parameterType  参数类型
   * @param val 参数值
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
