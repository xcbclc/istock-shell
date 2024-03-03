// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import './custom.css';
import HomeHeroImage from '../component/home-hero-image.vue';
import HomeHeroInfo from '../component/home-hero-info.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(HomeHeroImage),
      'home-hero-info': () => h(HomeHeroInfo),
    });
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  },
} satisfies Theme;
