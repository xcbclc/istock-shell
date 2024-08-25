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
