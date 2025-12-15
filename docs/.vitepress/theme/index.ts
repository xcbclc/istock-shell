// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import 'daisyui/themes.css';
import './daisyui.css';
import './style.css';
import './custom.css';
import IStockShellDemo from '../component/istock-shell-demo.vue';
import HomeHeroPlay from '../component/home-hero-play.vue';
import HomeHeroInfo from '../component/home-hero-info.vue';
import HomeContent from '../component/home-content.vue';
import IStockShellUiExample from '../component/istock-shell-ui-example.vue';
import ThemeSwitcher from '../component/theme-switcher.vue';

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(HomeHeroPlay),
      'home-hero-info': () => h(HomeHeroInfo),
      'home-features-after': () => h(HomeContent),
      'nav-bar-content-after': () => h(ThemeSwitcher),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component('IStockShellDemo', IStockShellDemo);
    app.component('IStockShellUiExample', IStockShellUiExample);
    app.component('ThemeSwitcher', ThemeSwitcher);
  },
} satisfies Theme;
