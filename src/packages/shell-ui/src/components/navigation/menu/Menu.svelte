<!--
@component
ShMenu 菜单组件

一个功能丰富的菜单容器组件，支持多级嵌套、垂直/水平布局、多种尺寸和交互模式。
基于原生 HTML ul 元素构建，提供完整的菜单功能，包括激活状态管理、折叠展开、点击事件处理等。

功能特性：
- 支持多级嵌套菜单结构，无限层级深度
- 提供垂直和水平两种布局模式
- 支持多种尺寸规格（xs, sm, md, lg, xl）
- 内置激活状态管理，确保单选激活
- 支持两种切换模式：下拉菜单和详情展开
- 提供完整的上下文数据共享机制
- 支持自定义内容插槽和数据驱动渲染
- 继承所有原生 ul 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShMenu } from '@istock-shell/shell-ui';

  const menuItems = [
    { key: 'home', text: '首页', iconName: 'home' },
    { key: 'about', text: '关于', iconName: 'info' },
    {
      key: 'products',
      text: '产品管理',
      iconName: 'package',
      subItem: {
        items: [
          { key: 'add-product', text: '添加产品' },
          { key: 'list-products', text: '产品列表' },
          { key: 'categories', text: '分类管理' }
        ]
      }
    },
    {
      key: 'users',
      text: '用户管理',
      iconName: 'users',
      subItem: {
        items: [
          { key: 'user-list', text: '用户列表' },
          { key: 'user-roles', text: '角色管理' }
        ]
      }
    }
  ];

  function handleMenuClick(item) {
    console.log('点击菜单项:', item);
    // 处理路由跳转或其他业务逻辑
  }
</script>

<p>基础垂直菜单</p>
<ShMenu
  items={menuItems}
  layout="vertical"
  size="md"
  onMenuItemClick={handleMenuClick}
/>
```
-->

<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import { MenuVariantConfig } from '../../../theme/config';
  import ShMenuItem, { type MenuItemProps } from './MenuItem.svelte';

  const menuVariantConfig = MenuVariantConfig;

  /**
   * 菜单尺寸类型定义
   * 从主题配置中动态提取支持的尺寸规格
   * @typedef {keyof MenuVariantConfig['variants']['size']} MenuSize
   */
  export type MenuSize = keyof (typeof menuVariantConfig)['variants']['size'];

  /**
   * 菜单布局类型定义
   * 从主题配置中动态提取支持的布局方向
   * @typedef {keyof MenuVariantConfig['variants']['layout']} MenuLayout
   */
  export type MenuLayout = keyof (typeof menuVariantConfig)['variants']['layout'];

  /**
   * 菜单组件属性接口
   * 继承所有原生 ul 元素的 HTML 属性，并扩展菜单特有的功能属性
   * @typedef {HTMLAttributes<HTMLUListElement> & MenuPropsExtension} MenuProps
   */
  export interface MenuProps extends HTMLAttributes<HTMLUListElement> {
    /** 是否为根菜单，用于初始化上下文数据和激活状态管理 @default true */
    isRoot?: boolean;
    /** 菜单是否处于折叠状态，影响子菜单的显示 @default false */
    collapsed?: boolean;
    /** 是否允许切换折叠状态，控制菜单项的交互行为 */
    canToggle?: boolean;
    /** 菜单项数据列表，用于数据驱动渲染菜单结构 @default [] */
    items?: MenuItemProps[];
    /** 菜单布局方向，支持垂直和水平两种模式 @default 'vertical' */
    layout?: MenuLayout;
    /** 菜单尺寸规格，影响菜单项的大小和间距 @default 'md' */
    size?: MenuSize;
    /** 切换类型：1-下拉菜单模式，2-详情展开模式 @default 1 */
    toggleType?: 1 | 2;
    /** 菜单项点击事件回调函数，传递被点击的菜单项数据 */
    onMenuItemClick?: (item: MenuItemProps) => void;
  }

  /**
   * 上下文键定义
   * 用于在组件树中传递共享数据，实现父子组件间的数据通信
   */
  /** 菜单通用属性上下文键，传递尺寸、折叠状态等共享配置 */
  export const MENU_COMMON_PROPS = Symbol('menu.common.props');
  /** 根菜单项列表上下文键，传递完整的菜单数据结构 */
  export const MENU_ROOT_ITEMS = Symbol('menu.root.items');
  /** 根菜单激活状态记录上下文键，管理全局激活状态 */
  export const MENU_ROOT_ACTIVE_RECORD = Symbol('menu.root.active.record');
</script>

<script lang="ts">
  import { setContext, getContext } from 'svelte';
  import { tv } from 'tailwind-variants';
  import { tuc } from '@istock-shell/util';

  const {
    isRoot = true, // 是否为根菜单，默认true（用于初始化上下文）
    collapsed = false, // 菜单折叠状态，默认false（展开状态）
    items = [], // 菜单项数据列表，默认空数组
    layout = 'vertical', // 菜单布局方向，默认垂直布局
    size = 'md', // 菜单尺寸规格，默认中等尺寸
    toggleType = 1, // 切换模式类型，默认下拉菜单模式
    canToggle = true, // 是否允许切换，由父组件传入
    onMenuItemClick, // 菜单项点击事件回调函数
    class: className = '', // 自定义CSS类名（默认空字符串）
    children, // 子内容插槽
    ...otherProps // 其他原生ul元素属性
  }: MenuProps = $props();

  const menuVariants = tv(menuVariantConfig, {});

  // 计算传递给子组件的通用属性
  const commonProps = $derived.by(() => {
    return {
      isRoot: false, // 子菜单项标记为非根菜单
      collapsed, // 传递当前折叠状态
      canToggle, // 传递切换权限
      size, // 传递尺寸配置
    };
  });

  // 根菜单初始化：设置上下文数据，供整个菜单树使用
  if (isRoot) {
    // 创建激活状态记录对象，用于管理全局菜单项激活状态
    const activeRecord: Record<string, boolean> = $state({});
    // 设置上下文数据，供子组件访问
    setContext(MENU_COMMON_PROPS, commonProps); // 传递通用属性配置
    setContext(MENU_ROOT_ITEMS, items); // 传递完整菜单数据结构
    setContext(MENU_ROOT_ACTIVE_RECORD, activeRecord); // 传递激活状态管理对象
  }

  // 从上下文获取根菜单数据（仅在子菜单中有效）
  const rootMenuItems = getContext<MenuItemProps[]>(MENU_ROOT_ITEMS);
  // 获取全局激活状态记录对象
  let rootActiveRecord = getContext<Record<string, boolean>>(MENU_ROOT_ACTIVE_RECORD);
  /**
   * 递归设置菜单项激活状态
   * 确保同一时间只有一个菜单项处于激活状态，实现单选激活机制
   * 遍历整个菜单树结构，包括所有层级的子菜单
   * @param menuItems 菜单项数组，包含当前层级的所有菜单项
   * @param targetItem 目标激活的菜单项对象
   * @param active 是否激活状态，true为激活，false为取消激活
   */
  const setMenuItemsActive = (menuItems: MenuItemProps[], targetItem: MenuItemProps, active: boolean) => {
    menuItems.forEach((menuItem) => {
      if (menuItem === targetItem) {
        // 设置目标菜单项为指定激活状态
        menuItem.active = active;
      } else {
        // 其他菜单项设置为非激活状态，确保单选
        menuItem.active = false;
      }
      // 递归处理子菜单项，确保所有层级都被正确处理
      if (menuItem.subItem?.items?.length) {
        setMenuItemsActive(menuItem.subItem.items, targetItem, active);
      }
    });
  };

  /**
   * 菜单项点击事件处理器
   * 处理激活状态管理、事件传播和业务逻辑调用
   * 只有叶子节点（无子菜单的菜单项）才会触发激活状态变更
   * @param item 被点击的菜单项对象，包含完整的菜单项配置
   * @param key 菜单项的唯一标识符，用于激活状态管理
   */
  const onMenuItemClickHandler = (item: MenuItemProps, key?: string) => {
    // 只有当菜单项有唯一标识且不是父级菜单（无子菜单）时才处理激活状态
    if (key && !item.subItem) {
      // 清除所有现有的激活状态记录，确保单选行为
      Object.keys(rootActiveRecord).forEach((k) => {
        delete rootActiveRecord[k];
      });
      // 在激活记录中标记当前菜单项为激活状态
      rootActiveRecord[key] = true;
      // 递归更新整个菜单树的激活状态显示
      setMenuItemsActive(rootMenuItems, item, true);
    }
    // 调用外部传入的点击回调函数，传递菜单项数据供业务逻辑处理
    onMenuItemClick?.(item);
  };
</script>

<!--
  菜单容器：基于原生ul元素构建
  根菜单应用主题样式，子菜单继承父级样式
  合并自定义类名并透传所有原生ul属性
-->
<ul class={[isRoot ? tuc(menuVariants({ size, layout })) : '', className]} {...otherProps}>
  {#if children}
    <!--
      自定义内容渲染模式
      当传入children插槽时，渲染自定义菜单内容
      适用于需要完全自定义菜单结构的场景
    -->
    {@render children()}
  {:else}
    <!--
      数据驱动渲染模式
      遍历items数组，为每个菜单项数据创建MenuItem组件
      这是标准的菜单渲染方式
    -->
    {#each items as item}
      <!--
        计算菜单项的激活状态
        优先级：全局激活记录 > 菜单项自身的active属性
        确保激活状态的一致性和可控性
      -->
      {@const active =
        Object.keys(rootActiveRecord).length && item.key ? (rootActiveRecord[item.key] ?? false) : item.active}
      <!--
        渲染菜单项组件
        传递折叠状态、切换类型、切换权限等通用配置
        传递点击事件处理器和计算后的激活状态
        展开菜单项的所有其他属性
      -->
      <ShMenuItem {collapsed} {toggleType} {canToggle} onMenuItemClick={onMenuItemClickHandler} {...item} {active} />
    {/each}
  {/if}
</ul>

<style></style>
