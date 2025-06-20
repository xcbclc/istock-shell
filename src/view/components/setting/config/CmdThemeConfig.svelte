<script lang="ts" module>
  export interface ThemeConfigProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShFieldSet, ShField, ShSelect } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';

  let { windowId }: ThemeConfigProps = $props();

  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { theme } = cmdWindow.store;
  const label = { title: '主题选择', placement: 'before' };

  const onThemeConfigChange = (themeName: string) => {
    theme.name = themeName;
  };
</script>

<!-- 主题设置 -->
<div class="space-y-4">
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="主题" class="space-y-6">
        <ShField {label} class="space-y-4">
          <ShSelect
            value={theme.name}
            options={theme.options}
            onChangeValue={onThemeConfigChange}
            placeholder="请选择主题"
            color="primary"
            size="md"
          />
        </ShField>
      </ShFieldSet>
    </div>
  </div>
</div>
