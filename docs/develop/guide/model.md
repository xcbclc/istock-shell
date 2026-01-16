# 模型

模型可以定义数据由哪些字段及类型值组成，然后通过何种数据源去访问数据。

## 定义模型

创建一个基本服务，需要使用类和`Model`模型类装饰器。`Model`装饰器会将类定义为模型类。我们创建一个`股票数据`的模型，文件名为`gpsj.model.ts`，路径：`src/worker/domains/akshare/gpsj/gpsj.model.ts`，示例代码：

```typescript
import { BaseModel, Model } from '@istock-shell/iswork';

@Model('gpsj')
export class GpsjModel extends BaseModel {
  name!: string;
  code!: string;
  price!: number;
}
```

然后在`src/worker/datasource-register.ts`中注册使用数据源，为了简单演示，我们将使用`memoryDB`内存数据源。示例代码：

```typescript
import { DataSource } from '@istock-shell/iswork';
// ...
import { GpsjModel } from '@domains/akshare/gpsj/gpsj.model'; // [!code ++]
// ...
export const memoryDataSourceModels = [
  // ...
  GpsjModel, // [!code ++]
  // ...
];

export const inintDataSource = async () => {
  // ...
  const memoryDataSource = new DataSource<'memoryDB'>({
    name: 'memoryDB',
    type: 'memoryDB',
    dbName: 'istock',
    entities: memoryDataSourceModels,
  });
  await memoryDataSource.initialize();
};
```

在`gpsj.service.ts`中使用，示例代码：

```typescript
import { Injectable } from '@istock-shell/iswork'; // [!code --]
import { Injectable, type TModelData } from '@istock-shell/iswork'; // [!code ++]
import { GpsjModel } from './gpsj.model'; // [!code ++]
@Injectable()
export class GpsjService {
  async queryStock(code: string) {
    return { name: '股票名称', code, price: 888 }; // [!code --]
    return await GpsjModel.query<TModelData<GpsjModel>>({
      // [!code ++]
      filter: { field: 'code', operator: 'eq', value: code }, // [!code ++]
    }); // [!code ++]
  }
}
```

## 模型方法

详细请查看[`@istock-shell/iswork`](/packages/iswork/classes/BaseModel.html)文档

## 数据源

目前模型支持`indexedDB`、`fetch`、`memoryDB`三种数据源，详细使用如`src/worker/datasource-register.ts`文件下代码：

```typescript
// indexedDB
const indexedDataSource = new DataSource<'indexedDB'>({
  name: 'indexedDB',
  type: 'indexedDB',
  entities: indexedDataSourceModels,
  dbName: 'istock',
  version: 7,
});
await indexedDataSource.initialize();
// fetch
const fetchDataSource = new DataSource<'fetch'>({
  name: 'fetch',
  type: 'fetch',
  entities: fetchDataSourceModels,
  prefixUrl: import.meta.env.VITE_ISTOCK_API ?? '/api/v1',
});
await fetchDataSource.initialize();
// memoryDB
const memoryDataSource = new DataSource<'memoryDB'>({
  name: 'memoryDB',
  type: 'memoryDB',
  dbName: 'istock',
  entities: memoryDataSourceModels,
});
await memoryDataSource.initialize();
```

`indexedDB`数据源接受`DataSourceIndexedDBOptions`类型参数，`fetch`数据源接受`DataSourceFetchOptions`类型参数，`memoryDB`数据源接受`DataSourceMemoryDBOptions`类型参数，相关参数介绍：

```typescript
/**
 * @fileoverview 数据源类型定义
 * @description 定义 ORM 数据源相关的类型，包括不同类型的数据源配置选项
 */

import type { ModelType, FetchWrapOptions } from '../types';

/**
 * 数据源类型枚举
 * @description 定义支持的数据源类型
 * @example
 * ```typescript
 * const sourceType: DataSourceType = 'indexedDB';
 * ```
 */
export type DataSourceType = 'indexedDB' | 'fetch' | 'memoryDB';

/**
 * 数据源通用配置选项类型
 * @description 定义所有数据源类型共有的配置选项
 * @example
 * ```typescript
 * const commonOptions: DataSourceCommonOptions = {
 *   name: 'default',
 *   type: 'indexedDB',
 *   entities: [UserModel, PostModel],
 *   dbName: 'myApp',
 *   version: 1
 * };
 * ```
 */
export type DataSourceCommonOptions = {
  /** 数据源名称 */
  name: string;
  /** 数据源类型 */
  type: DataSourceType;
  /** 数据源模型列表 */
  entities: ModelType[];
  /** 数据库名称（可选） */
  dbName?: string;
  /** 数据源版本（可选） */
  version?: number | string;
};

/**
 * IndexedDB 数据源配置选项类型
 * @description 定义 IndexedDB 数据源的特定配置选项
 * @example
 * ```typescript
 * const indexedDBOptions: DataSourceIndexedDBOptions = {
 *   name: 'default',
 *   type: 'indexedDB',
 *   entities: [UserModel],
 *   dbName: 'myApp',
 *   version: 1
 * };
 * ```
 */
export type DataSourceIndexedDBOptions = {
  /** 数据库名称 */
  dbName: string;
  /** 数据库版本 */
  version: number;
} & DataSourceCommonOptions;

/**
 * Fetch 数据源配置选项类型
 * @description 定义基于 Fetch API 的数据源配置选项
 * @example
 * ```typescript
 * const fetchOptions: DataSourceFetchOptions = {
 *   name: 'api',
 *   type: 'fetch',
 *   entities: [UserModel],
 *   prefixUrl: 'https://api.example.com',
 *   requestOptions: { headers: { 'Authorization': 'Bearer token' } }
 * };
 * ```
 */
export type DataSourceFetchOptions = FetchWrapOptions & DataSourceCommonOptions;

/**
 * 内存数据库数据源配置选项类型
 * @description 定义内存数据库数据源的配置选项
 * @example
 * ```typescript
 * const memoryOptions: DataSourceMemoryDBOptions = {
 *   name: 'memory',
 *   type: 'memoryDB',
 *   entities: [UserModel],
 *   dbName: 'testDB'
 * };
 * ```
 */
export type DataSourceMemoryDBOptions = {
  /** 数据库名称 */
  dbName: string;
} & DataSourceCommonOptions;

/**
 * 所有数据源配置选项类型
 * @description 定义所有支持的数据源类型及其对应的配置选项
 * @example
 * ```typescript
 * const allOptions: DataSourceAllOptions = {
 *   indexedDB: indexedDBOptions,
 *   fetch: fetchOptions,
 *   memoryDB: memoryOptions
 * };
 * ```
 */
export type DataSourceAllOptions = {
  /** IndexedDB 数据源配置 */
  indexedDB: DataSourceIndexedDBOptions;
  /** Fetch 数据源配置 */
  fetch: DataSourceFetchOptions;
  /** 内存数据库数据源配置 */
  memoryDB: DataSourceMemoryDBOptions;
};
```

## 装饰器

### Model

`Model`装饰器会将类定义为模型类。它接受`DecoratorModelOptions`类型参数或者`name`模型名+`DecoratorModelOptions`类型参数，具体参数介绍如下：

```typescript
export type DecoratorModelOptions = {
  name?: string; // 模型名
};
```

### Column和PrimaryColumn

`Column`和`PrimaryColumn`是针对模型字段使用的装饰器，主要用来定义字段的一些配置信息方便在创建数据库表时使用，所有它一般是在`indexedDB`数据源的模型上使用。
`Column`接受`DecoratorColumnOptions`类型参数，`PrimaryColumn`接受`DecoratorPrimaryColumnOptions`类型参数。具体使用及参数介绍如下：

```typescript
import { BaseModel, Column, Index, Model, PrimaryColumn } from '@istock-shell/iswork';

@Model('kzzsd_result')
export class KzzsdResultModel extends BaseModel {
  @Index() // 定义索引
  @PrimaryColumn() // 定义主键
  id!: string;

  // 转债代码
  @Index()
  @Column() // 普通列
  bond_id!: string;

  // 时间
  @Column()
  updateDate!: Date;

  @Column()
  rowStatus!: number;
}
```

```typescript
export type DecoratorColumnOptions = {
  name?: string; // 字段名
  type?: string; // 数据类型
  primary?: boolean; // 是否是主键
  unique?: boolean; // 是否数据唯一
  autoIncrement?: boolean; // 是否自增
};
export type DecoratorPrimaryColumnOptions = DecoratorColumnOptions;
```

### Index

`Index`是针对`indexedDB`数据源的模型字段使用的装饰器，它的作用是用来定义该字段需要创建索引。它可以不接受参数或接受`indexName`索引名为参数。
