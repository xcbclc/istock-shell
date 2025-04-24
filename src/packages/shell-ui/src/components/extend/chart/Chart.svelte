<!--
@component
图表组件，基于@antv/g2实现。支持以下功能：
- 配置图表选项
- 控制图表显示/隐藏
- 自动管理图表实例生命周期
- 响应式更新图表配置

用法示例:
```html
<ShChart
  options={{
    type: 'line',
    data: [
      { year: '2021', value: 3 },
      { year: '2022', value: 4 },
      { year: '2023', value: 5 },
    ],
  }}
/>

<ShChart bind:show={visible} options={chartOptions} />
``` -->
<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { ChartOptions } from '@antv/g2';

  // 组件属性接口（继承div元素属性）
  export interface ChatProps extends HTMLAttributes<HTMLDivElement> {
    options?: ChartOptions; // G2图表配置选项
    show?: boolean; // 控制图表显示/隐藏
  }
</script>

<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { Chart } from '@antv/g2';
  import { tuc } from '@istock/util';

  // 解构props并设置默认值
  const {
    options = {}, // 图表配置选项
    show = true, // 显示状态，默认显示
    class: className = '', // 自定义类名
    ...otherProps // 其他原生属性
  }: ChatProps = $props();

  // 响应式状态
  let containerElement: HTMLElement | undefined = $state(); // 图表容器元素
  let chart: Chart | undefined = $state(); // 图表实例

  // 响应式更新图表配置
  $effect(() => {
    if (chart) {
      chart.options(options); // 更新配置
      void chart.render(); // 重新渲染
    }
  });

  // 响应式控制图表显示/隐藏
  $effect(() => {
    if (chart) {
      show ? chart.show() : chart.hide();
    }
  });

  // 组件挂载时初始化图表
  onMount(async () => {
    await tick();
    chart = new Chart({
      container: containerElement, // 设置容器元素
    });
  });

  // 组件销毁时清理图表实例
  onDestroy(() => {
    chart && chart.destroy();
  });
</script>

<div bind:this={containerElement} class={[tuc('chat'), className]} {...otherProps}></div>
