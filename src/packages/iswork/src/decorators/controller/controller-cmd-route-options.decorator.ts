/**
 * @fileoverview 控制器命令路由选项装饰器
 * @description 提供从命令路由选项中提取指定字段值的参数装饰器功能
 */

import { isArray, isObject, isPlainObject, isString } from '@istock-shell/util';
import type {
  ControllerMethodCmdRouteOptions,
  ControllerMethodCmdRouteOptionsMetadata,
  CmdpInfo,
  AnyObject,
} from '../../types';
import { CONTROLLER_METHOD_NAME_METADATA, CONTROLLER_METHOD_PARAM_CMDROUTEOPTIONS_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';
import { AbstractParameterDecorator } from '../abstract-decorator';

/**
 * 控制器命令路由选项装饰器类
 * @description 用于从命令路由选项中提取指定字段值的参数装饰器，继承自 AbstractParameterDecorator
 * @extends AbstractParameterDecorator<ControllerMethodCmdRouteOptionsMetadata>
 * @example
 * ```typescript
 * class UserController {
 *   @Method('createUser')
 *   createUser(
 *     @Options('name') name: string,
 *     @Options(['age', 'years']) age: number,
 *     @Options({ name: 'email', optional: false }) email: string
 *   ) {
 *     // name, age, email 将从命令选项中提取
 *     console.log(name, age, email);
 *   }
 * }
 * ```
 */
export class ControllerCmdRouteOptionsDecorator extends AbstractParameterDecorator<ControllerMethodCmdRouteOptionsMetadata> {
  /**
   * 构造函数
   * @description 创建控制器命令路由选项装饰器实例
   * @param key - 元数据键，默认为 CONTROLLER_METHOD_PARAM_CMDROUTEOPTIONS_METADATA
   */
  constructor(key: string | symbol = CONTROLLER_METHOD_PARAM_CMDROUTEOPTIONS_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数重载 - 字符串参数
   * @description 使用单个字段名提取选项值
   * @param paramKey - 选项字段名
   * @returns 参数装饰器函数
   */
  handler(paramKey: string): ParameterDecorator;

  /**
   * 装饰器处理函数重载 - 字符串数组参数
   * @description 使用多个字段名提取选项值（优先级顺序）
   * @param paramKey - 选项字段名数组
   * @returns 参数装饰器函数
   */
  handler(paramKey: string[]): ParameterDecorator;

  /**
   * 装饰器处理函数重载 - 选项配置对象
   * @description 使用完整的选项配置
   * @param options - 选项配置对象
   * @returns 参数装饰器函数
   */
  handler(options: ControllerMethodCmdRouteOptions): ParameterDecorator;

  /**
   * 装饰器处理函数实现
   * @description 返回用于标记参数从命令选项中提取指定字段值的装饰器函数
   * @param paramKeyOrOptions - 字段名、字段名数组或选项配置对象
   * @returns 参数装饰器函数
   * @example
   * ```typescript
   * // 单个字段
   * @Options('name') name: string
   *
   * // 多个字段（按优先级）
   * @Options(['age', 'years']) age: number
   *
   * // 完整配置
   * @Options({ name: 'email', optional: false, default: 'default@example.com' }) email: string
   * ```
   */
  handler(paramKeyOrOptions?: string | string[] | ControllerMethodCmdRouteOptions) {
    return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
      const methodNames: Array<string | symbol> =
        Reflect.getOwnMetadata(CONTROLLER_METHOD_NAME_METADATA, target, propertyKey) ?? [];
      methodNames.push(propertyKey);
      Reflect.defineMetadata(CONTROLLER_METHOD_NAME_METADATA, [...new Set(methodNames)], target);

      const paramsMetadata: ControllerMethodCmdRouteOptionsMetadata =
        Reflect.getOwnMetadata(this.key, target, propertyKey) ?? {};
      if (isString(paramKeyOrOptions) || isArray(paramKeyOrOptions)) {
        paramsMetadata[parameterIndex] = paramKeyOrOptions;
      }
      if (isPlainObject(paramKeyOrOptions)) {
        const options = paramKeyOrOptions as ControllerMethodCmdRouteOptions;
        options.parameterType = options.parameterType ?? [];
        options.description = options.description ?? '';
        options.default = options.default ?? undefined;
        options.optional = options.optional ?? true;
        options.choices = options.choices ?? [];
        paramsMetadata[parameterIndex] = options as Required<ControllerMethodCmdRouteOptions>;
      }
      Reflect.defineMetadata(this.key, paramsMetadata, target, propertyKey);
    };
  }

  /**
   * 装饰器回调函数
   * @description 从命令信息中提取指定字段的选项值
   * @param value - 字段名、字段名数组或选项配置对象
   * @returns 回调函数，用于从命令信息中提取选项值
   * @example
   * ```typescript
   * // 当 value 为 'name' 时，返回 options.name
   * // 当 value 为 ['age', 'years'] 时，返回第一个存在的值
   * // 当 value 为配置对象时，根据配置提取对应字段值
   * ```
   */
  callback(value: ControllerMethodCmdRouteOptions | string[] | string) {
    return (_ctx: ApplicationContext, cmdInfo: CmdpInfo) => {
      // 合并字段并解析
      let filedNames: string[] = [];
      if (isObject(value)) {
        filedNames = [...filedNames, (value as ControllerMethodCmdRouteOptions).name];
      }
      if (isString(value)) {
        filedNames.push(value);
      }
      if (isArray(value)) {
        filedNames = [...filedNames, ...value];
      }
      const { payload } = cmdInfo;
      const options = isObject(payload) ? payload.options : null;
      if (!filedNames.length) return options;
      return filedNames
        .map((filed) => {
          return isObject(options) ? (options as AnyObject)[filed] : undefined;
        })
        .find((v) => v !== undefined);
    };
  }
}
