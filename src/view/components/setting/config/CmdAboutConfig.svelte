<!--
  @component AboutConfig 关于应用配置组件

  应用信息和系统信息展示
-->

<script lang="ts" module>
  export interface AboutConfigProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShFieldSet, ShField, ShInput, ShButton, ShIcon } from '@istock-shell/ui';

  let { windowId }: AboutConfigProps = $props();

  // 应用信息
  const appInfo = {
    name: 'iStock Shell',
    version: '1.0.0',
    description: '一个现代化的终端模拟器和命令行工具',
    author: 'iStock Shell Team',
    license: 'MIT',
    homepage: 'https://github.com/istock-shell/istock-shell',
    repository: 'https://github.com/istock-shell/istock-shell.git',
    buildDate: new Date().toLocaleDateString('zh-CN'),
  };

  // 系统信息
  const systemInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  // 打开链接
  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  // 复制信息到剪贴板
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // 这里可以添加toast通知
      console.log('已复制到剪贴板:', text);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  // 检查更新
  const checkUpdate = () => {
    // 这里应该调用实际的更新检查逻辑
    console.log('检查更新...');
  };

  // 导出系统信息
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
</script>

<!-- 关于应用配置 -->
<div class="space-y-4">
  <!-- 应用信息 -->
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="应用信息" class="space-y-6">
        <!-- 应用标识 -->
        <div class="flex items-center gap-4 p-4 bg-base-200/50 rounded-lg">
          <div class="avatar">
            <div class="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
              <ShIcon name="istock-shell" class="w-10 h-10 text-primary" />
            </div>
          </div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-base-content">{appInfo.name}</h3>
            <p class="text-base-content/60 text-sm">{appInfo.description}</p>
            <div class="badge badge-primary badge-sm mt-1">v{appInfo.version}</div>
          </div>
        </div>

        <!-- 详细信息 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShField label={{ title: '作者', placement: 'before' }} class="space-y-2">
            <ShInput value={appInfo.author} readonly size="md" />
          </ShField>

          <ShField label={{ title: '许可证', placement: 'before' }} class="space-y-2">
            <ShInput value={appInfo.license} readonly size="md" />
          </ShField>

          <ShField label={{ title: '构建日期', placement: 'before' }} class="space-y-2">
            <ShInput value={appInfo.buildDate} readonly size="md" />
          </ShField>

          <ShField label={{ title: '主页', placement: 'before' }} class="space-y-2">
            <div class="flex gap-2">
              <ShInput value={appInfo.homepage} readonly size="md" class="flex-1" />
              <ShButton size="md" color="ghost" onclick={() => openLink(appInfo.homepage)}>
                <ShIcon name="external-link" class="w-4 h-4" />
              </ShButton>
              <ShButton size="md" color="ghost" onclick={() => copyToClipboard(appInfo.homepage)}>
                <ShIcon name="copy" class="w-4 h-4" />
              </ShButton>
            </div>
          </ShField>

          <ShField label={{ title: '仓库地址', placement: 'before' }} class="space-y-2 lg:col-span-2">
            <div class="flex gap-2">
              <ShInput value={appInfo.repository} readonly size="md" class="flex-1" />
              <ShButton size="md" color="ghost" onclick={() => openLink(appInfo.repository)}>
                <ShIcon name="external-link" class="w-4 h-4" />
              </ShButton>
              <ShButton size="md" color="ghost" onclick={() => copyToClipboard(appInfo.repository)}>
                <ShIcon name="copy" class="w-4 h-4" />
              </ShButton>
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
            <ShInput value={systemInfo.platform} readonly size="md" />
          </ShField>

          <ShField label={{ title: '语言', placement: 'before' }} class="space-y-2">
            <ShInput value={systemInfo.language} readonly size="md" />
          </ShField>

          <ShField label={{ title: '屏幕分辨率', placement: 'before' }} class="space-y-2">
            <ShInput value={systemInfo.screenResolution} readonly size="md" />
          </ShField>

          <ShField label={{ title: '颜色深度', placement: 'before' }} class="space-y-2">
            <ShInput value={`${systemInfo.colorDepth} 位`} readonly size="md" />
          </ShField>

          <ShField label={{ title: '时区', placement: 'before' }} class="space-y-2">
            <ShInput value={systemInfo.timezone} readonly size="md" />
          </ShField>

          <ShField label={{ title: '网络状态', placement: 'before' }} class="space-y-2">
            <div class="flex items-center gap-2">
              <div class={`w-3 h-3 rounded-full ${systemInfo.onLine ? 'bg-success' : 'bg-error'}`}></div>
              <span class={`text-sm font-medium ${systemInfo.onLine ? 'text-success' : 'text-error'}`}>
                {systemInfo.onLine ? '在线' : '离线'}
              </span>
            </div>
          </ShField>

          <ShField label={{ title: 'Cookie支持', placement: 'before' }} class="space-y-2">
            <div class="flex items-center gap-2">
              <div class={`w-3 h-3 rounded-full ${systemInfo.cookieEnabled ? 'bg-success' : 'bg-error'}`}></div>
              <span class={`text-sm font-medium ${systemInfo.cookieEnabled ? 'text-success' : 'text-error'}`}>
                {systemInfo.cookieEnabled ? '已启用' : '已禁用'}
              </span>
            </div>
          </ShField>

          <ShField label={{ title: '用户代理', placement: 'before' }} class="space-y-2 lg:col-span-2">
            <div class="flex gap-2">
              <ShInput value={systemInfo.userAgent} readonly size="md" class="flex-1" />
              <ShButton size="md" color="ghost" onclick={() => copyToClipboard(systemInfo.userAgent)}>
                <ShIcon name="copy" class="w-4 h-4" />
              </ShButton>
            </div>
          </ShField>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <!-- 操作按钮 -->
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="操作" class="space-y-6">
        <div class="flex flex-wrap gap-4">
          <ShButton color="primary" size="md" onclick={checkUpdate}>
            <ShIcon name="refresh" class="w-4 h-4" />
            检查更新
          </ShButton>

          <ShButton color="secondary" size="md" onclick={exportSystemInfo}>
            <ShIcon name="download" class="w-4 h-4" />
            导出信息
          </ShButton>

          <ShButton
            color="accent"
            size="md"
            onclick={() => openLink('https://github.com/istock-shell/istock-shell/issues')}
          >
            <ShIcon name="bug" class="w-4 h-4" />
            反馈问题
          </ShButton>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <!-- 使用说明 -->
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="使用说明" class="space-y-4">
        <div class="prose prose-sm max-w-none text-base-content">
          <h4 class="text-base font-semibold mb-2">关于 iStock Shell：</h4>
          <ul class="space-y-1 text-sm">
            <li>• 现代化的终端模拟器，支持多种命令行工具</li>
            <li>• 基于 Web 技术构建，跨平台兼容</li>
            <li>• 支持主题定制和插件扩展</li>
            <li>• 提供丰富的配置选项和快捷键</li>
          </ul>

          <h4 class="text-base font-semibold mb-2 mt-4">技术栈：</h4>
          <ul class="space-y-1 text-sm">
            <li>• 前端框架：Svelte 5 + TypeScript</li>
            <li>• UI 组件：DaisyUI + Tailwind CSS</li>
            <li>• 构建工具：Vite + Rollup</li>
            <li>• 包管理：pnpm workspace</li>
          </ul>

          <h4 class="text-base font-semibold mb-2 mt-4">支持与帮助：</h4>
          <ul class="space-y-1 text-sm">
            <li>• 文档：访问项目主页查看完整文档</li>
            <li>• 问题反馈：通过 GitHub Issues 提交问题</li>
            <li>• 社区讨论：加入我们的开发者社区</li>
          </ul>
        </div>
      </ShFieldSet>
    </div>
  </div>
</div>
