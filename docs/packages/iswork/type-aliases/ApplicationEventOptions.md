[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ApplicationEventOptions

# Type Alias: ApplicationEventOptions

> **ApplicationEventOptions** = `object`

Defined in: types/application.ts:20

应用程序事件选项类型

## Description

定义应用程序事件处理的配置选项

## Example

```typescript
const eventOptions: ApplicationEventOptions = {
  emit: (message, options) => {
    console.log('Emitting message:', message);
  },
};
```

## Properties

### emit()

> **emit**: (`message`, `options?`) => `void`

Defined in: types/application.ts:22

事件发射函数，用于发送消息

#### Parameters

##### message

`unknown`

##### options?

###### targetOrigin?

`string`

###### transfer?

`Transferable`[]

#### Returns

`void`
