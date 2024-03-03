export type TScanClassMetadata<Value = unknown> = Map<string | symbol, Value>;
export type TScanPropertyMetadata<Value = unknown> = Array<[string | symbol, string | symbol, Value]>;
export type TScanPropertyMetadataMapValue<Value = unknown> = {
  info: Record<string | symbol, Value>;
  list: Array<[string | symbol, Value]>;
};
export type TScanPropertyMetadataMap<Value = unknown> = Map<string | symbol, TScanPropertyMetadataMapValue<Value>>;
