/**
 * @fileoverview 控制器字段参数装饰器
 * @description 提供从命令负载中提取指定字段值的参数装饰器功能
 */

import { isObject, ScopeError } from '@istock-shell/util';
import type { ControllerMethodParamFiledMetadata, CmdpInfo, AnyObject } from '../../types';
import { CONTROLLER_METHOD_PARAM_FILED_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';
import { AbstractParameterDecorator } from '../abstract-decorator';

/**
 * 控制器字段参数装饰器类
 * @description 用于从命令负载中提取指定字段值的参数装饰器，继承自 AbstractParameterDecorator
 * @extends AbstractParameterDecorator<ControllerMethodParamFiledMetadata>
 * @example
 * ```typescript
 * class UserController {
 *   @Method('create')
 *   createUser(@Field('name') name: string, @Field('email') email: string) {
 *     // name 和 email 将从 payload 中提取
 *     console.log(name, email);
 *   }
 * }
 * ```
 */
export class ControllerFieldDecorator extends AbstractParameterDecorator<ControllerMethodParamFiledMetadata> {
  /**
   * 构造函数
   * @description 创建控制器字段参数装饰器实例
   * @param key - 元数据键，默认为 CONTROLLER_METHOD_PARAM_FILED_METADATA
   */
  constructor(key: string | symbol = CONTROLLER_METHOD_PARAM_FILED_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数
   * @description 创建字段参数装饰器，用于标记需要从负载中提取的字段名
   * @param field - 要提取的字段名
   * @returns 参数装饰器函数
   * @throws {ScopeError} 当无法找到属性键时抛出错误
   * @example
   * ```typescript
   * // 提取 payload.username 字段
   * method(@Field('username') username: string) {}
   * ```
   */
  handler(field: string) {
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
      if (!propertyKey) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '未找到propertyKey');
      }
      const paramsMetadata: ControllerMethodParamFiledMetadata =
        Reflect.getOwnMetadata(this.key, target, propertyKey) ?? {};
      paramsMetadata[parameterIndex] = field;
      Reflect.defineMetadata(this.key, paramsMetadata, target, propertyKey);
    };
  }

  /**
   * 装饰器回调函数
   * @description 从命令信息的负载中提取指定字段的值
   * @param value - 字段名
   * @returns 回调函数，用于提取字段值
   * @example
   * ```typescript
   * // 当 payload = { name: 'John', age: 25 } 时
   * // callback('name') 返回 'John'
   * // callback('age') 返回 25
   * ```
   */
  callback(value: string) {
    return (_ctx: ApplicationContext, cmdInfo: CmdpInfo) => {
      const { payload } = cmdInfo;
      return isObject(payload) ? (payload as AnyObject)[value] : undefined;
    };
  }
}
