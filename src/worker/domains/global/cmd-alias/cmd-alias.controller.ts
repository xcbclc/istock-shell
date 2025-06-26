import { Controller, Method, Payload, type ModelCreate, type ModelUpdate } from '@istock-shell/iswork';
import { CmdAliasModel } from './cmd-alias.model';
import { CmdAliasService } from './cmd-alias.service';

@Controller({
  alias: 'cmdAlias',
})
export class CmdAliasController {
  constructor(private readonly cmdAliasService: CmdAliasService) {}

  @Method('create')
  async create(@Payload() data: ModelCreate<CmdAliasModel>) {
    return await this.cmdAliasService.create(data);
  }

  @Method('update')
  async add(@Payload() data: ModelUpdate<CmdAliasModel>) {
    return await this.cmdAliasService.update(data);
  }

  @Method('delete')
  async delete(@Payload() id: string) {
    return await this.cmdAliasService.deleteById(id);
  }

  @Method('list')
  async getList() {
    return await this.cmdAliasService.getList();
  }
}
