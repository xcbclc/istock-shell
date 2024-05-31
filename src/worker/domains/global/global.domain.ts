import { ScopeError } from '@istock/util';
import { Global, Domain } from '@istock/iswork';
import { CmdRouteService } from './cmd-route/cmd-route.service';
import { CmdRouteController } from './cmd-route/cmd-route.controller';
import { DomainService } from './domain/domain.service';
import { DomainController } from './domain/domain.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { HistoryService } from './history/history.service';
import { HistoryController } from './history/history.controller';
import { RecommendService } from './recommend/recommend.service';
import { RecommendController } from './recommend/recommend.controller';
import { ChartService } from './chart/chart.service';
import { ChartController } from './chart/chart.controller';
import { StockCodeService } from './stock-code/stock-code.service';
import { StockCodeController } from './stock-code/stock-code.controller';
import { CmdAliasService } from './cmd-alias/cmd-alias.service';
import { CmdAliasController } from './cmd-alias/cmd-alias.controller';
import { AiService } from './ai/ai.service';
import { AiController } from './ai/ai.controller';

@Global()
@Domain({
  name: 'global',
  viewName: '全局',
  providers: [
    CmdRouteService,
    DomainService,
    UserService,
    HistoryService,
    RecommendService,
    ChartService,
    StockCodeService,
    CmdAliasService,
    AiService,
  ],
  controllers: [
    CmdRouteController,
    DomainController,
    UserController,
    HistoryController,
    RecommendController,
    ChartController,
    StockCodeController,
    CmdAliasController,
    AiController,
  ],
})
export class GlobalDomain {
  constructor(
    private readonly recommendService: RecommendService,
    private readonly stockCodeService: StockCodeService
  ) {
    this.syncStockToRecommend().catch((e) => {
      throw new ScopeError(`global.${this.constructor.name}`, `股票代码同步到推荐服务失败：${e.message}`);
    });
  }

  /**
   * 同步股票代码、股票名称到推荐服务
   */
  async syncStockToRecommend() {
    const stockCodeList = await this.stockCodeService.getStockCodeList();
    this.recommendService.setStockCodeList(stockCodeList);
  }

  /**
   * 获取股票代码列表
   */
  async getStockCodeList() {
    return await this.stockCodeService.getStockCodeList();
  }
}
