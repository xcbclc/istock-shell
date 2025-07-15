<script lang="ts" module>
  import type { PromptStoreDataText } from '@/store';
  export interface CmdPromptProps {
    texts: PromptStoreDataText[];
  }
</script>

<script lang="ts">
  import dayjs from 'dayjs';
  const { texts }: CmdPromptProps = $props();
  const getTimeText = (timeStr: string) => {
    const nowDay = dayjs(new Date()).format('YYYY-MM-DD');
    if (timeStr.startsWith(nowDay)) {
      // 当天只显日期后面的时间
      return timeStr.replace(`${nowDay} `, '');
    }
    return timeStr;
  };
</script>

<div class="flex items-center font-mono text-sm whitespace-nowrap">
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

<style>
  @reference "@istock-shell/ui/style";
  .is-username {
    @apply text-accent font-medium;
  }

  .is-path {
    @apply text-accent font-semibold;
  }

  .is-time {
    @apply text-secondary/80 font-medium;
  }

  .is-split {
    @apply text-base-content/60;
  }
</style>
