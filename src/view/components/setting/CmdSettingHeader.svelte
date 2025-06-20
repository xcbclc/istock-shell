<script lang="ts" module>
  export interface CmdSettingHeaderProps {
    onClose?: () => void;
  }
</script>

<script lang="ts">
  import { ShButton, ShIcon } from '@istock-shell/ui';

  let { onClose }: CmdSettingHeaderProps = $props();
</script>

<!-- 标题栏 -->
<div class="flex items-center justify-between px-4 py-2 border-b border-base-300/50">
  <div class="flex items-center gap-3">
    <div class="p-2 bg-primary/10 rounded-lg leading-none">
      <ShIcon name="settings" class="text-primary" size="lg" />
    </div>
    <div>
      <h1 class="text-xl font-bold text-base-content">终端设置</h1>
      <p class="text-sm text-base-content/60">自定义您的终端体验</p>
    </div>
  </div>
  <ShButton size="sm" ghost shape="circle" onclick={onClose}>
    <ShIcon name="close" size="sm" />
  </ShButton>
</div>
