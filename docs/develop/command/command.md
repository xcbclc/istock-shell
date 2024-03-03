# 开发指南：添加命令

本指南将引导您通过`AKShare`的历史分笔数据（腾讯财经）接口，为A股市场数据添加一个历史分笔数据命令。按照以下步骤进行：

## 步骤 1: 准备工作

首先，确保您已经熟悉了AKShare接口文档。我们将使用的是`历史分笔数据(腾讯财经)`接口，您可以在[AKShare](https://akshare.akfamily.xyz/data/index.html)网站上找到这一接口的详细文档。

## 步骤 2: 创建命令文件夹

在`src/worker/domains/ag`目录下，根据命令的功能创建一个新的文件夹`lsfbsj`（历史分笔数据的拼音首字母缩写）。

::: warning 注意
文件夹命名通常采用命令分类名称的拼音首字母。
:::

## 步骤 3: 定义数据模型

在`lsfbsj`文件夹中，创建一个名为`lsfbsj.model.ts`的文件，并根据AKShare文档中提供的输出参数定义数据模型，需要引入模型定义装饰器`Model`。示例代码如下：

```typescript
import { BaseModel, Model } from '@istock/iswork';

@Model('lsfbsj')
export class LsfbsjModel extends BaseModel {
  成交时间!: string;
  成交价格!: number; // 注意单位: 元
  价格变动!: number; // 注意单位: 元
  成交量!: number; // 注意单位: 手
  成交额!: number; // 注意单位: 元
  性质!: string; // 买卖盘标记
}
```

::: warning 注意
模型文件名通常规范格式为`[文件夹名].model.ts`；命令模型和命令名保持一致。比如上面模型名是`lsfbsj`，模型类名是`[模型名]Model`，后面命令名也应该定义为`lsfbsj`。
:::

## 步骤 4: 注册数据源

为了使我们的模型能够从AKShare获取数据，我们需要将其注册为`Fetch`数据源。在`src/worker/datasource-register.ts`文件中添加如下代码：

```typescript
// ...
import { LsfbsjModel } from '@domains/ag/lsfbsj/lsfbsj.model'; // [!code ++]
// ...
export const fetchDataSourceModels = [
  // ...
  LsfbsjModel, // [!code ++]
  // ...
];
// ...
const fetchDataSource = new DataSource<'fetch'>({
  name: 'fetch',
  type: 'fetch',
  entities: fetchDataSourceModels,
  prefixUrl: import.meta.env.VITE_AKSHARE_API ?? '/api/public',
});
await fetchDataSource.initialize();
// ...
```

## 步骤 5: 开发服务层

在`lsfbsj`文件夹下创建`lsfbsj.service.ts`文件，用于处理与AKShare接口的通信。
根据AKShare数据接口文档，历史分笔数据(腾讯财经)接口地址为`stock_zh_a_tick_tx`，输入参数需要`symbol`，我需要引入`LsfbsjModel`模型及服务注入装饰器`Injectable`，示例代码如下：

```typescript
import { Injectable, type TModelData } from '@istock/iswork';
import { LsfbsjModel } from './lsfbsj.model';

@Injectable()
export class LsfbsjService {
  async stockZhATickTx(symbol: string) {
    return await LsfbsjModel.run<Array<TModelData<LsfbsjModel>>>('/stock_zh_a_tick_tx', {
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

接下来，我们需要为命令提供一个清晰的描述。在`lsfbsj`文件夹中创建`lsfbsj.cmd.ts`文件，并定义命令。示例代码如下：

```typescript
import { getUnitOption, getStockCode } from '@domains/@common';

export default {
  历史分笔数据: {
    name: '历史分笔数据',
    cmd: 'lsfbsj',
    usage: 'lsfbsj <-gpdm <股票代码>>',
    options: {
      单位: getUnitOption({}),
      股票代码: getStockCode(),
    },
    source: {
      title: '历史分笔数据-腾讯财经',
      url: 'http://gu.qq.com/sz300494/gp/detail', // 对应AKShare目标地址
    },
    description:
      '每个交易日 16:00 提供当日数据; 如遇到数据缺失, 请使用 ak.stock_zh_a_tick_163() 接口(注意数据会有一定差异)', // 对应AKShare描述
    remarks: '限量: 单次返回最近交易日的历史分笔行情数据', // 对应AKShare提示
  },
};
```

命令描述对象是`TControllerMethodCmdRoute`类型，类型详细如下：

```typescript
export type TControllerMethodCmdRouteOptions = {
  name: string; // 参数名称
  parameter: string[]; // 参数键
  parameterType: string[]; // 对应参数类型
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
};
```

::: warning 注意
命令描述文件名通常为[文件夹名].cmd.ts或[文件夹名].cmd.json。
部分选项参数可以通过通用函数方法创建，比如上面代码中的`getStockCode`、`getUnitOption`。
:::

## 步骤 7: 创建控制器

现在，将命令模型、服务、和描述绑定到一个控制器。创建`lsfbsj.controller.ts`，创建`LsfbsjController`控制器类，代码示例：

```typescript
import { Controller } from '@istock/iswork';
import { LsfbsjModel } from './lsfbsj.model';
import { LsfbsjService } from './lsfbsj.service';
import cmdJson from './lsfbsj.cmd';

@Controller({
  alias: 'lsfbsj', // 控制器别名
  component: { name: 'ShTable' }, // 控制器所有方法返回的数据用表格组件展示
})
export class LsfbsjController {
  // 依赖注入LsfbsjService服务
  constructor(private readonly lsfbsjService: LsfbsjService) {}
}
```

接下来创建命令方法，需要使用`CmdRoute`装饰器定义命名路由、`Method`定义方法别名及相关信息、`AKshareReturn`装饰器对AKshare接口返回的数据进行标准化输出。代码示例：

```typescript
import { CmdRoute, CmdRouteOptions, Controller, Method } from '@istock/iswork'; // [!code ++]
import { AKshareReturn } from '@domains/@common/decorators'; // [!code ++]
import { LsfbsjModel } from './lsfbsj.model';
import { LsfbsjService } from './lsfbsj.service';
import cmdJson from './lsfbsj.cmd';

@Controller({
  alias: 'lsfbsj', // 控制器别名
  component: { name: 'ShTable' }, // 控制器所有方法返回的数据用表格组件展示
})
export class LsfbsjController {
  // 依赖注入LsfbsjService服务
  constructor(private readonly lsfbsjService: LsfbsjService) {}

  @CmdRoute(cmdJson.历史分笔数据) // [!code ++] 定义命令路由
  @Method({
    // [!code ++]
    alias: cmdJson.历史分笔数据.cmd, // [!code ++] 定义控制器方法别名
  }) // [!code ++]
  @AKshareReturn({
    // [!code ++]
    Model: LsfbsjModel, // [!code ++] 对应数据模型，方便把接口数据解析成二维数组
    caption: cmdJson.历史分笔数据.source.title, // [!code ++] 表格显示标题
  }) // [!code ++]
  async stockZhATickTx(@CmdRouteOptions(cmdJson.历史分笔数据.options.股票代码) symbol: string) {
    // [!code ++]
    return await this.lsfbsjService.stockZhATickTx(symbol); // [!code ++]
  } // [!code ++]
}
```

::: warning 注意
命令控制器文件名通常为`[文件夹名].controller.ts`。
:::

## 步骤 8: 导入命令到应用域

到目前位置，`src/worker/domains/ag/lsfbsj`文件夹下应该有`lsfbsj.cmd.ts`、`lsfbsj.controller.ts`、`lsfbsj.model.ts`、`lsfbsj.service.ts`这四个文件。
最后需要确保`lsfbsj`命令被导入到A股命令应用域下。在`src/worker/domains/ag/ag.domain.ts`中添加对应的引用。代码示例：

```typescript
// ...
import { LsfbsjController } from './lsfbsj/lsfbsj.controller'; // [!code ++]
import { LsfbsjService } from './lsfbsj/lsfbsj.service'; // [!code ++]

@Domain({
  name: 'ag',
  viewName: 'A股',
  providers: [
    ,
    // ...
    LsfbsjService, // [!code ++]
  ],
  controllers: [
    ,
    // ..
    LsfbsjController, // [!code ++]
  ],
})
export class AgDomain {}
```

## 命令测试

- 输入命令`yyjr A股`以进入A股应用。
- 输入命令`lsfbsj -gpdm 600519`测试获取贵州茅台的历史分笔数据。

如果一切正常，您将看到请求的数据以表格形式展示，至此，您已成功添加了一个新命令。
