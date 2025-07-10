/**
 * @fileoverview 虚拟滚动锚点管理系统
 * @description 提供滚动锚点定位、速度计算和滚动补偿功能
 * @author iStock Shell Team
 * @version 0.1.0
 */

import type { SizeCacheManager } from './size-cache';

/**
 * @interface ViewportAnchor
 * @description 高精度虚拟滚动锚点接口，定义了锚点的核心属性
 * @features
 * - 亚像素级定位精度
 * - 滚动位置记录
 * - 索引与偏移量映射
 * @example
 * ```typescript
 * const anchor: ViewportAnchor = {
 *   index: 100,
 *   offset: -25.5,
 *   scrollTop: 2048.75
 * };
 * ```
 */
export interface ViewportAnchor {
  /**
   * 锚点元素索引
   * @type {number}
   * @description 锚点对应的数据项索引，用于定位具体元素
   * @range [0, totalCount-1]
   * @precision 整数值，对应数据数组的索引
   */
  index: number; // 锚点元素索引

  /**
   * 锚点相对于视窗顶部的偏移量
   * @type {number}
   * @description 锚点元素顶部相对于视窗顶部的距离（像素）
   * @precision 支持亚像素级精度（小数值）
   * @range 通常为负值（元素在视窗上方）或小正值（元素在视窗内）
   * @unit 像素（px）
   */
  offset: number; // 相对于视窗顶部的距离

  /**
   * 当前滚动位置
   * @type {number}
   * @description 记录锚点创建时的滚动位置，用于计算滚动偏移量
   * @precision 支持亚像素级精度（小数值）
   * @unit 像素（px）
   */
  scrollTop: number;
}

/**
 * @class ViewportAnchorManager
 * @description 虚拟滚动锚点管理器，提供滚动位置锚定和补偿功能
 *
 * @features 核心功能
 * - 锚点位置记录和管理
 * - 滚动速度和方向计算
 * - 动态缓冲区大小调整
 * - 滚动补偿机制
 * - 历史数据维护
 *
 * @algorithm 核心算法
 * - 速度计算：基于时间窗口的平滑速度计算
 * - 加速度跟踪：简单的加速度历史记录
 * - 缓冲优化：基于速度阈值的缓冲区调整
 *
 * @performance 性能特性
 * - 历史数据限制控制内存占用
 * - 异步补偿队列避免阻塞
 * - 任务过期机制减少无效操作
 *
 * @usecase 使用场景
 * - 虚拟列表滚动优化
 * - 动态高度列表项处理
 * - 滚动位置保持
 *
 * @example 基本使用
 * ```typescript
 * const anchorManager = new ViewportAnchorManager();
 *
 * // 更新锚点
 * anchorManager.updateAnchor(scrollTop, startIndex, offset);
 *
 * // 计算新的起始索引
 * const newIndex = anchorManager.calculateStartIndex(newScrollTop, sizeCache);
 *
 * // 执行滚动补偿
 * anchorManager.compensateScroll(changedIndex, heightDelta, scrollElement);
 * ```
 */
export class ViewportAnchorManager {
  // ==================== 核心锚点状态 ====================

  /**
   * @private
   * @type {ViewportAnchor}
   * @description 当前活跃的视窗锚点，记录当前可见区域的定位信息
   * @default { index: 0, offset: 0, scrollTop: 0 }
   */
  private anchor: ViewportAnchor = { index: 0, offset: 0, scrollTop: 0 };

  /**
   * @private
   * @type {number}
   * @description 上一次记录的滚动位置，用于计算滚动方向和速度
   * @unit 像素（px）
   */
  private lastScrollTop: number = 0;

  /**
   * @private
   * @type {'up' | 'down' | 'none'}
   * @description 当前滚动方向，用于优化渲染策略和预测算法
   */
  private scrollDirection: 'up' | 'down' | 'none' = 'none';

  // ==================== 预测性渲染系统 ====================

  /**
   * @private
   * @type {number}
   * @description 当前滚动速度（像素/秒），基于历史数据计算的平滑速度
   * @unit 像素/秒（px/s）
   */
  private scrollVelocity: number = 0;

  /**
   * @private
   * @type {number}
   * @description 上一次速度计算的时间戳，用于计算时间间隔
   * @unit 毫秒（ms）
   */
  private lastScrollTime: number = 0;

  /**
   * @private
   * @type {Array<{velocity: number, timestamp: number, acceleration: number}>}
   * @description 速度历史记录，用于平滑速度计算和趋势分析
   * @maxLength VELOCITY_HISTORY_SIZE
   */
  private velocityHistory: Array<{ velocity: number; timestamp: number; acceleration: number }> =
    [];

  /**
   * @private
   * @readonly
   * @type {number}
   * @description 速度历史记录的最大长度，控制内存使用
   * @default 8
   */
  private readonly VELOCITY_HISTORY_SIZE = 8;

  /**
   * @private
   * @readonly
   * @type {number}
   * @description 预测性渲染的速度阈值
   * @unit 像素/秒（px/s）
   * @default 100
   */
  private readonly PREDICTION_THRESHOLD = 100;

  /**
   * @private
   * @readonly
   * @type {number}
   * @description 高速滚动的速度阈值，用于调整缓冲区和补偿策略
   * @unit 像素/秒（px/s）
   * @default 500
   */
  private readonly HIGH_VELOCITY_THRESHOLD = 500;

  /**
   * @private
   * @readonly
   * @type {number}
   * @description 极高速滚动的速度阈值，触发最大缓冲区和特殊处理
   * @unit 像素/秒（px/s）
   * @default 1000
   */
  private readonly EXTREME_VELOCITY_THRESHOLD = 1000;

  // ==================== 加速度跟踪系统 ====================

  /**
   * @private
   * @type {number}
   * @description 上一次计算的速度值，用于计算加速度
   * @unit 像素/秒（px/s）
   */
  private lastVelocity = 0;

  /**
   * @private
   * @type {number[]}
   * @description 加速度历史记录，用于平滑加速度计算
   * @maxLength ACCELERATION_HISTORY_SIZE
   */
  private accelerationHistory: number[] = [];

  /**
   * @private
   * @readonly
   * @type {number}
   * @description 加速度历史记录的最大长度
   * @default 5
   */
  private readonly ACCELERATION_HISTORY_SIZE = 5;

  // ==================== 智能缓冲区配置 ====================

  /**
   * @private
   * @readonly
   * @type {number}
   * @description 最小缓冲区大小，确保基本的滚动流畅性
   * @default 3
   */
  private readonly MIN_BUFFER_SIZE = 3;

  /**
   * @private
   * @readonly
   * @type {number}
   * @description 最大缓冲区大小，防止内存过度使用
   * @default 15
   */
  private readonly MAX_BUFFER_SIZE = 1000;

  // ==================== 性能优化系统 ====================

  /**
   * @private
   * @type {ViewportAnchor[]}
   * @description 锚点历史记录，用于回溯和性能分析
   * @maxLength ANCHOR_HISTORY_SIZE
   */
  private anchorHistory: ViewportAnchor[] = [];

  /**
   * @private
   * @readonly
   * @type {number}
   * @description 锚点历史记录的最大长度
   * @default 10
   */
  private readonly ANCHOR_HISTORY_SIZE = 10;

  // ==================== 滚动补偿系统 ====================

  /**
   * @private
   * @type {Array<{action: () => void, timestamp: number}>}
   * @description 补偿任务队列，确保滚动补偿的有序执行
   */
  private compensationQueue: Array<{ action: () => void; timestamp: number }> = [];

  /**
   * @private
   * @type {boolean}
   * @description 补偿处理状态标志，防止并发执行补偿任务
   */
  private isProcessingCompensation = false;

  direction() {
    return this.scrollDirection;
  }

  /**
   * 获取当前滚动速度
   *
   * @returns {number} 当前滚动速度（像素/秒）
   *
   * @description
   * 返回基于历史数据计算的平滑滚动速度，用于预测性渲染和缓冲区调整。
   *
   * @unit 像素/秒（px/s）
   */
  getScrollVelocity(): number {
    return this.scrollVelocity;
  }

  /**
   * 执行滚动补偿
   * @param {number} changedIndex - 发生变化的元素索引
   * @param {number} heightDelta - 高度变化量（像素，正值表示增加，负值表示减少）
   * @param {HTMLElement} scrollElement - 滚动容器DOM元素
   *
   * @description 当列表项高度发生变化时，调整滚动位置以保持用户视野稳定
   */
  compensateScroll(changedIndex: number, heightDelta: number, scrollElement: HTMLElement): void {
    // 只有当变化的元素在当前锚点之前或就是锚点时才需要补偿
    const shouldCompensate = changedIndex <= this.anchor.index;
    if (!shouldCompensate) return;
    // 过滤微小的高度变化，避免不必要的补偿
    if (Math.abs(heightDelta) < 0.1) return;
    const startTime = performance.now();

    // 创建补偿任务，确保在DOM更新完成后执行
    const compensationTask = () => {
      // 检查滚动元素是否仍然连接到DOM，防止在元素已卸载时执行
      if (!scrollElement.isConnected) {
        return;
      }
      // 计算补偿后的新滚动位置
      const newScrollTop = scrollElement.scrollTop + heightDelta;
      const maxScrollTop = scrollElement.scrollHeight - scrollElement.clientHeight;
      const clampedScrollTop = Math.max(0, Math.min(newScrollTop, maxScrollTop));

      try {
        // 确保最终滚动位置在有效范围内
        const finalScrollTop = Math.min(clampedScrollTop, maxScrollTop);
        // 执行滚动位置补偿
        scrollElement.scrollTop = finalScrollTop;
        // 同步更新锚点的滚动位置状态
        this.anchor.scrollTop = finalScrollTop;
      } catch (error) {
        console.error('[ViewportAnchor] 滚动补偿失败:', error);
      } finally {
        // 释放补偿处理锁，允许处理下一个任务
        this.isProcessingCompensation = false;
        this.processNextCompensation();
      }
    };

    // 将补偿任务加入队列，防止并发补偿导致的冲突
    this.compensationQueue.push({
      action: compensationTask,
      timestamp: startTime,
    });

    // 按时间戳排序，确保任务按正确顺序执行
    this.compensationQueue.sort((a, b) => a.timestamp - b.timestamp);

    // 如果当前没有正在处理的补偿任务，启动队列处理
    if (!this.isProcessingCompensation) {
      this.processNextCompensation();
    }
  }

  /**
   * 更新视窗锚点位置
   *
   * @param {number} scrollTop - 当前滚动位置（像素）
   * @param {number} visibleStartIndex - 可见区域起始索引
   * @param {number} itemOffset - 起始元素相对于视窗的偏移量（像素）
   * @returns {void}
   *
   * @description
   * 根据当前滚动状态更新视窗锚点，计算滚动速度和方向，并维护锚点历史记录。
   * 这是虚拟滚动系统的核心方法之一，每次滚动事件触发时都会调用。
   */
  updateAnchor(scrollTop: number, visibleStartIndex: number, itemOffset: number): void {
    const currentTime = performance.now();

    // 计算并更新滚动速度，用于预测性渲染和缓冲区优化
    this.calculateScrollVelocity(scrollTop, currentTime);

    // 根据滚动位置变化确定滚动方向，用于优化渲染策略
    if (scrollTop > this.lastScrollTop) {
      this.scrollDirection = 'down';
    } else if (scrollTop < this.lastScrollTop) {
      this.scrollDirection = 'up';
    } else {
      this.scrollDirection = 'none';
    }

    // 记录滚动位置和时间：为下次速度计算和方向检测提供基准
    this.lastScrollTop = scrollTop;
    this.lastScrollTime = currentTime;

    // 创建新的锚点对象，记录当前视窗在虚拟列表中的精确位置
    const newAnchor: ViewportAnchor = {
      index: visibleStartIndex, // 可见区域起始元素索引
      offset: itemOffset, // 该元素相对视窗顶部的偏移量
      scrollTop, // 当前滚动位置
    };

    // 维护锚点历史记录，用于滚动模式分析和回溯操作
    this.anchorHistory.push(newAnchor);
    if (this.anchorHistory.length > this.ANCHOR_HISTORY_SIZE) {
      // 移除最旧的记录，保持历史记录在合理范围内，控制内存使用
      this.anchorHistory.shift();
    }

    // 更新当前活跃锚点，作为后续计算的基准点
    this.anchor = newAnchor;
  }

  /**
   * 获取动态缓冲区大小
   *
   * @returns {number} 计算得出的缓冲区大小
   *
   * @description
   * 智能缓冲区算法：综合考虑滚动速度、加速度、历史模式和设备性能。
   */
  getDynamicBufferSize(keeps?: number): number {
    const velocity = this.getScrollVelocity();
    const baseBuffer = keeps ? Math.round(keeps / 4) : this.MIN_BUFFER_SIZE;

    // 基于速度的智能缓冲区调整
    let bufferMultiplier = 1;

    // 考虑加速度趋势
    const avgAcceleration =
      this.accelerationHistory.length > 0
        ? this.accelerationHistory.reduce((sum, acc) => sum + acc, 0) /
          this.accelerationHistory.length
        : 0;

    // 速度分级优化
    if (velocity > this.EXTREME_VELOCITY_THRESHOLD) {
      bufferMultiplier = avgAcceleration > 0 ? 8 : 6; // 考虑加速度
    } else if (velocity > this.HIGH_VELOCITY_THRESHOLD) {
      bufferMultiplier = avgAcceleration > 0 ? 5 : 4;
    } else if (velocity > this.PREDICTION_THRESHOLD) {
      bufferMultiplier = avgAcceleration > 0 ? 3 : 2;
    } else {
      // 低速滚动时，根据历史模式微调
      bufferMultiplier = this.velocityHistory.length > 3 ? 1.5 : 1;
    }

    // 内存优化：限制缓冲区增长
    const finalBuffer = Math.floor(baseBuffer * bufferMultiplier);
    const maxBuffer = Math.min(this.MAX_BUFFER_SIZE, keeps ? keeps * 2 : this.MAX_BUFFER_SIZE);

    return Math.min(finalBuffer, maxBuffer);
  }

  /**
   * 基于锚点计算新的起始索引
   *
   * @param {number} newScrollTop - 新的滚动位置（像素）
   * @param {SizeCacheManager} sizeCache - 尺寸缓存管理器实例
   * @returns {number} 计算得出的新起始索引
   *
   * @description
   * 利用锚点信息和预测性渲染高效计算新滚动位置对应的起始索引。
   * 优化了算法复杂度和精度，提升渲染性能。
   */
  calculateStartIndex(newScrollTop: number, sizeCache: SizeCacheManager): number {
    const scrollDelta = newScrollTop - this.anchor.scrollTop;
    const EPSILON = 0.5; // 优化容差值，提升精度

    // 微小滚动优化：避免不必要的重新计算
    if (Math.abs(scrollDelta) < EPSILON) {
      return this.anchor.index;
    }

    // 根据滚动距离选择最优算法
    const avgHeight = sizeCache.getDynamicAverageHeight();
    const estimatedIndexDelta = Math.floor(Math.abs(scrollDelta) / avgHeight);

    // 小范围滚动：使用增量计算（O(k)，k为滚动距离对应的元素数）
    if (estimatedIndexDelta < 20) {
      return this.calculateIndexIncremental(newScrollTop, sizeCache, scrollDelta, EPSILON);
    }

    // 大范围滚动：使用二分查找（O(log n)）
    return sizeCache.findIndexByOffset(newScrollTop);
  }

  /**
   * 增量计算起始索引（小范围滚动优化）
   * @private
   */
  private calculateIndexIncremental(
    targetOffset: number,
    sizeCache: SizeCacheManager,
    scrollDelta: number,
    epsilon: number
  ): number {
    const totalCount = sizeCache.getTotalCount();
    let currentIndex = this.anchor.index;
    let currentOffset = sizeCache.getOffsetByIndex(currentIndex);

    if (scrollDelta > 0) {
      // 向下滚动：正向遍历
      while (currentIndex < totalCount) {
        const itemHeight = sizeCache.getItemHeight(currentIndex);
        const itemEnd = currentOffset + itemHeight;

        // 精确边界判断
        if (targetOffset >= currentOffset - epsilon && targetOffset < itemEnd + epsilon) {
          return currentIndex;
        }

        if (currentOffset > targetOffset + epsilon) {
          return Math.max(0, currentIndex - 1);
        }

        currentOffset += itemHeight;
        currentIndex++;
      }
      return totalCount - 1;
    } else {
      // 向上滚动：反向遍历
      while (currentIndex >= 0) {
        const itemHeight = sizeCache.getItemHeight(currentIndex);

        // 精确边界判断
        if (
          targetOffset >= currentOffset - epsilon &&
          targetOffset < currentOffset + itemHeight + epsilon
        ) {
          return currentIndex;
        }

        if (currentOffset < targetOffset - epsilon) {
          return Math.min(currentIndex + 1, totalCount - 1);
        }

        currentIndex--;
        if (currentIndex >= 0) {
          currentOffset -= sizeCache.getItemHeight(currentIndex);
        }
      }
      return 0;
    }
  }

  /**
   * 计算滚动速度和加速度
   *
   * @private
   * @param {number} scrollTop - 当前滚动位置
   * @param {number} currentTime - 当前时间戳
   * @returns {void}
   *
   * @description
   * 优化的滚动速度计算，使用加权平均和异常值过滤，提升预测准确性。
   */
  private calculateScrollVelocity(scrollTop: number, currentTime: number): void {
    if (this.lastScrollTime > 0) {
      const timeDelta = currentTime - this.lastScrollTime;
      const scrollDelta = scrollTop - this.lastScrollTop;

      // 过滤异常时间间隔
      if (timeDelta > 0 && timeDelta < 100) {
        // 限制在100ms内，过滤异常值
        const instantVelocity = (Math.abs(scrollDelta) / timeDelta) * 1000; // 像素/秒

        // 异常值检测：过滤明显不合理的速度值
        const maxReasonableVelocity = 10000; // 10000px/s作为合理上限
        if (instantVelocity <= maxReasonableVelocity) {
          // 计算加速度
          const acceleration = instantVelocity - this.lastVelocity;
          this.lastVelocity = instantVelocity;

          // 更新加速度历史（限制大小）
          this.accelerationHistory.push(acceleration);
          if (this.accelerationHistory.length > this.ACCELERATION_HISTORY_SIZE) {
            this.accelerationHistory.shift();
          }

          // 更新速度历史
          this.velocityHistory.push({
            velocity: instantVelocity,
            timestamp: currentTime,
            acceleration,
          });
          if (this.velocityHistory.length > this.VELOCITY_HISTORY_SIZE) {
            this.velocityHistory.shift();
          }

          // 加权平均计算：近期数据权重更高
          if (this.velocityHistory.length > 0) {
            let weightedSum = 0;
            let totalWeight = 0;

            for (let i = 0; i < this.velocityHistory.length; i++) {
              const weight = (i + 1) / this.velocityHistory.length; // 线性递增权重
              weightedSum += this.velocityHistory[i].velocity * weight;
              totalWeight += weight;
            }

            this.scrollVelocity = weightedSum / totalWeight;
          }
        }
      }
    }
  }

  /**
   * 处理补偿队列
   *
   * @private
   * @description
   * 处理滚动补偿队列中的下一个任务，确保任务按序执行且不阻塞主线程。
   * 这是滚动补偿系统的核心调度方法，负责任务的调度、执行和过期处理。
   */
  private processNextCompensation(): void {
    if (this.compensationQueue.length === 0 || this.isProcessingCompensation) return;
    // 队列检查：有任务且当前未在处理中
    // 设置处理标志
    this.isProcessingCompensation = true;

    // 取出下一个任务
    const compensationItem = this.compensationQueue.shift();
    if (!compensationItem) {
      this.isProcessingCompensation = false;
      this.processNextCompensation();
      return;
    }

    // 检查任务是否过期（超过50ms的任务可能不再相关，减少抖动）
    const age = performance.now() - compensationItem.timestamp;
    if (age < 50) {
      // 使用单RAF确保DOM更新完成，减少延迟
      requestAnimationFrame(() => {
        try {
          compensationItem.action();
        } catch (error) {
          console.warn('[ViewportAnchor] 补偿任务执行失败:', error);
        } finally {
          // 重置处理标志并处理下一个任务
          this.isProcessingCompensation = false;
          this.processNextCompensation();
        }
      });
    } else {
      // 任务过期，直接处理下一个
      console.log(
        `[ViewportAnchor] 跳过过期任务 - 任务年龄: ${age.toFixed(2)}ms > 50ms, ` +
          `任务已过期，直接处理下一个`
      );
      this.isProcessingCompensation = false;
      this.processNextCompensation();
    }
  }
}
