<script lang="ts">
  import type { TModelData } from '@istock/iswork';
  import { ShText } from '@istock/shell-ui';
  import type { CmdRouteModel } from '@domains/global/cmd-route/cmd-route.model';

  export let list: Array<TModelData<CmdRouteModel>> = [];

  const headers: string[] = ['参数类型', '是否可选', '默认值', '可选值'];
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
      <!--
    <div class="section">
      <span class="label">示例：</span>
      <div class="content"></div>
      <div class="content">
        <p>yhdl -yhm 18215507137 账号登录</p>
        <p>yhdl -yhm 18215507137 账号登录</p>
      </div>
    </div>
    -->
      <!-- 参数 -->
      {#if item.options?.length}
        <section class="section">
          <span class="label">参数：</span>
          <div class="content">
            <div class="params">
              {#each item.options as option}
                <div class="param">
                  <div class="param-base">
                    <span class="param-parameter">{option.parameter}</span>
                    <span class="param-name">{option.name}</span>
                    <span class="param-description">
                      {#each (option.description ?? '').split('\n') as des}
                        {des}<br />
                      {/each}
                    </span>
                  </div>
                  <div class="param-table">
                    <table>
                      <thead>
                        {#each headers as header}
                          <th scope="col">{header}</th>
                        {/each}
                      </thead>
                      <tbody>
                        <tr>
                          <td>{option.parameterType}</td>
                          <td>{option.optional}</td>
                          <td>{option.default}</td>
                          <td>{option.choices}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </section>
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
    --doc-border-color: rgba(255, 255, 255, 0.1);
  }
  .block {
    padding: var(--doc-gap) 0;
    &:not(:last-child) {
      border-bottom: 1px dashed var(--doc-border-color);
    }
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
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
  .label {
    padding-right: var(--doc-gap);
    flex-shrink: 0;
  }
  .param-table {
    max-width: 100%;
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }
  th,
  td {
    vertical-align: top;
    border: 1px solid var(--doc-border-color);
    padding-left: 1em;
    padding-right: 1em;
  }
  th {
    font-weight: normal;
  }
  /*p {
    margin-top: 0;
    margin-bottom: 0;
  }*/
  .params {
    display: flex;
    flex-direction: column;
  }
  .param:not(:last-child) {
    margin-bottom: 1em;
  }
  .param-base {
    display: flex;
    margin-bottom: 0.5em;
  }
  .param-parameter,
  .param-name {
    padding-right: 1em;
  }
  .param-parameter {
  }
  .param-description {
    flex: 1;
  }
</style>
