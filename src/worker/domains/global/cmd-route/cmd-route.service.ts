import { isArray, isNil, isObject, isString, ScopeError } from '@istock/util';
import {
  Injectable,
  CONTROLLER_METADATA,
  CONTROLLER_METHOD_CMDROUTE_METADATA,
  CONTROLLER_METHOD_METADATA,
  CONTROLLER_METHOD_PARAM_CMDROUTEOPTIONS_METADATA,
  type TOrmQuery,
  type TModelCreate,
  type TModelUpdate,
  type TControllerMetadata,
  type TControllerMethodMetadata,
  type TControllerMethodCmdRouteMetadata,
  type TModelCreateNoId,
  type TControllerMethodCmdRouteOptions,
  type TControllerMethodCmdRouteOptionsMetadata,
  type ApplicationContext,
  type TModelData,
} from '@istock/iswork';
import { CmdRouteModel } from './cmd-route.model';

export type TResponseSubCmdRoute = Array<
  Omit<TControllerMethodCmdRouteMetadata, 'subcommand'> & {
    route: string[];
    domainName: string;
    subcommand?: TResponseSubCmdRoute;
  }
>;
export type TResponseCmdRoute = Omit<TModelData<CmdRouteModel>, 'subcommand'> & {
  subcommand?: TResponseSubCmdRoute;
};

@Injectable()
export class CmdRouteService {
  newCmdRoute(id: number | string, data: TModelCreateNoId<CmdRouteModel>) {
    const cmdRoute = CmdRouteModel.createModel(
      Object.assign(data, { id, updateDate: new Date(), createDate: new Date() })
    );
    return cmdRoute;
  }

  /**
   * 合并子命令
   * @param list
   */
  mergeSubcommands(list: Array<TModelData<CmdRouteModel>>): TResponseCmdRoute[] {
    const record: Record<string, TResponseCmdRoute> = {};
    list.forEach((item) => {
      if (!record[item.cmd]) {
        record[item.cmd] = {
          ...item,
          subcommand: item.subcommand
            ? [{ ...item.subcommand, domainName: item.domainName, route: item.route, subcommand: [] }]
            : [],
        };
        return;
      }
      if (record[item.cmd] && item.subcommand) {
        if (!record[item.cmd].subcommand) record[item.cmd].subcommand = [];
        record[item.cmd].subcommand?.push({
          ...item.subcommand,
          domainName: item.domainName,
          route: item.route,
          subcommand: [],
        });
      }
    });
    return Object.values(record);
  }

  /**
   * 获取所有命令路由信息
   * @param ctx
   */
  async getAllCmdRoute(ctx: ApplicationContext) {
    const cmdRouteList = (await CmdRouteModel.query({})) ?? [];
    if (cmdRouteList.length > 0) return cmdRouteList;
    const domains = ctx.app.allDomain;
    // 从domain开始遍历、遍历controller上方法的CmdRouteMeta，然后保存在内存中
    for (const domain of domains) {
      const domainName = domain.name;
      const domainViewName = domain.domainMetadata.viewName;
      if (!domainName || !domainViewName) continue;
      for (const controller of domain.controllers) {
        const metaInfo = domain.controllerMetadataCache.get(controller);
        if (!metaInfo) continue;
        const metadata = metaInfo.class.get(CONTROLLER_METADATA) as TControllerMetadata;
        if (!metadata) continue;
        let controllerAlias: string;
        if (isArray(metadata.alias)) {
          controllerAlias = metadata.alias[0];
        } else {
          controllerAlias = metadata.alias as string;
        }
        if (!controllerAlias) controllerAlias = controller.name;
        const methodEntries = metaInfo.method.entries();
        for (const [propertyKey, metaMapValue] of methodEntries) {
          const { info } = metaMapValue;
          const methodMetadata = (info[CONTROLLER_METHOD_METADATA] as TControllerMethodMetadata) ?? {};
          let methodAlias: string | undefined;
          if (isArray(methodMetadata.alias)) {
            methodAlias = methodMetadata.alias[0];
          }
          if (isString(methodMetadata.alias)) {
            methodAlias = methodMetadata.alias;
          }
          if (isNil(methodMetadata.alias) && isString(propertyKey)) {
            methodAlias = propertyKey;
          }
          if (!methodAlias) {
            throw new ScopeError(`global.${this.constructor.name}`, '未找到方法别名');
          }
          const cmdRouteMetadata = info[CONTROLLER_METHOD_CMDROUTE_METADATA] as
            | TControllerMethodCmdRouteMetadata
            | undefined;
          // 单独定义的选项参数
          const cmdRouteParamMetadata = info[CONTROLLER_METHOD_PARAM_CMDROUTEOPTIONS_METADATA] as
            | TControllerMethodCmdRouteOptionsMetadata
            | undefined;
          if (!cmdRouteMetadata) continue;
          let options: TControllerMethodCmdRouteOptions[] = [];
          if (cmdRouteMetadata.options) {
            options = cmdRouteMetadata.options;
          } else if (cmdRouteParamMetadata) {
            options = Object.values(cmdRouteParamMetadata).filter((param) => {
              return isObject(param);
            }) as Array<Required<TControllerMethodCmdRouteOptions>>;
          }
          const cmdRoute = this.newCmdRoute(CmdRouteModel.generateId.nextId(), {
            name: cmdRouteMetadata.name,
            cmd: cmdRouteMetadata.cmd,
            usage: cmdRouteMetadata.usage,
            shortDescription: cmdRouteMetadata.shortDescription,
            description: cmdRouteMetadata.description,
            subcommand: cmdRouteMetadata.subcommand,
            arguments: cmdRouteMetadata.arguments,
            route: [controllerAlias, methodAlias],
            domainName,
            domainViewName,
            options,
            rowStatus: 1,
          });
          await cmdRoute.save();
          cmdRouteList.push(cmdRoute);
        }
      }
    }
    return cmdRouteList;
  }

  async getDomainCmdRoute(domainName: string, filter: { cmd: string; name: string }) {
    const query: TOrmQuery = { filter: [] };
    if (domainName && isArray(query.filter)) {
      query.filter.push(['domainName', 'eq', domainName]);
    }
    if (filter.cmd && isArray(query.filter)) {
      query.filter.push(['cmd', 'cont', filter.cmd]);
    }
    if (filter.name && isArray(query.filter)) {
      query.filter.push(['name', 'cont', filter.name]);
    }
    return await CmdRouteModel.query(query);
  }

  async create(data: TModelCreate<CmdRouteModel>) {
    return await CmdRouteModel.createOne(data);
  }

  async update(data: TModelUpdate<CmdRouteModel>) {
    return await CmdRouteModel.updateById(data.id, data);
  }

  async delete(id: number | string) {
    return await CmdRouteModel.deleteById(id);
  }
}
