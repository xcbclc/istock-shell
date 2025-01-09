<script lang="ts">
  import type { ChartOptions } from '@antv/g2';
  import ShCard from '../card/index';
  import ShChart from '../chart/index';
  export let cards: Array<{ img?: string; list: Array<{ name: string; value: string; description?: string }> }> = [];
  export let charts: Array<{ options: ChartOptions }> = [];
</script>

<div class="data-grid">
  {#if cards.length}
    <div class="grid-section grid-cards">
      {#each cards as card}
        <div class="grid-item grid-card">
          <div class="grid-item-inner">
            <ShCard {...card} />
          </div>
        </div>
      {/each}
    </div>
  {/if}
  {#if charts.length}
    <div class="grid-section grid-charts">
      {#each charts as chat}
        <div class="grid-item grid-chart">
          <div class="grid-item-inner">
            <ShChart {...chat} />
          </div>
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
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    &:not(:last-child) {
      margin-bottom: var(--gap-2x);
    }
  }
  .grid-item-inner {
    padding: var(--gap-default);
    height: calc(100% - var(--gap-2x));
  }
  .grid-card,
  .grid-chart {
    flex: 1 0 auto;
  }
  .grid-card {
    min-width: 20%;
    max-width: 100%;
    :global(.card) {
      height: inherit;
    }
  }
  .grid-chart {
    min-width: 50%;
    max-width: 100%;
    :global(.chat-container) {
      max-width: 100%;
    }
  }
</style>
