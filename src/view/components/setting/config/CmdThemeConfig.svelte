<script lang="ts" module>
  export interface ThemeConfigProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShFieldSet, ShField, ShSelect, ShIcon } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import type { ThemeOption } from '@/store/window/theme.svelte';

  let { windowId }: ThemeConfigProps = $props();

  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { theme } = cmdWindow.store;

  const onThemeConfigChange = (themeName: string) => {
    theme.name = themeName;
  };

  // 获取主题的主要颜色用于预览
  const getThemePreviewColors = (themeOption: ThemeOption) => {
    const vars = themeOption.variables;
    return {
      primary: vars['--color-primary'],
      secondary: vars['--color-secondary'],
      accent: vars['--color-accent'],
      base: vars['--color-base-100'],
      content: vars['--color-base-content'],
      scheme: vars['color-scheme'],
    };
  };

  // 判断是否为深色主题
  const isDarkTheme = (themeOption: ThemeOption) => {
    return themeOption.variables['color-scheme'] === 'dark';
  };
</script>

<!-- 主题设置 -->
<div class="space-y-4">
  <!-- 当前主题信息 -->
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="当前主题" class="space-y-4">
        <div class="flex items-center gap-4 p-4 bg-base-200/50 rounded-lg">
          <div class="flex items-center gap-2">
            <ShIcon name="palette" class="w-5 h-5 text-primary" />
            <span class="font-medium">
              {theme.options.find((opt) => opt.value === theme.name)?.label || '未知主题'}
            </span>
          </div>
          <div class="flex items-center gap-1 ml-auto">
            {#if theme.options.find((opt) => opt.value === theme.name)}
              {@const colors = getThemePreviewColors(theme.options.find((opt) => opt.value === theme.name))}
              <div class="w-4 h-4 rounded-full border border-base-300" style="background: {colors.primary}"></div>
              <div class="w-4 h-4 rounded-full border border-base-300" style="background: {colors.secondary}"></div>
              <div class="w-4 h-4 rounded-full border border-base-300" style="background: {colors.accent}"></div>
            {/if}
          </div>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <!-- 主题选择网格 -->
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="选择主题" class="space-y-4">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {#each theme.options as themeOption (themeOption.value)}
            {@const colors = getThemePreviewColors(themeOption)}
            {@const isSelected = theme.name === themeOption.value}
            {@const isDark = isDarkTheme(themeOption)}

            <button
              class="group relative p-3 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50 {isSelected
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-base-300/50 bg-base-200/30 hover:border-primary/50 hover:bg-base-200/50'}"
              onclick={() => onThemeConfigChange(themeOption.value)}
            >
              <!-- 选中状态指示器 -->
              {#if isSelected}
                <div
                  class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                >
                  <ShIcon name="check" class="w-3 h-3 text-primary-content" />
                </div>
              {/if}

              <!-- 主题预览 -->
              <div class="space-y-2">
                <!-- 颜色预览条 -->
                <div class="h-6 rounded overflow-hidden flex">
                  <div class="flex-1" style="background: {colors.primary}"></div>
                  <div class="flex-1" style="background: {colors.secondary}"></div>
                  <div class="flex-1" style="background: {colors.accent}"></div>
                </div>

                <!-- 模拟界面预览 -->
                <div
                  class="h-12 rounded border border-opacity-20 relative overflow-hidden"
                  style="background: {colors.base}; border-color: {colors.content};"
                >
                  <!-- 模拟顶栏 -->
                  <div class="h-2 w-full opacity-80" style="background: {colors.primary}"></div>

                  <!-- 模拟内容区域 -->
                  <div class="p-1.5 space-y-0.5">
                    <div class="h-1 w-3/4 rounded opacity-60" style="background: {colors.content}"></div>
                    <div class="h-1 w-1/2 rounded opacity-40" style="background: {colors.content}"></div>
                    <div class="h-1 w-2/3 rounded opacity-30" style="background: {colors.content}"></div>
                  </div>
                </div>

                <!-- 主题名称和类型 -->
                <div class="text-center">
                  <h3
                    class="font-medium text-xs text-base-content group-hover:text-primary transition-colors leading-tight"
                  >
                    {themeOption.label}
                  </h3>
                  <div class="flex items-center justify-center gap-0.5 mt-0.5">
                    <ShIcon
                      name={isDark ? 'moon' : 'sun'}
                      class="w-2.5 h-2.5 {isDark ? 'text-blue-400' : 'text-yellow-500'}"
                    />
                    <span class="text-[10px] text-base-content/60">
                      {isDark ? '深色' : '浅色'}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          {/each}
        </div>
      </ShFieldSet>
    </div>
  </div>
</div>
