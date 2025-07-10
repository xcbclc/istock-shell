/**
 * @fileoverview 虚拟列表滚动处理器
 * @description 负责处理滚动事件、RAF调度、防抖和性能监控
 * @author IStock Shell Team
 * @version 0.1.1
 */

import type { ScrollDirection, VirtualCoreOptions } from './types';
import type { PerformanceMonitor } from './performance-monitor';

/**
 * @class ScrollProcessor
 * @description 滚动处理器，负责滚动事件的处理、防抖和性能优化
 */
export class ScrollProcessor {
  /** 滚动处理相关常量 */
  private readonly SCROLL_THRESHOLD = 1; // 最小滚动阈值

  /** RAF调度状态（预留扩展） */
  private rafId: number | null = null;

  /** 智能防抖相关状态（预留扩展） */
  private scrollVelocity = 0;
  private velocityHistory: number[] = [];

  /** 上次滚动位置记录，用于计算滚动方向 */
  private lastScrollTop = 0;
  /** 滚动方向跟踪 */
  private scrollDirection: ScrollDirection = 'none';
  /** 滚动容器元素引用 */
  private scrollElement: HTMLElement | null = null;

  /** 节流相关状态 */
  private rangeUpdateTimer: number | null = null;

  /** 滚动阈值检查回调 */
  private onScrollToTop?: () => void;
  private onScrollToBottom?: () => void;
  private onScrollProcess?: (scrollTop: number, viewportHeight: number) => void;

  /** 性能监控器引用 */
  private performanceMonitor?: PerformanceMonitor;

  /**
   * 构造函数
   * @param options 虚拟列表配置选项
   * @param onScrollToTop 滚动到顶部回调
   * @param onScrollToBottom 滚动到底部回调
   */
  constructor(
    private options: VirtualCoreOptions,
    onScrollToTop?: () => void,
    onScrollToBottom?: () => void
  ) {
    this.onScrollToTop = onScrollToTop;
    this.onScrollToBottom = onScrollToBottom;
  }

  /**
   * 设置性能监控器
   * @param monitor 性能监控器实例
   */
  setPerformanceMonitor(monitor: PerformanceMonitor): void {
    this.performanceMonitor = monitor;
  }

  /**
   * 设置滚动处理回调
   * @param callback 滚动处理回调函数
   */
  setScrollProcessCallback(callback: (scrollTop: number, viewportHeight: number) => void): void {
    this.onScrollProcess = callback;
  }

  /**
   * 设置滚动元素引用
   * @param element 滚动容器DOM元素
   */
  setScrollElement(element: HTMLElement | null): void {
    this.scrollElement = element;
  }

  /**
   * 获取滚动方向
   * @returns 当前滚动方向
   */
  getScrollDirection(): ScrollDirection {
    return this.scrollDirection;
  }

  /**
   * 主要滚动处理入口
   * @param scrollTop 当前滚动位置
   * @param viewportHeight 视窗高度
   */
  handleScroll(scrollTop: number, viewportHeight: number): void {
    // 性能监控：记录滚动事件开始，用于性能分析和优化
    this.performanceMonitor?.recordScrollStart();

    const currentTime = performance.now();

    // 立即检查滚动阈值并触发回调，不受防抖影响
    // 这确保了顶部/底部触发事件的及时性
    this.checkScrollThresholds(scrollTop, viewportHeight);

    // 微小滚动过滤：避免不必要的处理，提升性能
    // 过滤掉小于阈值的滚动变化，减少无效计算
    const scrollDelta = Math.abs(scrollTop - this.lastScrollTop);
    if (scrollDelta < this.SCROLL_THRESHOLD) {
      return;
    }

    // 更新滚动速度信息，用于后续的智能调度决策
    this.updateScrollVelocity(scrollTop, currentTime);

    // 智能RAF调度：根据滚动速度调整调度策略
    // 取消之前的RAF请求，避免重复处理和性能浪费
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    // 高速滚动时立即处理，低速滚动时延迟处理
    // 这种策略平衡了响应性和性能
    const shouldProcessImmediately = this.scrollVelocity > 1000;

    const processScroll = () => {
      this.processScrollInternal(scrollTop, viewportHeight);
      this.rafId = null;
    };

    if (shouldProcessImmediately) {
      // 高速滚动时立即处理，确保流畅的用户体验
      processScroll();
    } else {
      // 低速滚动时使用RAF延迟处理，优化性能
      this.rafId = requestAnimationFrame(processScroll);
    }

    // 性能监控：记录滚动事件结束，完成性能统计
    this.performanceMonitor?.recordScrollEnd();
  }

  /**
   * 检查滚动阈值
   * @param scrollTop 当前滚动位置
   * @param viewportHeight 视窗高度
   */
  private checkScrollThresholds(scrollTop: number, viewportHeight: number): void {
    if (!this.scrollElement) return;

    const scrollHeight = this.scrollElement.scrollHeight;
    const thresholdTop = this.options.thresholdTop || 0;
    const thresholdBottom = this.options.thresholdBottom || 0;

    // 动态阈值：根据滚动速度调整
    const dynamicTopThreshold = this.scrollVelocity > 500 ? thresholdTop * 2 : thresholdTop;
    const dynamicBottomThreshold =
      this.scrollVelocity > 500 ? thresholdBottom * 2 : thresholdBottom;

    // 顶部阈值检测 - 用于加载历史消息
    if (scrollTop <= dynamicTopThreshold) {
      this.onScrollToTop?.();
    }

    // 底部阈值检测 - 用于标记已读（精确计算，避免浮点数误差）
    const distanceToBottom = scrollHeight - (scrollTop + viewportHeight);
    if (distanceToBottom <= dynamicBottomThreshold) {
      this.onScrollToBottom?.();
    }
  }

  /**
   * 内部滚动处理逻辑
   * @param scrollTop 当前滚动位置
   * @param viewportHeight 视窗高度
   */
  private processScrollInternal(scrollTop: number, viewportHeight: number): void {
    // 更新滚动方向（优化算法）
    this.updateScrollDirection(scrollTop);

    this.lastScrollTop = scrollTop;

    // 调用核心滚动处理逻辑
    this.onScrollProcess?.(scrollTop, viewportHeight);
  }

  /**
   * 更新滚动方向
   * @private
   */
  private updateScrollDirection(scrollTop: number): void {
    const verticalDelta = scrollTop - this.lastScrollTop;

    // 设置最小阈值，过滤微小抖动
    const MIN_DELTA_THRESHOLD = 1;

    if (Math.abs(verticalDelta) > MIN_DELTA_THRESHOLD) {
      this.scrollDirection = verticalDelta > 0 ? 'down' : 'up';
    }
    // 保持当前方向，避免频繁切换
  }

  /**
   * 更新滚动速度
   * @private
   */
  private updateScrollVelocity(scrollTop: number, currentTime: number): void {
    if (this.velocityHistory.length > 0) {
      const lastTime = this.velocityHistory[this.velocityHistory.length - 1];
      const timeDelta = currentTime - lastTime;
      const scrollDelta = Math.abs(scrollTop - this.lastScrollTop);

      if (timeDelta > 0 && timeDelta < 100) {
        // 过滤异常时间间隔
        this.scrollVelocity = (scrollDelta / timeDelta) * 1000; // 像素/秒
      }
    }

    // 维护速度历史记录
    this.velocityHistory.push(currentTime);
    if (this.velocityHistory.length > 5) {
      this.velocityHistory.shift();
    }
  }

  /**
   * 销毁处理器
   */
  destroy(): void {
    // 清理RAF
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    // 清理节流定时器
    if (this.rangeUpdateTimer !== null) {
      clearTimeout(this.rangeUpdateTimer);
      this.rangeUpdateTimer = null;
    }

    // 清理性能统计
    this.velocityHistory.length = 0;

    // 清理滚动元素引用
    this.scrollElement = null;
  }
}
