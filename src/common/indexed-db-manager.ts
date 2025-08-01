import { openDB, type IDBPDatabase } from 'idb';
import { ScopeError } from '@istock-shell/util';

/**
 * IndexedDB 数据库管理类
 * 提供数据库的导入、导出、备份等功能
 */
export class IndexedDBManager {
  private dbName: string;
  private version: number;
  private db: IDBPDatabase | null = null;

  constructor(dbName: string, version: number) {
    this.dbName = dbName;
    this.version = version;
  }

  /**
   * 连接数据库
   */
  async connect(): Promise<void> {
    try {
      this.db = await openDB(this.dbName, this.version);
    } catch (error) {
      throw new ScopeError('IndexedDBManager', `连接数据库失败: ${error}`);
    }
  }

  /**
   * 获取数据库中所有对象存储的名称
   */
  getStoreNames(): string[] {
    if (!this.db) {
      throw new ScopeError('IndexedDBManager', '数据库未连接');
    }
    return Array.from(this.db.objectStoreNames);
  }

  /**
   * 导出指定对象存储的所有数据
   */
  async exportStore(storeName: string): Promise<any[]> {
    if (!this.db) {
      throw new ScopeError('IndexedDBManager', '数据库未连接');
    }

    const tx = this.db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const data = await store.getAll();
    await tx.done;
    return data;
  }

  /**
   * 导出整个数据库的所有数据
   */
  async exportDatabase(): Promise<Record<string, any[]>> {
    if (!this.db) {
      throw new ScopeError('IndexedDBManager', '数据库未连接');
    }

    const storeNames = this.getStoreNames();
    const exportData: Record<string, any[]> = {};

    for (const storeName of storeNames) {
      try {
        exportData[storeName] = await this.exportStore(storeName);
      } catch (error) {
        console.warn(`导出存储 ${storeName} 失败:`, error);
        exportData[storeName] = [];
      }
    }

    return exportData;
  }

  /**
   * 导入数据到指定对象存储
   */
  async importStore(storeName: string, data: any[], clearFirst: boolean = false): Promise<void> {
    if (!this.db) {
      throw new ScopeError('IndexedDBManager', '数据库未连接');
    }

    const tx = this.db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    if (clearFirst) {
      await store.clear();
    }

    for (const item of data) {
      try {
        await store.put(item);
      } catch (error) {
        console.warn(`导入数据项失败:`, item, error);
      }
    }

    await tx.done;
  }

  /**
   * 导入整个数据库数据
   */
  async importDatabase(data: Record<string, any[]>, clearFirst: boolean = false): Promise<void> {
    if (!this.db) {
      throw new ScopeError('IndexedDBManager', '数据库未连接');
    }

    const storeNames = this.getStoreNames();

    for (const [storeName, storeData] of Object.entries(data)) {
      if (storeNames.includes(storeName)) {
        try {
          await this.importStore(storeName, storeData, clearFirst);
        } catch (error) {
          console.warn(`导入存储 ${storeName} 失败:`, error);
        }
      } else {
        console.warn(`存储 ${storeName} 不存在，跳过导入`);
      }
    }
  }

  /**
   * 清空指定对象存储
   */
  async clearStore(storeName: string): Promise<void> {
    if (!this.db) {
      throw new ScopeError('IndexedDBManager', '数据库未连接');
    }

    const tx = this.db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.clear();
    await tx.done;
  }

  /**
   * 清空整个数据库
   */
  async clearDatabase(): Promise<void> {
    if (!this.db) {
      throw new ScopeError('IndexedDBManager', '数据库未连接');
    }

    const storeNames = this.getStoreNames();
    for (const storeName of storeNames) {
      try {
        await this.clearStore(storeName);
      } catch (error) {
        console.warn(`清空存储 ${storeName} 失败:`, error);
      }
    }
  }

  /**
   * 获取数据库存储信息
   */
  async getDatabaseInfo(): Promise<{
    dbName: string;
    version: number;
    stores: Array<{
      name: string;
      count: number;
      size: number;
    }>;
    totalSize: number;
  }> {
    if (!this.db) {
      throw new ScopeError('IndexedDBManager', '数据库未连接');
    }

    const storeNames = this.getStoreNames();
    const stores = [];
    let totalSize = 0;

    for (const storeName of storeNames) {
      try {
        const tx = this.db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const count = await store.count();
        const data = await store.getAll();
        const size = new Blob([JSON.stringify(data)]).size;

        stores.push({
          name: storeName,
          count,
          size,
        });

        totalSize += size;
        await tx.done;
      } catch (error) {
        console.warn(`获取存储 ${storeName} 信息失败:`, error);
        stores.push({
          name: storeName,
          count: 0,
          size: 0,
        });
      }
    }

    return {
      dbName: this.dbName,
      version: this.version,
      stores,
      totalSize,
    };
  }

  /**
   * 创建数据备份
   */
  async createBackup(): Promise<{
    timestamp: number;
    dbName: string;
    version: number;
    data: Record<string, any[]>;
  }> {
    const data = await this.exportDatabase();
    return {
      timestamp: Date.now(),
      dbName: this.dbName,
      version: this.version,
      data,
    };
  }

  /**
   * 从备份恢复数据
   */
  async restoreFromBackup(
    backup: {
      timestamp: number;
      dbName: string;
      version: number;
      data: Record<string, any[]>;
    },
    clearFirst: boolean = true
  ): Promise<void> {
    if (backup.dbName !== this.dbName) {
      throw new ScopeError('IndexedDBManager', '备份数据库名称不匹配');
    }

    await this.importDatabase(backup.data, clearFirst);
  }

  /**
   * 关闭数据库连接
   */
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}
