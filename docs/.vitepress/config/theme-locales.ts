type TLastUpdateFormatType = 'short' | 'medium' | 'full' | 'long';

export default {
  docFooter: {
    prev: '上一页',
    next: '下一页',
  },

  outline: {
    label: '页面导航',
  },

  lastUpdated: {
    text: '最后更新于',
    formatOptions: {
      dateStyle: 'short' as TLastUpdateFormatType,
      timeStyle: 'medium' as TLastUpdateFormatType,
    },
  },

  langMenuLabel: '多语言',
  returnToTopLabel: '回到顶部',
  sidebarMenuLabel: '菜单',
  darkModeSwitchLabel: '主题',
};
