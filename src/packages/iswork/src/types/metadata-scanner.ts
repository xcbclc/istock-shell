/**
 * @fileoverview 元数据扫描器类型定义
 * @description 定义元数据扫描相关的类型，用于扫描和管理类和属性的元数据
 */

/**
 * 类元数据扫描结果类型
 * @description 用于存储类级别的元数据扫描结果
 * @template Value 元数据值的类型，默认为 unknown
 */
export type ScanClassMetadata<Value = unknown> = Map<string | symbol, Value>;

/**
 * 属性元数据扫描结果类型
 * @description 用于存储属性级别的元数据扫描结果，每个元素包含类键、属性键和值
 * @template Value 元数据值的类型，默认为 unknown
 */
export type ScanPropertyMetadata<Value = unknown> = Array<[string | symbol, string | symbol, Value]>;

/**
 * 属性元数据映射值类型
 * @description 用于存储属性元数据的映射值，包含信息记录和列表
 * @template Value 元数据值的类型，默认为 unknown
 */
export type ScanPropertyMetadataMapValue<Value = unknown> = {
  /** 属性元数据信息记录 */
  info: Record<string | symbol, Value>;
  /** 属性元数据列表 */
  list: Array<[string | symbol, Value]>;
};

/**
 * 属性元数据映射类型
 * @description 用于存储属性元数据的完整映射结构
 * @template Value 元数据值的类型，默认为 unknown
 */
export type ScanPropertyMetadataMap<Value = unknown> = Map<string | symbol, ScanPropertyMetadataMapValue<Value>>;
