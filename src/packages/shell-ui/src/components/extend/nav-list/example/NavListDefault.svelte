<script lang="ts">
  import { ShNavList, type NavListProps } from '@istock-shell/ui';

  const list: NavListProps['list'] = [
    {
      title: '门户',
      items: [
        {
          text: '新浪财经',
          href: 'http://finance.sina.com.cn/',
        },
        {
          text: '和讯网',
          href: 'http://www.hexun.com/',
        },
        {
          text: '网易财经',
          href: 'http://money.163.com/',
        },
        {
          text: '搜狐财经',
          href: 'http://business.sohu.com/',
        },
        {
          text: '凤凰财经',
          href: 'http://finance.ifeng.com/',
        },
        {
          text: '东方财富网',
          href: 'http://www.eastmoney.com/',
        },
      ],
    },
    {
      title: '报纸',
      items: [
        {
          text: '中国证券报',
          href: 'http://www.cs.com.cn/',
        },
        {
          text: '上海证券报',
          href: 'http://www.cnstock.com/',
        },
        {
          text: '证券时报',
          href: 'http://www.stcn.com/',
        },
        {
          text: '第一财经',
          href: 'http://www.yicai.com/',
        },
        {
          text: '经济观察报',
          href: 'http://www.eeo.com.cn/',
        },
        {
          text: '每日经济新闻',
          href: 'http://www.nbd.com.cn/',
        },
      ],
    },
  ];
</script>

<ShNavList {list} />
