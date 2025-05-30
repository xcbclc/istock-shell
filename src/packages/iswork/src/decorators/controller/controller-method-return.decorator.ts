import { isArray, isFunction, isObject, isString } from '@istock-shell/util';
import type { ControllerMethodReturnMetadata, CmdpInfo } from '../../types';
import { CONTROLLER_METHOD_RETURN_METADATA } from '../../constants';
import { AbstractMethodDecorator } from '../abstract-decorator';
import { DecoratorCallbackType } from '../../enums';
import type { ApplicationContext } from '../../index';

/**
 * 控制器方法装饰器 - 返回数据处理
 * @description 用于定义控制器方法返回数据的处理逻辑，支持管道流处理和数据转换
 * @example
 * ```typescript
 * @Controller()
 * export class MyController {
 *   // 使用单个管道处理返回数据
 *   @Return('jsonPipe')
 *   async getData() {
 *     return { data: 'raw data' };
 *   }
 *
 *   // 使用多个管道处理返回数据
 *   @Return([
 *     { name: 'validatePipe', args: ['strict'] },
 *     { name: 'transformPipe', args: [(ctx, cmd) => ctx.user.id] }
 *   ])
 *   async getProcessedData() {
 *     return { result: 'processed data' };
 *   }
 * }
 * ```
 */
export class ControllerMethodReturnDecorator extends AbstractMethodDecorator<ControllerMethodReturnMetadata[]> {
  /** 装饰器回调类型，标识为方法响应类型 */
  readonly callbackType = DecoratorCallbackType.MethodResponse;

  /**
   * 构造函数
   * @param key - 元数据键，默认为 CONTROLLER_METHOD_RETURN_METADATA
   */
  constructor(key: string | symbol = CONTROLLER_METHOD_RETURN_METADATA) {
    super(key);
  }

  /**
   * 装饰器处理函数重载 - 管道名称
   * @param pipeName - 管道名称
   * @returns 方法装饰器函数
   */
  handler(pipeName: string): MethodDecorator;
  /**
   * 装饰器处理函数重载 - 配置选项
   * @param options - 返回数据处理配置选项
   * @returns 方法装饰器函数
   */
  handler(options: ControllerMethodReturnMetadata | ControllerMethodReturnMetadata[]): MethodDecorator;
  /**
   * 装饰器处理函数实现
   * @description 创建方法装饰器，用于配置返回数据的处理管道
   * @param nameOrOptions - 管道名称或配置选项
   * @returns 方法装饰器函数
   */
  handler(nameOrOptions?: string | ControllerMethodReturnMetadata | ControllerMethodReturnMetadata[]) {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      let data: ControllerMethodReturnMetadata[] = [];
      if (isString(nameOrOptions)) {
        data.push({ name: nameOrOptions });
      }
      if (isObject(nameOrOptions)) {
        data = isArray(nameOrOptions) ? nameOrOptions : [nameOrOptions];
      }
      const metaData: ControllerMethodReturnMetadata[] = Reflect.getOwnMetadata(this.key, target, propertyKey) ?? [];

      Reflect.defineMetadata(this.key, [...metaData, ...data], target, propertyKey);
      return descriptor;
    };
  }

  /**
   * 回调函数
   * @description 在方法执行后处理返回数据，通过管道流进行数据转换
   * @param value - 返回数据处理配置数组
   * @returns 返回处理应用上下文、命令信息和响应数据的函数
   */
  callback(value: ControllerMethodReturnMetadata[] = []) {
    return (ctx: ApplicationContext, cmdInfo: CmdpInfo, response: unknown) => {
      if (value.length) {
        return ctx.app.pipeFlowExecute(
          value.map((item, index) => {
            const args = (item.args ?? []).map((arg) => {
              if (isFunction(arg)) return arg.call(this, ctx, cmdInfo);
              return arg;
            });
            // 第一个处理函数塞入response
            if (index === 0) {
              args.unshift(response);
            }
            return {
              key: item.name,
              args,
            };
          })
        );
      }
      return response;
    };
  }
}
