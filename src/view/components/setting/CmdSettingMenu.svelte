<script lang="ts" module>
  export interface CmdSettingMenuProps {
    windowId: string;
  }
</script>

<script lang="ts">
  import { ShMenu } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';

  let { windowId }: CmdSettingMenuProps = $props();

  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { setting } = cmdWindow.store;
</script>

<!-- 左侧菜单树 -->
<ShMenu items={setting.menus} bind:selectedKey={setting.selectedMenuKey} class="w-full" size="sm" canToggle={false} />
