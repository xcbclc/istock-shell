<script lang="ts">
  import {
    ShICalendar,
    ShButton,
    type ICalendarVEvent,
    type ICalendarNotifyProps,
    type ICalendarFilterItem,
    type ICalendarVTodo,
    ICalendarEventStatus,
    ICalendarTodoStatus,
    ICalendarAlarmAction,
    toICalDateTime,
  } from '@istock/shell-ui';

  function uid(): string {
    // 生成 12 字节的加密安全随机数（12字节 => 16位 Base64）
    const bytes = crypto.getRandomValues(new Uint8Array(12));

    // 将二进制数据转换为 Base64 字符串
    const base64 = btoa(String.fromCharCode(...bytes))
      // 替换 URL 不安全字符
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

    return base64;
  }

  // 金融相关事件数据
  const events: ICalendarVEvent[] = [
    // 股票市场开盘事件
    {
      uid: uid(16),
      summary: '沪深股市开盘',
      description: '沪深股市交易时间9:30-11:30，13:00-15:00',
      dtStamp: toICalDateTime(new Date()),
      dtStart: toICalDateTime(new Date(new Date().setHours(9, 30, 0, 0))),
      dtEnd: toICalDateTime(new Date(new Date().setHours(11, 30, 0, 0))),
      location: '上海证券交易所',
      status: ICalendarEventStatus.CONFIRMED,
      categories: ['工作', '金融', '股票'],
      priority: 7,
      rrule: {
        freq: 'WEEKLY',
        byDay: ['MO', 'TU', 'WE', 'TH', 'FR'],
        interval: 1,
      },
      alarms: [
        {
          xwrAlarmUid: uid(16),
          action: ICalendarAlarmAction.DISPLAY,
          trigger: '-PT30M',
          description: '沪深股市即将开盘',
        },
      ],
    },
    {
      uid: uid(16),
      summary: '沪深新股申购',
      description: '沪深新股申购时间9:30-11:30，13:00-15:00',
      dtStamp: toICalDateTime(new Date()),
      dtStart: toICalDateTime(new Date(new Date().setHours(9, 30, 0, 0))),
      dtEnd: toICalDateTime(new Date(new Date().setHours(11, 30, 0, 0))),
      location: '上海证券交易所',
      status: ICalendarEventStatus.CONFIRMED,
      categories: ['新股申购', '金融', '股票'],
      priority: 7,
      rrule: {
        freq: 'WEEKLY',
        byDay: ['MO', 'TU', 'WE', 'TH', 'FR'],
        interval: 1,
      },
      alarms: [
        {
          xwrAlarmUid: uid(16),
          action: ICalendarAlarmAction.DISPLAY,
          trigger: '-PT30M',
          description: '沪深新股即将申购',
        },
      ],
    },
    // 美股交易时间
    {
      uid: uid(16),
      summary: '美股常规交易时段',
      description: '纽约证券交易所和纳斯达克交易时间9:30-16:00(EDT)',
      dtStamp: toICalDateTime(new Date()),
      dtStart: toICalDateTime(new Date(new Date().setHours(21, 30, 0, 0))), // 北京时间21:30
      dtEnd: toICalDateTime(new Date(new Date().setHours(4, 0, 0, 0))), // 北京时间次日4:00
      location: '纽约证券交易所',
      status: ICalendarEventStatus.CONFIRMED,
      categories: ['工作', '金融', '美股'],
      priority: 3,
      rrule: {
        freq: 'WEEKLY',
        byDay: ['MO', 'TU', 'WE', 'TH', 'FR'],
        interval: 1,
      },
      alarms: [
        {
          xwrAlarmUid: uid(16),
          action: ICalendarAlarmAction.DISPLAY,
          trigger: '-PT1H',
          description: '美股即将开盘',
        },
      ],
    },
    // 重要财报发布
    {
      uid: uid(16),
      summary: '阿里巴巴季度财报发布',
      description: '阿里巴巴集团2023年第四季度财报电话会议',
      dtStamp: toICalDateTime(new Date()),
      dtStart: toICalDateTime(new Date(new Date().setDate(new Date().getDate() + 3))),
      dtEnd: toICalDateTime(new Date(new Date().setDate(new Date().getDate() + 3) + 7200000)), // +2小时
      location: '线上会议',
      status: ICalendarEventStatus.CONFIRMED,
      categories: ['工作', '金融', '财报'],
      organizer: 'mailto:ir@alibaba-inc.com',
      url: 'https://www.alibabagroup.com/en/ir/earnings',
      attendees: ['mailto:user@example.com'],
      alarms: [
        {
          xwrAlarmUid: uid(16),
          action: ICalendarAlarmAction.DISPLAY,
          trigger: '-P1D',
          description: '阿里巴巴财报明天发布',
        },
        {
          xwrAlarmUid: uid(16),
          action: ICalendarAlarmAction.EMAIL,
          trigger: '-PT2H',
          summary: '财报会议提醒',
          description: '阿里巴巴季度财报发布会即将开始',
          attendees: ['mailto:user@example.com'],
        },
      ],
      priority: 6,
      extra: {
        股票代码: 'BABA',
        预期每股收益: '1.65',
        上一季度每股收益: '1.42',
      },
    },
    // 央行利率决议
    {
      uid: uid(16),
      summary: '中国人民银行利率决议',
      description: '中国人民银行关于贷款市场报价利率(LPR)的公告',
      dtStamp: toICalDateTime(new Date()),
      dtStart: toICalDateTime(new Date(new Date().setDate(new Date().getDate() + 5)), true), // 全天事件
      location: '中国人民银行',
      status: ICalendarEventStatus.CONFIRMED,
      categories: ['工作', '金融', '央行'],
      url: 'http://www.pbc.gov.cn',
      alarms: [
        {
          xwrAlarmUid: uid(16),
          action: ICalendarAlarmAction.DISPLAY,
          trigger: '-P1D',
          description: '明天将公布央行利率决议',
        },
      ],
      transp: 'OPAQUE', // 在日历中标记为忙碌时间
      priority: 1, // 高优先级
      extra: {
        当前利率: '3.45%',
        预期变化: '-5bp',
      },
    },
    // 投资交易记录
    {
      uid: uid(16),
      summary: '买入茅台股票',
      description: '按计划执行的股票交易: 贵州茅台(600519) 买入10手',
      dtStamp: toICalDateTime(new Date()),
      dtStart: toICalDateTime(new Date(new Date().setDate(new Date().getDate() - 2))),
      dtEnd: toICalDateTime(new Date(new Date().setDate(new Date().getDate() - 2) + 3600000)), // +1小时
      location: '个人交易账户',
      status: ICalendarEventStatus.CONFIRMED,
      categories: ['个人', '金融', '交易'],
      extra: {
        股票代码: '600519',
        价格: '1688.50',
        数量: '100',
        总价: '168850.00',
      },
    },
  ];

  // 金融相关待办任务
  const todos: ICalendarVTodo[] = [
    // 研究报告任务
    {
      uid: uid(16),
      dtStamp: toICalDateTime(new Date()),
      dtStart: toICalDateTime(new Date()),
      due: toICalDateTime(new Date(new Date().setDate(new Date().getDate() + 7))),
      summary: '完成银行板块季度研究报告',
      description: '分析中国六大银行最新财报数据，对比ROE、NPL等关键指标，完成研报初稿',
      status: ICalendarTodoStatus.IN_PROCESS,
      percentComplete: 30,
      priority: 2,
      categories: ['工作', '金融', '研究'],
      alarms: [
        {
          xwrAlarmUid: uid(16),
          action: ICalendarAlarmAction.DISPLAY,
          trigger: '-P2D',
          description: '银行板块研究报告还有两天截止',
        },
      ],
      extra: {
        指定人: '王分析师',
        目标行业: ['银行', '金融服务'],
        关键股票: ['601398', '601288', '601328'],
      },
    },
    // 投资组合调整
    {
      uid: uid(16),
      dtStamp: toICalDateTime(new Date()),
      due: toICalDateTime(new Date(new Date().setDate(new Date().getDate() + 2))),
      summary: '季度投资组合再平衡',
      description: '根据市场表现调整ETF持仓比例，降低大盘蓝筹占比，增加科技板块配置',
      status: ICalendarTodoStatus.NEEDS_ACTION,
      priority: 1,
      categories: ['个人', '金融', '投资'],
      alarms: [
        {
          xwrAlarmUid: uid(16),
          action: ICalendarAlarmAction.DISPLAY,
          trigger: '-PT12H',
          description: '明天需要完成投资组合调整',
        },
      ],
      extra: {
        当前分配: {
          股票: '60%',
          债券: '25%',
          现金: '10%',
          剩余: '5%',
        },
        目标分配: {
          股票: '55%',
          债券: '25%',
          现金: '5%',
          剩余: '15%',
        },
      },
    },
    // 已完成的税务准备任务
    {
      uid: uid(16),
      dtStamp: toICalDateTime(new Date()),
      dtStart: toICalDateTime(new Date(new Date().setDate(new Date().getDate() - 30))),
      due: toICalDateTime(new Date(new Date().setDate(new Date().getDate() - 1))),
      completed: toICalDateTime(new Date(new Date().setDate(new Date().getDate() - 2))),
      summary: '准备投资收益税务资料',
      description: '整理去年股票、基金交易记录，计算资本利得，准备个人所得税申报材料',
      status: ICalendarTodoStatus.COMPLETED,
      percentComplete: 100,
      categories: ['个人', '金融', '税务'],
      extra: {
        年份: '2023',
        总交易量: 48,
        总增益: '34250.75',
        税率: '20%',
      },
    },
  ];

  // 过滤器配置
  const filters: ICalendarFilterItem[] = [
    {
      title: '类型',
      type: '$type', // 内置
      options: [
        { label: '全部', value: 'all' },
        { label: '事件', value: 'event' },
        { label: '任务', value: 'todo' },
      ],
    },
    {
      title: '优先级',
      type: '$priority', // 内置
      options: [
        { label: '全部', value: 'all' },
        { label: '高', value: 'high' },
        { label: '中', value: 'medium' },
        { label: '低', value: 'low' },
      ],
    },
    {
      title: '分类',
      type: 'categories',
      options: [
        { label: '全部', value: '全部' },
        { label: '股票', value: '股票' },
        { label: '央行', value: '央行' },
        { label: '财报', value: '财报' },
        { label: '交易', value: '交易' },
        { label: '研究', value: '央行' },
        { label: '税务', value: '税务' },
      ],
    },
    {
      title: '股票',
      type: 'extra.股票代码',
      options: [
        { label: '阿里巴巴', value: 'BABA' },
        { label: '贵州茅台', value: '600519' },
      ],
    },
  ];

  // 通知配置
  const notify: ICalendarNotifyProps = $state({
    title: '',
    description: '',
    duration: 5, // 显示5秒
    color: 'info',
  });

  // 演示通知功能
  function showNotification() {
    notify.title = '系统通知';
    notify.description = '美股市场今晚有重要经济数据公布，可能引发市场波动';
    notify.color = 'warning';
    notifyShow = true;
  }

  let notifyShow = $state(false);
</script>

<ShButton color="primary" size="sm" onclick={showNotification}>显示消息通知</ShButton>
<ShICalendar {events} {todos} {notify} {filters} bind:notifyShow />
