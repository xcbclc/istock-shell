<script lang="ts" module>
  export interface CookiesConfigProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import {
    ShFieldSet,
    ShInput,
    ShButton,
    ShIcon,
    ShTableRow,
    ShTextarea,
    ShTableTh,
    ShTableTd,
    ShTable,
    shShowMessage,
  } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window';
  import type { CookieStoreData } from '@/store';

  const { windowId }: CookiesConfigProps = $props();
  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { cookieManage } = cmdWindow.store;

  const onSaveOrEdit = async (storeData: CookieStoreData) => {
    if (cookieManage.editRecord[storeData.id]) {
      await onCreateOrUpdate(storeData);
    } else {
      cookieManage.editRecord[storeData.id] = true;
    }
  };
  const onCreateOrUpdate = async (storeData: CookieStoreData) => {
    const data = $state.snapshot(storeData);
    const urlRegex =
      /^(https|http):\/\/(?:([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3}|localhost)(?::\d+)?(?:\/[\w#!:.?+=&%@!$'~*\-]*)?$/;
    if (!data.origin) {
      shShowMessage.error('请填写地址源');
      return;
    }
    if (!urlRegex.test(data.origin)) {
      shShowMessage.error('地址源格式不正确');
      return;
    }
    if (!data.cookie) {
      shShowMessage.error('请填写Cookie');
      return;
    }
    if (cookieManage.isCreateData(data)) {
      await cookieManage.create(data);
      cookieManage.editRecord[storeData.id] = false;
      shShowMessage.success('新增成功');
      await cookieManage.getList();
    } else {
      await cookieManage.update(data);
      cookieManage.editRecord[storeData.id] = false;
      shShowMessage.success('保存成功');
    }
  };
  const onDelete = async (id: string) => {
    await cookieManage.delete(id);
    shShowMessage.success('删除成功');
    await cookieManage.getList();
  };
</script>

<!-- 网站Cookie管理 -->
<div class="space-y-8">
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="Cookie列表" class="space-y-6">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium">已保存的Cookie</span>
          <ShButton color="primary" size="sm" disabled={cookieManage.hasAdd} onclick={() => cookieManage.onAddCookie()}>
            <ShIcon name="cookie" class="w-4 h-4" />
            添加Cookie
          </ShButton>
        </div>
        <div class="overflow-x-auto">
          <ShTable size="sm">
            <thead>
              <ShTableRow>
                <ShTableTh>地址源</ShTableTh>
                <ShTableTh>Cookie</ShTableTh>
                <ShTableTh>更新时间</ShTableTh>
                <ShTableTh class="w-30">操作</ShTableTh>
              </ShTableRow>
            </thead>
            <tbody>
              {#each cookieManage.list as item, index}
                {@const displayItem = cookieManage.displayList[index]}
                <ShTableRow>
                  <ShTableTd>
                    <ShInput
                      type="url"
                      bind:value={item.origin}
                      disabled={!cookieManage.editRecord[item.id]}
                      validator={false}
                      placeholder="https://example.com"
                    />
                  </ShTableTd>
                  <ShTableTd>
                    <ShTextarea bind:value={item.cookie} disabled={!cookieManage.editRecord[item.id]} />
                  </ShTableTd>
                  <ShTableTd>
                    {displayItem.updateDate}
                  </ShTableTd>
                  <ShTableTd>
                    <div class="flex gap-2">
                      <ShButton size="sm" ghost color="primary" onclick={() => onSaveOrEdit(item)}>
                        {cookieManage.editRecord[item.id] ? '保存' : '编辑'}
                      </ShButton>
                      {#if 'id' in item && item.id}
                        <ShButton size="sm" ghost color="error" onclick={async () => onDelete(item.id)}>删除</ShButton>
                      {/if}
                    </div>
                  </ShTableTd>
                </ShTableRow>
              {/each}
            </tbody>
          </ShTable>
        </div>
      </ShFieldSet>
    </div>
  </div>
</div>
