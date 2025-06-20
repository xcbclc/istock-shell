<script lang="ts" module>
  export interface CmdSettingProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShModal } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import CmdSettingHeader from './CmdSettingHeader.svelte';
  import CmdSettingMenu from './CmdSettingMenu.svelte';
  import CmdSettingMain from './CmdSettingMain.svelte';

  let { windowId }: CmdSettingProps = $props();

  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { setting } = cmdWindow.store;

  const onClose = () => {
    setting.show = false;
  };
</script>

<ShModal bind:show={setting.show} class="p-8">
  <div
    class="modal-box flex flex-col w-full max-w-7xl h-full max-h-192 shadow-2xl border border-base-300/50 bg-base-200"
  >
    <!-- 头部 -->
    <CmdSettingHeader {onClose} />

    <!-- 主体内容 -->
    <div class="flex flex-1 min-h-0">
      <!-- 左侧菜单 -->
      <div class="w-64 h-full overflow-y-auto border-r border-base-300 bg-base-50">
        <CmdSettingMenu {windowId} />
      </div>

      <!-- 右侧内容区域 -->
      <div class="flex-1 h-full p-4 overflow-y-auto">
        <CmdSettingMain {windowId} />
      </div>
    </div>
  </div>
  <div class="modal-backdrop" onclick={onClose}></div>
</ShModal>
