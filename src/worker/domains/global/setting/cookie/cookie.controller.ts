import { Controller, Method, Payload, type TModelData, type TModelUpdate } from '@istock/iswork';
import { type CookieModel } from './cookie.model';
import { CookieService } from './cookie.service';

@Controller({
  alias: 'cookie',
})
export class CookieController {
  constructor(private readonly cookieService: CookieService) {}

  // 命令控制器方法
  @Method('create')
  async create(@Payload() data: Omit<TModelData<CookieModel>, 'id'>) {
    return await this.cookieService.create(data);
  }

  @Method('update')
  async update(@Payload() data: TModelUpdate<CookieModel>) {
    return await this.cookieService.update(data);
  }

  @Method('delete')
  async delete(@Payload() id: string) {
    return await this.cookieService.deleteById(id);
  }

  @Method('list')
  async getList(@Payload() query: { host?: string }) {
    return await this.cookieService.getList(query?.host);
  }
}
