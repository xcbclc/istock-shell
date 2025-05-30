/**
 * @fileoverview 元数据扫描器
 * @description 提供装饰器元数据的扫描和提取功能，支持类、方法、访问器和属性的元数据扫描
 */
import { isConstructorStr, isFunction } from '@istock-shell/util';
import 'reflect-metadata';
import type { AnyObject, ScanClassMetadata, ScanPropertyMetadata, ScanPropertyMetadataMap } from '../types';
import type { AnyClass } from '../interfaces';
import { MethodNameFilter } from '../enums';

/**
 * 元数据扫描器类
 * @description 扫描和提取装饰器定义的元数据，支持类级别和属性级别的元数据扫描
 * @example
 * ```typescript
 * // 扫描类元数据
 * const classMetadata = MetadataScanner.scanClassMetadata(MyClass);
 *
 * // 扫描方法元数据
 * const methodMetadata = MetadataScanner.scanMethodMetadata(MyClass);
 *
 * // 扫描访问器元数据
 * const accessorMetadata = MetadataScanner.scanAccessorMetadata(MyClass);
 *
 * // 扫描指定属性元数据
 * const propertyMetadata = MetadataScanner.scanPropertyMetadata(MyClass, ['prop1', 'prop2']);
 * ```
 */
export class MetadataScanner {
  /**
   * 扫描类元数据
   * @description 获取指定类上所有装饰器的元数据
   * @param target 目标类
   * @returns 类元数据映射表，键为元数据键，值为元数据值
   * @static
   */
  static scanClassMetadata(target: AnyClass): ScanClassMetadata {
    const keys = Reflect.getMetadataKeys(target);
    return keys
      .map((key) => [key, Reflect.getMetadata(key, target)])
      .reduce((map, [key, metadata]) => {
        map.set(key, metadata);
        return map;
      }, new Map<symbol, unknown>());
  }

  /**
   * 扫描方法元数据
   * @description 获取指定类所有方法的装饰器元数据
   * @param target 目标类
   * @returns 方法元数据映射表，键为属性名，值为元数据信息
   * @static
   */
  static scanMethodMetadata(target: AnyClass): ScanPropertyMetadataMap {
    const propertyMetadata = MetadataScanner.#getAllMethodNames(target.prototype, MethodNameFilter.METHOD)
      .map((propertyKey) => MetadataScanner.#getMetadataForPropertyKey(target, propertyKey))
      .flat(1);
    return MetadataScanner.#convertToMap(propertyMetadata);
  }

  /**
   * 扫描访问器元数据
   * @description 获取指定类所有访问器（getter/setter）的装饰器元数据
   * @param target 目标类
   * @returns 访问器元数据映射表，键为属性名，值为元数据信息
   * @static
   */
  static scanAccessorMetadata(target: AnyClass): ScanPropertyMetadataMap {
    const propertyMetadata = MetadataScanner.#getAllMethodNames(target.prototype, MethodNameFilter.ACCESSOR)
      .map((propertyKey) => MetadataScanner.#getMetadataForPropertyKey(target, propertyKey))
      .flat(1);
    return MetadataScanner.#convertToMap(propertyMetadata);
  }

  /**
   * 扫描属性元数据
   * @description 获取指定类指定属性的所有装饰器元数据
   * @param target 目标类
   * @param attributes 要扫描的属性名数组
   * @returns 属性元数据映射表，键为属性名，值为元数据信息
   * @static
   */
  static scanAttributeMetadata(target: AnyClass<any>, attributes?: Array<string | symbol>): ScanPropertyMetadataMap {
    const propertyMetadata = (attributes ?? MetadataScanner.#getAllAttributes(target))
      .map((propertyKey) => MetadataScanner.#getMetadataForPropertyKey(target, propertyKey))
      .flat(1);
    return MetadataScanner.#convertToMap(propertyMetadata);
  }

  /**
   * 获取指定对象所有方法名
   * @description 根据过滤器获取对象原型上的所有方法名
   * @param prototype 对象原型
   * @param filter 方法名过滤器，用于筛选不同类型的方法
   * @returns 方法名数组
   * @private
   * @static
   */
  static #getAllMethodNames(prototype: AnyObject, filter: MethodNameFilter = MethodNameFilter.ALL): string[] {
    const names: string[] = [];

    if (prototype === Object.prototype) return names;
    for (const property of Object.getOwnPropertyNames(prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, property);
      let assert = isFunction(prototype[property]);
      if (filter === MethodNameFilter.ALL) {
        /* empty */
      }
      if (filter === MethodNameFilter.METHOD) {
        assert = assert && !descriptor?.set && !descriptor?.get && !isConstructorStr(property);
      }
      if (filter === MethodNameFilter.ACCESSOR) {
        assert = assert && Boolean(descriptor?.set ?? descriptor?.get) && !isConstructorStr(property);
      }
      if (assert) names.push(property);
    }
    return names;
  }

  /**
   * 获取对象的所有属性名
   * @description 获取目标对象的所有可枚举属性名
   * @param target 目标对象
   * @returns 属性名数组
   * @private
   * @static
   */
  static #getAllAttributes(target: AnyObject): string[] {
    return Object.keys(target);
  }

  /**
   * 获取指定属性的元数据
   * @description 获取目标类指定属性的所有装饰器元数据
   * @param target 目标类
   * @param propertyKey 属性键
   * @returns 属性元数据数组
   * @private
   * @static
   */
  static #getMetadataForPropertyKey(target: AnyClass, propertyKey: string | symbol): ScanPropertyMetadata {
    const keys = Reflect.getMetadataKeys(target.prototype, propertyKey);
    return keys.map((key) => [propertyKey, key, Reflect.getMetadata(key, target.prototype, propertyKey) as unknown]);
  }

  /**
   * 转换为映射对象
   * @description 将属性元数据数组转换为以属性键为索引的映射对象
   * @param propertyMetadata 属性元数据数组
   * @returns 属性元数据映射表
   * @private
   * @static
   */
  static #convertToMap(propertyMetadata: ScanPropertyMetadata): ScanPropertyMetadataMap {
    return propertyMetadata.reduce<ScanPropertyMetadataMap>((map, [propertyKey, key, value]) => {
      const { info, list } = map.get(propertyKey) ?? { info: {}, list: [] };
      info[key] = value;
      list.push([key, value]);
      map.set(propertyKey, { info, list });
      return map;
    }, new Map());
  }
}
