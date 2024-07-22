import { defineConfig } from 'vitepress';
import themeLocales from './config/theme-locales';
import themeSidebar from './config/theme-sidebar';
import themeNav from './config/theme-nav';
import head from './config/head';

export default defineConfig({
  // base: './',
  vite: {
    // Vite 配置选项
    server: {
      port: 5172,
    },
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
    },
  },
  head,
  lang: 'zh-Hans',
  title: 'iStock Shell',
  description: '一个金融数据查询终端',
  appearance: 'dark', // 黑白主题
  sitemap: {
    hostname: 'https://istock.red',
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            displayDetails: '显示详细信息',
            backButtonTitle: '返回',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
              selectKeyAriaLabel: '选择',
              navigateUpKeyAriaLabel: '向上',
              navigateDownKeyAriaLabel: '向下',
              closeKeyAriaLabel: '关闭',
            },
          },
        },
      },
    },
    socialLinks: [
      {
        icon: {
          svg: `
          <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23"></path></svg>`,
        },
        link: 'https://gitee.com/xcbclc/istock-shell',
      },
      { icon: 'github', link: 'https://github.com/xcbclc/istock-shell' },
    ],
    footer: {
      message: '免责声明：本站所有信息、数据、软件仅供学习研究，都不构成投资建议，本站不承担由此导致的任何责任。',
      copyright: `iStock Shell © 2023-${new Date().getFullYear()} 备案号：<a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备18036928号-1</a>`,
    },
    nav: themeNav,
    sidebar: themeSidebar,
    ...themeLocales,
  },
  lastUpdated: true,
});
