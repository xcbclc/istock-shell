import { Injectable, type TModelData, type TControllerMethodCmdRouteMetadata } from '@istock/iswork';
import { ETokenType, Tokenizer, type TToken } from '@istock/command-parser';
import type { HistoryModel } from '../history/history.model';
import type { TResponseCmdRoute } from '../cmd-route/cmd-route.service';
import type { StockCodeModel } from '../stock-code/stock-code.model';

export enum ERecommendType {
  cmd = 'cmd',
  alias = 'alias',
}
export type TRecommendDataItem = {
  label: string;
  value: string;
  description: string;
};
export type TRecommendData = {
  list: TRecommendDataItem[];
  input?: string;
  type: ERecommendType;
};

@Injectable()
export class RecommendService {
  readonly #tokenizer = new Tokenizer();
  #stockCodeList: Array<TModelData<StockCodeModel>> = [];

  /**
   * 设置股票代码列表数据
   * @param list
   */
  setStockCodeList(list: Array<TModelData<StockCodeModel>>) {
    this.#stockCodeList = list;
  }

  /**
   * 从token查找子命令
   * @param cmdRoute
   * @param otherTokens
   */
  findSubcommandForToken(
    cmdRoute: TResponseCmdRoute,
    otherTokens: TToken[]
  ): Omit<TControllerMethodCmdRouteMetadata, 'subcommand'> | undefined {
    const [firstOtherToken] = otherTokens;
    if (firstOtherToken?.type === ETokenType.parameter && cmdRoute.subcommand?.length) {
      // 说明有子命令
      const subcommand = cmdRoute.subcommand.find((command) => command.cmd === firstOtherToken.value);
      return subcommand;
    }
    return undefined;
  }

  /**
   * 推荐选项key的值
   * @param cmdRoute
   * @param lastToken
   * @param otherTokens
   */
  recommendOptionKey(
    cmdRoute: TResponseCmdRoute | undefined,
    lastToken: TToken,
    otherTokens: TToken[]
  ): TRecommendDataItem[] {
    if (!cmdRoute) return [];
    let options = cmdRoute.options ?? [];
    const subcommand = this.findSubcommandForToken(cmdRoute, otherTokens);
    if (subcommand) options = subcommand.options ?? [];
    const usedOptionRecord = otherTokens
      .filter((token) => token.type === ETokenType.optionKey)
      .reduce<Record<string, boolean>>((record, token) => {
        record[token.value] = true;
        return record;
      }, {});
    return options
      .map((param) => {
        const value =
          param.parameter.find((parameter) => {
            return parameter.startsWith(lastToken.value);
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
   * @param lastToken
   * @param otherTokens
   * @param lastNearToken
   */
  recommendOptionValue(
    cmdRoute: TResponseCmdRoute | undefined,
    lastToken: TToken,
    otherTokens: TToken[],
    lastNearToken: TToken
  ): TRecommendDataItem[] {
    if (!cmdRoute) return [];
    let options = cmdRoute.options ?? [];
    const subcommand = this.findSubcommandForToken(cmdRoute, otherTokens);
    if (subcommand) options = subcommand.options ?? [];
    // 选项参数
    const option = options.find((opt) => opt.parameter.find((parameter) => parameter === lastNearToken.value));
    if (option?.name && option.name === '股票代码') {
      return this.#stockCodeList
        .filter((stock) => stock.code.startsWith(lastToken.value))
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
        .filter((stock) => stock.name.startsWith(lastToken.value))
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
        return `${choice}`.startsWith(lastToken.value);
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
   * @param lastToken
   * @param otherTokens
   */
  recommendArgument(
    cmdRoute: TResponseCmdRoute | undefined,
    lastToken: TToken,
    otherTokens: TToken[]
  ): TRecommendDataItem[] {
    if (!cmdRoute) return [];
    let args = cmdRoute.arguments ?? [];
    const subcommand = this.findSubcommandForToken(cmdRoute, otherTokens);
    if (subcommand) args = subcommand.arguments ?? [];
    const usedArgumentRecord = otherTokens
      .filter((token) => token.type === ETokenType.parameter)
      .reduce<Record<string, boolean>>((record, token) => {
        record[token.value] = true;
        return record;
      }, {});
    // 普通参数
    return args
      .map((param) => {
        const value =
          (param.choices ?? []).find((choice) => {
            return `${choice}`.startsWith(lastToken.value);
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
   * @param lastToken
   * @param otherTokens
   */
  recommendSubcommand(
    cmdRoute: TResponseCmdRoute | undefined,
    lastToken: TToken,
    otherTokens: TToken[]
  ): TRecommendDataItem[] {
    if (!cmdRoute) return [];
    if (!cmdRoute.subcommand) return [];
    const usedCommandRecord = otherTokens
      .filter((token) => token.type === ETokenType.parameter)
      .reduce<Record<string, boolean>>((record, token) => {
        record[token.value] = true;
        return record;
      }, {});
    return cmdRoute.subcommand
      .filter((command) => command.cmd.startsWith(lastToken.value) && !usedCommandRecord[command.cmd])
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
    historys: Array<TModelData<HistoryModel>>,
    cmdRoutes: TResponseCmdRoute[]
  ): TRecommendData {
    const originalInput = payload.input.trim();
    // 解析成tokens，然后找到最后一个命令
    const allTokens = this.#tokenizer.parse(originalInput, false);
    const cmdTokenIndex = allTokens.findLastIndex((token) => token.type === ETokenType.command);
    const tokens = allTokens.slice(cmdTokenIndex);
    const [cmd, ...other] = tokens;
    let list: TRecommendDataItem[] = [];
    const reallyOtherTokens = other.filter(
      (token) => ![ETokenType.space, ETokenType.lineR, ETokenType.lineN].includes(token.type)
    );
    if (other && other.length > 0) {
      const cmdRoute = cmdRoutes.find((cmdRoute) => cmd.value === cmdRoute.cmd);
      const [lastToken, lastNearToken] = [cmd, ...reallyOtherTokens].reverse();
      if (lastToken.type === ETokenType.optionKey) {
        // 推荐选项键
        list = this.recommendOptionKey(cmdRoute, lastToken, reallyOtherTokens);
      }
      if (lastToken.type === ETokenType.parameter) {
        if (lastNearToken?.type === ETokenType.optionKey) {
          // 推荐选项值
          list = this.recommendOptionValue(cmdRoute, lastToken, reallyOtherTokens, lastNearToken);
        } else if (lastNearToken?.type === ETokenType.command && cmdRoute && cmdRoute.subcommand) {
          // 子命令
          list = this.recommendSubcommand(cmdRoute, lastToken, reallyOtherTokens);
        } else {
          // 推荐参数
          list = this.recommendArgument(cmdRoute, lastToken, reallyOtherTokens);
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
      type: ERecommendType.cmd,
    };
  }
}
