import { CmdRoute, CmdRouteOptions, Controller, Method } from '@istock/iswork';
import { GpsczmService } from './gpsczm.service';
import { SzdqjypxModel, SzgphycjModel, SzmrgkModel, SzgpsczmModel, SzlbtjModel } from './gpsczm.model';
import cmdJson from './gpsczm.cmd';
import { AKshareReturn } from '@/worker/common';

@Controller({
  alias: 'gpsczm',
  component: { name: 'ShTable' },
})
export class GpsczmController {
  constructor(private readonly gpsczmService: GpsczmService) {}

  @CmdRoute(cmdJson.上证股票市场总貌)
  @Method({
    alias: cmdJson.上证股票市场总貌.cmd,
  })
  @AKshareReturn({
    Model: SzgpsczmModel,
    caption: '上证股票市场总貌',
    unit: '*:流通股本·亿，*:总市值·亿，*:流通市值·亿，*:总股本·亿',
  })
  async getStockSummary() {
    return await this.gpsczmService.getStockSummary();
  }

  @CmdRoute(cmdJson.深证类别统计)
  @Method({
    alias: cmdJson.深证类别统计.cmd,
  })
  @AKshareReturn({
    Model: SzlbtjModel,
    caption: '深证类别统计',
  })
  async getStockSzseSummary(@CmdRouteOptions(cmdJson.深证类别统计.options.日期) date: string) {
    return await this.gpsczmService.getStockSzseSummary(date);
  }

  @CmdRoute(cmdJson.深证地区交易排序)
  @Method({
    alias: cmdJson.深证地区交易排序.cmd,
  })
  @AKshareReturn({
    Model: SzdqjypxModel,
    caption: '深证地区交易排序',
  })
  async getStockSzseAreaSummary(@CmdRouteOptions(cmdJson.深证地区交易排序.options.年月) yearMonth: string) {
    return await this.gpsczmService.getStockSzseAreaSummary(yearMonth);
  }

  @CmdRoute(cmdJson.深证股票行业成交)
  @Method({
    alias: cmdJson.深证股票行业成交.cmd,
  })
  @AKshareReturn({
    Model: SzgphycjModel,
    caption: '深证股票行业成交',
  })
  async getStockSzseSectorSummary(
    @CmdRouteOptions(cmdJson.深证股票行业成交.options.时间段) symbol: string,
    @CmdRouteOptions(cmdJson.深证股票行业成交.options.年月) yearMonth: string
  ) {
    return await this.gpsczmService.getStockSzseSectorSummary({
      symbol,
      date: yearMonth,
    });
  }

  @CmdRoute(cmdJson.上证每日概况)
  @Method({
    alias: cmdJson.上证每日概况.cmd,
  })
  @AKshareReturn({
    Model: SzmrgkModel,
    caption: '上证每日概况',
    unit: '*:市价总值·亿,*:成交量·亿,*:成交金额·亿,*:流通市值·亿',
  })
  async getStockSseDealDaily(@CmdRouteOptions(cmdJson.上证每日概况.options.日期) date: string) {
    return await this.gpsczmService.getStockSseDealDaily(date);
  }
}
