import type { TModelType, TFetchWrapOptions } from '../types';

export type TDataSourceType = 'indexedDB' | 'fetch' | 'memoryDB';

export type TDataSourceCommonOptions = {
  name: string;
  type: TDataSourceType;
  entities: TModelType[];
  dbName?: string;
  version?: number | string;
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
