<!--
@component
ShChart 图表组件

一个基于 @antv/g2 的图表组件，支持多种图表类型和交互功能。
提供完整的生命周期管理、响应式更新和性能优化支持。

功能特性：
- 支持 @antv/g2 的所有图表类型和配置选项
- 提供图表显示/隐藏控制功能
- 自动管理图表实例的创建和销毁
- 响应式更新图表配置和数据
- 基于 IntersectionObserver 的性能优化
- 支持自定义容器样式和属性
- 继承所有原生 div 元素的属性和事件
- 完整的 TypeScript 类型安全

示例用法：
```svelte
<script lang="ts">
  import { ShChart } from '@istock-shell/ui';

  const lineChartOptions = {
    type: 'line',
    data: [
      { year: '2021', value: 3 },
      { year: '2022', value: 4 },
      { year: '2023', value: 5 },
    ],
    encode: { x: 'year', y: 'value' }
  };

  let chartVisible = true;
</script>

<p>基础折线图</p>
<ShChart options={lineChartOptions} />

<p>自定义样式的图表</p>
<ShChart
  options={lineChartOptions}
  class="custom-chart"
  style="height: 400px;"
/>
```
-->
<script lang="ts" module>
  import type { HTMLAttributes } from 'svelte/elements';
  import type { Chart, ChartOptions } from '@antv/g2';

  /**
   * 图表组件属性接口
   * 继承所有原生 div 元素的 HTML 属性，并扩展图表特有的功能属性
   * @typedef {HTMLAttributes<HTMLDivElement> & ChartPropsExtension} ChartProps
   */
  export interface ChartProps extends HTMLAttributes<HTMLDivElement> {
    /** 图表配置选项，支持 @antv/g2 的所有配置参数 */
    options?: ChartOptions;
    /** 内容被加载 **/
    onContentLoaded?: (success: Boolean) => void;
  }

  let AntVChart: typeof Chart | undefined;
</script>

<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';

  import { tuc } from '@istock-shell/util';

  // 解构props并设置默认值
  const {
    options = {}, // 图表配置选项，默认为空对象
    class: className = '', // 自定义CSS类名（默认空字符串）
    onContentLoaded, // 内容被加载
    ...otherProps // 其他原生div元素属性
  }: ChartProps = $props();

  // 响应式状态变量
  let containerElement: HTMLElement | undefined; // 图表容器DOM元素引用
  let chart: Chart | undefined; // @antv/g2 图表实例
  let hasChartInstance = $state(false); // 是否有图表实例
  let isInViewport: boolean = $state(false); // 容器元素是否在视口内的状态

  /**
   * 响应式更新图表配置
   * 当 options 属性发生变化时，自动更新图表配置并重新渲染
   * 确保图表始终反映最新的配置状态
   */
  $effect(() => {
    if (hasChartInstance) {
      try {
        chart?.options(options); // 更新图表配置选项
        void chart?.render(); // 重新渲染图表以应用新配置
      } catch (error) {
        console.error('Failed to update chart options:', error);
      }
    }
  });

  /**
   * 响应式控制图表显示/隐藏状态
   * 只有当图表需要显示且在视口内时才真正显示图表
   */
  $effect(() => {
    if (hasChartInstance) {
      isInViewport ? chart?.show() : chart?.hide();
    }
  });

  // 交叉观察器实例，用于监听容器元素的视口可见性
  let observer: IntersectionObserver | undefined;
  /**
   * 组件挂载时的初始化逻辑
   * 设置交叉观察器来监听容器的视口可见性，实现性能优化
   * 只有当容器进入视口时才创建图表实例
   */
  onMount(async () => {
    await tick(); // 等待DOM更新完成
    try {
      if (!AntVChart) {
        AntVChart = (await import('@antv/g2')).Chart;
      }
      // 创建交叉观察器实例，用于监听容器元素的视口可见性
      observer = new IntersectionObserver(
        (entries) => {
          if (!chart && AntVChart) {
            // 延迟创建图表实例，只有当容器首次进入视口时才创建
            chart = new AntVChart({
              container: containerElement, // 指定图表渲染的容器元素
            });
            hasChartInstance = true;
          }
          // 更新容器元素是否在视口内的状态
          isInViewport = entries[0].isIntersecting;
        },
        {
          rootMargin: '500px', // 当离视口相距500px就触发交叉回调
          threshold: 0.0,
        }
      );

      // 开始观察容器元素的视口可见性变化
      if (containerElement) {
        observer.observe(containerElement);
      }
      await tick(); // 等待图表更新后触发
      onContentLoaded?.(true);
    } catch (e) {
      onContentLoaded?.(false);
      throw e;
    }
  });

  /**
   * 组件销毁时的清理逻辑
   * 确保正确释放图表实例和交叉观察器资源，避免内存泄漏
   */
  onDestroy(() => {
    // 销毁图表实例，释放相关资源和事件监听器
    chart && chart.destroy();

    // 清理交叉观察器，停止监听并断开连接
    if (observer && containerElement) {
      observer.unobserve(containerElement); // 停止观察特定元素
      observer.disconnect(); // 断开观察器连接，释放资源
    }
  });
</script>

<!-- 图表容器：绑定DOM元素引用，应用样式类和可见性状态，透传所有原生div属性 -->
<div
  bind:this={containerElement}
  class={[tuc(['chat', isInViewport ? 'visible' : 'invisible']), className]}
  {...otherProps}
></div>
