<script lang="ts">
  import { ShModal, ShInput, ShTextarea, ShButton, ShText } from '@istock/shell-ui';
  import { toLocaleDateString } from '@istock/util';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import type { TCookieManageUiModel, TCookieModel } from '@/store/domains/global/cookie-manage';
  export let windowId: number;

  const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);
  const { cookieManage } = ctx.domainStore;

  const onSaveOrEdit = async (data: TCookieModel, index: number) => {
    if (!data.isEdit) {
      cookieManage.updateEditState(index, true);
      return;
    }
    if (data.id) {
      await cookieManage.edit(data);
      cookieManage.updateEditState(index, false);
    } else {
      await cookieManage.create(data);
      await cookieManage.getList();
    }
  };
  const onAdd = async () => {
    cookieManage.update((data: TCookieManageUiModel) => {
      data.list.push({
        host: '',
        cookie: '',
        isEdit: true,
      });
      return data;
    });
  };
  const onDelete = async (id: string) => {
    const success = await cookieManage.delete(id);
    if (success) {
      await cookieManage.getList();
    }
  };
  const onClose = () => {
    cookieManage.close();
  };

  cookieManage.getList().catch(() => {});
</script>

<ShModal
  isOpen={$cookieManage.isOpen}
  title={$cookieManage.title}
  closable={true}
  size="large"
  hasOkBtn={false}
  hasCancelBtn={false}
  on:close={onClose}
>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <td>域名</td>
          <td>cookie</td>
          <td>更新时间</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        {#if $cookieManage.list?.length}
          {#each $cookieManage.list as item, index}
            <tr>
              <td><ShInput bind:value={item.host} attributes={item.isEdit ? {} : { readonly: true }} /> </td>
              <td><ShTextarea bind:value={item.cookie} attributes={item.isEdit ? {} : { readonly: true }} /></td>
              <td>
                <span>{item.updateDate ? toLocaleDateString(item.updateDate, 'YYYY-MM-DD hh:mm:ss') : ''}</span>
              </td>
              <td>
                <a
                  on:click={async () => {
                    await onSaveOrEdit(item, index);
                  }}
                  class="action-link is-secondary"
                >
                  {item.isEdit ? '保存' : '编辑'}
                </a>
                {#if item.id}
                  <a
                    on:click={async () => {
                      await onDelete(item.id);
                    }}
                    class="action-link is-primary"
                  >
                    删除
                  </a>
                {/if}
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
  {#if !$cookieManage.list?.length}
    <ShText texts={[{ type: 'info', text: '暂无数据' }]} textAlign="center" />
  {/if}
  <div class="action">
    <ShButton on:click={onAdd} type="primary">新增</ShButton>
  </div>
</ShModal>

<style lang="scss">
  .table-wrap {
    margin-bottom: var(--gap-default);
    max-width: 100%;
    max-height: 500px;
    overflow: auto;
    overflow-anchor: none;
    scroll-behavior: smooth;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    color: var(--color-text-default);
  }
  caption {
    font-weight: bold;
    padding: 0.5em 0;
  }
  thead {
    position: sticky;
    top: -2px;
    background-color: var(--color-background);
  }
  th {
    white-space: nowrap;
    text-align: center;
  }
  th,
  td {
    border: 1px solid var(--color-border);
    padding: var(--gap-zero2x) var(--gap-default);
  }
  .action {
    text-align: right;
  }
  .action-link {
    margin: 0 var(--gap-zero2x);
    cursor: pointer;
    &.is-primary {
      color: var(--color-primary);
    }
    &.is-secondary {
      color: var(--color-secondary);
    }
  }
</style>
