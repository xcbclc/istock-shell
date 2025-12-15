<template>

  <div class="hero-play">
     <IStockShellDemo cmd="sshqsj hag" :height="360" />
    <div v-if="fm.hero?.image?.src" class="product-image" style="display: none">
       <img :src="fm.hero.image.src" :alt="fm.hero.image.alt" />
    </div>

  </div>

</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import IStockShellDemo from './istock-shell-demo.vue';

const { frontmatter: fm } = useData();
</script>

<style scoped>
.hero-play {
    position: relative;
    z-index: 10;
    width: 100%;
    margin-top: -60px;
  }
</style>

