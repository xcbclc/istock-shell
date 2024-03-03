import { DOMAIN_METADATA } from '../../constants';
import { AbstractClassDecorator } from '../abstract-decorator';
import type { TDomainMetadata } from '../../types';

/**
 * Domain类的装饰器
 */
export class DomainDecorator extends AbstractClassDecorator<TDomainMetadata> {
  constructor(key: string | symbol = DOMAIN_METADATA) {
    super(key);
  }

  handler(metadata: TDomainMetadata) {
    return (target: Function) => {
      Reflect.defineMetadata(this.key, metadata, target);
    };
  }

  callback() {}
}
