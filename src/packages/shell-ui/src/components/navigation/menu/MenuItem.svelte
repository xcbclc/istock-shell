<!--
@component
菜单项组件 - 单个菜单项的完整实现
支持图标、文本、工具提示、子菜单、激活状态、禁用状态等功能
提供两种切换模式：下拉菜单模式和详情展开模式

@example
基础菜单项：
```svelte
<script>
  import { ShMenuItem } from '@istock-shell/shell-ui';

  function handleClick(item, key, collapsed) {
    console.log('菜单项点击:', { item, key, collapsed });
  }
</script>

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
  text="设置"
  iconName="settings"
  tooltip="系统设置"
  disabled={false}
/>
```

带子菜单的菜单项（下拉模式）：
```svelte
<ShMenuItem
  text="产品管理"
  iconName="package"
  toggleType={1}
  canToggle={true}
  subItem={{
    items: [
      { key: 'add-product', text: '添加产品' },
      { key: 'list-products', text: '产品列表' }
    ]
  }}
/>
```

带子菜单的菜单项（详情展开模式）：
```svelte
<ShMenuItem
  text="用户管理"
  toggleType={2}
  subItem={{
    items: [
      { key: 'users', text: '用户列表' },
      { key: 'roles', text: '角色管理' }
    ]
  }}
/>
```

自定义图标渲染：
```svelte
<ShMenuItem
  text="自定义图标"
  iconRender={() => {
    return `<svg>...</svg>`;
  }}
/>
```

标题项（分组标题）：
```svelte
<ShMenuItem
  text="系统管理"
  isTitle={true}
  disabled={true}
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

  // 菜单项属性接口
  export interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
    key?: string; // 菜单项唯一标识，用于激活状态管理
    text?: string; // 菜单项显示文本
    isTitle?: boolean; // 是否为标题项（通常用于分组标题）
    active?: boolean; // 是否处于激活状态
    disabled?: boolean; // 是否禁用状态
    focus?: boolean; // 是否处于聚焦状态
    collapsed?: boolean; // 子菜单是否折叠（双向绑定）
    canToggle?: boolean; // 是否允许切换折叠状态
    itemAttr?: HTMLAnchorAttributes; // 内部链接元素的HTML属性配置
    tooltip?: string | TooltipProps; // 工具提示配置（字符串或完整配置对象）
    toggleType?: 1 | 2; // 切换模式：1-下拉菜单，2-详情展开
    subItem?: MenuProps; // 子菜单配置
    iconName?: string; // 图标名称（使用ShIcon组件）
    onMenuItemClick?: (item: MenuItemProps, key?: string, collapsed?: boolean) => void; // 点击事件回调
    iconRender?: () => ReturnType<Snippet<[]>>; // 自定义图标渲染函数
  }
</script>

<script lang="ts">
  import { getContext } from 'svelte';
  import { tv } from 'tailwind-variants';
  import { tuc, isString } from '@istock-shell/util';

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

  // 从上下文获取菜单通用属性
  const menuCommonProps = getContext<MenuProps>(MENU_COMMON_PROPS);

  /**
   * 获取工具提示属性配置
   * 支持字符串和完整配置对象两种形式
   * @param tooltip 工具提示配置
   * @returns 标准化的工具提示属性对象
   */
  const getTooltipProps = (tooltip: string | TooltipProps): TooltipProps => {
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

<!-- 菜单项容器 -->
<li class={[tuc(menuItemVariants({ disabled, title: isTitle && !Boolean(subItem) })), className]} {...otherProps}>
  {#if children}
    <!-- 渲染自定义子内容插槽 -->
    {@render children()}
  {:else if toggleType === 1 || !Boolean(subItem) || !canToggle}
    {#if tooltip}
      <!-- 带工具提示的菜单项 -->
      <ShTooltip {...getTooltipProps(tooltip)}>
        {@render renderItem()}
      </ShTooltip>
    {:else}
      <!-- 普通菜单项 -->
      {@render renderItem()}
    {/if}
    {#if subItem}
      <!-- 渲染子菜单 -->
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
    <!-- 详情展开模式 - 使用HTML details元素 -->
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
