import { isArray, isObject, isString, ScopeError } from '@istock/util';
import type { TControllerMethodComponentAccept, TControllerMethodComponentMetadata, TCmdpInfo } from '../../types';
import { CONTROLLER_METHOD_COMPONENT_METADATA } from '../../constants';
import { AbstractMethodDecorator } from '../abstract-decorator';
import { EDecoratorCallbackType } from '../../enums';
import type { ApplicationContext } from '../../index';

/**
 * 控制器方法装饰器，定义控制器方法对应的组件元数据，方便数据展示
 */
export class ControllerComponentDecorator extends AbstractMethodDecorator<TControllerMethodComponentMetadata[]> {
  readonly callbackType = EDecoratorCallbackType.MethodResponse;
  constructor(key: string | symbol = CONTROLLER_METHOD_COMPONENT_METADATA) {
    super(key);
  }

  handler(name?: string): MethodDecorator;
  handler(options: TControllerMethodComponentMetadata | TControllerMethodComponentMetadata[]): MethodDecorator;
  handler(nameOrOptions?: string | TControllerMethodComponentMetadata | TControllerMethodComponentMetadata[]) {
    return (target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
      let data: TControllerMethodComponentMetadata[] = [];
      if (!nameOrOptions) nameOrOptions = 'anonymous';
      if (isString(nameOrOptions)) {
        data.push({ name: nameOrOptions });
      }
      if (isObject(nameOrOptions)) {
        data = isArray(nameOrOptions) ? nameOrOptions : [nameOrOptions];
      }
      const metaData: TControllerMethodComponentMetadata[] =
        Reflect.getOwnMetadata(this.key, target, propertyKey) ?? [];

      Reflect.defineMetadata(this.key, [...metaData, ...data], target, propertyKey);
      return descriptor;
    };
  }

  callback(value: TControllerMethodComponentMetadata[] = []) {
    return (_ctx: ApplicationContext, cmdInfo: TCmdpInfo, response: unknown) => {
      let res: TControllerMethodComponentAccept[] = [];
      if (typeof response !== 'object' || response === null) {
        // 基础类型
        res = [{ value: response }];
      } else if (typeof response === 'object' && !isArray(response)) {
        // 非数组对象
        res = [response as TControllerMethodComponentAccept];
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
          const meta: TControllerMethodComponentMetadata = value[index];
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
