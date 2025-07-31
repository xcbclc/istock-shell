<script lang="ts" module>
  export interface ProxyConfigProps {
    windowId: number;
  }
</script>

<script lang="ts">
  import { ShFieldSet, ShField, ShToggle, ShInput, ShButton, ShIcon } from '@istock-shell/ui';

  let { windowId }: ProxyConfigProps = $props();
</script>

<!-- 接口代理配置 -->
<div class="space-y-4">
  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="全局设置" class="space-y-6">
        <ShField
          label={{ title: '启用全局代理', placement: 'after' }}
          class="flex items-center justify-between p-4 bg-base-200/50 rounded-lg"
        >
          <ShToggle bind:value={settings.proxyConfigs.globalEnabled} color="primary" size="md" />
        </ShField>
      </ShFieldSet>
    </div>
  </div>

  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="代理配置列表" class="space-y-6">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium">代理配置</span>
          <ShButton color="primary" size="sm" onclick={addProxyConfig}>
            <ShIcon name="network" class="w-4 h-4" />
            添加代理配置
          </ShButton>
        </div>

        {#each settings.proxyConfigs.list as proxy (proxy.id)}
          <div class="card bg-base-200/50 border border-base-300/30">
            <div class="card-body p-6">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <ShToggle bind:value={proxy.enabled} color="primary" size="sm" />
                  <h4 class="font-semibold">代理配置</h4>
                </div>
                <ShButton color="error" size="sm" ghost onclick={() => deleteProxyConfig(proxy.id)}>
                  <ShIcon name="close" class="w-4 h-4" />
                </ShButton>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <ShField label={{ title: '配置名称', placement: 'before' }} class="space-y-2">
                  <ShInput bind:value={proxy.name} placeholder="代理配置名称" size="sm" />
                </ShField>

                <ShField label={{ title: '代理主机', placement: 'before' }} class="space-y-2">
                  <ShInput bind:value={proxy.host} placeholder="127.0.0.1" size="sm" />
                </ShField>

                <ShField label={{ title: '端口', placement: 'before' }} class="space-y-2">
                  <ShInput bind:value={proxy.port} type="number" placeholder="8080" size="sm" />
                </ShField>

                <div></div>

                <ShField label={{ title: '用户名', placement: 'before' }} class="space-y-2">
                  <ShInput bind:value={proxy.username} placeholder="可选" size="sm" />
                </ShField>

                <ShField label={{ title: '密码', placement: 'before' }} class="space-y-2">
                  <ShInput bind:value={proxy.password} type="password" placeholder="可选" size="sm" />
                </ShField>
              </div>

              <!-- 匹配路径 -->
              <div class="mb-4">
                <div class="flex items-center justify-between mb-2">
                  <label class="text-sm font-medium">匹配路径</label>
                  <ShButton color="secondary" size="xs" onclick={() => addProxyPath(proxy.id)}>
                    <ShIcon name="link" class="w-3 h-3" />
                    添加路径
                  </ShButton>
                </div>
                <div class="space-y-2">
                  {#each proxy.matchPaths as path, index}
                    <div class="flex gap-2">
                      <ShInput bind:value={proxy.matchPaths[index]} placeholder="/api/*" size="sm" class="flex-1" />
                      <ShButton color="error" size="sm" ghost onclick={() => removeProxyPath(proxy.id, index)}>
                        <ShIcon name="close" class="w-4 h-4" />
                      </ShButton>
                    </div>
                  {/each}
                  {#if proxy.matchPaths.length === 0}
                    <p class="text-xs text-base-content/60">暂无匹配路径，将匹配所有请求</p>
                  {/if}
                </div>
              </div>

              <!-- 自定义头部 -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="text-sm font-medium">自定义头部</label>
                  <ShButton color="secondary" size="xs" onclick={() => addProxyHeader(proxy.id)}>
                    <ShIcon name="link" class="w-3 h-3" />
                    添加头部
                  </ShButton>
                </div>
                <div class="space-y-2">
                  {#each Object.entries(proxy.headers) as [key, value]}
                    <div class="flex gap-2">
                      <ShInput bind:value={key} placeholder="Header-Name" size="sm" class="flex-1" readonly />
                      <ShInput bind:value={proxy.headers[key]} placeholder="Header-Value" size="sm" class="flex-1" />
                      <ShButton color="error" size="sm" ghost onclick={() => removeProxyHeader(proxy.id, key)}>
                        <ShIcon name="close" class="w-4 h-4" />
                      </ShButton>
                    </div>
                  {/each}
                  {#if Object.keys(proxy.headers).length === 0}
                    <p class="text-xs text-base-content/60">暂无自定义头部</p>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/each}

        {#if settings.proxyConfigs.list.length === 0}
          <div class="text-center py-8">
            <div class="text-6xl mb-4">🌐</div>
            <h3 class="text-lg font-semibold text-base-content mb-2">暂无代理配置</h3>
            <p class="text-base-content/60">点击上方按钮添加代理配置</p>
          </div>
        {/if}
      </ShFieldSet>
    </div>
  </div>

  <div class="card bg-base-100 shadow-lg border border-base-300/50">
    <div class="card-body">
      <ShFieldSet title="使用说明" class="space-y-4">
        <div class="prose prose-sm max-w-none">
          <h4>代理配置说明：</h4>
          <ul>
            <li><strong>匹配路径</strong>：支持通配符，如 <code>/api/*</code></li>
            <li><strong>优先级</strong>：按配置顺序匹配，第一个匹配的配置生效</li>
            <li><strong>认证</strong>：用户名和密码为可选项</li>
            <li><strong>自定义头部</strong>：可添加额外的HTTP头部</li>
          </ul>
          <h4>注意事项：</h4>
          <ul>
            <li>代理配置仅对API请求生效</li>
            <li>请确保代理服务器可访问</li>
            <li>敏感信息将安全存储在本地</li>
          </ul>
        </div>
      </ShFieldSet>
    </div>
  </div>
</div>
