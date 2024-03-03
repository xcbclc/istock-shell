import { ScopeError } from '@istock/util';
import { MetadataScanner } from '../../scanner';
import { getModelMetadata } from '../decorators';
import type { TModelType } from '../types';

type TModelAttrMetadataMap<Value = unknown> = Map<
  string | symbol,
  {
    info: Record<string | symbol, Value>;
    list: Array<[string | symbol, Value]>;
  }
>;

export class ModelMetadata {
  readonly #name: string;
  #modelMetadata!: Map<string | symbol, unknown>;
  #attrMetadata!: TModelAttrMetadataMap;
  get name() {
    return this.#name;
  }

  constructor(name: string) {
    this.#name = name;
  }

  setModelMetadata(meta: Map<string | symbol, unknown>) {
    this.#modelMetadata = meta;
  }

  setAttrMetadata(meta: TModelAttrMetadataMap) {
    this.#attrMetadata = meta;
  }

  /**
   * 根据meteKey获取模型元数据
   * @param meteKey
   */
  getModelMetadataForKey<ReturnType = unknown>(meteKey: string | symbol): ReturnType | null {
    if (this.#modelMetadata.has(meteKey)) {
      return this.#modelMetadata.get(meteKey) as ReturnType;
    }
    return null;
  }

  /**
   * 根据属性key和meteKey获取属性元数据
   * @param attrKey
   * @param meteKey
   */
  getAttrMetadataForKey<ReturnType = unknown>(attrKey: string | symbol, meteKey: string | symbol): ReturnType | null {
    if (this.#attrMetadata.has(attrKey)) {
      const attrMetadata = this.#attrMetadata.get(attrKey);
      if (attrMetadata) return attrMetadata.info[meteKey] as ReturnType;
    }
    return null;
  }
}

export class ModelMetadataMap extends Map<TModelType, ModelMetadata> {
  static metadataScanner = MetadataScanner;

  /**
   * 扫描模型上的所有装饰器metadata
   * @param Model
   */
  scanMeta(Model: TModelType) {
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
