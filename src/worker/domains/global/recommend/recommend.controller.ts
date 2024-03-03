import { Controller, Method, Payload, ApplicationContext } from '@istock/iswork';
import { RecommendService } from './recommend.service';
import { CmdRouteService } from '../cmd-route/cmd-route.service';
import { HistoryService } from '../history/history.service';

@Controller('recommend')
export class RecommendController {
  constructor(
    private readonly recommendService: RecommendService,
    private readonly cmdRouteService: CmdRouteService,
    private readonly historyService: HistoryService
  ) {}

  @Method('auto')
  async autoRecommend(ctx: ApplicationContext, @Payload() payload: { input: string; domainNamePaths: string[] }) {
    const historys = await this.historyService.query({});
    const cmdRoutes = await this.cmdRouteService.getAllCmdRoute(ctx);
    return this.recommendService.autoRecommend(payload, historys, this.cmdRouteService.mergeSubcommands(cmdRoutes));
  }
}
