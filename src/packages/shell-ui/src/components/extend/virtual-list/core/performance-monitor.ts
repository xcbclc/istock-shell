/**
 * @fileoverview 虚拟列表性能监控器
 * @description 提供CPU、内存监听以及虚拟列表滚动相关指标的性能监控
 * @author IStock Shell Team
 * @version 0.1.1
 */

/**
 * 性能指标接口
 */
export interface PerformanceMetrics {
  /** CPU使用率相关指标 */
  cpu: {
    /** 平均帧时间（毫秒） */
    averageFrameTime: number;
    /** 最大帧时间（毫秒） */
    maxFrameTime: number;
    /** 最小帧时间（毫秒） */
    minFrameTime: number;
    /** 当前FPS */
    fps: number;
    /** 掉帧次数 */
    droppedFrames: number;
  };
  /** 内存使用情况 */
  memory: {
    /** 已使用的JS堆内存（MB） */
    usedJSHeapSize: number;
    /** 总的JS堆内存（MB） */
    totalJSHeapSize: number;
    /** JS堆内存限制（MB） */
    jsHeapSizeLimit: number;
    /** 内存使用率（%） */
    memoryUsagePercent: number;
  };
  /** 虚拟列表滚动指标 */
  scroll: {
    /** 滚动事件处理次数 */
    scrollEventCount: number;
    /** 平均滚动处理时间（毫秒） */
    averageScrollTime: number;
    /** 最大滚动处理时间（毫秒） */
    maxScrollTime: number;
    /** 范围计算次数 */
    rangeCalculationCount: number;
    /** 平均范围计算时间（毫秒） */
    averageRangeCalculationTime: number;
    /** 缓存命中率（%） */
    cacheHitRate: number;
  };
  /** 渲染性能指标 */
  render: {
    /** 渲染的元素数量 */
    renderedItemCount: number;
    /** 总元素数量 */
    totalItemCount: number;
    /** 渲染效率（%） */
    renderEfficiency: number;
    /** DOM更新次数 */
    domUpdateCount: number;
  };
}

/**
 * 性能监控配置
 */
export interface PerformanceMonitorConfig {
  /** 是否启用监控 */
  enabled: boolean;
  /** 采样间隔（毫秒） */
  sampleInterval: number;
  /** 性能数据保留时长（毫秒） */
  retentionTime: number;
  /** 是否启用内存监控 */
  enableMemoryMonitoring: boolean;
  /** 是否启用滚动监控 */
  enableScrollMonitoring: boolean;
}

/**
 * @class PerformanceMonitor
 * @description 虚拟列表性能监控器，提供全面的性能指标监控
 */
export class PerformanceMonitor {
  /** 60fps 基准帧时间（毫秒） */
  private readonly averageFrameTime = 16.67;

  /** 监控配置 */
  private config: PerformanceMonitorConfig;

  /** 性能数据存储 */
  private metrics: PerformanceMetrics;

  /** 帧时间记录 */
  private frameTimes: number[] = [];
  private lastFrameTime = 0;

  /** 滚动性能记录 */
  private scrollTimes: number[] = [];
  private rangeCalculationTimes: number[] = [];

  /** 监控定时器 */
  private monitoringTimer: number | null = null;

  /** 性能观察器 */
  private performanceObserver: PerformanceObserver | null = null;

  constructor(config: Partial<PerformanceMonitorConfig> = {}) {
    this.config = {
      enabled: true,
      sampleInterval: 1000,
      retentionTime: 60000,
      enableMemoryMonitoring: true,
      enableScrollMonitoring: true,
      ...config,
    };

    this.metrics = this.initializeMetrics();

    if (this.config.enabled) {
      this.startMonitoring();
    }
  }

  /**
   * 初始化性能指标
   */
  private initializeMetrics(): PerformanceMetrics {
    return {
      cpu: {
        averageFrameTime: this.averageFrameTime,
        maxFrameTime: 0,
        minFrameTime: Infinity,
        fps: 60,
        droppedFrames: 0,
      },
      memory: {
        usedJSHeapSize: 0,
        totalJSHeapSize: 0,
        jsHeapSizeLimit: 0,
        memoryUsagePercent: 0,
      },
      scroll: {
        scrollEventCount: 0,
        averageScrollTime: 0,
        maxScrollTime: 0,
        rangeCalculationCount: 0,
        averageRangeCalculationTime: 0,
        cacheHitRate: 0,
      },
      render: {
        renderedItemCount: 0,
        totalItemCount: 0,
        renderEfficiency: 0,
        domUpdateCount: 0,
      },
    };
  }

  /**
   * 开始性能监控
   */
  private startMonitoring(): void {
    // 检查监控是否已启用
    if (!this.config.enabled) return;

    // 启动帧率监控，用于计算FPS和帧时间
    this.startFrameRateMonitoring();

    // 根据配置启动内存使用监控
    if (this.config.enableMemoryMonitoring) {
      this.startMemoryMonitoring();
    }

    // 启动性能观察器，监控自定义性能标记
    this.startPerformanceObserver();
  }

  /**
   * 启动帧率监控
   */
  private startFrameRateMonitoring(): void {
    const measureFrame = (timestamp: number) => {
      if (this.lastFrameTime > 0) {
        const frameTime = timestamp - this.lastFrameTime;
        this.recordFrameTime(frameTime);
      }
      this.lastFrameTime = timestamp;

      if (this.config.enabled) {
        requestAnimationFrame(measureFrame);
      }
    };

    requestAnimationFrame(measureFrame);
  }

  /**
   * 启动内存监控
   */
  private startMemoryMonitoring(): void {
    this.monitoringTimer = window.setInterval(() => {
      this.updateMemoryMetrics();
    }, this.config.sampleInterval);
  }

  /**
   * 启动性能观察器
   */
  private startPerformanceObserver(): void {
    if (typeof PerformanceObserver !== 'undefined') {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'measure') {
            this.handlePerformanceMeasure(entry);
          }
        });
      });

      this.performanceObserver.observe({ entryTypes: ['measure'] });
    }
  }

  /**
   * 记录帧时间
   */
  private recordFrameTime(frameTime: number): void {
    this.frameTimes.push(frameTime);

    // 保持数据在合理范围内
    const maxSamples = Math.floor(this.config.retentionTime / this.averageFrameTime);
    if (this.frameTimes.length > maxSamples) {
      this.frameTimes.shift();
    }

    // 更新CPU指标
    this.updateCPUMetrics();
  }

  /**
   * 更新CPU指标
   */
  private updateCPUMetrics(): void {
    if (this.frameTimes.length === 0) return;

    const sum = this.frameTimes.reduce((a, b) => a + b, 0);
    const avg = sum / this.frameTimes.length;
    const max = Math.max(...this.frameTimes);
    const min = Math.min(...this.frameTimes);

    this.metrics.cpu.averageFrameTime = Math.round(avg * 100) / 100;
    this.metrics.cpu.maxFrameTime = Math.round(max * 100) / 100;
    this.metrics.cpu.minFrameTime = Math.round(min * 100) / 100;
    this.metrics.cpu.fps = Math.round(1000 / avg);

    // 计算掉帧次数（超过33.33ms认为掉帧）
    this.metrics.cpu.droppedFrames = this.frameTimes.filter((time) => time > 33.33).length;
  }

  /**
   * 更新内存指标
   */
  private updateMemoryMetrics(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;

      this.metrics.memory.usedJSHeapSize =
        Math.round((memory.usedJSHeapSize / 1024 / 1024) * 100) / 100;
      this.metrics.memory.totalJSHeapSize =
        Math.round((memory.totalJSHeapSize / 1024 / 1024) * 100) / 100;
      this.metrics.memory.jsHeapSizeLimit =
        Math.round((memory.jsHeapSizeLimit / 1024 / 1024) * 100) / 100;

      this.metrics.memory.memoryUsagePercent =
        Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100 * 100) / 100;
    }
  }

  /**
   * 处理性能测量
   */
  private handlePerformanceMeasure(entry: PerformanceEntry): void {
    if (entry.name.startsWith('virtual-list-scroll')) {
      this.recordScrollTime(entry.duration);
    } else if (entry.name.startsWith('virtual-list-range-calc')) {
      this.recordRangeCalculationTime(entry.duration);
    }
  }

  /**
   * 记录滚动时间
   */
  private recordScrollTime(duration: number): void {
    this.scrollTimes.push(duration);
    this.metrics.scroll.scrollEventCount++;

    // 保持数据在合理范围内
    const maxSamples = 1000;
    if (this.scrollTimes.length > maxSamples) {
      this.scrollTimes.shift();
    }

    this.updateScrollMetrics();
  }

  /**
   * 记录范围计算时间
   */
  private recordRangeCalculationTime(duration: number): void {
    this.rangeCalculationTimes.push(duration);
    this.metrics.scroll.rangeCalculationCount++;

    // 保持数据在合理范围内
    const maxSamples = 1000;
    if (this.rangeCalculationTimes.length > maxSamples) {
      this.rangeCalculationTimes.shift();
    }

    this.updateScrollMetrics();
  }

  /**
   * 更新滚动指标
   */
  private updateScrollMetrics(): void {
    if (this.scrollTimes.length > 0) {
      const sum = this.scrollTimes.reduce((a, b) => a + b, 0);
      this.metrics.scroll.averageScrollTime =
        Math.round((sum / this.scrollTimes.length) * 100) / 100;
      this.metrics.scroll.maxScrollTime = Math.round(Math.max(...this.scrollTimes) * 100) / 100;
    }

    if (this.rangeCalculationTimes.length > 0) {
      const sum = this.rangeCalculationTimes.reduce((a, b) => a + b, 0);
      this.metrics.scroll.averageRangeCalculationTime =
        Math.round((sum / this.rangeCalculationTimes.length) * 100) / 100;
    }
  }

  /**
   * 记录滚动事件开始
   */
  recordScrollStart(): void {
    if (!this.config.enableScrollMonitoring) return;
    performance.mark('virtual-list-scroll-start');
  }

  /**
   * 记录滚动事件结束
   */
  recordScrollEnd(): void {
    if (!this.config.enableScrollMonitoring) return;
    performance.mark('virtual-list-scroll-end');
    performance.measure(
      'virtual-list-scroll',
      'virtual-list-scroll-start',
      'virtual-list-scroll-end'
    );
  }

  /**
   * 记录范围计算开始
   */
  recordRangeCalculationStart(): void {
    if (!this.config.enableScrollMonitoring) return;
    performance.mark('virtual-list-range-calc-start');
  }

  /**
   * 记录范围计算结束
   */
  recordRangeCalculationEnd(): void {
    if (!this.config.enableScrollMonitoring) return;
    performance.mark('virtual-list-range-calc-end');
    performance.measure(
      'virtual-list-range-calc',
      'virtual-list-range-calc-start',
      'virtual-list-range-calc-end'
    );
  }

  /**
   * 更新缓存命中率
   */
  updateCacheHitRate(hitRate: number): void {
    this.metrics.scroll.cacheHitRate = Math.round(hitRate * 100) / 100;
  }

  /**
   * 更新渲染指标
   */
  updateRenderMetrics(renderedCount: number, totalCount: number): void {
    this.metrics.render.renderedItemCount = renderedCount;
    this.metrics.render.totalItemCount = totalCount;
    this.metrics.render.renderEfficiency =
      totalCount > 0 ? Math.round((renderedCount / totalCount) * 100 * 100) / 100 : 0;
    this.metrics.render.domUpdateCount++;
  }

  /**
   * 获取当前性能指标
   */
  getMetrics(): PerformanceMetrics {
    return JSON.parse(JSON.stringify(this.metrics));
  }

  /**
   * 重置性能指标
   */
  resetMetrics(): void {
    this.metrics = this.initializeMetrics();
    this.frameTimes = [];
    this.scrollTimes = [];
    this.rangeCalculationTimes = [];
  }

  /**
   * 停止监控
   */
  stopMonitoring(): void {
    this.config.enabled = false;

    if (this.monitoringTimer) {
      clearInterval(this.monitoringTimer);
      this.monitoringTimer = null;
    }

    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
      this.performanceObserver = null;
    }
  }

  /**
   * 获取性能报告
   */
  getPerformanceReport(): string {
    // 获取当前性能指标的快照
    const metrics = this.getMetrics();

    // 生成格式化的性能报告，包含所有关键性能指标
    return `
=== 虚拟列表性能报告 ===

CPU性能:
- 平均帧时间: ${metrics.cpu.averageFrameTime}ms
- 当前FPS: ${metrics.cpu.fps}
- 掉帧次数: ${metrics.cpu.droppedFrames}

内存使用:
- 已使用内存: ${metrics.memory.usedJSHeapSize}MB
- 内存使用率: ${metrics.memory.memoryUsagePercent}%

滚动性能:
- 滚动事件数: ${metrics.scroll.scrollEventCount}
- 平均滚动处理时间: ${metrics.scroll.averageScrollTime}ms
- 范围计算次数: ${metrics.scroll.rangeCalculationCount}
- 缓存命中率: ${metrics.scroll.cacheHitRate}%

渲染效率:
- 渲染元素数: ${metrics.render.renderedItemCount}/${metrics.render.totalItemCount}
- 渲染效率: ${metrics.render.renderEfficiency}%
- DOM更新次数: ${metrics.render.domUpdateCount}
    `.trim();
  }

  /**
   * 销毁监控器
   */
  destroy(): void {
    this.stopMonitoring();
    this.frameTimes = [];
    this.scrollTimes = [];
    this.rangeCalculationTimes = [];
  }
}
