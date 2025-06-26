import { Injectable, type ModelData, type ControllerMethodCmdRouteMetadata } from '@istock-shell/iswork';
import { TokenType, Tokenizer, type Token } from '@istock-shell/command-parser';
import type { HistoryModel } from '../history/history.model';
import type { ResponseCmdRoute } from '../cmd-route/cmd-route.service';
import type { StockCodeModel } from '../stock-code/stock-code.model';

export enum RecommendType {
  cmd = 'cmd',
  alias = 'alias',
}
export interface RecommendDataItem {
  label: string;
  value: string;
  description: string;
}
export interface RecommendData {
  list: RecommendDataItem[];
  input?: string;
  type: RecommendType;
}

@Injectable()
export class RecommendService {
  readonly #tokenizer = new Tokenizer();
  #stockCodeList: Array<ModelData<StockCodeModel>> = [];

  /**
   * 设置股票代码列表数据
   * @param list
   */
  setStockCodeList(list: Array<ModelData<StockCodeModel>>) {
    this.#stockCodeList = list;
  }

  /**
   * 从token查找子命令
   * @param cmdRoute
   * @param otherTokens
   */
  findSubcommandForToken(
    cmdRoute: ResponseCmdRoute,
    otherTokens: Token[]
  ): Omit<ControllerMethodCmdRouteMetadata, 'subcommand'> | undefined {
    const [firstOtherToken] = otherTokens;
    if (firstOtherToken?.type === TokenType.parameter && cmdRoute.subcommand?.length) {
      // 说明有子命令
      const subcommand = cmdRoute.subcommand.find((command) => command.cmd === firstOtherToken.value);
      return subcommand;
    }
    return undefined;
  }

  /**
   * 推荐选项key的值
   * @param cmdRoute
   * @param lasToken
   * @param otherTokens
   */
  recommendOptionKey(
    cmdRoute: ResponseCmdRoute | undefined,
    lasToken: Token,
    otherTokens: Token[]
  ): RecommendDataItem[] {
    if (!cmdRoute) return [];
    let options = cmdRoute.options ?? [];
    const subcommand = this.findSubcommandForToken(cmdRoute, otherTokens);
    if (subcommand) options = subcommand.options ?? [];
    const usedOptionRecord = otherTokens
      .filter((token) => token.type === TokenType.optionKey)
      .reduce<Record<string, boolean>>((record, token) => {
        record[token.value] = true;
        return record;
      }, {});
    return options
      .map((param) => {
        const value =
          param.parameter.find((parameter) => {
            return parameter.startsWith(lasToken.value);
          }) ?? '';
        return {
          label: value,
          value,
          description: param.description ?? param.name,
        };
      })
      .filter((item) => {
        return item.value !== '' && !usedOptionRecord[item.value];
      });
  }

  /**
   * 推荐选项的值
   * @param cmdRoute
   * @param lasToken
   * @param otherTokens
   * @param lastNearToken
   */
  recommendOptionValue(
    cmdRoute: ResponseCmdRoute | undefined,
    lasToken: Token,
    otherTokens: Token[],
    lastNearToken: Token
  ): RecommendDataItem[] {
    if (!cmdRoute) return [];
    let options = cmdRoute.options ?? [];
    const subcommand = this.findSubcommandForToken(cmdRoute, otherTokens);
    if (subcommand) options = subcommand.options ?? [];
    // 选项参数
    const option = options.find((opt) => opt.parameter.find((parameter) => parameter === lastNearToken.value));
    if (option?.name && option.name === '股票代码') {
      return this.#stockCodeList
        .filter((stock) => stock.code.startsWith(lasToken.value))
        .map((stock) => {
          return {
            label: stock.code,
            value: stock.code,
            description: stock.name,
          };
        });
    }
    if (option?.name && option.name === '股票名称') {
      return this.#stockCodeList
        .filter((stock) => stock.name.startsWith(lasToken.value))
        .map((stock) => {
          return {
            label: stock.name,
            value: stock.name,
            description: stock.code,
          };
        });
    }
    return (option?.choices ?? [])
      .filter((choice) => {
        // 简单字符串化
        return `${choice}`.startsWith(lasToken.value);
      })
      .map((choice) => {
        return {
          label: `${choice}`,
          value: `${choice}`,
          description: '',
        };
      });
  }

  /**
   * 推荐参数值
   * @param cmdRoute
   * @param lasToken
   * @param otherTokens
   */
  recommendArgument(
    cmdRoute: ResponseCmdRoute | undefined,
    lasToken: Token,
    otherTokens: Token[]
  ): RecommendDataItem[] {
    if (!cmdRoute) return [];
    let args = cmdRoute.arguments ?? [];
    const subcommand = this.findSubcommandForToken(cmdRoute, otherTokens);
    if (subcommand) args = subcommand.arguments ?? [];
    const usedArgumentRecord = otherTokens
      .filter((token) => token.type === TokenType.parameter)
      .reduce<Record<string, boolean>>((record, token) => {
        record[token.value] = true;
        return record;
      }, {});
    // 普通参数
    return args
      .map((param) => {
        const value =
          (param.choices ?? []).find((choice) => {
            return `${choice}`.startsWith(lasToken.value);
          }) ?? '';
        return {
          label: `${value}`,
          value: `${value}`,
          description: param.description ?? param.name,
        };
      })
      .filter((item) => {
        return item.value !== '' && !usedArgumentRecord[item.value];
      });
  }

  /**
   * 推荐子命令
   * @param cmdRoute
   * @param lasToken
   * @param otherTokens
   */
  recommendSubcommand(
    cmdRoute: ResponseCmdRoute | undefined,
    lasToken: Token,
    otherTokens: Token[]
  ): RecommendDataItem[] {
    if (!cmdRoute) return [];
    if (!cmdRoute.subcommand) return [];
    const usedCommandRecord = otherTokens
      .filter((token) => token.type === TokenType.parameter)
      .reduce<Record<string, boolean>>((record, token) => {
        record[token.value] = true;
        return record;
      }, {});
    return cmdRoute.subcommand
      .filter((command) => command.cmd.startsWith(lasToken.value) && !usedCommandRecord[command.cmd])
      .map((command) => {
        return {
          label: command.cmd,
          value: command.cmd,
          description: command.description ?? command.name,
        };
      });
  }

  autoRecommend(
    payload: { input: string; domainNamePaths: string[] },
    historys: Array<ModelData<HistoryModel>>,
    cmdRoutes: ResponseCmdRoute[]
  ): RecommendData {
    const originalInput = payload.input.trim();
    // 解析成tokens，然后找到最后一个命令
    const allTokens = this.#tokenizer.parse(originalInput, false);
    const cmdTokenIndex = allTokens.findLastIndex((token) => token.type === TokenType.command);
    const tokens = allTokens.slice(cmdTokenIndex);
    const [cmd, ...other] = tokens;
    let list: RecommendDataItem[] = [];
    const reallyOtherTokens = other.filter(
      (token) => ![TokenType.space, TokenType.lineR, TokenType.lineN].includes(token.type)
    );
    if (other && other.length > 0) {
      const cmdRoute = cmdRoutes.find((cmdRoute) => cmd.value === cmdRoute.cmd);
      const [lasToken, lastNearToken] = [cmd, ...reallyOtherTokens].reverse();
      if (lasToken.type === TokenType.optionKey) {
        // 推荐选项键
        list = this.recommendOptionKey(cmdRoute, lasToken, reallyOtherTokens);
      }
      if (lasToken.type === TokenType.parameter) {
        if (lastNearToken?.type === TokenType.optionKey) {
          // 推荐选项值
          list = this.recommendOptionValue(cmdRoute, lasToken, reallyOtherTokens, lastNearToken);
        } else if (lastNearToken?.type === TokenType.command && cmdRoute && cmdRoute.subcommand) {
          // 子命令
          list = this.recommendSubcommand(cmdRoute, lasToken, reallyOtherTokens);
        } else {
          // 推荐参数
          list = this.recommendArgument(cmdRoute, lasToken, reallyOtherTokens);
        }
      }
    } else {
      // 在路由列表里面匹配命令，不包含子命令
      list = cmdRoutes
        .filter((cmdRoute) => cmdRoute.cmd.startsWith(cmd.value))
        .map((cmdRoute) => {
          return {
            label: cmdRoute.cmd,
            value: cmdRoute.cmd,
            description: cmdRoute.description ?? cmdRoute.name,
          };
        });
    }
    // 倒查历史命令获得历史推荐命令
    const input = historys
      .reverse()
      .map((history) => history.input)
      .find((input) => input.startsWith(originalInput));
    return {
      list,
      input,
      type: RecommendType.cmd,
    };
  }
}
