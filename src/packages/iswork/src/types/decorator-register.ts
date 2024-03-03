import type { EDecoratorType, EDecoratorCallbackType } from '../enums';

export type TDecoratorCallbackCacheValue = {
  key: string | symbol;
  decoratorType: EDecoratorType;
  fn: Function;
  type: EDecoratorCallbackType;
};
