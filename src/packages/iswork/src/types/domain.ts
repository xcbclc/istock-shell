import type { IDomainClass } from '../interfaces';
import type { Domain } from '../domain/domain';
import type { TProviderMeta } from './provider';
import type { TController } from './controller';
import type { TScanClassMetadata, TScanPropertyMetadataMap } from './metadata-scanner';
import type { TMiddleware } from '../types';

export type TMetadataImport = IDomainClass;
export type TMetadataExport = TProviderMeta | TController;

export type TDomainMetadata = {
  name: string; // 为应用域定义一个唯一的名称
  viewName: string; // 应用域的显示名称
  imports?: TMetadataImport[]; // 需要导入的子应用域
  controllers?: TController[]; // 应用域所属的控制器
  providers?: TProviderMeta[]; // 提供者，供控制器依赖注入使用，提供者一般是服务类
  exports?: TMetadataExport[]; // 暴露到外部应用域所使用的控制器或提供者
  middlewares?: TMiddleware[]; // 应用域所需要使用的中间件
};

export type TDomainOptions = {
  isGlobal?: boolean;
  isRootDomain?: boolean;
  parentDomain?: Domain;
};

export type TDomainControllerMetadata = {
  class: TScanClassMetadata;
  method: TScanPropertyMetadataMap;
};
export type TDomainControllerMetadataMap = Map<TController, TDomainControllerMetadata>;
