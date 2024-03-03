export default {
  '/use/': [
    {
      text: '开始',
      items: [
        { text: '简介', link: '/use/quick-start/introduction.html' },
        { text: '快速上手', link: '/use/quick-start/easy-to-use.html' },
      ],
    },
    {
      text: '命令',
      items: [{ text: '命令列表', link: '/use/command/index.html' }],
    },
    {
      text: '深度学习',
      items: [
        { text: '什么是命令程序', link: '/use/in-depth/terminal-command.html' },
        { text: '命令执行过程', link: '/use/in-depth/executing-processes.html' },
      ],
    },
  ],
  '/develop/': [
    {
      text: '添加命令',
      items: [
        { text: '开发前准备', link: '/develop/command/knowledge.html' },
        { text: '环境搭建', link: '/develop/command/install.html' },
        { text: '添加命令', link: '/develop/command/command.html' },
      ],
    },
    {
      text: '开发文档',
      items: [
        { text: '脚手架', link: '/develop/doc/cli.html' },
        { text: 'API', link: '/develop/doc/api.html' },
      ],
    },
    {
      text: '深入理解',
      items: [{ text: '最佳实践', link: '/develop/best-practices.html' }],
    },
  ],
  '/packages/': [
    {
      text: '相关库',
      items: [
        { text: 'iswork', link: '/packages/iswork/modules.html' },
        { text: 'shell-ui', link: '/packages/shell-ui/README.html' },
        { text: 'command-parser', link: '/packages/command-parser/modules.html' },
        { text: 'editor', link: '/packages/editor/modules.html' },
      ],
    },
  ],
};
