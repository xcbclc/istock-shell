export type TDecoratorModelOptions = {
  name?: string; // 模型名
};
export type TDecoratorModelMetadata = TDecoratorModelOptions;

export type TDecoratorIndexOptions = {
  indexName?: string;
};
export type TDecoratorIndexMetadata = TDecoratorIndexOptions;

export type TDecoratorColumnOptions = {
  name?: string; // 字段名
  type?: string; // 数据类型
  primary?: boolean; // 是否是主键
  unique?: boolean; // 是否数据唯一
  autoIncrement?: boolean; // 是否自增
};
export type TDecoratorColumnMetadata = TDecoratorColumnOptions;

export type TDecoratorPrimaryColumnOptions = TDecoratorColumnOptions;

export type TDecoratorPrimaryColumnMetadata = TDecoratorPrimaryColumnOptions;

export type TDecoratorAllColumnMetadata = TDecoratorColumnMetadata &
  TDecoratorPrimaryColumnMetadata &
  TDecoratorIndexMetadata;
