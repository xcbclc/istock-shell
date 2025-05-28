[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / FESnowflake

# Class: FESnowflake

Defined in: src/packages/util/src/snow-flake.ts:10

雪花算法字符串生成器。

用于生成分布式唯一字符串 ID，基于时间戳、工作线程 ID、服务端口 ID 和序列号。

## Example

```ts
const snowflake = new FESnowflake(1, 1);
const id = snowflake.nextId();
```

## Constructors

### Constructor

> **new FESnowflake**(`workerId`, `portId`): `FESnowflake`

Defined in: src/packages/util/src/snow-flake.ts:51

创建雪花算法实例。

#### Parameters

##### workerId

`number`

工作线程 ID（0-15）

##### portId

`number`

服务端口 ID（0-15）

#### Returns

`FESnowflake`

#### Throws

如果 workerId 或 portId 超出范围

## Methods

### nextId()

> **nextId**(): `string`

Defined in: src/packages/util/src/snow-flake.ts:67

生成下一个唯一字符串 ID。

#### Returns

`string`

唯一字符串 ID

#### Throws

如果系统时间回退
