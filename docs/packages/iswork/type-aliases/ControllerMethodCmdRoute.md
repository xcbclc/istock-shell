[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / ControllerMethodCmdRoute

# Type Alias: ControllerMethodCmdRoute

> **ControllerMethodCmdRoute** = `object`

Defined in: types/controller.ts:146

控制器方法命令路由类型

## Description

定义控制器方法的命令路由配置，包括命令信息、选项、子命令等

## Properties

### arguments?

> `optional` **arguments**: [`ControllerMethodCmdRouteOptions`](ControllerMethodCmdRouteOptions.md)[]

Defined in: types/controller.ts:162

命令参数配置

---

### cmd

> **cmd**: `string`

Defined in: types/controller.ts:150

命令字符串

---

### description?

> `optional` **description**: `string`

Defined in: types/controller.ts:156

命令详细描述

---

### example?

> `optional` **example**: `string`

Defined in: types/controller.ts:168

命令使用示例

---

### name

> **name**: `string`

Defined in: types/controller.ts:148

命令名称

---

### options?

> `optional` **options**: `Record`\<`string`, [`ControllerMethodCmdRouteOptions`](ControllerMethodCmdRouteOptions.md)\>

Defined in: types/controller.ts:158

命令参数选项配置

---

### remarks?

> `optional` **remarks**: `string`

Defined in: types/controller.ts:166

命令备注

---

### shortDescription?

> `optional` **shortDescription**: `string`

Defined in: types/controller.ts:154

命令简短描述

---

### source?

> `optional` **source**: `object`

Defined in: types/controller.ts:164

命令来源信息

#### title?

> `optional` **title**: `string`

#### url?

> `optional` **url**: `string`

---

### subcommand?

> `optional` **subcommand**: `ControllerMethodCmdRoute`

Defined in: types/controller.ts:160

子命令配置

---

### usage?

> `optional` **usage**: `string`

Defined in: types/controller.ts:152

命令用法说明
