import type { IdAnyObject, ModelType } from '../../types';

/**
 * @fileoverview 内存数据库驱动实现，提供内存表和内存数据库的操作功能
 * @module MemoryDriver
 * @version 1.0.0
 */

/**
 * 内存表类，用于在内存中管理数据记录的增删改查操作
 *
 * @template Type - 继承自 IdAnyObject 的数据类型，必须包含 id 字段
 *
 * @example
 * ```typescript
 * interface User extends IdAnyObject {
 *   id: string;
 *   name: string;
 *   age: number;
 * }
 *
 * const userTable = new MemoryTable<User>('users');
 * userTable.insertData({ id: '1', name: 'John', age: 25 });
 * const users = userTable.queryByFilter(user => user.age > 20);
 * ```
 */
export class MemoryTable<Type extends IdAnyObject> {
  /**
   * 存储数据记录的私有数组
   * @private
   */
  #list: Type[];

  /**
   * 表名，只读属性
   * @private
   * @readonly
   */
  readonly #tableName: string;

  /**
   * 获取表名
   * @returns {string} 表名
   */
  get tableName() {
    return this.#tableName;
  }

  /**
   * 创建内存表实例
   * @param {string} tableName - 表名
   */
  constructor(tableName: string) {
    this.#tableName = tableName;
    this.#list = [];
  }

  /**
   * 创建表（清空所有数据）
   * @returns {void}
   */
  createTable(): void {
    this.#list = [];
  }

  /**
   * 删除表（清空所有数据）
   * @returns {void}
   */
  dropTable(): void {
    this.#list = [];
  }

  /**
   * 插入数据记录
   * @param {Type} record - 要插入的数据记录
   * @returns {string | number} 插入记录的 ID
   */
  insertData(record: Type): string | number {
    this.#list.push(record);
    return record.id;
  }

  /**
   * 根据 ID 更新数据记录
   * @param {number | string} id - 要更新的记录 ID
   * @param {Partial<Type>} updatedRecord - 更新的数据字段
   * @returns {void}
   */
  updateById(id: number | string, updatedRecord: Partial<Type>) {
    const index = this.#list.findIndex((record) => record.id === id);
    if (index === -1) {
      this.#list[index] = { ...this.#list[index], ...updatedRecord };
    }
  }

  /**
   * 根据 ID 删除数据记录
   * @param {number | string} id - 要删除的记录 ID
   * @returns {void}
   */
  deleteById(id: number | string): void {
    this.#list = this.#list.filter((record) => record.id !== id);
  }

  /**
   * 根据条件过滤查询数据
   * @param {(record: Type) => boolean} condition - 过滤条件函数
   * @returns {Type[]} 符合条件的数据记录数组
   */
  queryByFilter(condition: (record: Type) => boolean): Type[] {
    return this.#list.filter(condition);
  }

  /**
   * 根据指定字段对数据进行排序（升序）
   * @param {keyof Type} field - 排序字段
   * @returns {void}
   */
  sortData(field: keyof Type): void {
    this.#list.sort((a, b) => (a[field] > b[field] ? 1 : -1));
  }

  /**
   * 分页查询数据
   * @param {number} page - 页码（从 1 开始）
   * @param {number} pageSize - 每页数据量
   * @returns {Type[]} 指定页的数据记录数组
   */
  paginateData(page: number, pageSize: number): Type[] {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return this.#list.slice(start, end);
  }

  /**
   * 获取数据总数
   * @returns {number} 数据记录总数
   */
  countData(): number {
    return this.#list.length;
  }

  /**
   * 执行自定义操作
   * @param {Function} callback - 回调函数，接收表实例和数据列表作为参数
   * @returns {any} 回调函数的返回值
   */
  execute(callback: Function) {
    return callback.call(null, this, this.#list);
  }
}

/**
 * 内存数据库类，继承自 Map，用于管理多个内存表
 *
 * @extends {Map<ModelType, MemoryTable<IdAnyObject>>}
 *
 * @example
 * ```typescript
 * const memoryDB = new MemoryDB('testDB');
 * const userTable = new MemoryTable<User>('users');
 * memoryDB.set('User', userTable);
 * ```
 */
export class MemoryDB extends Map<ModelType, MemoryTable<IdAnyObject>> {
  /**
   * 数据库名称，只读属性
   * @private
   * @readonly
   */
  readonly #dbName: string;

  /**
   * 获取数据库名称
   * @returns {string} 数据库名称
   */
  get dbName() {
    return this.#dbName;
  }

  /**
   * 创建内存数据库实例
   * @param {string} dbName - 数据库名称
   */
  constructor(dbName: string) {
    super();
    this.#dbName = dbName;
  }
}
