<script lang="ts">
  export let text: string = '数据加载中。。。';
</script>

<section>
  <p class="loading">
    {text}
  </p>
</section>

<style lang="scss">
  @keyframes loading {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(5px, 0);
    }
  }
  .loading {
    animation: loading 0.5s ease-in infinite alternate;
    color: var(--color-loading);
  }
</style>
