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
  @reference "@istock/shell-ui/src/style/daisyui.css";
  .is-username {
    @apply text-accent font-semibold;
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
