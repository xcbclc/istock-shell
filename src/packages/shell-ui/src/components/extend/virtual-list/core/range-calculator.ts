/**
 * @fileoverview 虚拟列表范围计算器
 * @description 负责计算渲染范围、缓冲区大小和填充高度
 * @author IStock Shell Team
 * @version 0.1.1
 */

import type { VirtualRange, VirtualCoreOptions } from './types';
import type { SizeCacheManager } from './size-cache';
import type { ViewportAnchorManager } from './viewport-anchor';
import type { PerformanceMonitor } from './performance-monitor';

/**
 * @class RangeCalculator
 * @description 范围计算器，负责计算虚拟列表的渲染范围和相关参数
 */
export class RangeCalculator {
  constructor(
    private options: VirtualCoreOptions,
    private performanceMonitor?: PerformanceMonitor
  ) {}

  /**
   * 更新配置选项
   * @param newOptions 新的配置选项（部分更新）
   */
  updateOptions(newOptions: Partial<VirtualCoreOptions>): void {
    this.options = { ...this.options, ...newOptions };
  }

  /**
   * 计算渲染范围
   * @param scrollTop 滚动位置
   * @param viewportHeight 视窗高度
   * @param sizeCache 尺寸缓存
   * @param anchorManager 锚点管理器
   * @returns 渲染范围信息
   */
  calculateRange(
    scrollTop: number,
    viewportHeight: number,
    sizeCache: SizeCacheManager,
    anchorManager: ViewportAnchorManager
  ): VirtualRange {
    // 记录计算开始时间，用于性能监控
    this.performanceMonitor?.recordRangeCalculationStart();

    // 处理空列表的边界情况，直接返回空范围
    if (this.options.totalCount === 0) {
      return {
        start: 0,
        end: 0,
        paddingTop: this.options.headerSize,
        paddingBottom: this.options.footerSize,
        totalHeight: this.options.headerSize + this.options.footerSize,
      };
    }

    // 对输入参数进行严格的数值验证和边界处理
    const totalHeight =
      sizeCache.getTotalHeight() + this.options.headerSize + this.options.footerSize;
    const maxScrollTop = Math.max(0, totalHeight - viewportHeight);
    const clampedScrollTop = Math.max(0, Math.min(scrollTop, maxScrollTop));
    const adjustedScrollTop = Math.max(0, clampedScrollTop - this.options.headerSize);

    // 计算起始索引，增强索引计算的稳定性，避免边界条件下的计算错误
    let startIndex = anchorManager.calculateStartIndex(adjustedScrollTop, sizeCache);

    // 执行更严格的边界检查，防止索引越界
    if (startIndex < 0 || startIndex >= this.options.totalCount) {
      startIndex = Math.max(0, Math.min(startIndex, this.options.totalCount - 1));
      // 重新验证计算结果的准确性
      const verifyOffset = sizeCache.getOffsetByIndex(startIndex);
      if (Math.abs(verifyOffset - adjustedScrollTop) > sizeCache.getDynamicAverageHeight() * 2) {
        // 如果偏差过大，使用二分查找作为备用方案
        startIndex = sizeCache.findIndexByOffset(adjustedScrollTop);
      }
    }

    // 智能结束索引计算：基于视窗高度和配置的keeps值动态调整
    const adaptiveKeeps = this.options.keeps;
    let endIndex = Math.min(startIndex + adaptiveKeeps - 1, this.options.totalCount - 1);

    // 动态缓冲区优化：基于滚动速度和内容密度计算缓冲区大小
    const bufferSize = anchorManager.getDynamicBufferSize(adaptiveKeeps);
    const bufferedStart = Math.max(0, startIndex - bufferSize);
    const bufferedEnd = Math.min(this.options.totalCount - 1, endIndex + bufferSize);

    // 锚点更新逻辑优化，确保锚点状态的一致性
    const startItemTop = sizeCache.getOffsetByIndex(startIndex);
    const anchorOffset = adjustedScrollTop - startItemTop;

    // 更精确的锚点更新条件，避免频繁更新导致的状态不一致
    const shouldUpdateAnchor =
      Math.abs(anchorOffset) > 0.5 && Math.abs(anchorOffset) < sizeCache.getItemHeight(startIndex);
    if (shouldUpdateAnchor) {
      anchorManager.updateAnchor(clampedScrollTop, startIndex, anchorOffset);
    }

    // 高精度填充计算，解决累积误差问题
    const bufferedStartOffset = sizeCache.getOffsetByIndex(bufferedStart);
    const bufferedEndOffset = sizeCache.getOffsetByIndex(bufferedEnd);
    const bufferedEndHeight = sizeCache.getItemHeight(bufferedEnd);

    // 精确的填充高度计算，使用更高精度的舍入处理
    const rawPaddingTop = bufferedStartOffset + this.options.headerSize;
    const rawContentEnd = bufferedEndOffset + bufferedEndHeight + this.options.headerSize;
    const rawPaddingBottom = totalHeight - rawContentEnd;

    // 确保填充值的非负性和精度，避免负值导致的渲染问题
    const paddingTop = Math.max(0, Math.round(rawPaddingTop * 1000) / 1000);
    const paddingBottom = Math.max(0, Math.round(rawPaddingBottom * 1000) / 1000);

    // 验证计算结果的合理性，检测异常情况
    const calculatedTotalHeight =
      paddingTop +
      paddingBottom +
      (bufferedEnd - bufferedStart + 1) * sizeCache.getDynamicAverageHeight();

    if (Math.abs(calculatedTotalHeight - totalHeight) > totalHeight * 0.1) {
      console.warn('[RangeCalculator] 检测到填充计算异常，使用备用计算方案');
      // 使用更保守的计算方案
      return this.calculateRangeFallback(sizeCache, bufferedStart, bufferedEnd);
    }

    // 构建最终的渲染范围结果
    const result = {
      start: bufferedStart,
      end: bufferedEnd,
      totalHeight: Math.round(totalHeight * 1000) / 1000,
      paddingTop,
      paddingBottom,
    };

    // 记录范围计算结束和渲染指标，用于性能分析
    this.performanceMonitor?.recordRangeCalculationEnd();
    this.performanceMonitor?.updateRenderMetrics(
      bufferedEnd - bufferedStart + 1,
      this.options.totalCount
    );

    return result;
  }

  /**
   * 备用范围计算方案
   * @private
   */
  private calculateRangeFallback(
    sizeCache: SizeCacheManager,
    start: number,
    end: number
  ): VirtualRange {
    const totalHeight =
      sizeCache.getTotalHeight() + this.options.headerSize + this.options.footerSize;
    const startOffset = sizeCache.getOffsetByIndex(start);

    let endOffset = startOffset;
    for (let i = start; i <= end; i++) {
      endOffset += sizeCache.getItemHeight(i);
    }

    const paddingTop = Math.max(0, startOffset + this.options.headerSize);
    const paddingBottom = Math.max(0, totalHeight - endOffset - this.options.headerSize);

    return {
      start,
      end,
      totalHeight,
      paddingTop,
      paddingBottom,
    };
  }
}
