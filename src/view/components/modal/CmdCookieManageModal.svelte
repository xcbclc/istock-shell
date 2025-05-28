<script lang="ts" module>
  export interface CmdCookieManageModalProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import dayjs from 'dayjs';
  import {
    ShModal,
    ShTable,
    ShTableRow,
    ShTableTh,
    ShTableTd,
    ShInput,
    ShTextarea,
    ShButton,
    ShEmpty,
  } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import type { TCookieManageUiModel, TCookieModel } from '@/store/domains/global/cookie-manage';

  const { windowId }: CmdCookieManageModalProps = $props();

  const ctx = CmdWindowsManager.getInstance().getCmdContext(windowId);
  const { cookieManage } = ctx.domainStore;

  const onSaveOrEdit = async (data: TCookieModel, index: number) => {
    if (!data.isEdit) {
      cookieManage.updateEditState(index, true);
      return;
    }
    if ('id' in data && data.id) {
      await cookieManage.edit(data);
      cookieManage.updateEditState(index, false);
    } else {
      await cookieManage.create(data);
      await cookieManage.getList({});
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
      await cookieManage.getList({});
    }
  };

  const onClose = () => {
    cookieManage.close();
  };

  const getUpdateDateDisplay = (updateDate?: string) => {
    if (!updateDate) return '';
    return dayjs(updateDate).format('YYYY-MM-DD hh:mm:ss');
  };

  cookieManage.getList({}).catch(() => {});
</script>

<ShModal
  bind:show={$cookieManage.isOpen}
  title={$cookieManage.title}
  maskClosable={true}
  closeButton={true}
  size="3xl"
  {onClose}
>
  {#snippet contentRender()}
    {#if $cookieManage.list?.length}
      <div class="overflow-x-auto">
        <ShTable size="sm">
          <thead>
            <ShTableRow>
              <ShTableTh>域名</ShTableTh>
              <ShTableTh>Cookie</ShTableTh>
              <ShTableTh>更新时间</ShTableTh>
              <ShTableTh class="w-30">操作</ShTableTh>
            </ShTableRow>
          </thead>
          <tbody>
            {#each $cookieManage.list as item, index}
              <ShTableRow>
                <ShTableTd>
                  <ShInput type="url" bind:value={item.host} disabled={!item.isEdit} validator={false} />
                </ShTableTd>
                <ShTableTd>
                  <ShTextarea bind:value={item.cookie} disabled={!item.isEdit} />
                </ShTableTd>
                <ShTableTd>
                  {getUpdateDateDisplay(item.updateDate)}
                </ShTableTd>
                <ShTableTd>
                  <div class="flex gap-2">
                    <ShButton
                      size="sm"
                      ghost
                      color="primary"
                      onclick={async () => {
                        await onSaveOrEdit(item, index);
                      }}
                    >
                      {item.isEdit ? '保存' : '编辑'}
                    </ShButton>
                    {#if 'id' in item && item.id}
                      <ShButton
                        size="sm"
                        ghost
                        color="error"
                        onclick={async () => {
                          await onDelete(item.id);
                        }}
                      >
                        删除
                      </ShButton>
                    {/if}
                  </div>
                </ShTableTd>
              </ShTableRow>
            {/each}
          </tbody>
        </ShTable>
      </div>
    {:else}
      <ShEmpty />
    {/if}
    <div class="mt-2 flex justify-end">
      <ShButton onclick={onAdd} color="primary" size="sm">新增</ShButton>
    </div>
  {/snippet}
</ShModal>
