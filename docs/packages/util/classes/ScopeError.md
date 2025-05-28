[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / ScopeError

# Class: ScopeError

Defined in: src/packages/util/src/error.ts:8

带有作用域信息的自定义错误类型。
继承自标准 Error 类，可用于区分不同模块或功能域的错误。

## Example

```ts
throw new ScopeError('network', '请求失败');
```

## Extends

- `Error`

## Constructors

### Constructor

> **new ScopeError**(`scope`, `message?`): `ScopeError`

Defined in: src/packages/util/src/error.ts:17

创建带有作用域信息的错误实例。

#### Parameters

##### scope

`string`

错误所属的作用域或模块名称

##### message?

`string`

可选的错误消息

#### Returns

`ScopeError`

#### Overrides

`Error.constructor`

## Properties

### cause?

> `optional` **cause**: `unknown`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es2022.error.d.ts:26

#### Inherited from

`Error.cause`

---

### message

> **message**: `string`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.message`

---

### name

> `readonly` **name**: `string`

Defined in: src/packages/util/src/error.ts:9

#### Overrides

`Error.name`

---

### scope

> `readonly` **scope**: `string`

Defined in: src/packages/util/src/error.ts:10

---

### stack?

> `optional` **stack**: `string`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

---

### captureStackTrace

> `static` **captureStackTrace**: `Function`

Defined in: src/vite-env.d.ts:14

#### Inherited from

`Error.captureStackTrace`
