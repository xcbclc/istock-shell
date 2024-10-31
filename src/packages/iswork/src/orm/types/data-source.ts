import type { TModelType, TFetchWrapOptions } from '../types';

export type TDataSourceType = 'indexedDB' | 'fetch' | 'memoryDB';

export type TDataSourceCommonOptions = {
  name: string; // 数据源名
  type: TDataSourceType; // 数据源类型
  entities: TModelType[]; // 数据源模型
  dbName?: string; // 数据库名
  version?: number | string; // 数据源版本
};

export type TDataSourceIndexedDBOptions = {
  dbName: string;
  version: number;
} & TDataSourceCommonOptions;

export type TDataSourceFetchOptions = TFetchWrapOptions & TDataSourceCommonOptions;

export type TDataSourceMemoryDBOptions = {
  dbName: string;
} & TDataSourceCommonOptions;

export type TDataSourceAllOptions = {
  indexedDB: TDataSourceIndexedDBOptions;
  fetch: TDataSourceFetchOptions;
  memoryDB: TDataSourceMemoryDBOptions;
};
