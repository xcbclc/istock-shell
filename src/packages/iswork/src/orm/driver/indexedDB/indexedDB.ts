import type { IDBPDatabase } from 'idb';
import { ScopeError } from '@istock-shell/util';
import type { ModelMetadataMap } from '../../metadata/metadata';
import type { ModelType } from '../../types';

/**
 * IndexedDB 包装器类
 * @description 提供对 IndexedDB 数据库操作的高级封装，管理模型元数据和数据库实例
 * @example
 * ```typescript
 * // 创建 IndexedDB 包装器实例
 * const idbWrap = new IndexedDBWrap(idbInstance, modelMetadataMap);
 *
 * // 获取模型名称
 * const modelName = idbWrap.getModeName(UserModel);
 * console.log(modelName); // 输出: 'User'
 * ```
 */
export class IndexedDBWrap {
  /** IndexedDB 数据库实例 */
  idb: IDBPDatabase<unknown>;
  /** 模型元数据映射（私有字段） */
  readonly #modelMetadataMap: ModelMetadataMap;

  /**
   * 构造函数
   * @param idb - IndexedDB 数据库实例
   * @param modelMetadataMap - 模型元数据映射
   */
  constructor(idb: IDBPDatabase<unknown>, modelMetadataMap: ModelMetadataMap) {
    this.idb = idb;
    this.#modelMetadataMap = modelMetadataMap;
  }

  /**
   * 获取模型名称
   * @description 根据模型类型从元数据映射中获取对应的模型名称
   * @param model - 模型类型
   * @returns 模型名称
   * @throws {ScopeError} 当未找到模型元数据时抛出错误
   */
  getModeName(model: ModelType) {
    const metadata = this.#modelMetadataMap.get(model);
    if (!metadata) throw new ScopeError(`iswork.${this.constructor.name}`, '未获取到模型元数据实例');
    return metadata.name;
  }
}
