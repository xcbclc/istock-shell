<script lang="ts">
  import { ShList, type ListRowProps, type ListRowAction } from '@istock/shell-ui';
  const actions: ListRowAction[] = [
    {
      size: 'sm',
      icon: { name: 'play', size: 'sm' },
    },
    {
      size: 'sm',
      icon: { name: 'heart', size: 'sm' },
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

<ShList {list} class="bg-base-100 rounded-box shadow-md">
  {#snippet prefixRender()}
    <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">本周播放最多的歌曲</li>
  {/snippet}
</ShList>
