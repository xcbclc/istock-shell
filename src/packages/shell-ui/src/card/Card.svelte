<script lang="ts">
  import { ShIcon } from '../icon/index';
  export let img: string = '';
  export let list: Array<{ name: string; value: string; description?: string }> = [];
</script>

<div class="card">
  {#if img}
    <div class="card-image">
      <img src={img} alt="" />
    </div>
  {/if}
  <dl>
    {#each list as item, index}
      {#if index === 0}
        <dt class="card-text is-strong">
          <h3 class="card-field-name">
            <span>{item.name}</span>
            {#if item.description}<ShIcon icon="question" title={item.description} />{/if}
          </h3>
          <p class="card-field-value">{item.value}</p>
        </dt>
      {:else}
        <dd class="card-text">
          <h3 class="card-field-name">
            <span>{item.name}</span>
            {#if item.description}<ShIcon icon="question" title={item.description} />{/if}
          </h3>
          <p class="card-field-value">{item.value}</p>
        </dd>
      {/if}
    {/each}
  </dl>
</div>

<style lang="scss">
  .card {
    padding: var(--gap-default) var(--gap-2x);
    background-color: var(--color-sub-background);
    border-radius: var(--border-radius);
    transform: scale(1, 1);
    transition: transform ease var(--transition-duration);
    &:hover {
      transform: scale(1.05, 1.05);
    }
    dl {
      margin: 0;
    }
  }
  .card-image {
    text-align: center;
    max-width: 100%;
    height: auto;
  }
  .card-text {
    display: flex;
    margin: var(--gap-zero2x) 0;
    align-items: center;
    &.is-strong {
      flex-direction: column;
      .card-field-value {
        color: var(--color-text-primary);
        font-size: var(--font-size-4xl);
      }
    }
  }
  .card-field-name {
    margin: 0;
    padding-right: var(--gap-default);
    flex: auto;
    font-size: var(--font-size-xl);
    font-weight: normal;
    & > span {
      display: inline-block;
      vertical-align: middle;
    }
    & > :global(.icon) {
      cursor: pointer;
      visibility: hidden;
    }
    &:hover > :global(.icon) {
      visibility: visible;
    }
  }
  .card-field-value {
    margin: 0;
    color: var(--color-text-secondary);
    font-weight: var(--font-weight);
    font-size: var(--font-size-3xl);
  }
</style>
