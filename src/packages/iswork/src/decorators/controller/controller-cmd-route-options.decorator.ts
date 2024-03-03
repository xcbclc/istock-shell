import { isArray, isObject, isPlainObject, isString } from '@istock/util';
import type {
  TControllerMethodCmdRouteOptions,
  TControllerMethodCmdRouteOptionsMetadata,
  TCmdpInfo,
  TAnyObject,
} from '../../types';
import { CONTROLLER_METHOD_NAME_METADATA, CONTROLLER_METHOD_PARAM_CMDROUTEOPTIONS_METADATA } from '../../constants';
import type { ApplicationContext } from '../../application/context';
import { AbstractParameterDecorator } from '../abstract-decorator';

/**
 * 控制器路由参数装饰器，定义和获取路由命令选项参数
 */
export class ControllerCmdRouteOptionsDecorator extends AbstractParameterDecorator<TControllerMethodCmdRouteOptionsMetadata> {
  constructor(key: string | symbol = CONTROLLER_METHOD_PARAM_CMDROUTEOPTIONS_METADATA) {
    super(key);
  }

  handler(paramKey: string): ParameterDecorator;
  handler(paramKey: string[]): ParameterDecorator;
  handler(options: TControllerMethodCmdRouteOptions): ParameterDecorator;
  handler(paramKeyOrOptions: string | string[] | TControllerMethodCmdRouteOptions) {
    return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
      const methodNames: Array<string | symbol> =
        Reflect.getOwnMetadata(CONTROLLER_METHOD_NAME_METADATA, target, propertyKey) ?? [];
      methodNames.push(propertyKey);
      Reflect.defineMetadata(CONTROLLER_METHOD_NAME_METADATA, [...new Set(methodNames)], target);

      const paramsMetadata: TControllerMethodCmdRouteOptionsMetadata =
        Reflect.getOwnMetadata(this.key, target, propertyKey) ?? {};
      if (isString(paramKeyOrOptions) || isArray(paramKeyOrOptions)) {
        paramsMetadata[parameterIndex] = paramKeyOrOptions;
      }
      if (isPlainObject(paramKeyOrOptions)) {
        const options = paramKeyOrOptions as TControllerMethodCmdRouteOptions;
        options.parameterType = options.parameterType ?? [];
        options.description = options.description ?? '';
        options.default = options.default ?? undefined;
        options.optional = options.optional ?? true;
        options.choices = options.choices ?? [];
        paramsMetadata[parameterIndex] = options as Required<TControllerMethodCmdRouteOptions>;
      }
      Reflect.defineMetadata(this.key, paramsMetadata, target, propertyKey);
    };
  }

  callback(value: TControllerMethodCmdRouteOptions | string[] | string) {
    return (_ctx: ApplicationContext, cmdInfo: TCmdpInfo) => {
      // 合并字段并解析
      let filedNames: string[] = [];
      if (isObject(value)) {
        filedNames = [...filedNames, (value as TControllerMethodCmdRouteOptions).name];
      }
      if (isString(value)) {
        filedNames.push(value);
      }
      if (isArray(value)) {
        filedNames = [...filedNames, ...value];
      }
      const { payload } = cmdInfo;
      const options = isObject(payload) ? payload.options : null;
      return filedNames
        .map((filed) => {
          return isObject(options) ? (options as TAnyObject)[filed] : undefined;
        })
        .find((v) => v !== undefined);
    };
  }
}
