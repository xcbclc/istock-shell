**@istock-shell/util**

---

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

基于雪花算法的分布式唯一 ID 生成器。

```typescript
class FESnowflake {
  constructor(workerId: number, portId: number);
  nextId(): string;
}

// 示例
const snowflake = new FESnowflake(1, 1);
const id = snowflake.nextId(); // 生成唯一字符串 ID
```

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
