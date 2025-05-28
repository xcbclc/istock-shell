[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / deprecatedComparisonOperatorsList

# Variable: deprecatedComparisonOperatorsList

> `const` **deprecatedComparisonOperatorsList**: `string`[]

Defined in: src/packages/iswork/src/orm/query-builder.ts:60

eq (=, equal)
ne (!=, not equal)
gt (>, greater than)
lt (<, lower that)
gte (>=, greater than or equal)
lte (<=, lower than or equal)
starts (LIKE val%, starts with)
ends (LIKE %val, ends with)
cont (LIKE %val%, contains)
excl (NOT LIKE %val%, not contains)
in (IN, in range, accepts multiple values)
notin (NOT IN, not in range, accepts multiple values)
isnull (IS NULL, is NULL, doesn't accept value)
notnull (IS NOT NULL, not NULL, doesn't accept value)
between (BETWEEN, between, accepts two values)
eqL (LOWER(field) =, equal)
neL (LOWER(field) !=, not equal)
startsL (LIKE|ILIKE val%)
endsL (LIKE|ILIKE %val, ends with)
contL (LIKE|ILIKE %val%, contains)
exclL (NOT LIKE|ILIKE %val%, not contains)
inL (LOWER(field) IN, in range, accepts multiple values)
notinL (LOWER(field) NOT IN, not in range, accepts multiple values)
