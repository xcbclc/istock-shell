# 模型

模型可以定义数据由哪些字段及类型值组成，然后通过何种数据源去访问数据。

## 定义模型

创建一个基本服务，需要使用类和`Model`模型类装饰器。`Model`装饰器会将类定义为模型类。我们创建一个`股票数据`的模型，文件名为`gpsj.model.ts`，路径：`src/worker/domains/ag/gpsj/gpsj.model.ts`，示例代码：

```typescript
import { BaseModel, Model } from '@istock/iswork';

@Model('gpsj')
export class GpsjModel extends BaseModel {
  name!: string;
  code!: string;
  price!: number;
}
```

然后在`src/worker/datasource-register.ts`中注册使用数据源，为了简单演示，我们将使用`memoryDB`内存数据源。示例代码：

```typescript
import { DataSource } from '@istock/iswork';
// ...
import { GpsjModel } from '@domains/ag/gpsj/gpsj.model'; // [!code ++]
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
import { Injectable } from '@istock/iswork'; // [!code --]
import { Injectable, type TModelData } from '@istock/iswork'; // [!code ++]
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

详细请查看[`@istock/iswork`](/packages/iswork/classes/BaseModel.html)文档

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
  prefixUrl: import.meta.env.VITE_ISTOCK_API ?? '/api',
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

`indexedDB`数据源接受`TDataSourceIndexedDBOptions`类型参数，`fetch`数据源接受`TDataSourceFetchOptions`类型参数，`memoryDB`数据源接受`TDataSourceMemoryDBOptions`类型参数，相关参数介绍：

```typescript
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
```

## 装饰器

### Model

`Model`装饰器会将类定义为模型类。它接受`TDecoratorModelOptions`类型参数或者`name`模型名+`TDecoratorModelOptions`类型参数，具体参数介绍如下：

```typescript
export type TDecoratorModelOptions = {
  name?: string; // 模型名
};
```

### Column和PrimaryColumn

`Column`和`PrimaryColumn`是针对模型字段使用的装饰器，主要用来定义字段的一些配置信息方便在创建数据库表时使用，所有它一般是在`indexedDB`数据源的模型上使用。
`Column`接受`TDecoratorColumnOptions`类型参数，`PrimaryColumn`接受`TDecoratorPrimaryColumnOptions`类型参数。具体使用及参数介绍如下：

```typescript
import { BaseModel, Column, Index, Model, PrimaryColumn } from '@istock/iswork';

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
export type TDecoratorColumnOptions = {
  name?: string; // 字段名
  type?: string; // 数据类型
  primary?: boolean; // 是否是主键
  unique?: boolean; // 是否数据唯一
  autoIncrement?: boolean; // 是否自增
};
export type TDecoratorPrimaryColumnOptions = TDecoratorColumnOptions;
```

### Index

`Index`是针对`indexedDB`数据源的模型字段使用的装饰器，它的作用是用来定义该字段需要创建索引。它可以不接受参数或接受`indexName`索引名为参数。
