<script lang="ts">
  export let icon: string = '';
  export let size: number = 16;
  export let color: string = '';

  export let title: string = '';

  const iconUrlRecord: Record<string, () => Promise<string>> = {
    question: async (): Promise<string> => {
      const svg = await import('./svg/question.svg?raw');
      return svg.default;
    },
  };

  $: style = [
    size ? 'width:' + size + 'px' : '',
    size ? 'height:' + size + 'px' : '',
    color ? 'color:' + color : '',
  ].join(';');
</script>

<i class={['icon', icon ? 'icon-' + icon : ''].join(' ')} {style} {title}>
  {#await iconUrlRecord[icon]?.() ?? '' then svg}
    <!--eslint-disable-next-line svelte/no-at-html-tags-->
    {@html svg}
  {/await}
</i>

<style lang="scss">
  .icon {
    display: inline-block;
    color: var(--color-text-default);
    vertical-align: middle;
    :global(svg) {
      vertical-align: top;
    }
  }
</style>
