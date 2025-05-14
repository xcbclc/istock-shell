<script lang="ts" module>
  export interface CmdAddAliasModalProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShModal, ShForm, type ButtonProps } from '@istock/shell-ui';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';

  const { windowId }: CmdAddAliasModalProps = $props();

  const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);
  const { addCmdAlias } = ctx.domainStore;
  const actions: Array<ButtonProps<'button'>> = [
    {
      text: '取消',
      size: 'sm',
      onclick: () => {
        addCmdAlias.init();
      },
    },
    {
      text: '保存',
      color: 'primary',
      size: 'sm',
      onclick: async () => {
        await addCmdAlias.add();
      },
    },
  ];
</script>

<ShModal show={$addCmdAlias.modal.visible} title={$addCmdAlias.modal.title} {actions} maskClosable={true} size="md">
  {#snippet contentRender()}
    <ShForm
      bind:values={$addCmdAlias.form}
      formItems={$addCmdAlias.formItems}
      showReset={false}
      showSubmit={false}
      labelWidth="80px"
    ></ShForm>
  {/snippet}
</ShModal>
