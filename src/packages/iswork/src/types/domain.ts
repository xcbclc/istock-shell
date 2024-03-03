import type { IDomainClass } from '../interfaces';
import type { Domain } from '../domain/domain';
import type { TProviderMeta } from './provider';
import type { TController } from './controller';
import type { TScanClassMetadata, TScanPropertyMetadataMap } from './metadata-scanner';
import type { TMiddleware } from '../types';

export type TMetadataImport = IDomainClass;
export type TMetadataExport = TProviderMeta | TController;

export type TDomainMetadata = {
  name: string;
  viewName: string;
  imports?: TMetadataImport[];
  controllers?: TController[];
  providers?: TProviderMeta[];
  exports?: TMetadataExport[];
  middlewares?: TMiddleware[];
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
