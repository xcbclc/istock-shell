<!--
@component
ShICalendarModal 日历事件详情模态框组件

一个专门用于展示日历事件或待办事项详细信息的模态框组件。
基于 ShModal 组件构建，提供完整的类型安全和响应式支持。

功能特性：
- 展示事件或待办事项的详细信息，包括标题、时间、地点、描述等
- 智能区分事件（VEVENT）和待办事项（VTODO）的不同字段展示
- 支持优先级、状态的可视化展示，使用不同颜色标识
- 展示参与者、提醒、分类等扩展信息
- 支持时间格式化和持续时间计算
- 继承所有 ShModal 组件的属性和功能
- 完整的 TypeScript 类型安全
- 响应式布局，适配不同屏幕尺寸

示例用法：
```svelte
<script lang="ts">
  import { ShICalendarModal } from '@istock-shell/ui';

  let showModal = false;
  
  const eventData = {
    summary: '项目会议',
    dtStart: '2024-01-01T10:00:00',
    dtEnd: '2024-01-01T11:00:00',
    description: '讨论项目进度和下一步计划',
    location: '会议室A',
    priority: 5,
    status: 'CONFIRMED'
  };

  const todoData = {
    summary: '完成报告',
    dtStart: '2024-01-01',
    due: '2024-01-03',
    description: '完成月度工作报告',
    priority: 7,
    status: 'IN-PROCESS'
  };

  function openEventModal() {
    showModal = true;
  }
</script>

<p>事件详情模态框</p>
<ShICalendarModal
  bind:show={showModal}
  data={eventData}
/>

<p>待办事项详情模态框</p>
<ShICalendarModal
  bind:show={showModal}
  data={todoData}
  closeButton={true}
  maskClosable={true}
/>
```
-->

<script lang="ts" module>
  import { ShModal, type ModalProps } from '../../../index';
  import type { ICalendarEventOrTodo } from './ICalendarType';

  /**
   * 日历事件详情模态框组件属性接口
   * 继承所有 ShModal 组件的属性，并扩展日历事件展示特有的功能属性
   * @typedef {ModalProps & ICalendarModalPropsExtension} ICalendarModalProps
   */
  export interface ICalendarModalProps extends ModalProps {
    /** 要展示的日历事件或待办事项数据，支持事件（VEVENT）和待办（VTODO）两种类型 */
    data?: ICalendarEventOrTodo;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';
  import { ShButton } from '../../../index';
  import { ICalendarEventStatus, ICalendarTodoStatus } from './ICalendarType';
  import {
    ICalendarAlarmActionTextRecord,
    ICalendarEventStatusTextRecord,
    ICalendarTodoStatusTextRecord,
    formatDuration,
    isRelativeDuration,
    getPriorityLevel,
    parseICalDateTime,
    isVTodo,
    isVEvent,
  } from './ICalendarCore';

  let {
    show = $bindable(false),
    closeButton = true,
    maskClosable = true,
    data,
    class: className = '',
    ...otherProps
  }: ICalendarModalProps = $props();

  /**
   * 根据事件状态获取对应的颜色样式类
   * 为不同状态的事件（已确认、已取消、未确认）分配不同的颜色
   * @param status 事件状态值
   * @returns 对应状态的CSS颜色类名
   */
  const getEventStatusColor = (status?: string) => {
    switch (status) {
      case ICalendarEventStatus.CONFIRMED:
        return 'bg-success text-success-content';
      case ICalendarEventStatus.CANCELLED:
        return 'bg-error text-error-content';
      default:
        return 'bg-neutral text-neutral-content';
    }
  };

  /**
   * 根据待办事项状态获取对应的颜色样式类
   * 为不同状态的待办（已完成、进行中、需要处理）分配不同的颜色
   * @param status 待办事项状态值
   * @returns 对应状态的CSS颜色类名
   */
  const getTodoStatusColor = (status?: string) => {
    switch (status) {
      case ICalendarTodoStatus.COMPLETED:
        return 'bg-success text-success-content';
      case ICalendarTodoStatus.IN_PROCESS:
        return 'bg-warning text-warning-content';
      case ICalendarTodoStatus.NEEDS_ACTION:
        return 'bg-info text-info-content';
      default:
        return 'bg-neutral text-neutral-content';
    }
  };

  /**
   * 根据优先级数值获取对应的中文文本
   * 将数字优先级转换为用户友好的中文表示（高/中/低）
   * @param priority 优先级数值（0-9，0为默认/无优先级）
   * @returns 优先级的中文文本表示
   */
  const getPriorityLevelText = (priority?: number) => {
    if (priority === undefined || priority === null) return '无';
    const level = getPriorityLevel(priority);
    switch (level) {
      case 'low':
        return '低';
      case 'medium':
        return '中';
      case 'high':
        return '高';
      default:
        return '无';
    }
  };

  /**
   * 根据优先级数值获取对应的徽章颜色样式类
   * 为不同级别的优先级（高/中/低）分配不同的徽章颜色
   * @param priority 优先级数值（0-9，0为默认/无优先级）
   * @returns 对应优先级的徽章颜色类名
   */
  const getPriorityColor = (priority?: number) => {
    if (priority === undefined || priority === null) return 'badge-neutral';
    const level = getPriorityLevel(priority);
    switch (level) {
      case 'low':
        return 'badge-success';
      case 'medium':
        return 'badge-warning';
      case 'high':
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  };

  /**
   * 格式化日期时间字符串为标准显示格式
   * 将iCalendar日期时间格式转换为用户友好的格式
   * @param dateTime iCalendar格式的日期时间字符串
   * @returns 格式化后的日期时间字符串（YYYY-MM-DD HH:mm）
   */
  const formatDateTime = (dateTime?: string) => {
    if (!dateTime) return '';
    const day = parseICalDateTime(dateTime);
    if (dateTime.length === 8) {
      return day.format('YYYY-MM-DD');
    }
    return day.format('YYYY-MM-DD HH:mm');
  };
  /**
   * 将额外数据对象转成能浏览的数据
   * @param value
   */
  const toExtraValueForView = (value: Object) => {
    return JSON.stringify(value, null, 2);
  };
</script>

<ShModal class={[tuc('icalendar-modal'), className]} bind:show {...otherProps}>
  {#if maskClosable}
    <!-- 可点击遮罩关闭 -->
    <form method="dialog" class={tuc('modal-backdrop')}>
      <button>关闭</button>
    </form>
  {/if}
  <div class={[tuc('modal-box icalendar-modal-box p-0 md:max-w-3/4 lg:max-w-3xl')]}>
    {#if closeButton}
      <!-- 关闭按钮 -->
      <form method="dialog" class={tuc('absolute right-3 top-3 z-100')}>
        <ShButton size="sm" shape="circle" class={tuc('backdrop-blur-sm transition-all duration-200')} ghost>✕</ShButton
        >
      </form>
    {/if}

    {#if data}
      <div class={tuc('flex flex-col max-h-[85vh]')}>
        <!-- 模态框头部 - 显示标题和状态徽章 -->
        <div class={tuc('icalendar-modal-header')}>
          <h2 class={tuc('icalendar-modal-title')}>{data.summary}</h2>
          <div class={tuc('flex gap-2 flex-wrap')}>
            {#if isVEvent(data)}
              <span
                class={[tuc('badge badge-outline badge-sm shadow-xs transition-all'), getEventStatusColor(data.status)]}
                >{data.status && ICalendarEventStatusTextRecord[data.status]
                  ? ICalendarEventStatusTextRecord[data.status]
                  : '未确认'}</span
              >
            {:else}
              <span
                class={[tuc('badge badge-outline badge-sm shadow-xs transition-all'), getTodoStatusColor(data.status)]}
                >{data.status && ICalendarTodoStatusTextRecord[data.status]
                  ? ICalendarTodoStatusTextRecord[data.status]
                  : '未设置'}</span
              >
            {/if}
            <span
              class={[tuc('badge badge-outline badge-sm shadow-xs transition-all'), getPriorityColor(data.priority)]}
              >优先级: {getPriorityLevelText(data.priority)}</span
            >
            {#if data.url}
              <a
                href={data.url}
                class={[
                  tuc('badge badge-outline badge-sm shadow-xs hover:badge-soft transition-all'),
                  getPriorityColor(data.priority),
                ]}>关联地址</a
              >
            {/if}
          </div>
        </div>

        <!-- 模态框内容区 - 可滚动 -->
        <div class={tuc('p-6 overflow-y-auto')}>
          <div class={tuc('icalendar-modal-body')}>
            <div class={tuc('icalendar-modal-content')}>
              <h3 class={tuc('icalendar-modal-field-title text-lg')}>
                <span
                  class={tuc('inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class={tuc('w-3.5 h-3.5')}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                {isVEvent(data) ? '事件' : '待办'}时间
              </h3>
              <div class={tuc('space-y-3 group-hover:translate-x-0.5 transition-transform duration-300')}>
                <div class={tuc('icalendar-modal-kv')}>
                  <span class={tuc('icalendar-modal-kv-title')}>开始时间:</span>
                  <span class="text-base-content font-medium">{formatDateTime(data.dtStart)}</span>
                </div>
                {#if isVEvent(data) && data.dtEnd}
                  <div class={tuc('icalendar-modal-kv')}>
                    <span class={tuc('icalendar-modal-kv-title')}>结束时间:</span>
                    <span class="text-base-content font-medium">{formatDateTime(data.dtEnd)}</span>
                  </div>
                {:else if isVTodo(data) && data.due}
                  <div class={tuc('icalendar-modal-kv')}>
                    <span class={tuc('icalendar-modal-kv-title')}>截止时间:</span>
                    <span class="text-base-content font-medium">{formatDateTime(data.due)}</span>
                  </div>
                {/if}
                {#if isVTodo(data) && data.completed}
                  <div class={tuc('icalendar-modal-kv')}>
                    <span class={tuc('icalendar-modal-kv-title')}>完成时间:</span>
                    <span class="text-base-content font-medium">{formatDateTime(data.completed)}</span>
                  </div>
                {/if}
                {#if isVTodo(data) && data.percentComplete !== undefined}
                  <div class={tuc('icalendar-modal-kv')}>
                    <span class={tuc('icalendar-modal-kv-title')}>完成进度:</span>
                    <div class={tuc('flex items-center gap-2')}>
                      <div class={tuc('relative w-28')}>
                        <progress
                          class={tuc('progress progress-primary h-2 w-full')}
                          value={data.percentComplete}
                          max="100"
                        ></progress>
                        <div
                          class={tuc(`absolute -top-0.5 left-0 h-3 w-3 rounded-full bg-primary transition-all`)}
                          style={`left: ${Math.min(100, Math.max(0, data.percentComplete))}%`}
                        ></div>
                      </div>
                      <span class={tuc('text-sm font-medium')}>{data.percentComplete}%</span>
                    </div>
                  </div>
                {/if}
              </div>
            </div>

            <!-- 次要信息区域 - 地点、分类、组织者 -->
            <div class={tuc('space-y-4')}>
              {#if isVEvent(data) && data.location}
                <div class={tuc('icalendar-modal-content')}>
                  <div class={tuc('icalendar-modal-field-title')}>
                    <span
                      class={tuc('inline-flex items-center justify-center w-5 h-5 rounded-full bg-info/10 text-info')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class={tuc('w-3 h-3')}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </span>
                    地点
                  </div>
                  <p class={tuc('text-base-content group-hover:translate-x-0.5 transition-transform duration-300')}>
                    {data.location}
                  </p>
                </div>
              {/if}

              {#if data.categories && data.categories.length > 0}
                <div class={tuc('icalendar-modal-content')}>
                  <div class={tuc('icalendar-modal-field-title')}>
                    <span
                      class={tuc(
                        'inline-flex items-center justify-center w-5 h-5 rounded-full bg-warning/10 text-warning'
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class={tuc('w-3 h-3')}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M4 9h16M4 15h16" />
                        <path d="M10 3v18M14 3v18" />
                      </svg>
                    </span>
                    分类
                  </div>
                  <div
                    class={tuc('flex flex-wrap gap-2 group-hover:translate-x-0.5 transition-transform duration-300')}
                  >
                    {#each data.categories as category}
                      <span
                        class={tuc(
                          'badge badge-primary badge-outline px-3 py-1 rounded-full text-sm shadow-xs hover:shadow-sm transition-all'
                        )}>{category}</span
                      >
                    {/each}
                  </div>
                </div>
              {/if}

              {#if data.organizer}
                <div class={tuc('icalendar-modal-content')}>
                  <div class={tuc('icalendar-modal-field-title')}>
                    <span
                      class={tuc(
                        'inline-flex items-center justify-center w-5 h-5 rounded-full bg-success/10 text-success'
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class={tuc('w-3 h-3')}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    组织者
                  </div>
                  <p class={tuc('text-base-content group-hover:translate-x-0.5 transition-transform duration-300')}>
                    {data.organizer.replace('mailto:', '')}
                  </p>
                </div>
              {/if}
            </div>
          </div>

          {#if data.description}
            <div class={tuc('icalendar-modal-field')}>
              <h3 class={tuc('icalendar-modal-field-title')}>
                <span
                  class={tuc(
                    'inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary/10 text-secondary'
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class={tuc('w-3 h-3')}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </span>
                描述
              </h3>
              <div class={tuc('icalendar-modal-content')}>
                <div class={tuc('group-hover:translate-x-0.5 transition-transform duration-300')}>
                  {data.description}
                </div>
              </div>
            </div>
          {/if}

          {#if isVEvent(data) && data.attendees && data.attendees.length > 0}
            <div class={tuc('icalendar-modal-field')}>
              <h3 class={tuc('icalendar-modal-field-title')}>
                <span
                  class={tuc('inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class={tuc('w-3 h-3')}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </span>
                参与者
              </h3>
              <div class={tuc('grid grid-cols-1 md:grid-cols-2 gap-3')}>
                {#each data.attendees as attendee}
                  <div class={tuc('icalendar-modal-content')}>
                    <span class={tuc('flex items-center gap-2')}>
                      <span
                        class={tuc(
                          'inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/5 text-primary'
                        )}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class={tuc('w-4 h-4')}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </span>
                      {attendee.replace('mailto:', '')}
                    </span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          {#if data.alarms && data.alarms.length > 0}
            <!-- 提醒设置 -->
            <div class={tuc('icalendar-modal-field')}>
              <h3 class={tuc('icalendar-modal-field-title')}>
                <span
                  class={tuc('inline-flex items-center justify-center w-5 h-5 rounded-full bg-error/10 text-error')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class={tuc('w-3 h-3')}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                </span>
                提醒
              </h3>
              <div class={tuc('grid grid-cols-1 md:grid-cols-2 gap-3')}>
                {#each data.alarms as alarm}
                  <div class={tuc('icalendar-modal-content')}>
                    <div class={tuc('text-sm flex items-center gap-2')}>
                      <span class={tuc('font-medium')}>类型:</span>
                      {ICalendarAlarmActionTextRecord[alarm.action] ?? ''}
                    </div>
                    {#if alarm.description}
                      <div class={tuc('text-sm mt-1 flex items-center gap-2')}>
                        <span class={tuc('font-medium')}>描述:</span>
                        {alarm.description}
                      </div>
                    {/if}
                    <div class={tuc('text-sm mt-1 flex items-center gap-2')}>
                      <span class={tuc('font-medium')}>触发:</span>
                      <span class={tuc('badge badge-sm badge-outline')}>
                        {isRelativeDuration(alarm.trigger)
                          ? formatDuration(alarm.trigger)
                          : formatDateTime(alarm.trigger)}
                      </span>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          {#if data.extra && Object.keys(data.extra).length > 0}
            <!-- 额外属性展示 -->
            <div class={tuc('icalendar-modal-field')}>
              <h3 class={tuc('icalendar-modal-field-title')}>
                <span
                  class={tuc('inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-accent')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class={tuc('w-3 h-3')}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </span>
                详情
              </h3>
              <div class={tuc('icalendar-modal-content')}>
                <div class={tuc('flex flex-col divide-y divide-base-200/70')}>
                  {#each Object.entries(data.extra) as [key, value], i}
                    <div
                      class={tuc(
                        'py-2 first:pt-0 last:pb-0 group-hover:translate-x-0.5 transition-transform duration-300'
                      )}
                      style={`transition-delay: ${i * 50}ms`}
                    >
                      <div class={tuc('font-medium text-xs text-base-content/70 mb-1')}>
                        {key}
                      </div>
                      <div class={tuc('text-sm')}>
                        {#if typeof value === 'object' && value !== null}
                          <pre class={tuc('text-xs overflow-x-auto p-1 rounded bg-base-200/50')}>
                            {toExtraValueForView(value)}
                          </pre>
                        {:else}
                          {String(value)}
                        {/if}
                      </div>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    {:else}
      <!-- 无数据时的占位内容 -->
      <div class={tuc('p-12 text-center')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class={tuc('w-12 h-12 mx-auto text-base-content/30')}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <path d="M16 2v4" />
          <path d="M8 2v4" />
          <path d="M3 10h18" />
        </svg>
        <p class={tuc('text-lg text-base-content/70 mt-4')}>无有效数据</p>
      </div>
    {/if}
  </div>
</ShModal>

<style>
  @reference "../../../../style/daisyui.css";
  @layer components {
    :global(.icalendar-modal) {
    }

    :global(.icalendar-modal-box) {
      @apply shadow-xl rounded-xl border border-base-200 max-h-[90vh];
    }

    :global(.icalendar-modal-header) {
      @apply flex flex-col p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-base-200 backdrop-blur-sm sticky top-0 z-10;
    }

    :global(.icalendar-modal-title) {
      @apply text-2xl font-bold mb-3 text-balance;
    }

    :global(.icalendar-modal-body) {
      @apply grid grid-cols-1 md:grid-cols-2 gap-4;
    }

    :global(.icalendar-modal-field) {
      @apply w-full  mt-5;
    }

    :global(.icalendar-modal-field-title) {
      @apply text-sm font-semibold mb-2 text-base-content flex items-center gap-2;
    }

    :global(.icalendar-modal-kv) {
      @apply flex flex-col sm:flex-row sm:items-center sm:gap-2 text-sm leading-snug my-1;
    }

    :global(.icalendar-modal-kv-title) {
      @apply text-base-content/70 font-medium;
    }

    :global(.icalendar-modal-content) {
      @apply px-4 py-2 border border-base-200 rounded-xl bg-base-100/60  bg-gradient-to-br from-base-100 to-base-100/70 shadow-xs hover:shadow-sm transition-all duration-300 [&>*]:my-3 text-sm;
    }
  }
</style>
