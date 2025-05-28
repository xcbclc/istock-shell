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
  import { tuc } from '@istock-shell/util';

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
  let isInViewport: boolean = $state(false); // 是否在视区内

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
      // 只有当show为true且元素在视区内时才显示图表
      show && isInViewport ? chart.show() : chart.hide();
    }
  });

  // 创建交叉观察器实例
  let observer: IntersectionObserver | undefined;

  // 组件挂载时初始化图表和交叉观察器
  onMount(async () => {
    await tick();

    // 创建交叉观察器
    observer = new IntersectionObserver(
      (entries) => {
        // 更新元素是否在视区内的状态
        isInViewport = entries[0].isIntersecting;
        if (!chart) {
          // 初始化图表
          chart = new Chart({
            container: containerElement, // 设置容器元素
          });
        }
      },
      {
        threshold: 0.15, // 当10%的元素可见时触发回调
      }
    );

    // 开始观察容器元素
    if (containerElement) {
      observer.observe(containerElement);
    }
  });

  // 组件销毁时清理图表实例和交叉观察器
  onDestroy(() => {
    // 清理图表实例
    chart && chart.destroy();

    // 断开交叉观察器
    if (observer && containerElement) {
      observer.unobserve(containerElement);
      observer.disconnect();
    }
  });
</script>

<div
  bind:this={containerElement}
  class={[tuc(['chat', isInViewport ? 'visible' : 'invisible']), className]}
  {...otherProps}
></div>
