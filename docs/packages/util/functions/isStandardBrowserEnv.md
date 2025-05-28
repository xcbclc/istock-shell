[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / isStandardBrowserEnv

# Function: isStandardBrowserEnv()

> **isStandardBrowserEnv**(): `boolean`

Defined in: src/packages/util/src/is.ts:320

判断当前是否运行在标准浏览器环境中

这允许代码在 Web Worker 和 React Native 环境中运行。
这些环境都支持 XMLHttpRequest，但不完全支持标准的全局对象。

Web Workers 环境:
typeof window -> undefined
typeof document -> undefined

React Native 环境:
navigator.product -> 'ReactNative'
NativeScript 环境:
navigator.product -> 'NativeScript' 或 'NS'

## Returns

`boolean`

如果在标准浏览器环境中则返回 true，否则返回 false

## Example

```typescript
if (isStandardBrowserEnv()) {
  // 可以安全使用 window 和 document
  console.log(window.location.href);
}
```
