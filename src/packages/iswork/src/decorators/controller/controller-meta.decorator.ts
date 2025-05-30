/**
 * @fileoverview 控制器元数据参数装饰器
 * @description 提供从命令元数据中提取指定字段值的参数装饰器功能
 */

import { isObject, ScopeError } from '@istock-shell/util';
import type { ControllerMethodParamMetaMetadata, CmdpInfo, AnyObject } from '../../types';
import { CONTROLLER_METHOD_PARAM_META_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';
import { AbstractParameterDecorator } from '../abstract-decorator';

/**
 * 控制器元数据参数装饰器类
 * @description 用于从命令元数据中提取指定字段值的参数装饰器，继承自 AbstractParameterDecorator
 * @extends AbstractParameterDecorator<ControllerMethodParamMetaMetadata>
 * @example
 * ```typescript
 * class UserController {
 *   @Method('processCommand')
 *   processCommand(
 *     @Meta('userId') userId: string,
 *     @Meta('timestamp') timestamp: number
 *   ) {
 *     // userId 和 timestamp 将从命令元数据中提取
 *     console.log(userId, timestamp);
 *   }
 * }
 * ```
 */
export class ControllerMetaDecorator extends AbstractParameterDecorator<ControllerMethodParamMetaMetadata> {
  /**
   * 构造函数
   * @description 创建控制器元数据参数装饰器实例
   * @param key - 元数据键，默认为 CONTROLLER_METHOD_PARAM_META_METADATA
   */
  constructor(key: string | symbol = CONTROLLER_METHOD_PARAM_META_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数
   * @description 返回用于标记参数从命令元数据中提取指定字段值的装饰器函数
   * @param field - 要提取的元数据字段名
   * @returns 参数装饰器函数
   * @throws {ScopeError} 当未找到 propertyKey 时抛出错误
   * @example
   * ```typescript
   * // 提取 userId 字段
   * @Meta('userId') userId: string
   *
   * // 提取 timestamp 字段
   * @Meta('timestamp') timestamp: number
   * ```
   */
  handler(field: string) {
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
      if (!propertyKey) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '未找到propertyKey');
      }
      const paramsMetadata: ControllerMethodParamMetaMetadata =
        Reflect.getOwnMetadata(this.key, target, propertyKey) ?? {};
      paramsMetadata[parameterIndex] = field;
      Reflect.defineMetadata(this.key, paramsMetadata, target, propertyKey);
    };
  }

  /**
   * 装饰器回调函数
   * @description 从命令信息的元数据中提取指定字段的值
   * @param value - 要提取的字段名
   * @returns 回调函数，用于从命令元数据中提取字段值
   * @example
   * ```typescript
   * // 当 value 为 'userId' 时，返回 meta.userId
   * // 当 meta 不是对象或字段不存在时，返回 undefined
   * ```
   */
  callback(value: string) {
    return (_ctx: ApplicationContext, cmdInfo: CmdpInfo) => {
      const { meta } = cmdInfo;
      return isObject(meta) ? (meta as AnyObject)[value] : undefined;
    };
  }
}
