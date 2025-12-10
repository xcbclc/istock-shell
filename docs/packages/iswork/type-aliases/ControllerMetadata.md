[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ControllerMetadata

# Type Alias: ControllerMetadata

> **ControllerMetadata** = `object`

Defined in: types/controller.ts:20

控制器元数据类型

## Description

定义控制器的元数据配置，包括别名、版本、组件和中间件等信息

## Properties

### alias?

> `optional` **alias**: `string` \| `string`[]

Defined in: types/controller.ts:22

控制器别名，默认值为控制器实例类名

---

### component?

> `optional` **component**: [`ControllerMethodComponentMetadata`](ControllerMethodComponentMetadata.md)

Defined in: types/controller.ts:28

定义控制器返回数据的展示组件

---

### middlewares?

> `optional` **middlewares**: [`Middleware`](Middleware.md)[]

Defined in: types/controller.ts:30

需要运行的中间件

---

### version?

> `optional` **version**: `string`

Defined in: types/controller.ts:26

控制器版本

---

### viewName

> **viewName**: `string`

Defined in: types/controller.ts:24

控制器的显示名称
