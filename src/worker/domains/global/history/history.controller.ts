import {
  ApplicationContext,
  Controller,
  Method,
  Payload,
  type TModelCreate,
  type IQueryParamsOptions,
  CmdRoute,
  Component,
  CmdRouteOptions,
} from '@istock/iswork';
import { HistoryService } from './history.service';
import type { HistoryModel } from './history.model';
import cmdJson from './history.cmd.json';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  @Method('add')
  async add(ctx: ApplicationContext, @Payload() data: TModelCreate<HistoryModel>) {
    const { port } = ctx.cmdp.getInfo();
    if (!port) throw new Error('创建命令历史记录失败，port没有值');
    data.port = String(port);
    return await this.historyService.create(data);
  }

  @Method('list')
  async list(ctx: ApplicationContext, @Payload() query: IQueryParamsOptions) {
    const { port } = ctx.cmdp.getInfo();
    query.filter = [
      ['port', 'eq', String(port)],
      ['rowStatus', 'eq', 1],
    ];
    return await this.historyService.find(query);
  }

  @CmdRoute(cmdJson.历史删除)
  @Method('batchDeleteCmd')
  @Component('OutputEvent')
  async batchDeleteCmd(
    ctx: ApplicationContext,
    @CmdRouteOptions(cmdJson.历史删除.options.数量) limit: number,
    @CmdRouteOptions(cmdJson.历史删除.options.模式) mode: number = 1
  ) {
    const cmdInfo = ctx.cmdp.getInfo();
    const success = await this.historyService.batchDeleteCmd(mode, limit ? { limit } : {});
    return { data: success, eventAddress: cmdInfo.address.replace('cmdp:', 'event:') };
  }
}
