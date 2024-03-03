/**
 * 管道函数管理及执行
 */
export type TPipeKey = string | symbol;
export class PipeManager {
  readonly #pipeMap = new Map<TPipeKey, Function>();
  get(key: TPipeKey) {
    return this.#pipeMap.get(key);
  }

  getAllRecord(): Record<string | symbol, Function> {
    return Array.from(this.#pipeMap.entries()).reduce<Record<string | symbol, Function>>((record, [k, fn]) => {
      record[k] = fn;
      return record;
    }, {});
  }

  add(key: TPipeKey, pipe: Function) {
    this.#pipeMap.set(key, pipe);
  }

  remove(key: TPipeKey) {
    this.#pipeMap.delete(key);
  }

  execute(key: TPipeKey, args: unknown[] = []) {
    const fn = this.get(key);
    if (fn) {
      return fn.apply(null, args);
    }
    return args[0];
  }

  flowExecute(pipes: Array<{ key: TPipeKey; args?: unknown[] }>) {
    let result: unknown;
    pipes.forEach(({ key, args }, index) => {
      if (!args) args = [];
      result = this.execute(key, index > 0 ? [result, ...args] : args);
    });
    return result;
  }
}
