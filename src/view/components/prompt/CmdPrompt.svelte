<script lang="ts">
  import { toLocaleDateString } from '@istock/util';
  import type { TPromptText } from '@/store/cmd/cmd-prompt';
  export let texts: TPromptText[] = [];

  const getTimeText = (timeStr: string) => {
    const nowDay = toLocaleDateString(new Date(), 'YYYY-MM-DD');
    if (timeStr.startsWith(nowDay)) {
      // 当天只显日期后面的时间
      return timeStr.replace(`${nowDay} `, '');
    }
    return timeStr;
  };
</script>

<div class="flex items-center font-mono text-sm">
  {#each texts as item}
    <span class={`mr-2 is-${item.type}`}>
      {#if item.type === 'time'}
        {getTimeText(item.text)}
      {:else}
        {item.text}
      {/if}
    </span>
  {/each}
</div>

<style lang="scss">
  .is-username {
    @apply text-secondary font-medium;
  }

  .is-path {
    @apply text-secondary font-medium;
  }

  .is-time {
    @apply text-secondary-focus;
  }

  .is-split {
    @apply text-base-content/70;
  }
</style>
