[**@istock-shell/util**](../README.md)

---

[@istock-shell/util](../globals.md) / generateColorPalette

# Function: generateColorPalette()

> **generateColorPalette**(`numColors`, `baseColor`): `string`[]

Defined in: src/packages/util/src/color.ts:138

根据基础颜色和数量生成颜色调色板。

## Parameters

### numColors

`number`

需要生成的颜色数量

### baseColor

`string` = `'#ff7d51'`

基础颜色（十六进制），默认 '#ff7d51'

## Returns

`string`[]

颜色调色板数组

## Example

```ts
generateColorPalette(5, '#ff7d51');
```
