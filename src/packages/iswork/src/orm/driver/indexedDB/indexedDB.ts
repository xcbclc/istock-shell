import type { IDBPDatabase } from 'idb';
import { ScopeError } from '@istock/util';
import type { ModelMetadataMap } from '../../metadata/metadata';
import type { TModelType } from '../../types';

export class IndexedDBWrap {
  idb: IDBPDatabase<unknown>;
  readonly #modelMetadataMap: ModelMetadataMap;
  constructor(idb: IDBPDatabase<unknown>, modelMetadataMap: ModelMetadataMap) {
    this.idb = idb;
    this.#modelMetadataMap = modelMetadataMap;
  }

  /**
   * 获取模型名
   * @param model
   */
  getModeName(model: TModelType) {
    const metadata = this.#modelMetadataMap.get(model);
    if (!metadata) throw new ScopeError(`iswork.${this.constructor.name}`, '未获取到模型元数据实例');
    return metadata.name;
  }
}
