import { ScopeError } from '@istock/util';
import type { TDataSourceType } from '../types';
import type { DataSource } from '../data-source';
import { IndexedDBDriver } from './indexedDB/indexedDB-driver';
import { FetchDriver } from './fetch/fetch-driver';
import { MemoryDriver } from './memory/memory-driver';

export type TAllDriver = {
  indexedDB: IndexedDBDriver;
  fetch: FetchDriver;
  memoryDB: MemoryDriver;
};

/**
 * 驱动工厂，创建驱动实例
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DriverFactory {
  static create<Type extends TDataSourceType>(dataSource: DataSource<Type>): TAllDriver[Type] {
    const { options } = dataSource;
    const { type } = options;
    let driver: TAllDriver[Type];
    switch (type) {
      case 'indexedDB':
        driver = new IndexedDBDriver(options as DataSource<'indexedDB'>['options']) as TAllDriver[Type];
        break;
      case 'fetch':
        driver = new FetchDriver(options as DataSource<'fetch'>['options']) as TAllDriver[Type];
        break;
      case 'memoryDB':
        driver = new MemoryDriver(options as DataSource<'memoryDB'>['options']) as TAllDriver[Type];
        break;
      default:
        throw new ScopeError(`iswork.${this.constructor.name}`, '未知驱动类型');
    }
    return driver;
  }
}
