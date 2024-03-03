import type { TIdAnyObject, TModelType } from '../../types';

/**
 * 内存表相关操作
 */
export class MemoryTable<Type extends TIdAnyObject> {
  #list: Type[];

  readonly #tableName: string;

  get tableName() {
    return this.#tableName;
  }

  constructor(tableName: string) {
    this.#tableName = tableName;
    this.#list = [];
  }

  createTable(): void {
    this.#list = [];
  }

  dropTable(): void {
    this.#list = [];
  }

  insertData(record: Type): string | number {
    this.#list.push(record);
    return record.id;
  }

  updateById(id: number | string, updatedRecord: Partial<Type>) {
    const index = this.#list.findIndex((record) => record.id === id);
    if (index === -1) {
      this.#list[index] = { ...this.#list[index], ...updatedRecord };
    }
  }

  deleteById(id: number | string): void {
    this.#list = this.#list.filter((record) => record.id !== id);
  }

  queryByFilter(condition: (record: Type) => boolean): Type[] {
    return this.#list.filter(condition);
  }

  sortData(field: keyof Type): void {
    this.#list.sort((a, b) => (a[field] > b[field] ? 1 : -1));
  }

  paginateData(page: number, pageSize: number): Type[] {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return this.#list.slice(start, end);
  }

  countData(): number {
    return this.#list.length;
  }

  /**
   * 执行自定义操作
   * @param callback
   */
  execute(callback: Function) {
    // eslint-disable-next-line no-useless-call
    return callback.call(null, this, this.#list);
  }
}

export class MemoryDB extends Map<TModelType, MemoryTable<TIdAnyObject>> {
  readonly #dbName: string;

  get dbName() {
    return this.#dbName;
  }

  constructor(dbName: string) {
    super();
    this.#dbName = dbName;
  }
}
