<template>

  <div class="terminal-window" :style="style">

    <div class="terminal-header">

      <div class="terminal-controls">
         <span class="terminal-dot red"></span> <span class="terminal-dot yellow"></span> <span
          class="terminal-dot green"
        ></span
        >
      </div>

      <div class="terminal-title">istock-shell</div>

      <div v-if="subtitle" class="terminal-subtitle">{{ subtitle }}</div>

    </div>
     <iframe ref="iframeRef" class="istock-shell-demo" :src="src"></iframe>
  </div>

</template>

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
    type: [String, Number],
    default: 480,
  },
  subtitle: {
    type: String,
    default: '',
  },
  cmdAutoCallback: {
    type: Function,
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
  window.addEventListener('message', onMessage);
});

onUnmounted(() => {
  if (observer && iframeRef.value) {
    observer.unobserve(iframeRef.value);
    observer.disconnect();
  }
  window.removeEventListener('message', onMessage);
});

const onMessage = (event: MessageEvent) => {
  if (event.data?.type === 'cmd:initialized') {
    if (iframeRef.value && event.source === iframeRef.value.contentWindow) {
      props.cmdAutoCallback?.(iframeRef.value.contentWindow, event.data.windowId);
    }
  }
};

const style = computed(() => {
  if (!props.height) return {};
  if (typeof props.height === 'string') {
    if (props.height.toLowerCase() === 'full') return { height: '100%' };
    if (props.height.toLowerCase() === 'auto') return {};
  }
  return { height: `${props.height}px` };
});
</script>

<style>
.terminal-window {
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--vp-c-bg);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.terminal-header {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  background-color: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.terminal-controls {
  display: flex;
  gap: 8px;
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dot.red { background-color: #ff5f56; }
.terminal-dot.yellow { background-color: #ffbd2e; }
.terminal-dot.green { background-color: #27c93f; }

.terminal-title {
  flex: 1;
  text-align: center;
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-mono);
  letter-spacing: 0.3px;
}

.terminal-subtitle {
  font-size: 12px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 4px 8px;
  border-radius: 8px;
  line-height: 1;
}

iframe.istock-shell-demo {
  width: 100%;
  border: none;
  background-color: transparent;
  display: block;
  flex: 1;
  height: 100%;
}
</style>

