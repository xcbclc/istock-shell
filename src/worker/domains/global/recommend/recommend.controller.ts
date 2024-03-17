import { Controller, Method, Payload, ApplicationContext } from '@istock/iswork';
import { ERecommendType, RecommendService, type TRecommendData } from './recommend.service';
import { CmdRouteService } from '../cmd-route/cmd-route.service';
import { HistoryService } from '../history/history.service';
import { CmdAliasService } from '../cmd-alias/cmd-alias.service';

@Controller('recommend')
export class RecommendController {
  constructor(
    private readonly recommendService: RecommendService,
    private readonly cmdRouteService: CmdRouteService,
    private readonly historyService: HistoryService,
    private readonly cmdAliasService: CmdAliasService
  ) {}

  @Method('auto')
  async autoRecommend(
    ctx: ApplicationContext,
    @Payload() payload: { input: string; domainNamePaths: string[] }
  ): Promise<TRecommendData> {
    const historys = await this.historyService.query({});
    const cmdRoutes = await this.cmdRouteService.getAllCmdRoute(ctx);
    return this.recommendService.autoRecommend(payload, historys, this.cmdRouteService.mergeSubcommands(cmdRoutes));
  }

  @Method('alias')
  async aliasRecommend(@Payload() data: { input: string }): Promise<TRecommendData> {
    const alias = (data?.input ?? '').replace(/^:/, '').trim();
    const list = await this.cmdAliasService.findRecommend(alias);
    return {
      list: list.map((item) => {
        return { value: item.cmd, label: item.alias, description: item.description };
      }),
      input: '',
      type: ERecommendType.alias,
    };
  }
}
