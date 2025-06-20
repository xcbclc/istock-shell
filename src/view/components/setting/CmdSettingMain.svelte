<script lang="ts" module>
  export interface CmdSettingMainProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { type Component, onMount } from 'svelte';
  import { ShErrorInfo, ShEmpty, ShLoading, ShIcon } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';

  let { windowId, ...otherProps }: CmdSettingMainProps = $props();

  const cmdWindowCtx = CmdWindowsManager.cmdWindowsManager.getCmdContext(windowId);
  const { cmdSettingMenu } = cmdWindowCtx.cmdStore;
  const configComponentRecord: Record<string, () => Promise<Component>> = import.meta.glob<Component>(
    './config/*.svelte',
    {
      import: 'default',
      eager: false,
    }
  );
  const configComponentLoadedRecord: Record<string, Component> = {};

  // 异步加载组件
  const getAsyncComponent = async (menuItemKey?: string) => {
    if (!menuItemKey) return;
    const key = `./config/${menuItemKey}.svelte`;
    if (!configComponentRecord[key]) return;
    if (configComponentLoadedRecord[key]) return configComponentLoadedRecord[key];
    const component = await configComponentRecord[key]();
    configComponentLoadedRecord[key] = component;
    return component;
  };
</script>

{#await getAsyncComponent($cmdSettingMenu?.selectedMenuItem?.key)}
  <div class="flex items-center justify-center h-full">
    <ShLoading />
  </div>
{:then Component}
  {#if Component}
    <div class="flex items-center gap-3 mb-8">
      {#if $cmdSettingMenu?.selectedMenuItem?.iconName}
        <div class="p-2 bg-warning/10 rounded-lg leading-none">
          <ShIcon name={$cmdSettingMenu.selectedMenuItem.iconName} class="text-warning" />
        </div>
      {/if}
      <div>
        <h2 class="text-2xl font-bold text-base-content">{$cmdSettingMenu?.selectedMenuItem?.text}</h2>
        {#if $cmdSettingMenu?.selectedMenuItem?.description}
          <p class="text-base-content/60">{$cmdSettingMenu.selectedMenuItem.description}</p>
        {/if}
      </div>
    </div>
    <Component {...otherProps} />
  {:else if !$cmdSettingMenu?.selectedMenuItem}
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="text-6xl mb-4">⚙️</div>
        <h3 class="text-xl font-semibold text-base-content mb-2">选择设置项</h3>
        <p class="text-base-content/60">请从左侧菜单选择要配置的项目</p>
      </div>
    </div>
  {:else}
    <div class="flex items-center justify-center h-full">
      <ShEmpty text={'未找到页面'} />
    </div>
  {/if}
{:catch error}
  <div class="flex items-center justify-center h-full">
    <ShErrorInfo description={error.message} />
  </div>
{/await}
