export type TDecoratorModelOptions = {
  name?: string;
};
export type TDecoratorModelMetadata = TDecoratorModelOptions;

export type TDecoratorIndexOptions = {
  indexName?: string;
};
export type TDecoratorIndexMetadata = TDecoratorIndexOptions;

export type TDecoratorColumnOptions = {
  name?: string;
  type?: string;
  primary?: boolean;
  unique?: boolean;
  autoIncrement?: boolean;
};
export type TDecoratorColumnMetadata = TDecoratorColumnOptions;

export type TDecoratorPrimaryColumnOptions = TDecoratorColumnOptions;

export type TDecoratorPrimaryColumnMetadata = TDecoratorPrimaryColumnOptions;

export type TDecoratorAllColumnMetadata = TDecoratorColumnMetadata &
  TDecoratorPrimaryColumnMetadata &
  TDecoratorIndexMetadata;
