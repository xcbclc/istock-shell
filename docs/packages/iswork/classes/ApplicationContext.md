[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ApplicationContext

# Class: ApplicationContext

Defined in: application/context.ts:23

应用程序上下文类

## Description

封装应用程序执行期间的上下文信息，包括应用实例、消息数据和命令处理器

## Example

```typescript
// 通常在中间件中使用
app.useMiddleware(async (ctx: ApplicationContext, next) => {
  console.log('处理消息:', ctx.message);
  console.log('命令路径:', ctx.cmdp.path);
  await next();
});
```

## Constructors

### Constructor

> **new ApplicationContext**(`app`, `message`, `options`): `ApplicationContext`

Defined in: application/context.ts:63

应用程序上下文构造函数

#### Parameters

##### app

[`Application`](Application.md)

应用程序实例

##### message

[`CmdpMessage`](../type-aliases/CmdpMessage.md)

命令消息数据

##### options

[`ApplicationContextOptions`](../type-aliases/ApplicationContextOptions.md) = `{}`

上下文配置选项，可选

#### Returns

`ApplicationContext`

#### Description

初始化应用程序上下文，设置应用实例、消息数据和命令处理器

#### Example

```typescript
const ctx = new ApplicationContext(app, {
  path: 'user.create',
  payload: { name: 'John', email: 'john@example.com' },
});
```

## Properties

### cmdp

> **cmdp**: [`Cmdp`](Cmdp.md)

Defined in: application/context.ts:29

命令处理器实例

---

### message

> **message**: [`CmdpMessage`](../type-aliases/CmdpMessage.md)

Defined in: application/context.ts:31

原始消息数据

## Accessors

### app

#### Get Signature

> **get** **app**(): [`Application`](Application.md)

Defined in: application/context.ts:45

获取应用程序实例

##### Returns

[`Application`](Application.md)

应用程序实例

---

### options

#### Get Signature

> **get** **options**(): [`ApplicationContextOptions`](../type-aliases/ApplicationContextOptions.md)

Defined in: application/context.ts:37

获取上下文配置选项

##### Returns

[`ApplicationContextOptions`](../type-aliases/ApplicationContextOptions.md)

上下文配置选项

## Methods

### create()

> `static` **create**(`app`, `message`, `options`): `ApplicationContext`

Defined in: application/context.ts:87

创建应用程序上下文实例

#### Parameters

##### app

[`Application`](Application.md)

应用程序实例

##### message

[`CmdpMessage`](../type-aliases/CmdpMessage.md)

命令消息数据

##### options

[`ApplicationContextOptions`](../type-aliases/ApplicationContextOptions.md) = `{}`

上下文配置选项，可选

#### Returns

`ApplicationContext`

新的应用程序上下文实例

#### Description

静态工厂方法，用于创建应用程序上下文实例

#### Example

```typescript
const ctx = ApplicationContext.create(app, {
  path: 'user.list',
  payload: { page: 1, limit: 10 },
});
```
