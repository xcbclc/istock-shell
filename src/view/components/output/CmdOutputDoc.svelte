<script lang="ts" module>
  import type { ModelData } from '@istock-shell/iswork';
  import type { CmdRouteModel } from '@domains/global/cmd-route/cmd-route.model';

  export interface CmdOutputDocProps {
    list: Array<ModelData<CmdRouteModel>>;
  }
</script>

<script lang="ts">
  import { ShEmpty } from '@istock-shell/ui';
  import CmdOutputDocTable, { type CmdOutputDocTableHeader } from './CmdOutputDocTable.svelte';

  const { list }: CmdOutputDocProps = $props();

  const headers: CmdOutputDocTableHeader[] = [
    { value: '名称' },
    { value: '描述', size: 'xl' },
    { value: '类型' },
    { value: '是否可选' },
    { value: '默认值' },
    { value: '可选值', size: 'md' },
  ];
  const optionHeaders: CmdOutputDocTableHeader[] = [{ value: '选项参数' }, ...headers];
</script>

{#if list?.length}
  <div class="space-y-6 p-1">
    {#each list as item}
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body p-4 gap-4">
          <!-- 介绍 -->
          <h3 class="card-title text-primary font-bold text-lg">{item.cmd} {item.name}</h3>

          {#if item.description}
            <div class="grid grid-cols-24 gap-2">
              <div class="col-span-3 xl:col-span-1 md:col-span-24 text-base-content/60 font-medium">描述：</div>
              <div class="col-span-21 xl:col-span-23 md:col-span-24 lg:col-span-23">{item.description}</div>
            </div>
          {/if}

          <!-- 用法 -->
          {#if item.usage}
            <div class="grid grid-cols-24 gap-2">
              <div class="col-span-3 xl:col-span-1 md:col-span-24 text-base-content/60 font-medium">用法：</div>
              <div class="col-span-21 xl:col-span-23 md:col-span-24">
                <div class="mockup-code text-sm">
                  <pre><code>{item.usage}</code></pre>
                </div>
              </div>
            </div>
          {/if}

          <!-- 使用案例 -->
          {#if item.example}
            <div class="grid grid-cols-24 gap-2">
              <div class="col-span-3 xl:col-span-1 md:col-span-24 text-base-content/60 font-medium">示例：</div>
              <div class="col-span-21 xl:col-span-23 md:col-span-24">
                <div class="mockup-code text-sm">
                  <pre><code>{item.example}</code></pre>
                </div>
              </div>
            </div>
          {/if}

          <!-- 参数 -->
          {#if item.arguments?.length}
            <div class="grid grid-cols-24 gap-2">
              <div class="col-span-3 xl:col-span-1 md:col-span-24 text-base-content/60 font-medium">参数：</div>
              <div class="col-span-21 xl:col-span-23 md:col-span-24">
                <CmdOutputDocTable {headers} options={item.arguments} type={1} />
              </div>
            </div>
          {/if}

          <!-- 选项参数 -->
          {#if item.options?.length}
            <div class="grid grid-cols-24 gap-2">
              <div class="col-span-3 xl:col-span-1 md:col-span-24 text-base-content/60 font-medium">选项：</div>
              <div class="col-span-21 xl:col-span-23 md:col-span-24">
                <CmdOutputDocTable headers={optionHeaders} options={item.options} type={2} />
              </div>
            </div>
          {/if}

          <!-- 子命令 -->
          {#if item.subcommand && Array.isArray(item.subcommand) && item.subcommand.length > 0}
            <div class="pl-6 border-l-4 border-base-300 mt-2">
              <svelte:self list={item.subcommand} />
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
{:else if list && !list.length}
  <ShEmpty />
{/if}
