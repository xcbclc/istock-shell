/**
 * @fileoverview 控制器装饰器
 * @description 提供控制器类的装饰器功能，用于标记和配置控制器类的元数据
 */

import { isObject } from '@istock-shell/util';
import type { ControllerMetadata } from '../../types';
import { CONTROLLER_METADATA } from '../../constants';
import { AbstractClassDecorator } from '../abstract-decorator';

/**
 * 控制器装饰器类
 * @description 用于标记控制器类的装饰器，继承自 AbstractClassDecorator，提供控制器元数据的定义和管理
 * @extends AbstractClassDecorator<ControllerMetadata>
 * @example
 * ```typescript
 * // 使用别名
 * @Controller('user')
 * class UserController {}
 *
 * // 使用多个别名
 * @Controller(['user', 'users'])
 * class UserController {}
 *
 * // 使用完整配置
 * @Controller({ alias: 'user', description: '用户控制器' })
 * class UserController {}
 * ```
 */
export class ControllerDecorator extends AbstractClassDecorator<ControllerMetadata> {
  /**
   * 构造函数
   * @description 创建控制器装饰器实例
   * @param key 元数据键，默认为 CONTROLLER_METADATA
   */
  constructor(key: string | symbol = CONTROLLER_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数（无参数）
   * @description 创建一个不带参数的控制器装饰器
   * @returns 类装饰器函数
   */
  handler(): ClassDecorator;
  /**
   * 装饰器处理函数（别名参数）
   * @description 创建一个带别名参数的控制器装饰器
   * @param alias 控制器别名，可以是字符串或字符串数组
   * @returns 类装饰器函数
   */
  handler(alias: string | string[]): ClassDecorator;
  /**
   * 装饰器处理函数（配置参数）
   * @description 创建一个带完整配置的控制器装饰器
   * @param options 控制器元数据配置
   * @returns 类装饰器函数
   */
  handler(options: ControllerMetadata): ClassDecorator;
  /**
   * 装饰器处理函数实现
   * @description 根据传入的参数类型，创建相应的控制器装饰器
   * @param aliasOrOptions 别名或配置对象
   * @returns 类装饰器函数
   * @example
   * ```typescript
   * // 使用方式1：无参数，使用类名作为别名
   * @Controller()
   * class UserController {}
   *
   * // 使用方式2：字符串别名
   * @Controller('user')
   * class UserController {}
   *
   * // 使用方式3：配置对象
   * @Controller({ alias: 'user', description: '用户控制器' })
   * class UserController {}
   * ```
   */
  handler(aliasOrOptions?: string | string[] | ControllerMetadata) {
    return (target: Function) => {
      const options: ControllerMetadata = !isObject(aliasOrOptions)
        ? {
            alias: (aliasOrOptions as string | string[] | undefined) ?? target.name,
            viewName: target.name,
          }
        : (aliasOrOptions as ControllerMetadata);
      Reflect.defineMetadata(this.key, options, target);
    };
  }

  /**
   * 回调函数
   * @description 装饰器的回调处理函数，当前为空实现
   */
  callback() {}
}
