[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / CmdpEvent

# Class: CmdpEvent

Defined in: src/packages/iswork/src/cmdp/cmdp-event.ts:7

事件协议实现

## Extends

- [`Cmdp`](Cmdp.md)

## Constructors

### Constructor

> **new CmdpEvent**(`msgOrInfo`): `CmdpEvent`

Defined in: src/packages/iswork/src/cmdp/cmdp-event.ts:8

#### Parameters

##### msgOrInfo

[`TCmdpInfo`](../type-aliases/TCmdpInfo.md) | [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

#### Returns

`CmdpEvent`

#### Overrides

[`Cmdp`](Cmdp.md).[`constructor`](Cmdp.md#constructor)

## Properties

### address

> `protected` **address**: `string`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:14

#### Inherited from

[`Cmdp`](Cmdp.md).[`address`](Cmdp.md#address)

---

### controller

> `protected` **controller**: `string`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:12

#### Inherited from

[`Cmdp`](Cmdp.md).[`controller`](Cmdp.md#controller)

---

### domains

> `protected` **domains**: `string`[]

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:10

#### Inherited from

[`Cmdp`](Cmdp.md).[`domains`](Cmdp.md#domains)

---

### meta

> `protected` **meta**: `undefined` \| [`TCmdpMeta`](../type-aliases/TCmdpMeta.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:9

#### Inherited from

[`Cmdp`](Cmdp.md).[`meta`](Cmdp.md#meta)

---

### method

> `protected` **method**: `string`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:13

#### Inherited from

[`Cmdp`](Cmdp.md).[`method`](Cmdp.md#method)

---

### payload

> `protected` **payload**: [`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:10

#### Inherited from

[`Cmdp`](Cmdp.md).[`payload`](Cmdp.md#payload)

---

### port

> `protected` **port**: `string`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:11

#### Inherited from

[`Cmdp`](Cmdp.md).[`port`](Cmdp.md#port)

---

### protocol

> `protected` **protocol**: `string` = `'cmdp://'`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:8

#### Inherited from

[`Cmdp`](Cmdp.md).[`protocol`](Cmdp.md#protocol)

---

### returnMeta

> `protected` **returnMeta**: `undefined` \| [`TCmdpMeta`](../type-aliases/TCmdpMeta.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:11

#### Inherited from

[`Cmdp`](Cmdp.md).[`returnMeta`](Cmdp.md#returnmeta)

---

### returnPayload

> `protected` **returnPayload**: [`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:12

#### Inherited from

[`Cmdp`](Cmdp.md).[`returnPayload`](Cmdp.md#returnpayload)

---

### user

> `protected` **user**: `string`

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:9

#### Inherited from

[`Cmdp`](Cmdp.md).[`user`](Cmdp.md#user)

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

[`Cmdp`](Cmdp.md).[`check`](Cmdp.md#check)

---

### getInfo()

> **getInfo**(): [`TCmdpInfo`](../type-aliases/TCmdpInfo.md)

Defined in: src/packages/iswork/src/cmdp/abstract-cmdp.ts:41

获取cmdp信息

#### Returns

[`TCmdpInfo`](../type-aliases/TCmdpInfo.md)

#### Inherited from

[`Cmdp`](Cmdp.md).[`getInfo`](Cmdp.md#getinfo)

---

### getMessage()

#### Call Signature

> **getMessage**(): [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:127

获取消息数据

##### Returns

[`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

##### Inherited from

[`Cmdp`](Cmdp.md).[`getMessage`](Cmdp.md#getmessage)

#### Call Signature

> **getMessage**(`payload`): [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:128

获取消息数据

##### Parameters

###### payload

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

##### Returns

[`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

##### Inherited from

[`Cmdp`](Cmdp.md).[`getMessage`](Cmdp.md#getmessage)

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

##### Inherited from

[`Cmdp`](Cmdp.md).[`getMeta`](Cmdp.md#getmeta)

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

##### Inherited from

[`Cmdp`](Cmdp.md).[`getMeta`](Cmdp.md#getmeta)

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

##### Inherited from

[`Cmdp`](Cmdp.md).[`getPayload`](Cmdp.md#getpayload)

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

##### Inherited from

[`Cmdp`](Cmdp.md).[`getPayload`](Cmdp.md#getpayload)

---

### getReturnMessage()

#### Call Signature

> **getReturnMessage**(): [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:141

获取返回消息数据

##### Returns

[`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

##### Inherited from

[`Cmdp`](Cmdp.md).[`getReturnMessage`](Cmdp.md#getreturnmessage)

#### Call Signature

> **getReturnMessage**(`payload`): [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:142

获取返回消息数据

##### Parameters

###### payload

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

##### Returns

[`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

##### Inherited from

[`Cmdp`](Cmdp.md).[`getReturnMessage`](Cmdp.md#getreturnmessage)

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

##### Inherited from

[`Cmdp`](Cmdp.md).[`getReturnMeta`](Cmdp.md#getreturnmeta)

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

##### Inherited from

[`Cmdp`](Cmdp.md).[`getReturnMeta`](Cmdp.md#getreturnmeta)

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

##### Inherited from

[`Cmdp`](Cmdp.md).[`getReturnPayload`](Cmdp.md#getreturnpayload)

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

##### Inherited from

[`Cmdp`](Cmdp.md).[`getReturnPayload`](Cmdp.md#getreturnpayload)

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

[`Cmdp`](Cmdp.md).[`initByAddress`](Cmdp.md#initbyaddress)

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

[`Cmdp`](Cmdp.md).[`parse`](Cmdp.md#parse)

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

#### Inherited from

[`Cmdp`](Cmdp.md).[`searchSubDomain`](Cmdp.md#searchsubdomain)

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

[`Cmdp`](Cmdp.md).[`setAddressInfo`](Cmdp.md#setaddressinfo)

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

##### Inherited from

[`Cmdp`](Cmdp.md).[`setMeta`](Cmdp.md#setmeta)

#### Call Signature

> **setMeta**(`value`): `void`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:33

##### Parameters

###### value

[`TCmdpMeta`](../type-aliases/TCmdpMeta.md)

##### Returns

`void`

##### Inherited from

[`Cmdp`](Cmdp.md).[`setMeta`](Cmdp.md#setmeta)

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

##### Inherited from

[`Cmdp`](Cmdp.md).[`setPayload`](Cmdp.md#setpayload)

#### Call Signature

> **setPayload**(`payload`): `void`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:52

##### Parameters

###### payload

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

##### Returns

`void`

##### Inherited from

[`Cmdp`](Cmdp.md).[`setPayload`](Cmdp.md#setpayload)

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

##### Inherited from

[`Cmdp`](Cmdp.md).[`setReturnMeta`](Cmdp.md#setreturnmeta)

#### Call Signature

> **setReturnMeta**(`value`): `void`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:73

##### Parameters

###### value

[`TCmdpMeta`](../type-aliases/TCmdpMeta.md)

##### Returns

`void`

##### Inherited from

[`Cmdp`](Cmdp.md).[`setReturnMeta`](Cmdp.md#setreturnmeta)

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

##### Inherited from

[`Cmdp`](Cmdp.md).[`setReturnPayload`](Cmdp.md#setreturnpayload)

#### Call Signature

> **setReturnPayload**(`payload`): `void`

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:92

##### Parameters

###### payload

[`TCmdpPayload`](../type-aliases/TCmdpPayload.md)

##### Returns

`void`

##### Inherited from

[`Cmdp`](Cmdp.md).[`setReturnPayload`](Cmdp.md#setreturnpayload)

---

### create()

> `static` **create**(`addOrInfo`, `options?`): [`Cmdp`](Cmdp.md)

Defined in: src/packages/iswork/src/cmdp/cmdp.ts:14

#### Parameters

##### addOrInfo

[`TCmdpAddressInfo`](../type-aliases/TCmdpAddressInfo.md) | [`TCmdpMessage`](../type-aliases/TCmdpMessage.md)

##### options?

[`TCmdpOptions`](../type-aliases/TCmdpOptions.md)

#### Returns

[`Cmdp`](Cmdp.md)

#### Inherited from

[`Cmdp`](Cmdp.md).[`create`](Cmdp.md#create)

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

[`Cmdp`](Cmdp.md).[`getAddressByInfo`](Cmdp.md#getaddressbyinfo)
