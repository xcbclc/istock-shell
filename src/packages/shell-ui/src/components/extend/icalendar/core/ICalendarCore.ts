/**
 * 日历核心功能模块
 * 提供日历事件处理、视图生成、过滤和格式化等核心功能
 */
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import isoWeek from 'dayjs/plugin/isoWeek';
import { isNil, isArray, isPlainObject } from '@istock-shell/util';
import {
  type ICalendarFilterValue,
  type ICalendarViewType,
  type ICalendarEventOrTodo,
  type ICalendarGroupRecord,
  type ICalendarAlarmActionType,
  type ICalendarVEvent,
  type ICalendarVTodo,
  type ICalendarEventStatusType,
  type ICalendarTodoStatusType,
} from './ICalendarType';
import { ICalendarViewTypeData } from './ICalendarType';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);

/**
 * 日历周视图的表头数据
 * 表示一周七天的中文简写
 */
export const ICalendarWeekHeaders = ['一', '二', '三', '四', '五', '六', '日'];

/**
 * 日历提醒动作类型对应的中文文本
 * 将不同类型的提醒动作映射为用户友好的中文描述
 */
export const ICalendarAlarmActionTextRecord: Record<ICalendarAlarmActionType, string> = {
  DISPLAY: '显示提醒',
  EMAIL: '邮件提醒',
  AUDIO: '音频提醒',
};

export const ICalendarEventStatusTextRecord: Record<ICalendarEventStatusType, string> = {
  CONFIRMED: '已确认',
  CANCELLED: '已取消',
};

export const ICalendarTodoStatusTextRecord: Record<ICalendarTodoStatusType, string> = {
  'NEEDS-ACTION': '待开始',
  COMPLETED: '完成',
  'IN-PROCESS': '进行中',
};

/**
 * 将ISO 8601持续时间格式转换为友好可读的中文格式
 * ISO 8601格式示例: 'P1DT2H30M' 表示1天2小时30分钟
 * 负值表示事件开始前的时间点，正值表示事件开始后的时间点
 *
 * @param duration ISO 8601持续时间格式字符串
 * @returns 格式化后的中文持续时间描述
 * @example
 * formatDuration('-PT1H30M') => '事件开始前1小时30分钟'
 * formatDuration('PT1H30M') => '事件开始后1小时30分钟'
 * formatDuration('-P1DT2H30M') => '事件开始前1天2小时30分钟'
 */
export function formatDuration(duration: string): string {
  if (!duration) return '';

  // 判断是事件前还是事件后
  const isNegative = duration.startsWith('-');
  const prefix = isNegative ? '开始前' : '开始后';

  // 去除负号并移除P和T前缀
  // P表示Period(周期)，T表示Time(时间)，是ISO 8601标准的一部分
  const cleanDuration = duration.replace(/^-?P/, '').replace('T', '');

  // 使用正则表达式解析各个时间单位
  // 分别匹配天(D)、小时(H)、分钟(M)和秒(S)
  const days = cleanDuration.match(/(\d+)D/);
  const hours = cleanDuration.match(/(\d+)H/);
  const minutes = cleanDuration.match(/(\d+)M/);
  const seconds = cleanDuration.match(/(\d+)S/);

  // 构建可读字符串，将匹配到的时间单位转换为中文描述
  const parts: string[] = [];
  if (days) parts.push(`${days[1]}天`);
  if (hours) parts.push(`${hours[1]}小时`);
  if (minutes) parts.push(`${minutes[1]}分钟`);
  if (seconds) parts.push(`${seconds[1]}秒`);

  // 如果没有任何时间单位匹配，返回原始格式
  if (parts.length === 0) return duration;

  // 组合前缀和时间单位描述
  return prefix + parts.join('');
}

/**
 * 解析RFC5545日期时间格式为dayjs对象
 * 支持两种格式：
 * 1. 绝对时间格式：YYYYMMDD'T'HHMMSS'Z'（如：'20231001T090000Z'）
 * 2. 日期格式：YYYYMMDD（如：'20231001'，用于全天事件）
 */
export function parseICalDateTime(dateTime: string): dayjs.Dayjs {
  if (!/^\d{8}(T\d{6}Z)?$/.test(dateTime)) return dayjs(dateTime);
  if (dateTime.length === 8) {
    // 全天事件格式：YYYYMMDD
    const year = parseInt(dateTime.substring(0, 4));
    const month = parseInt(dateTime.substring(4, 6)) - 1;
    const day = parseInt(dateTime.substring(6, 8));
    return dayjs(new Date(Date.UTC(year, month, day)));
  } else {
    // 绝对时间格式：YYYYMMDD'T'HHMMSS'Z'
    const year = parseInt(dateTime.substring(0, 4));
    const month = parseInt(dateTime.substring(4, 6)) - 1;
    const day = parseInt(dateTime.substring(6, 8));
    const hour = parseInt(dateTime.substring(9, 11));
    const minute = parseInt(dateTime.substring(11, 13));
    const second = parseInt(dateTime.substring(13, 15));
    return dayjs(new Date(Date.UTC(year, month, day, hour, minute, second)));
  }
}

// 生成RFC5545格式的UTC时间parseICal
export function toICalDateTime(date: Date, isAllDay = false): string {
  if (isAllDay) {
    return dayjs(date).format('YYYYMMDD');
  }
  return dayjs(date).utc().format('YYYYMMDDTHHmmss') + 'Z';
}

/**
 * 根据过滤条件筛选日历事件列表
 * 支持日期范围筛选和多种属性筛选，可以使用AND或OR逻辑组合多个条件
 *
 * @param list 原始日历事件/待办事项列表
 * @param filter 过滤条件对象
 * @returns 过滤后的日历事件/待办事项列表
 */
export function getFilterCalendarList(
  list: ICalendarEventOrTodo[],
  filter: ICalendarFilterValue
): ICalendarEventOrTodo[] {
  // 清理过滤条件，移除值为null或undefined的条件
  const realFilter = Object.keys(filter).reduce<ICalendarFilterValue>((record, key: string) => {
    if (!isNil(filter[key]) && (isArray(filter[key]) ? filter[key].length > 0 : true)) {
      record[key] = filter[key];
    }
    return record;
  }, {});
  if (!Object.keys(realFilter).length) return list;

  const { startDate, endDate, logic, ...otherFilter } = realFilter;
  const matchFilterValue = (data: ICalendarEventOrTodo, key: string, filterValue: any): boolean => {
    if (key === '$type') {
      if (filterValue === 'all') return true;
      if (filterValue === 'event') return isVEvent(data);
      if (filterValue === 'todo') return isVTodo(data);
    }
    if (key === '$priority') {
      if (filterValue === 'all' || (isArray(filterValue) && filterValue.includes('all')))
        return true;
      if (isNil(data.priority)) return false;
      const levelValue = getPriorityLevel(data.priority);
      if (isArray(filterValue)) return filterValue.includes(levelValue);
      return levelValue === filterValue;
    }
    if (['all', '全部'].includes(filterValue)) return true;
    const matchValue = key.split('.').reduce<any>((d, k) => {
      return isPlainObject(d) ? d[k] : null;
    }, data);
    if (isArray(filterValue)) {
      if (isArray(matchValue)) {
        return matchValue.some((v) => filterValue.includes(v));
      }
      return filterValue.includes(matchValue);
    }
    return matchValue === filterValue;
  };

  return list.filter((item) => {
    const dateMatch =
      (!startDate || (item.dtStart && parseICalDateTime(item.dtStart).isAfter(startDate))) &&
      (!endDate || (item.dtStart && parseICalDateTime(item.dtStart).isBefore(endDate)));
    if (dateMatch && !Object.keys(otherFilter).length) return true;
    if (realFilter.logic === 'OR') {
      // OR逻辑：日期匹配且至少一个其他条件匹配
      return (
        dateMatch &&
        Object.keys(otherFilter).some((key) => matchFilterValue(item, key, otherFilter[key]))
      );
    } else {
      // AND逻辑（默认）：日期匹配且所有其他条件都匹配
      return (
        dateMatch &&
        Object.keys(otherFilter).every((key) => matchFilterValue(item, key, otherFilter[key]))
      );
    }
  });
}

/**
 * 检查给定字符串是否为ISO 8601相对持续时间格式
 * 用于验证提醒触发器的格式是否有效
 *
 * @param trigger 需要验证的字符串
 * @returns 如果是有效的相对持续时间格式则返回true，否则返回false
 */
export const isRelativeDuration = function (trigger?: string): boolean {
  if (!trigger || typeof trigger !== 'string') return false;
  // 验证是否符合ISO 8601持续时间格式：可选负号，P开头，可选天数(D)，可选T加时分秒(H,M,S)
  return /^-?P(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$/.test(trigger);
};

/**
 * 根据视图类型将日历事件分组
 * 不同视图类型（日/周/月）使用不同的时间格式作为分组键
 *
 * @param list 日历事件/待办事项列表
 * @param viewType 视图类型（日/周/月）
 * @returns 按时间分组的日历事件记录
 */
export function getCalendarGroupRecordByView(
  list: ICalendarEventOrTodo[],
  viewType: ICalendarViewType
): ICalendarGroupRecord {
  const calendarGroupRecord: ICalendarGroupRecord = {};

  list.forEach((item) => {
    if (!item.dtStart) return;
    const itemDate = parseICalDateTime(item.dtStart);
    let key: string;

    // 根据视图类型决定分组键的格式
    switch (viewType) {
      case ICalendarViewTypeData.DAY:
        // 日视图：按小时分组，格式为'YYYY-MM-DD HH'
        key = itemDate.format('YYYY-MM-DD HH');
        break;
      case ICalendarViewTypeData.WEEK:
      case ICalendarViewTypeData.MONTH:
        // 周视图和月视图：按天分组，格式为'YYYY-MM-DD'
        key = itemDate.format('YYYY-MM-DD');
        break;
      default:
        // 默认按天分组
        key = itemDate.format('YYYY-MM-DD');
    }

    // 初始化分组数组（如果不存在）
    if (!calendarGroupRecord[key]) {
      calendarGroupRecord[key] = [];
    }

    // 将事件添加到对应的时间分组中
    calendarGroupRecord[key].push(item);
  });
  return calendarGroupRecord;
}

/**
 * 根据优先级对日历事件列表进行排序
 * 优先级数值越小，优先级越高（排在前面）
 *
 * @param list 需要排序的日历事件/待办事项列表
 * @returns 按优先级排序后的列表
 */
export function sortCalendarListByPriority(list: ICalendarEventOrTodo[]): ICalendarEventOrTodo[] {
  // 创建列表副本并根据优先级排序，优先级为null或undefined时默认为0
  return [...list].sort((a, b) => {
    return (a.priority ?? 0) - (b.priority ?? 0);
  });
}

/**
 * 生成日视图的时间槽
 * 为指定日期的每个小时生成格式化的时间字符串
 *
 * @param date 目标日期
 * @returns 包含24个小时时间槽的字符串数组，格式为'YYYY-MM-DD HH'
 */
export function generateDayTimeSlots(date: string): string[] {
  const slots: string[] = [];
  // 获取指定日期的起始时刻（0点）
  const baseDate = dayjs(date).startOf('day');

  // 生成一天中的24个小时时间槽
  for (let i = 0; i < 24; i++) {
    slots.push(baseDate.add(i, 'hour').format('YYYY-MM-DD HH'));
  }

  return slots;
}

/**
 * 生成周视图的日期数组
 * 从ISO周的第一天（周一）开始，生成一周7天的日期
 *
 * @param date 目标周内的任意日期
 * @returns 包含7天日期的字符串数组，格式为'YYYY-MM-DD'
 */
export function generateWeekDays(date: string): string[] {
  const days: string[] = [];
  // 获取包含指定日期的那一周的第一天（周一）
  const startOfWeek = dayjs(date).startOf('isoWeek');

  // 生成一周7天的日期
  for (let i = 0; i < 7; i++) {
    days.push(startOfWeek.add(i, 'day').format('YYYY-MM-DD'));
  }

  return days;
}

/**
 * 生成月视图的日期网格
 * 包含指定月份的所有天以及填充完整周的前后日期
 *
 * @param date 目标月份内的任意日期
 * @returns 包含完整日期网格的字符串数组，格式为'YYYY-MM-DD'
 */
export function generateMonthGrid(date: string): string[] {
  const days: string[] = [];
  // 获取月份的第一天
  const startOfMonth = dayjs(date).startOf('month');
  // 获取包含月份第一天的那周的第一天（周一）
  const startOfGrid = startOfMonth.startOf('isoWeek');
  // 获取月份的最后一天
  const endOfMonth = dayjs(date).endOf('month');
  // 获取包含月份最后一天的那周的最后一天（周日）
  const endOfGrid = endOfMonth.endOf('isoWeek');

  // 从网格开始到网格结束，遍历所有日期
  let current = startOfGrid;
  while (current.isBefore(endOfGrid) || current.isSame(endOfGrid, 'day')) {
    days.push(current.format('YYYY-MM-DD'));
    current = current.add(1, 'day');
  }

  return days;
}

/**
 * 根据数值优先级获取对应的优先级级别文本
 * 将数值优先级(0-9)转换为低/中/高三个文本级别
 *
 * @param priority 数值优先级(0-9)
 * @returns 优先级级别文本('low'/'medium'/'high')
 */
export function getPriorityLevel(priority: number): 'low' | 'medium' | 'high' {
  if (priority < 3) {
    return 'low';
  } else if (priority < 6) {
    return 'medium';
  } else if (priority <= 9) {
    return 'high';
  } else {
    return 'low';
  }
}

/**
 * 判断日历项目是否为事件类型(VEVENT)
 * 通过检查特有属性判断数据类型
 *
 * @param data 日历项目数据
 * @returns 如果是VEVENT类型返回true，否则返回false
 */
export const isVEvent = (data: ICalendarEventOrTodo): data is ICalendarVEvent => {
  return 'dtEnd' in data || ('transp' in data && data.transp !== undefined);
};

/**
 * 判断日历项目是否为待办事项类型(VTODO)
 * 通过检查特有属性判断数据类型
 *
 * @param data 日历项目数据
 * @returns 如果是VTODO类型返回true，否则返回false
 */
export const isVTodo = (data: ICalendarEventOrTodo): data is ICalendarVTodo => {
  return 'due' in data || 'percentComplete' in data || 'completed' in data;
};
