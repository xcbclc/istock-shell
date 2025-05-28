<script lang="ts">
  import {
    ShStat,
    ShStatItem,
    ShStatTitle,
    ShStatValue,
    ShStatDesc,
    ShStatFigure,
    type StatItemProps,
  } from '@istock-shell/ui';
  const list: StatItemProps[] = $state([
    {
      title: '总喜欢数',
      value: {
        text: '25.6K',
        color: 'primary',
      },
      desc: '比上个月增加21%',
      figure: {
        icon: {
          name: 'heart',
          color: 'primary',
        },
      },
    },
    {
      title: '页面浏览',
      value: {
        text: '2.6M',
        color: 'secondary',
      },
      desc: '比上个月增加21%',
      figure: {
        icon: {
          name: 'lightning',
          color: 'secondary',
        },
      },
    },
    {
      title: '任务已完成',
      value: '86%',
      desc: '剩余31项任务',
    },
  ]);
</script>

<ShStat>
  {#each list as item, index}
    {#if index === 2}
      <ShStatItem>
        <ShStatFigure class="text-secondary">
          <div class="avatar online">
            <div class="w-16 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </ShStatFigure>
        <ShStatValue>{item.value}</ShStatValue>
        <ShStatTitle>{item.title}</ShStatTitle>
        <ShStatDesc class="text-secondary">{item.desc}</ShStatDesc>
      </ShStatItem>
    {:else}
      <ShStatItem {...item} />
    {/if}
  {/each}
</ShStat>
