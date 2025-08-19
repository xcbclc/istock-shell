import {
  Controller,
  Method,
  Payload,
  CmdRoute,
  CmdRouteOptions,
  CmdRouteArguments,
  ApplicationContext,
  type ModelCreate,
  Component,
  type CmdpMeta,
} from '@istock-shell/iswork';
import { isString, isRegExp } from '@istock-shell/util';
import { DomainService } from './domain.service';

import type { DomainModel } from './domain.model';
import cmdJson from './domain.cmd.json';

@Controller({
  alias: 'domain',
  viewName: '应用域',
})
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Method('create')
  async create(@Payload() payload: ModelCreate<DomainModel>) {
    return await this.domainService.create(payload);
  }

  @CmdRoute(cmdJson.应用查找)
  @Method('list')
  @Component('ShList')
  async getList(
    ctx: ApplicationContext,
    @CmdRouteOptions(cmdJson.应用查找.options.过滤) filter?: string | RegExp,
    @CmdRouteOptions(cmdJson.应用查找.options.数量) limit?: number
  ) {
    const result = await this.domainService.find(ctx);
    const list = result
      .map((item) => {
        return {
          text: `${item.viewName}(${item.name})`,
        };
      })
      .filter((item) => {
        if (isString(filter)) {
          return item.text.indexOf(filter) !== 1;
        }
        if (isRegExp(filter)) {
          return filter.test(item.text);
        }
        return item;
      });
    return {
      list: limit ? list.slice(0, limit) : list,
    };
  }

  @CmdRoute(cmdJson.应用进入)
  @Method('changePromptDomain')
  @Component('CmdOutputEvent')
  async changePromptDomain(ctx: ApplicationContext, @CmdRouteArguments(0) path: string = '.') {
    const cmdInfo = ctx.cmdp.getInfo();
    const meta = ctx.cmdp.getMeta<CmdpMeta & { domainName: string }>();
    const currentDomainPaths = meta.domainName ? meta.domainName.split('.') : [];
    currentDomainPaths.unshift('root'); // 加入根目录
    const domains = await this.domainService.findDomainPaths(
      ctx,
      currentDomainPaths,
      path.replace(/\/$/, '').split('/')
    );
    return { data: domains, eventAddress: cmdInfo.address.replace('cmdp:', 'event:') };
  }
}
