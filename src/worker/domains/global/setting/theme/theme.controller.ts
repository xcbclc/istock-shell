import { Controller, Method, Payload, type TModelData, type TModelUpdate } from '@istock/iswork';
import { type ThemeModel } from './theme.model';
import { ThemeService } from './theme.service';

@Controller({
  alias: 'theme',
})
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  // 命令控制器方法
  @Method('createOrUpdate')
  async createOrUpdate(@Payload() data: Omit<TModelData<ThemeModel>, 'id'> | TModelUpdate<ThemeModel>) {
    return await this.themeService.createOrUpdate(data);
  }

  @Method('delete')
  async delete(@Payload() id: string) {
    return await this.themeService.deleteById(id);
  }

  @Method('list')
  async getList() {
    return await this.themeService.getList();
  }
}
