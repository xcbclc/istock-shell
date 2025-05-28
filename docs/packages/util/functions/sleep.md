[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / sleep

# Function: sleep()

> **sleep**(`timeout`): `Promise`\<`unknown`\>

Defined in: src/packages/util/src/sleep.ts:9

异步等待指定时间（毫秒）。

## Parameters

### timeout

`number` = `0`

等待的毫秒数，默认 0

## Returns

`Promise`\<`unknown`\>

Promise<void>

## Example

```ts
await sleep(1000); // 等待 1 秒
```
