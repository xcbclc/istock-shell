import { Controller, Method, Payload, type ModelCreate, type ModelUpdate } from '@istock-shell/iswork';
import { type ShortcutModel } from './shortcut.model';
import { ShortcutService } from './shortcut.service';

@Controller({
  alias: 'shortcut',
})
export class ShortcutController {
  constructor(private readonly shortcutService: ShortcutService) {}

  // 命令控制器方法
  @Method('createOrUpdate')
  async createOrUpdate(@Payload() data: ModelCreate<ShortcutModel> | ModelUpdate<ShortcutModel>) {
    return await this.shortcutService.createOrUpdate(data);
  }

  @Method('createMany')
  async createMany(@Payload() list: Array<ModelCreate<ShortcutModel>>) {
    return await this.shortcutService.createMany(list);
  }

  @Method('updateMany')
  async updateMany(@Payload() list: Array<ModelUpdate<ShortcutModel>>) {
    return await this.shortcutService.updateMany(list);
  }

  @Method('delete')
  async delete(@Payload() id: string) {
    return await this.shortcutService.deleteById(id);
  }

  @Method('list')
  async getList() {
    return await this.shortcutService.getList();
  }

  @Method('getActiveShortcut')
  async getActiveShortcut(@Payload() key: string) {
    if (!key) return undefined;
    return await this.shortcutService.getActiveShortcut(key);
  }
}
