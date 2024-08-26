# 添加命令

得益于NestJS框架的灵感，我们在实现`Web Worker`服务框架`@istock/iswork`时采用了类似架构。意味着如果你熟悉NestJS框架，那么上手命令开发将会非常自然且高效。

下面将引导您通过对接`AKShare`的[`个股信息查询`](https://akshare.akfamily.xyz/data/stock/stock.html#id8)接口，为A股市场添加一个个股信息查询的命令。

## 步骤 1: 准备工作

首先，确保您已经熟悉了AKShare的接口文档。我们将使用的是[`个股信息查询`](https://akshare.akfamily.xyz/data/stock/stock.html#id8)接口，您可以访问它查看接口的详细文档。

## 步骤 2: 创建命令文件夹

在`src/worker/domains/ag`目录下，根据命令的功能创建一个新的文件夹`ggxxcx`（个股信息查询的拼音首字母缩写）。

::: warning 注意
文件夹命名通常采用命令名称的`拼音首字母`。
:::

## 步骤 3: 定义数据模型

在`ggxxcx`文件夹中，创建一个名为`ggxxcx.model.ts`的文件，并根据AKShare文档中提供的输出参数定义数据模型，需要引入模型定义装饰器`Model`。示例代码如下：

```typescript
import { BaseModel, Model } from '@istock/iswork';

@Model('ggxxcx')
export class GgxxcxModel extends BaseModel {
  item!: string;
  value!: number | string;
}
```

::: warning 注意
模型文件名称格式规范为`[文件夹名].model.ts`；命令模型和命令名保持一致。比如上面模型名是`ggxxcx`，模型类名是`[模型名]Model`，后面命令名也应该定义为`ggxxcx`。
:::

## 步骤 4: 注册数据源

为了使我们的模型能够从AKShare获取数据，我们需要将其注册为`Fetch`数据源。在`src/worker/datasource-register.ts`文件中添加如下代码：

```typescript
// ...
import { GgxxcxModel } from '@domains/ag/ggxxcx/ggxxcx.model.ts'; // [!code ++]
// ...
export const akShareFetchDataSourceModels = [
  // ...
  GgxxcxModel, // [!code ++]
  // ...
];
// ...
const akShareFetchDataSource = new DataSource<'fetch'>({
  name: 'fetch',
  type: 'fetch',
  entities: akShareFetchDataSourceModels,
  prefixUrl: import.meta.env.VITE_AKSHARE_API ?? '/api/akshare',
});
await akShareFetchDataSource.initialize();
// ...
```

## 步骤 5: 开发服务层

在`ggxxcx`文件夹下创建`ggxxcx.service.ts`文件，用于处理与AKShare接口的通信。
根据AKShare数据接口文档，[`个股信息查询`](https://akshare.akfamily.xyz/data/stock/stock.html#id8)接口地址为`stock_individual_info_em`，输入参数需要`symbol`和`timeout`，我需要引入`GgxxcxModel`模型及服务注入装饰器`Injectable`，示例代码如下：

```typescript
import { Injectable, type TModelData } from '@istock/iswork';
import { GgxxcxModel } from './ggxxcx.model';

@Injectable()
export class GgxxcxService {
  async getStockIndividualInfoEm(symbol: string) {
    return await GgxxcxModel.run<Array<TModelData<GgxxcxModel>>>('/stock_individual_info_em', {
      method: 'get',
      query: {
        symbol,
      },
    });
  }
}
```

::: warning 注意
服务文件名通常为`[文件夹名].service.ts`。
:::

## 步骤 6: 定义命令描述

接下来，我们需要为命令提供一个清晰的描述。在`ggxxcx`文件夹中创建`ggxxcx.cmd.ts`命令描述文件，并定义命令。示例代码如下：

```typescript
import { getUnitOption, getStockCode, getStockName } from '@/worker/common';

export default {
  个股信息查询: {
    name: '个股信息查询',
    cmd: 'ggxxcx', // 命令
    usage: 'ggxxcx [-gpdm <股票代码>] [-gpmc <股票名称>]', // 命令用法
    options: {
      单位: getUnitOption({
        default: '*:总市值·亿，*:流通市值·亿，*:总股本·亿，*:流通股·亿',
      }), // 单位格式化
      股票代码: getStockCode(), // 支持传入股票代码
      股票名称: getStockName(), // 支持传入股票名称
    },
    source: {
      title: '个股信息查询', // akshare标题
      url: 'http://quote.eastmoney.com/concept/sh603777.html?from=classic', // akshare目标地址
    },
    description: '东方财富-个股-股票信息', // akshare描述
    remarks: '限量: 单次返回指定 symbol 的个股信息', // akshare备注信息
    example: 'ggxxcx -gpmc 贵州茅台 -dw', // 示例命令
  },
};
```

命令描述对象是`TControllerMethodCmdRoute`类型，类型详细如下：

```typescript
export type TControllerMethodCmdRouteOptions = {
  name: string; // 参数名称
  parameter: string[]; // 参数键
  parameterType: string[]; // 对应参数类型 string | number | boolean | array
  description?: string; // 参数描述
  default?: any; // 参数默认数据
  optional?: boolean; // 参数是否可选
  choices?: Array<string | number | boolean | null>; // 参数可选值
};

export type TControllerMethodCmdRoute = {
  name: string; // 命令名称
  cmd: string; // 命令
  usage?: string; // 命令用法
  shortDescription?: string; // 命令短介绍
  description?: string; // 命令介绍
  options?: Record<string, TControllerMethodCmdRouteOptions>; // 命令参数选项
  subcommand?: TControllerMethodCmdRoute; // 子命令
  arguments?: TControllerMethodCmdRouteOptions[]; // 命令参数
  source?: { title?: string; url?: string };
  remarks?: string;
  example?: string;
};
```

::: warning 注意
命令描述文件名通常为[文件夹名].cmd.ts或[文件夹名].cmd.json。
部分选项参数可以通过通用函数方法创建，函数方法放在`@/worker/common`中，例如示例中的`getStockCode`、`getUnitOption`。
:::

## 步骤 7: 创建控制器

现在，将命令模型、命令服务和命令描述绑定到命令控制器。创建`ggxxcx.controller.ts`，创建`GgxxcxController`控制器类，代码示例：

```typescript
import { Controller } from '@istock/iswork';
import { GgxxcxModel } from './ggxxcx.model';
import { GgxxcxService } from './ggxxcx.service';
import cmdJson from './ggxxcx.cmd';

@Controller({
  alias: 'ggxxcx', // 控制器别名
  component: { name: 'ShTable' }, // 控制器所有方法返回的数据用表格组件展示
})
export class GgxxcxController {
  // 依赖注入GgxxcxService服务
  constructor(private readonly ggxxcxService: GgxxcxService) {}
}
```

接下来创建命令方法，需要使用`CmdRoute`装饰器定义命名路由、`Method`定义方法别名及相关信息、`AKshareReturn`装饰器对AKshare接口返回的数据进行标准化输出。代码示例：

```typescript
import { CmdRoute, CmdRouteOptions, Controller, Method } from '@istock/iswork'; // [!code ++]
import { AKshareReturn } from '@/worker/common'; // [!code ++]
import { GgxxcxModel } from './ggxxcx.model';
import { GgxxcxService } from './ggxxcx.service';
import cmdJson from './ggxxcx.cmd';

@Controller({
  alias: 'ggxxcx', // 控制器别名
  component: { name: 'ShTable' }, // 控制器所有方法返回的数据用表格组件展示
})
export class GgxxcxController {
  // 依赖注入GgxxcxController服务
  constructor(private readonly ggxxcxService: GgxxcxService) {}

  @CmdRoute(cmdJson.个股信息查询) // [!code ++] // 定义命令路由
  @Method({
    // [!code ++]
    alias: cmdJson.个股信息查询.cmd, // [!code ++] // 定义控制器方法别名
  }) // [!code ++]
  @AKshareReturn({
    // [!code ++]
    Model: GgxxcxModel, // [!code ++] // 对应数据模型，方便把接口数据解析成二维数组
    caption: cmdJson.个股信息查询.source.title, // [!code ++] // 表格显示标题
  }) // [!code ++]
  async getStockIndividualInfoEm(@CmdRouteOptions(cmdJson.个股信息查询.options.股票代码) symbol: string) {
    // [!code ++]
    return await this.ggxxcxService.getStockIndividualInfoEm(symbol); // [!code ++]
  } // [!code ++]
}
```

::: warning 注意
命令控制器文件名通常为`[文件夹名].controller.ts`。
:::

## 步骤 8: 导入命令到应用域

到目前位置，`src/worker/domains/ag/ggxxcx`文件夹下应该有`ggxxcx.model.ts`、`ggxxcx.service.ts`、`ggxxcx.cmd.ts`、`ggxxcx.controller.ts`这四个文件。
最后需要确保`ggxxcx`命令被导入到`ag`命令应用域下。在`src/worker/domains/ag/ag.domain.ts`中添加对应的引用。代码示例：

```typescript
import { Domain } from '@istock/iswork';
import { GgxxcxController } from './ggxxcx/ggxxcx.controller'; // [!code ++]
import { GgxxcxService } from './ggxxcx/ggxxcx.service'; // [!code ++]

@Domain({
  name: 'ag',
  viewName: 'A股',
  providers: [
    // ...
    GgxxcxService, // [!code ++]
    // ...
  ],
  controllers: [
    // ...
    GgxxcxController, // [!code ++]
    // ...
  ],
})
export class AgDomain {}
```

最后将`ag`命令应用域导入到`src/worker/domains/root.domain.ts`根命令应用域。

```typescript
// ...
import { AgDomain } from './ag/ag.domain'; // [!code ++]
// ...

@Global()
@Domain({
  name: 'root',
  viewName: '根',
  imports: [
    // ...
    AgDomain, // [!code ++]
    // ...
  ],
  providers: [],
})
export class RootDomain {}
```

至此，我们已经走完整个命令开发流程，接下来我们需要测试该命令。

## 命令测试

### 进入A股

输入命令`yyjr ag`进入A股应用。
<IStockShellDemo cmd="yyjr A股" :domains="[]" height="200"/>

### 查看命令文档

输入命令`mlcz ggxxcx`查询`ggxxcx`命令的文档。
<IStockShellDemo cmd="mlcz ggxxcx" :domains="[{viewName: 'A股',name: 'ag'}]"/>

### 测试命令

输入命令`ggxxcx -gpmc 贵州茅台`查询`贵州茅台`的个股信息。
<IStockShellDemo cmd="ggxxcx -gpmc 贵州茅台" :domains="[{viewName: 'A股',name: 'ag'}]"/>

输入命令`ggxxcx -gpdm 600519`查询`600519（贵州茅台）`的个股信息。
<IStockShellDemo cmd="ggxxcx -gpdm 600519" :domains="[{viewName: 'A股',name: 'ag'}]"/>

如果一切顺利，您将看到请求的数据以表格形式展示，至此，您已成功添加了一个新命令。
