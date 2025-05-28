[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / unWarp

# Function: unWarp()

> **unWarp**\<`R`\>(`value`): `R`

Defined in: src/packages/util/src/message-data.ts:63

还原包装对象，将字符串还原为函数。

## Type Parameters

### R

`R` = `unknown`

## Parameters

### value

`any`

需要还原的对象

## Returns

`R`

还原后的对象

## Example

```ts
unWarp({ fn: '() => 1', __fn_0__: null }); // { fn: [Function] }
```
