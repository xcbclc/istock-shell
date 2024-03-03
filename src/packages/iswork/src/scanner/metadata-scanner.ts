import { isConstructorStr, isFunction } from '@istock/util';
import type { TAnyObject, TScanClassMetadata, TScanPropertyMetadata, TScanPropertyMetadataMap } from '../types';
import type { IAnyClass } from '../interfaces';
import { EMethodNameFilter } from '../enums';

/**
 * 扫描装饰器定义的metadata数据
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class MetadataScanner {
  /**
   * 获取指定类所有装饰器metadata数据
   * @param target 类
   */
  static scanClassMetadata(target: IAnyClass): TScanClassMetadata {
    const keys = Reflect.getMetadataKeys(target);
    return keys
      .map((key) => [key, Reflect.getMetadata(key, target)])
      .reduce((map, [key, metadata]) => {
        map.set(key, metadata);
        return map;
      }, new Map<symbol, unknown>());
  }

  /**
   * 获取指定类所有方法的所有装饰器metadata数据
   * @param target 类
   */
  static scanMethodMetadata(target: IAnyClass): TScanPropertyMetadataMap {
    const propertyMetadata = MetadataScanner.#getAllMethodNames(target.prototype, EMethodNameFilter.METHOD)
      .map((propertyKey) => MetadataScanner.#getMetadataForPropertyKey(target, propertyKey))
      .flat(1);
    return MetadataScanner.#convertToMap(propertyMetadata);
  }

  /**
   * 获取指定类所有访问器的所有装饰器metadata数据
   * @param target 类
   */
  static scanAccessorMetadata(target: IAnyClass): TScanPropertyMetadataMap {
    const propertyMetadata = MetadataScanner.#getAllMethodNames(target.prototype, EMethodNameFilter.ACCESSOR)
      .map((propertyKey) => MetadataScanner.#getMetadataForPropertyKey(target, propertyKey))
      .flat(1);
    return MetadataScanner.#convertToMap(propertyMetadata);
  }

  /**
   * 获取指定类指定属性的所有装饰器metadata数据
   * @param target
   * @param attributes
   */
  static scanAttributeMetadata(target: IAnyClass<any>, attributes?: Array<string | symbol>): TScanPropertyMetadataMap {
    const propertyMetadata = (attributes ?? MetadataScanner.#getAllAttributes(target))
      .map((propertyKey) => MetadataScanner.#getMetadataForPropertyKey(target, propertyKey))
      .flat(1);
    return MetadataScanner.#convertToMap(propertyMetadata);
  }

  /**
   * 获取指定对象所有方法
   * @param prototype
   * @param filter
   */
  static #getAllMethodNames(prototype: TAnyObject, filter: EMethodNameFilter = EMethodNameFilter.ALL): string[] {
    const names: string[] = [];

    if (prototype === Object.prototype) return names;
    for (const property of Object.getOwnPropertyNames(prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, property);
      let assert = isFunction(prototype[property]);
      if (filter === EMethodNameFilter.ALL) {
        /* empty */
      }
      if (filter === EMethodNameFilter.METHOD) {
        assert = assert && !descriptor?.set && !descriptor?.get && !isConstructorStr(property);
      }
      if (filter === EMethodNameFilter.ACCESSOR) {
        assert =
          // eslint-disable-next-line @typescript-eslint/unbound-method
          assert && Boolean(descriptor?.set ?? descriptor?.get) && !isConstructorStr(property);
      }
      if (assert) names.push(property);
    }
    return names;
  }

  /**
   * 获取对象的所有属性
   * @param target
   * @private
   */
  static #getAllAttributes(target: TAnyObject): string[] {
    return Object.keys(target);
  }

  /**
   * 获取指定属性的metadata数组数据
   * @param target
   * @param propertyKey
   * @private
   */
  static #getMetadataForPropertyKey(target: IAnyClass, propertyKey: string | symbol): TScanPropertyMetadata {
    const keys = Reflect.getMetadataKeys(target.prototype, propertyKey);
    return keys.map((key) => [propertyKey, key, Reflect.getMetadata(key, target.prototype, propertyKey) as unknown]);
  }

  /**
   * 转换成map对象，可以通过属性key获取
   * @param propertyMetadata
   * @private
   */
  static #convertToMap(propertyMetadata: TScanPropertyMetadata): TScanPropertyMetadataMap {
    return propertyMetadata.reduce<TScanPropertyMetadataMap>((map, [propertyKey, key, value]) => {
      const { info, list } = map.get(propertyKey) ?? { info: {}, list: [] };
      info[key] = value;
      list.push([key, value]);
      map.set(propertyKey, { info, list });
      return map;
    }, new Map());
  }
}
