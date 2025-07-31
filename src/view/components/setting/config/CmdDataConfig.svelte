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
    ShInput,
    ShSelect,
    ShButton,
    ShIcon,
    type SelectItemOption,
  } from '@istock-shell/ui';

  let { windowId }: DataConfigProps = $props();

  // 数据管理设置
  let settings = $state({
    dataManagement: {
      autoBackup: true,
      backupInterval: 7, // 天
      maxBackups: 10,
      exportFormat: 'json',
    },
  });

  // 导出格式选项
  const exportFormatOptions: SelectItemOption[] = [
    { label: 'JSON', value: 'json' },
    { label: 'CSV', value: 'csv' },
    { label: 'XML', value: 'xml' },
  ];

  // 导出设置
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'istock-shell-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // 导入设置
  const importSettings = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const importedSettings = JSON.parse(e.target?.result as string);
            settings = { ...settings, ...importedSettings };
          } catch (error) {
            console.error('导入设置失败:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // 清理数据
  const clearData = () => {
    if (confirm('确定要清理所有本地数据吗？此操作不可恢复。')) {
      // 这里应该调用实际的清理逻辑
      console.log('清理本地数据');
    }
  };

  // 备份数据
  const backupData = () => {
    // 这里应该调用实际的备份逻辑
    console.log('备份数据');
  };
</script>

<!-- 本地数据管理 -->
<div class="space-y-4">
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="备份设置" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShField
            label={{ title: '自动备份', placement: 'after' }}
            class="flex items-center justify-between p-4 bg-base-200/50 rounded-lg"
          >
            <ShToggle bind:value={settings.dataManagement.autoBackup} color="primary" size="md" />
          </ShField>

          <ShField label={{ title: '备份间隔（天）', placement: 'before' }} class="space-y-4">
            <ShInput bind:value={settings.dataManagement.backupInterval} type="number" min="1" max="30" size="md" />
          </ShField>

          <ShField label={{ title: '最大备份数', placement: 'before' }} class="space-y-4">
            <ShInput bind:value={settings.dataManagement.maxBackups} type="number" min="1" max="50" size="md" />
          </ShField>

          <ShField label={{ title: '导出格式', placement: 'before' }} class="space-y-4">
            <ShSelect
              bind:value={settings.dataManagement.exportFormat}
              options={exportFormatOptions}
              color="primary"
              size="md"
            />
          </ShField>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="数据操作" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ShButton color="primary" size="md" onclick={exportSettings}>
            <ShIcon name="file" class="w-4 h-4" />
            导出设置
          </ShButton>

          <ShButton color="secondary" size="md" onclick={importSettings}>
            <ShIcon name="file" class="w-4 h-4" />
            导入设置
          </ShButton>

          <ShButton color="info" size="md" onclick={backupData}>
            <ShIcon name="database" class="w-4 h-4" />
            立即备份
          </ShButton>

          <ShButton color="error" size="md" onclick={clearData}>
            <ShIcon name="warning" class="w-4 h-4" />
            清理数据
          </ShButton>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="存储信息" class="space-y-6">
        <div class="stats stats-vertical lg:stats-horizontal shadow">
          <div class="stat">
            <div class="stat-title">已用存储</div>
            <div class="stat-value text-primary">2.6 MB</div>
            <div class="stat-desc">本地数据大小</div>
          </div>

          <div class="stat">
            <div class="stat-title">备份数量</div>
            <div class="stat-value text-secondary">5</div>
            <div class="stat-desc">自动备份文件</div>
          </div>

          <div class="stat">
            <div class="stat-title">最后备份</div>
            <div class="stat-value text-accent">2天前</div>
            <div class="stat-desc">上次备份时间</div>
          </div>
        </div>
      </ShFieldSet>
    </div>
  </div>
</div>
