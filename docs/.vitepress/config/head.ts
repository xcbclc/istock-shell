import { loadEnv, type HeadConfig } from 'vitepress';

const env = loadEnv('', process.cwd());
let head: HeadConfig[] = [['link', { rel: 'icon', href: '/favicon.ico' }]];

if (env.VITE_SITE_BAIDU_ANALYSIS === 'true') {
  head = [
    ...head,
    [
      'script',
      {},
      `var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?3f196f71fe80101ca501c7dd8969fa71";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();`,
    ],
  ];
}

export default head;
