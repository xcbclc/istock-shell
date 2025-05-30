/**
 * @fileoverview 控制器命令路由参数装饰器
 * @description 提供从命令路由中提取指定位置参数值的参数装饰器功能
 */

import { isArray, isNumber, isObject, ScopeError } from '@istock-shell/util';
import type { ControllerMethodCmdRouteArguments, CmdpInfo } from '../../types';
import { CONTROLLER_METHOD_PARAM_CMDROUTEARGUMENTS_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';
import { AbstractParameterDecorator } from '../abstract-decorator';

/**
 * 控制器命令路由参数装饰器类
 * @description 用于从命令路由参数中提取指定位置参数值的参数装饰器，继承自 AbstractParameterDecorator
 * @extends AbstractParameterDecorator<ControllerMethodCmdRouteArguments>
 * @example
 * ```typescript
 * class UserController {
 *   @Method('getUser')
 *   getUser(@Arguments(0) id: string, @Arguments(1) type: string) {
 *     // id 和 type 将从命令参数的第0和第1位置提取
 *     console.log(id, type);
 *   }
 * }
 * ```
 */
export class ControllerCmdRouteArgumentsDecorator extends AbstractParameterDecorator<ControllerMethodCmdRouteArguments> {
  /**
   * 构造函数
   * @description 创建控制器命令路由参数装饰器实例
   * @param key - 元数据键，默认为 CONTROLLER_METHOD_PARAM_CMDROUTEARGUMENTS_METADATA
   */
  constructor(key: string | symbol = CONTROLLER_METHOD_PARAM_CMDROUTEARGUMENTS_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数
   * @description 返回用于标记参数从命令参数中提取指定位置值的装饰器函数
   * @param index - 要提取的参数位置索引，可选
   * @returns 参数装饰器函数
   * @throws {ScopeError} 当未找到 propertyKey 时抛出错误
   * @example
   * ```typescript
   * // 提取第0个参数
   * @Arguments(0) id: string
   *
   * // 提取所有参数
   * @Arguments() args: any[]
   * ```
   */
  handler(index?: number) {
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
      if (!propertyKey) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '未找到propertyKey');
      }
      const paramsMetadata: ControllerMethodCmdRouteArguments =
        Reflect.getOwnMetadata(this.key, target, propertyKey) ?? {};
      if (isNumber(index)) {
        paramsMetadata[parameterIndex] = index;
      }
      Reflect.defineMetadata(this.key, paramsMetadata, target, propertyKey);
    };
  }

  /**
   * 装饰器回调函数
   * @description 从命令信息中提取指定位置的参数值
   * @param value - 参数位置索引，如果未定义则返回所有参数
   * @returns 回调函数，用于从命令信息中提取参数值
   * @example
   * ```typescript
   * // 当 value 为 0 时，返回第一个参数
   * // 当 value 为 undefined 时，返回所有参数数组
   * ```
   */
  callback(value: number | undefined) {
    return (_ctx: ApplicationContext, cmdInfo: CmdpInfo) => {
      const { payload } = cmdInfo;
      if (!isObject(payload)) return undefined;
      const args = payload.arguments;
      if (!isNumber(value)) return arguments;
      return isArray(args) ? args[value] : undefined;
    };
  }
}
