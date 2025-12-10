[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / DomainMetadata

# Type Alias: DomainMetadata

> **DomainMetadata** = `object`

Defined in: types/domain.ts:39

域元数据类型

## Description

定义应用域的完整元数据配置

## Example

```typescript
const domainMetadata: DomainMetadata = {
  name: 'user-domain',
  viewName: '用户管理域',
  controllers: [UserController],
  providers: [UserService],
  middlewares: [authMiddleware],
};
```

## Properties

### controllers?

> `optional` **controllers**: [`ControllerBase`](ControllerBase.md)[]

Defined in: types/domain.ts:47

应用域所属的控制器

---

### exports?

> `optional` **exports**: [`MetadataExport`](MetadataExport.md)[]

Defined in: types/domain.ts:51

暴露到外部应用域所使用的控制器或提供者

---

### imports?

> `optional` **imports**: [`MetadataImport`](MetadataImport.md)[]

Defined in: types/domain.ts:45

需要导入的子应用域

---

### middlewares?

> `optional` **middlewares**: [`Middleware`](Middleware.md)[]

Defined in: types/domain.ts:53

应用域所需要使用的中间件

---

### name

> **name**: `string`

Defined in: types/domain.ts:41

为应用域定义一个唯一的名称

---

### providers?

> `optional` **providers**: [`ProviderMeta`](ProviderMeta.md)[]

Defined in: types/domain.ts:49

提供者，供控制器依赖注入使用，提供者一般是服务类

---

### viewName

> **viewName**: `string`

Defined in: types/domain.ts:43

应用域的显示名称
