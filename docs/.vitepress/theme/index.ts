// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import './custom.css';
import IStockShellDemo from '../component/istock-shell-demo.vue';
import HomeHeroImage from '../component/home-hero-image.vue';
import HomeHeroInfo from '../component/home-hero-info.vue';
import HomeHeroVideo from '../component/home-hero-video.vue';
import IStockShellUiExample from '../component/istock-shell-ui-example.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(HomeHeroImage),
      'home-hero-info': () => h(HomeHeroInfo),
      'home-features-after': () => h(HomeHeroVideo),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component('IStockShellDemo', IStockShellDemo);
    app.component('IStockShellUiExample', IStockShellUiExample);
  },
} satisfies Theme;
