import { dbUtils } from '@/common/db-utils';
import { StoreWindow, type StoreConfig } from '@/store';
import type { CmdWindow } from '@/window';

// 数据库信息类型
export interface DbInfo {
  dbName: string;
  version: number;
  stores: Array<{ name: string; count: number; size: number }>;
  totalSize: number;
  isConnected: boolean;
  isLoading: boolean;
}

// 操作状态类型
export interface OperationStatus {
  isExporting: boolean;
  isImporting: boolean;
  isClearing: boolean;
}

// 数据库配置模型
export interface IndexedDbConfigModel {
  autoBackup: boolean;
}

export class IndexedDbConfig extends StoreWindow<IndexedDbConfigModel> {
  // 简化的设置
  public autoBackup: boolean = $state(true);

  // 数据库信息
  public dbInfo = $state<DbInfo>({
    dbName: '',
    version: 0,
    stores: [],
    totalSize: 0,
    isConnected: false,
    isLoading: false,
  });

  // 操作状态
  public operationStatus = $state<OperationStatus>({
    isExporting: false,
    isImporting: false,
    isClearing: false,
  });

  constructor(cmdWindow: CmdWindow, config: StoreConfig<IndexedDbConfigModel> = {}) {
    super(cmdWindow, config);
  }

  protected async init() {
    // 初始化时连接数据库
    await this.connectDatabase();
  }

  // 连接数据库
  async connectDatabase() {
    try {
      this.dbInfo.isLoading = true;
      await this.cmdWindow.indexedDBManager.connect();
      this.dbInfo.isConnected = true;
      await this.refreshDatabaseInfo();
    } catch (error) {
      console.error('连接数据库失败:', error);
      this.dbInfo.isConnected = false;
      throw error; // 让调用方处理错误提示
    } finally {
      this.dbInfo.isLoading = false;
    }
  }

  // 刷新数据库信息
  async refreshDatabaseInfo() {
    if (!this.dbInfo.isConnected) return;

    try {
      const info = await this.cmdWindow.indexedDBManager.getDatabaseInfo();
      this.dbInfo.dbName = info.dbName;
      this.dbInfo.version = info.version;
      this.dbInfo.stores = info.stores.map((item) => {
        item.size = dbUtils.formatFileSize(item.size);
        return item;
      });
      this.dbInfo.totalSize = info.totalSize;
    } catch (error) {
      console.error('获取数据库信息失败:', error);
      throw error; // 让调用方处理错误提示
    }
  }

  // 导出数据库
  async exportDatabase() {
    if (!this.dbInfo.isConnected || this.operationStatus.isExporting) return;

    try {
      this.operationStatus.isExporting = true;
      const backup = await this.cmdWindow.indexedDBManager.createBackup();
      const filename = `istock-database-backup-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
      dbUtils.downloadJSON(backup, filename);
      return { success: true, message: '数据导出成功！' };
    } catch (error) {
      console.error('导出数据库失败:', error);
      throw error; // 让调用方处理错误提示
    } finally {
      this.operationStatus.isExporting = false;
    }
  }

  // 导入数据库
  async importDatabase(confirmCallback?: (message: string) => Promise<boolean>) {
    if (!this.dbInfo.isConnected || this.operationStatus.isImporting) return;

    return new Promise<{ success: boolean; message: string }>((resolve, reject) => {
      try {
        // 创建文件输入元素
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = async (event) => {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (!file) {
            resolve({ success: false, message: '未选择文件' });
            return;
          }

          try {
            this.operationStatus.isImporting = true;

            // 读取文件内容
            const text = await file.text();
            const backupData = JSON.parse(text);

            // 验证备份数据格式
            if (!backupData || typeof backupData !== 'object') {
              throw new Error('无效的备份文件格式');
            }

            // 确认导入操作
            const confirmMessage = `确定要导入数据吗？\n\n此操作将：\n- 清空当前所有数据\n- 导入备份文件中的数据\n\n此操作不可恢复！`;

            let confirmed = true;
            if (confirmCallback) {
              confirmed = await confirmCallback(confirmMessage);
            }

            if (confirmed) {
              // 执行导入
              await this.cmdWindow.indexedDBManager.restoreFromBackup(backupData);
              await this.refreshDatabaseInfo();
              resolve({ success: true, message: '数据导入成功！' });
            } else {
              resolve({ success: false, message: '用户取消导入' });
            }
          } catch (error) {
            console.error('导入数据库失败:', error);
            reject(error);
          } finally {
            this.operationStatus.isImporting = false;
          }
        };

        // 触发文件选择
        input.click();
      } catch (error) {
        console.error('导入数据库失败:', error);
        this.operationStatus.isImporting = false;
        reject(error);
      }
    });
  }

  // 清理数据
  async clearData(confirmCallback?: (message: string) => Promise<boolean>) {
    if (!this.dbInfo.isConnected || this.operationStatus.isClearing) return;

    const confirmMessage =
      '确定要清理所有本地数据吗？\n\n此操作将删除：\n- 所有数据库记录\n- 所有本地缓存\n\n此操作不可恢复！';

    let confirmed = true;
    if (confirmCallback) {
      confirmed = await confirmCallback(confirmMessage);
    }

    if (confirmed) {
      try {
        this.operationStatus.isClearing = true;
        await this.cmdWindow.indexedDBManager.clearDatabase();
        await this.refreshDatabaseInfo();
        return { success: true, message: '数据清理完成！' };
      } catch (error) {
        console.error('清理数据失败:', error);
        throw error; // 让调用方处理错误提示
      } finally {
        this.operationStatus.isClearing = false;
      }
    }
    return { success: false, message: '用户取消清理' };
  }

  protected async save(data?: IndexedDbConfigModel): Promise<void> {
    // 可以在这里实现自动保存逻辑
    // 目前暂时不需要保存到服务器
  }
}
