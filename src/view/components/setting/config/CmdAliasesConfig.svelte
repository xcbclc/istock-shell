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
  import { ShFieldSet, ShField, ShToggle, ShInput, ShButton, ShIcon } from '@istock-shell/ui';

  let { windowId }: AliasesConfigProps = $props();

  // 别名设置数据
  let settings = $state({
    aliases: {
      list: [],
      enableAutoComplete: true,
    },
  });

  // 别名管理相关函数
  const addAlias = () => {
    settings.aliases.list.push({
      id: Date.now().toString(),
      name: '',
      command: '',
      description: '',
      isEdit: true,
    });
  };

  const deleteAlias = (id: string) => {
    settings.aliases.list = settings.aliases.list.filter((item) => item.id !== id);
  };
</script>

<!-- 命令别名管理 -->
<div class="space-y-8">
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="别名设置" class="space-y-6">
        <ShField
          label={{ title: '启用自动补全', placement: 'after' }}
          class="flex items-center justify-between p-4 bg-base-200/50 rounded-lg"
        >
          <ShToggle bind:value={settings.aliases.enableAutoComplete} color="primary" size="md" />
        </ShField>
      </ShFieldSet>
    </div>
  </div>

  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="别名列表" class="space-y-6">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium">已创建的别名</span>
          <ShButton color="primary" size="sm" onclick={addAlias}>
            <ShIcon name="alias" class="w-4 h-4" />
            添加别名
          </ShButton>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>别名</th>
                <th>命令</th>
                <th>描述</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {#each settings.aliases.list as alias (alias.id)}
                <tr>
                  <td>
                    <ShInput bind:value={alias.name} placeholder="别名名称" size="sm" />
                  </td>
                  <td>
                    <ShInput bind:value={alias.command} placeholder="实际命令" size="sm" />
                  </td>
                  <td>
                    <ShInput bind:value={alias.description} placeholder="描述信息" size="sm" />
                  </td>
                  <td>
                    <div class="flex gap-2">
                      <ShButton color="error" size="sm" ghost onclick={() => deleteAlias(alias.id)}>
                        <ShIcon name="close" class="w-4 h-4" />
                      </ShButton>
                    </div>
                  </td>
                </tr>
              {/each}
              {#if settings.aliases.list.length === 0}
                <tr>
                  <td colspan="4" class="text-center text-base-content/60 py-8"> 暂无别名数据 </td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </ShFieldSet>
    </div>
  </div>
</div>
