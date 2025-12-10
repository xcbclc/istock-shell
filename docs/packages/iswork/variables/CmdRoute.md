[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / CmdRoute

# Variable: CmdRoute()

> `const` **CmdRoute**: (`options`) => (`target`, `propertyKey`, `descriptor`) => `TypedPropertyDescriptor`\<`any`\>

Defined in: decorators/index.ts:98

命令路由装饰器

装饰器处理函数

## Parameters

### options

[`ControllerMethodCmdRoute`](../type-aliases/ControllerMethodCmdRoute.md)

命令路由配置对象

## Returns

方法装饰器函数

> (`target`, `propertyKey`, `descriptor`): `TypedPropertyDescriptor`\<`any`\>

### Parameters

#### target

`object`

#### propertyKey

`string` | `symbol`

#### descriptor

`TypedPropertyDescriptor`\<`any`\>

### Returns

`TypedPropertyDescriptor`\<`any`\>

## Description

创建命令路由装饰器，将路由配置应用到目标方法上

## Example

```typescript
@CmdRoute({
  command: 'list',
  description: '列出所有用户',
  options: {
    page: { type: 'number', description: '页码', default: 1 },
    limit: { type: 'number', description: '每页数量', default: 10 }
  }
})
listUsers() {}
```

## Description

用于定义控制器方法的命令路由
