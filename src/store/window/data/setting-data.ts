import type { SettingStoreMenus } from '../setting.svelte';

export const settingStoreMenus: SettingStoreMenus = [
  {
    key: 'CmdAppearance',
    text: '外观设置',
    iconName: 'palette',
    isTitle: true,
    subItem: {
      items: [
        {
          key: 'CmdThemeConfig',
          text: '主题设置',
          description: '自定义您的终端外观主题',
          iconName: 'palette',
          active: true,
        },
      ],
    },
  },
  {
    key: 'DataManagement',
    text: '数据管理',
    iconName: 'database',
    isTitle: true,
    subItem: {
      items: [
        {
          key: 'CmdCookiesConfig',
          text: '网站Cookie管理',
          description: '管理第三方网站的Cookie数据',
          iconName: 'cookie',
          active: false,
        },
        {
          key: 'CmdAliasesConfig',
          text: '命令别名管理',
          description: '创建和管理命令别名',
          iconName: 'alias',
          active: false,
        },
        {
          key: 'CmdDataConfig',
          text: '本地数据管理',
          description: '管理应用的本地数据和备份',
          iconName: 'database',
          active: false,
        },
      ],
    },
  },
  {
    key: 'CmdBehavior',
    text: '行为设置',
    iconName: 'settings',
    isTitle: true,
    subItem: {
      items: [
        {
          key: 'CmdShortcutsConfig',
          text: '快捷键设置',
          description: '自定义终端快捷键',
          iconName: 'keyboard',
          active: false,
        },
      ],
    },
  },
  {
    key: 'CmdAdvanced',
    text: '高级设置',
    iconName: 'settings',
    isTitle: true,
    subItem: {
      items: [
        {
          key: 'CmdProxyConfig',
          text: '接口代理配置',
          description: '配置API请求的代理设置',
          iconName: 'network',
          active: false,
        },
      ],
    },
  },
  {
    key: 'CmdAbout',
    text: '关于',
    iconName: 'about',
    isTitle: true,
    subItem: {
      items: [
        {
          key: 'CmdAboutConfig',
          text: '关于IStock Shell',
          description: '应用信息和系统环境',
          iconName: 'about',
          active: false,
        },
      ],
    },
  },
];
