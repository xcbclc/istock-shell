import { CmdRoute, CmdRouteOptions, Controller, Method, Payload } from '@istock/iswork';
import { AKshareReturn, type TCmdRequest, type EAdjust, withStockCodePrefix } from '@/worker/common';
import {
  LshqsjModel,
  LshqxlModel,
  LshqtxModel,
  FssjxlModel,
  FssjdcModel,
  RnfssjdcModel,
  PqsjlModel,
} from './lshqsj.model';
import { LshqsjService, type TStockZhAQuery, type TStockZhAMinuteQuery } from './lshqsj.service';
import cmdJson, { type EPeriod, periodRecord, adjustRecord, type EMinutePeriod } from './lshqsj.cmd';

type TCmdRequestOpt = {
  股票代码: string;
  开始日期?: string;
  结束日期?: string;
  复权?: EAdjust | '前复权' | '后复权';
  时间周期?: EPeriod | '日' | '周' | '月';
};

type TCmdRequestMinuteOpt = {
  股票代码: string;
  开始日期?: string;
  结束日期?: string;
  复权?: EAdjust | '前复权' | '后复权';
  日频?: EMinutePeriod;
};

@Controller({
  alias: 'lshqsj',
  component: { name: 'ShTable' },
})
export class LshqsjController {
  constructor(private readonly lshqsjService: LshqsjService) {}

  @CmdRoute(cmdJson.历史行情数据)
  @Method({
    alias: cmdJson.历史行情数据.cmd,
  })
  @AKshareReturn({
    Model: LshqsjModel,
    caption: '历史行情数据-东财',
    pipe: '日期:*·格式化·AK日期',
  })
  async stockZhASpot(@Payload() payload: TCmdRequest<TCmdRequestOpt>) {
    const { 股票代码, 结束日期, 开始日期, 时间周期, 复权 } = payload.options;
    const query: TStockZhAQuery = { symbol: 股票代码 };
    if (开始日期) query.start_date = 开始日期;
    if (结束日期) query.end_date = 结束日期;
    if (时间周期) query.period = periodRecord[时间周期] ?? 时间周期;
    if (复权) query.adjust = adjustRecord[复权] ?? 复权;
    return await this.lshqsjService.stockZhAHist(query);
  }

  @CmdRoute(cmdJson.历史行情新浪)
  @Method({
    alias: cmdJson.历史行情新浪.cmd,
  })
  @AKshareReturn({
    Model: LshqxlModel,
    caption: '历史行情数据-新浪',
  })
  async stockZhADaily(@Payload() payload: TCmdRequest<TCmdRequestOpt>) {
    const { 股票代码, 结束日期, 开始日期, 复权 } = payload.options;
    const query: TStockZhAQuery = { symbol: withStockCodePrefix(股票代码) };
    if (开始日期) query.start_date = 开始日期;
    if (结束日期) query.end_date = 结束日期;
    if (复权) query.adjust = adjustRecord[复权] ?? 复权;
    return await this.lshqsjService.stockZhADaily(query);
  }

  @CmdRoute(cmdJson.历史行情腾讯)
  @Method({
    alias: cmdJson.历史行情腾讯.cmd,
  })
  @AKshareReturn({
    Model: LshqtxModel,
    caption: '历史行情数据-腾讯',
  })
  async stockZhAHistTx(@Payload() payload: TCmdRequest<TCmdRequestOpt>) {
    const { 股票代码, 结束日期, 开始日期, 复权 } = payload.options;
    const query: TStockZhAQuery = { symbol: withStockCodePrefix(股票代码) };
    if (开始日期) query.start_date = 开始日期;
    if (结束日期) query.end_date = 结束日期;
    if (复权) query.adjust = adjustRecord[复权] ?? 复权;
    return await this.lshqsjService.stockZhAHistTx(query);
  }

  @CmdRoute(cmdJson.分时数据新浪)
  @Method({
    alias: cmdJson.分时数据新浪.cmd,
  })
  @AKshareReturn({
    Model: FssjxlModel,
    caption: '分时数据-新浪',
  })
  async stockZhAMinute(@Payload() payload: TCmdRequest<TCmdRequestMinuteOpt>) {
    const { 股票代码, 日频, 复权 } = payload.options;
    const query: TStockZhAMinuteQuery = { symbol: withStockCodePrefix(股票代码) };
    if (日频) query.period = 日频;
    if (复权) query.adjust = adjustRecord[复权] ?? 复权;
    return await this.lshqsjService.stockZhAMinute(query);
  }

  @CmdRoute(cmdJson.分时数据东财)
  @Method({
    alias: cmdJson.分时数据东财.cmd,
  })
  @AKshareReturn({
    Model: FssjdcModel,
    caption: '分时数据-东财',
  })
  async stockZhAHistMinEm(@Payload() payload: TCmdRequest<TCmdRequestMinuteOpt>) {
    const { 股票代码, 日频, 开始日期, 结束日期, 复权 } = payload.options;
    const query: TStockZhAMinuteQuery = { symbol: 股票代码 };
    if (日频) query.period = 日频;
    if (开始日期) query.start_date = 开始日期;
    if (结束日期) query.end_date = 结束日期;
    if (复权) query.adjust = adjustRecord[复权] ?? 复权;
    return await this.lshqsjService.stockZhAHistMinEm(query);
  }

  @CmdRoute(cmdJson.日内分时数据东财)
  @Method({
    alias: cmdJson.日内分时数据东财.cmd,
  })
  @AKshareReturn({
    Model: RnfssjdcModel,
    caption: '日内分时数据-东财',
  })
  async stockIntradayEm(@CmdRouteOptions(cmdJson.日内分时数据东财.options.股票代码) symbol: string) {
    return await this.lshqsjService.stockIntradayEm(symbol);
  }

  @CmdRoute(cmdJson.盘前数据)
  @Method({
    alias: cmdJson.盘前数据.cmd,
  })
  @AKshareReturn({
    Model: PqsjlModel,
    caption: '盘前数据',
  })
  async stockZhAHistPreMinEm(@CmdRouteOptions(cmdJson.盘前数据.options.股票代码) symbol: string) {
    return await this.lshqsjService.stockZhAHistPreMinEm(symbol);
  }
}
