<!--
@component
ShListRow 列表项组件

一个功能丰富的列表项组件，支持图片/图标展示、操作按钮、自定义内容渲染等功能。
基于原生 HTML li 元素构建，提供完整的类型安全和响应式支持。

功能特性：
- 支持图片和图标展示，可单独或组合使用
- 提供操作按钮列表，支持自定义按钮样式和事件
- 支持自定义内容和操作按钮渲染函数
- 内置文本和描述信息显示
- 支持点击事件和自定义回调函数
- 继承所有原生 li 元素的属性和事件
- 完整的 TypeScript 类型安全
- 响应式设计支持

示例用法：
```svelte
<script lang="ts">
  import { ShListRow } from '@istock-shell/ui';

  const actions = [
    { name: 'edit', text: '编辑', icon: { name: 'edit' } },
    { name: 'delete', text: '删除', icon: { name: 'delete' } }
  ];

  function handleRowClick(row, index) {
    console.log('点击了列表项:', row.text);
  }

  function handleActionClick(name, action) {
    console.log('点击了操作按钮:', name);
  }
</script>

<p>基础列表项</p>
<ShListRow text="列表项标题" description="列表项描述" />

<p>带图标的列表项</p>
<ShListRow
  text="用户信息"
  description="管理员用户"
  picture={{ icon: { name: 'user' } }}
/>

<p>带操作按钮的列表项</p>
<ShListRow
  text="文档标题"
  description="文档描述信息"
  actions={actions.map(action => ({
    ...action,
    onClickValue: handleActionClick
  }))}
  onClickValue={handleRowClick}
/>

<p>自定义内容列表项</p>
<ShListRow
  contentRender={() => (
    <div>
      <h3>自定义标题</h3>
      <p>自定义内容区域</p>
    </div>
  )}
/>
```
-->
<script lang="ts" module>
  import type { HTMLLiAttributes, HTMLImgAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { Action } from 'svelte/action';
  import type { IconProps, ButtonProps } from '../../index';

  /**
   * 图片属性接口
   * 继承所有原生 img 元素的 HTML 属性
   * @typedef {HTMLImgAttributes} ListRowImg
   */
  export interface ListRowImg extends HTMLImgAttributes {}

  /**
   * 图标属性接口
   * 继承 Icon 组件的所有属性
   * @typedef {IconProps} ListRowIcon
   */
  export interface ListRowIcon extends IconProps {}

  /**
   * 图片/图标配置接口
   * 用于配置列表项的视觉元素展示
   * @typedef ListRowPicture
   */
  export type ListRowPicture = {
    /** 图片配置，用于显示图片元素 */
    img?: ListRowImg; // 图片配置
    /** 图标配置，用于显示图标元素 */
    icon?: ListRowIcon; // 图标配置
  };

  /**
   * 操作按钮配置接口
   * 继承 Button 组件的所有属性，并扩展列表项特有的操作功能
   * @typedef {ButtonProps<'button'> & ListRowActionExtension} ListRowAction
   */
  export interface ListRowAction extends ButtonProps<'button'> {
    /** 操作名称，用于标识不同的操作类型 */
    name?: string; // 动作名
    /** 按钮显示文本 */
    text?: string; // 按钮文本
    /** 按钮图标配置 */
    icon?: ListRowIcon; // 按钮图标
    /** 点击回调函数，传递操作名称和操作配置 */
    onClickValue?: (name?: string, action?: ListRowAction) => void; // 点击回调
  }

  /**
   * 自定义渲染函数类型定义
   */
  /** 内容渲染函数类型，用于自定义列表项内容区域 */
  type ListRowContentRender = () => ReturnType<Snippet<[]>>; // 内容渲染
  /** 操作渲染函数类型，用于自定义操作按钮区域 */
  type ListRowActionRender = (action: ListRowAction) => ReturnType<Snippet<[ListRowAction]>>; // 操作渲染

  /**
   * 列表项组件属性接口
   * 继承所有原生 li 元素的 HTML 属性，并扩展列表项特有的功能属性
   * @typedef {HTMLLiAttributes & ListRowPropsExtension} ListRowProps
   */
  export interface ListRowProps extends HTMLLiAttributes {
    /** 主要文本内容 */
    text?: string; // 主要文本
    /** 描述文本信息 */
    description?: string; // 描述文本
    /** 操作按钮列表配置 */
    actions?: ListRowAction[]; // 操作按钮列表
    /** 自定义操作按钮渲染函数 */
    actionRender?: ListRowActionRender; // 自定义操作渲染
    /** 自定义内容渲染函数 */
    contentRender?: ListRowContentRender; // 自定义内容渲染
    /** 图片/图标配置 */
    picture?: ListRowPicture; // 图片/图标配置
    /** 列表项点击回调函数，传递行数据和索引 */
    onClickValue?: (row: ListRowProps, index: number) => void; // 点击回调
    /** 元素渲染完成回调函数 */
    onRender?: (node: HTMLElement) => void;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock-shell/util';
  import { ShIcon, ShButton } from '../../index';

  const {
    picture, // 图片/图标配置对象
    text, // 主要文本内容
    description, // 描述文本信息
    actions = [], // 操作按钮列表（默认空数组）
    contentRender, // 自定义内容渲染函数
    actionRender, // 自定义操作按钮渲染函数
    onRender, // 元素渲染完成回调
    class: className = '', // 自定义CSS类名（默认空字符串）
    children, // 子内容插槽
    ...otherProps // 其他原生li元素属性
  }: ListRowProps = $props();

  // 创建渲染动作，用于元素渲染完成后的回调处理
  const render: Action<HTMLElement> = (node: HTMLElement) => {
    onRender?.(node); // 调用渲染完成回调函数
  };
</script>

<!-- 列表项容器：基于原生li元素，应用渲染动作，合并默认样式类和自定义类名，透传所有原生属性 -->
<li use:render class={[tuc('list-row'), className]} {...otherProps}>
  {#if text}
    <!-- 图片/图标展示区域：当配置了picture时显示视觉元素 -->
    {#if picture}
      <div>
        {#if picture.img}
          <!-- 图片元素：透传所有图片属性 -->
          <img {...picture.img} />
        {/if}
        {#if picture.icon}
          <!-- 图标元素：支持命名图标和自定义内容图标 -->
          {@const { name, children, ...pictureIconOtherProps } = picture.icon}
          {#if name}
            <!-- 命名图标：使用name属性指定图标 -->
            <ShIcon {name} {...pictureIconOtherProps}></ShIcon>
          {:else}
            <!-- 自定义图标：使用children插槽内容 -->
            <ShIcon {...pictureIconOtherProps}>{@render children?.()}</ShIcon>
          {/if}
        {/if}
      </div>
    {/if}

    <!-- 主要内容区域：显示文本信息或自定义内容 -->
    {#if contentRender}
      <!-- 自定义内容渲染：使用contentRender函数渲染自定义内容 -->
      {@render contentRender?.()}
    {:else}
      <!-- 默认内容渲染：显示主要文本和描述信息 -->
      <div>
        <!-- 主要文本：列表项的标题或主要信息 -->
        <div>{text}</div>
        <!-- 描述文本：列表项的补充说明信息，使用小号字体 -->
        <div class={tuc('text-xs')}>{description}</div>
      </div>
    {/if}

    <!-- 操作按钮区域：遍历actions数组，为每个操作创建按钮 -->
    {#each actions as action}
      {#if actionRender}
        <!-- 自定义操作渲染：使用actionRender函数渲染自定义操作按钮 -->
        {@render actionRender?.(action)}
      {:else}
        <!-- 默认操作按钮渲染：创建标准的操作按钮 -->
        {@const { name, text, icon, onclick, onClickValue, ...actionOtherProps } = action}
        <ShButton
          shape="square"
          ghost
          onclick={(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => {
            event.stopPropagation(); // 阻止事件冒泡，避免触发列表项点击事件
            onclick?.(event); // 触发按钮原始点击事件处理函数
            onClickValue?.(name, action); // 触发值变更回调，传递操作名称和操作配置
          }}
          {...actionOtherProps}
        >
          <!-- 操作按钮图标：当配置了icon时显示图标 -->
          {#if icon}
            {@const { name, children, ...actionIconOtherProps } = icon}
            {#if name}
              <!-- 命名图标：使用name属性指定图标 -->
              <ShIcon {name} {...actionIconOtherProps}></ShIcon>
            {:else}
              <!-- 自定义图标：使用children插槽内容 -->
              <ShIcon {...actionIconOtherProps}>{@render children?.()}</ShIcon>
            {/if}
          {/if}
          <!-- 操作按钮文本：显示按钮文本，如果没有则显示空字符串 -->
          {text ?? ''}
        </ShButton>
      {/if}
    {/each}
  {:else}
    <!-- 自定义子内容渲染：当没有text时，渲染子内容插槽 -->
    {@render children?.()}
  {/if}
</li>
