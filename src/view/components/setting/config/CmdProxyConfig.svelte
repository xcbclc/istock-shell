<script lang="ts" module>
  export interface ProxyConfigProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShInput, ShButton, ShIcon, shShowMessage } from '@istock-shell/ui';
  import { CmdWindowsManager } from '@/window/cmd-windows-manager';
  import type { ProxyStoreData } from '@/store';

  let { windowId }: ProxyConfigProps = $props();
  const cmdWindow = CmdWindowsManager.cmdWindowsManager.getCmdWindow();
  const { proxy } = cmdWindow.store;

  const onSaveOrEdit = async (storeData: ProxyStoreData) => {
    if (proxy.editRecord[storeData.id]) {
      await onCreateOrUpdate(storeData);
    } else {
      proxy.editRecord[storeData.id] = true;
    }
  };

  const onCreateOrUpdate = async (storeData: ProxyStoreData) => {
    const data = $state.snapshot(storeData);
    const urlRegex =
      /^(https|http):\/\/(?:([a-zA-Z0-9_-]+\.)+[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3}|localhost)(?::\d+)?(?:\/[\w#!:.?+=&%@!$'~*\-]*)?$/;

    // 基础字段验证
    if (!data.name || data.name.trim() === '') {
      shShowMessage.error('请输入代理名称');
      return;
    }
    if (data.name.length > 50) {
      shShowMessage.error('代理名称不能超过50个字符');
      return;
    }
    if (!data.url || data.url.trim() === '') {
      shShowMessage.error('请输入代理地址');
      return;
    }
    if (!urlRegex.test(data.url)) {
      shShowMessage.error('代理地址格式不正确，请输入有效的HTTP或HTTPS地址');
      return;
    }

    // 检查代理名称是否重复（排除当前编辑的项目）
    const existingProxy = proxy.list.find((item) => item.name === data.name && item.id !== data.id);
    if (existingProxy) {
      shShowMessage.error('代理名称已存在，请使用其他名称');
      return;
    }

    // 验证路径重写规则格式
    if (data.pathRewrite && data.pathRewrite.length > 0) {
      for (const [from, to] of data.pathRewrite) {
        if (!from || !to) {
          shShowMessage.error('路径重写规则格式不正确，请确保每行都包含完整的映射关系');
          return;
        }
        if (!from.startsWith('/')) {
          shShowMessage.error(`路径重写规则 "${from}" 必须以 "/" 开头`);
          return;
        }
      }
    }

    // 验证请求头格式
    if (data.headers && Object.keys(data.headers).length > 0) {
      for (const [key, value] of Object.entries(data.headers)) {
        if (!key || !value) {
          shShowMessage.error('请求头格式不正确，请确保每行都包含完整的键值对');
          return;
        }
        if (key.includes(' ') || key.includes(':')) {
          shShowMessage.error(`请求头名称 "${key}" 不能包含空格或冒号`);
          return;
        }
      }
    }

    try {
      if (proxy.isCreateData(data)) {
        await proxy.create(data);
        proxy.editRecord[storeData.id] = false;
        shShowMessage.success('代理配置新增成功');
        await proxy.getList();
      } else {
        await proxy.update(data);
        proxy.editRecord[storeData.id] = false;
        shShowMessage.success('代理配置保存成功');
      }
    } catch (error) {
      console.error('代理配置操作失败:', error);
      shShowMessage.error('操作失败，请稍后重试');
    }
  };

  const onDelete = async (id: string) => {
    try {
      const result = await proxy.delete(id);
      if (result !== false) {
        shShowMessage.success('代理配置删除成功');
        await proxy.getList();
      } else {
        shShowMessage.error('删除失败，请稍后重试');
      }
    } catch (error) {
      console.error('删除代理配置失败:', error);
      shShowMessage.error('删除失败，请稍后重试');
    }
  };

  const onCancelEdit = (id: string) => {
    proxy.editRecord[id] = false;
    // 如果是新增的临时记录，则从列表中移除
    if (id === proxy.newTempId) {
      proxy.list = proxy.list.filter((item) => item.id !== id);
      proxy.newTempId = '';
    } else {
      // 如果是编辑现有记录，重新获取数据以恢复原始值
      proxy.getList();
    }
  };

  // 处理路径重写规则的显示和编辑
  const formatPathRewrite = (pathRewrite: Array<[string, string]>) => {
    if (!pathRewrite || pathRewrite.length === 0) return '';
    return pathRewrite.map(([from, to]) => `${from} -> ${to}`).join('\n');
  };

  const parsePathRewrite = (text: string): Array<[string, string]> => {
    if (!text.trim()) return [];
    return text
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => {
        const [from, to] = line.split(' -> ');
        return [from?.trim() || '', to?.trim() || ''];
      })
      .filter(([from, to]) => from && to);
  };

  // 处理请求头的显示和编辑
  const formatHeaders = (headers: Record<string, string>) => {
    if (!headers || Object.keys(headers).length === 0) return '';
    return Object.entries(headers)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  };

  const parseHeaders = (text: string): Record<string, string> => {
    if (!text.trim()) return {};
    const headers: Record<string, string> = {};
    text
      .split('\n')
      .filter((line) => line.trim())
      .forEach((line) => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          headers[key.trim()] = valueParts.join(':').trim();
        }
      });
    return headers;
  };

  const onAddPathRewrite = (storeData: ProxyStoreData) => {
    if (!storeData.pathRewrite) storeData.pathRewrite = [];
    const canAdd = storeData.pathRewrite.every(([sourcePath, targetPath]) => {
      return sourcePath.trim() && targetPath.trim();
    });
    if (canAdd) {
      storeData.pathRewrite.push(['', '']);
    }
  };

  const onAddHeaders = (storeData: ProxyStoreData) => {
    if (!storeData.headers) {
      storeData.headers = {};
    }
    storeData.headers[''] = '';
    storeData.headers = { ...storeData.headers };
  };
</script>

<!-- 接口代理配置 -->
<div class="space-y-4">
  <!-- 添加代理按钮 -->
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg font-semibold text-base-content">代理配置</h3>
          <p class="text-sm text-base-content/60">管理API接口代理设置</p>
        </div>
        <ShButton color="primary" size="md" disabled={proxy.hasAdd} onclick={() => proxy.onAddProxy()}>
          <ShIcon name="plus" class="w-4 h-4" />
          添加代理
        </ShButton>
      </div>
    </div>
  </div>

  <!-- 代理列表 -->
  <div class="space-y-3">
    {#each proxy.list as item, index}
      {@const displayItem = proxy.displayList[index]}
      {@const isEditing = proxy.editRecord[item.id]}

      <div class="card bg-base-100 shadow-lg border border-base-300/50 transition-all duration-200 hover:shadow-xl">
        <div class="card-body">
          <!-- 卡片头部 -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ShIcon name="globe" class="w-5 h-5 text-primary" />
              </div>
              <div class="flex-1">
                {#if isEditing}
                  <ShInput
                    type="input"
                    bind:value={item.name}
                    placeholder="请输入代理名称"
                    class="font-medium text-base"
                  />
                {:else}
                  <h4 class="font-medium text-base text-base-content">{item.name || '未命名代理'}</h4>
                {/if}
                <p class="text-xs text-base-content/50 mt-1">更新时间: {displayItem.updateDate}</p>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex gap-2">
              {#if isEditing}
                <ShButton size="sm" color="primary" onclick={() => onSaveOrEdit(item)}>
                  <ShIcon name="check" class="w-3 h-3" />
                  保存
                </ShButton>
                <ShButton size="sm" color="warning" ghost onclick={() => onCancelEdit(item.id)}>
                  <ShIcon name="x" class="w-3 h-3" />
                  取消
                </ShButton>
              {:else}
                <ShButton size="sm" color="primary" ghost onclick={() => onSaveOrEdit(item)}>
                  <ShIcon name="edit" class="w-3 h-3" />
                  编辑
                </ShButton>
                {#if 'id' in item && item.id && item.id !== proxy.newTempId}
                  <ShButton size="sm" color="error" ghost onclick={async () => onDelete(item.id)}>
                    <ShIcon name="trash" class="w-3 h-3" />
                    删除
                  </ShButton>
                {/if}
              {/if}
            </div>
          </div>

          <!-- 代理地址 -->
          <div class="space-y-3">
            <div>
              <label class="text-sm font-medium text-base-content/80 mb-2 block">代理地址</label>
              {#if isEditing}
                <ShInput type="url" bind:value={item.url} placeholder="https://api.example.com" class="w-full" />
              {:else}
                <div class="p-3 bg-base-200/50 rounded-lg">
                  <span class="text-sm font-mono">{item.url || '未设置'}</span>
                </div>
              {/if}
            </div>

            <!-- 路径重写 -->
            <div>
              <label class="text-sm font-medium text-base-content/80 mb-2 block">路径重写规则</label>
              {#if isEditing}
                <div class="space-y-2">
                  {#each item.pathRewrite || [] as [from, to], index}
                    <div class="flex gap-2 items-center p-2 bg-base-200/30 rounded-lg">
                      <ShInput
                        type="input"
                        bind:value={item.pathRewrite[index][0]}
                        placeholder="/api/v1"
                        class="flex-1"
                        size="sm"
                      />
                      <ShIcon name="arrow-right" class="w-4 h-4 text-base-content/60" />
                      <ShInput
                        type="input"
                        bind:value={item.pathRewrite[index][1]}
                        placeholder="/v1"
                        class="flex-1"
                        size="sm"
                      />
                      <ShButton
                        size="sm"
                        ghost
                        color="error"
                        onclick={() => {
                          item.pathRewrite = item.pathRewrite?.filter((_, i) => i !== index) || [];
                        }}
                      >
                        <ShIcon name="trash" class="w-3 h-3" />
                        删除
                      </ShButton>
                    </div>
                  {/each}
                  <ShButton size="sm" ghost color="primary" onclick={() => onAddPathRewrite(item)} class="w-full">
                    <ShIcon name="plus" class="w-3 h-3" />
                    添加路径重写
                  </ShButton>
                </div>
              {:else}
                <div class="p-3 bg-base-200/50 rounded-lg">
                  {#each item.pathRewrite || [] as [from, to]}
                    <div class="text-sm font-mono text-base-content/80 flex items-center gap-2">
                      <span>{from}</span>
                      <ShIcon name="arrow-right" class="w-3 h-3" />
                      <span>{to}</span>
                    </div>
                  {:else}
                    <span class="text-sm text-base-content/50">无路径重写规则</span>
                  {/each}
                </div>
              {/if}
            </div>

            <!-- 请求头 -->
            <div>
              <label class="text-sm font-medium text-base-content/80 mb-2 block">请求头</label>
              {#if isEditing}
                <div class="space-y-2">
                  {#each Object.entries(item.headers || {}) as [key, value], index}
                    <div class="flex gap-2 items-center p-2 bg-base-200/30 rounded-lg">
                      <ShInput
                        type="input"
                        value={key}
                        onchange={(e) => {
                          if (item.headers) {
                            const newHeaders = { ...item.headers };
                            delete newHeaders[key];
                            newHeaders[e.target.value] = value;
                            item.headers = newHeaders;
                          }
                        }}
                        placeholder="Authorization"
                        class="flex-1"
                        size="sm"
                      />
                      <span class="text-xs text-base-content/60">:</span>
                      <ShInput
                        type="input"
                        {value}
                        onchange={(e) => {
                          if (item.headers) {
                            item.headers[key] = e.target.value;
                            item.headers = { ...item.headers };
                          }
                        }}
                        placeholder="Bearer token"
                        class="flex-1"
                        size="sm"
                      />
                      <ShButton
                        size="sm"
                        ghost
                        color="error"
                        onclick={() => {
                          if (item.headers) {
                            delete item.headers[key];
                            item.headers = { ...item.headers };
                          }
                        }}
                      >
                        <ShIcon name="trash" class="w-3 h-3" />
                        删除
                      </ShButton>
                    </div>
                  {/each}
                  <ShButton size="sm" ghost color="primary" onclick={() => onAddHeaders(item)} class="w-full">
                    <ShIcon name="plus" class="w-3 h-3" />
                    添加请求头
                  </ShButton>
                </div>
              {:else}
                <div class="p-3 bg-base-200/50 rounded-lg">
                  {#each Object.entries(item.headers || {}) as [key, value]}
                    <div class="text-sm font-mono text-base-content/80">
                      <span class="text-primary">{key}:</span>
                      {value}
                    </div>
                  {:else}
                    <span class="text-sm text-base-content/50">无自定义请求头</span>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {:else}
      <!-- 空状态 -->
      <div class="card bg-base-100 shadow-lg border border-base-300/50">
        <div class="card-body text-center py-12">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-base-200/50 flex items-center justify-center">
            <ShIcon name="globe" class="w-8 h-8 text-base-content/40" />
          </div>
          <h3 class="text-lg font-medium text-base-content mb-2">暂无代理配置</h3>
          <p class="text-sm text-base-content/60 mb-4">点击上方按钮添加您的第一个代理配置</p>
        </div>
      </div>
    {/each}
  </div>
</div>
