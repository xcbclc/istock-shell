/**
 * 高性能虚拟列表尺寸缓存系统
 *
 * 提供基于 Map 的尺寸缓存和动态高度管理，支持高效的位置查询
 * 包含内存优化的 LRU 缓存机制和增量更新
 *
 * @fileoverview 虚拟列表核心缓存模块，实现高效缓存策略
 * @author iStock Shell Team
 * @version 0.1.0
 */

/**
 * 尺寸缓存项接口
 *
 * @interface SizeCache
 * @description 存储虚拟列表中单个元素的尺寸和位置信息
 */
export interface SizeCache {
  /**
   * 元素在列表中的索引位置
   * @type {number}
   */
  index: number;

  /**
   * 实际测量尺寸（像素值）
   * @type {number}
   */
  size: number;

  /**
   * 距离列表顶部的累计高度（像素值）
   * @type {number}
   */
  top: number;
}

/**
 * 缓存统计信息接口
 */
interface CacheStats {
  hits: number;
  misses: number;
  totalQueries: number;
}

/**
 * 尺寸缓存管理器
 *
 * @class SizeCacheManager
 * @description 基于 Map 的高性能尺寸缓存实现，支持动态高度管理
 *
 * @features
 * - 高效缓存架构：基于 Map 的快速存储和查找
 * - 增量更新：实时处理尺寸更新，减少重计算
 * - 高性能偏移量查找：O(log n) 二分查找算法
 * - 双向查找：支持索引到偏移量和偏移量到索引的查找
 * - 动态高度管理：自适应预估高度计算
 * - 内存优化：LRU淘汰策略，防止内存泄漏
 */
export class SizeCacheManager {
  /** 基于 Map 的缓存存储 */
  private cache = new Map<number, SizeCache>();

  /** 缓存容量配置 */
  private readonly CACHE_SIZE = 10000;

  /** 访问频率跟踪（用于LRU淘汰） */
  private lastAccessTime = new Map<number, number>();

  /** 核心数据 */
  private totalCount = 0;
  private estimateSize = 50;
  private measuredCount = 0;
  private totalMeasuredHeight = 0;

  /** 性能统计 */
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    totalQueries: 0,
  };

  /** 性能监控器引用 */
  private performanceMonitor?: any;

  /**
   * 构造函数
   * @param estimateSize 预估元素高度
   */
  constructor(estimateSize = 50) {
    this.estimateSize = estimateSize;
  }

  /**
   * 设置性能监控器
   * @param monitor 性能监控器实例
   */
  setPerformanceMonitor(monitor: any): void {
    this.performanceMonitor = monitor;
  }

  /**
   * 获取缓存统计信息
   * @returns 缓存统计
   */
  getCacheStats(): CacheStats {
    const stats = { ...this.stats };

    // 更新性能监控器的缓存命中率
    if (this.performanceMonitor && stats.totalQueries > 0) {
      const hitRate = (stats.hits / stats.totalQueries) * 100;
      this.performanceMonitor.updateCacheHitRate(hitRate);
    }

    return stats;
  }

  /**
   * 设置总数量
   * @param count 总数量
   */
  setTotalCount(count: number): void {
    this.totalCount = count;
  }

  /**
   * 获取动态平均高度
   * @returns 动态平均高度
   */
  getDynamicAverageHeight(): number {
    if (this.measuredCount === 0) {
      return this.estimateSize;
    }
    const averageHeight = this.totalMeasuredHeight / this.measuredCount;
    return Math.round((averageHeight * 1000) / 1000);
  }

  /**
   * 获取元素高度
   * @param index 元素索引
   * @returns 元素高度
   */
  getItemHeight(index: number): number {
    if (index < 0 || index >= this.totalCount) {
      return this.getDynamicAverageHeight();
    }

    const cached = this.getCacheItem(index);
    if (cached) {
      this.recordAccess(index);
      return cached.size;
    }

    // 缓存未命中，返回动态平均高度
    this.stats.misses++;
    this.stats.totalQueries++;
    return this.getDynamicAverageHeight();
  }

  /**
   * 获取总高度
   * @returns 总高度
   */
  getTotalHeight(): number {
    if (this.totalCount === 0) return 0;
    const lastIndex = this.totalCount - 1;
    return this.getOffsetByIndex(lastIndex) + this.getItemHeight(lastIndex);
  }

  /**
   * 获取总元素数量
   * @returns 总元素数量
   */
  getTotalCount(): number {
    return this.totalCount;
  }

  /**
   * 从缓存中获取缓存项
   * @param index 元素索引
   * @returns 缓存项或null
   */
  getCacheItem(index: number): SizeCache | null {
    this.stats.totalQueries++;

    if (this.cache.has(index)) {
      this.stats.hits++;
      return this.cache.get(index)!;
    }

    return null;
  }

  /**
   * 获取元素顶部偏移量
   * @param index 元素索引
   * @returns 顶部偏移量
   */
  getOffsetByIndex(index: number): number {
    // 边界情况处理
    if (index <= 0) return 0;
    if (index >= this.totalCount) {
      // 超出范围时，计算到最后一个元素的偏移量
      if (this.totalCount === 0) return 0;
      const lastIndex = this.totalCount - 1;
      return this.getOffsetByIndex(lastIndex);
    }

    // 首先尝试从缓存中获取精确值
    const cache = this.getCacheItem(index);
    if (cache) {
      return cache.top;
    }

    // 缓存未命中时，使用双向搜索算法找到最近的缓存锚点
    // 这样可以最小化需要累加计算的元素数量
    let forwardCache: { index: number; offset: number } | null = null;
    let backwardCache: { index: number; offset: number } | null = null;

    // 向前搜索：寻找目标索引之前最近的缓存项
    for (let i = index - 1; i >= 0; i--) {
      const item = this.getCacheItem(i);
      if (item) {
        // 找到缓存项，计算其结束位置作为起始偏移量
        forwardCache = { index: i, offset: item.top + item.size };
        break;
      }
    }

    // 向后搜索：寻找目标索引之后最近的缓存项
    for (let i = index + 1; i < this.totalCount; i++) {
      const item = this.getCacheItem(i);
      if (item) {
        backwardCache = { index: i, offset: item.top };
        break;
      }
    }

    // 智能选择计算路径：选择需要累加元素数量更少的路径
    if (forwardCache && backwardCache) {
      const forwardDistance = index - forwardCache.index;
      const backwardDistance = backwardCache.index - index;

      if (forwardDistance <= backwardDistance) {
        // 前向路径更短：从前向缓存点开始向前累加
        let offset = forwardCache.offset;
        for (let i = forwardCache.index + 1; i < index; i++) {
          offset += this.getItemHeight(i);
        }
        return offset;
      } else {
        // 后向路径更短：从后向缓存点开始向后累减
        let offset = backwardCache.offset;
        for (let i = backwardCache.index - 1; i >= index; i--) {
          offset -= this.getItemHeight(i);
        }
        return offset;
      }
    } else if (forwardCache) {
      // 只有前向缓存可用
      let offset = forwardCache.offset;
      for (let i = forwardCache.index + 1; i < index; i++) {
        offset += this.getItemHeight(i);
      }
      return offset;
    } else {
      // 没有任何缓存，从列表开头开始累加计算
      let offset = 0;
      for (let i = 0; i < index; i++) {
        offset += this.getItemHeight(i);
      }
      return offset;
    }
  }

  /**
   * 根据偏移量查找索引
   * @param offset 偏移量
   * @returns 元素索引
   */
  findIndexByOffset(offset: number): number {
    // 边界情况处理
    if (offset <= 0) return 0;
    if (this.totalCount === 0) return 0;

    // 设置浮点数精度容差，避免浮点数计算误差导致的边界问题
    const EPSILON = 1;

    // 使用二分查找算法，时间复杂度O(log n)
    let left = 0;
    let right = this.totalCount - 1;
    let bestMatch = 0;

    while (left <= right) {
      // 计算中点索引
      const mid = Math.floor((left + right) / 2);
      const midOffset = this.getOffsetByIndex(mid);
      const midHeight = this.getItemHeight(mid);
      const midEnd = midOffset + midHeight;

      // 检查目标偏移量是否落在当前元素的范围内
      if (offset >= midOffset - EPSILON && offset < midEnd + EPSILON) {
        // 精确匹配：判断偏移量更接近当前元素的开始还是结束
        if (offset - midOffset < midEnd - offset) {
          // 更接近元素开始位置，返回当前索引
          return mid;
        } else {
          // 更接近元素结束位置，返回下一个索引（但不超过边界）
          return Math.min(mid + 1, this.totalCount - 1);
        }
      } else if (offset < midOffset) {
        // 目标偏移量在当前元素之前，搜索左半部分
        right = mid - 1;
      } else {
        // 目标偏移量在当前元素之后，搜索右半部分
        bestMatch = Math.min(mid + 1, this.totalCount - 1);
        left = mid + 1;
      }
    }

    // 返回最佳匹配索引
    return bestMatch;
  }

  /**
   * 更新元素尺寸
   * @param index 元素索引
   * @param newSize 新尺寸
   */
  updateSize(index: number, newSize: number) {
    if (index < 0 || index >= this.totalCount || newSize <= 0) {
      return 0;
    }
    this.applyUpdate(index, newSize);
  }

  /**
   * 清理缓存
   */
  clear(): void {
    this.cache.clear();
    this.lastAccessTime.clear();
    this.measuredCount = 0;
    this.totalMeasuredHeight = 0;

    // 重置统计
    this.stats = {
      hits: 0,
      misses: 0,
      totalQueries: 0,
    };
  }

  // ==================== 私有方法 ====================

  /**
   * 记录访问
   * @param index 元素索引
   */
  private recordAccess(index: number): void {
    const now = Date.now();
    this.lastAccessTime.set(index, now);
  }

  /**
   * LRU缓存淘汰
   */
  private evictLRU(): void {
    if (this.cache.size === 0) return;
    let evictionCount = 0;
    const maxEvictions = Math.max(1, Math.floor(this.cache.size * 0.1)); // 批量淘汰10%
    const candidates: Array<{ index: number; time: number }> = [];

    // 收集淘汰候选项
    for (const index of this.cache.keys()) {
      const lastAccess = this.lastAccessTime.get(index) || 0;
      candidates.push({ index, time: lastAccess });
    }

    // 按访问时间排序，最久未访问的在前
    candidates.sort((a, b) => a.time - b.time);

    // 批量淘汰，提高缓存效率
    for (let i = 0; i < Math.min(maxEvictions, candidates.length); i++) {
      const candidate = candidates[i];
      this.cache.delete(candidate.index);
      this.lastAccessTime.delete(candidate.index);
      evictionCount++;
    }

    // 更新统计信息
    if (evictionCount > 0) {
      this.measuredCount = Math.max(0, this.measuredCount - evictionCount);
    }
  }

  /**
   * 应用更新
   * @param index 元素索引
   * @param size 新高度
   */
  private applyUpdate(index: number, size: number): void {
    const now = Date.now();
    const oldItem = this.getCacheItem(index);
    const oldHeight = this.getItemHeight(index);
    const heightDelta = size - oldHeight;

    if (Math.abs(heightDelta) < 0.1) return;

    // 更新统计
    if (oldItem) {
      this.totalMeasuredHeight -= oldHeight;
      this.measuredCount--;
    }

    this.totalMeasuredHeight += size;
    this.measuredCount++;

    // 创建新缓存项
    const newItem: SizeCache = {
      index,
      size: size,
      top: this.getOffsetByIndex(index),
    };

    // 检查缓存容量并进行LRU淘汰
    if (this.cache.size >= this.CACHE_SIZE) {
      this.evictLRU();
    }

    // 添加到缓存
    this.cache.set(index, newItem);
    this.lastAccessTime.set(index, now);
    // 更新受影响的后续元素的top值
    if (heightDelta !== 0) {
      this.updateAffectedItemsTop(index + 1, heightDelta);
    }
  }

  /**
   * 更新受影响元素的top值
   * @param startIndex 开始索引
   * @param heightDelta 高度变化量
   */
  private updateAffectedItemsTop(startIndex: number, heightDelta: number = 0): void {
    // 性能优化：使用增量更新而非重新计算，减少O(n²)复杂度
    if (Math.abs(heightDelta) < 0.1) return;

    // 收集并排序受影响的索引（一次遍历）
    const affectedIndices = Array.from(this.cache.keys())
      .filter((index) => index >= startIndex)
      .sort((a, b) => a - b);

    // 批量增量更新：O(n)复杂度，避免重复计算
    for (const index of affectedIndices) {
      const cachedItem = this.cache.get(index);
      if (cachedItem) {
        cachedItem.top += heightDelta;
      }
    }
  }
}
