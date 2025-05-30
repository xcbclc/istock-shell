/**
 * @fileoverview 装饰器抽象基类模块
 * @description 提供装饰器系统的抽象基类和具体实现类，支持类、属性、方法和参数装饰器
 */

import type { Decorator, AnyClass } from '../interfaces';
import { DecoratorCallbackType, DecoratorType } from '../enums';

/**
 * 装饰器抽象基类
 * @description 所有装饰器的基础抽象类，定义了装饰器的基本结构和行为
 * @abstract
 * @implements {Decorator}
 * @example
 * ```typescript
 * class MyDecorator extends AbstractDecorator {
 *   decoratorType = DecoratorType.Class;
 *
 *   handler() {
 *     return (target: Function) => {
 *       // 装饰器逻辑
 *     };
 *   }
 *
 *   callback() {
 *     // 回调逻辑
 *   }
 *
 *   getMetadata() {
 *     // 获取元数据逻辑
 *   }
 * }
 * ```
 */
export abstract class AbstractDecorator implements Decorator {
  /**
   * 元数据键
   * @description 用于存储和检索装饰器元数据的键
   * @protected
   */
  protected key: symbol | string;

  /**
   * 装饰器类型
   * @description 标识装饰器的具体类型（类、属性、方法、参数）
   * @abstract
   */
  abstract decoratorType: DecoratorType;

  /**
   * 回调类型
   * @description 定义装饰器回调函数的执行时机
   * @readonly
   * @default DecoratorCallbackType.None
   */
  readonly callbackType: DecoratorCallbackType = DecoratorCallbackType.None;

  /**
   * 排序优先级
   * @description 用于确定多个装饰器的执行顺序
   * @readonly
   * @default 0
   */
  readonly sort: number = 0;

  /**
   * 获取元数据键
   * @description 返回当前装饰器使用的元数据键
   * @returns 元数据键
   */
  get metaKey() {
    return this.key;
  }

  /**
   * 装饰器构造函数
   * @description 初始化装饰器实例，设置元数据键
   * @param key - 元数据键，用于存储和检索装饰器数据
   */
  constructor(key: symbol | string) {
    this.key = key;
  }

  /**
   * 装饰器回调函数
   * @description 装饰器的核心处理逻辑，在特定时机被调用
   * @param args - 回调参数
   * @returns 处理结果
   * @abstract
   */
  abstract callback(...args: unknown[]): unknown;

  /**
   * 获取元数据
   * @description 从目标对象中获取装饰器存储的元数据
   * @param args - 获取参数
   * @returns 元数据内容
   * @abstract
   */
  abstract getMetadata(...args: unknown[]): unknown;

  /**
   * 装饰器处理函数
   * @description 返回实际的装饰器函数，用于装饰目标对象
   * @param args - 处理参数
   * @returns 装饰器函数
   * @abstract
   */
  abstract handler(...args: unknown[]): unknown;
}

/**
 * 类装饰器抽象基类
 * @description 专门用于类装饰器的抽象基类，提供类级别的装饰器功能
 * @template MType - 元数据类型，默认为 unknown
 * @extends AbstractDecorator
 * @example
 * ```typescript
 * interface MyClassMetadata {
 *   name: string;
 *   version: string;
 * }
 *
 * class MyClassDecorator extends AbstractClassDecorator<MyClassMetadata> {
 *   handler(metadata: MyClassMetadata): ClassDecorator {
 *     return (target: Function) => {
 *       Reflect.defineMetadata(this.key, metadata, target);
 *     };
 *   }
 *
 *   callback() {
 *     // 处理逻辑
 *   }
 * }
 * ```
 */
export abstract class AbstractClassDecorator<MType = unknown> extends AbstractDecorator {
  /**
   * 装饰器类型
   * @description 固定为类装饰器类型
   * @readonly
   */
  readonly decoratorType: DecoratorType = DecoratorType.Class;

  /**
   * 类装饰器构造函数
   * @description 初始化类装饰器实例
   * @param key - 元数据键
   * @protected
   */
  protected constructor(key: symbol | string) {
    super(key);
  }

  /**
   * 类装饰器处理函数
   * @description 返回用于装饰类的装饰器函数
   * @param args - 处理参数
   * @returns 类装饰器函数
   * @abstract
   */
  abstract handler(...args: unknown[]): ClassDecorator;

  /**
   * 获取类元数据
   * @description 从目标类中获取装饰器存储的元数据
   * @param target - 目标类
   * @returns 元数据内容，如果不存在则返回 undefined
   */
  getMetadata(target: AnyClass): MType | undefined {
    return Reflect.getMetadata(this.key, target);
  }

  /**
   * 类装饰器回调函数
   * @description 类装饰器的处理逻辑
   * @param args - 回调参数
   * @returns 处理结果
   * @abstract
   */
  abstract callback(...args: unknown[]): unknown;
}

/**
 * 属性装饰器抽象基类
 * @description 专门用于属性装饰器的抽象基类，提供属性级别的装饰器功能
 * @template MType - 元数据类型，默认为 unknown
 * @extends AbstractDecorator
 * @example
 * ```typescript
 * interface PropertyMetadata {
 *   required: boolean;
 *   type: string;
 * }
 *
 * class PropertyDecorator extends AbstractPropertyDecorator<PropertyMetadata> {
 *   handler(metadata: PropertyMetadata): PropertyDecorator {
 *     return (target: any, propertyKey: string | symbol) => {
 *       Reflect.defineMetadata(this.key, metadata, target, propertyKey);
 *     };
 *   }
 *
 *   callback() {
 *     // 处理逻辑
 *   }
 * }
 * ```
 */
export abstract class AbstractPropertyDecorator<MType = unknown> extends AbstractDecorator {
  /**
   * 装饰器类型
   * @description 固定为属性装饰器类型
   * @readonly
   */
  readonly decoratorType: DecoratorType = DecoratorType.Property;

  /**
   * 属性装饰器构造函数
   * @description 初始化属性装饰器实例
   * @param key - 元数据键
   * @protected
   */
  protected constructor(key: symbol | string) {
    super(key);
  }

  /**
   * 属性装饰器处理函数
   * @description 返回用于装饰属性的装饰器函数
   * @param args - 处理参数
   * @returns 属性装饰器函数
   * @abstract
   */
  abstract handler(...args: unknown[]): PropertyDecorator;

  /**
   * 获取属性元数据
   * @description 从目标类中获取属性装饰器存储的元数据
   * @param target - 目标类
   * @returns 元数据内容，如果不存在则返回 undefined
   */
  getMetadata(target: AnyClass): MType | undefined {
    return Reflect.getMetadata(this.key, target);
  }

  /**
   * 属性装饰器回调函数
   * @description 属性装饰器的处理逻辑
   * @param args - 回调参数
   * @returns 处理结果
   * @abstract
   */
  abstract callback(...args: unknown[]): unknown;
}

/**
 * 方法装饰器抽象基类
 * @description 专门用于方法装饰器的抽象基类，提供方法级别的装饰器功能
 * @template MType - 元数据类型，默认为 unknown
 * @extends AbstractDecorator
 * @example
 * ```typescript
 * interface MethodMetadata {
 *   timeout: number;
 *   retry: boolean;
 * }
 *
 * class MethodDecorator extends AbstractMethodDecorator<MethodMetadata> {
 *   handler(metadata: MethodMetadata): MethodDecorator {
 *     return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
 *       Reflect.defineMetadata(this.key, metadata, target, propertyKey);
 *       return descriptor;
 *     };
 *   }
 *
 *   callback() {
 *     // 处理逻辑
 *   }
 * }
 * ```
 */
export abstract class AbstractMethodDecorator<MType = unknown> extends AbstractDecorator {
  /**
   * 装饰器类型
   * @description 固定为方法装饰器类型
   * @readonly
   */
  readonly decoratorType: DecoratorType = DecoratorType.Method;

  /**
   * 方法装饰器构造函数
   * @description 初始化方法装饰器实例
   * @param key - 元数据键
   * @protected
   */
  protected constructor(key: symbol | string) {
    super(key);
  }

  /**
   * 方法装饰器处理函数
   * @description 返回用于装饰方法的装饰器函数
   * @param args - 处理参数
   * @returns 方法装饰器函数
   * @abstract
   */
  abstract handler(...args: unknown[]): MethodDecorator;

  /**
   * 获取方法元数据
   * @description 从目标类的指定方法中获取装饰器存储的元数据
   * @param target - 目标类
   * @param propertyKey - 方法名称
   * @returns 元数据内容，如果不存在则返回 undefined
   */
  getMetadata(target: AnyClass, propertyKey: string | symbol): MType | undefined {
    return Reflect.getMetadata(this.key, target, propertyKey);
  }

  /**
   * 方法装饰器回调函数
   * @description 方法装饰器的处理逻辑
   * @param args - 回调参数
   * @returns 处理结果
   * @abstract
   */
  abstract callback(...args: unknown[]): unknown;
}

/**
 * 参数装饰器抽象基类
 * @description 专门用于参数装饰器的抽象基类，提供参数级别的装饰器功能
 * @template MType - 元数据类型，默认为 unknown
 * @extends AbstractDecorator
 * @example
 * ```typescript
 * interface ParameterMetadata {
 *   [parameterIndex: number]: string;
 * }
 *
 * class ParameterDecorator extends AbstractParameterDecorator<ParameterMetadata> {
 *   handler(field: string): ParameterDecorator {
 *     return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
 *       const metadata = Reflect.getMetadata(this.key, target, propertyKey) || {};
 *       metadata[parameterIndex] = field;
 *       Reflect.defineMetadata(this.key, metadata, target, propertyKey);
 *     };
 *   }
 *
 *   callback() {
 *     // 处理逻辑
 *   }
 * }
 * ```
 */
export abstract class AbstractParameterDecorator<MType = unknown> extends AbstractDecorator {
  /**
   * 装饰器类型
   * @description 固定为参数装饰器类型
   * @readonly
   */
  readonly decoratorType: DecoratorType = DecoratorType.Parameter;

  /**
   * 参数装饰器构造函数
   * @description 初始化参数装饰器实例
   * @param key - 元数据键
   * @protected
   */
  protected constructor(key: symbol | string) {
    super(key);
  }

  /**
   * 参数装饰器处理函数
   * @description 返回用于装饰参数的装饰器函数
   * @param args - 处理参数
   * @returns 参数装饰器函数
   * @abstract
   */
  abstract handler(...args: unknown[]): ParameterDecorator;

  /**
   * 获取参数元数据
   * @description 从目标类的指定方法中获取参数装饰器存储的元数据
   * @param target - 目标类
   * @param propertyKey - 方法名称
   * @returns 元数据内容，如果不存在则返回 undefined
   */
  getMetadata(target: AnyClass, propertyKey: string | symbol): MType | undefined {
    return Reflect.getMetadata(this.key, target, propertyKey);
  }

  /**
   * 参数装饰器回调函数
   * @description 参数装饰器的处理逻辑
   * @param args - 回调参数
   * @returns 处理结果
   * @abstract
   */
  abstract callback(...args: unknown[]): unknown;
}
