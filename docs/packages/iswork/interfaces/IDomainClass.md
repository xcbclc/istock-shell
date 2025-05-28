[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / IDomainClass

# Interface: IDomainClass\<T\>

Defined in: src/packages/iswork/src/interfaces/domain.ts:3

## Extends

- [`IAnyClass`](IAnyClass.md)\<`T`\>

## Type Parameters

### T

`T` = `unknown`

## Indexable

\[`k`: `string` \| `symbol`\]: `any`

## Constructors

### Constructor

> **new IDomainClass**(...`args`): `T`

Defined in: src/packages/iswork/src/interfaces/domain.ts:3

#### Parameters

##### args

...`any`[]

#### Returns

`T`

#### Inherited from

[`IAnyClass`](IAnyClass.md).[`constructor`](IAnyClass.md#constructor)

## Properties

### \[metadata\]

> **\[metadata\]**: `null` \| `DecoratorMetadataObject`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.esnext.decorators.d.ts:27

#### Inherited from

[`IAnyClass`](IAnyClass.md).[`[metadata]`](IAnyClass.md#metadata)

---

### arguments

> **arguments**: `any`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es5.d.ts:305

#### Inherited from

[`IAnyClass`](IAnyClass.md).[`arguments`](IAnyClass.md#arguments)

---

### caller

> **caller**: `Function`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es5.d.ts:306

#### Inherited from

[`IAnyClass`](IAnyClass.md).[`caller`](IAnyClass.md#caller)

---

### length

> `readonly` **length**: `number`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es5.d.ts:302

#### Inherited from

[`IAnyClass`](IAnyClass.md).[`length`](IAnyClass.md#length)

---

### name

> `readonly` **name**: `string`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es2015.core.d.ts:97

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

[`IAnyClass`](IAnyClass.md).[`name`](IAnyClass.md#name)

---

### prototype

> **prototype**: `any`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es5.d.ts:301

#### Inherited from

[`IAnyClass`](IAnyClass.md).[`prototype`](IAnyClass.md#prototype)

## Methods

### \[hasInstance\]()

> **\[hasInstance\]**(`value`): `boolean`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:164

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

#### Parameters

##### value

`any`

#### Returns

`boolean`

#### Inherited from

[`IAnyClass`](IAnyClass.md).[`[hasInstance]`](IAnyClass.md#hasinstance)

---

### apply()

> **apply**(`this`, `thisArg`, `argArray?`): `any`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es5.d.ts:281

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

#### Parameters

##### this

`Function`

##### thisArg

`any`

The object to be used as the this object.

##### argArray?

`any`

A set of arguments to be passed to the function.

#### Returns

`any`

#### Inherited from

[`IAnyClass`](IAnyClass.md).[`apply`](IAnyClass.md#apply)

---

### bind()

> **bind**(`this`, `thisArg`, ...`argArray`): `any`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es5.d.ts:296

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

#### Parameters

##### this

`Function`

##### thisArg

`any`

An object to which the this keyword can refer inside the new function.

##### argArray

...`any`[]

A list of arguments to be passed to the new function.

#### Returns

`any`

#### Inherited from

[`IAnyClass`](IAnyClass.md).[`bind`](IAnyClass.md#bind)

---

### call()

> **call**(`this`, `thisArg`, ...`argArray`): `any`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es5.d.ts:288

Calls a method of an object, substituting another object for the current object.

#### Parameters

##### this

`Function`

##### thisArg

`any`

The object to be used as the current object.

##### argArray

...`any`[]

A list of arguments to be passed to the method.

#### Returns

`any`

#### Inherited from

[`IAnyClass`](IAnyClass.md).[`call`](IAnyClass.md#call)

---

### toString()

> **toString**(): `string`

Defined in: node_modules/.pnpm/typescript@5.8.3/node_modules/typescript/lib/lib.es5.d.ts:299

Returns a string representation of a function.

#### Returns

`string`

#### Inherited from

[`IAnyClass`](IAnyClass.md).[`toString`](IAnyClass.md#tostring)
