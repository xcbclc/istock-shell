[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / wrap

# Function: wrap()

> **wrap**\<`R`\>(`value`): `R`

Defined in: src/packages/util/src/message-data.ts:36

包装对象，将其中的函数转为字符串，便于结构化克隆。

## Type Parameters

### R

`R` = `unknown`

## Parameters

### value

`any`

需要包装的对象

## Returns

`R`

包装后的对象

## Example

```ts
wrap({ fn: () => 1 }); // { fn: '() => 1', __fn_0__: null }
```
