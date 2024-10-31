# 服务

当控制器负责的业务逻辑过于复杂时，我们可以将更复杂的业务逻辑委托给服务。

## 定义服务

创建一个基本服务，需要使用类和`Injectable`可注入类装饰器。`Injectable`装饰器会将类定义为可注入类，方面我们在控制器类中注入。我们创建一个`股票数据`的服务，文件名为`gpsj.service.ts`，路径：`src/worker/domains/ag/gpsj/gpsj.service.ts`，示例代码：

```typescript
import { Injectable } from '@istock/iswork';

@Injectable()
export class GpsjService {
  async queryStock(code: string) {
    return { name: '股票名称', code, price: 888 };
  }
}
```

将服务导入到`A股`应用域，以便后续`gpsj.controller.ts`控制器使用，示例代码：

```typescript
import { Domain } from '@istock/iswork';
import { transformStockName } from '@/worker/common';
// ...
import { GpsjController } from './gpsj/gpsj.controller';
import { GpsjService } from './gpsj/gpsj.service'; // [!code ++]
// ...

@Domain({
  name: 'ag',
  viewName: 'A股',
  providers: [
    // ...
    GpsjService, // [!code ++]
    // ...
  ],
  controllers: [
    // ...
    GpsjController, // [!code ++]
    // ...
  ],
  middlewares: [transformStockName],
})
export class AgDomain {}
```

将服务提供给`gpsj.controller.ts`控制器使用，示例代码：

```typescript
import { Controller, Method, Payload } from '@istock/iswork';
import { GpsjService } from './gpsj.service'; // [!code ++]

@Controller({
  alias: 'gpsj',
})
export class GpsjController {
  constructor(private readonly gpsjService: GpsjService) {} // [!code ++]

  @Method({
    // 查询
    alias: 'cx',
  })
  async query(@Payload() query: { code: string }) {
    if (query.code) return { name: '股票名称', code: query.code, price: 888 }; // [!code --]
    if (query.code) return await this.gpsjService.queryStock(query.code); // [!code ++]
    return null;
  }
}
```

## 装饰器

### Injectable

`Injectable`可注入类装饰器的主要作用是将`服务类`标记成一个可注入类，它将标记类的实例化委托给`IoC`容器，这样我们就可以很方便的在`控制类`中注入想要的`服务实例`。`Injectable`装饰器没有参数可直接在`服务类`上使用。
