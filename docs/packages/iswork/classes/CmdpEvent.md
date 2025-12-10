[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / CmdpEvent

# Class: CmdpEvent

Defined in: cmdp/cmdp-event.ts:32

CMDP 事件协议类

## Description

继承自 Cmdp 类，专门用于处理事件类型的 CMDP 协议通信

## Example

```typescript
// 通过消息对象创建事件协议实例
const eventCmdp1 = new CmdpEvent({
  address: 'event://@admin.example.com:8080/EventController.handleEvent',
  meta: { timestamp: Date.now() },
  payload: { eventType: 'user-login', userId: '123' },
});

// 通过地址信息创建事件协议实例
const eventCmdp2 = new CmdpEvent({
  user: 'admin',
  domains: ['example', 'com'],
  port: '8080',
  controller: 'EventController',
  method: 'handleEvent',
});
```

## Extends

- [`Cmdp`](Cmdp.md)

## Constructors

### Constructor

> **new CmdpEvent**(`msgOrInfo`): `CmdpEvent`

Defined in: cmdp/cmdp-event.ts:56

构造函数

#### Parameters

##### msgOrInfo

CMDP 消息对象或地址信息对象

[`CmdpInfo`](../type-aliases/CmdpInfo.md) | [`CmdpMessage`](../type-aliases/CmdpMessage.md)

#### Returns

`CmdpEvent`

#### Description

创建 CMDP 事件协议实例，自动使用 'event://' 协议标识符

#### Example

```typescript
// 使用消息对象初始化
const eventCmdp = new CmdpEvent({
  address: 'event://@admin.example.com:8080/EventController.handleEvent',
  meta: { source: 'client' },
  payload: { action: 'click', target: 'button' },
});

// 使用地址信息初始化
const eventCmdp2 = new CmdpEvent({
  user: 'system',
  domains: ['internal', 'service'],
  port: '9000',
  controller: 'NotificationController',
  method: 'sendAlert',
});
```

#### Overrides

[`Cmdp`](Cmdp.md).[`constructor`](Cmdp.md#constructor)

## Properties

### address

> `protected` **address**: `string`

Defined in: cmdp/abstract-cmdp.ts:53

完整的 CMDP 地址

#### Inherited from

[`Cmdp`](Cmdp.md).[`address`](Cmdp.md#address)

---

### controller

> `protected` **controller**: `string`

Defined in: cmdp/abstract-cmdp.ts:47

控制器名称

#### Inherited from

[`Cmdp`](Cmdp.md).[`controller`](Cmdp.md#controller)

---

### domains

> `protected` **domains**: `string`[]

Defined in: cmdp/abstract-cmdp.ts:41

域名数组，支持多级域名

#### Inherited from

[`Cmdp`](Cmdp.md).[`domains`](Cmdp.md#domains)

---

### meta

> `protected` **meta**: `undefined` \| [`CmdpMeta`](../type-aliases/CmdpMeta.md)

Defined in: cmdp/cmdp.ts:41

请求元数据

#### Description

存储请求相关的元数据信息

#### Inherited from

[`Cmdp`](Cmdp.md).[`meta`](Cmdp.md#meta)

---

### method

> `protected` **method**: `string`

Defined in: cmdp/abstract-cmdp.ts:50

方法名称

#### Inherited from

[`Cmdp`](Cmdp.md).[`method`](Cmdp.md#method)

---

### payload

> `protected` **payload**: [`CmdpPayload`](../type-aliases/CmdpPayload.md)

Defined in: cmdp/cmdp.ts:48

请求负载数据

#### Description

存储请求的负载数据

#### Inherited from

[`Cmdp`](Cmdp.md).[`payload`](Cmdp.md#payload)

---

### port

> `protected` **port**: `string`

Defined in: cmdp/abstract-cmdp.ts:44

端口号

#### Inherited from

[`Cmdp`](Cmdp.md).[`port`](Cmdp.md#port)

---

### protocol

> `protected` **protocol**: `string` = `'cmdp:'`

Defined in: cmdp/abstract-cmdp.ts:35

CMDP 协议标识符，默认为 'cmdp:'

#### Inherited from

[`Cmdp`](Cmdp.md).[`protocol`](Cmdp.md#protocol)

---

### returnMeta

> `protected` **returnMeta**: `undefined` \| [`CmdpMeta`](../type-aliases/CmdpMeta.md)

Defined in: cmdp/cmdp.ts:55

响应元数据

#### Description

存储响应相关的元数据信息

#### Inherited from

[`Cmdp`](Cmdp.md).[`returnMeta`](Cmdp.md#returnmeta)

---

### returnPayload

> `protected` **returnPayload**: [`CmdpPayload`](../type-aliases/CmdpPayload.md)

Defined in: cmdp/cmdp.ts:62

响应负载数据

#### Description

存储响应的负载数据

#### Inherited from

[`Cmdp`](Cmdp.md).[`returnPayload`](Cmdp.md#returnpayload)

---

### user

> `protected` **user**: `string`

Defined in: cmdp/abstract-cmdp.ts:38

用户名

#### Inherited from

[`Cmdp`](Cmdp.md).[`user`](Cmdp.md#user)

## Methods

### getInfo()

> **getInfo**(): [`CmdpInfo`](../type-aliases/CmdpInfo.md)

Defined in: cmdp/abstract-cmdp.ts:201

获取完整的 CMDP 信息

#### Returns

[`CmdpInfo`](../type-aliases/CmdpInfo.md)

完整的 CMDP 信息对象

#### Description

返回包含所有 CMDP 相关信息的对象，包括地址信息、元数据和载荷数据

#### Example

```typescript
const cmdp = new MyCmdp('cmdp://@admin.example.com:8080/UserController.getUser');
const info = cmdp.getInfo();
console.log(info.protocol); // 'cmdp:'
console.log(info.user); // 'admin'
console.log(info.domains); // ['example', 'com']
console.log(info.controller); // 'UserController'
console.log(info.method); // 'getUser'
```

#### Inherited from

[`Cmdp`](Cmdp.md).[`getInfo`](Cmdp.md#getinfo)

---

### getMessage()

获取消息数据的实现

#### Description

获取包含地址、响应元数据和响应负载的完整消息对象

#### Param

可选的响应负载数据

#### Example

```typescript
// 获取当前消息
const message1 = cmdp.getMessage();

// 设置负载并获取消息
const message2 = cmdp.getMessage({ result: 'success', data: userData });

// 消息结构:
// {
//   address: 'cmdp://@admin.example.com:8080/UserController.getUser',
//   meta: { status: 'success', timestamp: 1234567890 },
//   payload: { result: 'success', data: userData }
// }
```

#### Call Signature

> **getMessage**(): [`CmdpMessage`](../type-aliases/CmdpMessage.md)

Defined in: cmdp/cmdp.ts:483

获取消息数据

##### Returns

[`CmdpMessage`](../type-aliases/CmdpMessage.md)

CMDP 消息对象

##### Description

获取当前的消息数据，包含地址、响应元数据和响应负载

##### Inherited from

[`Cmdp`](Cmdp.md).[`getMessage`](Cmdp.md#getmessage)

#### Call Signature

> **getMessage**(`payload`): [`CmdpMessage`](../type-aliases/CmdpMessage.md)

Defined in: cmdp/cmdp.ts:491

获取消息数据

##### Parameters

###### payload

[`CmdpPayload`](../type-aliases/CmdpPayload.md)

响应负载数据

##### Returns

[`CmdpMessage`](../type-aliases/CmdpMessage.md)

CMDP 消息对象

##### Description

设置响应负载并获取消息数据

##### Inherited from

[`Cmdp`](Cmdp.md).[`getMessage`](Cmdp.md#getmessage)

---

### getMeta()

获取请求元数据的实现

#### Description

支持获取完整元数据对象或指定键的值

#### Template

返回值类型

#### Param

可选的元数据键名

#### Example

```typescript
// 获取完整元数据
const allMeta = cmdp.getMeta();

// 获取指定键的元数据
const timestamp = cmdp.getMeta('timestamp');
const userId = cmdp.getMeta<string>('userId');
```

#### Call Signature

> **getMeta**\<`Return`\>(): `Return`

Defined in: cmdp/cmdp.ts:173

获取完整的请求元数据

##### Type Parameters

###### Return

`Return` _extends_ `undefined` \| [`CmdpMeta`](../type-aliases/CmdpMeta.md)

返回值类型

##### Returns

`Return`

完整的元数据对象

##### Description

获取完整的元数据对象

##### Inherited from

[`Cmdp`](Cmdp.md).[`getMeta`](Cmdp.md#getmeta)

#### Call Signature

> **getMeta**\<`Return`\>(`key`): `Return`

Defined in: cmdp/cmdp.ts:182

获取指定键的请求元数据

##### Type Parameters

###### Return

`Return` _extends_ [`CmdpMetaValue`](../type-aliases/CmdpMetaValue.md)

返回值类型

##### Parameters

###### key

`never`

元数据键名

##### Returns

`Return`

指定键的元数据值

##### Description

获取指定键名的元数据值

##### Inherited from

[`Cmdp`](Cmdp.md).[`getMeta`](Cmdp.md#getmeta)

---

### getPayload()

获取请求负载数据的实现

#### Description

支持获取完整负载数据对象或指定键的值

#### Template

返回值类型

#### Param

可选的负载数据键名

#### Example

```typescript
// 获取完整负载数据
const allPayload = cmdp.getPayload();

// 获取指定键的负载数据
const userId = cmdp.getPayload<string>('userId');
const action = cmdp.getPayload('action');
```

#### Call Signature

> **getPayload**\<`Return`\>(): `Return`

Defined in: cmdp/cmdp.ts:255

获取完整的请求负载数据

##### Type Parameters

###### Return

`Return` _extends_ [`CmdpPayload`](../type-aliases/CmdpPayload.md)

返回值类型

##### Returns

`Return`

完整的负载数据对象

##### Description

获取完整的负载数据对象

##### Inherited from

[`Cmdp`](Cmdp.md).[`getPayload`](Cmdp.md#getpayload)

#### Call Signature

> **getPayload**\<`Return`\>(`key`): `Return`

Defined in: cmdp/cmdp.ts:264

获取指定键的请求负载数据

##### Type Parameters

###### Return

`Return` = `unknown`

返回值类型

##### Parameters

###### key

`string`

负载数据键名

##### Returns

`Return`

指定键的负载数据值

##### Description

获取指定键名的负载数据值

##### Inherited from

[`Cmdp`](Cmdp.md).[`getPayload`](Cmdp.md#getpayload)

---

### getReturnMessage()

获取返回消息数据的实现

#### Description

获取包含地址、响应元数据和响应负载的完整返回消息对象

#### Param

可选的响应负载数据

#### Example

```typescript
// 获取当前返回消息
const returnMessage1 = cmdp.getReturnMessage();

// 设置负载并获取返回消息
const returnMessage2 = cmdp.getReturnMessage({
  success: true,
  data: processedData,
});

// 返回消息结构:
// {
//   address: 'cmdp://@admin.example.com:8080/UserController.getUser',
//   meta: { status: 'completed', messageId: 'msg-123' },
//   payload: { success: true, data: processedData }
// }
```

#### Call Signature

> **getReturnMessage**(): [`CmdpMessage`](../type-aliases/CmdpMessage.md)

Defined in: cmdp/cmdp.ts:528

获取返回消息数据

##### Returns

[`CmdpMessage`](../type-aliases/CmdpMessage.md)

CMDP 消息对象

##### Description

获取当前的返回消息数据，包含地址、响应元数据和响应负载

##### Inherited from

[`Cmdp`](Cmdp.md).[`getReturnMessage`](Cmdp.md#getreturnmessage)

#### Call Signature

> **getReturnMessage**(`payload`): [`CmdpMessage`](../type-aliases/CmdpMessage.md)

Defined in: cmdp/cmdp.ts:536

获取返回消息数据

##### Parameters

###### payload

[`CmdpPayload`](../type-aliases/CmdpPayload.md)

响应负载数据

##### Returns

[`CmdpMessage`](../type-aliases/CmdpMessage.md)

CMDP 消息对象

##### Description

设置响应负载并获取返回消息数据

##### Inherited from

[`Cmdp`](Cmdp.md).[`getReturnMessage`](Cmdp.md#getreturnmessage)

---

### getReturnMeta()

获取响应元数据的实现

#### Description

支持获取完整响应元数据对象或指定键的值

#### Template

返回值类型

#### Param

可选的元数据键名

#### Example

```typescript
// 获取完整响应元数据
const allReturnMeta = cmdp.getReturnMeta();

// 获取指定键的响应元数据
const status = cmdp.getReturnMeta<string>('status');
const timestamp = cmdp.getReturnMeta('timestamp');
```

#### Call Signature

> **getReturnMeta**\<`Return`\>(): `Return`

Defined in: cmdp/cmdp.ts:339

获取完整的响应元数据

##### Type Parameters

###### Return

`Return` _extends_ `undefined` \| [`CmdpMeta`](../type-aliases/CmdpMeta.md)

返回值类型

##### Returns

`Return`

完整的响应元数据对象

##### Description

获取完整的响应元数据对象

##### Inherited from

[`Cmdp`](Cmdp.md).[`getReturnMeta`](Cmdp.md#getreturnmeta)

#### Call Signature

> **getReturnMeta**\<`Return`\>(`key`): `Return`

Defined in: cmdp/cmdp.ts:348

获取指定键的响应元数据

##### Type Parameters

###### Return

`Return` _extends_ [`CmdpMetaValue`](../type-aliases/CmdpMetaValue.md)

返回值类型

##### Parameters

###### key

`never`

元数据键名

##### Returns

`Return`

指定键的响应元数据值

##### Description

获取指定键名的响应元数据值

##### Inherited from

[`Cmdp`](Cmdp.md).[`getReturnMeta`](Cmdp.md#getreturnmeta)

---

### getReturnPayload()

获取响应负载数据的实现

#### Description

支持获取完整响应负载数据对象或指定键的值

#### Template

返回值类型

#### Param

可选的负载数据键名

#### Example

```typescript
// 获取完整响应负载数据
const allReturnPayload = cmdp.getReturnPayload();

// 获取指定键的响应负载数据
const result = cmdp.getReturnPayload<any>('result');
const data = cmdp.getReturnPayload('data');
```

#### Call Signature

> **getReturnPayload**\<`Return`\>(): `Return`

Defined in: cmdp/cmdp.ts:421

获取完整的响应负载数据

##### Type Parameters

###### Return

`Return` _extends_ [`CmdpPayload`](../type-aliases/CmdpPayload.md)

返回值类型

##### Returns

`Return`

完整的响应负载数据对象

##### Description

获取完整的响应负载数据对象

##### Inherited from

[`Cmdp`](Cmdp.md).[`getReturnPayload`](Cmdp.md#getreturnpayload)

#### Call Signature

> **getReturnPayload**\<`Return`\>(`key`): `Return`

Defined in: cmdp/cmdp.ts:430

获取指定键的响应负载数据

##### Type Parameters

###### Return

`Return` = `unknown`

返回值类型

##### Parameters

###### key

`string`

负载数据键名

##### Returns

`Return`

指定键的响应负载数据值

##### Description

获取指定键名的响应负载数据值

##### Inherited from

[`Cmdp`](Cmdp.md).[`getReturnPayload`](Cmdp.md#getreturnpayload)

---

### initByAddress()

> `protected` **initByAddress**(`address`): `void`

Defined in: cmdp/abstract-cmdp.ts:233

通过地址字符串初始化实例

#### Parameters

##### address

`string`

CMDP 地址字符串

#### Returns

`void`

#### Description

解析 CMDP 地址字符串并设置实例的各个属性

#### Throws

当地址格式不正确时抛出错误

#### Example

```typescript
// 在子类构造函数中使用
this.initByAddress('cmdp://@admin.example.com:8080/UserController.getUser');
```

#### Inherited from

[`Cmdp`](Cmdp.md).[`initByAddress`](Cmdp.md#initbyaddress)

---

### searchSubDomain()

> **searchSubDomain**(`rootDomain`): `string`

Defined in: cmdp/cmdp.ts:469

查找子域

#### Parameters

##### rootDomain

`string` = `''`

根域名，默认为空字符串

#### Returns

`string`

找到的子域名

#### Description

从域名列表中查找子域，排除指定的根域名

#### Throws

当未找到子域时抛出错误

#### Example

```typescript
// 假设域名为 ['api', 'example', 'com']
const subDomain1 = cmdp.searchSubDomain('com'); // 返回 'example'
const subDomain2 = cmdp.searchSubDomain(); // 返回 'com'
```

#### Inherited from

[`Cmdp`](Cmdp.md).[`searchSubDomain`](Cmdp.md#searchsubdomain)

---

### setAddressInfo()

> `protected` **setAddressInfo**(`info`): `void`

Defined in: cmdp/abstract-cmdp.ts:263

设置地址基本信息

#### Parameters

##### info

[`CmdpAddressInfo`](../type-aliases/CmdpAddressInfo.md)

CMDP 地址信息对象

#### Returns

`void`

#### Description

根据地址信息对象设置实例的各个属性，并重新生成完整地址

#### Example

```typescript
const info: CmdpAddressInfo = {
  protocol: 'cmdp:',
  user: 'admin',
  domains: ['example', 'com'],
  port: '8080',
  controller: 'UserController',
  method: 'getUser',
};
this.setAddressInfo(info);
```

#### Inherited from

[`Cmdp`](Cmdp.md).[`setAddressInfo`](Cmdp.md#setaddressinfo)

---

### setMeta()

设置请求元数据的实现

#### Description

支持设置单个键值对或完整的元数据对象

#### Param

元数据键名或完整元数据对象

#### Param

元数据值（当第一个参数为键名时使用）

#### Example

```typescript
// 设置单个元数据
cmdp.setMeta('timestamp', Date.now());
cmdp.setMeta('userId', '123');

// 设置完整元数据对象
cmdp.setMeta({
  timestamp: Date.now(),
  userId: '123',
  source: 'client',
});
```

#### Call Signature

> **setMeta**(`key`, `value`): `void`

Defined in: cmdp/cmdp.ts:130

设置请求元数据

##### Parameters

###### key

`string`

元数据键名

###### value

[`CmdpMetaValue`](../type-aliases/CmdpMetaValue.md)

元数据值

##### Returns

`void`

##### Description

设置单个元数据键值对

##### Inherited from

[`Cmdp`](Cmdp.md).[`setMeta`](Cmdp.md#setmeta)

#### Call Signature

> **setMeta**(`value`): `void`

Defined in: cmdp/cmdp.ts:137

设置请求元数据

##### Parameters

###### value

[`CmdpMeta`](../type-aliases/CmdpMeta.md)

元数据对象

##### Returns

`void`

##### Description

设置完整的元数据对象

##### Inherited from

[`Cmdp`](Cmdp.md).[`setMeta`](Cmdp.md#setmeta)

---

### setPayload()

设置请求负载数据的实现

#### Description

支持设置单个键值对或完整的负载数据对象

#### Param

负载数据键名或完整负载数据对象

#### Param

负载数据值（当第一个参数为键名时使用）

#### Example

```typescript
// 设置单个负载数据
cmdp.setPayload('userId', '123');
cmdp.setPayload('action', 'login');

// 设置完整负载数据对象
cmdp.setPayload({
  userId: '123',
  action: 'login',
  timestamp: Date.now(),
});
```

#### Call Signature

> **setPayload**(`key`, `value`): `void`

Defined in: cmdp/cmdp.ts:212

设置请求负载数据

##### Parameters

###### key

`string`

负载数据键名

###### value

`unknown`

负载数据值

##### Returns

`void`

##### Description

设置单个负载数据键值对

##### Inherited from

[`Cmdp`](Cmdp.md).[`setPayload`](Cmdp.md#setpayload)

#### Call Signature

> **setPayload**(`payload`): `void`

Defined in: cmdp/cmdp.ts:219

设置请求负载数据

##### Parameters

###### payload

[`CmdpPayload`](../type-aliases/CmdpPayload.md)

负载数据对象

##### Returns

`void`

##### Description

设置完整的负载数据对象

##### Inherited from

[`Cmdp`](Cmdp.md).[`setPayload`](Cmdp.md#setpayload)

---

### setReturnMeta()

设置响应元数据的实现

#### Description

支持设置单个键值对或完整的响应元数据对象

#### Param

元数据键名或完整元数据对象

#### Param

元数据值（当第一个参数为键名时使用）

#### Example

```typescript
// 设置单个响应元数据
cmdp.setReturnMeta('status', 'success');
cmdp.setReturnMeta('timestamp', Date.now());

// 设置完整响应元数据对象
cmdp.setReturnMeta({
  status: 'success',
  timestamp: Date.now(),
  messageId: 'msg-123',
});
```

#### Call Signature

> **setReturnMeta**(`key`, `value`): `void`

Defined in: cmdp/cmdp.ts:296

设置响应元数据

##### Parameters

###### key

`string`

元数据键名

###### value

[`CmdpMetaValue`](../type-aliases/CmdpMetaValue.md)

元数据值

##### Returns

`void`

##### Description

设置单个响应元数据键值对

##### Inherited from

[`Cmdp`](Cmdp.md).[`setReturnMeta`](Cmdp.md#setreturnmeta)

#### Call Signature

> **setReturnMeta**(`value`): `void`

Defined in: cmdp/cmdp.ts:303

设置响应元数据

##### Parameters

###### value

[`CmdpMeta`](../type-aliases/CmdpMeta.md)

元数据对象

##### Returns

`void`

##### Description

设置完整的响应元数据对象

##### Inherited from

[`Cmdp`](Cmdp.md).[`setReturnMeta`](Cmdp.md#setreturnmeta)

---

### setReturnPayload()

设置响应负载数据的实现

#### Description

支持设置单个键值对或完整的响应负载数据对象

#### Param

负载数据键名或完整负载数据对象

#### Param

负载数据值（当第一个参数为键名时使用）

#### Example

```typescript
// 设置单个响应负载数据
cmdp.setReturnPayload('result', { success: true });
cmdp.setReturnPayload('data', userData);

// 设置完整响应负载数据对象
cmdp.setReturnPayload({
  result: { success: true },
  data: userData,
  timestamp: Date.now(),
});
```

#### Call Signature

> **setReturnPayload**(`key`, `value`): `void`

Defined in: cmdp/cmdp.ts:378

设置响应负载数据

##### Parameters

###### key

`string`

负载数据键名

###### value

`unknown`

负载数据值

##### Returns

`void`

##### Description

设置单个响应负载数据键值对

##### Inherited from

[`Cmdp`](Cmdp.md).[`setReturnPayload`](Cmdp.md#setreturnpayload)

#### Call Signature

> **setReturnPayload**(`payload`): `void`

Defined in: cmdp/cmdp.ts:385

设置响应负载数据

##### Parameters

###### payload

[`CmdpPayload`](../type-aliases/CmdpPayload.md)

负载数据对象

##### Returns

`void`

##### Description

设置完整的响应负载数据对象

##### Inherited from

[`Cmdp`](Cmdp.md).[`setReturnPayload`](Cmdp.md#setreturnpayload)

---

### check()

> `protected` `static` **check**(`address`, `protocol`): `boolean`

Defined in: cmdp/abstract-cmdp.ts:148

检查地址格式是否正确

#### Parameters

##### address

`string`

待检查的地址字符串

##### protocol

`string` = `'cmdp:'`

待检查的地址协议

#### Returns

`boolean`

如果地址格式正确返回 true，否则返回 false

#### Description

验证传入的地址字符串是否符合 CMDP 协议格式

#### Example

```typescript
// 正确格式示例: cmdp://@user.domain.subDomain:1/controllerName.methodName
const isValid = AbstractCmdp.check('cmdp://@admin.example.com:8080/UserController.getUser');
console.log(isValid); // true

const isInvalid = AbstractCmdp.check('invalid-address');
console.log(isInvalid); // false
```

#### Inherited from

[`Cmdp`](Cmdp.md).[`check`](Cmdp.md#check)

---

### create()

> `static` **create**(`addOrInfo`, `options?`): [`Cmdp`](Cmdp.md)

Defined in: cmdp/cmdp.ts:81

创建 CMDP 实例的静态工厂方法

#### Parameters

##### addOrInfo

CMDP 消息对象或地址信息对象

[`CmdpAddressInfo`](../type-aliases/CmdpAddressInfo.md) | [`CmdpMessage`](../type-aliases/CmdpMessage.md)

##### options?

[`CmdpOptions`](../type-aliases/CmdpOptions.md)

可选的协议配置

#### Returns

[`Cmdp`](Cmdp.md)

CMDP 实例

#### Description

提供创建 CMDP 实例的便捷方法

#### Static

#### Example

```typescript
// 使用静态方法创建实例
const cmdp = Cmdp.create({
  address: 'cmdp://@admin.example.com:8080/UserController.getUser',
  meta: { source: 'client' },
  payload: { userId: '123' },
});
```

#### Inherited from

[`Cmdp`](Cmdp.md).[`create`](Cmdp.md#create)

---

### getAddressByInfo()

> `static` **getAddressByInfo**(`info`): `string`

Defined in: cmdp/abstract-cmdp.ts:87

根据地址信息构建完整的 CMDP 地址

#### Parameters

##### info

[`CmdpAddressInfo`](../type-aliases/CmdpAddressInfo.md)

CMDP 地址信息对象

#### Returns

`string`

格式化的 CMDP 地址字符串

#### Description

将 CmdpAddressInfo 对象转换为标准的 CMDP 地址字符串

#### Static

#### Example

```typescript
const info: CmdpAddressInfo = {
  protocol: 'cmdp:',
  user: 'admin',
  domains: ['example', 'com'],
  port: '8080',
  controller: 'UserController',
  method: 'getUser',
};
const address = AbstractCmdp.getAddressByInfo(info);
// 返回: 'cmdp://@admin.example.com:8080/UserController.getUser'
```

#### Inherited from

[`Cmdp`](Cmdp.md).[`getAddressByInfo`](Cmdp.md#getaddressbyinfo)

---

### parseAddress()

> `static` **parseAddress**(`address`): [`CmdpInfo`](../type-aliases/CmdpInfo.md)

Defined in: cmdp/abstract-cmdp.ts:114

解析 CMDP 地址字符串

#### Parameters

##### address

`string`

要解析的 CMDP 地址字符串

#### Returns

[`CmdpInfo`](../type-aliases/CmdpInfo.md)

解析后的 CMDP 信息对象

#### Description

将 CMDP 地址字符串解析为结构化的地址信息对象

#### Static

#### Example

```typescript
const address = 'cmdp://@admin.example.com:8080/UserController.getUser';
const info = AbstractCmdp.parse(address);
// 返回:
// {
//   address: 'cmdp://@admin.example.com:8080/UserController.getUser',
//   protocol: 'cmdp:',
//   user: 'admin',
//   domains: ['example', 'com'],
//   port: '8080',
//   controller: 'UserController',
//   method: 'getUser'
// }
```

#### Inherited from

[`Cmdp`](Cmdp.md).[`parseAddress`](Cmdp.md#parseaddress)
