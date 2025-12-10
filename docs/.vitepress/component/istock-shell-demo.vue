<template> <iframe ref="iframeRef" class="istock-shell-demo" :src="src" :style="style"></iframe> </template>

<script setup lang="ts">
import { defineProps, computed, ref, onMounted, onUnmounted } from 'vue';

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
    default: 480,
  },
});
const iframeRef = ref<HTMLIFrameElement>();
const hasBeenInViewport = ref(false);

let observer: IntersectionObserver | null = null;

const src = computed(() => {
  if (hasBeenInViewport.value) {
    return `${import.meta.env.VITE_ISTOCK_SHELL}/?mode=${props.mode}&cmd=${encodeURIComponent(props.cmd)}&domains=${encodeURIComponent(JSON.stringify(props.domains))}`;
  }
  return '';
});

onMounted(() => {
  if (iframeRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenInViewport.value) {
            hasBeenInViewport.value = true;
          }
        });
      },
      {
        threshold: 0.0,
      }
    );
    observer.observe(iframeRef.value);
  }
});

onUnmounted(() => {
  if (observer && iframeRef.value) {
    observer.unobserve(iframeRef.value);
    observer.disconnect();
  }
});
const style = computed(() => {
  return props.height ? { height: `${props.height}px` } : {};
});
</script>

<style>
iframe.istock-shell-demo {
  width: 100%;
  border: 1px solid var(--vp-c-brand-soft);
  border-radius: 8px;
  background-color: transparent;
  overflow: auto;
}
</style>

