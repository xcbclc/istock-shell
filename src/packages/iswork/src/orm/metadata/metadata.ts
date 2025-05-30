/**
 * @fileoverview 模型元数据管理
 * @description 提供模型元数据的存储、管理和查询功能
 */

import { ScopeError } from '@istock-shell/util';
import { MetadataScanner } from '../../scanner';
import { getModelMetadata } from '../decorators';
import type { ModelType } from '../types';

/**
 * 模型属性元数据映射类型
 * @template Value - 元数据值类型
 */
type ModelAttrMetadataMap<Value = unknown> = Map<
  string | symbol,
  {
    info: Record<string | symbol, Value>;
    list: Array<[string | symbol, Value]>;
  }
>;

/**
 * 模型元数据类
 * @description 管理单个模型的元数据信息，包括模型级别和属性级别的元数据
 * @example
 * ```typescript
 * const metadata = new ModelMetadata('User');
 * metadata.setModelMetadata(modelMeta);
 * metadata.setAttrMetadata(attrMeta);
 *
 * // 获取模型元数据
 * const tableName = metadata.getModelMetadataForKey('tableName');
 *
 * // 获取属性元数据
 * const columnInfo = metadata.getAttrMetadataForKey('name', 'column');
 * ```
 */
export class ModelMetadata {
  /** 模型名称 */
  readonly #name: string;
  /** 模型级别元数据 */
  #modelMetadata!: Map<string | symbol, unknown>;
  /** 属性级别元数据 */
  #attrMetadata!: ModelAttrMetadataMap;

  /**
   * 获取模型名称
   * @returns 模型名称
   */
  get name() {
    return this.#name;
  }

  /**
   * 模型元数据构造函数
   * @description 初始化模型元数据实例
   * @param name - 模型名称
   * @example
   * ```typescript
   * const metadata = new ModelMetadata('User');
   * ```
   */
  constructor(name: string) {
    this.#name = name;
  }

  /**
   * 设置模型级别元数据
   * @description 设置模型的类级别元数据信息
   * @param meta - 模型元数据映射
   * @example
   * ```typescript
   * const modelMeta = new Map();
   * modelMeta.set('tableName', 'users');
   * metadata.setModelMetadata(modelMeta);
   * ```
   */
  setModelMetadata(meta: Map<string | symbol, unknown>) {
    this.#modelMetadata = meta;
  }

  /**
   * 设置属性级别元数据
   * @description 设置模型属性的元数据信息
   * @param meta - 属性元数据映射
   * @example
   * ```typescript
   * const attrMeta = new Map();
   * attrMeta.set('name', { info: { column: { type: 'string' } }, list: [] });
   * metadata.setAttrMetadata(attrMeta);
   * ```
   */
  setAttrMetadata(meta: ModelAttrMetadataMap) {
    this.#attrMetadata = meta;
  }

  /**
   * 根据元数据键获取模型元数据
   * @description 从模型级别元数据中获取指定键的值
   * @template ReturnType - 返回值类型
   * @param meteKey - 元数据键
   * @returns 元数据值，如果不存在则返回 null
   * @example
   * ```typescript
   * const tableName = metadata.getModelMetadataForKey<string>('tableName');
   * ```
   */
  getModelMetadataForKey<ReturnType = unknown>(meteKey: string | symbol): ReturnType | null {
    if (this.#modelMetadata.has(meteKey)) {
      return this.#modelMetadata.get(meteKey) as ReturnType;
    }
    return null;
  }

  /**
   * 根据属性键和元数据键获取属性元数据
   * @description 从属性级别元数据中获取指定属性和键的值
   * @template ReturnType - 返回值类型
   * @param attrKey - 属性键
   * @param meteKey - 元数据键
   * @returns 元数据值，如果不存在则返回 null
   * @example
   * ```typescript
   * const columnInfo = metadata.getAttrMetadataForKey<ColumnOptions>('name', 'column');
   * ```
   */
  getAttrMetadataForKey<ReturnType = unknown>(attrKey: string | symbol, meteKey: string | symbol): ReturnType | null {
    if (this.#attrMetadata.has(attrKey)) {
      const attrMetadata = this.#attrMetadata.get(attrKey);
      if (attrMetadata) return attrMetadata.info[meteKey] as ReturnType;
    }
    return null;
  }
}

/**
 * 模型元数据映射类
 * @description 管理多个模型的元数据，提供模型元数据的扫描和存储功能
 * @extends Map<ModelType, ModelMetadata>
 * @example
 * ```typescript
 * const metadataMap = new ModelMetadataMap();
 * metadataMap.scanMeta(UserModel);
 * metadataMap.scanMeta(PostModel);
 *
 * // 获取模型元数据
 * const userMetadata = metadataMap.get(UserModel);
 * ```
 */
export class ModelMetadataMap extends Map<ModelType, ModelMetadata> {
  /** 元数据扫描器 */
  static metadataScanner = MetadataScanner;

  /**
   * 扫描模型上的所有装饰器元数据
   * @description 扫描指定模型类上的装饰器元数据，包括类级别和属性级别的元数据
   * @param Model - 要扫描的模型类
   * @throws {ScopeError} 当模型没有定义名称时抛出错误
   * @example
   * ```typescript
   * @Model('User')
   * class UserModel {
   *   @PrimaryColumn()
   *   id: number;
   *
   *   @Column()
   *   name: string;
   * }
   *
   * const metadataMap = new ModelMetadataMap();
   * metadataMap.scanMeta(UserModel);
   * ```
   */
  scanMeta(Model: ModelType) {
    if (this.get(Model)) return;
    const scanner = ModelMetadataMap.metadataScanner;
    const modelMetadata = scanner.scanClassMetadata(Model);
    const modelAttributeMetadata = scanner.scanAttributeMetadata(Model, Object.keys(new Model()));
    const modelOptions = getModelMetadata(Model) ?? {};
    const name = modelOptions.name;
    if (!name) throw new ScopeError(`iswork.${this.constructor.name}`, '未获取到模型名');
    const metadata = new ModelMetadata(name);
    metadata.setModelMetadata(modelMetadata);
    metadata.setAttrMetadata(modelAttributeMetadata);
    this.set(Model, metadata);
  }
}
