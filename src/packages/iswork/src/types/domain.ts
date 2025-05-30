/**
 * @fileoverview 域类型定义
 * @description 定义应用域相关的类型，包括域元数据、选项和控制器元数据等
 */

import type { DomainClassBase } from '../interfaces';
import type { Domain } from '../domain/domain';
import type { ProviderMeta } from './provider';
import type { ControllerBase } from './controller';
import type { ScanClassMetadata, ScanPropertyMetadataMap } from './metadata-scanner';
import type { Middleware } from '../types';

/**
 * 元数据导入类型
 * @description 定义可以导入到域中的元数据类型
 */
export type MetadataImport = DomainClassBase;

/**
 * 元数据导出类型
 * @description 定义可以从域中导出的元数据类型
 */
export type MetadataExport = ProviderMeta | ControllerBase;

/**
 * 域元数据类型
 * @description 定义应用域的完整元数据配置
 * @example
 * ```typescript
 * const domainMetadata: DomainMetadata = {
 *   name: 'user-domain',
 *   viewName: '用户管理域',
 *   controllers: [UserController],
 *   providers: [UserService],
 *   middlewares: [authMiddleware]
 * };
 * ```
 */
export type DomainMetadata = {
  /** 为应用域定义一个唯一的名称 */
  name: string;
  /** 应用域的显示名称 */
  viewName: string;
  /** 需要导入的子应用域 */
  imports?: MetadataImport[];
  /** 应用域所属的控制器 */
  controllers?: ControllerBase[];
  /** 提供者，供控制器依赖注入使用，提供者一般是服务类 */
  providers?: ProviderMeta[];
  /** 暴露到外部应用域所使用的控制器或提供者 */
  exports?: MetadataExport[];
  /** 应用域所需要使用的中间件 */
  middlewares?: Middleware[];
};

/**
 * 域选项类型
 * @description 定义域的配置选项
 * @example
 * ```typescript
 * const options: DomainOptions = {
 *   isGlobal: true,
 *   isRootDomain: false
 * };
 * ```
 */
export type DomainOptions = {
  /** 是否为全局域 */
  isGlobal?: boolean;
  /** 是否为根域 */
  isRootDomain?: boolean;
  /** 父域实例 */
  parentDomain?: Domain;
};

/**
 * 域控制器元数据类型
 * @description 定义域中控制器的元数据结构
 * @example
 * ```typescript
 * const controllerMetadata: DomainControllerMetadata = {
 *   class: new Map(),
 *   method: new Map()
 * };
 * ```
 */
export type DomainControllerMetadata = {
  /** 类级别的扫描元数据 */
  class: ScanClassMetadata;
  /** 方法级别的扫描元数据映射 */
  method: ScanPropertyMetadataMap;
};

/**
 * 域控制器元数据映射类型
 * @description 定义控制器与其元数据的映射关系
 */
export type DomainControllerMetadataMap = Map<ControllerBase, DomainControllerMetadata>;
