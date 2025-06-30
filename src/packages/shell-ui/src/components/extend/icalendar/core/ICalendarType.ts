export type ICalendarEventOrTodoDataExtra = Record<string, any>;

/**
 * RFC5545日期时间格式（UTC时间）
 * - 基本格式：YYYYMMDD'T'HHMMSS'Z'（UTC时间）
 * - 日期格式：YYYYMMDD（全天事件）
 * @example
 * 绝对时间：'20231001T090000Z' 表示2023年10月1日09:00:00（UTC）
 * 全天事件：'20231001' 表示2023年10月1日全天
 */
export type ICalendarDateTime =
  | `${number}${number}${number}${number}${number}${number}${number}T${number}${number}${number}${number}${number}${number}Z`
  | `${number}${number}${number}${number}${number}${number}${number}`;
type ICalendarDuration = string; // 格式: 'PTnHnMnS'（如提前1小时: '-PT1H'）

/**
 * 事件状态机规则（RFC5545 Section 3.8.1.11）
 * - CONFIRMED：事件已确认
 *   @规则 1) 创建事件时默认状态 2) 参与者回复确认后更新 3) 修改事件但未变更时间/参与者时保持
 *   @示例 组织者发送REQUEST后，参与者回复ACCEPTED时应设为CONFIRMED
 * - CANCELLED：事件已取消
 *   @规则 1) 组织者取消事件时设置 2) 需保留在日历中作为历史记录 3) 关联任务需同步取消状态
 *   @业务逻辑 触发任务取消时应同时更新：
 *     - 更新关联的VTODO状态为CANCELLED
 *     - 清除所有提醒（VALARM）
 *     - 设置LAST-MODIFIED时间戳
 * @see https://tools.ietf.org/html/rfc5545#section-3.8.1.1
 */
export const ICalendarEventStatus = {
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
} as const;
export type ICalendarEventStatusType =
  (typeof ICalendarEventStatus)[keyof typeof ICalendarEventStatus];

/**
 * 任务状态机规则（RFC5545 Section 3.8.1.1）
 * - NEEDS-ACTION：任务待处理（默认状态）
 *   @规则 1) 新建任务默认状态 2) 未设置dtStart时保持该状态
 * - IN-PROCESS：任务进行中
 *   @约束 1) 进度必须<100% 2) 禁止设置completed时间 3) 必须包含dtStart
 * - COMPLETED：任务已完成
 *   @强制约束 1) 必须设置completed时间 2) 进度必须=100% 3) due时间必须早于completed
 *   @状态转换示例：
 *     NEEDS-ACTION → IN-PROCESS：当任务被首次操作时
 *     IN-PROCESS → COMPLETED：当进度达到100%并设置completed时
 *     COMPLETED → NEEDS-ACTION：当任务被重新打开时需清除completed时间
 * @see https://tools.ietf.org/html/rfc5545#section-3.8.1.9
 */
export const ICalendarTodoStatus = {
  NEEDS_ACTION: 'NEEDS-ACTION',
  COMPLETED: 'COMPLETED',
  IN_PROCESS: 'IN-PROCESS',
} as const;
export type ICalendarTodoStatusType =
  (typeof ICalendarTodoStatus)[keyof typeof ICalendarTodoStatus];

/**
 * 事件提醒动作类型（RFC5545 Section 3.8.6）
 * @see URL_ADDRESS * @see https://tools.ietf.org/html/rfc5545#section-3.8.6
 */
export const ICalendarAlarmAction = {
  /**
   * 屏幕显示提醒
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.6.1
   * @rule 必须包含description字段
   * @example 适用于本地客户端弹窗提醒
   */
  DISPLAY: 'DISPLAY',

  /**
   * 邮件提醒
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.6.2
   * @rule 必须包含summary字段和attendees列表
   * @example 适用于邮件通知参会者
   */
  EMAIL: 'EMAIL',

  /**
   * 音频提醒
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.6.3
   * @rule 必须包含attach音频附件
   * @example 适用于系统级铃声提醒
   */
  AUDIO: 'AUDIO',
} as const;
export type ICalendarAlarmActionType =
  (typeof ICalendarAlarmAction)[keyof typeof ICalendarAlarmAction];

/**
 * 地理坐标定义（WGS-84坐标系）
 * @rule lat∈[-90,90], lng∈[-180,180]
 * @example { lat: 39.9042, lng: 116.4074 }（北京坐标）
 */
export type ICalendarGeo = {
  /** 纬度（-90到90） */
  lat: number;
  /** 经度（-180到180） */
  lng: number;
};

/**
 * RFC 5545重复规则定义
 * @see https://tools.ietf.org/html/rfc5545#section-3.3.10
 * @example
 * FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE;UNTIL=20241231T235959Z（每两周的周一、周三重复，直到2024年底）
 */
export interface ICalendarRRule {
  /**
   * RFC 5545重复规则
   * @example FREQ=WEEKLY;BYDAY=MO;INTERVAL=2;UNTIL=20241231T235959Z
   */
  freq: 'SECONDLY' | 'MINUTELY' | 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  /**
   * 重复规则结束时间
   * @format 符合RFC5545的UTC时间格式（YYYYMMDD'T'HHMMSS'Z'）
   * @see https://tools.ietf.org/html/rfc5545#section-3.3.10
   * @example '20241231T235959Z' 表示重复到2024年底
   */
  until?: ICalendarDateTime;

  /**
   * 重复次数限制
   * @rule 必须 > 0
   * @see https://tools.ietf.org/html/rfc5545#section-3.3.10
   * @example 5 表示重复5次后结束
   */
  count?: number;

  /**
   * 重复间隔
   * @rule 必须 ≥1
   * @see https://tools.ietf.org/html/rfc5545#section-3.3.10
   * @example 2 配合WEEKLY表示每2周重复
   */
  interval?: number;

  /**
   * 每周重复日
   * @format MO,TU,WE,TH,FR,SA,SU 的数组
   * @see https://tools.ietf.org/html/rfc5545#section-3.3.10
   * @example ['MO','WE'] 表示每周一、三重复
   */
  byDay?: string[];

  /**
   * 按月重复月份
   * @range 1-12
   * @see https://tools.ietf.org/html/rfc5545#section-3.3.10
   * @example [1,12] 表示1月和12月重复
   */
  byMonth?: number[];

  /**
   * 按月天数重复
   * @range 1-31（正数）或 -31--1（倒数）
   * @see https://tools.ietf.org/html/rfc5545#section-3.3.10
   * @example [15,-1] 表示每月15日和最后一日重复
   */
  byMonthDay?: number[];

  /**
   * 设置重复位置
   * @range 1-366 或 -366--1
   * @see https://tools.ietf.org/html/rfc5545#section-3.3.10
   */
  bySetPos?: number;

  /**
   * 周起始日
   * @default 'MO'（周一）
   * @see https://tools.ietf.org/html/rfc5545#section-3.3.10
   * @example 'SU' 表示周日为一周开始
   */
  wkst?: 'MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';

  [k: string]: any;
}

/**
 * 日历提醒定义（VALARM）
 * @see https://tools.ietf.org/html/rfc5545#section-3.6.6
 */
export interface ICalendarIAlarm {
  /**
   * 提醒唯一标识（X-WR-ALARMUID扩展属性）
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.4.3
   */
  xwrAlarmUid: string;

  /**
   * 提醒动作类型（必须）
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.6
   */
  action: ICalendarAlarmActionType;

  /**
   * 触发时间规范（RFC5545 Section 3.8.6.3）
   * - 绝对时间格式：YYYYMMDD'T'HHMMSS'Z'（UTC时间）
   *   @example '20241231T235959Z' 表示UTC时间2024年12月31日23:59:59
   * - 相对时间格式：'PTnHnMnS'（带符号的ISO 8601持续时间）
   *   @example '-PT1H30M' 表示事件开始前1小时30分钟触发
   * @rule 绝对时间必须与DTSTART在同一时区
   * @see https://tools.ietf.org/html/rfc5545#section-3.3.12（绝对时间）
   * @see https://tools.ietf.org/html/rfc5545#section-3.3.13（持续时间）
   */
  trigger: ICalendarDuration | ICalendarDateTime;
  /** 提醒描述（DISPLAY类型必须） */
  description?: string;
  /** 提醒摘要（EMAIL类型必须） */
  summary?: string;
  /**
   * 重复提醒次数（RFC5545 Section 3.8.6.1）
   * @rule 当duration存在时必须与repeat配合使用
   * @example repeat=4 + duration=PT15M → 每15分钟提醒共4次
   * @rule 当action为DISPLAY时，客户端必须支持至少5次重复
   */
  repeat?: number;

  /**
   * 重复提醒间隔（ISO 8601持续时间格式）
   * @rule 必须与repeat同时存在
   * @example duration=PT1H 表示每小时重复
   * @see https://tools.ietf.org/html/rfc5545#section-3.3.6
   */
  duration?: ICalendarDuration;

  /**
   * 音频附件URI（AUDIO类型必须）
   * @rule 必须符合RFC5545 URI格式
   * @example 'cid:alarm@example.com' 或 'http://example.com/beep.mp3'
   * @rule 支持的音频格式：MP3/WAV（客户端必须支持）
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.1.1
   */
  attach?: string;

  /**
   * 提醒参与者邮件列表（EMAIL类型必须）
   * @rule 必须为RFC5322邮箱格式
   * @example ['mailto:user@example.com']
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.4.1
   * @business_rule 缺少attendees时EMAIL类型应触发校验错误
   */
  attendees?: string[];

  [k: string]: any;
}

/**
 * 日历事件定义（VEVENT）
 * @see https://tools.ietf.org/html/rfc5545#section-3.6.1
 */
export interface ICalendarVEvent {
  /** 全局唯一标识符 */
  uid: string;
  /** 版本序列号（修改次数） */
  sequence: number;
  /** 创建时间戳（必须） */
  dtStamp: ICalendarDateTime;
  /** 事件开始时间（必须） */
  dtStart: ICalendarDateTime;
  /** 重复事件主实例ID */
  recurrenceId?: ICalendarDateTime;
  /** 事件结束时间（DATE格式时为全天事件） */
  dtEnd?: ICalendarDateTime;
  /** 地理坐标 */
  geo?: ICalendarGeo;
  /** 事件标题（必须） */
  summary: string;
  /** 事件详细描述 */
  description?: string;
  /** 事件地点 */
  location?: string;
  /**
   * 事件状态（RFC5545 Section 3.8.1.11）
   * @规则
   * - CONFIRMED: 新建默认状态/参与者确认后更新
   * - CANCELLED: 需同步取消关联任务状态
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.1.11
   * @example 'CONFIRMED' 新建事件默认状态
   */
  status?: ICalendarEventStatusType;
  /** 事件分类（逗号分隔） */
  categories?: string[];
  /** 组织者信息 */
  organizer?: string;
  /**
   * 参与者列表（RFC5545 Section 3.8.4.1）
   * @规则
   * - 必须符合RFC5322邮箱格式
   * - 邮件地址需包含mailto:前缀
   * @example ['mailto:user@example.com']
   * @see https://tools.ietf.org/html/rfc5322
   */
  attendees?: string[];
  /** 事件公开程度 */
  class?: 'PUBLIC' | 'PRIVATE' | 'CONFIDENTIAL';
  /** 关联的URL */
  url?: string;
  /**
   * 重复规则（RFC5545 Section 3.8.5.3）
   * @规则 与exDates配合使用时：
   * - exDates中的日期将跳过重复
   * - 需与rrule的时区保持一致
   * @example
   * rrule: 'FREQ=WEEKLY;BYDAY=MO'
   * exDates: ['20240101T090000Z'] // 跳过元旦当周的周一
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.5.3
   */
  rrule?: ICalendarRRule | string;
  /** 排除日期列表 */
  exDates?: ICalendarDateTime[];
  /** 提醒设置 */
  alarms?: ICalendarIAlarm[];
  /**
   * 事件透明度（RFC5545 Section 3.8.2.7）
   * - OPAQUE: 标记为忙碌时间（默认）
   * - TRANSPARENT: 不影响空闲时间
   * @example 'TRANSPARENT' 用于生日等无需占用时间的事件
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.2.7
   */
  transp?: 'OPAQUE' | 'TRANSPARENT';
  /** 优先级 0-9 */
  priority?: number;
  /** 附件链接 */
  attach?: string;
  /** 额外数据 **/
  extra?: ICalendarEventOrTodoDataExtra;
}

/**
 * 日历任务定义（VTODO）
 * @see https://tools.ietf.org/html/rfc5545#section-3.6.2
 */
export interface ICalendarVTodo {
  /**
   * 全局唯一标识符
   * @rule 必须符合RFC5545 UID格式要求
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.4.7
   */
  uid: string;

  /**
   * 创建时间戳（必须）
   * @format 符合RFC5545的UTC时间格式
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.7.2
   */
  dtStamp: ICalendarDateTime;

  /** 任务开始时间 */
  dtStart?: ICalendarDateTime;

  /**
   * 任务截止时间（必须）
   * @rule 必须早于completed时间（当状态为COMPLETED时）
   * @rule 当status为IN-PROCESS时，必须存在
   * @format 符合RFC5545的UTC时间格式
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.2.3
   */
  due: ICalendarDateTime;

  /** 任务标题（必须） */
  summary: string;

  /** 任务详细描述 */
  description?: string;

  /**
   * 任务状态（必须）
   * @rule 状态转换约束：
   * - COMPLETED → 必须设置completed时间且percentComplete=100
   * - IN-PROCESS → 必须存在dtStart且percentComplete<100
   * - NEEDS-ACTION → 不能设置completed时间
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.1.11
   */
  status?: ICalendarTodoStatusType;

  /**
   * 任务完成百分比 0-100
   * @rule 当percentComplete=100时必须设置status=COMPLETED
   * @rule 当status=COMPLETED时必须设置percentComplete=100
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.1.8
   */
  percentComplete?: number;

  /** 任务优先级 0-9 */
  priority?: number;

  /** 任务分类 */
  categories?: string[];

  /** 关联的URL */
  url?: string;

  /**
   * 完成时间
   * @rule 当status=COMPLETED时必须设置
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.2.1
   */
  completed?: ICalendarDateTime;

  /** 提醒设置 */
  alarms?: ICalendarIAlarm[];

  /**
   * 相关任务UID
   * @rule 必须引用已存在的VTODO项目UID
   * @format 符合RFC5545 UID格式
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.4.7
   */
  relatedTo?: string;

  /**
   * 组织者信息
   * @rule 必须符合RFC5322邮箱格式
   * @example "mailto:jsmith@example.com"
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.4.3
   */
  organizer?: string;

  /** 额外数据 **/
  extra?: ICalendarEventOrTodoDataExtra;
}

/**
 * 时区定义（VTIMEZONE）
 * @see https://tools.ietf.org/html/rfc5545#section-3.6.5
 */
export interface ICalendarTimeZone {
  /**
   * IANA时区标识符（必须）
   * @规则 必须符合IANA时区数据库规范
   * @example 'Asia/Shanghai' 中国标准时间
   * @see https://tools.ietf.org/html/rfc5545#section-3.6.5
   */
  tzId: string;
  /** 最后修改时间 */
  lastModified?: ICalendarDateTime;
  /** 时区URL */
  tzUrl?: string;
  /** 夏令时规则 */
  daylight: {
    /**
     * 时区偏移量（RFC5545格式）
     * @格式 ±HHMM（例如+0800表示东八区）
     * @see https://tools.ietf.org/html/rfc5545#section-3.8.3.1
     */
    tzOffsetFrom: string;
    /**
     * 转换后时区偏移量
     * @规则 必须与TZOFFSETFROM格式一致
     * @example '-0700' 夏令时切换到西七区
     */
    tzOffsetTo: string;
    /**
     * 规则生效时间（必须）
     * @规则 必须使用绝对时间格式
     * @example '20240310T020000Z' 夏令时开始时间
     * @see https://tools.ietf.org/html/rfc5545#section-3.6.5
     */
    dtStart: ICalendarDateTime;
    /**
     * 重复规则（适用于历史时区变化）
     * @example FREQ=YEARLY;BYMONTH=3;BYDAY=2SU 每年3月第二个周日
     * @see ICalendarRRule
     */
    rrule?: ICalendarRRule;
    /** 规则名称 */
    name?: string;
  };
  /**
   * 标准时间规则（RFC5545 Section 3.8.3.1）
   * @规则
   * - tzOffsetFrom格式：±HHMM（原时区偏移）
   *   @示例 '+0800' 表示东八区
   * - tzOffsetTo格式：±HHMM（转换后时区偏移）
   *   @示例 '-0700' 夏令时切换到西七区
   * @see https://tools.ietf.org/html/rfc5545#section-3.8.3.1
   */
  standard: {
    /**
     * 原时区偏移量
     * @format 必须符合RFC5545的±HHMM格式
     * @example '+0800' 中国标准时间
     */
    tzOffsetFrom: string;
    /**
     * 转换后时区偏移量
     * @rule 必须与tzOffsetFrom格式一致
     * @example '-0700' 夏令时生效时的偏移
     */
    tzOffsetTo: string;
    /**
     * 规则生效时间（必须）
     * @format 必须使用绝对时间格式（YYYYMMDD'T'HHMMSS'Z'）
     * @example '20231105T020000Z' 标准时间开始时间
     * @see https://tools.ietf.org/html/rfc5545#section-3.3.12
     */
    dtStart: ICalendarDateTime;
    /**
     * 重复规则（适用于历史时区变化）
     * @example FREQ=YEARLY;BYMONTH=11;BYDAY=1SU 每年11月第一个周日
     * @see ICalendarRRule
     */
    rrule?: ICalendarRRule;
    /** 时区规则名称（可选） @example '中国标准时间' */
    name?: string;
  };
}

// 完整 iCalendar 类型
export interface ICalendarData {
  /**
   * iCalendar对象容器（RFC5545 Section 3.4）
   * @规则
   * 1. 必须严格使用'2.0'作为版本号
   * 2. 必须包含prodId属性
   * @see https://tools.ietf.org/html/rfc5545#section-3.4
   */
  version: '2.0';

  /**
   * 产品标识符（RFC5545 Section 3.7.3）
   * @格式要求 '-//组织名//产品名 版本//语言'
   * @示例 '-//Example Corp//iCal 1.0//EN'
   * @规则
   * 1. 必须包含至少3个组成部分
   * 2. 语言代码遵循BCP47标准
   * @see https://tools.ietf.org/html/rfc5545#section-3.7.3
   */
  prodId: string;

  /**
   * 历法系统（RFC5545 Section 3.7.1）
   * @默认值 'GREGORIAN'
   * @see https://tools.ietf.org/html/rfc5545#section-3.7.1
   */
  calscale?: 'GREGORIAN';

  /**
   * iTIP方法类型（RFC5545 Section 3.2）
   * - PUBLISH: 发布新事件
   * - REQUEST: 请求参与
   * - REPLY: 回复邀请
   * - ADD: 添加实例
   * - CANCEL: 取消事件
   * @see https://tools.ietf.org/html/rfc5545#section-3.2
   */
  method?: 'PUBLISH' | 'REQUEST' | 'REPLY' | 'ADD' | 'CANCEL';

  /**
   * 事件组件集合（RFC5545 Section 3.6.1）
   * @规则
   * 1. 必须包含至少一个VEVENT
   * 2. 重复事件应使用RRULE定义
   * @see https://tools.ietf.org/html/rfc5545#section-3.6.1
   */
  events: ICalendarVEvent[];

  /**
   * 任务组件集合（RFC5545 Section 3.6.2）
   * @规则
   * 1. 任务状态必须符合状态机规则
   * 2. 必须包含due属性
   * @see https://tools.ietf.org/html/rfc5545#section-3.6.2
   */
  todos?: ICalendarVTodo[];

  /**
   * 时区定义集合（RFC5545 Section 3.6.5）
   * @业务规则
   * 1. 跨时区事件必须包含相关时区定义
   * 2. 时区ID必须符合IANA标准
   * @see https://tools.ietf.org/html/rfc5545#section-3.6.5
   */
  timeZones?: ICalendarTimeZone[];
}

export type ICalendarEventOrTodo = ICalendarVEvent | ICalendarVTodo;
export type ICalendarGroupRecord = Record<string, ICalendarEventOrTodo[]>;

export interface ICalendarFilterValue {
  startDate?: string;
  endDate?: string;
  logic?: 'AND' | 'OR';
  [k: string]: any;
}

export const ICalendarViewTypeData = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
} as const;
export type ICalendarViewType = (typeof ICalendarViewTypeData)[keyof typeof ICalendarViewTypeData];
