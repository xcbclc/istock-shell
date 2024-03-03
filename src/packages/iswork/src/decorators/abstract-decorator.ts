import type { Decorator, IAnyClass } from '../interfaces';
import { EDecoratorCallbackType, EDecoratorType } from '../enums';

export abstract class AbstractDecorator implements Decorator {
  protected key: symbol | string;
  abstract decoratorType: EDecoratorType;
  readonly callbackType: EDecoratorCallbackType = EDecoratorCallbackType.None;
  readonly sort: number = 0;
  get metaKey() {
    return this.key;
  }

  constructor(key: symbol | string) {
    this.key = key;
  }
  abstract callback(...args: unknown[]): unknown;
  abstract getMetadata(...args: unknown[]): unknown;
  abstract handler(...args: unknown[]): unknown;
}

/**
 * 类装饰器抽象类
 */
export abstract class AbstractClassDecorator<MType = unknown> extends AbstractDecorator {
  readonly #decoratorType = EDecoratorType.Class;
  get decoratorType() {
    return this.#decoratorType;
  }

  protected constructor(key: symbol | string) {
    super(key);
  }

  abstract handler(...args: unknown[]): ClassDecorator;

  getMetadata(target: IAnyClass): MType | undefined {
    return Reflect.getMetadata(this.key, target);
  }

  abstract callback(...args: unknown[]): unknown;
}

/**
 * 属性装饰器抽象类
 */
export abstract class AbstractPropertyDecorator<MType = unknown> extends AbstractDecorator {
  readonly #decoratorType = EDecoratorType.Property;
  get decoratorType() {
    return this.#decoratorType;
  }

  protected constructor(key: symbol | string) {
    super(key);
  }

  /**
   * {@inheritdoc}
   */
  abstract handler(...args: unknown[]): PropertyDecorator;
  /**
   * {@inheritdoc}
   */
  getMetadata(target: IAnyClass): MType | undefined {
    return Reflect.getMetadata(this.key, target);
  }
  /**
   * {@inheritdoc}
   */
  abstract callback(...args: unknown[]): unknown;
}

/**
 * 方法装饰器抽象类
 */
export abstract class AbstractMethodDecorator<MType = unknown> extends AbstractDecorator {
  readonly #decoratorType = EDecoratorType.Method;
  get decoratorType() {
    return this.#decoratorType;
  }

  protected constructor(key: symbol | string) {
    super(key);
  }

  abstract handler(...args: unknown[]): MethodDecorator;

  getMetadata(target: IAnyClass, propertyKey: string | symbol): MType | undefined {
    return Reflect.getMetadata(this.key, target, propertyKey);
  }

  abstract callback(...args: unknown[]): unknown;
}

/**
 * 参数装饰器抽象类
 */
export abstract class AbstractParameterDecorator<MType = unknown> extends AbstractDecorator {
  readonly #decoratorType = EDecoratorType.Parameter;
  get decoratorType() {
    return this.#decoratorType;
  }

  protected constructor(key: symbol | string) {
    super(key);
  }

  abstract handler(...args: unknown[]): ParameterDecorator;

  getMetadata(target: IAnyClass, propertyKey: string | symbol): MType | undefined {
    return Reflect.getMetadata(this.key, target, propertyKey);
  }

  abstract callback(...args: unknown[]): unknown;
}
