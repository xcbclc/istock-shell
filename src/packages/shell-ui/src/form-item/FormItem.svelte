<script lang="ts">
  export let label: string = '';
  export let name: string = '';
</script>

<section class="form-item">
  <div class="form-item-label">{label}</div>
  <div class="form-item-content">
    <slot />
  </div>
</section>

<style lang="scss">
  .form-item {
    display: flex;
    padding: var(--gap-default) 0;
    align-items: center;
  }
  .form-item-label {
    padding: var(--gap-zero2x);
  }
  .form-item-content {
    flex: auto;
  }
</style>
