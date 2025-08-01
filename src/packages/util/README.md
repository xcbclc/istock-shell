# @istock-shell/util

一个功能丰富的 TypeScript 工具库，提供常用的工具函数和类型检测方法。

## 特性

- 🔍 **类型检测** - 完整的类型判断函数集合
- 🎨 **颜色处理** - 颜色格式转换和调色板生成
- 📅 **日期处理** - 日期格式化和时间计算
- 🔧 **工具函数** - 字符串处理、对象合并、数组操作等
- ⚡ **事件系统** - 轻量级事件发射器
- 🆔 **ID 生成** - 雪花算法唯一 ID 生成器
- 🛡️ **安全处理** - HTML 转义和错误处理
- 📦 **零依赖** - 无外部依赖，体积小巧
- 📝 **TypeScript** - 完整的类型定义和 TSDoc 注释

## 安装

```bash
npm install @istock-shell/util
# 或
yarn add @istock-shell/util
# 或
pnpm add @istock-shell/util
```

## 使用

```typescript
import { isString, generateColorPalette, sleep, EventEmitter } from '@istock-shell/util';

// 类型检测
if (isString(value)) {
  console.log('这是一个字符串');
}

// 颜色处理
const colors = generateColorPalette(5, '#ff7d51');
console.log(colors); // ['#ff7d51', '#ff9d51', ...]

// 异步等待
await sleep(1000); // 等待 1 秒

// 事件系统
const emitter = new EventEmitter();
emitter.on('test', (data) => console.log(data));
emitter.emit('test', 'Hello World');
```

## API 文档

### 类型检测 (is.ts)

提供完整的类型判断函数，支持所有 JavaScript 基础类型和浏览器 API 类型。

```typescript
// 基础类型检测
isArray(value); // 检测数组
isString(value); // 检测字符串
isNumber(value); // 检测数字
isBoolean(value); // 检测布尔值
isObject(value); // 检测对象
isFunction(value); // 检测函数
isUndefined(value); // 检测 undefined
isNull(value); // 检测 null

// 复杂类型检测
isPlainObject(value); // 检测纯对象
isDate(value); // 检测日期对象
isRegExp(value); // 检测正则表达式
isArrayBuffer(value); // 检测 ArrayBuffer
isFormData(value); // 检测 FormData
isFile(value); // 检测 File 对象
isBlob(value); // 检测 Blob 对象

// 浏览器环境检测
isStandardBrowserEnv(); // 检测标准浏览器环境
isURLSearchParams(value); // 检测 URLSearchParams

// 工具类型检测
isValue(value); // 检测有效值（非 null/undefined）
isNil(value); // 检测 null 或 undefined
hasLength(value); // 检测是否有 length 属性
isStringFull(value); // 检测非空字符串
isArrayFull(value); // 检测非空数组
```

### 颜色处理 (color.ts)

提供颜色格式转换和调色板生成功能。

```typescript
// 生成颜色调色板
generateColorPalette(numColors: number, baseColor?: string): string[]

// 示例
const palette = generateColorPalette(5, '#ff7d51');
// 返回: ['#ff7d51', '#ff9d51', '#ffbd51', '#51ff7d', '#517dff']
```

### 日期处理 (date.ts)

提供日期格式化和时间计算功能。

```typescript
// 格式化日期
toLocaleDateString(date: Date, format: string): string

// 获取周起止时间
getStartAndEndOfWeek(today: Date): { startOfWeek: Date; endOfWeek: Date }

// 示例
const formatted = toLocaleDateString(new Date(), 'YYYY-MM-DD hh:mm:ss');
const week = getStartAndEndOfWeek(new Date());
```

### 字符串处理 (string.ts)

```typescript
// 获取字符串重叠部分
getEndAndStartOverlapStr(str1: string, str2: string): string

// 示例
getEndAndStartOverlapStr('abc', 'cde'); // 'c'
```

### 数组操作 (array.ts)

```typescript
// 根据键值查找数组元素
findByKeyForValue<T>(array: T[], value: T[keyof T], key: keyof T): T | undefined

// 示例
const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const user = findByKeyForValue(users, 2, 'id'); // { id: 2, name: 'Bob' }
```

### 对象处理 (merge-object.ts)

```typescript
// 深度合并对象
mergeObjectDeep<T>(target: Record<string, any>, source: Record<string, any>): T

// 示例
const merged = mergeObjectDeep(
  { a: 1, b: { c: 2 } },
  { b: { d: 3 }, e: 4 }
);
// 结果: { a: 1, b: { c: 2, d: 3 }, e: 4 }
```

### JSON 处理 (json.ts)

```typescript
// 序列化（支持函数）
stringify(value: unknown): string

// 解析
parse(jsonString: string): any

// 深拷贝
clone<T>(value: T): T

// 示例
const obj = { fn: () => 1, data: 'test' };
const str = stringify(obj); // '{"fn":"() => 1","data":"test"}'
const copy = clone(obj);
```

### 事件系统 (event/event-emitter.ts)

轻量级事件发射器，支持异步事件处理。

```typescript
class EventEmitter {
  on<T>(type: string, handler: EventHandler<T>): void;
  once<T>(type: string, handler: EventHandler<T>): void;
  off<T>(type: string, handler?: EventHandler<T>): void;
  emit<T>(type: string, payload?: T): Promise<void>;
}

// 示例
const emitter = new EventEmitter();

// 注册事件
emitter.on('userLogin', (user) => {
  console.log(`用户 ${user.name} 已登录`);
});

// 一次性事件
emitter.once('appReady', () => {
  console.log('应用已准备就绪');
});

// 触发事件
await emitter.emit('userLogin', { name: 'Alice' });

// 移除事件
emitter.off('userLogin');
```

### ID 生成器 (snow-flake.ts)

基于 Twitter 雪花算法的前端分布式唯一 ID 生成器，专为前端环境优化。

#### 特性

- 🔢 **64位ID结构**：时间戳(41位) + 数据中心ID(5位) + 工作节点ID(5位) + 序列号(12位)
- 🌐 **分布式支持**：支持32个数据中心，每个数据中心32个工作节点
- ⚡ **高性能**：每毫秒可生成4096个唯一ID，纯内存操作
- 📈 **趋势递增**：ID大致按时间顺序递增，有利于数据库索引
- 🔒 **时钟回退保护**：检测系统时钟回退并抛出异常
- 📦 **Base62编码**：生成较短的字符串表示，便于传输和存储
- 🎯 **前端优化**：适用于WebWorker、IndexedDB、P2P通信等场景

#### API

```typescript
class FESnowflake {
  constructor(workerId?: number, datacenterId?: number);

  // 生成单个唯一ID
  nextId(): string;

  // 批量生成ID
  nextIds(count: number): string[];

  // 解析ID信息（调试用）
  parseId(id: string): {
    timestamp: number;
    datacenterId: number;
    workerId: number;
    sequence: number;
  };
}
```

#### 使用示例

```typescript
import { FESnowflake } from '@istock-shell/util';

// 基本使用
const snowflake = new FESnowflake(1, 1);
const id = snowflake.nextId(); // 生成类似 "2aB9xK7mN" 的ID

// 批量生成
const ids = snowflake.nextIds(100);
console.log(ids); // ['2aB9xK7mN', '2aB9xK7mO', ...]

// 解析ID信息（调试用）
const info = snowflake.parseId(id);
console.log(info);
// {
//   timestamp: 1640995200123,
//   datacenterId: 1,
//   workerId: 1,
//   sequence: 0
// }

// 多实例部署
const worker1 = new FESnowflake(1, 1); // 数据中心1，工作节点1
const worker2 = new FESnowflake(2, 1); // 数据中心1，工作节点2
const worker3 = new FESnowflake(1, 2); // 数据中心2，工作节点1

// WebWorker 中使用
// main.js
const worker = new Worker('worker.js');
worker.postMessage({ type: 'generateId' });

// worker.js
const snowflake = new FESnowflake(1, 1);
self.onmessage = (e) => {
  if (e.data.type === 'generateId') {
    const id = snowflake.nextId();
    self.postMessage({ type: 'id', data: id });
  }
};

// IndexedDB 中使用
const db = await openDB('myDB', 1);
const tx = db.transaction('items', 'readwrite');
const store = tx.objectStore('items');

const item = {
  id: snowflake.nextId(),
  name: 'Example Item',
  createdAt: new Date(),
};

await store.add(item);
```

#### 适用场景

- **WebWorker 通讯**：为消息生成唯一标识符
- **IndexedDB 数据库**：作为主键生成器
- **前端点对点消息传输**：确保消息ID唯一性
- **分布式前端应用**：多实例环境下的会话ID生成
- **离线应用**：本地数据同步时的唯一标识

#### 参数说明

- `workerId` (0-31)：工作节点ID，用于区分同一数据中心内的不同实例
- `datacenterId` (0-31)：数据中心ID，用于区分不同的部署环境或地理位置

#### 时间范围

基于2022-01-01作为epoch起始时间，支持约69年的时间范围（到2091年）。

### 安全处理 (escape.ts)

HTML 字符转义，防止 XSS 攻击。

```typescript
// HTML 转义
escape(string: string): string

// 示例
escape('fred, barney, & pebbles'); // 'fred, barney, &amp; pebbles'
```

### 错误处理 (error.ts)

带作用域的自定义错误类型。

```typescript
class ScopeError extends Error {
  constructor(scope: string, message?: string);
}

// 示例
throw new ScopeError('network', '请求失败');
```

### 工具函数

```typescript
// 异步等待 (sleep.ts)
sleep(timeout?: number): Promise<void>

// 样式类名处理 (to-ui-class.ts)
tuc(className: string | string[], prefix?: string): string

// URL 参数获取 (url.ts)
getQueryParam(name: string): string | null

// 控制台警告 (warn.ts)
warn(scope: string, message?: string | string[]): void

// 示例
await sleep(1000); // 等待 1 秒
const classes = tuc(['btn', 'primary'], 'fe-'); // 'fe-btn fe-primary'
const id = getQueryParam('id'); // 获取 URL 参数
warn('network', '连接超时');
```

### 消息数据处理 (message-data.ts)

用于 Worker 通信和 IndexedDB 存储的对象序列化。

```typescript
// 包装对象（函数转字符串）
wrap<R>(value: any): R

// 还原对象（字符串转函数）
unWarp<R>(value: any): R

// 示例
const wrapped = wrap({ fn: () => 1 }); // 函数被转为字符串
const restored = unWarp(wrapped); // 字符串被还原为函数
```

## 类型支持

本库使用 TypeScript 编写，提供完整的类型定义。所有函数都包含详细的 TSDoc 注释，支持 IDE 智能提示。

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 更新日志

### 0.1.1

- 完善 TSDoc 注释
- 修复类型检测逻辑
- 优化代码结构

### 0.0.1

- 初始版本发布
- 基础工具函数集合
