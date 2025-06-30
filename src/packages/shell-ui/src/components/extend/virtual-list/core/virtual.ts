import { EventEmitter } from '@istock-shell/util';
import { VirtualCore, type VirtualCoreOptions, type VirtualCoreRange } from './virtual-core';

export enum VirtualDirection {
  'horizontal',
  'vertical',
}

export type TVirtualOptions = {
  keeps: number;
  dataSources: any[];
  scrollElement?: HTMLElement;
  shepherdElement?: HTMLElement;
  direction?: VirtualDirection;
  dataKey?: string | Function;
  topThreshold?: number;
  bottomThreshold?: number;
};

/**
 * 虚拟滚动封装类，负责DOM交互和事件处理
 *
 * 主要职责：
 * 1. 连接虚拟核心与真实DOM元素
 * 2. 处理滚动事件和尺寸变化
 * 3. 提供对外的事件接口
 * 4. 实现智能滚动定位功能
 */
export class Virtual {
  #virtualCore!: VirtualCore; // 虚拟滚动核心实例
  #eventEmitter!: EventEmitter; // 事件发射器
  #scrollElement: HTMLElement = document.body; // 滚动容器元素
  readonly #shepherdElement: HTMLElement | null = null; // 滚动定位锚点元素
  readonly #direction: VirtualDirection = VirtualDirection.vertical; // 滚动方向
  #scrollOffsetKey!: 'scrollLeft' | 'scrollTop'; // 滚动位置属性名
  #dataSources: any[] = [];
  readonly #dataKey: string | Function = 'id';
  #topThreshold: number = 0;
  #bottomThreshold: number = 0;

  constructor(options: TVirtualOptions & Partial<VirtualCoreOptions>) {
    const {
      keeps,
      dataSources,
      scrollElement,
      shepherdElement,
      direction,
      dataKey,
      topThreshold,
      bottomThreshold,
      ...coreOptions
    } = options;
    if (dataSources) this.#dataSources = dataSources;
    if (scrollElement) this.#scrollElement = scrollElement;
    if (shepherdElement) this.#shepherdElement = shepherdElement;
    this.#direction = direction ?? this.#direction;
    if (this.#direction === VirtualDirection.horizontal) {
      this.#scrollOffsetKey = 'scrollLeft';
    }
    if (this.#direction === VirtualDirection.vertical) {
      this.#scrollOffsetKey = 'scrollTop';
    }
    this.#dataKey = dataKey ?? this.#dataKey;
    this.#topThreshold = topThreshold ?? this.#topThreshold;
    this.#bottomThreshold = bottomThreshold ?? this.#bottomThreshold;

    this.initEvents();
    this.initVirtualCore({
      ...{
        slotHeaderSize: 0,
        slotFooterSize: 0,
        keeps,
        estimateSize: 0,
        buffer: Math.round(keeps / 3), // recommend for a third of keeps
        uniqueIds: this.getUniqueIdFromDataSources(),
      },
      ...coreOptions,
    });
  }

  get core() {
    return this.#virtualCore;
  }

  get eventEmitter() {
    return this.#eventEmitter;
  }

  setTopThreshold(topThreshold: number) {
    this.#topThreshold = topThreshold;
  }

  setBottomThreshold(bottomThreshold: number) {
    this.#bottomThreshold = bottomThreshold;
  }

  initVirtualCore(coreOptions: VirtualCoreOptions) {
    this.#virtualCore = new VirtualCore(coreOptions, (range: VirtualCoreRange) => {
      this.onRangeChanged(range);
    });
    this.onRangeChanged(this.#virtualCore.getRange());
  }

  initEvents() {
    this.#eventEmitter = new EventEmitter();
  }

  isVertical() {
    return this.#direction === VirtualDirection.vertical;
  }

  /**
   * 同步数据列表
   * @param dataSources
   */
  syncDataSources(dataSources: any[]) {
    this.#dataSources = dataSources;
    this.#virtualCore.updateParam('uniqueIds', this.getUniqueIdFromDataSources());
    this.#virtualCore.handleDataSourcesChange();
  }

  /**
   * 获取滚动元素滚动的位置
   */
  getOffset() {
    return Math.ceil(this.#scrollElement[this.#scrollOffsetKey] ?? 0);
  }

  /**
   * 获取滚动元素容器视口的宽或高
   */
  getClientSize(element: HTMLElement = this.#scrollElement) {
    let key: 'clientWidth' | 'clientHeight' = 'clientWidth';
    if (this.#direction === VirtualDirection.vertical) {
      key = 'clientHeight';
    }
    return Math.ceil(element[key] ?? 0);
  }

  /**
   * 获取滚动元素容器的宽或高
   */
  getScrollSize() {
    let key: 'scrollWidth' | 'scrollHeight' = 'scrollWidth';
    if (this.#direction === VirtualDirection.vertical) {
      key = 'scrollHeight';
    }
    return Math.ceil(this.#scrollElement[key] ?? 0);
  }

  /**
   * 设置当前滚动元素容器的滚动距离
   * @param offset
   */
  scrollToOffset(offset: number) {
    if (!offset) offset = 0;
    this.#scrollElement[this.#scrollOffsetKey] = offset;
  }

  /**
   * 按列表数据索引设置滚动位置
   * @param index
   */
  scrollToIndex(index: number) {
    // scroll to bottom
    if (index >= this.#dataSources.length - 1) {
      this.scrollToBottom();
    } else {
      const offset = this.#virtualCore.getOffset(index);
      this.scrollToOffset(offset);
    }
  }

  /**
   * 滚动到底部的智能处理
   *
   * 实现特点：
   * 1. 使用递归requestAnimationFrame保证滚动到位
   * 2. 1px容差处理防止无限循环
   * 3. 支持锚点元素定位模式
   *
   * 使用场景：
   * - 聊天消息自动滚动到底部
   * - 实时数据追加保持可视区位置
   */
  scrollToBottom() {
    const scroll = () => {
      // 计算目标偏移量（考虑锚点元素）
      const offset = this.#shepherdElement
        ? this.getScrollSize() - this.getClientSize(this.#shepherdElement) // 锚点模式
        : this.getScrollSize(); // 直接到底模式

      this.scrollToOffset(offset);

      // 递归检测直到完全滚动到位（1px容差）
      if (this.getOffset() + this.getClientSize() + 1 < this.getScrollSize()) {
        requestAnimationFrame(scroll);
      }
    };
    requestAnimationFrame(scroll);
  }

  /**
   * 使用页面模式时，手动更新slot头大小
   */
  updatePageModeFront() {
    const ele = this.#scrollElement;
    if (ele) {
      const rect = ele.getBoundingClientRect();
      const { defaultView } = ele.ownerDocument;
      let offsetFront = 0;
      if (defaultView) {
        if (this.#direction === VirtualDirection.horizontal) {
          offsetFront = rect.left + defaultView.pageXOffset;
        }
        if (this.#direction === VirtualDirection.vertical) {
          offsetFront = rect.top + defaultView.pageYOffset;
        }
      }
      this.#virtualCore.updateParam('slotHeaderSize', offsetFront);
    }
  }

  // ----------- public method end -----------
  getUniqueIdFromDataSources() {
    const dataKey = this.#dataKey;
    return this.#dataSources.map((data, index) =>
      typeof dataKey === 'function' ? dataKey(data, index) : data[dataKey]
    );
  }

  /**
   * 对外部暴露元素尺寸更改完成事件
   * @param id
   * @param size
   */
  onItemResized(id: string, size: number) {
    this.#virtualCore.saveSize(id, size);
    void this.#eventEmitter.emit('resized', {
      id,
      size,
    });
  }

  /**
   * 对外部暴露插槽尺寸更改完成事件
   * @param type
   * @param size
   * @param hasInit
   */
  onSlotResized(type: 'header' | 'footer', size: number, hasInit: boolean) {
    if (type === 'header') {
      this.#virtualCore.updateParam('slotHeaderSize', size);
    }
    if (type === 'footer') {
      this.#virtualCore.updateParam('slotFooterSize', size);
    }

    if (hasInit) {
      this.#virtualCore.handleSlotSizeChange();
    }
  }

  /**
   * 触发range更新给外部使用
   * @param range
   */
  onRangeChanged(range: VirtualCoreRange) {
    void this.#eventEmitter.emit('syncRange', range);
  }

  /**
   * 滚动事件处理中枢
   *
   * 处理流程：
   * 1. 获取关键指标：偏移量、可视尺寸、滚动尺寸
   * 2. 过滤无效滚动（iOS弹性滚动）
   * 3. 使用RAF节流处理保证性能
   * 4. 分发到虚拟核心计算
   * 5. 触发阈值事件通知
   */
  onScroll(evt: Event) {
    const offset = this.getOffset();
    const clientSize = this.getClientSize();
    const scrollSize = this.getScrollSize();

    // 过滤无效滚动（iOS弹性滚动边界值）
    if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
      return;
    }

    // 使用RAF保证渲染性能
    window.requestAnimationFrame(() => {
      this.#virtualCore.handleScroll(offset);
      this.emitEvent(offset, clientSize, scrollSize, evt);
    });
  }

  /**
   * 触发阈值事件
   * @param offset - 当前滚动偏移
   * @param clientSize - 可视区域尺寸
   * @param scrollSize - 总滚动尺寸
   * @param evt - 原始事件对象
   */
  emitEvent(offset: number, clientSize: number, scrollSize: number, evt: Event) {
    // 基础滚动事件
    void this.#eventEmitter.emit('scroll', {
      event: evt,
      range: this.#virtualCore.getRange(),
    });

    // 顶部阈值触发
    if (
      this.#virtualCore.isFront() &&
      this.#dataSources.length > 0 &&
      offset - this.#topThreshold <= 0
    ) {
      void this.#eventEmitter.emit('scrollToTop');
    }
    // 底部阈值触发
    else if (
      this.#virtualCore.isBehind() &&
      offset + clientSize + this.#bottomThreshold >= scrollSize
    ) {
      void this.#eventEmitter.emit('scrollToBottom');
    }
  }

  destroy() {
    this.#eventEmitter.off('resized');
    this.#eventEmitter.off('syncRange');
    this.#eventEmitter.off('scroll');
    this.#eventEmitter.off('scrollToTop');
    this.#eventEmitter.off('scrollToBottom');
  }
}
