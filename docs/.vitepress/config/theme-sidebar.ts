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
      text: '核心能力',
      items: [
        { text: 'AI 对话', link: '/use/command/global/ai/ai.cmd.html' },
        // { text: '搜索', link: '/use/command/global/search/search.cmd.html' },
        { text: '图表', link: '/use/command/global/chart/chart.cmd.html' },
        { text: '历史命令', link: '/use/command/global/history/history.cmd.html' },
        { text: '命令路由', link: '/use/command/global/cmd-route/cmd-route.cmd.html' },
        { text: '用户', link: '/use/command/global/user/user.cmd.html' },
        { text: '应用域', link: '/use/command/global/domain/domain.cmd.html' },
      ],
    },
    {
      text: '应用文档',
      items: [
        {
          text: 'AkShare',
          items: [
            { text: '政策不确定性数据', link: '/use/command/akshare/article.html' },
            { text: '银行数据', link: '/use/command/akshare/bank.html' },
            { text: '债券数据', link: '/use/command/akshare/bond.html' },
            { text: '货币数据', link: '/use/command/akshare/currency.html' },
            { text: '加密货币数据', link: '/use/command/akshare/dc.html' },
            { text: '能源数据', link: '/use/command/akshare/energy.html' },
            { text: '迁徙数据', link: '/use/command/akshare/event.html' },
            { text: '私募基金数据', link: '/use/command/akshare/fund.html' },
            { text: '期货数据', link: '/use/command/akshare/futures.html' },
            { text: '外汇数据', link: '/use/command/akshare/fx.html' },
            { text: '高频数据', link: '/use/command/akshare/hf.html' },
            { text: '指数数据', link: '/use/command/akshare/index.html' },
            { text: '利率数据', link: '/use/command/akshare/interest_rate.html' },
            { text: '宏观数据', link: '/use/command/akshare/macro.html' },
            { text: '自然语言处理', link: '/use/command/akshare/nlp.html' },
            { text: '期权数据', link: '/use/command/akshare/option.html' },
            { text: '另类数据', link: '/use/command/akshare/others.html' },
            { text: 'QDII 数据', link: '/use/command/akshare/qdii.html' },
            { text: '席位', link: '/use/command/akshare/qhkc.html' },
            { text: '现货数据', link: '/use/command/akshare/spot.html' },
            { text: '股票数据', link: '/use/command/akshare/stock.html' },
            { text: '工具箱', link: '/use/command/akshare/tool.html' },
          ],
        },
        {
          text: '投资日历',
          items: [{ text: '投资日历', link: '/use/command/tzrl/tzrl/tzrl.cmd.html' }],
        },
        {
          text: '成都房产',
          items: [{ text: '成都房产', link: '/use/command/cdfc/cdesf/cdesf.cmd.html' }],
        },
        {
          text: '可转债',
          items: [
            { text: '实时数据', link: '/use/command/kzz/kzzsd/kzzsd.cmd.html' },
            { text: '历史数据', link: '/use/command/kzz/kzzsssj/kzzsssj.cmd.html' },
          ],
        },
        {
          text: '网站导航',
          items: [{ text: '财经', link: '/use/command/wzdh/cj/cj.cmd.html' }],
        },
      ],
    },
    {
      text: '命令总览',
      items: [{ text: '命令文档', link: '/use/command/index.html' }],
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
      text: '开发命令',
      items: [
        { text: '开发前准备', link: '/develop/command/knowledge.html' },
        { text: '环境搭建', link: '/develop/command/install.html' },
        { text: '添加命令', link: '/develop/command/command.html' },
      ],
    },
    {
      text: '开发指南',
      items: [
        { text: '中间件', link: '/develop/guide/middleware.html' },
        { text: '应用域', link: '/develop/guide/domain.html' },
        { text: '控制器', link: '/develop/guide/controller.html' },
        { text: '服务', link: '/develop/guide/service.html' },
        { text: '模型', link: '/develop/guide/model.html' },
      ],
    },
    {
      text: '开发文档',
      items: [
        { text: '环境变量', link: '/develop/doc/env.html' },
        { text: '脚手架', link: '/develop/doc/cli.html' },
        { text: '添加文档', link: '/develop/doc/document.html' },
        /*{ text: '开发API', link: '/develop/doc/api.html' },*/
      ],
    },
    {
      text: '部署',
      items: [{ text: '镜像部署', link: '/develop/deploy/docker.html' }],
    },
    {
      text: '深入理解',
      items: [
        { text: '基本原理', link: '/develop/base-logic.html' },
        /*{ text: '最佳实践', link: '/develop/best-practices.html' }*/
      ],
    },
  ],
  '/std': [
    { text: '开发', link: '/std/develop.html' },
    { text: '命令', link: '/std/command.html' },
    { text: '协议', link: '/std/protocol.html' },
    { text: '术语', link: '/std/term.html' },
    { text: 'UI 交互', link: '/std/ui.html' },
    { text: '数据存储', link: '/std/database.html' },
  ],
  '/packages/shell-ui': [
    {
      text: '介绍',
      link: '/packages/shell-ui/README.html',
    },
    {
      text: '组件总览',
      items: [
        {
          text: '通用',
          items: [
            { text: 'Icon 图标 🇸🇭', link: '/packages/shell-ui/components/extend/icon/index.html' },
            { text: 'Text 文本 🇸🇭', link: '/packages/shell-ui/components/extend/text/index.html' },
          ],
        },
        {
          text: '动作',
          items: [
            { text: 'Button 按钮', link: '/packages/shell-ui/components/action/button/index.html' },
            { text: 'Dropdown 下拉菜单', link: '/packages/shell-ui/components/action/dropdown/index.html' },
            { text: 'Modal 对话框', link: '/packages/shell-ui/components/action/modal/index.html' },
          ],
        },
        {
          text: '数据展示',
          items: [
            {
              text: 'ICalendar 日历事件 🇸🇭',
              link: '/packages/shell-ui/components/extend/icalendar/index.html',
            },
            { text: 'Chart 图表 🇸🇭', link: '/packages/shell-ui/components/extend/chart/index.html' },
            { text: 'DataGrid 数据网格 🇸🇭', link: '/packages/shell-ui/components/extend/data-grid/index.html' },
            { text: 'Empty 空状态 🇸🇭', link: '/packages/shell-ui/components/extend/empty/index.html' },
            { text: 'ErrorInfo 错误信息 🇸🇭', link: '/packages/shell-ui/components/extend/error-info/index.html' },
            { text: 'Stat 统计展示', link: '/packages/shell-ui/components/data-view/stat/index.html' },
            { text: 'List 列表', link: '/packages/shell-ui/components/data-view/list/index.html' },
            { text: 'Markdown 🇸🇭', link: '/packages/shell-ui/components/extend/markdown/index.html' },
            { text: 'NavList 导航列表 🇸🇭', link: '/packages/shell-ui/components/extend/nav-list/index.html' },
            { text: 'Kbd 键盘', link: '/packages/shell-ui/components/data-view/kbd/index.html' },
            { text: 'Table 表格', link: '/packages/shell-ui/components/data-view/table/index.html' },
            { text: 'VirtualList 虚拟列表 🇸🇭', link: '/packages/shell-ui/components/extend/virtual-list/index.html' },
            { text: 'VirtualTable 虚拟表格 🇸🇭', link: '/packages/shell-ui/components/extend/virtual-table/index.html' },
          ],
        },
        {
          text: '数据录入',
          items: [
            { text: 'Checkbox 复选框', link: '/packages/shell-ui/components/data-input/checkbox/index.html' },
            { text: 'DataList 数据列表 🇸🇭', link: '/packages/shell-ui/components/extend/data-list/index.html' },
            {
              text: 'Form 表单 🇸🇭',
              link: '/packages/shell-ui/components/extend/form/index.html',
            },
            { text: 'FieldSet 字段集', link: '/packages/shell-ui/components/data-input/field-set/index.html' },
            { text: 'Input 输入框', link: '/packages/shell-ui/components/data-input/input/index.html' },
            { text: 'Radio 单选框', link: '/packages/shell-ui/components/data-input/radio/index.html' },
            { text: 'Select 选择器', link: '/packages/shell-ui/components/data-input/select/index.html' },
            { text: 'Textarea 多行文本', link: '/packages/shell-ui/components/data-input/textarea/index.html' },
            { text: 'Toggle 开关', link: '/packages/shell-ui/components/data-input/toggle/index.html' },
          ],
        },
        {
          text: '导航',
          items: [
            { text: 'Breadcrumbs 面包屑导航', link: '/packages/shell-ui/components/navigation/breadcrumbs/index.html' },
            { text: 'Menu 菜单', link: '/packages/shell-ui/components/navigation/menu/index.html' },
          ],
        },
        {
          text: '反馈',
          items: [
            { text: 'Alert 警告', link: '/packages/shell-ui/components/feedback/alert/index.html' },
            { text: 'Loading 加载', link: '/packages/shell-ui/components/feedback/loading/index.html' },
            { text: 'Toast 消息框', link: '/packages/shell-ui/components/feedback/toast/index.html' },
            { text: 'Tooltip 提示', link: '/packages/shell-ui/components/feedback/tooltip/index.html' },
            { text: 'Message 全局消息 🇸🇭', link: '/packages/shell-ui/components/extend/message/index.html' },
          ],
        },
      ],
    },
  ],
  '/packages/': [
    {
      text: '相关库',
      items: [
        { text: 'iswork', link: '/packages/iswork/globals.html' },
        { text: 'shell-ui', link: '/packages/shell-ui/README.html' },
        { text: 'command-parser', link: '/packages/command-parser/globals.html' },
        { text: 'editor', link: '/packages/editor/globals.html' },
        // { text: 'cli', link: '/packages/cli/README.html' },
        { text: 'util', link: '/packages/util/globals.html' },
      ],
    },
  ],
};
