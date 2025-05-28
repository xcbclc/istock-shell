[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Cmdp

# Class: Cmdp

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:8

istock cmdp协议实现

## Extends

- `AbstractCmdp`

## Extended by

- [`CmdpEvent`](CmdpEvent.md)

## Constructors

### Constructor

> **new Cmdp**(`msgOrInfo`, `options?`): `Cmdp`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:18

#### Parameters

##### msgOrInfo

[`TCmdpAddressInfo`](../type-aliases/TCmdpAddressInfo.md) | [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

##### options?

[`TCmdpOptions`](../type-aliases/TCmdpOptions.md)

#### Returns

`Cmdp`

#### Overrides

`AbstractCmdp.constructor`

## Properties

### address

> `protected` **address**: `string`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:14

#### Inherited from

`AbstractCmdp.address`

---

### controller

> `protected` **controller**: `string`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:12

#### Inherited from

`AbstractCmdp.controller`

---

### domains

> `protected` **domains**: `string`[]

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:10

#### Inherited from

`AbstractCmdp.domains`

---

### meta

> `protected` **meta**: `undefined` \| [`TCmdpMeta`](../type-aliases/TCmdpMeta.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:9

#### Overrides

`AbstractCmdp.meta`

---

### method

> `protected` **method**: `string`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:13

#### Inherited from

`AbstractCmdp.method`

---

### payload

> `protected` **payload**: [`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:10

#### Overrides

`AbstractCmdp.payload`

---

### port

> `protected` **port**: `string`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:11

#### Inherited from

`AbstractCmdp.port`

---

### protocol

> `protected` **protocol**: `string` = `'cmdp://'`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:8

#### Inherited from

`AbstractCmdp.protocol`

---

### returnMeta

> `protected` **returnMeta**: `undefined` \| [`TCmdpMeta`](../type-aliases/TCmdpMeta.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:11

#### Overrides

`AbstractCmdp.returnMeta`

---

### returnPayload

> `protected` **returnPayload**: [`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:12

#### Overrides

`AbstractCmdp.returnPayload`

---

### user

> `protected` **user**: `string`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:9

#### Inherited from

`AbstractCmdp.user`

## Methods

### check()

> `protected` **check**(`address`): `boolean`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:97

检查是否是cmdp地址 例如: cmdp://@user.domain.subDomain:1/controllerName.methodName

#### Parameters

##### address

`string`

#### Returns

`boolean`

#### Inherited from

`AbstractCmdp.check`

---

### getInfo()

> **getInfo**(): [`TCmdpInfo`](../type-aliases/TCmdpInfo.md)

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:41

获取cmdp信息

#### Returns

[`TCmdpInfo`](../type-aliases/TCmdpInfo.md)

#### Inherited from

`AbstractCmdp.getInfo`

---

### getMessage()

#### Call Signature

> **getMessage**(): [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:127

获取消息数据

##### Returns

[`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

#### Call Signature

> **getMessage**(`payload`): [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:128

获取消息数据

##### Parameters

###### payload

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

##### Returns

[`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

---

### getMeta()

#### Call Signature

> **getMeta**\<`Return`\>(): `Return`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:43

获取请求元数据

##### Type Parameters

###### Return

`Return` _extends_ `undefined` \| [`TCmdpMeta`](../type-aliases/TCmdpMeta.md)

##### Returns

`Return`

##### Overrides

`AbstractCmdp.getMeta`

#### Call Signature

> **getMeta**\<`Return`\>(`key`): `Return`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:44

##### Type Parameters

###### Return

`Return` _extends_ [`TCmdpMetaValue`](../type-aliases/TCmdpMetaValue.md)

##### Parameters

###### key

`never`

##### Returns

`Return`

##### Overrides

`AbstractCmdp.getMeta`

---

### getPayload()

#### Call Signature

> **getPayload**\<`Return`\>(): `Return`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:62

获取请求数据

##### Type Parameters

###### Return

`Return` _extends_ [`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

##### Returns

`Return`

##### Overrides

`AbstractCmdp.getPayload`

#### Call Signature

> **getPayload**\<`Return`\>(`key`): `Return`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:63

##### Type Parameters

###### Return

`Return` = `unknown`

##### Parameters

###### key

`string`

##### Returns

`Return`

##### Overrides

`AbstractCmdp.getPayload`

---

### getReturnMessage()

#### Call Signature

> **getReturnMessage**(): [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:141

获取返回消息数据

##### Returns

[`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

#### Call Signature

> **getReturnMessage**(`payload`): [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:142

获取返回消息数据

##### Parameters

###### payload

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

##### Returns

[`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

---

### getReturnMeta()

#### Call Signature

> **getReturnMeta**\<`Return`\>(): `Return`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:83

获取响应元数据

##### Type Parameters

###### Return

`Return` _extends_ `undefined` \| [`TCmdpMeta`](../type-aliases/TCmdpMeta.md)

##### Returns

`Return`

##### Overrides

`AbstractCmdp.getReturnMeta`

#### Call Signature

> **getReturnMeta**\<`Return`\>(`key`): `Return`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:84

##### Type Parameters

###### Return

`Return` _extends_ [`TCmdpMetaValue`](../type-aliases/TCmdpMetaValue.md)

##### Parameters

###### key

`never`

##### Returns

`Return`

##### Overrides

`AbstractCmdp.getReturnMeta`

---

### getReturnPayload()

#### Call Signature

> **getReturnPayload**\<`Return`\>(): `Return`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:102

获取响应数据

##### Type Parameters

###### Return

`Return` _extends_ [`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

##### Returns

`Return`

##### Overrides

`AbstractCmdp.getReturnPayload`

#### Call Signature

> **getReturnPayload**\<`Return`\>(`key`): `Return`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:103

##### Type Parameters

###### Return

`Return` = `unknown`

##### Parameters

###### key

`string`

##### Returns

`Return`

##### Overrides

`AbstractCmdp.getReturnPayload`

---

### initByAddress()

> `protected` **initByAddress**(`address`): `void`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:65

用地址初始化

#### Parameters

##### address

`string`

#### Returns

`void`

#### Inherited from

`AbstractCmdp.initByAddress`

---

### parse()

> `protected` **parse**(`address`): [`TCmdpInfo`](../type-aliases/TCmdpInfo.md)

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:110

解析cmdp地址信息

#### Parameters

##### address

`string`

#### Returns

[`TCmdpInfo`](../type-aliases/TCmdpInfo.md)

#### Inherited from

`AbstractCmdp.parse`

---

### searchSubDomain()

> **searchSubDomain**(`rootDomain`): `string`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:116

查找子域

#### Parameters

##### rootDomain

`string` = `''`

#### Returns

`string`

---

### setAddressInfo()

> `protected` **setAddressInfo**(`info`): `void`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:81

设置基本信息

#### Parameters

##### info

[`TCmdpAddressInfo`](../type-aliases/TCmdpAddressInfo.md)

#### Returns

`void`

#### Inherited from

`AbstractCmdp.setAddressInfo`

---

### setMeta()

#### Call Signature

> **setMeta**(`key`, `value`): `void`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:32

设置请求元数据

##### Parameters

###### key

`string`

###### value

[`TCmdpMetaValue`](../type-aliases/TCmdpMetaValue.md)

##### Returns

`void`

##### Overrides

`AbstractCmdp.setMeta`

#### Call Signature

> **setMeta**(`value`): `void`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:33

##### Parameters

###### value

[`TCmdpMeta`](../type-aliases/TCmdpMeta.md)

##### Returns

`void`

##### Overrides

`AbstractCmdp.setMeta`

---

### setPayload()

#### Call Signature

> **setPayload**(`key`, `value`): `void`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:51

设置请求数据

##### Parameters

###### key

`string`

###### value

`unknown`

##### Returns

`void`

##### Overrides

`AbstractCmdp.setPayload`

#### Call Signature

> **setPayload**(`payload`): `void`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:52

##### Parameters

###### payload

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

##### Returns

`void`

##### Overrides

`AbstractCmdp.setPayload`

---

### setReturnMeta()

#### Call Signature

> **setReturnMeta**(`key`, `value`): `void`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:72

设置响应元数据

##### Parameters

###### key

`string`

###### value

[`TCmdpMetaValue`](../type-aliases/TCmdpMetaValue.md)

##### Returns

`void`

##### Overrides

`AbstractCmdp.setReturnMeta`

#### Call Signature

> **setReturnMeta**(`value`): `void`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:73

##### Parameters

###### value

[`TCmdpMeta`](../type-aliases/TCmdpMeta.md)

##### Returns

`void`

##### Overrides

`AbstractCmdp.setReturnMeta`

---

### setReturnPayload()

#### Call Signature

> **setReturnPayload**(`key`, `value`): `void`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:91

设置响应数据

##### Parameters

###### key

`string`

###### value

`unknown`

##### Returns

`void`

##### Overrides

`AbstractCmdp.setReturnPayload`

#### Call Signature

> **setReturnPayload**(`payload`): `void`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:92

##### Parameters

###### payload

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

##### Returns

`void`

##### Overrides

`AbstractCmdp.setReturnPayload`

---

### create()

> `static` **create**(`addOrInfo`, `options?`): `Cmdp`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:14

#### Parameters

##### addOrInfo

[`TCmdpAddressInfo`](../type-aliases/TCmdpAddressInfo.md) | [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

##### options?

[`TCmdpOptions`](../type-aliases/TCmdpOptions.md)

#### Returns

`Cmdp`

---

### getAddressByInfo()

> `static` **getAddressByInfo**(`info`): `string`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:24

根据传入信息获取地址

#### Parameters

##### info

[`TCmdpAddressInfo`](../type-aliases/TCmdpAddressInfo.md)

#### Returns

`string`

#### Inherited from

`AbstractCmdp.getAddressByInfo`
