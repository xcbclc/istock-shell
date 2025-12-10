[**@istock-shell/iswork**](../README.md)

---

[@istock-shell/iswork](../globals.md) / Injectable

# Function: Injectable()

> **Injectable**(): (`target`) => [`AnyClass`](../interfaces/AnyClass.md)\<`any`\>

Defined in: ioc/decorators/injectable.ts:28

可注入装饰器

## Returns

类装饰器函数

> (`target`): [`AnyClass`](../interfaces/AnyClass.md)\<`any`\>

### Parameters

#### target

[`AnyClass`](../interfaces/AnyClass.md)\<`any`\>

### Returns

[`AnyClass`](../interfaces/AnyClass.md)\<`any`\>

## Description

用于标记类可以被依赖注入容器管理，使类能够被注入到其他类中

## Example

```typescript
@Injectable()
class UserService {
  getUsers() {
    return ['user1', 'user2'];
  }
}

@Injectable()
class UserController {
  constructor(private userService: UserService) {}
}
```
