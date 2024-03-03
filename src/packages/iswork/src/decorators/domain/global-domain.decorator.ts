import { GLOBAL_DOMAIN_METADATA } from '../../constants';
import { AbstractClassDecorator } from '../abstract-decorator';

/**
 * 将Domain类设置为全局的装饰器
 */
export class GlobalDomainDecorator extends AbstractClassDecorator<boolean> {
  constructor(key: string | symbol = GLOBAL_DOMAIN_METADATA) {
    super(key);
  }

  handler() {
    return (target: Function) => {
      Reflect.defineMetadata(this.key, true, target);
    };
  }

  callback() {}
}
