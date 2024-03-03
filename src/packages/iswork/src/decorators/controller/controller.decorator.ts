import { isObject } from '@istock/util';
import type { TControllerMetadata } from '../../types';
import { CONTROLLER_METADATA } from '../../constants';
import { AbstractClassDecorator } from '../abstract-decorator';

/**
 * 控制器类的装饰器从，定义和获取控制器类元数据
 */
export class ControllerDecorator extends AbstractClassDecorator<TControllerMetadata> {
  constructor(key: string | symbol = CONTROLLER_METADATA) {
    super(key);
  }

  handler(): ClassDecorator;
  handler(alias: string | string[]): ClassDecorator;
  handler(options: TControllerMetadata): ClassDecorator;
  handler(aliasOrOptions?: string | string[] | TControllerMetadata) {
    return (target: Function) => {
      if (!isObject(aliasOrOptions)) {
        aliasOrOptions = { alias: aliasOrOptions ?? target.name };
      }
      Reflect.defineMetadata(this.key, aliasOrOptions, target);
    };
  }

  callback() {}
}
