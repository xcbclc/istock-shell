import { Controller, Method, Payload, ApplicationContext } from '@istock-shell/iswork';
import { RecommendType, RecommendService, type RecommendData } from './recommend.service';
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
    @Payload() payload: { input: string; domainName?: string }
  ): Promise<RecommendData> {
    const historys = await this.historyService.query({});
    const cmdRoutes = await this.cmdRouteService.getAllCmdRoute(ctx);
    const domainName = ctx.cmdp.getMeta<string>('domainName');
    payload.domainName = payload.domainName ?? domainName;
    return this.recommendService.autoRecommend(payload, historys, this.cmdRouteService.mergeSubcommands(cmdRoutes));
  }

  @Method('alias')
  async aliasRecommend(@Payload() data: { input: string }): Promise<RecommendData> {
    const alias = (data?.input ?? '').replace(/^:/, '').trim();
    const list = await this.cmdAliasService.findRecommend(alias);
    return {
      list: list.map((item) => {
        return { value: item.cmd, label: item.alias, description: item.description };
      }),
      input: '',
      type: RecommendType.alias,
    };
  }
}
