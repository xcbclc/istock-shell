/**
 * 虚拟滚动列表核心方法
 */

export type TVirtualCoreOptions = {
  keeps: number; // 虚拟列表渲染个数
  buffer: number;
  slotHeaderSize: number;
  slotFooterSize: number;
  estimateSize: number;
  uniqueIds: string[];
};

export type TVirtualCoreRange = {
  offset: number;
  start: number; // 开始索引
  end: number; // 结束索引
  padFront: number; // 前填充的大小
  padBehind: number; // 后填充的大小
  totalHeight: number;
};

export enum EDirection {
  'FRONT', // 向前或向前滚动
  'BEHIND', // 向后或向下滚动
}
export enum ECalcType {
  'INIT',
  'FIXED',
  'DYNAMIC',
}

export type TVirtualCoreCallUpdate = (range: TVirtualCoreRange) => void;

const LEADING_BUFFER = 0;

export class VirtualCore {
  #param!: TVirtualCoreOptions;
  #callUpdate!: TVirtualCoreCallUpdate;
  #sizeMap!: Map<string, number>;
  #firstRangeTotalSize!: number;
  #firstRangeAverageSize!: number;
  #fixedSizeValue!: number;
  // 计算方式 初始值(仅初始化用)、固定值、动态值
  #calcType!: ECalcType;
  #offset!: number;
  // 滚动方向
  #direction!: EDirection | null;
  // 范围信息
  #range!: TVirtualCoreRange;

  constructor(param: TVirtualCoreOptions, callUpdate: TVirtualCoreCallUpdate = () => {}) {
    this.#init(param, callUpdate);
  }

  #init(param: TVirtualCoreOptions, callUpdate: TVirtualCoreCallUpdate) {
    this.#param = param;
    this.#callUpdate = callUpdate;

    this.#sizeMap = new Map();
    this.#firstRangeAverageSize = 0;
    this.#fixedSizeValue = 0;
    this.#calcType = ECalcType.INIT;

    this.#offset = 0;
    this.#direction = null;

    this.#range = Object.create(null);
    if (param) {
      this.checkRange(0, param.keeps - 1);
    }
  }

  /**
   * 获取被渲染元素总个数
   */
  getSizes() {
    return this.#sizeMap.size;
  }

  /**
   * 通过id获取元素尺寸
   * @param id
   */
  getSizeById(id: string) {
    return this.#sizeMap.get(id);
  }

  /**
   * 返回当前渲染的范围
   */
  getRange(): TVirtualCoreRange {
    return { ...this.#range };
  }

  /**
   * 是否向后或向下滚动
   */
  isBehind(): boolean {
    return this.#direction === EDirection.BEHIND;
  }

  /**
   * 是否向前或向前滚动
   */
  isFront(): boolean {
    return this.#direction === EDirection.FRONT;
  }

  /**
   * 是否是固定值计算方式
   */
  isFixedType(): boolean {
    return this.#calcType === ECalcType.FIXED;
  }

  /**
   * 获取最后一个值索引
   */
  getLastIndex(): number {
    return this.#param.uniqueIds.length - 1;
  }

  /**
   * 根据开始索引计算偏移量，并加上 slot 头部的大小
   * @param start
   */
  getOffset(start: number): number {
    return (start < 1 ? 0 : this.getIndexOffset(start)) + this.#param.slotHeaderSize;
  }

  /**
   * 真实渲染个数的最后位置
   * @param start
   */
  getEndByStart(start: number): number {
    const theoryEnd = start + this.#param.keeps - 1;
    return Math.min(theoryEnd, this.getLastIndex());
  }

  /**
   * 获取向前或向上填充值
   */
  getPadFront(): number {
    return this.isFixedType() ? this.#fixedSizeValue * this.#range.start : this.getIndexOffset(this.#range.start);
  }

  /**
   * 获取向后或向下的填充值
   */
  getPadBehind(): number {
    const end = this.#range.end;
    const lastIndex = this.getLastIndex();
    return this.isFixedType() ? (lastIndex - end) * this.#fixedSizeValue : (lastIndex - end) * this.getEstimateSize();
  }

  /**
   * 获取总共高度
   */
  getTotalHeight() {
    const lastIndex = this.getLastIndex();
    const height = this.isFixedType() ? this.#fixedSizeValue * lastIndex : this.getIndexOffset(lastIndex);
    if (this.#range.end === lastIndex) return height;
    return Math.max(height, this.#range.totalHeight ?? 0);
  }

  /**
   * 获取预估值
   */
  getEstimateSize(): number {
    return this.isFixedType() ? this.#fixedSizeValue : this.#firstRangeAverageSize || this.#param.estimateSize;
  }

  /**
   * 通过key设置Param字段的值
   * @param key
   * @param value
   */
  updateParam(key: keyof TVirtualCoreOptions, value: any) {
    if (!(key in this.#param)) return;
    if (key === 'uniqueIds') {
      this.#sizeMap.forEach((_v, k) => {
        if (!value.includes(k)) {
          this.#sizeMap.delete(k);
        }
      });
    }
    this.#param[key] = value;
  }

  /**
   * 通过id保存元素的大小，并根据大小变化更新计算类型（固定大小或动态大小）
   * @param id
   * @param size
   */
  saveSize(id: string, size: number) {
    this.#sizeMap.set(id, size);
    // 修正计算方式
    if (this.#calcType === ECalcType.INIT) {
      this.#fixedSizeValue = size;
      this.#calcType = ECalcType.FIXED;
    } else if (this.#calcType === ECalcType.FIXED && this.#fixedSizeValue !== size) {
      this.#calcType = ECalcType.DYNAMIC;
    }

    if (this.#calcType !== ECalcType.FIXED) {
      if (this.#sizeMap.size < Math.min(this.#param.keeps, this.#param.uniqueIds.length)) {
        this.#firstRangeTotalSize = [...this.#sizeMap.values()].reduce((acc, val) => acc + val, 0);
        this.#firstRangeAverageSize = Math.round(this.#firstRangeTotalSize / this.#sizeMap.size);
      }
    }
  }

  /**
   * 批量保存元素的大小，动态计算时调用
   * @param list
   */
  batchSaveSize(list: Array<{ id: string; size: number }>) {
    list.forEach(({ id, size }) => {
      this.#sizeMap.set(id, size);
    });
    if (this.#calcType !== ECalcType.DYNAMIC) {
      this.#calcType = ECalcType.DYNAMIC;
    }
    // 重新算值
    if (this.#sizeMap.size < Math.min(this.#param.keeps, this.#param.uniqueIds.length)) {
      this.#firstRangeTotalSize = [...this.#sizeMap.values()].reduce((acc, val) => acc + val, 0);
      this.#firstRangeAverageSize = Math.round(this.#firstRangeTotalSize / this.#sizeMap.size);
    }
  }

  /**
   * 数据源变化时，根据当前滚动方向调整开始索引，并更新渲染范围。
   */
  handleDataSourcesChange() {
    let start = this.#range.start;

    if (this.isFront()) {
      start -= LEADING_BUFFER;
    } else if (this.isBehind()) {
      start += LEADING_BUFFER;
    }

    start = Math.max(start, 0);

    this.updateRange(start, this.getEndByStart(start));
  }

  /**
   * 当元素尺寸有变化时，需要调整开始索引并更新渲染范围
   */
  handleSlotSizeChange() {
    this.handleDataSourcesChange();
  }

  /**
   * 根据滚动偏移量处理滚动事件，更新当前滚动方向，并处理前后滚动
   * @param offset
   */
  handleScroll(offset: number) {
    this.#direction = offset < this.#offset || offset === 0 ? EDirection.FRONT : EDirection.BEHIND;
    this.#offset = offset;

    if (this.#direction === EDirection.FRONT) {
      this.handleFront();
    } else if (this.#direction === EDirection.BEHIND) {
      this.handleBehind();
    }
  }

  /**
   * 处理向前或向上滚动，根据滚动超过的元素数量调整渲染范围
   */
  handleFront() {
    const overs = this.getScrollOvers();
    if (overs > this.#range.start) {
      return;
    }

    const start = Math.max(overs - this.#param.buffer, 0);
    this.checkRange(start, this.getEndByStart(start));
  }

  /**
   * 处理向后或向下滚动，根据滚动超过的元素数量调整渲染范围
   */
  handleBehind() {
    const overs = this.getScrollOvers();
    if (overs < this.#range.start + this.#param.buffer) {
      return;
    }

    this.checkRange(overs, this.getEndByStart(overs));
  }

  /**
   * 获取滚动超过的元素数量
   */
  getScrollOvers(): number {
    const offset = this.#offset - this.#param.slotHeaderSize;
    if (offset <= 0) {
      return 0;
    }

    if (this.isFixedType()) {
      return Math.floor(offset / this.#fixedSizeValue);
    }

    let low = 0;
    let middle = 0;
    let middleOffset = 0;
    let high = this.#param.uniqueIds.length;

    while (low <= high) {
      middle = low + Math.floor((high - low) / 2);
      middleOffset = this.getIndexOffset(middle);

      if (middleOffset === offset) {
        return middle;
      } else if (middleOffset < offset) {
        low = middle + 1;
      } else if (middleOffset > offset) {
        high = middle - 1;
      }
    }

    return low > 0 ? --low : 0;
  }

  /**
   * 计算当前偏移距起始位置距离
   * @param givenIndex
   */
  getIndexOffset(givenIndex: number): number {
    if (!givenIndex) {
      return 0;
    }

    let offset = 0;
    let indexSize = 0;
    for (let index = 0; index < givenIndex; index++) {
      indexSize = this.#sizeMap.get(this.#param.uniqueIds[index]) ?? this.getEstimateSize();
      offset += typeof indexSize === 'number' ? indexSize : this.getEstimateSize();
    }

    return Number(offset.toFixed(2));
  }

  /**
   * 检查当前范围是否需要更新
   * @param start
   * @param end
   */
  checkRange(start: number, end: number) {
    const keeps = this.#param.keeps;
    const total = this.#param.uniqueIds.length;

    if (total <= keeps) {
      start = 0;
      end = this.getLastIndex();
    } else if (end - start < keeps - 1) {
      start = end - keeps + 1;
    }

    if (this.#range.start !== start) {
      this.updateRange(start, end);
    }
  }

  /**
   * 更新范围信息
   * @param start
   * @param end
   */
  updateRange(start: number, end: number) {
    this.#range.offset = this.#offset;
    this.#range.start = start;
    this.#range.end = end;
    this.#range.padFront = this.getPadFront();
    this.#range.padBehind = this.getPadBehind();
    this.#range.totalHeight = this.getTotalHeight();
    this.#callUpdate(this.getRange());
  }
}
