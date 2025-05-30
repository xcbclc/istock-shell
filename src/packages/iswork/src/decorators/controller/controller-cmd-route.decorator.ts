/**
 * @fileoverview 控制器命令路由装饰器
 * @description 提供控制器方法的命令路由装饰器功能，用于定义和管理方法的路由信息
 */

import type {
  ControllerMethodCmdRouteMetadata,
  ControllerMethodCmdRoute,
  ControllerMethodCmdRouteOptions,
} from '../../types';
import { CONTROLLER_METHOD_CMDROUTE_METADATA } from '../../constants';
import { AbstractMethodDecorator } from '../abstract-decorator';
import { DecoratorCallbackType } from '../../enums';

/**
 * 控制器命令路由装饰器类
 * @description 用于标记控制器方法的命令路由装饰器，继承自 AbstractMethodDecorator，提供路由元数据的定义和管理
 * @extends AbstractMethodDecorator<ControllerMethodCmdRouteMetadata>
 * @example
 * ```typescript
 * class UserController {
 *   @CmdRoute({
 *     command: 'create',
 *     description: '创建用户',
 *     options: {
 *       name: { type: 'string', description: '用户名' }
 *     }
 *   })
 *   createUser() {}
 * }
 * ```
 */
export class ControllerCmdRouteDecorator extends AbstractMethodDecorator<ControllerMethodCmdRouteMetadata> {
  /**
   * 回调类型
   * @description 装饰器的回调类型，用于方法请求处理
   * @readonly
   */
  readonly callbackType = DecoratorCallbackType.MethodRequest;

  /**
   * 构造函数
   * @description 创建控制器命令路由装饰器实例
   * @param key 元数据键，默认为 CONTROLLER_METHOD_CMDROUTE_METADATA
   */
  constructor(key: string | symbol = CONTROLLER_METHOD_CMDROUTE_METADATA) {
    super(key);
  }

  /**
   * 将选项数据格式化成元数据
   * @description 将命令路由配置转换为标准的元数据格式，处理选项和子命令的格式化
   * @param options 命令路由配置对象
   * @returns 格式化后的命令路由元数据
   * @private
   * @example
   * ```typescript
   * const options = {
   *   command: 'create',
   *   options: { name: { type: 'string' } },
   *   subcommand: { command: 'user', options: { id: { type: 'number' } } }
   * };
   * const metadata = this.#formatToMetadata(options);
   * ```
   */
  #formatToMetadata(options: ControllerMethodCmdRoute): ControllerMethodCmdRouteMetadata {
    const { subcommand, ...other } = options;
    let subcommandOptions: ControllerMethodCmdRouteOptions[] = [];
    if (subcommand?.options) {
      subcommandOptions = Object.values(subcommand.options ?? {});
    }
    const metadata: ControllerMethodCmdRouteMetadata = { ...other, options: Object.values(options.options ?? {}) };
    if (subcommand) {
      metadata.subcommand = Object.assign<ControllerMethodCmdRoute, Partial<ControllerMethodCmdRouteMetadata>>(
        subcommand,
        { options: subcommandOptions }
      );
    }
    return metadata;
  }

  /**
   * 装饰器处理函数
   * @description 创建命令路由装饰器，将路由配置应用到目标方法上
   * @param options 命令路由配置对象
   * @returns 方法装饰器函数
   * @example
   * ```typescript
   * @CmdRoute({
   *   command: 'list',
   *   description: '列出所有用户',
   *   options: {
   *     page: { type: 'number', description: '页码', default: 1 },
   *     limit: { type: 'number', description: '每页数量', default: 10 }
   *   }
   * })
   * listUsers() {}
   * ```
   */
  handler(options: ControllerMethodCmdRoute) {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      Reflect.defineMetadata(this.key, this.#formatToMetadata(options), target, propertyKey);
      return descriptor;
    };
  }

  /**
   * 回调函数
   * @description 装饰器的回调处理函数，当前为空实现
   */
  callback() {}
}
