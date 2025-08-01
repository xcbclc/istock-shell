<script lang="ts" module>
  export interface DataConfigProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import {
    ShFieldSet,
    ShField,
    ShToggle,
    ShButton,
    ShIcon,
    ShStat,
    ShTable,
    ShAlert,
    shShowMessage,
  } from '@istock-shell/ui';
  import { dbUtils } from '@/common/db-utils';
  import { CmdWindowsManager } from '@/window';

  let { windowId }: DataConfigProps = $props();

  // 获取命令窗口实例
  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow(windowId);

  // 使用窗口存储中的数据库配置实例
  const dbConfig = cmdWindow.store.indexedDbConfig;

  // 数据库配置已在窗口存储启动时自动初始化，无需手动初始化

  // 导出数据库处理函数
  const handleExportDatabase = async () => {
    try {
      const result = await dbConfig.exportDatabase();
      if (result?.success) {
        shShowMessage.success(result.message);
      }
    } catch (error) {
      shShowMessage.error('导出数据库失败: ' + error);
    }
  };

  // 导入数据库处理函数
  const handleImportDatabase = async () => {
    try {
      const result = await dbConfig.importDatabase(async (message) => {
        return new Promise((resolve) => {
          const confirmed = confirm(message);
          resolve(confirmed);
        });
      });
      if (result?.success) {
        shShowMessage.success(result.message);
      }
      window.location.reload();
    } catch (error) {
      shShowMessage.error('导入数据库失败: ' + error);
    }
  };

  // 清理数据处理函数
  const handleClearData = async () => {
    try {
      const result = await dbConfig.clearData(async (message) => {
        return new Promise((resolve) => {
          const confirmed = confirm(message);
          resolve(confirmed);
        });
      });
      if (result?.success) {
        shShowMessage.success(result.message);
      }
    } catch (error) {
      shShowMessage.error('清理数据失败: ' + error);
    }
  };

  // 重新连接数据库处理函数
  const handleReconnectDatabase = async () => {
    try {
      await dbConfig.connectDatabase();
      shShowMessage.success('重新连接成功！');
    } catch (error) {
      shShowMessage.error('重新连接失败: ' + error);
    }
  };

  // 刷新数据库信息处理函数
  const handleRefreshDatabase = async () => {
    try {
      await dbConfig.refreshDatabaseInfo();
      shShowMessage.success('刷新成功！');
    } catch (error) {
      shShowMessage.error('刷新失败: ' + error);
    }
  };
</script>

<!-- 数据库配置管理 -->
<div class="space-y-6">
  <!-- 数据操作 -->
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="数据操作">
        <div class="flex flex-wrap gap-4">
          <ShButton
            color="primary"
            size="md"
            onclick={handleExportDatabase}
            disabled={!dbConfig.dbInfo.isConnected || dbConfig.operationStatus.isExporting}
          >
            <ShIcon name="download" class="w-4 h-4" />
            {dbConfig.operationStatus.isExporting ? '导出中...' : '导出数据'}
          </ShButton>

          <ShButton
            color="secondary"
            size="md"
            onclick={handleImportDatabase}
            disabled={!dbConfig.dbInfo.isConnected || dbConfig.operationStatus.isImporting}
          >
            <ShIcon name="upload" class="w-4 h-4" />
            {dbConfig.operationStatus.isImporting ? '导入中...' : '导入数据'}
          </ShButton>
          <ShButton
            color="error"
            size="md"
            onclick={handleClearData}
            disabled={!dbConfig.dbInfo.isConnected || dbConfig.operationStatus.isClearing}
          >
            <ShIcon name="trash" class="w-4 h-4" />
            {dbConfig.operationStatus.isClearing ? '清理中...' : '清理数据'}
          </ShButton>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <!-- 数据库状态 -->
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="数据库状态">
        <!-- 连接状态 -->
        <ShAlert type={dbConfig.dbInfo.isConnected ? 'success' : 'warning'} class="mb-4">
          <ShIcon name={dbConfig.dbInfo.isConnected ? 'check-circle' : 'exclamation-triangle'} class="w-5 h-5" />
          <span>
            {#if dbConfig.dbInfo.isLoading}
              正在连接数据库...
            {:else if dbConfig.dbInfo.isConnected}
              数据库已连接: {dbConfig.dbInfo.dbName} (版本 {dbConfig.dbInfo.version})
            {:else}
              数据库未连接
            {/if}
          </span>
          {#if !dbConfig.dbInfo.isConnected && !dbConfig.dbInfo.isLoading}
            <ShButton size="sm" color="warning" onclick={handleReconnectDatabase}>重新连接</ShButton>
          {/if}
        </ShAlert>

        {#if dbConfig.dbInfo.isConnected}
          <!-- 存储统计 -->
          <ShStat
            class="mb-6"
            list={[
              {
                title: '总存储大小',
                value: dbUtils.formatFileSize(dbConfig.dbInfo.totalSize),
                desc: '所有数据表大小',
              },
              {
                title: '数据表数量',
                value: dbConfig.dbInfo.stores.length.toString(),
                desc: 'IndexedDB 对象存储',
              },
              {
                title: '总记录数',
                value: dbConfig.dbInfo.stores.reduce((sum, store) => sum + store.count, 0).toString(),
                desc: '所有表记录总数',
              },
            ]}
          />

          <!-- 数据表详情 -->
          {#if dbConfig.dbInfo.stores.length > 0}
            <ShTable
              thead={[
                { dataKey: 'name', value: '数据表名称' },
                { dataKey: 'count', value: '记录数量' },
                { dataKey: 'size', value: '存储大小' },
              ]}
              tbody={dbConfig.dbInfo.stores}
              class="mb-4"
            />
          {/if}

          <!-- 刷新按钮 -->
          <div class="flex justify-end">
            <ShButton size="sm" color="ghost" onclick={handleRefreshDatabase}>
              <ShIcon name="refresh" class="w-4 h-4" />
              刷新信息
            </ShButton>
          </div>
        {/if}
      </ShFieldSet>
    </div>
  </div>
</div>
