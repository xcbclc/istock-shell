import { Domain } from '@istock-shell/iswork';
import { CjController } from './cj/cj.controller';
import { CjService } from './cj/cj.service';
import { ScopeError } from '@istock-shell/util';

@Domain({
  name: 'wzdh',
  viewName: '网站导航',
  providers: [CjService],
  controllers: [CjController],
})
export class WzdhDomain {
  constructor(private readonly cjService: CjService) {
    this.cjService.initSiteList().catch((e) => {
      throw new ScopeError(`global.${this.constructor.name}`, `初始化财经站点列表数据失败：${e.message}`);
    });
  }
}
