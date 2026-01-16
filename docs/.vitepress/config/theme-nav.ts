export default [
  { text: '首页', link: '/' },
  {
    text: '使用文档',
    items: [
      { text: '快速上手', link: '/use/quick-start/easy-to-use.html' },
      { text: '命令总览', link: '/use/command/index.html' },
      {
        text: '核心能力',
        items: [
          { text: 'AI 对话', link: '/use/command/global/ai/ai.cmd.html' },
          { text: '可视化图表', link: '/use/command/global/chart/chart.cmd.html' },
          // { text: '搜索与历史', link: '/use/command/global/search/search.cmd.html' },
        ],
      },
      {
        text: '深度理解',
        items: [
          { text: '什么是命令程序', link: '/use/in-depth/terminal-command.html' },
          { text: '命令执行过程', link: '/use/in-depth/executing-processes.html' },
        ],
      },
      // {
      //   text: '应用文档',
      //   items: [
      //     { text: 'AkShare', link: '/use/command/akshare/index.html' },
      //     { text: '投资日历', link: '/use/command/tzrl/tzrl/tzrl.cmd.html' },
      //     { text: '成都房产', link: '/use/command/cdfc/cdesf/cdesf.cmd.html' },
      //     { text: '可转债', link: '/use/command/kzz/kzzsssj/kzzsssj.cmd.html' },
      //     { text: '网站导航', link: '/use/command/wzdh/cj/cj.cmd.html' },
      //   ],
      // },
    ],
  },
  {
    text: '开发指南',
    items: [
      { text: '开发命令', link: '/develop/command/knowledge.html' },
      { text: '开发指南', link: '/develop/guide/middleware.html' },
      { text: '深入理解', link: '/develop/base-logic.html' },
    ],
  },
  {
    text: '规范',
    items: [
      { text: '开发', link: '/std/develop.html' },
      { text: '命令', link: '/std/command.html' },
      { text: '协议', link: '/std/protocol.html' },
      { text: '术语', link: '/std/term.html' },
      { text: 'UI 交互', link: '/std/ui.html' },
      { text: '数据存储', link: '/std/database.html' },
    ],
  },
  {
    text: '相关库',
    items: [
      { text: 'Web Worker框架', link: '/packages/iswork/README.html' },
      { text: 'Shell UI', link: '/packages/shell-ui/README.html' },
      { text: '命令行解析', link: '/packages/command-parser/README.html' },
      { text: '命令行编辑器', link: '/packages/editor/README.html' },
      { text: '常用工具库', link: '/packages/util/README.html' },
      // { text: '项目脚手架', link: '/packages/cli/README.html' },
    ],
  },
  {
    text: '更多',
    items: [
      { text: '更新日志', link: 'https://github.com/xcbclc/istock-shell/releases', target: '_blank' },
      { text: '沟通交流', link: '/contact/index.html' },
      {
        text: '博客',
        link: 'https://share.istock.red/',
        target: '_blank',
      },
    ],
  },
];
