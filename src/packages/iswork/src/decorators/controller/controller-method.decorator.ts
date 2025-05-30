/**
 * @fileoverview 控制器方法装饰器
 * @description 提供控制器方法的装饰器功能，用于标记和配置控制器方法的元数据
 */

import { isArray, isNil, isString, ScopeError } from '@istock-shell/util';
import type { ControllerMethodMetadata } from '../../types';
import { CONTROLLER_METHOD_METADATA, CONTROLLER_METHOD_NAME_METADATA } from '../../constants';
import { AbstractMethodDecorator } from '../abstract-decorator';
import { DecoratorCallbackType } from '../../enums';

/**
 * 控制器方法装饰器类
 * @description 用于标记控制器方法的装饰器，继承自 AbstractMethodDecorator，提供方法元数据的定义和管理，方便消息解析到对应处理方法
 * @extends AbstractMethodDecorator<ControllerMethodMetadata>
 * @example
 * ```typescript
 * class UserController {
 *   @Method('createUser')
 *   create() {}
 *
 *   @Method(['getUser', 'findUser'])
 *   get() {}
 *
 *   @Method({ alias: 'updateUser', description: '更新用户信息' })
 *   update() {}
 * }
 * ```
 */
export class ControllerMethodDecorator extends AbstractMethodDecorator<ControllerMethodMetadata> {
  /**
   * 回调类型
   * @description 装饰器的回调类型，用于方法请求处理
   * @readonly
   */
  readonly callbackType = DecoratorCallbackType.MethodRequest;

  /**
   * 构造函数
   * @description 创建控制器方法装饰器实例
   * @param key 元数据键，默认为 CONTROLLER_METHOD_METADATA
   */
  constructor(key: string | symbol = CONTROLLER_METHOD_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数（别名参数）
   * @description 创建一个带别名参数的方法装饰器
   * @param alias 方法别名，可以是字符串或字符串数组
   * @returns 方法装饰器函数
   */
  handler(alias: string | string[]): MethodDecorator;
  /**
   * 装饰器处理函数（配置参数）
   * @description 创建一个带完整配置的方法装饰器
   * @param options 方法元数据配置
   * @returns 方法装饰器函数
   */
  handler(options: ControllerMethodMetadata): MethodDecorator;
  /**
   * 装饰器处理函数实现
   * @description 根据传入的参数类型，创建相应的方法装饰器，并管理方法名称元数据
   * @param aliasOrOptions 别名或配置对象
   * @returns 方法装饰器函数
   * @throws {ScopeError} 当无法确定方法别名时抛出错误
   * @example
   * ```typescript
   * class UserController {
   *   // 使用字符串别名
   *   @Method('createUser')
   *   create() {}
   *
   *   // 使用数组别名
   *   @Method(['getUser', 'findUser'])
   *   get() {}
   *
   *   // 使用配置对象
   *   @Method({ alias: 'updateUser', description: '更新用户' })
   *   update() {}
   * }
   * ```
   */
  handler(aliasOrOptions?: string | string[] | ControllerMethodMetadata) {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      const methodNames: Array<string | symbol> =
        Reflect.getOwnMetadata(CONTROLLER_METHOD_NAME_METADATA, target, propertyKey) ?? [];
      methodNames.push(propertyKey);
      Reflect.defineMetadata(CONTROLLER_METHOD_NAME_METADATA, [...new Set(methodNames)], target);
      if (isString(aliasOrOptions) || isArray(aliasOrOptions)) {
        aliasOrOptions = { alias: aliasOrOptions };
      }
      if (isNil(aliasOrOptions)) {
        if (isString(propertyKey)) {
          aliasOrOptions = { alias: propertyKey };
        } else {
          throw new ScopeError(`global.${this.constructor.name}`, '未找到方法别名');
        }
      }
      Reflect.defineMetadata(this.key, aliasOrOptions, target, propertyKey);
      return descriptor;
    };
  }

  /**
   * 回调函数
   * @description 装饰器的回调处理函数，当前为空实现
   */
  callback() {}
}
