<template>
  <div class="product-image">
    <img :src="fm.hero?.image?.src" :alt="fm.hero?.image?.alt" />
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';

const { frontmatter: fm } = useData();
</script>

<style lang="scss" scoped>
.product-image {
  position: relative;
  padding: 30px 0 0;
  z-index: 10;
  img {
    border-radius: 8px;
  }
}
@media (min-width: 960px) {
  .product-image {
    transform: translate(32px, 0); /* 修正偏移 */
  }
}
</style>
