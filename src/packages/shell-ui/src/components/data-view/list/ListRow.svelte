<script lang="ts" module>
  import type { HTMLLiAttributes, HTMLImgAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import type { Action } from 'svelte/action';
  import type { IconProps, ButtonProps } from '../../index';

  // 图片属性接口（继承img元素属性）
  export interface ListRowImg extends HTMLImgAttributes {}

  // 图标属性接口（继承Icon组件属性）
  export interface ListRowIcon extends IconProps {}

  // 图片/图标配置接口
  export type ListRowPicture = {
    img?: ListRowImg; // 图片配置
    icon?: ListRowIcon; // 图标配置
  };

  // 操作按钮配置接口
  export interface ListRowAction extends ButtonProps<'button'> {
    name?: string; // 动作名
    text?: string; // 按钮文本
    icon?: ListRowIcon; // 按钮图标
    onClickValue?: (name?: string, action?: ListRowAction) => void; // 点击回调
  }

  // 自定义渲染函数类型
  type ListRowContentRender = () => ReturnType<Snippet<[]>>; // 内容渲染
  type ListRowActionRender = (action: ListRowAction) => ReturnType<Snippet<[ListRowAction]>>; // 操作渲染

  // 列表项属性接口（继承li元素属性）
  export interface ListRowProps extends HTMLLiAttributes {
    text?: string; // 主要文本
    description?: string; // 描述文本
    actions?: ListRowAction[]; // 操作按钮列表
    actionRender?: ListRowActionRender; // 自定义操作渲染
    contentRender?: ListRowContentRender; // 自定义内容渲染
    picture?: ListRowPicture; // 图片/图标配置
    onClickValue?: (row: ListRowProps, index: number) => void; // 点击回调
    onRender?: (node: HTMLElement) => void;
  }
</script>

<script lang="ts">
  import { tuc } from '@istock/util';
  import { ShIcon, ShButton } from '../../index';

  const {
    picture, // 图片/图标配置
    text, // 主要文本
    description, // 描述文本
    actions = [], // 操作按钮列表
    contentRender, // 自定义内容渲染函数
    actionRender, // 自定义操作渲染函数
    onRender,
    class: className = '', // 自定义类名
    children, // 子内容
    ...otherProps // 其他原生属性
  }: ListRowProps = $props();

  const render: Action<HTMLElement> = (node: HTMLElement) => {
    onRender?.(node);
  };
</script>

<!-- 列表项容器 -->
<li use:render class={[tuc('list-row'), className]} {...otherProps}>
  {#if text}
    <!-- 图片/图标区域 -->
    {#if picture}
      <div>
        {#if picture.img}
          <img {...picture.img} />
        {/if}
        {#if picture.icon}
          {@const { name, children, ...pictureIconOtherProps } = picture.icon}
          {#if name}
            <ShIcon {name} {...pictureIconOtherProps}></ShIcon>
          {:else}
            <ShIcon {...pictureIconOtherProps}>{@render children?.()}</ShIcon>
          {/if}
        {/if}
      </div>
    {/if}

    <!-- 内容区域 -->
    {#if contentRender}
      <!-- 自定义内容渲染 -->
      {@render contentRender?.()}
    {:else}
      <!-- 默认内容渲染 -->
      <div>
        <div>{text}</div>
        <div class={tuc('text-xs')}>{description}</div>
      </div>
    {/if}

    <!-- 操作按钮区域 -->
    {#each actions as action}
      {#if actionRender}
        <!-- 自定义操作渲染 -->
        {@render actionRender?.(action)}
      {:else}
        <!-- 默认操作按钮渲染 -->
        {@const { name, text, icon, onclick, onClickValue, ...actionOtherProps } = action}
        <ShButton
          shape="square"
          ghost
          onclick={(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => {
            event.stopPropagation(); // 阻止事件冒泡
            onclick?.(event); // 触发按钮点击事件
            onClickValue?.(name, action); // 触发值变更回调
          }}
          {...actionOtherProps}
        >
          <!-- 按钮图标 -->
          {#if icon}
            {@const { name, children, ...actionIconOtherProps } = icon}
            {#if name}
              <ShIcon {name} {...actionIconOtherProps}></ShIcon>
            {:else}
              <ShIcon {...actionIconOtherProps}>{@render children?.()}</ShIcon>
            {/if}
          {/if}
          {text ?? ''}
          <!-- 按钮文本 -->
        </ShButton>
      {/if}
    {/each}
  {:else}
    <!-- 无文本时渲染子内容 -->
    {@render children?.()}
  {/if}
</li>
