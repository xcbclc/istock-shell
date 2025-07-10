/**
 * @fileoverview 虚拟列表核心引擎
 * @description 虚拟滚动核心实现，支持动态高度、滚动补偿和性能优化
 * @author IStock Shell Team
 * @version 0.1.1
 * @features
 * - 动态高度自适应
 * - 滚动补偿机制
 * - 性能监控与优化
 * - 增量更新机制
 * - 智能缓存策略
 */

import { SizeCacheManager } from './size-cache';
import { ViewportAnchorManager } from './viewport-anchor';
import { ScrollProcessor } from './scroll-processor';
import { RangeCalculator } from './range-calculator';
import { PerformanceMonitor } from './performance-monitor';
import type {
  VirtualCoreOptions,
  VirtualRange,
  RangeUpdateCallback,
  ScrollToTopCallback,
  ScrollToBottomCallback,
} from './types';

/**
 * @class VirtualCore
 * @description 虚拟列表核心引擎，提供高性能虚拟滚动实现
 *
 * 基于视窗锚定和尺寸缓存的虚拟滚动实现，
 * 支持动态高度自适应、滚动补偿和性能优化
 *
 * @features
 * - 高性能渲染：支持大数据量列表
 * - 动态高度：实时适应内容变化
 * - 智能缓冲：基于滚动速度调整
 * - 滚动补偿：保持用户视野稳定
 * - 性能监控：基础性能统计
 *
 * @algorithm
 * - 时间复杂度：O(log n) 查找，O(1) 更新
 * - 空间复杂度：O(n) 缓存存储
 * - 渲染复杂度：O(k) k为可视元素数量
 *
 * @example
 * ```typescript
 * const virtualCore = new VirtualCore(
 *   {
 *     keeps: 30,
 *     estimateSize: 50,
 *     totalCount: 10000
 *   },
 *   (range) => console.log('Range updated:', range),
 *   () => console.log('Scroll to top'),
 *   () => console.log('Scroll to bottom')
 * );
 * ```
 */
export class VirtualCore {
  /** 虚拟列表配置选项 */
  private options: VirtualCoreOptions;
  /** 尺寸缓存管理器 - 负责元素高度的缓存和计算 */
  private sizeCache: SizeCacheManager;
  /** 视窗锚定管理器 - 负责滚动过程中的位置锚定 */
  private anchorManager: ViewportAnchorManager;
  /** 当前渲染范围状态 */
  private currentRange: VirtualRange;
  /** 记录最后一次范围状态值，方便对比 */
  private lastRange!: VirtualRange;
  /** 模块化组件 */
  private scrollProcessor: ScrollProcessor;
  private rangeCalculator: RangeCalculator;
  private performanceMonitor: PerformanceMonitor;

  /** 滚动处理状态 */
  private scrollElement: HTMLElement | null = null;

  /** 节流相关状态 */
  private rangeRafId: number | null = null;

  /**
   * @constructor
   * @description 创建虚拟列表核心引擎实例
   *
   * @param {VirtualCoreOptions} options - 虚拟列表配置选项
   * @param {RangeUpdateCallback} onRangeUpdate - 范围更新回调函数
   * @param {ScrollToTopCallback} [onScrollToTop] - 滚动到顶部回调函数（可选）
   * @param {ScrollToBottomCallback} [onScrollToBottom] - 滚动到底部回调函数（可选）
   * ```
   */
  constructor(
    options: VirtualCoreOptions,
    private onRangeUpdate: RangeUpdateCallback,
    private onScrollToTop?: ScrollToTopCallback,
    private onScrollToBottom?: ScrollToBottomCallback
  ) {
    this.options = {
      thresholdTop: 0,
      thresholdBottom: 0,
      ...options,
    };
    this.sizeCache = new SizeCacheManager(options.estimateSize);
    this.sizeCache.setTotalCount(options.totalCount);
    this.anchorManager = new ViewportAnchorManager();

    // 初始化模块化组件
    this.scrollProcessor = new ScrollProcessor(
      this.options,
      this.onScrollToTop,
      this.onScrollToBottom
    );
    this.rangeCalculator = new RangeCalculator(this.options);
    this.performanceMonitor = new PerformanceMonitor();

    // 设置性能监控器到各个组件
    this.scrollProcessor.setPerformanceMonitor(this.performanceMonitor);
    this.rangeCalculator = new RangeCalculator(this.options, this.performanceMonitor);
    this.sizeCache.setPerformanceMonitor(this.performanceMonitor);

    // 设置ScrollProcessor的回调函数
    this.scrollProcessor.setScrollProcessCallback((scrollTop, viewportHeight) => {
      this.processScrollInternal(scrollTop, viewportHeight);
    });

    this.currentRange = {
      start: 0,
      end: Math.min(options.keeps - 1, Math.max(0, options.totalCount - 1)),
      paddingTop: 0,
      paddingBottom: 0,
      totalHeight: 0,
    };
    this.updateRange();
  }

  /**
   * @private
   * @method updateRange
   * @description 触发范围更新，将当前计算的渲染范围通过回调函数通知给外部组件
   */
  private updateRange(): void {
    if (this.rangeRafId) cancelAnimationFrame(this.rangeRafId);
    requestAnimationFrame(() => {
      this.executeRangeUpdate();
    });
  }

  /**
   * 检查范围是否发生变化
   */
  private hasRangeChanged(newRange: VirtualRange, lastRange: VirtualRange): boolean {
    return (
      newRange.start !== lastRange.start ||
      newRange.end !== lastRange.end ||
      Math.abs(newRange.paddingTop - lastRange.paddingTop) > 1 ||
      Math.abs(newRange.paddingBottom - lastRange.paddingBottom) > 1
    );
  }

  /**
   * @private
   * @method executeRangeUpdate
   * @description 执行实际的范围更新操作
   */
  private executeRangeUpdate(): void {
    const range: VirtualRange = {
      ...this.currentRange,
      totalHeight: Math.round(this.currentRange.totalHeight * 1000) / 1000,
      paddingTop: Math.round(this.currentRange.paddingTop * 1000) / 1000,
      paddingBottom: Math.round(this.currentRange.paddingBottom * 1000) / 1000,
    };
    if (!this.lastRange || this.hasRangeChanged(range, this.lastRange)) {
      // 更新渲染指标
      const renderedCount = range.end - range.start + 1;
      this.performanceMonitor.updateRenderMetrics(renderedCount, this.options.totalCount);

      this.onRangeUpdate(range);
    }
    this.lastRange = range;
  }

  /**
   * @public
   * @method getRange
   * @description 获取当前渲染范围的副本
   *
   * @returns {VirtualRange} 当前渲染范围信息的副本
   */
  getRange(): VirtualRange {
    return { ...this.currentRange };
  }

  /**
   * @public
   * @method getScrollDirection
   * @description 获取当前滚动方向
   *
   * @returns {'up' | 'down' | 'none'} 滚动方向
   */
  getScrollDirection(): 'up' | 'down' | 'none' {
    return this.scrollProcessor.getScrollDirection();
  }

  /**
   * 设置滚动容器元素
   * @param {HTMLElement} element - 滚动容器DOM元素
   *
   * @description 设置虚拟列表的滚动容器元素引用，用于后续的滚动事件监听和位置计算
   */
  setScrollElement(element: HTMLElement): void {
    this.scrollElement = element;
    this.scrollProcessor.setScrollElement(element);
  }

  /**
   * @public
   * @method scrollToBottom
   * @description 将虚拟列表滚动到最底部位置
   */
  scrollToBottom(): void {
    if (!this.scrollElement) return;

    // 使用双重RAF确保DOM完全更新后再滚动
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!this.scrollElement) return;

        // 获取最新的滚动高度和客户端高度
        const scrollHeight = this.scrollElement.scrollHeight;

        // 确保滚动到最底部
        this.scrollElement.scrollTop = scrollHeight + 100; // 添加额外偏移确保到底
      });
    });
  }

  /**
   * @public
   * @method handleScroll
   * @description 处理滚动事件的主入口方法
   *
   * @param {number} scrollTop - 当前滚动位置（像素）
   * @param {number} viewportHeight - 视窗高度（像素）
   */
  handleScroll(scrollTop: number, viewportHeight: number): void {
    // 微小滚动过滤：避免不必要的计算
    const scrollDelta = Math.abs(scrollTop - (this.lastScrollTop || 0));
    if (scrollDelta < 0.5) return;

    // 委托给ScrollProcessor处理
    this.scrollProcessor.handleScroll(scrollTop, viewportHeight);

    // 记录最后滚动位置
    this.lastScrollTop = scrollTop;
  }

  /** 最后滚动位置记录 */
  private lastScrollTop: number = 0;

  /**
   * @private
   * @method processScrollInternal
   * @description 内部滚动处理逻辑，委托给核心处理方法
   *
   * @param {number} scrollTop - 当前滚动位置
   * @param {number} viewportHeight - 视窗高度
   */
  private processScrollInternal(scrollTop: number, viewportHeight: number): void {
    this.processScrollCore(scrollTop, viewportHeight);
  }

  /**
   * @private
   * @method processScrollCore
   * @description 核心滚动处理逻辑，计算渲染范围和更新视窗状态
   *
   * @param {number} scrollTop - 当前滚动位置
   * @param {number} viewportHeight - 视窗高度
   */
  private processScrollCore(scrollTop: number, viewportHeight: number): void {
    // 处理空列表的边界情况
    if (this.options.totalCount === 0) {
      // 空列表时只显示头部和底部区域
      this.currentRange = {
        start: 0,
        end: 0,
        paddingTop: this.options.headerSize,
        paddingBottom: this.options.footerSize,
        totalHeight: this.options.headerSize + this.options.footerSize,
      };
      this.updateRange();
      return;
    }

    // 委托给范围计算器进行复杂的渲染范围计算
    // 这里整合了锚点管理、尺寸缓存等多个模块的数据
    this.currentRange = this.rangeCalculator.calculateRange(
      scrollTop,
      viewportHeight,
      this.sizeCache,
      this.anchorManager
    );
    // 触发范围更新，通知外部组件重新渲染
    this.updateRange();
  }

  /**
   * @public
   * @method updateOptions
   * @description 更新虚拟列表配置选项，支持部分更新
   *
   * @param {Partial<VirtualCoreOptions>} newOptions - 新的配置选项（部分更新）
   */
  updateOptions(newOptions: Partial<VirtualCoreOptions>): void {
    const oldTotalCount = this.options.totalCount;
    this.options = { ...this.options, ...newOptions };

    // 更新各个模块的配置
    this.rangeCalculator.updateOptions(this.options);

    if (newOptions.totalCount !== undefined && newOptions.totalCount !== oldTotalCount) {
      this.sizeCache.setTotalCount(newOptions.totalCount);

      if (this.options.totalCount === 0) {
        this.currentRange.start = 0;
        this.currentRange.end = 0;
      } else {
        this.currentRange.start = Math.min(this.currentRange.start, this.options.totalCount - 1);
        this.currentRange.end = Math.min(this.currentRange.end, this.options.totalCount - 1);
        if (this.currentRange.end < this.currentRange.start) {
          this.currentRange.end = this.currentRange.start;
        }
      }
      const totalHeight =
        this.sizeCache.getTotalHeight() + this.options.headerSize + this.options.footerSize;
      this.currentRange.totalHeight = totalHeight;
      this.updateRange();
    }
  }

  /**
   * @public
   * @method updateItemSize
   * @description 动态更新虚拟列表中指定元素的尺寸
   *
   * @param {number} index - 项目索引
   * @param {number} size - 新的尺寸值（通常是高度，单位：像素）
   * @param {HTMLElement} scrollElement - 滚动容器元素
   */
  updateItemSize(index: number, size: number, scrollElement: HTMLElement): void {
    // 边界检查：确保索引在有效范围内
    if (index < 0 || index >= this.options.totalCount) {
      console.warn(`Invalid index ${index} for updateItemSize`);
      return;
    }

    // 获取旧尺寸并计算变化量
    const oldSize = this.sizeCache.getItemHeight(index);
    const delta = size - oldSize;

    // 微小变化过滤：避免不必要的更新操作
    if (Math.abs(delta) < 0.1) {
      return;
    }

    // 步骤1：更新尺寸缓存，这是所有后续计算的基础
    this.sizeCache.updateSize(index, size);

    // 步骤2：智能滚动补偿判断
    // 只有当变化的元素在当前渲染范围内或附近时才需要补偿
    const isInCurrentRange = index >= this.currentRange.start && index <= this.currentRange.end;
    const isSignificantChange = Math.abs(delta) > 1;

    if (isSignificantChange && (isInCurrentRange || this.shouldCompensateScroll(index, delta))) {
      // 注释：滚动补偿功能暂时禁用，避免滚动抖动
      // this.anchorManager.compensateScroll(index, delta, scrollElement);
    }

    // 步骤3：智能范围重计算
    // 只有当变化影响到当前可视区域时才重新计算渲染范围
    if (this.shouldRecalculateRange(index, delta)) {
      this.scheduleRangeUpdate(scrollElement);
    }
  }

  /**
   * 批量更新项目尺寸
   * @param updates - 尺寸更新数组
   * @param scrollElement - 滚动容器元素
   */
  updateItemSizes(
    updates: Array<{ index: number; size: number }>,
    scrollElement: HTMLElement
  ): void {
    let hasSignificantChanges = false;
    let affectedRange = { min: Infinity, max: -1 };

    // 批量更新尺寸
    for (const { index, size } of updates) {
      if (index < 0 || index >= this.options.totalCount) continue;

      const oldSize = this.sizeCache.getItemHeight(index);
      const delta = Math.abs(size - oldSize);

      if (delta > 0.1) {
        this.sizeCache.updateSize(index, size);

        if (delta > 1) {
          hasSignificantChanges = true;
          affectedRange.min = Math.min(affectedRange.min, index);
          affectedRange.max = Math.max(affectedRange.max, index);
        }
      }
    }

    // 智能重计算
    if (hasSignificantChanges && this.isRangeAffected(affectedRange)) {
      this.scheduleRangeUpdate(scrollElement);
    }
  }

  /**
   * 判断是否需要滚动补偿
   * @private
   */
  private shouldCompensateScroll(index: number, delta: number): boolean {
    // 定义缓冲区大小，用于判断元素是否接近当前渲染范围
    const bufferSize = 5;
    // 检查变化的元素是否在当前渲染范围附近
    const nearCurrentRange =
      index >= this.currentRange.start - bufferSize && index <= this.currentRange.end + bufferSize;
    // 只有在范围附近且尺寸变化较大时才需要滚动补偿
    return nearCurrentRange && Math.abs(delta) > 5;
  }

  /**
   * 判断是否需要重新计算范围
   * @private
   */
  private shouldRecalculateRange(index: number, delta: number): boolean {
    // 检查元素是否在当前视窗内
    const isInViewport = index >= this.currentRange.start && index <= this.currentRange.end;
    // 检查元素是否在视窗附近
    const isNearViewport =
      index >= this.currentRange.start - 10 && index <= this.currentRange.end + 10;
    // 判断是否为大幅度尺寸变化
    const isLargeChange = Math.abs(delta) > 20;

    // 视窗内的变化或附近的大变化都需要重新计算范围
    return isInViewport || (isNearViewport && isLargeChange);
  }

  /**
   * 检查范围是否受影响
   * @private
   */
  private isRangeAffected(affectedRange: { min: number; max: number }): boolean {
    // 如果受影响的范围与当前渲染范围有重叠或接近，则认为受影响
    // 使用20个元素的缓冲区来判断是否需要更新
    return !(
      affectedRange.min > this.currentRange.end + 20 ||
      affectedRange.max < this.currentRange.start - 20
    );
  }

  /**
   * 调度范围更新
   * @private
   */
  private scheduleRangeUpdate(scrollElement: HTMLElement): void {
    // 防止重复调度，避免不必要的计算
    if (this.rangeUpdateScheduled) return;

    // 标记调度状态
    this.rangeUpdateScheduled = true;
    // 使用RAF确保更新在下一帧执行，不阻塞当前操作
    requestAnimationFrame(() => {
      // 重置调度状态
      this.rangeUpdateScheduled = false;

      // 确保元素存在且实例未被销毁
      if (scrollElement && !this.isDestroyed) {
        // 获取当前滚动状态
        const scrollTop = scrollElement.scrollTop;
        const viewportHeight = scrollElement.clientHeight;

        // 重新计算渲染范围
        this.currentRange = this.rangeCalculator.calculateRange(
          scrollTop,
          viewportHeight,
          this.sizeCache,
          this.anchorManager
        );

        // 触发范围更新回调
        this.updateRange();
      }
    });
  }

  /** 范围更新调度状态 */
  private rangeUpdateScheduled: boolean = false;
  /** 销毁状态标记 */
  private isDestroyed: boolean = false;

  /**
   * @public
   * @method getOffsetByIndex
   * @description 计算指定索引元素的精确滚动位置，支持动态高度和缓存优化
   *
   * @param {number} index - 目标索引位置
   * @returns {number} 实际滚动到的偏移量（像素）
   */
  getOffsetByIndex(index: number): number {
    const clampedIndex = Math.max(0, Math.min(index, this.options.totalCount - 1));
    return this.sizeCache.getOffsetByIndex(clampedIndex) + this.options.headerSize;
  }

  /**
   * 滚动到指定索引位置
   * @param index 目标索引
   * @param alignment 对齐方式
   */
  scrollToIndex(index: number, alignment: 'start' | 'center' | 'end' = 'start'): void {
    // 验证滚动元素和索引的有效性
    if (!this.scrollElement || index < 0 || index >= this.options.totalCount) {
      console.warn(
        `[VirtualCore] scrollToIndex: 无效索引 ${index}, 总数: ${this.options.totalCount}`
      );
      return;
    }

    // 获取目标元素的位置信息
    const targetOffset = this.sizeCache.getOffsetByIndex(index);
    const itemHeight = this.sizeCache.getItemHeight(index);
    const viewportHeight = this.scrollElement.clientHeight;

    let scrollTop: number;

    // 根据对齐方式计算滚动位置
    switch (alignment) {
      case 'center':
        // 居中对齐：元素在视窗中央
        scrollTop = targetOffset - (viewportHeight - itemHeight) / 2;
        break;
      case 'end':
        // 底部对齐：元素在视窗底部
        scrollTop = targetOffset - viewportHeight + itemHeight;
        break;
      default: // 'start'
        // 顶部对齐：元素在视窗顶部
        scrollTop = targetOffset;
    }

    // 添加头部偏移量，考虑列表头部的额外空间
    scrollTop += this.options.headerSize || 0;

    // 限制滚动范围，确保不超出可滚动区域
    const maxScrollTop = Math.max(0, this.scrollElement.scrollHeight - viewportHeight);
    scrollTop = Math.max(0, Math.min(scrollTop, maxScrollTop));

    // 执行滚动操作
    this.scrollElement.scrollTop = scrollTop;
  }
  /**
   * 获取性能监控器实例
   * @returns PerformanceMonitor实例
   */
  getPerformanceMonitor(): PerformanceMonitor {
    return this.performanceMonitor;
  }

  /**
   * 获取当前性能指标
   * @returns 性能指标对象
   */
  getPerformanceMetrics() {
    return this.performanceMonitor.getMetrics();
  }

  /**
   * 生成性能报告
   * @returns 性能报告字符串
   */
  getPerformanceReport(): string {
    return this.performanceMonitor.getPerformanceReport();
  }

  /**
   * 开始性能监控
   */
  startPerformanceMonitoring(): void {
    this.performanceMonitor.stopMonitoring();
  }

  /**
   * 停止性能监控
   */
  stopPerformanceMonitoring(): void {
    this.performanceMonitor.stopMonitoring();
  }

  /**
   * @public
   * @method destroy
   * @description 销毁虚拟列表实例，清理所有资源防止内存泄漏
   */
  destroy(): void {
    // 设置销毁状态标记，防止后续操作
    this.isDestroyed = true;

    // 清理范围更新调度状态，取消待执行的更新
    this.rangeUpdateScheduled = false;

    // 逐个销毁各个核心模块，释放相关资源
    this.sizeCache.clear(); // 清空尺寸缓存
    this.scrollProcessor.destroy(); // 销毁滚动处理器
    this.performanceMonitor.stopMonitoring(); // 停止性能监控

    // ViewportAnchorManager是纯数据管理，无需特殊清理

    // 清理DOM元素引用，避免内存泄漏
    this.scrollElement = null;

    // 重置核心状态变量
    this.lastScrollTop = 0;
  }
}
