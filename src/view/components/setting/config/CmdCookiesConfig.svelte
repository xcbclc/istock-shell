<!--
  @component CookiesConfig Cookie配置组件

  网站Cookie管理相关的配置项
-->

<script lang="ts" module>
  export interface CookiesConfigProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShFieldSet, ShField, ShToggle, ShInput, ShButton, ShIcon } from '@istock-shell/ui';

  let { windowId }: CookiesConfigProps = $props();

  // Cookie设置数据
  let settings = $state({
    cookies: {
      list: [],
      autoClean: false,
      cleanInterval: 24, // 小时
    },
  });

  // Cookie管理相关函数
  const addCookie = () => {
    settings.cookies.list.push({
      id: Date.now().toString(),
      host: '',
      cookie: '',
      isEdit: true,
    });
  };

  const deleteCookie = (id: string) => {
    settings.cookies.list = settings.cookies.list.filter((item) => item.id !== id);
  };
</script>

<!-- 网站Cookie管理 -->
<div class="space-y-8">
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="Cookie设置" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShField
            label={{ title: '自动清理', placement: 'after' }}
            class="flex items-center justify-between p-4 bg-base-200/50 rounded-lg"
          >
            <ShToggle bind:value={settings.cookies.autoClean} color="primary" size="md" />
          </ShField>

          <ShField label={{ title: '清理间隔（小时）', placement: 'before' }} class="space-y-4">
            <ShInput bind:value={settings.cookies.cleanInterval} type="number" min="1" max="168" size="md" />
          </ShField>
        </div>
      </ShFieldSet>
    </div>
  </div>

  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="Cookie列表" class="space-y-6">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium">已保存的Cookie</span>
          <ShButton color="primary" size="sm" onclick={addCookie}>
            <ShIcon name="cookie" class="w-4 h-4" />
            添加Cookie
          </ShButton>
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>网站</th>
                <th>Cookie内容</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {#each settings.cookies.list as cookie (cookie.id)}
                <tr>
                  <td>
                    <ShInput bind:value={cookie.host} placeholder="example.com" size="sm" />
                  </td>
                  <td>
                    <textarea
                      bind:value={cookie.cookie}
                      placeholder="cookie内容..."
                      class="textarea textarea-bordered textarea-sm w-full min-h-[60px] resize-none"
                    ></textarea>
                  </td>
                  <td>
                    <div class="flex gap-2">
                      <ShButton color="error" size="sm" ghost onclick={() => deleteCookie(cookie.id)}>
                        <ShIcon name="close" class="w-4 h-4" />
                      </ShButton>
                    </div>
                  </td>
                </tr>
              {/each}
              {#if settings.cookies.list.length === 0}
                <tr>
                  <td colspan="3" class="text-center text-base-content/60 py-8"> 暂无Cookie数据 </td>
                </tr>
              {/if}
            </tbody>
          </table>
        </div>
      </ShFieldSet>
    </div>
  </div>
</div>
