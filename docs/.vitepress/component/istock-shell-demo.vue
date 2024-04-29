<template>
  <iframe class="istock-shell-demo" :src="src" :style="style"></iframe>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
  mode: {
    type: String,
    default: '2',
  },
  cmd: {
    type: String,
    require: true,
  },
  domains: {
    type: Array,
    default: [],
  },
  height: {
    type: String || Number,
    require: false,
  },
});
const src = computed(() => {
  return `${import.meta.env.VITE_ISTOCK_SHELL}/?mode=${props.mode}&cmd=${encodeURIComponent(props.cmd)}&domains=${encodeURIComponent(JSON.stringify(props.domains))}`;
});
const style = computed(() => {
  return props.height ? { height: `${props.height}px` } : {};
});
</script>

<style lang="scss">
iframe.istock-shell-demo {
  width: 100%;
  height: 480px;
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 8px;
  background-color: transparent;
}
</style>
