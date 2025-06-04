<!--
@component
菜单组件 - 支持多级嵌套、垂直/水平布局、多种尺寸和交互模式
提供完整的菜单功能，包括激活状态管理、折叠展开、点击事件处理等

@example
基础用法：
```svelte
<script>
  import { ShMenu } from '@istock-shell/shell-ui';

  const menuItems = [
    { key: 'home', text: '首页', iconName: 'home' },
    { key: 'about', text: '关于', iconName: 'info' },
    {
      key: 'products',
      text: '产品',
      iconName: 'package',
      subItem: {
        items: [
          { key: 'product1', text: '产品1' },
          { key: 'product2', text: '产品2' }
        ]
      }
    }
  ];

  function handleMenuClick(item) {
    console.log('点击菜单项:', item);
  }
</script>

<ShMenu
  items={menuItems}
  layout="vertical"
  size="md"
  onMenuItemClick={handleMenuClick}
/>
```

水平布局示例：
```svelte
<ShMenu
  items={menuItems}
  layout="horizontal"
  size="lg"
  toggleType={2}
/>
```

自定义内容示例：
```svelte
<ShMenu size="sm">
  <ShMenuItem text="自定义菜单项1" iconName="star" />
  <ShMenuItem text="自定义菜单项2" iconName="heart" />
</ShMenu>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { MenuVariantConfig } from '../../../theme/config';
  import ShMenuItem, { type MenuItemProps } from './MenuItem.svelte';

  const menuVariantConfig = MenuVariantConfig;
  // 菜单尺寸类型定义
  export type MenuSize = keyof (typeof menuVariantConfig)['variants']['size'];
  // 菜单布局类型定义
  export type MenuLayout = keyof (typeof menuVariantConfig)['variants']['layout'];

  // 菜单组件属性接口
  export interface MenuProps extends HTMLAttributes<HTMLUListElement> {
    isRoot?: boolean; // 是否为根菜单，用于初始化上下文
    collapsed?: boolean; // 菜单是否折叠状态
    canToggle?: boolean; // 是否允许切换折叠状态
    items?: MenuItemProps[]; // 菜单项列表
    layout?: MenuLayout; // 菜单布局方向（垂直/水平）
    size?: MenuSize; // 菜单尺寸（sm/md/lg等）
    toggleType?: 1 | 2; // 切换类型：1-下拉菜单模式，2-详情展开模式
    onMenuItemClick?: (item: MenuItemProps) => void; // 菜单项点击回调函数
  }

  // 上下文键定义 - 用于在组件树中传递共享数据
  export const MENU_COMMON_PROPS = Symbol('menu.common.props'); // 菜单通用属性上下文键
  export const MENU_ROOT_ITEMS = Symbol('menu.root.items'); // 根菜单项列表上下文键
  export const MENU_ROOT_ACTIVE_RECORD = Symbol('menu.root.active.record'); // 根菜单激活状态记录上下文键
</script>

<script lang="ts">
  import { setContext, getContext } from 'svelte';
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  const {
    isRoot = true, // 默认为根菜单
    collapsed = false, // 默认展开状态
    items = [], // 菜单项列表，默认为空数组
    layout = 'vertical', // 菜单布局方向，默认垂直
    size = 'md', // 菜单尺寸，默认中等
    toggleType = 1, // 切换类型，由父组件决定
    canToggle, // 是否可切换，由父组件决定
    onMenuItemClick, // 菜单项点击回调
    class: className = '', // 自定义CSS类名
    children, // 子内容插槽
    ...otherProps // 其他HTML原生属性
  }: MenuProps = $props();

  const menuVariants = tv(menuVariantConfig, {});
  const commonProps = $derived.by(() => {
    return {
      isRoot: false, // 子菜单项标记为非根菜单
      collapsed,
      canToggle,
      size,
    };
  });

  // 如果是根菜单，初始化上下文数据
  if (isRoot) {
    // 创建激活状态记录对象
    const activeRecord: Record<string, boolean> = $state({});
    // 设置上下文，供子组件使用
    setContext(MENU_COMMON_PROPS, commonProps);
    setContext(MENU_ROOT_ITEMS, items);
    setContext(MENU_ROOT_ACTIVE_RECORD, activeRecord);
  }

  // 从上下文获取根菜单数据（仅在子菜单中有效）
  const rootMenuItems = getContext<MenuItemProps[]>(MENU_ROOT_ITEMS);
  let rootActiveRecord = getContext<Record<string, boolean>>(MENU_ROOT_ACTIVE_RECORD);
  /**
   * 递归设置菜单项激活状态
   * 确保同一时间只有一个菜单项处于激活状态
   * @param menuItems 菜单项数组
   * @param targetItem 目标激活的菜单项
   * @param active 是否激活
   */
  const setMenuItemsActive = (menuItems: MenuItemProps[], targetItem: MenuItemProps, active: boolean) => {
    menuItems.forEach((menuItem) => {
      if (menuItem === targetItem) {
        // 设置目标菜单项为指定状态
        menuItem.active = active;
      } else {
        // 其他菜单项设置为非激活状态
        menuItem.active = false;
      }
      // 递归处理子菜单项
      if (menuItem.subItem?.items?.length) {
        setMenuItemsActive(menuItem.subItem.items, targetItem, active);
      }
    });
  };

  /**
   * 菜单项点击事件处理器
   * 处理激活状态管理和事件传播
   * @param item 被点击的菜单项
   * @param key 菜单项的唯一标识
   */
  const onMenuItemClickHandler = (item: MenuItemProps, key?: string) => {
    // 只有当菜单项有key且不是子菜单时才处理激活状态
    if (key && !item.subItem) {
      // 清除所有激活状态记录
      Object.keys(rootActiveRecord).forEach((k) => {
        delete rootActiveRecord[k];
      });
      // 设置当前菜单项为激活状态
      rootActiveRecord[key] = true;
      // 递归更新所有菜单项的激活状态
      setMenuItemsActive(rootMenuItems, item, true);
    }
    // 调用外部传入的点击回调
    onMenuItemClick?.(item);
  };
</script>

<!-- 菜单容器 -->
<ul class={[isRoot ? tuc(menuVariants({ size, layout })) : '', className]} {...otherProps}>
  {#if children}
    <!-- 渲染自定义子内容插槽 -->
    {@render children()}
  {:else}
    <!-- 渲染菜单项列表 -->
    {#each items as item}
      <!-- 计算菜单项的激活状态：优先使用全局激活记录，其次使用菜单项自身的active属性 -->
      {@const active =
        Object.keys(rootActiveRecord).length && item.key ? (rootActiveRecord[item.key] ?? false) : item.active}
      <ShMenuItem {collapsed} {toggleType} {canToggle} onMenuItemClick={onMenuItemClickHandler} {...item} {active} />
    {/each}
  {/if}
</ul>

<style></style>
