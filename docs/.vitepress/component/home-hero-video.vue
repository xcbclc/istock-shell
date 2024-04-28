<template>
  <div class="video-demo">
    <div class="video-content">
      <h3 class="video-title">演示视频</h3>
      <video controls>
        <source :src="fm?.video?.src" :poster="fm?.video?.poster" type="video/mp4" />
        您的浏览器不支持Video标签。
      </video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';

const { frontmatter: fm } = useData();
</script>

<style lang="scss" scoped>
.video-demo {
  padding: 24px 24px 0;
}
.video-content {
  margin: 0 auto;
  max-width: 1152px;
  video {
    width: 100%;
    border-radius: 12px;
    border: 2px solid var(--vp-c-bg-soft);
    box-shadow: 0 0 2px var(--vp-c-bg-soft);
  }
}
.video-title {
  color: var(--vp-c-brand-1);
  font-size: 18px;
  text-align: center;
  line-height: 1.5;
  font-weight: 600;
  margin: 10px 0 20px;
}
@media (min-width: 640px) {
  .video-demo {
    padding: 48px 48px 0;
  }
  .video-title {
    margin: 8px 0 30px;
    font-size: 24px;
  }
}
@media (min-width: 960px) {
  .video-demo {
    padding: 64px 64px 0;
  }
  .video-title {
    margin: 15px 0 40px;
    font-size: 32px;
  }
}
</style>
