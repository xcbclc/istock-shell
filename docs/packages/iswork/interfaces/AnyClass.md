[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / AnyClass

# Interface: AnyClass\<T\>

Defined in: interfaces/any-class.ts:24

通用类接口

## Description

定义一个可以实例化任意类型对象的类构造器接口

## Example

```typescript
// 使用 AnyClass 接口
function createInstance<T>(ClassConstructor: AnyClass<T>, ...args: any[]): T {
  return new ClassConstructor(...args);
}

class MyClass {
  constructor(public name: string) {}
}

const instance = createInstance(MyClass, 'test');
```

## Extended by

- [`DomainClassBase`](DomainClassBase.md)

## Type Parameters

### T

`T` = \{ \}

类实例的类型，默认为空对象类型

## Indexable

\[`k`: `string` \| `symbol`\]: `any`

## Constructors

### Constructor

> **new AnyClass**(...`args`): `T`

Defined in: interfaces/any-class.ts:26

类构造器，接受任意参数并返回类型 T 的实例

#### Parameters

##### args

...`any`[]

#### Returns

`T`
