/**
 * @fileoverview 管道函数管理器
 * @description 提供管道函数的注册、管理和执行功能，支持单个管道执行和流式管道执行
 */

/**
 * 管道键类型
 * @description 管道函数的唯一标识符，可以是字符串或符号
 */
export type TPipeKey = string | symbol;

/**
 * 管道函数管理器
 * @description 管理和执行管道函数的核心类，支持管道的注册、删除、单个执行和流式执行
 * @example
 * ```typescript
 * const pipeManager = new PipeManager();
 *
 * // 添加管道函数
 * pipeManager.add('uppercase', (str: string) => str.toUpperCase());
 * pipeManager.add('addPrefix', (str: string, prefix: string) => `${prefix}${str}`);
 *
 * // 单个执行
 * const result = pipeManager.execute('uppercase', ['hello']); // 'HELLO'
 *
 * // 流式执行
 * const flowResult = pipeManager.flowExecute([
 *   { key: 'uppercase', args: ['hello'] },
 *   { key: 'addPrefix', args: ['Mr. '] }
 * ]); // 'Mr. HELLO'
 * ```
 */
export class PipeManager {
  /** 管道函数映射表 */
  readonly #pipeMap = new Map<TPipeKey, Function>();

  /**
   * 获取管道函数
   * @description 根据键获取对应的管道函数
   * @param key 管道键
   * @returns 管道函数，如果不存在则返回 undefined
   */
  get(key: TPipeKey) {
    return this.#pipeMap.get(key);
  }

  /**
   * 获取所有管道函数记录
   * @description 将所有管道函数转换为记录对象格式
   * @returns 包含所有管道函数的记录对象
   */
  getAllRecord(): Record<string | symbol, Function> {
    return Array.from(this.#pipeMap.entries()).reduce<Record<string | symbol, Function>>((record, [k, fn]) => {
      record[k] = fn;
      return record;
    }, {});
  }

  /**
   * 添加管道函数
   * @description 注册一个新的管道函数
   * @param key 管道键，用于标识管道函数
   * @param pipe 管道函数
   */
  add(key: TPipeKey, pipe: Function) {
    this.#pipeMap.set(key, pipe);
  }

  /**
   * 移除管道函数
   * @description 根据键移除对应的管道函数
   * @param key 管道键
   */
  remove(key: TPipeKey) {
    this.#pipeMap.delete(key);
  }

  /**
   * 执行管道函数
   * @description 根据键执行对应的管道函数
   * @param key 管道键
   * @param args 传递给管道函数的参数数组，默认为空数组
   * @returns 管道函数的执行结果，如果管道不存在则返回第一个参数
   */
  execute(key: TPipeKey, args: unknown[] = []) {
    const fn = this.get(key);
    if (fn) {
      return fn.apply(null, args);
    }
    return args[0];
  }

  /**
   * 流式执行管道函数
   * @description 按顺序执行多个管道函数，前一个管道的结果作为后一个管道的第一个参数
   * @param pipes 管道配置数组，每个配置包含管道键和可选的额外参数
   * @returns 最后一个管道函数的执行结果
   * @example
   * ```typescript
   * const result = pipeManager.flowExecute([
   *   { key: 'trim', args: ['  hello  '] },
   *   { key: 'uppercase' },
   *   { key: 'addPrefix', args: ['Mr. '] }
   * ]);
   * // 执行流程: trim('  hello  ') -> uppercase('hello') -> addPrefix('HELLO', 'Mr. ')
   * // 结果: 'Mr. HELLO'
   * ```
   */
  flowExecute(pipes: Array<{ key: TPipeKey; args?: unknown[] }>) {
    let result: unknown;
    pipes.forEach(({ key, args }, index) => {
      if (!args) args = [];
      result = this.execute(key, index > 0 ? [result, ...args] : args);
    });
    return result;
  }
}
