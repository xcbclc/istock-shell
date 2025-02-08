import { EventEmitter } from '@istock/util';
import { VirtualCore, type TVirtualCoreOptions, type TVirtualCoreRange } from './virtual-core';

export enum EVirtualDirection {
  'horizontal',
  'vertical',
}

export type TVirtualOptions = {
  keeps: number;
  dataSources: any[];
  scrollElement?: HTMLElement;
  shepherdElement?: HTMLElement;
  direction?: EVirtualDirection;
  dataKey?: string | Function;
  topThreshold?: number;
  bottomThreshold?: number;
};

export class Virtual {
  #virtualCore!: VirtualCore;
  #eventEmitter!: EventEmitter;
  #scrollElement: HTMLElement = document.body;
  readonly #shepherdElement: HTMLElement | null = null;
  readonly #direction: EVirtualDirection = EVirtualDirection.vertical;
  #scrollOffsetKey!: 'scrollLeft' | 'scrollTop';
  #dataSources: any[] = [];
  readonly #dataKey: string | Function = 'id';
  readonly #topThreshold: number = 0;
  readonly #bottomThreshold: number = 0;
  constructor(options: TVirtualOptions & Partial<TVirtualCoreOptions>) {
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
    if (this.#direction === EVirtualDirection.horizontal) {
      this.#scrollOffsetKey = 'scrollLeft';
    }
    if (this.#direction === EVirtualDirection.vertical) {
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

  initVirtualCore(coreOptions: TVirtualCoreOptions) {
    this.#virtualCore = new VirtualCore(coreOptions, (range: TVirtualCoreRange) => {
      this.onRangeChanged(range);
    });
    this.onRangeChanged(this.#virtualCore.getRange());
  }

  initEvents() {
    this.#eventEmitter = new EventEmitter();
  }

  isVertical() {
    return this.#direction === EVirtualDirection.vertical;
  }

  /**
   * 同步数据列表
   * @param dataSources
   */
  syncDataSources(dataSources: any[]) {
    this.#dataSources = dataSources;
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
  getClientSize() {
    let key: 'clientWidth' | 'clientHeight' = 'clientWidth';
    if (this.#direction === EVirtualDirection.vertical) {
      key = 'clientHeight';
    }
    return Math.ceil(this.#scrollElement[key] ?? 0);
  }

  /**
   * 获取滚动元素容器的宽或高
   */
  getScrollSize() {
    let key: 'scrollWidth' | 'scrollHeight' = 'scrollWidth';
    if (this.#direction === EVirtualDirection.vertical) {
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
   * 设置滚动到底部
   */
  scrollToBottom() {
    let offset: number = 0;
    if (this.#shepherdElement) {
      let key: 'offsetLeft' | 'offsetTop' = 'offsetLeft';
      if (this.#direction === EVirtualDirection.vertical) key = 'offsetTop';
      offset = this.#shepherdElement[key];
    } else {
      offset = this.getScrollSize();
    }
    this.scrollToOffset(offset);

    // 确认是否真的滚动到底部，没有再次执行滚动到底部
    setTimeout(() => {
      if (this.getOffset() + this.getClientSize() + 1 < this.getScrollSize()) {
        this.scrollToBottom();
      }
    }, 3);
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
        if (this.#direction === EVirtualDirection.horizontal) {
          offsetFront = rect.left + defaultView.pageXOffset;
        }
        if (this.#direction === EVirtualDirection.vertical) {
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
  onRangeChanged(range: TVirtualCoreRange) {
    void this.#eventEmitter.emit('syncRange', range);
  }

  /**
   * 滚动事件处理
   * @param evt
   */
  onScroll(evt: Event) {
    const offset = this.getOffset();
    const clientSize = this.getClientSize();
    const scrollSize = this.getScrollSize();

    // iOS滚动回弹行为会导致方向错误
    if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
      return;
    }
    window.requestAnimationFrame(() => {
      this.#virtualCore.handleScroll(offset);
      this.emitEvent(offset, clientSize, scrollSize, evt);
    });
  }

  // emit event in special position
  emitEvent(offset: number, clientSize: number, scrollSize: number, evt: Event) {
    void this.#eventEmitter.emit('scroll', {
      event: evt,
      range: this.#virtualCore.getRange(),
    });

    if (this.#virtualCore.isFront() && Boolean(this.#dataSources.length) && offset - this.#topThreshold <= 0) {
      void this.#eventEmitter.emit('scrollToTop');
    } else if (this.#virtualCore.isBehind() && offset + clientSize + this.#bottomThreshold >= scrollSize) {
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
