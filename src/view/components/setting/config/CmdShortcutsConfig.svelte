<script lang="ts" module>
  export interface ShortcutsConfigProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShFieldSet, ShField, ShInput, ShButton, ShIcon, ShKbd, shShowMessage } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window';
  import { type ShortcutStoreData } from '@/store/window/shortcut.svelte';

  let { windowId }: ShortcutsConfigProps = $props();

  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { shortcut } = cmdWindow.store;

  // 快捷键输入处理
  const handleShortcutInput = async (event: KeyboardEvent, item: ShortcutItem) => {
    event.preventDefault();
    const shortcutKeys = shortcut.parseShortcut(event);
    const shortcutDisplay = shortcut.parseShortcutDisplay(event);
    if (shortcutDisplay && shortcutDisplay !== event.key && shortcut.hasExtraShortcutKey(shortcutKeys)) {
      // 检查是否与其他快捷键冲突（排除当前正在编辑的项）
      const hasConflict = shortcut.list.some(
        (existingItem) => existingItem.key !== item.key && existingItem.shortcut === shortcutDisplay
      );

      if (!hasConflict) {
        // 更新快捷键设置
        shortcut.currentSettingItem = {
          id: item.key,
          key: item.key,
          shortcut: shortcutDisplay,
        };
        await shortcut.syncShortcut($state.snapshot(shortcut.currentSettingItem));
      } else {
        // 显示冲突提示
        shShowMessage.error(`快捷键 "${shortcutDisplay}" 已被其他功能使用`);
      }
    }
  };

  // 处理输入框失焦事件
  const handleInputBlur = async () => {
    shortcut.currentSettingItem = null;
  };

  // 重置所有快捷键
  const resetShortcuts = async () => {
    await shortcut.resetShortcuts();
  };

  // 检测所有快捷键冲突
  const conflictShortcuts = $derived.by(() => {
    const shortcuts = shortcut.list
      .map((item) => item.shortcut)
      .filter((shortcut) => shortcut && shortcut.trim() !== ''); // 过滤空字符串和空白字符串

    const shortcutCounts = new Map<string, number>();
    shortcuts.forEach((shortcut) => {
      shortcutCounts.set(shortcut, (shortcutCounts.get(shortcut) || 0) + 1);
    });
    return Array.from(shortcutCounts.entries())
      .filter(([_, count]) => count > 1)
      .map(([shortcut, _]) => shortcut);
  });

  // 获取快捷键的显示状态
  const getShortcutDisplayInfo = (item: ShortcutStoreData) => {
    const isEditing = shortcut.currentSettingItem?.key === item.key;
    const shortcutDisplay =
      isEditing && shortcut.currentSettingItem ? shortcut.currentSettingItem.shortcut : item.shortcut;
    const isConflicted = conflictShortcuts.includes(item.shortcut);
    return {
      shortcut: shortcutDisplay,
      isConflicted,
      isEditing,
    };
  };

  const hasConflicts = $derived.by(() => conflictShortcuts.length > 0);
</script>

<!-- 快捷键设置 -->
<div class="space-y-4">
  <!-- 状态提示区域 -->
  <div class="flex flex-col gap-3">
    {#if hasConflicts}
      <div class="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>检测到快捷键冲突：{conflictShortcuts.join(', ')}，请检查并修改重复的快捷键设置。</span>
      </div>
    {/if}

    <!-- 快捷键统计信息 -->
    <div class="stats stats-horizontal shadow bg-base-100 border border-base-300/50">
      <div class="stat py-3">
        <div class="stat-title text-xs">总快捷键</div>
        <div class="stat-value text-xl">{shortcut.list.length}</div>
        <div class="stat-desc text-xs">已配置功能</div>
      </div>
      <div class="stat py-3">
        <div class="stat-title text-xs">已设置</div>
        <div class="stat-value text-xl text-success">{shortcut.list.filter((item) => item.shortcut).length}</div>
        <div class="stat-desc text-xs">有效快捷键</div>
      </div>
      <div class="stat py-3">
        <div class="stat-title text-xs">冲突</div>
        <div class="stat-value text-xl {hasConflicts ? 'text-warning' : 'text-base-content/30'}">
          {conflictShortcuts.length}
        </div>
        <div class="stat-desc text-xs">需要解决</div>
      </div>
    </div>
  </div>

  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="快捷键配置" class="space-y-4">
        <div class="flex justify-end mb-3">
          <ShButton color="secondary" size="sm" onclick={resetShortcuts}>
            <ShIcon name="settings" class="w-4 h-4" />
            重置为默认
          </ShButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {#each shortcut.list as item (item.id)}
            {@const displayInfo = getShortcutDisplayInfo(item)}
            <div
              class="card bg-base-200/50 border border-base-300/30 transition-all duration-200 {displayInfo.isConflicted
                ? 'border-warning shadow-warning/20'
                : displayInfo.isEditing
                  ? 'border-primary shadow-primary/20'
                  : ''}"
            >
              <div class="card-body p-3">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="font-medium text-sm text-base-content truncate">{item.label}</h4>
                      {#if displayInfo.isEditing}
                        <div class="badge badge-primary badge-xs">编辑中</div>
                      {/if}
                    </div>
                    <p class="text-xs text-base-content/60 line-clamp-2">{item.description}</p>
                  </div>
                  <ShKbd
                    size="xs"
                    class="ml-2 flex-shrink-0 {displayInfo.isConflicted
                      ? 'bg-warning text-warning-content'
                      : displayInfo.isEditing
                        ? 'bg-primary text-primary-content'
                        : ''}"
                  >
                    {displayInfo.shortcut}
                  </ShKbd>
                </div>
                <ShField label={{ title: '快捷键', placement: 'before' }} class="space-y-1">
                  <ShInput
                    value={displayInfo.shortcut}
                    placeholder="按下快捷键组合"
                    size="xs"
                    class="font-mono text-xs transition-colors {displayInfo.isConflicted
                      ? 'input-warning'
                      : displayInfo.isEditing
                        ? 'input-primary'
                        : ''}"
                    onkeydown={(event) => handleShortcutInput(event, item)}
                    onblur={() => handleInputBlur()}
                    readonly
                  />
                </ShField>
                {#if displayInfo.isConflicted}
                  <div class="text-xs text-warning mt-1 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    此快捷键与其他设置冲突
                  </div>
                {/if}
                {#if displayInfo.isEditing}
                  <div class="text-xs text-primary mt-1 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                      />
                    </svg>
                    按下新的快捷键组合来更改设置
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </ShFieldSet>
    </div>
  </div>

  <div class="grid grid-cols-1 gap-6">
    <!-- 使用提示 -->
    <div class="card bg-base-100 shadow-lg border border-base-300/50">
      <div class="card-body">
        <ShFieldSet title="使用提示" class="space-y-4">
          <div class="space-y-3">
            <div class="alert alert-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 class="font-bold">操作说明</h4>
                <div class="text-sm space-y-1">
                  <p>• 点击快捷键输入框，然后按下想要设置的快捷键组合</p>
                  <p>• 使用"重置"按钮恢复默认快捷键</p>
                  <p>• 使用"清除"按钮移除快捷键设置</p>
                  <p>• 系统会自动检测并提示快捷键冲突</p>
                </div>
              </div>
            </div>

            <div class="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <h4 class="font-bold">注意事项</h4>
                <div class="text-sm space-y-1">
                  <p>• 避免与系统快捷键冲突</p>
                  <p>• 快捷键不区分大小写</p>
                  <p>• 建议使用常见的快捷键组合</p>
                  <p>• 修改后的设置会自动保存</p>
                </div>
              </div>
            </div>
          </div>
        </ShFieldSet>
      </div>
    </div>
  </div>
</div>
