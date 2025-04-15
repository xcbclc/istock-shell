<!--
@component
日历筛选组件，提供灵活的日历事件和待办事项筛选功能。支持以下特性：
- 日期范围筛选
- 多条件组合筛选（AND/OR逻辑）
- 支持单选和多选筛选项
- 响应式布局和交互
- 实时预览和应用筛选结果

用法示例:
```html
<ShICalendarFilter
  filterValue={{
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    logic: "OR"
  }}
  filters={[
    {
      type: "priority",
      title: "优先级",
      multiple: true,
      options: [
        { label: "高", value: "high" },
        { label: "中", value: "medium" },
        { label: "低", value: "low" }
      ]
    }
  ]}
  onChangeFilterValue={(value) => console.log('筛选条件变更:', value)}
/>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { ShButton, ShTooltip, ShInput, ShRadio, type RadioItemOption } from '../../../index';
  import type { ICalendarFilterValue } from './ICalendarType';

  /**
   * 筛选选项接口
   * @interface ICalendarFilterOption
   * @property {string} [label] - 选项显示文本
   * @property {string} [value] - 选项值
   */
  export interface ICalendarFilterOption {
    label?: string;
    value?: string;
  }

  /**
   * 筛选项组接口
   * @interface ICalendarFilterItem
   * @property {string} [type] - 筛选类型标识
   * @property {string} [title] - 筛选组标题
   * @property {boolean} [multiple] - 是否支持多选
   * @property {ICalendarFilterOption[]} [options] - 筛选选项列表
   */
  export interface ICalendarFilterItem {
    type: string;
    title: string;
    multiple?: boolean;
    // filterCallback?: () => boolean;
    options?: ICalendarFilterOption[];
  }

  /**
   * 日历筛选组件属性接口
   * @interface ICalendarFilterProps
   * @extends {HTMLAttributes<HTMLDivElement>}
   * @property {ICalendarFilterValue} [filterValue] - 当前筛选值
   * @property {ICalendarFilterItem[]} [filters] - 筛选条件配置
   * @property {function} [onChangeFilterValue] - 筛选值变更回调
   */
  export interface ICalendarFilterProps extends HTMLAttributes<HTMLDivElement> {
    filterValue?: ICalendarFilterValue;
    filters?: ICalendarFilterItem[];
    onChangeFilterValue?: (filterValue?: ICalendarFilterValue) => void;
  }
  /**
   * 筛选逻辑条件配置
   * @constant ICalendarLogicRecord
   * @type {Record<string, RadioItemOption>}
   */
  const ICalendarLogicRecord: Record<string, RadioItemOption> = {
    OR: {
      value: 'OR',
      label: 'OR (满足任一条件)',
    },
    AND: {
      value: 'AND',
      label: 'AND (满足所有条件)',
    },
  };

  /**
   * 筛选逻辑选项列表
   * @constant ICalendarLogicOptions
   * @type {RadioItemOption[]}
   */
  const ICalendarLogicOptions: RadioItemOption[] = Object.values(ICalendarLogicRecord);

  /**
   * 初始筛选值
   * @constant InitFilterValue
   * @type {ICalendarFilterValue}
   */
  const InitFilterValue: ICalendarFilterValue = { startDate: '', endDate: '', logic: ICalendarLogicRecord.OR.value };
</script>

<script lang="ts">
  import { tuc, isArray, clone } from '@istock/util';
  import type { ButtonColor } from '@/packages/shell-ui';

  let {
    filterValue = $bindable(clone(InitFilterValue)),
    filters = [],
    onChangeFilterValue,
    class: className = '',
    ...otherProps
  }: ICalendarFilterProps = $props();
  // 确保筛选逻辑有默认值
  if (!filterValue.logic) filterValue.logic = ICalendarLogicRecord.OR.value;

  /**
   * 筛选面板展开状态
   * @type {boolean}
   */
  let isExpanded = $state(false);

  /**
   * 临时筛选值，用于预览和确认
   * @type {ICalendarFilterValue}
   */
  let tempFilterValue: ICalendarFilterValue = $state(clone(filterValue));

  /**
   * 切换筛选面板展开状态
   */
  const onToggleExpand = () => {
    isExpanded = !isExpanded;
  };
  /**
   * 处理筛选选项点击事件
   * @param {string} type - 筛选类型
   * @param {boolean} multiple - 是否为多选模式
   * @param {any} value - 选项值
   */
  const onFilterButtonClick = (type: string = '', multiple: boolean = true, value: any) => {
    let oldCurrentFilterItemValue = tempFilterValue[type];
    if (multiple) {
      // 多选模式：切换选中状态
      if (!oldCurrentFilterItemValue) oldCurrentFilterItemValue = [];
      if (oldCurrentFilterItemValue.includes(value)) {
        tempFilterValue[type] = oldCurrentFilterItemValue.filter((v: any) => v !== value);
      } else {
        tempFilterValue[type] = [...oldCurrentFilterItemValue, value];
      }
    } else {
      // 单选模式：切换或更新选中值
      if (oldCurrentFilterItemValue === value) {
        tempFilterValue[type] = undefined;
      } else {
        tempFilterValue[type] = value;
      }
    }
    // 触发响应式更新
    tempFilterValue = { ...tempFilterValue };
  };
  /**
   * 确认应用筛选条件
   */
  const onFilterConfirmButtonClick = () => {
    filterValue = clone(tempFilterValue);
    onChangeFilterValue && onChangeFilterValue(filterValue);
    onToggleExpand();
  };
  /**
   * 取消筛选操作，恢复原值
   */
  const onFilterCancelButtonClick = () => {
    tempFilterValue = clone(filterValue);
    onToggleExpand();
  };
  /**
   * 清空所有筛选条件
   */
  const onFilterClearButtonClick = () => {
    filterValue = clone(InitFilterValue);
    tempFilterValue = clone(filterValue);
    onChangeFilterValue && onChangeFilterValue(filterValue);
    onToggleExpand();
  };
  /**
   * 获取筛选按钮的颜色状态
   * @param {string} type - 筛选类型
   * @param {any} value - 选项值
   * @returns {ButtonColor | undefined} 按钮颜色
   */
  const getFilterButtonColor = (type: string = '', value: any): ButtonColor | undefined => {
    if (isArray(tempFilterValue[type])) {
      // 多选模式：选中项显示主题色
      return tempFilterValue[type].includes(value) ? 'primary' : undefined;
    }
    // 单选模式：选中项显示主题色
    return tempFilterValue[type] === value ? 'primary' : undefined;
  };
</script>

<div class={[tuc('icalendar-filter'), className]} {...otherProps}>
  <div class={[tuc('icalendar-filter-action')]}>
    <ShTooltip placement="left" dataTip={isExpanded ? '收起筛选面板' : '展开筛选面板'}>
      <ShButton
        onclick={onToggleExpand}
        color="primary"
        size="xs"
        class="flex items-center gap-1.5 px-3 hover:shadow-md transition-all"
      >
        <svg
          class="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        筛选
        <svg
          class="w-3 h-3 ml-0.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points={isExpanded ? '18 15 12 9 6 15' : '6 9 12 15 18 9'}></polyline>
        </svg>
      </ShButton>
    </ShTooltip>
  </div>
  {#if isExpanded}
    <div class={[tuc('icalendar-filter-backdrop')]} onclick={onFilterCancelButtonClick}></div>
    <div class={[tuc('icalendar-filter-panel bg-base-100')]}>
      <div class={tuc('icalendar-filter-panel-main')}>
        <!-- 日期范围 -->
        <fieldset class={tuc('icalendar-filter-fieldset')}>
          <legend class={tuc('icalendar-filter-fieldset-legend')}>
            <span class={tuc('icalendar-filter-fieldset-title')}>
              <svg
                class="w-4 h-4"
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
              </svg>
              日期范围
            </span>
          </legend>
          <div class="flex gap-2">
            <ShInput size="xs" type="date" bind:value={tempFilterValue.startDate} aria-label="开始日期" />
            <span class="self-center text-base-content/70 font-medium flex items-center">
              <svg
                class="w-3.5 h-3.5 mx-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </span>
            <ShInput size="xs" type="date" bind:value={tempFilterValue.endDate} aria-label="结束日期" />
          </div>
        </fieldset>

        <fieldset class={tuc('icalendar-filter-fieldset')}>
          <legend class={tuc('icalendar-filter-fieldset-legend')}>
            <span class={tuc('icalendar-filter-fieldset-title')}>
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              筛选逻辑
            </span>
          </legend>
          <div class="flex flex-wrap gap-2">
            <ShRadio bind:value={tempFilterValue.logic} options={ICalendarLogicOptions} size="xs" color="primary" />
          </div>
        </fieldset>
        <!-- 其它筛选 -->
        {#each filters as filter}
          <fieldset class={tuc('icalendar-filter-fieldset')}>
            <legend class={tuc('icalendar-filter-fieldset-legend')}>
              <span class={tuc('icalendar-filter-fieldset-title')}>
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <!-- 默认过滤图标 -->
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                {filter.title}
              </span>
            </legend>
            <div class="flex flex-wrap gap-2">
              {#if filter.options}
                {#each filter.options as option}
                  <ShButton
                    size="xs"
                    color={getFilterButtonColor(filter.type, option.value)}
                    class={[
                      'rounded-full transition-all',
                      getFilterButtonColor(filter.type, option.value) ? 'border-2' : 'border border-base-300',
                    ]}
                    onclick={() => {
                      onFilterButtonClick(filter.type, filter.multiple, option.value);
                    }}
                  >
                    {#if getFilterButtonColor(filter.type, option.value)}
                      <svg
                        class="w-3 h-3 mr-1 inline-block"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                      </svg>
                    {/if}
                    {option.label}
                  </ShButton>
                {/each}
              {/if}
            </div>
          </fieldset>
        {/each}
      </div>
      <!-- 应用筛选按钮 -->
      <div class={tuc('icalendar-filter-panel-footer')}>
        <ShButton onclick={onFilterClearButtonClick} size="xs">清空</ShButton>
        <ShButton onclick={onFilterCancelButtonClick} size="xs">取消</ShButton>
        <ShButton onclick={onFilterConfirmButtonClick} size="xs" color="primary">确定</ShButton>
      </div>
    </div>
  {/if}
</div>

<style>
  @reference "../../../../style/daisyui.css";
  @layer components {
    :global(.icalendar-filter) {
      @apply relative z-10 inline-block;
    }
    :global(.icalendar-filter-backdrop) {
      @apply fixed left-0 top-0 w-full h-full z-100;
    }
    :global(.icalendar-filter-action) {
      @apply flex justify-between items-center;
    }
    :global(.icalendar-filter-panel) {
      @apply absolute top-full mt-2 right-0 border border-base-200 rounded-xl shadow-lg z-100 min-w-96 max-h-96 overflow-y-auto flex flex-col;
    }
    :global(.icalendar-filter-fieldset) {
      @apply p-4 rounded-xl w-full border border-base-200/80 shadow-xs transition-all duration-200 hover:shadow-sm;
    }
    :global(.icalendar-filter-fieldset-legend) {
      @apply px-2 pt-0 mb-2;
    }
    :global(.icalendar-filter-fieldset-title) {
      @apply text-sm font-medium text-primary flex items-center gap-2;
    }
    :global(.icalendar-filter-panel-main) {
      @apply flex flex-col gap-4 p-4 overflow-y-auto;
    }
    :global(.icalendar-filter-panel-footer) {
      @apply sticky bottom-0 p-3 border-t border-base-200 mt-auto flex justify-end gap-2 backdrop-blur-sm;
    }
  }
</style>
