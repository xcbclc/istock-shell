/**
 * @fileoverview 驱动器工厂
 * @description 提供数据源驱动器的创建和管理功能
 */

import { ScopeError } from '@istock-shell/util';
import type { DataSourceType } from '../types';
import type { DataSource } from '../data-source';
import { IndexedDBDriver } from './indexedDB/indexedDB-driver';
import { FetchDriver } from './fetch/fetch-driver';
import { MemoryDriver } from './memory/memory-driver';

/**
 * 所有驱动器类型映射
 * @description 定义所有可用的数据源驱动器类型映射
 * @example
 * ```typescript
 * // 获取 IndexedDB 驱动器类型
 * type IndexedDBDriverType = AllDriver['indexedDB'];
 *
 * // 获取 Fetch 驱动器类型
 * type FetchDriverType = AllDriver['fetch'];
 * ```
 */
export type AllDriver = {
  /** IndexedDB 驱动器 */
  indexedDB: IndexedDBDriver;
  /** Fetch 驱动器 */
  fetch: FetchDriver;
  /** 内存数据库驱动器 */
  memoryDB: MemoryDriver;
};

/**
 * 驱动工厂，创建驱动实例
 */

export class DriverFactory {
  static create<Type extends DataSourceType>(dataSource: DataSource<Type>): AllDriver[Type] {
    const { options } = dataSource;
    const { type } = options;
    let driver: AllDriver[Type];
    switch (type) {
      case 'indexedDB':
        driver = new IndexedDBDriver(options as DataSource<'indexedDB'>['options']) as AllDriver[Type];
        break;
      case 'fetch':
        driver = new FetchDriver(options as DataSource<'fetch'>['options']) as AllDriver[Type];
        break;
      case 'memoryDB':
        driver = new MemoryDriver(options as DataSource<'memoryDB'>['options']) as AllDriver[Type];
        break;
      default:
        throw new ScopeError(`iswork.${this.constructor.name}`, '未知驱动类型');
    }
    return driver;
  }
}
