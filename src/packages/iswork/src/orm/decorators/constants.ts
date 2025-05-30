/**
 * @fileoverview ORM 装饰器常量定义
 * @description 定义 ORM 装饰器使用的元数据键常量
 */

/**
 * 模型元数据键
 * @description 用于存储模型装饰器元数据的 Symbol 键
 */
export const ORM_MODEL = Symbol('orm.model');

/**
 * 列元数据键
 * @description 用于存储列装饰器元数据的 Symbol 键
 */
export const ORM_COLUMN = Symbol('orm.column');

/**
 * 索引元数据键
 * @description 用于存储索引装饰器元数据的 Symbol 键
 */
export const ORM_INDEX = Symbol('orm.index');

/**
 * 列集合元数据键
 * @description 用于存储所有列装饰器元数据集合的 Symbol 键
 */
export const ORM_COLUMNS = Symbol('orm.columns');
