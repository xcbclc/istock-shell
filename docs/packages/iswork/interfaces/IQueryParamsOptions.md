[@istock/iswork](../README.md) / [Exports](../modules.md) / IQueryParamsOptions

# Interface: IQueryParamsOptions

## Table of contents

### Properties

- [cache](IQueryParamsOptions.md#cache)
- [fields](IQueryParamsOptions.md#fields)
- [filter](IQueryParamsOptions.md#filter)
- [includeDeleted](IQueryParamsOptions.md#includedeleted)
- [join](IQueryParamsOptions.md#join)
- [limit](IQueryParamsOptions.md#limit)
- [offset](IQueryParamsOptions.md#offset)
- [or](IQueryParamsOptions.md#or)
- [page](IQueryParamsOptions.md#page)
- [search](IQueryParamsOptions.md#search)
- [sort](IQueryParamsOptions.md#sort)

## Properties

### cache

• `Optional` **cache**: `number`

#### Defined in

src/packages/iswork/src/orm/interfaces/query-builder.ts:66

---

### fields

• `Optional` **fields**: [`TQueryFields`](../modules.md#tqueryfields)

#### Defined in

src/packages/iswork/src/orm/interfaces/query-builder.ts:57

---

### filter

• `Optional` **filter**: [`TQueryFilter`](../modules.md#tqueryfilter) \| [`TQueryFilterArr`](../modules.md#tqueryfilterarr) \| ([`TQueryFilter`](../modules.md#tqueryfilter) \| [`TQueryFilterArr`](../modules.md#tqueryfilterarr))[]

#### Defined in

src/packages/iswork/src/orm/interfaces/query-builder.ts:59

---

### includeDeleted

• `Optional` **includeDeleted**: `number`

#### Defined in

src/packages/iswork/src/orm/interfaces/query-builder.ts:67

---

### join

• `Optional` **join**: [`TQueryJoin`](../modules.md#tqueryjoin) \| [`TQueryJoinArr`](../modules.md#tqueryjoinarr) \| ([`TQueryJoin`](../modules.md#tqueryjoin) \| [`TQueryJoinArr`](../modules.md#tqueryjoinarr))[]

#### Defined in

src/packages/iswork/src/orm/interfaces/query-builder.ts:61

---

### limit

• `Optional` **limit**: `number`

#### Defined in

src/packages/iswork/src/orm/interfaces/query-builder.ts:63

---

### offset

• `Optional` **offset**: `number`

#### Defined in

src/packages/iswork/src/orm/interfaces/query-builder.ts:64

---

### or

• `Optional` **or**: [`TQueryFilter`](../modules.md#tqueryfilter) \| [`TQueryFilterArr`](../modules.md#tqueryfilterarr) \| ([`TQueryFilter`](../modules.md#tqueryfilter) \| [`TQueryFilterArr`](../modules.md#tqueryfilterarr))[]

#### Defined in

src/packages/iswork/src/orm/interfaces/query-builder.ts:60

---

### page

• `Optional` **page**: `number`

#### Defined in

src/packages/iswork/src/orm/interfaces/query-builder.ts:65

---

### search

• `Optional` **search**: [`TSCondition`](../modules.md#tscondition)

#### Defined in

src/packages/iswork/src/orm/interfaces/query-builder.ts:58

---

### sort

• `Optional` **sort**: [`TQuerySort`](../modules.md#tquerysort) \| [`TQuerySortArr`](../modules.md#tquerysortarr) \| ([`TQuerySort`](../modules.md#tquerysort) \| [`TQuerySortArr`](../modules.md#tquerysortarr))[]

#### Defined in

src/packages/iswork/src/orm/interfaces/query-builder.ts:62
