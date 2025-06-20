<!--
  @component ShortcutsConfig 快捷键配置组件

  快捷键设置相关的配置项
-->

<script lang="ts" module>
  export interface ShortcutsConfigProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShFieldSet, ShField, ShInput, ShButton, ShIcon } from '@istock-shell/ui';

  let { windowId }: ShortcutsConfigProps = $props();

  // 快捷键设置
  let settings = $state({
    shortcuts: {
      clearScreen: 'Ctrl+L',
      newTab: 'Ctrl+T',
      closeTab: 'Ctrl+W',
      settings: 'Ctrl+,',
      search: 'Ctrl+F',
      copy: 'Ctrl+C',
      paste: 'Ctrl+V',
      selectAll: 'Ctrl+A',
      undo: 'Ctrl+Z',
      redo: 'Ctrl+Y',
    },
  });

  // 快捷键配置项
  const shortcutItems = [
    { key: 'clearScreen', label: '清屏', description: '清除终端屏幕内容' },
    { key: 'newTab', label: '新建标签页', description: '创建新的终端标签页' },
    { key: 'closeTab', label: '关闭标签页', description: '关闭当前终端标签页' },
    { key: 'settings', label: '打开设置', description: '打开设置界面' },
    { key: 'search', label: '搜索', description: '在终端中搜索内容' },
    { key: 'copy', label: '复制', description: '复制选中的文本' },
    { key: 'paste', label: '粘贴', description: '粘贴剪贴板内容' },
    { key: 'selectAll', label: '全选', description: '选择所有文本' },
    { key: 'undo', label: '撤销', description: '撤销上一个操作' },
    { key: 'redo', label: '重做', description: '重做上一个操作' },
  ];

  // 重置快捷键
  const resetShortcuts = () => {
    settings.shortcuts = {
      clearScreen: 'Ctrl+L',
      newTab: 'Ctrl+T',
      closeTab: 'Ctrl+W',
      settings: 'Ctrl+,',
      search: 'Ctrl+F',
      copy: 'Ctrl+C',
      paste: 'Ctrl+V',
      selectAll: 'Ctrl+A',
      undo: 'Ctrl+Z',
      redo: 'Ctrl+Y',
    };
  };

  // 检测快捷键冲突
  const checkConflicts = () => {
    const shortcuts = Object.values(settings.shortcuts);
    const duplicates = shortcuts.filter((item, index) => shortcuts.indexOf(item) !== index);
    return duplicates.length > 0;
  };
</script>

<!-- 快捷键设置 -->
<div class="space-y-4">
  {#if checkConflicts()}
    <div class="alert alert-warning">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span>检测到快捷键冲突，请检查并修改重复的快捷键设置。</span>
    </div>
  {/if}

  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="快捷键配置" class="space-y-6">
        <div class="flex justify-end mb-4">
          <ShButton color="secondary" size="sm" onclick={resetShortcuts}>
            <ShIcon name="settings" class="w-4 h-4" />
            重置为默认
          </ShButton>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {#each shortcutItems as item}
            <div class="card bg-base-200/50 border border-base-300/30">
              <div class="card-body p-4">
                <div class="flex items-center justify-between mb-2">
                  <h4 class="font-semibold text-base-content">{item.label}</h4>
                  <kbd class="kbd kbd-sm">{settings.shortcuts[item.key]}</kbd>
                </div>
                <p class="text-sm text-base-content/60 mb-3">{item.description}</p>
                <ShField label={{ title: '快捷键', placement: 'before' }} class="space-y-2">
                  <ShInput
                    bind:value={settings.shortcuts[item.key]}
                    placeholder="按下快捷键组合"
                    size="sm"
                    class="font-mono"
                  />
                </ShField>
              </div>
            </div>
          {/each}
        </div>
      </ShFieldSet>
    </div>
  </div>

  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="快捷键说明" class="space-y-4">
        <div class="prose prose-sm max-w-none">
          <h4>快捷键格式说明：</h4>
          <ul>
            <li><kbd class="kbd kbd-sm">Ctrl+Key</kbd> - Windows/Linux 控制键组合</li>
            <li><kbd class="kbd kbd-sm">Cmd+Key</kbd> - macOS 命令键组合</li>
            <li><kbd class="kbd kbd-sm">Alt+Key</kbd> - Alt 键组合</li>
            <li><kbd class="kbd kbd-sm">Shift+Key</kbd> - Shift 键组合</li>
          </ul>
          <h4>注意事项：</h4>
          <ul>
            <li>快捷键不区分大小写</li>
            <li>避免与系统快捷键冲突</li>
            <li>建议使用常见的快捷键组合</li>
          </ul>
        </div>
      </ShFieldSet>
    </div>
  </div>
</div>
