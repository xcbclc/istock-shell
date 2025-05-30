/**
 * @fileoverview 控制器负载参数装饰器
 * @description 提供获取完整命令负载数据的参数装饰器功能
 */

import { ScopeError } from '@istock-shell/util';
import type { ControllerMethodParamPayloadMetadata, CmdpInfo } from '../../types';
import { CONTROLLER_METHOD_PARAM_PAYLOAD_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';

import { AbstractParameterDecorator } from '../abstract-decorator';

/**
 * 控制器负载参数装饰器类
 * @description 用于获取完整命令负载数据的参数装饰器，继承自 AbstractParameterDecorator
 * @extends AbstractParameterDecorator<ControllerMethodParamPayloadMetadata>
 * @example
 * ```typescript
 * class UserController {
 *   @Method('create')
 *   createUser(@Payload() payload: any) {
 *     // payload 包含完整的命令负载数据
 *     console.log(payload);
 *   }
 * }
 * ```
 */
export class ControllerPayloadDecorator extends AbstractParameterDecorator<ControllerMethodParamPayloadMetadata> {
  /**
   * 构造函数
   * @description 创建控制器负载参数装饰器实例
   * @param key - 元数据键，默认为 CONTROLLER_METHOD_PARAM_PAYLOAD_METADATA
   */
  constructor(key: string | symbol = CONTROLLER_METHOD_PARAM_PAYLOAD_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数
   * @description 创建负载参数装饰器，用于标记需要注入完整负载数据的参数
   * @returns 参数装饰器函数
   * @throws {ScopeError} 当无法找到属性键时抛出错误
   * @example
   * ```typescript
   * // 注入完整的 payload 数据
   * method(@Payload() data: any) {}
   * ```
   */
  handler() {
    return (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
      if (!propertyKey) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '未找到propertyKey');
      }
      const paramsMetadata: ControllerMethodParamPayloadMetadata =
        Reflect.getOwnMetadata(CONTROLLER_METHOD_PARAM_PAYLOAD_METADATA, target, propertyKey) ?? {};
      paramsMetadata[parameterIndex] = true;
      Reflect.defineMetadata(CONTROLLER_METHOD_PARAM_PAYLOAD_METADATA, paramsMetadata, target, propertyKey);
    };
  }

  /**
   * 装饰器回调函数
   * @description 返回完整的命令负载数据
   * @param _value - 布尔值标识（未使用）
   * @returns 回调函数，用于获取完整负载数据
   * @example
   * ```typescript
   * // 返回完整的 payload 对象
   * // 如：{ name: 'John', age: 25, email: 'john@example.com' }
   * ```
   */
  callback(_value: boolean) {
    return (_ctx: ApplicationContext, cmdInfo: CmdpInfo) => {
      const { payload } = cmdInfo;
      return payload;
    };
  }
}
