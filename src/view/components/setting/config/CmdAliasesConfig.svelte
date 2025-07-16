<!--
  @component AliasesConfig 别名配置组件

  命令别名管理相关的配置项
-->

<script lang="ts" module>
  export interface AliasesConfigProps {
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
  import type { CmdAliasStoreData } from '@/store';

  let { windowId }: AliasesConfigProps = $props();
  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { cmdAlias } = cmdWindow.store;

  const onSaveOrEdit = async (storeData: CmdAliasStoreData) => {
    if (cmdAlias.editRecord[storeData.id]) {
      await onCreateOrUpdate(storeData);
    } else {
      cmdAlias.editRecord[storeData.id] = true;
    }
  };
  const onCreateOrUpdate = async (storeData: CmdAliasStoreData) => {
    const data = $state.snapshot(storeData);
    if (!data.cmd) {
      shShowMessage.error('请输入命令');
      return;
    }
    if (!data.alias) {
      shShowMessage.error('请填写命令');
      return;
    }
    if (cmdAlias.isCreateData(data)) {
      await cmdAlias.create(data);
      cmdAlias.editRecord[storeData.id] = false;
      shShowMessage.success('新增成功');
      await cmdAlias.getList();
    } else {
      await cmdAlias.update(data);
      cmdAlias.editRecord[storeData.id] = false;
      shShowMessage.success('保存成功');
    }
  };
  const onDelete = async (id: string) => {
    await cmdAlias.delete(id);
    shShowMessage.success('删除成功');
    await cmdAlias.getList();
  };
</script>

<!-- 命令别名管理 -->
<div class="space-y-4">
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="别名列表" class="space-y-6">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium">已创建的别名</span>
          <ShButton color="primary" size="sm" disabled={cmdAlias.hasAdd} onclick={() => cmdAlias.onCmdAlias()}>
            <ShIcon name="alias" class="w-4 h-4" />
            添加别名
          </ShButton>
        </div>
        <div class="overflow-x-auto">
          <ShTable size="sm">
            <thead>
              <ShTableRow>
                <ShTableTh>命令</ShTableTh>
                <ShTableTh>命令别名</ShTableTh>
                <ShTableTh>别名描述</ShTableTh>
                <ShTableTh class="w-30">操作</ShTableTh>
              </ShTableRow>
            </thead>
            <tbody>
              {#each cmdAlias.list as item, index}
                {@const displayItem = cmdAlias.displayList[index]}
                <ShTableRow>
                  <ShTableTd>
                    <ShInput
                      type="input"
                      bind:value={item.cmd}
                      disabled={!cmdAlias.editRecord[item.id]}
                      validator={false}
                      placeholder="请输入命令"
                    />
                  </ShTableTd>
                  <ShTableTd>
                    <ShInput
                      type="input"
                      bind:value={item.alias}
                      disabled={!cmdAlias.editRecord[item.id]}
                      validator={false}
                      placeholder="请输入命令别名"
                    />
                  </ShTableTd>
                  <ShTableTd>
                    <ShTextarea
                      bind:value={item.description}
                      disabled={!cmdAlias.editRecord[item.id]}
                      placeholder="请输入命令别名描述"
                    />
                  </ShTableTd>
                  <ShTableTd>
                    {displayItem.updateDate}
                  </ShTableTd>
                  <ShTableTd>
                    <div class="flex gap-2">
                      <ShButton size="sm" ghost color="primary" onclick={() => onSaveOrEdit(item)}>
                        {cmdAlias.editRecord[item.id] ? '保存' : '编辑'}
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
