import {
  Controller,
  Method,
  Payload,
  type ModelData,
  type ModelUpdate,
  type QueryFilterArr,
} from '@istock-shell/iswork';
import { type ProxyModel } from './proxy.model';
import { ProxyService } from './proxy.service';

@Controller({
  alias: 'proxy',
})
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  // 命令控制器方法
  @Method('create')
  async create(@Payload() data: Omit<ModelData<ProxyModel>, 'id'>) {
    return await this.proxyService.create(data);
  }

  @Method('update')
  async update(@Payload() data: ModelUpdate<ProxyModel>) {
    return await this.proxyService.update(data);
  }

  @Method('delete')
  async delete(@Payload() id: string) {
    return await this.proxyService.deleteById(id);
  }

  @Method('list')
  async getList(@Payload() filter: QueryFilterArr[] = []) {
    return await this.proxyService.getList(filter);
  }
}
