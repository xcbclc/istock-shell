/**
 * 虚拟滚动列表核心方法
 */

export interface VirtualCoreOptions {
  keeps: number; // 虚拟列表渲染个数
  buffer: number;
  slotHeaderSize: number;
  slotFooterSize: number;
  estimateSize: number;
  uniqueIds: string[];
}

export interface VirtualCoreRange {
  offset: number;
  start: number; // 开始索引
  end: number; // 结束索引
  padFront: number; // 前填充的大小
  padBehind: number; // 后填充的大小
  totalHeight: number;
}

export enum VirtualCoreDirection {
  'FRONT', // 向前或向前滚动
  'BEHIND', // 向后或向下滚动
}

export enum VirtualCalcType {
  'INIT',
  'FIXED',
  'DYNAMIC',
}

export type VirtualCoreCallUpdate = (range: VirtualCoreRange) => void;

const LEADING_BUFFER = 0;

/**
 * 虚拟滚动核心类，负责计算和管理虚拟列表的渲染范围
 *
 * 核心功能：
 * 1. 动态计算可视区域需要渲染的元素
 * 2. 维护元素尺寸缓存用于精确计算
 * 3. 处理滚动事件并优化渲染性能
 * 4. 提供填充量计算保持滚动条比例
 */
export class VirtualCore {
  #param!: VirtualCoreOptions; // 配置参数对象
  #callUpdate!: VirtualCoreCallUpdate; // 范围更新回调函数
  #sizeMap!: Map<string, number>; // 元素ID到尺寸的映射表
  #firstRangeTotalSize!: number; // 首屏元素总尺寸（用于动态计算）
  #firstRangeAverageSize!: number; // 首屏元素平均尺寸（动态计算初始值）
  #fixedSizeValue!: number; // 固定尺寸模式下的元素尺寸
  #calcType!: VirtualCalcType; // 尺寸计算类型（初始化/固定/动态）
  #offset!: number; // 当前滚动偏移量
  #direction!: VirtualCoreDirection | null; // 当前滚动方向
  #range!: VirtualCoreRange; // 当前渲染范围信息

  constructor(param: VirtualCoreOptions, callUpdate: VirtualCoreCallUpdate = () => {}) {
    this.#init(param, callUpdate);
  }

  #init(param: VirtualCoreOptions, callUpdate: VirtualCoreCallUpdate) {
    this.#param = param;
    this.#callUpdate = callUpdate;

    this.#sizeMap = new Map();
    this.#firstRangeAverageSize = 0;
    this.#fixedSizeValue = 0;
    this.#calcType = VirtualCalcType.INIT;

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
  getRange(): VirtualCoreRange {
    return { ...this.#range };
  }

  /**
   * 是否向后或向下滚动
   */
  isBehind(): boolean {
    return this.#direction === VirtualCoreDirection.BEHIND;
  }

  /**
   * 是否向前或向前滚动
   */
  isFront(): boolean {
    return this.#direction === VirtualCoreDirection.FRONT;
  }

  /**
   * 是否是固定值计算方式
   */
  isFixedType(): boolean {
    return this.#calcType === VirtualCalcType.FIXED;
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
  updateParam(key: keyof VirtualCoreOptions, value: any) {
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
    if (this.#calcType === VirtualCalcType.INIT) {
      this.#fixedSizeValue = size;
      this.#calcType = VirtualCalcType.FIXED;
    } else if (this.#calcType === VirtualCalcType.FIXED && this.#fixedSizeValue !== size) {
      this.#calcType = VirtualCalcType.DYNAMIC;
    }

    if (this.#calcType !== VirtualCalcType.FIXED) {
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
    if (this.#calcType !== VirtualCalcType.DYNAMIC) {
      this.#calcType = VirtualCalcType.DYNAMIC;
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
   * 处理滚动事件的核心方法
   * @param offset - 当前滚动偏移量（相对于滚动容器顶部/左侧）
   *
   * 实现要点：
   * 1. 方向判断：通过比较新旧偏移量确定滚动方向
   * 2. 偏移量更新：记录最新滚动位置
   * 3. 方向路由：根据方向调用对应处理逻辑
   * 4. 性能优化：避免不必要的范围计算
   */
  handleScroll(offset: number) {
    // 方向判断：新偏移小于旧偏移或归零时为向上/左滚动
    this.#direction = offset < this.#offset || offset === 0 ? VirtualCoreDirection.FRONT : VirtualCoreDirection.BEHIND;
    this.#offset = offset; // 更新当前滚动位置

    // 根据滚动方向执行不同处理逻辑
    if (this.#direction === VirtualCoreDirection.FRONT) {
      this.handleFront();
    } else if (this.#direction === VirtualCoreDirection.BEHIND) {
      this.handleBehind();
    }
  }

  /**
   * 处理向前滚动（用户向上或向左滚动）
   *
   * 实现逻辑：
   * 1. 计算当前滚动超过的元素数量
   * 2. 根据缓冲值调整新的起始位置
   * 3. 校验并更新渲染范围
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
   * 处理向后滚动（用户向下或向右滚动）
   *
   * 实现逻辑：
   * 1. 计算当前滚动超过的元素数量
   * 2. 当滚动超过缓冲区域时调整起始位置
   * 3. 校验并更新渲染范围
   */
  handleBehind() {
    const overs = this.getScrollOvers();
    if (overs < this.#range.start + this.#param.buffer) {
      return;
    }

    this.checkRange(overs, this.getEndByStart(overs));
  }

  /**
   * 获取滚动超过的元素数量（二分查找优化）
   * @returns 当前视口上方/左侧已滚过的元素数量
   *
   * 算法选择：
   * - 固定尺寸：直接数学计算 O(1)
   * - 动态尺寸：二分查找 O(log n)
   *
   * 边界处理：
   * - 处理header偏移量
   * - 处理负偏移和零偏移
   * - 处理浮点数精度问题
   */
  getScrollOvers(): number {
    const offset = this.#offset - this.#param.slotHeaderSize;
    if (offset <= 0) return 0;

    // 固定尺寸模式快速计算
    if (this.isFixedType()) {
      return Math.floor(offset / this.#fixedSizeValue);
    }

    // 动态尺寸二分查找
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
      } else {
        high = middle - 1;
      }
    }

    return low > 0 ? --low : 0;
  }

  /**
   * 动态尺寸索引偏移计算
   * @param givenIndex - 目标元素索引
   * @returns 累计偏移量（保留两位小数）
   *
   * 优化策略：
   * - 使用缓存尺寸提升性能
   * - 自动回退到预估尺寸
   * - 浮点数精度控制
   */
  getIndexOffset(givenIndex: number): number {
    if (!givenIndex) return 0;

    let offset = 0;
    const estimateSize = this.getEstimateSize(); // 获取预估尺寸
    for (let index = 0; index < givenIndex; index++) {
      const id = this.#param.uniqueIds[index];
      // 优先使用缓存尺寸，无缓存时使用预估尺寸
      offset += this.#sizeMap.get(id) ?? estimateSize;
    }
    return Number(offset.toFixed(2)); // 控制精度防止误差累积
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
   * 更新渲染范围并触发回调
   *
   * @param start - 新的起始索引
   * @param end - 新的结束索引
   *
   * 更新策略：
   * 1. 计算前后填充量保持滚动条位置稳定
   * 2. 计算总高度确保滚动条尺寸正确
   * 3. 触发外部回调通知范围变化
   */
  updateRange(start: number, end: number) {
    this.#range.offset = this.#offset;
    this.#range.start = start;
    this.#range.end = end;
    // 计算前后填充量（虚拟滚动核心）
    this.#range.padFront = this.getPadFront();
    this.#range.padBehind = this.getPadBehind();
    // 计算总高度（用于正确渲染滚动条）
    this.#range.totalHeight = this.getTotalHeight();
    // 触发外部更新回调
    this.#callUpdate(this.getRange());
  }
}
