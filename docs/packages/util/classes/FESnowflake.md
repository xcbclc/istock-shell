[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / FESnowflake

# Class: FESnowflake

Defined in: src/packages/util/src/snow-flake.ts:75

前端雪花算法（FE Snowflake）- 分布式唯一ID生成器

用于前端分布式环境生成全局唯一的字符串ID，适用场景：

- WebWorker 通讯消息ID标识
- IndexedDB 数据库主键生成
- 前端点对点消息传输唯一标识
- 分布式前端应用的会话ID

## 算法原理

基于Twitter雪花算法改进，生成64位整数ID，然后转换为Base62字符串：

```
64位ID结构：
+----------+----------+----------+----------+
| 时间戳   | 数据中心 | 工作节点 | 序列号   |
| 42位     | 5位      | 5位      | 12位     |
+----------+----------+----------+----------+
```

### 各部分说明：

1. **时间戳（42位）**：
   - 记录ID生成时的毫秒时间戳（相对于epoch起始时间）
   - 支持约139年的时间范围（2^42 / (1000 _ 60 _ 60 _ 24 _ 365) ≈ 139年）
   - 确保时间维度的唯一性

2. **数据中心ID（5位）**：
   - 支持32个不同的数据中心（2^5 = 32）
   - 用于区分不同的部署环境或地理位置

3. **工作节点ID（5位）**：
   - 支持32个不同的工作节点（2^5 = 32）
   - 用于区分同一数据中心内的不同实例

4. **序列号（12位）**：
   - 同一毫秒内的递增序列（2^12 = 4096）
   - 支持每毫秒生成4096个不同ID
   - 序列溢出时等待下一毫秒

### 唯一性保证机制：

1. **时间唯一性**：不同时间戳确保基础唯一性
2. **空间唯一性**：数据中心ID + 工作节点ID 确保不同实例间唯一
3. **序列唯一性**：同一毫秒内通过递增序列号保证唯一
4. **时钟回退保护**：检测系统时钟回退并抛出异常

### 性能特点：

- **高性能**：纯内存操作，无需网络通信
- **高并发**：每毫秒可生成4096个ID
- **趋势递增**：ID大致按时间顺序递增，有利于数据库索引
- **紧凑性**：Base62编码生成较短的字符串表示

## Example

```typescript
// 基本使用
const snowflake = new FESnowflake(1, 1);
const id = snowflake.nextId(); // 生成类似 "2aB9xK7mN" 的ID

// 批量生成
const ids = snowflake.nextIds(100);

// 解析ID信息（调试用）
const info = snowflake.parseId(id);
console.log(info); // { timestamp, datacenterId, workerId, sequence }

// 多实例部署
const worker1 = new FESnowflake(1, 1); // 数据中心1，工作节点1
const worker2 = new FESnowflake(2, 1); // 数据中心1，工作节点2
const worker3 = new FESnowflake(1, 2); // 数据中心2，工作节点1
```

## Constructors

### Constructor

> **new FESnowflake**(`workerId`, `datacenterId`): `FESnowflake`

Defined in: src/packages/util/src/snow-flake.ts:101

构造函数

#### Parameters

##### workerId

`number` = `0`

工作机器ID (0-31)

##### datacenterId

`number` = `0`

数据中心ID (0-31)

#### Returns

`FESnowflake`

## Methods

### nextId()

> **nextId**(): `string`

Defined in: src/packages/util/src/snow-flake.ts:117

生成下一个唯一ID

#### Returns

`string`

唯一的字符串ID

---

### nextIds()

> **nextIds**(`count`): `string`[]

Defined in: src/packages/util/src/snow-flake.ts:212

生成批量ID

#### Parameters

##### count

`number`

生成数量

#### Returns

`string`[]

ID数组

---

### parseId()

> **parseId**(`id`): `object`

Defined in: src/packages/util/src/snow-flake.ts:225

获取ID信息（用于调试）

#### Parameters

##### id

`string`

要解析的ID字符串

#### Returns

`object`

ID信息对象

##### datacenterId

> **datacenterId**: `number`

##### sequence

> **sequence**: `number`

##### timestamp

> **timestamp**: `number`

##### workerId

> **workerId**: `number`
