<script lang="ts">
  import { ShModal, ShForm, ShFormItem, ShInput, ShTextarea } from '@istock/shell-ui';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  export let windowId: number;

  const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);
  const { addCmdAlias } = ctx.domainStore;

  const onOk = async () => {
    await addCmdAlias.add();
  };
  const onClose = () => {
    addCmdAlias.init();
  };
</script>

<ShModal isOpen={$addCmdAlias.modal.visible} title={$addCmdAlias.modal.title} {onOk} on:close={onClose}>
  <ShForm>
    <ShFormItem>
      <ShTextarea
        label={$addCmdAlias.form.cmd.label}
        value={$addCmdAlias.form.cmd.value}
        attribute={{ readonly: true }}
      />
    </ShFormItem>
    <ShFormItem>
      <ShInput label={$addCmdAlias.form.alias.label} bind:value={$addCmdAlias.form.alias.value} />
    </ShFormItem>
    <ShFormItem>
      <ShTextarea label={$addCmdAlias.form.description.label} bind:value={$addCmdAlias.form.description.value} />
    </ShFormItem>
  </ShForm>
</ShModal>
