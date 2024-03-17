import { Controller, Method, Payload } from '@istock/iswork';

import { CmdAliasService, type TCmdAliasData } from './cmd-alias.service';
import { HistoryService } from '../history/history.service';

@Controller({
  alias: 'cmdAlias',
})
export class CmdAliasController {
  constructor(
    private readonly cmdAliasService: CmdAliasService,
    private readonly historyService: HistoryService
  ) {}

  @Method('add')
  async add(@Payload() data: TCmdAliasData) {
    const { historyId, ...aliasData } = data;
    const history = await this.historyService.findOne(historyId);
    if (history) {
      aliasData.domainName = history.domainName;
      return await this.cmdAliasService.createData(data);
    }
    return null;
  }
}
