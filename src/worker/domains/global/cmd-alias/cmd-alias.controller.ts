import { Controller, Method, Payload, type ModelCreate } from '@istock-shell/iswork';
import { CmdAliasModel } from './cmd-alias.model';
import { CmdAliasService } from './cmd-alias.service';

@Controller({
  alias: 'cmdAlias',
})
export class CmdAliasController {
  constructor(private readonly cmdAliasService: CmdAliasService) {}

  @Method('add')
  async add(@Payload() data: ModelCreate<CmdAliasModel>) {
    return await this.cmdAliasService.createData(data);
  }
}
