/**
 * @fileoverview 数据源类型定义
 * @description 定义 ORM 数据源相关的类型，包括不同类型的数据源配置选项
 */

import type { ModelType, FetchWrapOptions } from '../types';

/**
 * 数据源类型枚举
 * @description 定义支持的数据源类型
 * @example
 * ```typescript
 * const sourceType: DataSourceType = 'indexedDB';
 * ```
 */
export type DataSourceType = 'indexedDB' | 'fetch' | 'memoryDB';

/**
 * 数据源通用配置选项类型
 * @description 定义所有数据源类型共有的配置选项
 * @example
 * ```typescript
 * const commonOptions: DataSourceCommonOptions = {
 *   name: 'default',
 *   type: 'indexedDB',
 *   entities: [UserModel, PostModel],
 *   dbName: 'myApp',
 *   version: 1
 * };
 * ```
 */
export type DataSourceCommonOptions = {
  /** 数据源名称 */
  name: string;
  /** 数据源类型 */
  type: DataSourceType;
  /** 数据源模型列表 */
  entities: ModelType[];
  /** 数据库名称（可选） */
  dbName?: string;
  /** 数据源版本（可选） */
  version?: number | string;
};

/**
 * IndexedDB 数据源配置选项类型
 * @description 定义 IndexedDB 数据源的特定配置选项
 * @example
 * ```typescript
 * const indexedDBOptions: DataSourceIndexedDBOptions = {
 *   name: 'default',
 *   type: 'indexedDB',
 *   entities: [UserModel],
 *   dbName: 'myApp',
 *   version: 1
 * };
 * ```
 */
export type DataSourceIndexedDBOptions = {
  /** 数据库名称 */
  dbName: string;
  /** 数据库版本 */
  version: number;
} & DataSourceCommonOptions;

/**
 * Fetch 数据源配置选项类型
 * @description 定义基于 Fetch API 的数据源配置选项
 * @example
 * ```typescript
 * const fetchOptions: DataSourceFetchOptions = {
 *   name: 'api',
 *   type: 'fetch',
 *   entities: [UserModel],
 *   prefixUrl: 'https://api.example.com',
 *   requestOptions: { headers: { 'Authorization': 'Bearer token' } }
 * };
 * ```
 */
export type DataSourceFetchOptions = FetchWrapOptions & DataSourceCommonOptions;

/**
 * 内存数据库数据源配置选项类型
 * @description 定义内存数据库数据源的配置选项
 * @example
 * ```typescript
 * const memoryOptions: DataSourceMemoryDBOptions = {
 *   name: 'memory',
 *   type: 'memoryDB',
 *   entities: [UserModel],
 *   dbName: 'testDB'
 * };
 * ```
 */
export type DataSourceMemoryDBOptions = {
  /** 数据库名称 */
  dbName: string;
} & DataSourceCommonOptions;

/**
 * 所有数据源配置选项类型
 * @description 定义所有支持的数据源类型及其对应的配置选项
 * @example
 * ```typescript
 * const allOptions: DataSourceAllOptions = {
 *   indexedDB: indexedDBOptions,
 *   fetch: fetchOptions,
 *   memoryDB: memoryOptions
 * };
 * ```
 */
export type DataSourceAllOptions = {
  /** IndexedDB 数据源配置 */
  indexedDB: DataSourceIndexedDBOptions;
  /** Fetch 数据源配置 */
  fetch: DataSourceFetchOptions;
  /** 内存数据库数据源配置 */
  memoryDB: DataSourceMemoryDBOptions;
};
