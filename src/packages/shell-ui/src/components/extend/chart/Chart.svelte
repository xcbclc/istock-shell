<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Chart } from '@antv/g2';
  import type { ChartOptions } from '@antv/g2';
  interface Props {
    options?: ChartOptions;
  }

  const { options = {} }: Props = $props();
  let containerElement: HTMLElement = $state();
  let chart: Chart = $state();

  $effect(() => {
    if (chart) {
      chart.options(options);
      void chart.render();
    }
  });

  onMount(async () => {
    chart = new Chart({
      container: containerElement,
    });
    chart.options(options);
    await chart.render();
  });
  onDestroy(() => {
    chart && chart.destroy();
  });
</script>

<div bind:this={containerElement} class="chat-container"></div>
