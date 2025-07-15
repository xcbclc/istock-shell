<script lang="ts" module>
  export interface CmdAddAliasModalProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShModal, ShForm, shShowMessage, type ButtonProps } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window';

  const { windowId }: CmdAddAliasModalProps = $props();

  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { cmdAlias } = cmdWindow.store;
  const actions: Array<ButtonProps<'button'>> = [
    {
      text: '取消',
      size: 'sm',
      onclick: () => {
        cmdAlias.resetCmdAlias();
      },
    },
    {
      text: '保存',
      color: 'primary',
      size: 'sm',
      onclick: async () => {
        if (!cmdAlias.form.alias) {
          return shShowMessage.error('请填写命令别名');
        }
        await cmdAlias.addCmdAlias();
        shShowMessage.success('命令别名添加成功');
      },
    },
  ];
</script>

<ShModal show={cmdAlias.modal.show} title={cmdAlias.modal.title} {actions} maskClosable={true} size="md">
  {#snippet contentRender()}
    <ShForm
      bind:values={cmdAlias.form}
      formItems={cmdAlias.formItems}
      showReset={false}
      showSubmit={false}
      labelWidth="80px"
    ></ShForm>
  {/snippet}
</ShModal>
