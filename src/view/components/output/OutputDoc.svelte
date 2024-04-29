<script lang="ts">
  import type { TModelData } from '@istock/iswork';
  import { ShText } from '@istock/shell-ui';
  import type { CmdRouteModel } from '@domains/global/cmd-route/cmd-route.model';
  import OutputDocTable from './OutputDocTable.svelte';

  export let list: Array<TModelData<CmdRouteModel>> = [];

  const headers: string[] = ['名称', '描述', '类型', '是否可选', '默认值', '可选值'];
  const optionHeaders: string[] = ['选项参数', ...headers];
</script>

{#if list?.length}
  {#each list as item}
    <div class="block">
      <!-- 介绍 -->
      <h3 class="title">{item.cmd} {item.name}</h3>
      {#if item.description}
        <section class="section">
          <span class="label">描述：</span>
          <div class="content">{item.description}</div>
        </section>
      {/if}
      <!-- 用法 -->
      {#if item.usage}
        <section class="section">
          <span class="label">用法：</span>
          <div class="content">{item.usage}</div>
        </section>
      {/if}
      <!-- 使用案例 -->
      {#if item.example}
        <div class="section">
          <span class="label">示例：</span>
          <div class="content"></div>
          <div class="content">
            {item.example}
          </div>
        </div>
      {/if}
      <!-- 参数 -->
      {#if item.arguments?.length}
        <section class="section">
          <span class="label">参数：</span>
          <div class="content">
            <OutputDocTable {headers} options={item.arguments} />
          </div>
        </section>
      {/if}
      <!-- 选项参数 -->
      {#if item.options?.length}
        <section class="section">
          <span class="label">选项：</span>
          <div class="content">
            <OutputDocTable headers={optionHeaders} options={item.options} type={2} />
          </div>
        </section>
      {/if}
      {#if item.subcommand?.length}
        <div class="sub-block">
          <svelte:self list={item.subcommand} />
        </div>
      {/if}
    </div>
  {/each}
{:else if list && !list.length}
  <ShText texts={[{ type: 'warning', text: '暂无数据' }]} />
{/if}

<style lang="scss">
  :root {
    --doc-title-font-size: var(--font-size-default);
    --doc-title-color: var(--color-text-command);
    --doc-gap: var(--gap-default);
    --doc-sub-gap-left: var(--gap-4x);
    --doc-border-color: rgba(255, 255, 255, 0.1);
  }
  .block {
    padding: var(--doc-gap) 0;
    &:not(:last-child) {
      border-bottom: 1px dashed var(--doc-border-color);
    }
  }
  .sub-block {
    padding-left: var(--doc-sub-gap-left);
  }
  .title {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    font-size: var(--doc-title-font-size);
    color: var(--doc-title-color);
    font-weight: var(--font-weight);
  }
  .section {
    display: flex;
    margin-top: 0.8em;
    margin-bottom: 0.8em;
  }
  .label {
    padding-right: var(--doc-gap);
    flex-shrink: 0;
  }
</style>
