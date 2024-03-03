import { ScopeError, isObject } from '@istock/util';
import {
  Injectable,
  type TModelData,
  type ApplicationContext,
  type TModelCreate,
  type TModelUpdate,
} from '@istock/iswork';
import { DomainModel } from './domain.model';

@Injectable()
export class DomainService {
  async getAllDomain(ctx: ApplicationContext) {
    const domainList = (await DomainModel.query({})) ?? [];
    if (domainList.length > 0) return domainList;
    const domains = ctx.app.allDomain;
    let rootId: string = '';
    domains
      .sort((domain) => (domain.name === 'root' ? -1 : 1))
      .forEach((domain) => {
        const domainName = domain.name;
        if (!domainName) return;
        const modelData = {
          id: DomainModel.generateId.nextId(),
          name: domainName,
          viewName: domain.domainMetadata.viewName,
          isGlobal: domain.isGlobal,
          parentId: '',
          updateDate: new Date(),
          createDate: new Date(),
          rowStatus: 1,
        };
        if (modelData.name === 'root') {
          rootId = modelData.id;
        } else {
          modelData.parentId = rootId;
        }
        domainList.push(DomainModel.createModel(modelData));
      });
    return domainList;
  }

  async create(data: TModelCreate<DomainModel>) {
    return await DomainModel.createOne(data);
  }

  async update(data: TModelUpdate<DomainModel>) {
    return await DomainModel.updateById(data.id, data);
  }

  async delete(id: string) {
    return await DomainModel.deleteById(id);
  }

  async find(ctx: ApplicationContext) {
    const domains = await this.getAllDomain(ctx);
    return domains.filter((domain) => !domain.isGlobal);
  }

  async findDomainPaths(ctx: ApplicationContext, currentPaths: string[], paths: string[]) {
    const commonErrorMessage = `当前路径：${currentPaths.join('/')}，操作路径：${paths.join('/')}`;
    const domains = await this.getAllDomain(ctx);
    const domainRecord = domains.reduce<Record<string, TModelData<DomainModel>>>((record, domain) => {
      record[domain.name] = domain;
      record[`_${domain.viewName}`] = domain;
      return record;
    }, {});
    let currentDomainPaths = currentPaths.map((path) => {
      const domain = domainRecord[path] ?? domainRecord[`_${path}`];
      if (!domain) {
        throw new ScopeError(
          `domains.${this.constructor.name}`,
          `当前未知路径：${JSON.stringify(domain)}，${commonErrorMessage}`
        );
      }
      return domain;
    });
    const domainPaths = paths.map((path): TModelData<DomainModel> | string => {
      return domainRecord[path] ?? domainRecord[`_${path}`] ?? path;
    });
    domainPaths.forEach((domain, index) => {
      if (domain === '' && index === 0) {
        currentDomainPaths = [domainRecord.root];
        return;
      }
      if (domain === '.') return;
      if (domain === '..') {
        currentDomainPaths.pop();
        return;
      }
      if (isObject(domain)) {
        currentDomainPaths.push(domain);
        return;
      }
      throw new ScopeError(
        `domains.${this.constructor.name}`,
        `操作未知路径：${JSON.stringify(domain)}，${commonErrorMessage}`
      );
    });
    // 范围校验
    for (let index = 0; index < currentDomainPaths.length; index++) {
      const parentDomain = currentDomainPaths[index - 1];
      const domain = currentDomainPaths[index];
      if ((!parentDomain && domain.parentId) || (parentDomain && domain.parentId !== parentDomain.id)) {
        throw new ScopeError(
          `domains.${this.constructor.name}`,
          `${domain.viewName}不在所该路径下，${commonErrorMessage}`
        );
      }
    }
    return currentDomainPaths;
  }
}
