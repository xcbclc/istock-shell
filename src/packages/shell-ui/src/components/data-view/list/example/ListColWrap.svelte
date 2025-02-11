<script lang="ts">
  import { ShList, ShListRow, ShIcon, ShButton, type ListRowProps, type ListRowAction } from '@istock/shell-ui';
  type ListRowPropsExtra = ListRowProps & { detail?: string };
  const actions: ListRowAction[] = [
    {
      size: 'sm',
      icon: { name: 'play', size: 'sm' },
    },
  ];
  const list: ListRowPropsExtra[] = $state<ListRowPropsExtra[]>([
    {
      text: 'Dio Lupa',
      description: 'Remaining Reason',
      detail:
        '"Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.',
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
      detail:
        '"Bears of a Fever" captivated audiences with its intense energy and mysterious lyrics. Its popularity skyrocketed after fans shared it widely online, earning Ellie critical acclaim.',
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
      detail:
        '"Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song’s success propelled Sabrino into the spotlight, solidifying their status as a rising star.',
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

<ShList class="max-w-md bg-base-100 rounded-box shadow-md">
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
      <p class="list-col-wrap text-xs">
        {row.detail}
      </p>
      {#each actions as action}
        {@const { icon, ...otherActionProps } = action}
        <ShButton shape="square" ghost {...otherActionProps}>
          <ShIcon {...icon} />
        </ShButton>
      {/each}
    </ShListRow>
  {/each}
</ShList>
