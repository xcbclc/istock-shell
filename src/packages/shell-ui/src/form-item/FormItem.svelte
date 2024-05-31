<section class="form-item">
  <slot />
</section>

<style lang="scss">
  .form-item {
    padding: var(--gap-default) 0;
    :global(.label) {
      min-width: 4em;
    }
    :global(label) {
      width: 100%;
    }
  }
</style>
