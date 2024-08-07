[@istock/iswork](../README.md) / [Exports](../modules.md) / IDomainClass

# Interface: IDomainClass\<T\>

## Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | `unknown` |

## Hierarchy

- [`IAnyClass`](IAnyClass.md)\<`T`\>

  ↳ **`IDomainClass`**

## Table of contents

### Constructors

- [constructor](IDomainClass.md#constructor)

### Properties

- [[metadata]](IDomainClass.md#[metadata])
- [arguments](IDomainClass.md#arguments)
- [caller](IDomainClass.md#caller)
- [length](IDomainClass.md#length)
- [name](IDomainClass.md#name)
- [prototype](IDomainClass.md#prototype)

### Methods

- [[hasInstance]](IDomainClass.md#[hasinstance])
- [apply](IDomainClass.md#apply)
- [bind](IDomainClass.md#bind)
- [call](IDomainClass.md#call)
- [toString](IDomainClass.md#tostring)

## Constructors

### constructor

• **new IDomainClass**(`...args`): `T`

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `...args` | `any`[] |

#### Returns

`T`

#### Inherited from

[IAnyClass](IAnyClass.md).[constructor](IAnyClass.md#constructor)

#### Defined in

src/packages/iswork/src/interfaces/domain.ts:3

## Properties

### [metadata]

• **[metadata]**: `null` \| `DecoratorMetadataObject`

#### Inherited from

[IAnyClass](IAnyClass.md).[[metadata]](IAnyClass.md#[metadata])

#### Defined in

node_modules/.pnpm/typescript@5.5.3/node_modules/typescript/lib/lib.esnext.decorators.d.ts:27

---

### arguments

• **arguments**: `any`

#### Inherited from

[IAnyClass](IAnyClass.md).[arguments](IAnyClass.md#arguments)

#### Defined in

node_modules/.pnpm/typescript@5.5.3/node_modules/typescript/lib/lib.es5.d.ts:305

---

### caller

• **caller**: `Function`

#### Inherited from

[IAnyClass](IAnyClass.md).[caller](IAnyClass.md#caller)

#### Defined in

node_modules/.pnpm/typescript@5.5.3/node_modules/typescript/lib/lib.es5.d.ts:306

---

### length

• `Readonly` **length**: `number`

#### Inherited from

[IAnyClass](IAnyClass.md).[length](IAnyClass.md#length)

#### Defined in

node_modules/.pnpm/typescript@5.5.3/node_modules/typescript/lib/lib.es5.d.ts:302

---

### name

• `Readonly` **name**: `string`

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

[IAnyClass](IAnyClass.md).[name](IAnyClass.md#name)

#### Defined in

node_modules/.pnpm/typescript@5.5.3/node_modules/typescript/lib/lib.es2015.core.d.ts:97

---

### prototype

• **prototype**: `any`

#### Inherited from

[IAnyClass](IAnyClass.md).[prototype](IAnyClass.md#prototype)

#### Defined in

node_modules/.pnpm/typescript@5.5.3/node_modules/typescript/lib/lib.es5.d.ts:301

## Methods

### [hasInstance]

▸ **[hasInstance]**(`value`): `boolean`

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `value` | `any` |

#### Returns

`boolean`

#### Inherited from

[IAnyClass](IAnyClass.md).[[hasInstance]](IAnyClass.md#[hasinstance])

#### Defined in

node_modules/.pnpm/typescript@5.5.3/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

---

### apply

▸ **apply**(`this`, `thisArg`, `argArray?`): `any`

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

#### Parameters

| Name        | Type       | Description                                      |
| :---------- | :--------- | :----------------------------------------------- |
| `this`      | `Function` | -                                                |
| `thisArg`   | `any`      | The object to be used as the this object.        |
| `argArray?` | `any`      | A set of arguments to be passed to the function. |

#### Returns

`any`

#### Inherited from

[IAnyClass](IAnyClass.md).[apply](IAnyClass.md#apply)

#### Defined in

node_modules/.pnpm/typescript@5.5.3/node_modules/typescript/lib/lib.es5.d.ts:281

---

### bind

▸ **bind**(`this`, `thisArg`, `...argArray`): `any`

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

#### Parameters

| Name          | Type       | Description                                                            |
| :------------ | :--------- | :--------------------------------------------------------------------- |
| `this`        | `Function` | -                                                                      |
| `thisArg`     | `any`      | An object to which the this keyword can refer inside the new function. |
| `...argArray` | `any`[]    | A list of arguments to be passed to the new function.                  |

#### Returns

`any`

#### Inherited from

[IAnyClass](IAnyClass.md).[bind](IAnyClass.md#bind)

#### Defined in

node_modules/.pnpm/typescript@5.5.3/node_modules/typescript/lib/lib.es5.d.ts:296

---

### call

▸ **call**(`this`, `thisArg`, `...argArray`): `any`

Calls a method of an object, substituting another object for the current object.

#### Parameters

| Name          | Type       | Description                                     |
| :------------ | :--------- | :---------------------------------------------- |
| `this`        | `Function` | -                                               |
| `thisArg`     | `any`      | The object to be used as the current object.    |
| `...argArray` | `any`[]    | A list of arguments to be passed to the method. |

#### Returns

`any`

#### Inherited from

[IAnyClass](IAnyClass.md).[call](IAnyClass.md#call)

#### Defined in

node_modules/.pnpm/typescript@5.5.3/node_modules/typescript/lib/lib.es5.d.ts:288

---

### toString

▸ **toString**(): `string`

Returns a string representation of a function.

#### Returns

`string`

#### Inherited from

[IAnyClass](IAnyClass.md).[toString](IAnyClass.md#tostring)

#### Defined in

node_modules/.pnpm/typescript@5.5.3/node_modules/typescript/lib/lib.es5.d.ts:299
