/**
 * @fileoverview 控制器组件装饰器
 * @description 提供控制器方法组件元数据定义的装饰器功能，用于数据展示和组件渲染
 */

import { isArray, isObject, isString, ScopeError } from '@istock-shell/util';
import type { ControllerMethodComponentAccept, ControllerMethodComponentMetadata, CmdpInfo } from '../../types';
import { CONTROLLER_METHOD_COMPONENT_METADATA } from '../../constants';
import { AbstractMethodDecorator } from '../abstract-decorator';
import { DecoratorCallbackType } from '../../enums';
import type { ApplicationContext } from '../../index';

/**
 * 控制器组件装饰器类
 * @description 用于定义控制器方法对应的组件元数据的装饰器，方便数据展示和组件渲染
 * @extends AbstractMethodDecorator<ControllerMethodComponentMetadata[]>
 * @example
 * ```typescript
 * class UserController {
 *   @Component('UserList')
 *   @Method('list')
 *   listUsers() {
 *     return [{ name: 'John', age: 25 }];
 *   }
 *
 *   @Component({ name: 'UserCard', props: { theme: 'dark' } })
 *   @Method('detail')
 *   getUserDetail() {
 *     return { name: 'John', email: 'john@example.com' };
 *   }
 * }
 * ```
 */
export class ControllerComponentDecorator extends AbstractMethodDecorator<ControllerMethodComponentMetadata[]> {
  /**
   * 回调类型
   * @description 装饰器的回调类型，用于方法响应处理
   * @readonly
   */
  readonly callbackType = DecoratorCallbackType.MethodResponse;

  /**
   * 构造函数
   * @description 创建控制器组件装饰器实例
   * @param key - 元数据键，默认为 CONTROLLER_METHOD_COMPONENT_METADATA
   */
  constructor(key: string | symbol = CONTROLLER_METHOD_COMPONENT_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数（组件名称）
   * @description 创建一个带组件名称的方法装饰器
   * @param name - 组件名称
   * @returns 方法装饰器函数
   */
  handler(name?: string): MethodDecorator;
  /**
   * 装饰器处理函数（组件配置）
   * @description 创建一个带组件配置的方法装饰器
   * @param options - 组件元数据配置，可以是单个配置或配置数组
   * @returns 方法装饰器函数
   */
  handler(options: ControllerMethodComponentMetadata | ControllerMethodComponentMetadata[]): MethodDecorator;
  /**
   * 装饰器处理函数实现
   * @description 根据传入的参数类型，创建相应的组件装饰器
   * @param nameOrOptions - 组件名称或配置对象
   * @returns 方法装饰器函数
   * @example
   * ```typescript
   * // 使用组件名称
   * @Component('UserList')
   * method() {}
   *
   * // 使用配置对象
   * @Component({ name: 'UserCard', props: { theme: 'dark' } })
   * method() {}
   *
   * // 使用配置数组
   * @Component([{ name: 'Header' }, { name: 'Content' }])
   * method() {}
   * ```
   */
  handler(nameOrOptions?: string | ControllerMethodComponentMetadata | ControllerMethodComponentMetadata[]) {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      let data: ControllerMethodComponentMetadata[] = [];
      if (!nameOrOptions) nameOrOptions = 'anonymous';
      if (isString(nameOrOptions)) {
        data.push({ name: nameOrOptions });
      }
      if (isObject(nameOrOptions)) {
        data = isArray(nameOrOptions) ? nameOrOptions : [nameOrOptions];
      }
      const metaData: ControllerMethodComponentMetadata[] = Reflect.getOwnMetadata(this.key, target, propertyKey) ?? [];

      Reflect.defineMetadata(this.key, [...metaData, ...data], target, propertyKey);
      return descriptor;
    };
  }

  /**
   * 装饰器回调函数
   * @description 处理方法响应数据，将其转换为组件渲染所需的格式
   * @param value - 组件元数据配置数组
   * @returns 回调函数，用于处理方法响应并生成组件输出
   * @throws {ScopeError} 当方法返回数据和组件配置数量不匹配时抛出错误
   * @example
   * ```typescript
   * // 当方法返回 [{ name: 'John' }, { name: 'Jane' }]
   * // 且组件配置为 [{ name: 'UserCard' }, { name: 'UserCard' }]
   * // 将生成对应的组件输出格式
   * ```
   */
  callback(value: ControllerMethodComponentMetadata[] = []) {
    return (_ctx: ApplicationContext, cmdInfo: CmdpInfo, response: unknown) => {
      let res: ControllerMethodComponentAccept[] = [];
      if (typeof response !== 'object' || response === null) {
        // 基础类型
        res = [{ value: response }];
      } else if (typeof response === 'object' && !isArray(response)) {
        // 非数组对象
        res = [response as ControllerMethodComponentAccept];
      }
      if (isArray(response)) {
        res = res.map((item) => {
          if (item.props) return item;
          item.props = item;
          return item;
        });
      }
      if (value.length !== res.length) {
        throw new ScopeError(`iswork.${this.constructor.name}`, '方法返回数据和参数不匹配');
      }
      return {
        output: res.map((data, index) => {
          const meta: ControllerMethodComponentMetadata = value[index];
          const { component, extra: extraData, props: propsData, ...otherProps } = data;
          let { extra: extraMeta, props: propsMeta } = meta;
          const extra: Object = isObject(extraData) ? extraData : {};
          const props: Object = isObject(propsData) ? propsData : (otherProps ?? {});
          extraMeta = extraMeta ?? {};
          propsMeta = propsMeta ?? {};
          return {
            component: component ?? meta.name,
            props: { ...propsMeta, ...props },
            extra: { ...extraMeta, ...extra },
            messageId: cmdInfo.returnMeta?.messageId,
          };
        }),
      };
    };
  }
}
