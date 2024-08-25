# 控制器

控制器负责`处理传入的命令`并将`命令处理结果返回`给界面。

## 定义控制器

创建一个基本控制器，需要使用类和装饰器。装饰器会将类与所需的元数据相关联，并将命令请求绑定到相应的控制器上。我们创建一个`股票数据`的控制器，文件名为`gpsj.controller.ts`，路径：`src/worker/domains/ag/gpsj/gpsj.controller.ts`，示例代码：

```typescript
import { Controller } from '@istock/iswork';

@Controller({
  alias: 'gpsj',
})
export class GpsjController {}
```

我们已创建了一个最简单的控制器，但现在它还没有任何实际作用，我们需要给它添加一个接受命令的方法。示例代码：

```typescript
import { Controller, Method, Payload } from '@istock/iswork';

@Controller({
  alias: 'gpsj',
})
export class GpsjController {
  @Method({
    // [!code ++]
    // 查询
    alias: 'cx', // [!code ++]
  }) // [!code ++]
  query(@Payload() query: { code: string }) {
    // [!code ++]
    if (query.code) return { name: '股票名称', code: query.code, price: 888 }; // [!code ++]
    return null; // [!code ++]
  } // [!code ++]
} // [!code ++]
```

添加方法后将该控制器导入到`src/worker/domains/ag/ag.domain.ts`中，示例代码：

```typescript
import { Domain } from '@istock/iswork';
import { transformStockName } from '@/worker/common';
// ...
import { GpsjController } from './gpsj/gpsj.controller'; // [!code ++]
// ...
@Domain({
  name: 'ag',
  viewName: 'A股',
  providers: [
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

最后在主线程中调用该方法测试，示例代码：

```typescript
const queryStock = async (ctx: CmdWindowContext) => {
  const response = await ctx.workerMessage.send('ag', 'gpsj.cx', {
    code: '600519',
  });
  console.log('response', response);
};
queryStock(ctx);

// 返回如下数据
/*
{
    "address": "cmdp://@guest.ag:1/gpsj.cx",
    "meta": {
        "messageId": "44442301451110"
    },
    "payload": {
        "name": "股票名称",
        "code": "600519",
        "price": 888
    },
    "ports": []
}
 */
```

## 控制器类装饰器

控制器类装饰器`Controller`，用来定义一个类是一个装饰器，`Controller`接受`string`(控制器别名)、`string[]`、`TControllerMetadata`三种类型参数。
下面是`TControllerMetadata`类型介绍：

```typescript
export type TControllerMethodComponentMetadata = {
  name: string;
  props?: Record<string, unknown>;
  extra?: Record<string, unknown>;
};

export type TControllerMetadata = {
  alias?: string | string[]; // 控制器别名，默认值为控制器实例类名
  version?: string; // 控制器版本
  component?: TControllerMethodComponentMetadata; // 定义控制器返回数据的展示组件
  middlewares?: TMiddleware[]; // 需要运行的中间件
};
```

## 方法装饰器

### 方法

方法装饰器`Method`用来定义控制器的调用方法，它将控制器的方法和控制器方法元数据绑定起来，方便`cmdp`消息能解析到对应的处理方法。`Method`接受`string`(方法别名)、`string[]`、`TControllerMethodMetadata`三种类型参数。
下面是`TControllerMethodMetadata`类型介绍：

```typescript
export type TControllerMethodMetadata = {
  alias?: string | string[]; // 控制器方法别名，默认值为控制器方法名
  version?: string; // 控制器方法版本
};
```

### 命令路由

命令路由装饰器`CmdRoute`，用来定义命令的详情信息，它将把命令信息与方法绑定。示例代码：

```typescript
import { Controller, Method, CmdRoute, CmdRouteOptions } from '@istock/iswork';
import cmdJson from './domain.cmd.json';

@Controller('domain')
export class DomainController {
  // ...
  @CmdRoute(cmdJson.应用查找)
  @Method('list')
  async getList(
    ctx: ApplicationContext,
    @CmdRouteOptions(cmdJson.应用查找.options.过滤) filter?: string | RegExp,
    @CmdRouteOptions(cmdJson.应用查找.options.数量) limit?: number
  ) {
    // ...
  }
}
```

命令路由装饰器接受`TControllerMethodCmdRoute`类型的参数，下面是`TControllerMethodCmdRoute`类型介绍：

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

### 组件

组件装饰器`Component`用来定义用什么组件展示方法返回的数据。`Component`接受`string`、`TControllerMethodComponentMetadata`、`TControllerMethodComponentMetadata[]`类型参数。
下面是`TControllerMethodComponentMetadata`类型介绍：

```typescript
export type TControllerMethodComponentMetadata = {
  name: string; // 组件名
  props?: Record<string, unknown>; // 组件参数
  extra?: Record<string, unknown>; // 组件额外参数
};
```

使用示例代码：

```typescript
import { Controller, Method, CmdRoute, CmdRouteOptions, CmdRouteArguments, Meta, Component } from '@istock/iswork';
import cmdJson from './cmd-route.cmd.json';

@Controller('cmdRoute')
export class CmdRouteController {
  // ...
  @CmdRoute(cmdJson.命令查找)
  @Method({
    alias: cmdJson.命令查找.cmd,
  })
  @Component('OutputDoc')
  async findDomainList(
    @Meta('domainName') domainName: string,
    @CmdRouteArguments(0) cmd: string,
    @CmdRouteOptions(cmdJson.命令查找.options.名称) cmdName: string
  ) {
    const cmdRoutes = await this.cmdRouteService.getDomainCmdRoute(domainName, {
      cmd,
      name: cmdName,
    });
    return {
      list: this.cmdRouteService.mergeSubcommands(cmdRoutes),
    };
  }
  // ...
}
```

### 返回值处理

返回值处理装饰器`Return`可以定义方法返回数据后，使用哪些管道函数去处理返回数据。`Return`接受参数`string`（管道函数名）、`TControllerMethodReturnMetadata`、`TControllerMethodReturnMetadata`三种类型参数。
下面是`TControllerMethodReturnMetadata`类型介绍：

```typescript
export type TControllerMethodReturnMetadata = {
  name: string; // 管道函数名称
  args?: unknown[]; // 管道函数参数
};
```

## 方法参数装饰器

### payload取值

payload取值装饰器可以获取`cmdp`中的payload数据，它不用传任何参数。使用示例代码：

```typescript
import { Controller, Method, Payload } from '@istock/iswork';
import { DomainService } from './domain.service';

import type { DomainModel } from './domain.model';
import cmdJson from './domain.cmd.json';

@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Method('create')
  async create(@Payload() payload: TModelCreate<DomainModel>) {
    return await this.domainService.create(payload);
  }
  // ...
}
```

### payload字段取值

payload字段取值装饰器`Field`可以方便获取payload数据中的值，`Field`接受`string`参数作为取值key，然后根据取值key获取payload数据中的值。
使用示例代码：

```typescript
import {
  CmdRoute,
  Controller,
  Method,
  CmdRouteArguments,
  Message,
  MessageHandler,
  ApplicationContext,
  Field,
} from '@istock/iswork';
import cmdJson from './ai.cmd';

@Controller({
  alias: 'ai',
})
export class AiController {
  // ...
  @CmdRoute(cmdJson.ai)
  @Method('send')
  @Message()
  async send(
    ctx: ApplicationContext,
    @Field('messageId') messageId: string | undefined,
    @CmdRouteArguments(0) content: string,
    @MessageHandler() handler: IMessageHandler
  ) {
    // ...
  }
}
```

### meta字段取值

meta字段取值装饰器`Meta`可以方便获取`cmdp`的meta数据中的值，`Meta`接受`string`参数作为取值key，然后根据取值key获取meta数据中的值。
使用示例代码：

```typescript
import { Controller, Method, CmdRoute, CmdRouteOptions, CmdRouteArguments, Meta, Component } from '@istock/iswork';
import cmdJson from './cmd-route.cmd.json';

@Controller('cmdRoute')
export class CmdRouteController {
  // ...
  @CmdRoute(cmdJson.命令查找)
  @Method({
    alias: cmdJson.命令查找.cmd,
  })
  @Component('OutputDoc')
  async findDomainList(
    @Meta('domainName') domainName: string,
    @CmdRouteArguments(0) cmd: string,
    @CmdRouteOptions(cmdJson.命令查找.options.名称) cmdName: string
  ) {
    const cmdRoutes = await this.cmdRouteService.getDomainCmdRoute(domainName, {
      cmd,
      name: cmdName,
    });
    return {
      list: this.cmdRouteService.mergeSubcommands(cmdRoutes),
    };
  }
  // ...
}
```

### 命令路由值参数

命令路由值参数装饰器`CmdRouteArguments`，用来接收命令解析后的参数值。`CmdRouteArguments`接受索引值`number`参数，用来从参数数组中获取指定参数值；也可以不传参数，它将返回所有参数值。
`CmdRouteArguments`使用示例代码：

```typescript
import { Controller, Method, CmdRouteArguments, ApplicationContext } from '@istock/iswork';
import cmdJson from './domain.cmd.json';

@Controller('domain')
export class DomainController {
  // ...
  @CmdRoute(cmdJson.应用进入)
  @Method('changePromptDomain')
  async changePromptDomain(ctx: ApplicationContext, @CmdRouteArguments(0) path: string = '.') {
    // ...
  }
  // ...
}
```

### 命令路由选项参数

命令路由选项参数装饰器`CmdRouteOptions`，用来接收命令解析后的选项参数值。`CmdRouteOptions`接受`string`(命令选项参数名字段)、`string[]`、`TControllerMethodCmdRouteOptions`类型参数；也可以不传参数，它将返回所有选项参数值。
下面是`TControllerMethodCmdRouteOptions`类型介绍：

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
```

使用示例代码：

```typescript
import { Controller, Method, CmdRoute, CmdRouteOptions } from '@istock/iswork';
import cmdJson from './domain.cmd.json';

@Controller('domain')
export class DomainController {
  // ...
  @CmdRoute(cmdJson.应用查找)
  @Method('list')
  async getList(
    ctx: ApplicationContext,
    @CmdRouteOptions(cmdJson.应用查找.options.过滤) filter?: string | RegExp,
    @CmdRouteOptions(cmdJson.应用查找.options.数量) limit?: number
  ) {
    // ...
  }
}
```
