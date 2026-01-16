# 添加命令

在 iStock Shell 中添加新命令非常简单。我们提供了强大的命令行工具（CLI）来自动生成代码骨架，同时也支持手动创建文件以满足更定制化的需求。

## 方式一：使用 CLI 工具（推荐）

iStock Shell 提供了 `istock` 命令行工具，可以快速生成符合规范的命令结构。

### 1. 运行初始化命令

在项目根目录下执行：

```bash
pnpm istock cmd init
```

### 2. 按提示操作

CLI 会引导你完成以下步骤：
```shell
✔ 在哪个命令域下开发命令？ akshare
✔ 您期望命令相关文件名为？(文件名用-符号分割) ggxxcx
```
确认无误后，CLI 将自动在 `src/worker/domains/` 下生成相应的文件结构。生成的文件包括：

- `xxx.cmd.ts`: 命令定义与元数据
- `xxx.controller.ts`: 控制器
- `xxx.service.ts`: 业务逻辑
- `xxx.model.ts`: 数据模型

---

## 方式二：手动创建

如果你希望深入了解命令的内部结构，或者需要进行高度定制，可以按照以下步骤手动添加命令。我们将以对接 AKShare 的 [`个股信息查询`](https://akshare.akfamily.xyz/data/stock/stock.html#id8) 接口为例。

### 步骤 1: 准备工作

确保你已经熟悉了 AKShare 的接口文档。我们将使用 [`个股信息查询`](https://akshare.akfamily.xyz/data/stock/stock.html#id8) 接口。

### 步骤 2: 创建目录结构

在 `src/worker/domains/akshare`目录下，创建一个名为 `ggxxcx` 的文件夹。

```bash
src/worker/domains/akshare/ggxxcx/
```

### 步骤 3: 定义数据模型 (Model)

创建 `ggxxcx.model.ts`，定义接口返回的数据结构。

```typescript
import { BaseModel, Model } from '@istock-shell/iswork';

@Model('ggxxcx')
export class GgxxcxModel extends BaseModel {
  item!: string;
  value!: number | string;
}
```

::: tip 提示
模型类名通常为 `[CommandName]Model`，`@Model` 装饰器中的名称应与命令代码保持一致。
:::

### 步骤 4: 注册数据源

把模型和数据源绑定，需要在 `src/worker/datasource-register.ts` 中注册，以便框架能够正确处理数据请求。

```typescript
// src/worker/datasource-register.ts
// ...
import { GgxxcxModel } from '@domains/akshare/ggxxcx/ggxxcx.model'; // [!code ++]

// ...

const akShareFetchDataSource = new DataSource<'fetch'>({
  name: 'fetch',
  type: 'fetch',
  entities: [GgxxcxModel], // [!code ++]
  prefixUrl: import.meta.env.VITE_PROXY_API ?? '/api/v1/proxy',
  requestOptions: {
    headers: {
      'xx-target': import.meta.env.VITE_ISTOCK_AKSHARE ?? 'https://istock.red/api/akshare',
    },
  },
});
await akShareFetchDataSource.initialize();
```

### 步骤 5: 开发服务层 (Service)

创建 `ggxxcx.service.ts`，处理业务逻辑和数据获取。

```typescript
import { Injectable, type ModelData } from '@istock-shell/iswork';
import { GgxxcxModel } from './ggxxcx.model';

@Injectable()
export class GgxxcxService {
  async getStockIndividualInfoEm(symbol: string) {
    return await GgxxcxModel.run<Array<ModelData<GgxxcxModel>>>('/stock_individual_info_em', {
      method: 'get',
      query: {
        symbol,
      },
    });
  }
}
```

### 步骤 6: 定义命令描述 (.cmd.ts)

创建 `ggxxcx.cmd.ts`，定义命令的名称、用法、参数和选项。这是命令解析器识别命令的关键。

```typescript
import { getUnitOption, getStockCode, getStockName } from '@/worker/common';

export default {
  个股信息查询: {
    name: '个股信息查询',
    cmd: 'ggxxcx',
    usage: 'ggxxcx [-gpdm <股票代码>] [-gpmc <股票名称>]',
    options: {
      单位: getUnitOption({
        default: '*:总市值·亿，*:流通市值·亿，*:总股本·亿，*:流通股·亿',
      }),
      股票代码: getStockCode(),
      股票名称: getStockName(),
    },
    source: {
      title: '个股信息查询',
      url: 'http://quote.eastmoney.com/concept/sh603777.html?from=classic',
    },
    description: '东方财富-个股-股票信息',
    remarks: '限量: 单次返回指定 symbol 的个股信息',
    example: 'ggxxcx -gpmc 贵州茅台 -dw',
  },
};
```

### 步骤 7: 实现控制器 (Controller)

创建 `ggxxcx.controller.ts`，将命令映射到服务方法。

```typescript
import { CmdRoute, CmdRouteOptions, Controller, Method } from '@istock-shell/iswork';
import { TableReturn } from '@/worker/common';
import { GgxxcxService } from './ggxxcx.service';
import { GgxxcxModel } from './ggxxcx.model';
import cmdJson from './ggxxcx.cmd';

@Controller({
  alias: 'ggxxcx',
  component: { name: 'ShTable' },
})
export class GgxxcxController {
  constructor(private readonly ggxxcxService: GgxxcxService) {}

  @CmdRoute(cmdJson.个股信息查询)
  @Method({
    alias: cmdJson.个股信息查询.cmd,
  })
  @TableReturn({
    Model: GgxxcxModel,
    caption: '东方财富-个股-股票信息',
  })
  async getStockIndividualInfoEm(@CmdRouteOptions(cmdJson.个股信息查询.options.股票代码) symbol: string) {
    return await this.ggxxcxService.getStockIndividualInfoEm(symbol);
  }
}
```

### 步骤 8: 注册到 Domain

最后，确保在 `src/worker/domains/akshare/akshare.domain.ts` 中注册了新的 Controller 和 Service。

```typescript
// src/worker/domains/akshare/akshare.domain.ts
import { GgxxcxController } from './ggxxcx/ggxxcx.controller'; // [!code ++]
import { GgxxcxService } from './ggxxcx/ggxxcx.service'; // [!code ++]
@Domain({
  // ...
  controllers: [GgxxcxController], // [!code ++]
  providers: [CmdRouteService, GgxxcxService], // [!code ++]
})
export class AkshareDomain {}
```

完成以上步骤后，你就可以在终端中使用 `ggxxcx` 命令了。

## 验证与测试

开发完成后，请按照以下步骤验证命令是否正常工作。

### 1. 启动开发服务器

确保开发服务器正在运行：

```bash
pnpm run dev
```

### 2. 进入应用域

在终端中输入命令进入akshare应用域（如果你的命令在其他域，请进入相应域）：

```bash
yyjr akshare
```

### 3. 查看帮助文档

输入以下命令查看 `ggxxcx` 的自动生成文档：

```bash
mlcz ggxxcx
```

### 4. 执行命令

尝试执行命令查询数据：

```bash
ggxxcx -gpmc 贵州茅台
```

如果一切顺利，你应该能看到贵州茅台的个股信息以表格形式展示出来。

恭喜！你已经成功添加了一个新的 iStock Shell 命令。
