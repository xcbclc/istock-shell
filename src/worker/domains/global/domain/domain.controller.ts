import {
  Controller,
  Method,
  Payload,
  CmdRoute,
  CmdRouteOptions,
  CmdRouteArguments,
  ApplicationContext,
  type TModelCreate,
  Component,
  type TCmdpMeta,
} from '@istock/iswork';
import { isString, isRegExp } from '@istock/util';
import { DomainService } from './domain.service';

import type { DomainModel } from './domain.model';
import cmdJson from './domain.cmd.json';

@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Method('create')
  async create(@Payload() payload: TModelCreate<DomainModel>) {
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
          title: `${item.viewName}(${item.name})`,
          link: '',
        };
      })
      .filter((item) => {
        if (isString(filter)) {
          return item.title.indexOf(filter) !== 1;
        }
        if (isRegExp(filter)) {
          return filter.test(item.title);
        }
        return item;
      });
    return {
      display: 'inline',
      list: limit ? list.slice(0, limit) : list,
    };
  }

  @CmdRoute(cmdJson.应用进入)
  @Method('changePromptDomain')
  @Component('OutputEvent')
  async changePromptDomain(ctx: ApplicationContext, @CmdRouteArguments(0) path: string = '.') {
    const cmdInfo = ctx.cmdp.getInfo();
    const meta = ctx.cmdp.getMeta<TCmdpMeta & { domainName: string }>();
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
