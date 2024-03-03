<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Chart } from '@antv/g2';
  import type { ChartOptions } from '@antv/g2';
  export let options: ChartOptions = {};
  let containerElement: HTMLElement;
  let chart: Chart;

  $: if (chart) {
    chart.options(options);
    void chart.render();
  }

  onMount(async () => {
    chart = new Chart({
      container: containerElement,
    });
    console.log('options', options);
    chart.options(options);
    await chart.render();
  });
  onDestroy(() => {
    chart && chart.destroy();
  });
</script>

<div bind:this={containerElement} class="chat-container"></div>
