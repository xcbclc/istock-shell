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

<div class="cmd-prompt">
  {#each texts as item}
    <span class={`cmd-prompt-text is-${item.type}`}>
      {#if item.type === 'time'}
        {getTimeText(item.text)}
      {:else}
        {item.text}
      {/if}
    </span>
  {/each}
</div>

<style lang="scss">
  :root {
    --cmd-prompt-gap: 0.1em;
  }
  .cmd-prompt {
    display: inline;
    padding-right: var(--cmd-prompt-gap);
  }
  .cmd-prompt-text {
    margin-right: var(--cmd-prompt-gap);
    &.is-username,
    &.is-path,
    &.is-time,
    &.is-split {
      color: var(--color-prompt);
    }
  }
</style>
