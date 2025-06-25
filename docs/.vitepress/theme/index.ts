// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import 'daisyui/themes.css';
import './daisyui.css';
import './style.css';
import './custom.css';
import IStockShellDemo from '../component/istock-shell-demo.vue';
import HomeHeroImage from '../component/home-hero-image.vue';
import HomeHeroInfo from '../component/home-hero-info.vue';
import HomeHeroVideo from '../component/home-hero-video.vue';
import IStockShellUiExample from '../component/istock-shell-ui-example.vue';
import ThemeSwitcher from '../component/theme-switcher.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(HomeHeroImage),
      'home-hero-info': () => h(HomeHeroInfo),
      'home-features-after': () => h(HomeHeroVideo),
      'nav-bar-content-after': () => h(ThemeSwitcher),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component('IStockShellDemo', IStockShellDemo);
    app.component('IStockShellUiExample', IStockShellUiExample);
    app.component('ThemeSwitcher', ThemeSwitcher);
  },
} satisfies Theme;
