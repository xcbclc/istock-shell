<script lang="ts" module>
  export interface AboutConfigProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShFieldSet, ShField, ShButton, ShIcon } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window';

  let { windowId }: AboutConfigProps = $props();

  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { shellInfo } = cmdWindow.store;

  // 获取应用和系统信息
  const appInfo = shellInfo.data.projectInfo;
  const systemInfo = shellInfo.data.systemInfo;

  // 工具函数
  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // TODO: 添加toast通知
      console.log('已复制到剪贴板:', text);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const exportSystemInfo = () => {
    const info = {
      application: appInfo,
      system: systemInfo,
      timestamp: new Date().toISOString(),
    };
    const dataStr = JSON.stringify(info, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'istock-shell-info.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  // 格式化系统信息显示
  const formatPlatform = (platform: string) => {
    if (platform.includes('Win')) return 'Windows';
    if (platform.includes('Mac')) return 'macOS';
    if (platform.includes('Linux')) return 'Linux';
    return platform;
  };

  const formatMemory = (memory: number | string) => {
    if (typeof memory === 'number') {
      return `${memory} GB`;
    }
    return memory;
  };

  const formatConnection = (connection: any) => {
    if (!connection) return '未知';
    return `${connection.effectiveType} (${connection.downlink}Mbps)`;
  };
</script>

<!-- 关于应用配置 -->
<div class="space-y-4">
  <!-- 应用概览 -->
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="应用概览" class="space-y-6">
        <div class="flex items-center gap-6 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
          <div class="avatar">
            <div class="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShIcon name="terminal" class="w-10 h-10 text-primary" />
            </div>
          </div>
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-base-content mb-1">{appInfo.name}</h2>
            <p class="text-base-content/70 mb-3">{appInfo.description}</p>
            <div class="flex items-center gap-3">
              <div class="badge badge-primary">v{appInfo.version}</div>
              <div class="badge badge-outline">{appInfo.license}</div>
            </div>
          </div>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <!-- 项目信息 -->
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="项目信息" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShField label={{ title: '作者', placement: 'before' }} class="space-y-2">
            <div class="p-3 bg-base-200/50 rounded-lg">
              <span class="font-medium">{appInfo.author}</span>
            </div>
          </ShField>

          <ShField label={{ title: '联系方式', placement: 'before' }} class="space-y-2">
            <div class="p-3 bg-base-200/50 rounded-lg">
              <a href={appInfo.contact} target="_blank" class="link">
                联系我
                <ShIcon name="external-link" class="w-3 h-3 ml-1" />
              </a>
            </div>
          </ShField>

          <ShField label={{ title: '技术栈', placement: 'before' }} class="space-y-2">
            <div class="p-3 bg-base-200/50 rounded-lg">
              <div class="flex flex-wrap gap-2">
                {#each appInfo.techStack as tech}
                  <div class="badge badge-secondary badge-sm">{tech}</div>
                {/each}
              </div>
            </div>
          </ShField>

          <ShField label={{ title: '运行环境', placement: 'before' }} class="space-y-2">
            <div class="p-3 bg-base-200/50 rounded-lg space-y-1">
              <div class="text-sm">Node.js {appInfo.engines.node}</div>
              <div class="text-sm">pnpm {appInfo.engines.pnpm}</div>
            </div>
          </ShField>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <!-- 系统信息 -->
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="系统信息" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShField label={{ title: '操作系统', placement: 'before' }} class="space-y-2">
            <div class="p-3 bg-base-200/50 rounded-lg">
              <span class="font-medium">{formatPlatform(systemInfo.platform)}</span>
            </div>
          </ShField>

          <ShField label={{ title: '语言', placement: 'before' }} class="space-y-2">
            <div class="p-3 bg-base-200/50 rounded-lg">
              <span class="font-medium">{systemInfo.language}</span>
            </div>
          </ShField>

          <ShField label={{ title: '屏幕分辨率', placement: 'before' }} class="space-y-2">
            <div class="p-3 bg-base-200/50 rounded-lg">
              <span class="font-medium">{systemInfo.screenResolution}</span>
            </div>
          </ShField>

          <ShField label={{ title: 'CPU核心数', placement: 'before' }} class="space-y-2">
            <div class="p-3 bg-base-200/50 rounded-lg">
              <span class="font-medium">{systemInfo.hardwareConcurrency}</span>
            </div>
          </ShField>

          <ShField label={{ title: '设备内存', placement: 'before' }} class="space-y-2">
            <div class="p-3 bg-base-200/50 rounded-lg">
              <span class="font-medium">{formatMemory(systemInfo.deviceMemory)}</span>
            </div>
          </ShField>

          <ShField label={{ title: '网络状态', placement: 'before' }} class="space-y-2">
            <div class="p-3 bg-base-200/50 rounded-lg flex items-center gap-2">
              <div class={`w-2 h-2 rounded-full ${systemInfo.onLine ? 'bg-success' : 'bg-error'}`}></div>
              <span class="font-medium">{formatConnection(systemInfo.connection)}</span>
            </div>
          </ShField>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <!-- 快速操作 -->
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="快速操作" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ShButton color="primary" size="md" onclick={() => openLink(appInfo.homepage)}>
            <ShIcon name="home" class="w-4 h-4" />
            项目主页
          </ShButton>

          <ShButton color="secondary" size="md" onclick={() => openLink(appInfo.repository)}>
            <ShIcon name="github" class="w-4 h-4" />
            源码仓库
          </ShButton>

          <ShButton color="info" size="md" onclick={() => openLink(`${appInfo.repository}/issues`)}>
            <ShIcon name="bug" class="w-4 h-4" />
            问题反馈
          </ShButton>

          <ShButton color="accent" size="md" onclick={() => copyToClipboard(systemInfo.userAgent)}>
            <ShIcon name="copy" class="w-4 h-4" />
            复制用户代理
          </ShButton>

          <ShButton color="warning" size="md" onclick={exportSystemInfo}>
            <ShIcon name="download" class="w-4 h-4" />
            导出信息
          </ShButton>

          <ShButton color="error" size="md" onclick={() => window.location.reload()}>
            <ShIcon name="refresh" class="w-4 h-4" />
            重新加载
          </ShButton>
        </div>
      </ShFieldSet>
    </div>
  </div>
</div>
