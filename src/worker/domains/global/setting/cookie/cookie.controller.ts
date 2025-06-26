import { Controller, Method, Payload, type ModelData, type ModelUpdate } from '@istock-shell/iswork';
import { type CookieModel } from './cookie.model';
import { CookieService } from './cookie.service';

@Controller({
  alias: 'cookie',
})
export class CookieController {
  constructor(private readonly cookieService: CookieService) {}

  // 命令控制器方法
  @Method('create')
  async create(@Payload() data: Omit<ModelData<CookieModel>, 'id'>) {
    return await this.cookieService.create(data);
  }

  @Method('update')
  async update(@Payload() data: ModelUpdate<CookieModel>) {
    return await this.cookieService.update(data);
  }

  @Method('delete')
  async delete(@Payload() id: string) {
    return await this.cookieService.deleteById(id);
  }

  @Method('list')
  async getList(@Payload() query: { origin?: string }) {
    return await this.cookieService.getList(query?.origin);
  }
}
