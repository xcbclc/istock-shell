<!--
@component
ShICalendarView 日历视图组件

一个功能完整的日历视图组件，用于展示和管理日历事件和待办事项。
基于 dayjs 和多个核心工具函数构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持日、周、月三种视图模式切换
- 智能展示事件和待办事项，支持时间槽分组
- 支持事件过滤和优先级可视化显示
- 自动展开/收起超出显示限制的事件
- 支持点击日期和选中事件的回调处理
- 智能的时间格式化和优先级颜色映射
- 继承所有原生 div 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式布局和交互

示例用法：
```svelte
<script lang="ts">
  import { ShICalendarView } from '@istock-shell/ui';

  let currentView = 'week';
  let currentDate = '2024-01-01';

  const calendarData = {
    events: [
      {
        summary: '项目会议',
        dtStart: '2024-01-01T10:00:00',
        dtEnd: '2024-01-01T11:00:00',
        priority: 5
      }
    ],
    todos: [
      {
        summary: '完成报告',
        dtStart: '2024-01-01',
        priority: 7
      }
    ]
  };

  const filterValue = { type: 'event' };

  function handleDayClick(day) {
    console.log('点击日期:', day);
    currentDate = day;
  }

  function handleItemSelected(item) {
    console.log('选中项:', item);
  }
</script>

<p>周视图</p>
<ShICalendarView
  currentView="week"
  currentDate={currentDate}
  calendarData={calendarData}
  filterValue={filterValue}
  viewCount={3}
  onClickDay={handleDayClick}
  onSelected={handleItemSelected}
/>

<p>月视图</p>
<ShICalendarView
  currentView="month"
  currentDate={currentDate}
  calendarData={calendarData}
  viewCount={5}
/>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type {
    ICalendarData,
    ICalendarFilterValue,
    ICalendarViewType,
    ICalendarEventOrTodo,
  } from './ICalendarType';
  import { ICalendarViewTypeData } from './ICalendarType';

  /**
   * 日历视图组件属性接口
   * 继承所有原生 div 元素的 HTML 属性，并扩展日历视图特有的功能属性
   * @typedef {HTMLAttributes<HTMLDivElement> & ICalendarViewPropsExtension} ICalendarViewProps
   */
  export interface ICalendarViewProps extends HTMLAttributes<HTMLDivElement> {
    /** 当前视图类型，支持日（day）、周（week）、月（month）三种模式 */
    currentView: ICalendarViewType;
    /** 当前选中的日期，格式为 YYYY-MM-DD */
    currentDate: string;
    /** 日历数据对象，包含事件列表和待办事项列表 */
    calendarData: ICalendarData;
    /** 过滤条件配置，用于筛选显示特定类型的事件或待办事项 */
    filterValue?: ICalendarFilterValue;
    /** 每个时间槽显示的事件数量限制，超出部分可通过展开按钮查看 @default 3 */
    viewCount?: number;
    /** 点击日期时的回调函数，传递被点击的日期字符串 */
    onClickDay?: (day: string) => void;
    /** 选中事件或待办事项时的回调函数，传递被选中的项目数据 */
    onSelected?: (item: ICalendarEventOrTodo) => void;
  }
</script>

<script lang="ts">
  import dayjs from 'dayjs';
  import { tuc } from '@istock-shell/util';
  import { ShButton } from '../../../index';
  import {
    ICalendarWeekHeaders,
    generateDayTimeSlots,
    generateWeekDays,
    generateMonthGrid,
    sortCalendarListByPriority,
    getFilterCalendarList,
    getCalendarGroupRecordByView,
    getPriorityLevel,
    parseICalDateTime,
  } from './ICalendarCore';

  const {
    currentView,
    currentDate,
    calendarData,
    filterValue = {},
    viewCount = 3,
    onSelected,
    onClickDay,
    class: className = '',
    ...otherProps
  }: ICalendarViewProps = $props();

  // 存储已展开时间槽的状态记录，key为时间槽标识，value为是否展开
  let expandedTimeSlots = $state<Record<string, boolean>>({});

  /**
   * 根据过滤条件筛选后的日历事件列表
   * 合并事件和待办事项，并应用filterValue中的过滤条件
   */
  const filterCalendarList: ICalendarEventOrTodo[] = $derived.by(() => {
    return getFilterCalendarList(
      [...(calendarData.events ?? []), ...(calendarData.todos ?? [])],
      filterValue
    );
  });

  /**
   * 根据优先级数值获取对应的颜色变量
   * @param priority 优先级数值（0-9，0为默认/无优先级）
   * @returns 对应优先级的CSS颜色变量
   */
  const getPriorityColor = (priority: number = 0): string => {
    const level = getPriorityLevel(priority);
    switch (level) {
      case 'low':
        return 'var(--color-success)';
      case 'medium':
        return 'var(--color-warning)';
      case 'high':
        return 'var(--color-error)';
      default:
        return 'var(--color-text-default)';
    }
  };

  /**
   * 判断指定日期是否属于当前月份
   * 用于月视图中区分当前月和上/下月的溢出日期
   * @param date 日期字符串
   * @returns 是否属于当前月份
   */
  const isCurrentMonth = (date: string) => {
    return dayjs(date).month() === dayjs(currentDate).month();
  };

  /**
   * 判断指定日期是否为今天
   * 用于在视图中高亮显示当天日期
   * @param date 日期字符串
   * @returns 是否为今天
   */
  const isToday = (date: string) => {
    return dayjs(date).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
  };

  /**
   * 获取指定时间槽的日历事件列表
   * 先按优先级排序，再根据视图类型分组，最后获取指定槽的事件
   * @param list 日历事件列表
   * @param slot 时间槽标识（日视图为小时，周/月视图为日期）
   * @param viewType 视图类型（日、周、月）
   * @returns 该时间槽的事件列表
   */
  const getCalendarListBySlot = (
    list: ICalendarEventOrTodo[],
    slot: string,
    viewType: ICalendarViewType
  ): ICalendarEventOrTodo[] => {
    const groupRecord = getCalendarGroupRecordByView(sortCalendarListByPriority(list), viewType);
    return groupRecord[slot] ?? [];
  };

  /**
   * 获取当前视图下指定时间槽的日历事件列表
   * 是对getCalendarListBySlot的封装，便于模板中调用
   * @param list 日历事件列表
   * @param slot 时间槽标识
   * @param viewType 视图类型
   * @returns 该时间槽的事件列表
   */
  const getCurrentCalendarListBySlot = (
    list: ICalendarEventOrTodo[],
    slot: string,
    viewType: ICalendarViewType
  ): ICalendarEventOrTodo[] => {
    return getCalendarListBySlot(list, slot, viewType);
  };

  /**
   * 获取当前视图下应显示的事件列表
   * 根据时间槽是否展开决定显示全部还是限制数量
   * @param list 时间槽的完整事件列表
   * @param slot 时间槽标识
   * @returns 应显示的事件列表（展开时显示全部，否则显示viewCount个）
   */
  const getCurrentViewList = (
    list: ICalendarEventOrTodo[],
    slot: string
  ): ICalendarEventOrTodo[] => {
    return list.slice(0, expandedTimeSlots[slot] ? list.length : viewCount);
  };

  /**
   * 获取指定日期对应的星期几（中文）
   * 将日期转换为周几的中文表示（一、二、三...）
   * @param day 日期字符串
   * @returns 对应的星期几（中文）
   */
  const getCurrentWeekDay = (day: string): string => {
    const index = Number(dayjs(day).format('d')) - 1; // 0-6，0为周日
    return ICalendarWeekHeaders[index < 0 ? 6 : index]; // 处理周日特殊情况
  };

  /**
   * 切换时间槽的展开/收起状态
   * 用于展开/收起超出显示限制的事件
   * @param timeSlot 时间槽标识
   */
  const onChangeExpandedTimeSlots = (timeSlot: string) => {
    expandedTimeSlots[timeSlot] = !expandedTimeSlots[timeSlot];
    expandedTimeSlots = { ...expandedTimeSlots }; // 触发响应式更新
  };
</script>

<!-- 日历视图主容器 -->
<div class={[tuc('icalendar-view'), className]} {...otherProps}>
  {#if currentView === ICalendarViewTypeData.DAY}
    <!-- 日视图 - 按小时显示事件 -->
    <div class={tuc('icalendar-view-wrap')}>
      <!-- 日视图标题 - 显示完整日期 -->
      <div class={tuc('icalendar-view-header')}>
        <h3 class={tuc('icalendar-view-title')}>
          <svg
            class="w-5 h-5 inline-block text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <path d="M8 14h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M16 14h.01"></path>
            <path d="M8 18h.01"></path>
            <path d="M12 18h.01"></path>
            <path d="M16 18h.01"></path>
          </svg>
          {dayjs(currentDate).format('YYYY-MM-DD')}
        </h3>
      </div>
      <!-- 日视图内容区 - 按小时显示事件 -->
      <div class={tuc('icalendar-view-day')}>
        {#each generateDayTimeSlots(currentDate) as timeSlot}
          {@const currentCalendarList = getCurrentCalendarListBySlot(
            filterCalendarList,
            timeSlot,
            currentView
          )}
          <div class={tuc('icalendar-view-day-row')}>
            <div class={tuc('icalendar-view-day-left')}>
              <svg
                class="w-4 h-4 inline-block mr-1 text-primary/60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {dayjs(timeSlot).format('HH:00')}
            </div>
            <div class={tuc('icalendar-view-day-right')}>
              <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
              {@render renderCalendarCell(
                getCurrentViewList(currentCalendarList, timeSlot),
                currentView
              )}
              <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
              {@render renderExpandedButton(currentCalendarList, timeSlot)}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  {#if currentView === ICalendarViewTypeData.WEEK}
    <!-- 周视图 - 显示一周七天的事件 -->
    <div class={tuc('icalendar-view-wrap')}>
      <!-- 周视图标题 - 显示年月 -->
      <div class={tuc('icalendar-view-header')}>
        <h3 class={tuc('icalendar-view-title')}>
          <svg
            class="w-5 h-5 inline-block text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <line x1="3" y1="16" x2="7" y2="16"></line>
            <line x1="11" y1="16" x2="15" y2="16"></line>
            <line x1="19" y1="16" x2="21" y2="16"></line>
          </svg>
          {dayjs(currentDate).format('YYYY-MM')}
        </h3>
      </div>
      <!-- 周视图表头 - 显示星期几和日期 -->
      <div class={tuc('icalendar-view-week-header')}>
        {#each generateWeekDays(currentDate) as day}
          <div class={[tuc('icalendar-view-column-title'), isToday(day) ? 'bg-primary/10' : '']}>
            <div class="text-base">{getCurrentWeekDay(day)}</div>
            <div
              class="text-base text-primary/80 font-medium cursor-pointer hover:text-primary"
              onclick={() => onClickDay?.(day)}
            >
              {dayjs(day).format('D')}
            </div>
          </div>
        {/each}
      </div>
      <!-- 周视图内容区 - 每天一列显示事件 -->
      <div class={tuc('icalendar-view-week-body')}>
        {#each generateWeekDays(currentDate) as day}
          {@const currentCalendarList = getCurrentCalendarListBySlot(
            filterCalendarList,
            day,
            currentView
          )}
          <div
            class={[
              tuc('icalendar-view-cell'),
              'hover:bg-base-200/30 transition-colors duration-200',
              isToday(day) ? 'bg-primary/10 hover:bg-primary/30' : '',
            ]}
          >
            <div class="flex flex-col gap-1.5 text-xs">
              <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
              {@render renderCalendarCell(
                getCurrentViewList(currentCalendarList, day),
                currentView
              )}
              <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
              {@render renderExpandedButton(currentCalendarList, day)}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  {#if currentView === ICalendarViewTypeData.MONTH}
    <!-- 月视图 - 显示整月日历网格 -->
    <div class={tuc('icalendar-view-wrap')}>
      <!-- 月视图标题 - 显示年月 -->
      <div class={tuc('icalendar-view-header')}>
        <h3 class={tuc('icalendar-view-title')}>
          <svg
            class="w-5 h-5 inline-block text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
            <rect x="8" y="14" width="2" height="2"></rect>
            <rect x="12" y="14" width="2" height="2"></rect>
            <rect x="16" y="14" width="2" height="2"></rect>
            <rect x="4" y="18" width="2" height="2"></rect>
            <rect x="8" y="18" width="2" height="2"></rect>
            <rect x="12" y="18" width="2" height="2"></rect>
          </svg>
          {dayjs(currentDate).format('YYYY-MM')}
        </h3>
      </div>
      <!-- 月视图表头 - 显示星期几 -->
      <div class={tuc('icalendar-view-month-header')}>
        {#each ICalendarWeekHeaders as weekday}
          <div class={tuc('icalendar-view-column-title')}>{weekday}</div>
        {/each}
      </div>
      <!-- 月视图内容区 - 日历网格 -->
      <div class={tuc('icalendar-view-month-body')}>
        {#each generateMonthGrid(currentDate) as day}
          {@const currentCalendarList = getCurrentCalendarListBySlot(
            filterCalendarList,
            day,
            currentView
          )}
          <div
            class={[
              tuc('icalendar-view-cell'),
              'hover:bg-base-200/30 transition-colors duration-200',
              !isCurrentMonth(day) ? 'opacity-40 bg-base-200/20' : '',
              isToday(day)
                ? 'bg-primary/10 hover:bg-primary/30 ring-1 ring-primary/30 ring-inset'
                : '',
            ]}
          >
            <div
              class={[
                'font-medium text-center rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-1 cursor-pointer hover:text-primary',
                isToday(day) ? 'bg-primary text-primary-content hover:text-primary-content' : '',
              ]}
              onclick={() => onClickDay?.(day)}
            >
              {dayjs(day).format('D')}
            </div>
            <div class="flex flex-col gap-0.5 text-xs">
              <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
              {@render renderCalendarCell(
                getCurrentViewList(currentCalendarList, day),
                currentView
              )}
              <!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
              {@render renderExpandedButton(currentCalendarList, day)}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
{#snippet renderExpandedButton(currentCalendarList: ICalendarEventOrTodo[], timeSlot: string)}
  <!-- 渲染展开/收起按钮，仅当超出显示限制时显示 -->
  {#if currentCalendarList.slice(viewCount).length}
    <ShButton
      onclick={() => {
        onChangeExpandedTimeSlots(timeSlot);
      }}
      size="xs"
      ghost
      color="primary"
      class={tuc('rounded-full truncate')}
    >
      {#if expandedTimeSlots[timeSlot]}
        <svg
          class="w-3.5 h-3.5 inline-block mr-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
        收起（-{currentCalendarList.slice(viewCount).length}）
      {:else}
        <svg
          class="w-3.5 h-3.5 inline-block mr-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        展开（+{currentCalendarList.slice(viewCount).length}）
      {/if}
    </ShButton>
  {/if}
{/snippet}

{#snippet renderCalendarCell(list: ICalendarEventOrTodo[], view: ICalendarViewType)}
  <!-- 渲染日历事件单元格，根据视图类型使用不同的样式 -->
  {#each list as item}
    {#if ICalendarViewTypeData.DAY === view || ICalendarViewTypeData.WEEK === view}
      <!-- 日视图和周视图使用卡片式布局，左侧边框显示优先级颜色 -->
      <div
        class="shadow-sm bg-base-100 p-2 hover:bg-base-200/80 hover:shadow-md hover:translate-y-[-1px] bg-opacity-95 transition-all duration-200 ease-out cursor-pointer rounded-lg border border-base-content/5 group"
        style="border-left: 4px solid {getPriorityColor(item.priority)}"
        onclick={() => onSelected?.(item)}
      >
        {#if item.dtStart}
          <div class="text-xs opacity-80 text-primary/80 flex items-center gap-1">
            <svg
              class="w-3 h-3 inline-block"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {item.dtStart.length === 8
              ? parseICalDateTime(item.dtStart).format('YYYY-MM-DD')
              : parseICalDateTime(item.dtStart).format('HH:mm')}
          </div>
        {/if}
        <div
          class="{ICalendarViewTypeData.DAY === view
            ? 'text-sm'
            : 'text-xs'} font-medium group-hover:text-primary transition-colors"
        >
          {#if 'attendees' in item && item.attendees && item.attendees.length > 0}
            <svg
              class="w-3 h-3 inline-block mr-0.5 text-base-content/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          {:else if 'completed' in item}
            <svg
              class="w-3 h-3 inline-block mr-0.5 text-base-content/60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
          {/if}
          {item.summary}
        </div>
        {#if ICalendarViewTypeData.DAY === view && item.description}
          <div class="text-xs text-base-content/70 mt-1 line-clamp-2">
            <svg
              class="w-3 h-3 inline-block mr-0.5 text-base-content/50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            {item.description}
          </div>
        {/if}
        {#if 'location' in item && item.location}
          <div class="text-xs text-base-content/70 mt-0.5 truncate flex items-center gap-0.5">
            <svg
              class="w-3 h-3 text-base-content/50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span class="truncate">{item.location}</span>
          </div>
        {/if}
      </div>
    {:else}
      <!-- 月视图使用紧凑布局，背景色表示优先级 -->
      <div
        class="px-2 py-0.5 rounded-md truncate cursor-pointer text-base-content hover:opacity-90 hover:shadow-sm hover:translate-y-[-1px] transition-all duration-200"
        style="background-color: {getPriorityColor(item.priority)}; color: #fff;"
        onclick={() => onSelected?.(item)}
      >
        <div class="text-xs opacity-90 truncate flex items-center gap-1">
          {#if item.dtStart}
            <svg
              class="w-2.5 h-2.5 hidden sm:inline-block"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span class="hidden sm:inline-block"
              >{item.dtStart.length === 8
                ? parseICalDateTime(item.dtStart).format('YYYY-MM-DD')
                : parseICalDateTime(item.dtStart).format('HH:mm')}</span
            >
          {/if}
          <span class="truncate">
            {#if 'attendees' in item && item.attendees && item.attendees.length > 0}
              <svg
                class="w-3 h-3 inline-block mr-0.5 text-base-content/60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            {:else if 'completed' in item}
              <svg
                class="w-3 h-3 inline-block mr-0.5 text-base-content/60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            {/if}
            {item.summary}
          </span>
        </div>
      </div>
    {/if}
  {/each}
{/snippet}

<style>
  @reference "../../../../style/daisyui.css";
  @layer components {
    :global(.icalendar-view) {
      @apply relative bg-base-100 rounded-xl overflow-hidden border border-base-200 shadow-sm;
    }
    :global(.icalendar-view-wrap) {
      @apply flex flex-col h-full min-h-[25rem];
    }
    :global(.icalendar-view-header) {
      @apply py-3 px-4 text-center border-b border-base-200 bg-gradient-to-r from-primary/5 to-secondary/5;
    }
    :global(.icalendar-view-title) {
      @apply m-0 font-bold text-xl text-base-content flex items-center justify-center gap-2;
    }
    :global(.icalendar-view-day) {
      @apply flex-1 overflow-y-auto;
    }
    :global(.icalendar-view-day-left) {
      @apply w-20 p-2 text-center font-medium border-r border-base-200 flex items-center justify-center text-sm text-base-content/70;
    }
    :global(.icalendar-view-day-right) {
      @apply flex-1 p-2 flex flex-col gap-2 min-h-16 max-h-96 overflow-y-auto;
    }
    :global(.icalendar-view-day-row) {
      @apply flex border-b border-base-200/70 hover:bg-base-200/30 transition-colors;
    }
    :global(.icalendar-view-week-header),
    :global(.icalendar-view-month-header) {
      @apply grid grid-cols-7 border-l border-base-200/70 bg-base-100/90;
    }
    :global(.icalendar-view-week-body),
    :global(.icalendar-view-month-body) {
      @apply grid grid-cols-7 flex-1 overflow-y-auto border-l border-base-200/70;
    }
    :global(.icalendar-view-cell) {
      @apply bg-base-100 p-1.5 relative border-b border-r border-base-200/70 min-h-16 max-h-96 overflow-y-auto;
    }
    :global(.icalendar-view-column-title) {
      @apply py-2 px-1 text-center font-medium text-base border-b border-r border-base-200/70;
    }
  }
</style>
