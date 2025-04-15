<!--
@component
日历组件，集成了日历的各个功能模块，提供完整的日历应用界面。支持以下功能：
- 日、周、月三种视图模式切换
- 事件和待办事项的展示和管理
- 日期选择和导航（前一个/后一个/今日）
- 事件过滤功能
- 通知提醒功能
- 事件详情查看

用法示例:
```html
<ShICalendar
  events={[
    { summary: '会议', dtStart: '2024-01-01 10:00', description: '项目讨论' }
  ]}
  todos={[
    { summary: '任务', dtStart: '2024-01-01', priority: 5 }
  ]}
  currentView="week"
  filters={[
    { text: '全部', value: {} },
    { text: '事件', value: { type: 'event' } }
  ]}
/>
```
-->

<script lang="ts" module>
  import dayjs from 'dayjs';
  import type { HTMLAttributes } from 'svelte/elements';
  import ShICalendarDate, { type ICalendarDateProps } from './core/ICalendarDate.svelte';
  import ShICalendarFilter, { type ICalendarFilterItem } from './core/ICalendarFilter.svelte';
  import ShICalendarModal from './core/ICalendarModal.svelte';
  import ShICalendarNotify, { type ICalendarNotifyProps } from './core/ICalendarNotify.svelte';
  import ShICalendarView from './core/ICalendarView.svelte';
  import ShICalendarTab, { type ICalendarTabProps } from './core/ICalendarTab.svelte';
  import {
    type ICalendarFilterValue,
    ICalendarViewTypeData,
    type ICalendarViewType,
    type ICalendarVEvent,
    type ICalendarVTodo,
    type ICalendarEventOrTodo,
  } from './core/ICalendarType';

  interface ICalendarProps extends HTMLAttributes<HTMLDivElement> {
    events?: ICalendarVEvent[]; // 日历事件列表
    todos?: ICalendarVTodo[]; // 待办事项列表
    currentDate?: string; // 当前选中日期，格式：YYYY-MM-DD
    currentView?: ICalendarViewType; // 当前视图类型：日、周、月
    filterValue?: ICalendarFilterValue; // 过滤条件
    filters?: ICalendarFilterItem[]; // 过滤选项列表
    notify?: Omit<ICalendarNotifyProps, 'show'>; // 通知配置
    notifyShow?: boolean; // 是否显示通知
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import type { ICalendarViewProps } from '@/packages/shell-ui';

  let {
    events = [],
    todos = [],
    currentDate = $bindable(dayjs().format('YYYY-MM-DD')), // 默认为今天
    currentView = $bindable('week'), // 默认为周视图
    filterValue = $bindable({}), // 默认不过滤
    filters = [],
    notify = {},
    notifyShow = $bindable(false),
  }: ICalendarProps = $props();

  // 当前选中的事件或待办项，用于在模态框中显示详情
  let iCalendarEventOrTodoItem = $state<ICalendarEventOrTodo>();
  // 控制模态框显示状态
  let showICalendarModal = $state(false);

  /**
   * 配置日期控制组件的属性
   * 包括今日按钮、前一个/后一个导航按钮和日期输入框的行为
   */
  const iCalendarDateProps: ICalendarDateProps = {
    button: {
      text: '今日',
      onclick: () => {
        onCurrentDateChange(dayjs().format('YYYY-MM-DD'));
      },
    },
    prevButton: {
      onclick: () => {
        onCurrentDateChange(dayjs(currentDate).subtract(1, currentView).format('YYYY-MM-DD'));
      },
    },
    nextButton: {
      onclick: () => {
        onCurrentDateChange(dayjs(currentDate).add(1, currentView).format('YYYY-MM-DD'));
      },
    },
    inputDate: {
      onChangeValue: (value: any) => {
        onCurrentDateChange(value);
      },
    },
  };

  /**
   * 配置视图切换标签页的属性
   * 根据当前选中的视图类型高亮对应标签
   */
  const iCalendarTabProps: ICalendarTabProps = $derived.by(() => {
    return {
      tabs: [
        {
          text: '天',
          color: currentView === ICalendarViewTypeData.DAY ? 'primary' : undefined,
          onclick: () => {
            onViewChange(ICalendarViewTypeData.DAY);
          },
        },
        {
          text: '周',
          color: currentView === ICalendarViewTypeData.WEEK ? 'primary' : undefined,
          onclick: () => {
            onViewChange(ICalendarViewTypeData.WEEK);
          },
        },
        {
          text: '月',
          color: currentView === ICalendarViewTypeData.MONTH ? 'primary' : undefined,
          onclick: () => {
            onViewChange(ICalendarViewTypeData.MONTH);
          },
        },
      ],
    };
  });

  /**
   * 配置日历视图组件的属性
   * 组合当前视图、日期、过滤条件和事件数据
   */
  const iCalendarViewProps: ICalendarViewProps = $derived.by(() => {
    return {
      currentView,
      currentDate,
      filterValue,
      calendarData: {
        version: '2.0',
        prodId: '-//IStock Shell//ICalendar 1.0//CN',
        calscale: 'GREGORIAN',
        events,
        todos,
      },
      onSelected: onItemSelected,
      onClickDay: onDayChange,
    };
  });

  /**
   * 更新当前选中日期
   * @param value 新的日期字符串，格式：YYYY-MM-DD
   */
  const onCurrentDateChange = (value: string) => {
    currentDate = value;
  };

  /**
   * 更新当前视图类型
   * @param newView 新的视图类型（日、周、月）
   */
  const onViewChange = (newView: ICalendarViewType) => {
    currentView = newView;
  };

  /**
   * 处理日期点击事件
   * 当用户点击日历中的某一天时，切换到日视图并更新当前日期
   * @param day 被点击的日期字符串
   */
  const onDayChange = (day: string) => {
    onViewChange('day');
    onCurrentDateChange(dayjs(day).format('YYYY-MM-DD'));
  };

  /**
   * 处理事件或待办项的选中事件
   * 当用户点击某个事件或待办项时，显示其详情模态框
   * @param item 被选中的事件或待办项
   */
  const onItemSelected = (item: ICalendarEventOrTodo) => {
    iCalendarEventOrTodoItem = item;
    showICalendarModal = true;
  };
</script>

<div class={[tuc('icalendar')]}>
  <!-- 通知栏 - 用于显示系统通知或提醒 -->
  <ShICalendarNotify {...notify} bind:show={notifyShow} />

  <!-- 控制面板 - 包含视图切换、日期导航和过滤器 -->
  <div class={[tuc('icalendar-panel')]}>
    <!-- 视图切换标签页 - 日/周/月 -->
    <ShICalendarTab {...iCalendarTabProps} />
    <div class={[tuc('inline-flex gap-2 align-center')]}>
      <!-- 日期导航控件 - 前一个/后一个/今日/日期选择 -->
      <ShICalendarDate bind:currentDate {...iCalendarDateProps} />
      <!-- 过滤面板 - 用于筛选不同类型的事件 -->
      <ShICalendarFilter {filters} bind:filterValue />
    </div>
  </div>

  <!-- 日历视图 - 主要内容区域，显示事件和待办项 -->
  <div class={[tuc('icalendar-main')]}>
    <ShICalendarView {...iCalendarViewProps} />
  </div>

  <!-- 事件模态框 - 用于显示事件或待办项的详细信息 -->
  <ShICalendarModal bind:show={showICalendarModal} data={iCalendarEventOrTodoItem} />
</div>

<style>
  @reference "../../../style/daisyui.css";
  @layer components {
    :global(.icalendar) {
      @apply flex flex-col gap-4 w-full max-w-5xl max-h-full overflow-auto pt-4 pb-4;
    }

    :global(.icalendar-panel) {
      @apply flex justify-between items-center;
    }

    :global(.icalendar-main) {
      @apply flex-1;
    }
  }
</style>
