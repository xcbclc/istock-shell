import type { SearchStoreCategory } from '../search.svelte';

export const searchStoreSetting: SearchStoreCategory = {
  title: '设置',
  key: 'Setting',
  list: [
    { title: 'Cookie管理', key: 'Setting.DataManagement.CmdCookiesConfig', description: '管理第三方网站的Cookie数据' },
  ],
};
