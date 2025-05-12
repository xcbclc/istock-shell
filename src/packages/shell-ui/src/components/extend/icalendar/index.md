---
title: ICalendar 日历组件 - 高度集成的日程管理解决方案
description: 功能丰富的日历组件，支持日/周/月多视图模式、事件与待办事项管理、过滤功能和通知提醒，适用于个人应用的日程安排系统。
keywords: [日历组件, 事件管理, 日程安排, 待办事项, 多视图日历, Svelte日历]
aside: false
editLink: false
outline: [2, 3]
---

## ICalendar 日历组件 <Badge type="tip">shell</Badge>

**集成化的日历应用界面，提供良好的日程管理体验。**

## 使用场景

- 企业办公系统的日程管理模块
- 项目管理中的团队日程协调
- 个人事务安排与提醒系统
- 需要多视图展示事件的场景
- 会议室或资源预订系统

## 功能特性

- 日/周/月三种视图模式自由切换
- 事件与待办事项的统一管理
- 便捷的日期导航与选择
- 灵活的事件过滤功能
- 通知提醒系统
- 事件详情查看与管理

## 示例演示

<IStockShellUiExample src="./example/BasicExample.svelte" layout="column"></IStockShellUiExample>

## API 参考

### 属性说明

| 参数        | 说明         | 类型                                            | 默认值   |
| ----------- | ------------ | ----------------------------------------------- | -------- |
| events      | 日历事件列表 | [`ICalendarVEvent`](#icalendarvevent)[]         | `[]`     |
| todos       | 待办事项列表 | [`ICalendarVTodo`](#icalendarvtodo)[]           | `[]`     |
| currentDate | 当前选中日期 | `string`                                        | 当天日期 |
| currentView | 当前视图类型 | `'day' \| 'week' \| 'month'`                    | `'week'` |
| filterValue | 当前过滤条件 | [`ICalendarFilterValue`](#icalendarfiltervalue) | `{}`     |
| filters     | 过滤选项列表 | [`ICalendarFilterItem`](#icalendarfilteritem)   | `[]`     |
| notify      | 通知配置     | [`ICalendarNotifyProps`](#icalendarnotifyprops) | `{}`     |
| notifyShow  | 是否显示通知 | `boolean`                                       | `false`  |

### ICalendarVEvent

```typescript
/**
 * 日历事件定义（VEVENT）
 * @see https://tools.ietf.org/html/rfc5545#section-3.6.1
 */
interface ICalendarVEvent {
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
```

### ICalendarVTodo

```typescript
/**
 * 日历任务定义（VTODO）
 * @see https://tools.ietf.org/html/rfc5545#section-3.6.2
 */
interface ICalendarVTodo {
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
```

### ICalendarFilterValue

```typescript
interface ICalendarFilterValue {
  startDate?: string;
  endDate?: string;
  logic?: 'AND' | 'OR';
  [k: string]: any;
}
```

### ICalendarFilterItem

```typescript
/**
 * 筛选项组接口
 * @interface ICalendarFilterItem
 * @property {string} [type] - 筛选类型标识
 * @property {string} [title] - 筛选组标题
 * @property {boolean} [multiple] - 是否支持多选
 * @property {ICalendarFilterOption[]} [options] - 筛选选项列表
 */
interface ICalendarFilterItem {
  type: string;
  title: string;
  multiple?: boolean;
  // filterCallback?: () => boolean;
  options?: ICalendarFilterOption[];
}
```

::: tip 提示
更详细的类型说明请查看`shell-ui/src/components/extend/icalendar/core/ICalendarType.ts`文件源码。
:::

### ICalendarNotifyProps

```typescript
interface ICalendarNotifyProps extends AlertProps {
  /** 通知显示持续时间（秒），0表示不自动隐藏 */
  duration?: number;
  /** 显示前的延迟时间（秒） */
  delay?: number;
}
```

## 最佳实践

- 使用ISO格式的日期字符串 (`YYYY-MM-DD`)
- 为事件指定颜色提高可识别性
- 合理设置优先级区分重要待办事项
- 使用通知系统提醒即将到来的事件
- 设置多级过滤条件满足不同场景需求
