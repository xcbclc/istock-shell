/**
 * @fileoverview 虚拟列表核心类型定义
 * @description 包含虚拟列表系统的所有接口、类型和回调函数定义
 * @author iStock Shell Team
 * @version 0.1.0
 */

/**
 * @interface VirtualCoreOptions
 * @description 虚拟列表核心引擎的配置选项接口
 *
 * ```
 */
export interface VirtualCoreOptions {
  /** 保持渲染的元素数量 - 可视区域内同时渲染的最大元素数 */
  keeps: number;
  /** 预估元素尺寸 - 用于初始化和动态计算的元素平均高度 */
  estimateSize: number;
  /** 头部区域尺寸 - 列表顶部固定内容的高度 */
  headerSize: number;
  /** 底部区域尺寸 - 列表底部固定内容的高度 */
  footerSize: number;
  /** 总元素数量 - 列表中所有元素的总数 */
  totalCount: number;
  /** 顶部阈值 - 距离顶部多少像素时触发onScrollToTop事件，用于无限滚动加载 */
  thresholdTop?: number;
  /** 底部阈值 - 距离底部多少像素时触发onScrollToBottom事件，用于无限滚动加载 */
  thresholdBottom?: number;
  /** 滚动防抖间隔 - 滚动事件处理的防抖时间间隔（毫秒） */
  scrollDebounce?: number;
}

/**
 * @interface VirtualRange
 * @description 虚拟列表当前渲染范围的详细信息
 */
export interface VirtualRange {
  /** 起始索引 - 当前渲染范围的第一个元素索引 */
  start: number;
  /** 结束索引 - 当前渲染范围的最后一个元素索引 */
  end: number;
  /** 顶部填充高度 - 模拟未渲染元素的占位空间（上方） */
  paddingTop: number;
  /** 底部填充高度 - 模拟未渲染元素的占位空间（下方） */
  paddingBottom: number;
  /** 总高度 - 整个虚拟列表容器的完整高度 */
  totalHeight: number;
}

/**
 * @typedef {Function} RangeUpdateCallback
 * @description 范围更新回调函数类型，当渲染范围发生变化时触发
 * @param {VirtualRange} range - 新的渲染范围信息
 */
export type RangeUpdateCallback = (range: VirtualRange) => void;

/**
 * @typedef {Function} ScrollToTopCallback
 * @description 滚动到顶部回调函数类型，用于无限滚动加载历史数据
 */
export type ScrollToTopCallback = () => void;

/**
 * @typedef {Function} ScrollToBottomCallback
 * @description 滚动到底部回调函数类型，用于标记消息已读或加载更多数据
 * ```
 */
export type ScrollToBottomCallback = () => void;

/**
 * @type ScrollDirection
 * @description 滚动方向类型
 */
export type ScrollDirection = 'up' | 'down' | 'none';
