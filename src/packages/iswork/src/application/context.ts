import { Cmdp } from '../cmdp';
import type { TApplicationContextOptions, TCmdpMessage } from '../types';
import type { Application } from './application';

/**
 * iswork的上下文对象
 */
export class ApplicationContext {
  readonly #app: Application;
  readonly #options: TApplicationContextOptions;
  cmdp: Cmdp;
  message: TCmdpMessage;

  get options() {
    return this.#options;
  }

  get app() {
    return this.#app;
  }

  constructor(app: Application, message: TCmdpMessage, options: TApplicationContextOptions = {}) {
    this.#app = app;
    this.#options = options;
    this.cmdp = new Cmdp(message);
    this.message = message;
    if (message.meta) this.cmdp.setMeta(message.meta);
    if (message.payload) this.cmdp.setPayload(message.payload);
  }

  static create(app: Application, message: TCmdpMessage, options: TApplicationContextOptions = {}) {
    return new this(app, message, options);
  }
}
