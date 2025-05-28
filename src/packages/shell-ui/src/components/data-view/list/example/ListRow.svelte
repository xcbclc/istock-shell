<script lang="ts">
  import { ShList, ShListRow, ShIcon, ShButton, type ListRowProps, type ListRowAction } from '@istock-shell/ui';
  const actions: ListRowAction[] = [
    {
      size: 'sm',
      icon: { name: 'play', size: 'sm' },
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
      actions,
    },
  ]);
</script>

<ShList class="bg-base-100 rounded-box shadow-md">
  {#snippet prefixRender()}
    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">本周播放最多的歌曲</li>
  {/snippet}
  {#each list as row, index}
    <ShListRow>
      <div class="text-4xl font-thin opacity-30 tabular-nums">{`0${index + 1}`}</div>
      <div><img class="size-10 rounded-box" src={row.picture?.img?.src} /></div>
      <div class="list-col-grow">
        <div>{row.text}</div>
        <div class="text-xs">{row.description}</div>
      </div>
      {#each actions as action}
        <ShButton shape="square" ghost {...action}>
          <ShIcon {...action.icon} />
        </ShButton>
      {/each}
    </ShListRow>
  {/each}
</ShList>
