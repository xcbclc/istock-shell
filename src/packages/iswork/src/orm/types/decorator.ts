/**
 * @fileoverview 装饰器类型定义
 * @description 定义 ORM 装饰器相关的选项和元数据类型
 */

/**
 * 模型装饰器选项类型
 * @description 定义 @Model 装饰器的配置选项
 * @example
 * ```typescript
 * const options: DecoratorModelOptions = {
 *   name: 'User'
 * };
 * ```
 */
export type DecoratorModelOptions = {
  /** 模型名称 */
  name?: string;
};

/**
 * 模型装饰器元数据类型
 * @description 模型装饰器的元数据类型，与选项类型相同
 */
export type DecoratorModelMetadata = DecoratorModelOptions;

/**
 * 索引装饰器选项类型
 * @description 定义 @Index 装饰器的配置选项
 * @example
 * ```typescript
 * const options: DecoratorIndexOptions = {
 *   indexName: 'idx_user_email'
 * };
 * ```
 */
export type DecoratorIndexOptions = {
  /** 索引名称 */
  indexName?: string;
};

/**
 * 索引装饰器元数据类型
 * @description 索引装饰器的元数据类型，与选项类型相同
 */
export type DecoratorIndexMetadata = DecoratorIndexOptions;

/**
 * 列装饰器选项类型
 * @description 定义 @Column 装饰器的配置选项
 * @example
 * ```typescript
 * const options: DecoratorColumnOptions = {
 *   name: 'user_name',
 *   type: 'varchar',
 *   unique: true
 * };
 * ```
 */
export type DecoratorColumnOptions = {
  /** 字段名称 */
  name?: string;
  /** 数据类型 */
  type?: string;
  /** 是否为主键 */
  primary?: boolean;
  /** 是否数据唯一 */
  unique?: boolean;
  /** 是否自增 */
  autoIncrement?: boolean;
};

/**
 * 列装饰器元数据类型
 * @description 列装饰器的元数据类型，与选项类型相同
 */
export type DecoratorColumnMetadata = DecoratorColumnOptions;

/**
 * 主键列装饰器选项类型
 * @description 定义 @PrimaryColumn 装饰器的配置选项
 */
export type DecoratorPrimaryColumnOptions = DecoratorColumnOptions;

/**
 * 主键列装饰器元数据类型
 * @description 主键列装饰器的元数据类型，与选项类型相同
 */
export type DecoratorPrimaryColumnMetadata = DecoratorPrimaryColumnOptions;

/**
 * 所有列装饰器元数据类型
 * @description 合并所有列相关装饰器的元数据类型
 * @example
 * ```typescript
 * const metadata: DecoratorAllColumnMetadata = {
 *   name: 'id',
 *   type: 'int',
 *   primary: true,
 *   autoIncrement: true,
 *   indexName: 'idx_primary'
 * };
 * ```
 */
export type DecoratorAllColumnMetadata = DecoratorColumnMetadata &
  DecoratorPrimaryColumnMetadata &
  DecoratorIndexMetadata;
