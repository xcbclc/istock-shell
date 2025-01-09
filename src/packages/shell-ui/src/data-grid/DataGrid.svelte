<script lang="ts">
  import type { ChartOptions } from '@antv/g2';
  import ShCard from '../card/index';
  import ShChart from '../chart/index';
  export let cards: Array<{ img?: string; list: Array<{ name: string; value: string; description?: string }> }> = [];
  export let charts: ChartOptions[] = [];
</script>

<div class="data-grid">
  {#if cards.length}
    <div class="grid-section grid-cards">
      {#each cards as card}
        <div class="grid-item grid-card">
          <ShCard {...card} />
        </div>
      {/each}
    </div>
  {/if}
  {#if charts.length}
    <div class="grid-section grid-charts">
      {#each charts as chat}
        <div class="grid-item grid-chart">
          <ShChart {...chat} />
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .data-grid {
    padding: var(--gap-default);
  }
  .grid-section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--gap-2x);
    &:not(:last-child) {
      margin-bottom: var(--gap-2x);
    }
  }
  .grid-cards {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  .grid-charts {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  }
  .grid-item {
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    :global(.card) {
      height: calc(100% - var(--gap-2x));
    }
  }
</style>
