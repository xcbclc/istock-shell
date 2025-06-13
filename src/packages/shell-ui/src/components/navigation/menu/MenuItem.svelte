<!--
@component
ShMenuItem 菜单项组件

一个功能丰富的菜单项组件，作为菜单系统的核心构建块。
支持图标、文本、工具提示、子菜单、激活状态、禁用状态等完整功能。
基于原生 HTML li 元素构建，提供两种切换模式和灵活的自定义选项。

功能特性：
- 支持图标和文本的组合显示，提供丰富的视觉表现
- 内置工具提示功能，支持字符串和对象两种配置方式
- 支持多级子菜单，可无限嵌套
- 提供两种切换模式：下拉菜单模式和详情展开模式
- 支持激活、禁用、聚焦等多种交互状态
- 支持自定义图标渲染函数，满足特殊需求
- 支持标题项模式，用于菜单分组
- 完整的事件处理机制，包括点击和状态变更
- 继承所有原生 li 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShMenuItem } from '@istock-shell/shell-ui';

  function handleClick(item, key, collapsed) {
    console.log('菜单项点击:', { item, key, collapsed });
    // 处理路由跳转或业务逻辑
  }
</script>

<p>基础菜单项</p>
<ShMenuItem
  key="home"
  text="首页"
  iconName="home"
  active={true}
  onMenuItemClick={handleClick}
/>
```

带工具提示的菜单项：
```svelte
<ShMenuItem
  key="settings"
  text="系统设置"
  iconName="settings"
  tooltip="点击进入系统设置页面"
  disabled={false}
  onMenuItemClick={handleClick}
/>
```

复杂工具提示配置：
```svelte
<ShMenuItem
  text="高级设置"
  iconName="cog"
  tooltip={{
    dataTip: "高级系统配置选项",
    placement: "right",
    delay: 500
  }}
/>
```

带子菜单的菜单项（下拉模式）：
```svelte
<ShMenuItem
  key="products"
  text="产品管理"
  iconName="package"
  toggleType={1}
  canToggle={true}
  subItem={{
    items: [
      { key: 'add-product', text: '添加产品', iconName: 'plus' },
      { key: 'list-products', text: '产品列表', iconName: 'list' },
      { key: 'categories', text: '分类管理', iconName: 'folder' }
    ]
  }}
  onMenuItemClick={handleClick}
/>
```

-->

<script lang="ts" module>
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes, HTMLAnchorAttributes } from 'svelte/elements';
  import { ShTooltip, ShIcon, type TooltipProps } from '../../index';
  import ShMenu, { MENU_COMMON_PROPS, type MenuProps } from './Menu.svelte';
  import { MenuItemVariantConfig, MenuItemTextVariantConfig } from '../../../theme/config';

  const menuItemVariantConfig = MenuItemVariantConfig;
  const menuItemTextVariantConfig = MenuItemTextVariantConfig;

  /**
   * 菜单项组件属性接口
   * 继承所有原生 li 元素的 HTML 属性，并扩展菜单项特有的功能属性
   * @typedef {HTMLAttributes<HTMLLIElement> & MenuItemPropsExtension} MenuItemProps
   */
  export interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
    /** 菜单项唯一标识符，用于激活状态管理和路由导航 */
    key?: string;
    /** 菜单项显示文本内容，支持纯文本显示 */
    text?: string;
    /** 是否为标题项，用于菜单分组和视觉分隔 @default false */
    isTitle?: boolean;
    /** 是否处于激活状态，影响视觉样式和用户体验 @default false */
    active?: boolean;
    /** 是否禁用状态，禁用时不响应用户交互 @default false */
    disabled?: boolean;
    /** 是否处于聚焦状态，用于键盘导航和无障碍访问 @default false */
    focus?: boolean;
    /** 子菜单是否折叠状态，支持双向绑定 @default false */
    collapsed?: boolean;
    /** 是否允许切换折叠状态，控制子菜单的交互行为 @default true */
    canToggle?: boolean;
    /** 内部链接元素的HTML属性配置，支持href、target等链接属性 */
    itemAttr?: HTMLAnchorAttributes;
    /** 工具提示配置，支持字符串快捷配置或完整的TooltipProps对象 */
    tooltip?: string | TooltipProps;
    /** 切换模式类型：1-下拉菜单模式，2-详情展开模式 @default 1 */
    toggleType?: 1 | 2;
    /** 子菜单配置对象，包含子菜单的完整属性和菜单项列表 */
    subItem?: MenuProps;
    /** 图标名称，使用ShIcon组件渲染预定义图标 */
    iconName?: string;
    /** 菜单项点击事件回调函数，传递菜单项数据、唯一标识和折叠状态 */
    onMenuItemClick?: (item: MenuItemProps, key?: string, collapsed?: boolean) => void;
    /** 自定义图标渲染函数，用于渲染复杂或自定义的图标内容 */
    iconRender?: () => ReturnType<Snippet<[]>>;
  }
</script>

<script lang="ts">
  import { getContext } from 'svelte';
  import { tv } from 'tailwind-variants';
  import { tuc, isString } from '@istock-shell/util';

  // 解构组件属性，设置默认值和双向绑定
  let { collapsed = $bindable(false), ...menuItemProps }: MenuItemProps = $props();
  const {
    key, // 菜单项唯一标识
    text, // 菜单项显示文本
    active = false, // 是否激活状态，默认false
    disabled = false, // 是否禁用，默认false
    focus = false, // 是否聚焦，默认false
    isTitle = false, // 是否为标题项，默认false
    canToggle = true, // 是否可切换，默认true
    tooltip, // 工具提示配置
    toggleType = 1, // 切换模式，默认下拉菜单模式
    iconName, // 图标名称
    onMenuItemClick, // 点击事件回调
    iconRender, // 自定义图标渲染函数
    itemAttr, // 内部链接元素属性配置
    subItem, // 子菜单配置
    children, // 子内容插槽
    class: className = '', // 自定义CSS类名
    ...otherProps // 其他HTML原生属性
  } = $derived(menuItemProps);
  const menuItemVariants = tv(menuItemVariantConfig, {});
  const menuItemTextVariants = tv(menuItemTextVariantConfig, {});

  // 从上下文获取菜单通用属性，用于子菜单继承和状态同步
  const menuCommonProps = getContext<MenuProps>(MENU_COMMON_PROPS);

  /**
   * 获取工具提示属性配置
   * 支持字符串快捷配置和完整TooltipProps对象配置两种形式
   * @param tooltip 工具提示配置
   * @returns 标准化的工具提示属性对象
   */
  const getTooltipProps = (tooltip: string | TooltipProps): TooltipProps => {
    // 如果是字符串，转换为标准的工具提示配置对象
    return isString(tooltip) ? { dataTip: tooltip } : tooltip;
  };

  /**
   * 菜单项点击事件处理器
   * 处理子菜单折叠/展开逻辑和事件传播
   * @param e 鼠标点击事件
   */
  const onMenuItemClickHandler = (e: MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement }) => {
    // 阻止事件冒泡，避免触发父级菜单项的点击事件
    e.stopPropagation();

    // 如果有子菜单且允许切换，处理折叠/展开逻辑
    if (Boolean(subItem) && canToggle) {
      collapsed = !collapsed;
    }

    // 调用外部传入的点击回调，传递菜单项信息
    onMenuItemClick?.(menuItemProps, key, collapsed);
  };
</script>

<!-- 菜单项根容器，使用li元素提供语义化的列表项结构 -->
<li class={[tuc(menuItemVariants({ disabled, title: isTitle && !Boolean(subItem) })), className]} {...otherProps}>
  {#if children}
    <!-- 渲染自定义子内容插槽 -->
    {@render children()}
  {:else if toggleType === 1 || !Boolean(subItem) || !canToggle}
    {#if tooltip}
      <!-- 带工具提示的菜单项：使用ShTooltip组件包装，提供悬停提示功能 -->
      <ShTooltip {...getTooltipProps(tooltip)}>
        {@render renderItem()}
      </ShTooltip>
    {:else}
      <!-- 无工具提示的菜单项：直接渲染链接内容，减少DOM层级 -->
      {@render renderItem()}
    {/if}
    {#if subItem}
      <!-- 子菜单渲染区域：根据折叠状态和切换模式渲染子菜单 -->
      {@const { class: className = '', ...otherSubItem } = subItem ?? {}}
      <ShMenu
        {...menuCommonProps}
        {toggleType}
        class={[
          Boolean(subItem) && canToggle ? tuc('menu-dropdown') : '',
          Boolean(subItem) && !collapsed && canToggle ? tuc('menu-dropdown-show') : '',
          className,
        ]}
        {onMenuItemClick}
        {...otherSubItem}
      />
    {/if}
  {:else if toggleType === 2 && Boolean(subItem)}
    <!-- 详情展开模式：使用HTML details元素提供原生的折叠展开功能 -->
    {#if collapsed}
      <details>
        <summary>{text}</summary>
        {#if subItem}
          <ShMenu {...menuCommonProps} {toggleType} {onMenuItemClick} {...subItem} />
        {/if}
      </details>
    {:else}
      <details open>
        <summary>{text}</summary>
        {#if subItem}
          <ShMenu {...menuCommonProps} {toggleType} {onMenuItemClick} {...subItem} />
        {/if}
      </details>
    {/if}
  {/if}
</li>
<!-- 菜单项内容渲染片段 -->
{#snippet renderItem()}
  {@const { onclick, class: className = '', ...otherLink } = itemAttr ?? {}}
  <!-- 菜单项链接元素 -->
  <a
    class={[
      tuc(menuItemTextVariants({ active, focus, title: isTitle && Boolean(subItem) })),
      Boolean(subItem) && canToggle ? tuc('menu-dropdown-toggle') : '',
      Boolean(subItem) && !collapsed && canToggle ? tuc('menu-dropdown-show') : '',
      className,
    ]}
    onclick={(e) => {
      onclick?.(e);
      onMenuItemClickHandler?.(e);
    }}
    {...otherLink}
  >
    {#if iconRender}
      <!-- 渲染自定义图标 -->
      {@render iconRender()}
    {/if}
    {#if iconName}
      <!-- 渲染标准图标组件 -->
      <ShIcon name={iconName} size={menuCommonProps.size} />
    {/if}
    {text ?? ''}
  </a>
{/snippet}

<style></style>
