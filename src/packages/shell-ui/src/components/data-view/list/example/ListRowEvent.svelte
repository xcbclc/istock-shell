<script lang="ts">
  import { ShList, ShListRow, ShButton, ShIcon, type ListRowProps, type ListRowAction } from '@istock-shell/ui';
  const onActionClickValue = (name?: string, action?: ListRowAction) => {
    console.log('执行动作', name, action);
  };
  const oRowClickAction = (row: ListRowProps) => {
    console.log('点击行', row);
  };
  const actions: ListRowAction[] = [
    {
      name: 'play',
      size: 'sm',
      icon: { name: 'play', size: 'sm' },
      onClickValue: onActionClickValue,
    },
    {
      name: 'like',
      size: 'sm',
      icon: { name: 'heart', size: 'sm' },
      onClickValue: onActionClickValue,
    },
  ];
  const list: ListRowProps[] = $state<ListRowProps[]>([
    {
      text: 'Dio Lupa',
      description: 'Remaining Reason',
      picture: {
        img: {
          class: 'size-10 rounded-box',
          src: 'https://img.daisyui.com/images/profile/demo/1@94.webp',
        },
      },
      onClickValue: oRowClickAction,
      actions,
    },
    {
      text: 'Ellie Beilish',
      description: 'Bears of a fever',
      picture: {
        img: {
          class: 'size-10 rounded-box',
          src: 'https://img.daisyui.com/images/profile/demo/4@94.webp',
        },
      },
      onClickValue: oRowClickAction,
      actions,
    },
    {
      text: 'Sabrino Gardener',
      description: 'Cappuccino',
      picture: {
        img: {
          class: 'size-10 rounded-box',
          src: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
        },
      },
      onClickValue: oRowClickAction,
      actions,
    },
  ]);
</script>

<div>
  <h3 class="text-md font-semibold">数据驱动使用事件：</h3>
  <ShList {list} class="bg-base-100 rounded-box shadow-md">
    {#snippet prefixRender()}
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">本周播放最多的歌曲</li>
    {/snippet}
  </ShList>
</div>

<div>
  <h3 class="text-md font-semibold">组件驱动使用事件：</h3>
  <ShList class="bg-base-100 rounded-box shadow-md">
    {#snippet prefixRender()}
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">本周播放最多的歌曲</li>
    {/snippet}
    {#each list as row}
      <ShListRow
        onclick={() => {
          console.log('点击行', row);
        }}
      >
        <div><img class="size-10 rounded-box" src={row.picture?.img?.src} /></div>
        <div class="list-col-grow">
          <div>{row.text}</div>
          <div class="text-xs">{row.description}</div>
        </div>
        {#each actions as action}
          <ShButton
            shape="square"
            ghost
            {...action}
            onclick={(event: Event) => {
              event.stopPropagation();
              console.log('执行动作', action.name, action);
            }}
          >
            <ShIcon {...action.icon} />
          </ShButton>
        {/each}
      </ShListRow>
    {/each}
  </ShList>
</div>
