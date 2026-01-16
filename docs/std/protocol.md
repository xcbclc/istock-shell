# CMDP 协议规范

`CMDP (Command Prompt Protocol)` 是 `iStock Shell` 的核心通信协议，专为命令驱动的交互场景设计。它借鉴了 HTTP 协议的设计思想，主要解决 `iswork` 框架（Worker 线程）与 UI 界面（主线程）以及未来点对点网络传输中的标准化数据交互问题。

## 1. 协议概述

CMDP 协议定义了一套统一的地址格式和消息结构，用于定位应用资源（Controller/Method）并传输控制指令与数据。

### 核心特性

- **类 URL 结构**：采用标准化的 URI 格式，易于理解和解析。
- **元数据分离**：将控制信息（Meta）与业务数据（Payload）分离，结构清晰。
- **多级域支持**：支持多层级的应用域（Domain）嵌套，适应复杂的应用架构。
- **类型安全**：定义了严格的数据类型和校验规则。

## 2. CMDP 地址规范

CMDP 地址用于唯一标识系统中的资源。

### 2.1 地址结构

标准 CMDP 地址格式如下：

```text
[协议]://@[用户账号].[应用域路径]:[端口号]/[控制器名].[方法名]
```

| 组成部分       | 说明                             | 约束                                     | 示例                      |
| -------------- | -------------------------------- | ---------------------------------------- | ------------------------- |
| **协议**       | 固定为 `cmdp`                    | 必须以 `cmdp` 开头                       | `cmdp`                    |
| **用户账号**   | 当前执行操作的用户标识           | 1-20个字符，仅限字母和下划线             | `guest`                   |
| **应用域路径** | 应用的分层路径，支持多级         | 1-20个字符/层，最少1层，最多5层，`.`分隔 | `global` 或 `system.core` |
| **端口号**     | 逻辑端口，区分不同的命令窗口实例 | 数字，0-9999                             | `1`                       |
| **控制器名**   | 目标 Controller 的名称           | 1-20个字符，字母和下划线                 | `cmdRoute`                |
| **方法名**     | 目标 Method 的名称               | 1-20个字符，字母和下划线                 | `list`                    |

### 2.2 正则表达式校验

系统使用以下正则表达式严格校验地址格式：

```regex
^cmdp\/\/@\\w{1,20}(\\.[\\w]{1,20}){1,5}:[0-9]{1,4}\/[\\w]{1,20}\.[\\w]{1,40}$
```

### 2.3 地址示例

```text
# 访问 global 域下的 cmdRoute 控制器的 list 方法，端口为 1，用户为 guest
cmdp://@guest.global:1/cmdRoute.list

# 访问多级域 system.config 下的 setting 控制器的 update 方法
cmdp://@admin.system.config:8080/setting.update
```

## 3. 消息结构

CMDP 消息由 `Address`（地址）、`Meta`（元数据）和 `Payload`（载荷）三部分组成。

### 3.1 消息对象定义 (TypeScript)

```typescript
export type CmdpMessage<Payload = CmdpPayload> = {
  /** CMDP 地址 */
  address: string;
  /** 元数据：用于传输状态、ID、时间戳等控制信息 */
  meta?: CmdpMeta;
  /** 载荷：实际的业务数据 */
  payload?: Payload;
};
```

### 3.2 Meta (元数据)

元数据类似于 HTTP Header，用于携带非业务逻辑的控制信息。

- **类型定义**：

  ```typescript
  export type CmdpMetaValue = string | number | boolean | undefined | null;

  export type CmdpMeta = {
    /** 状态信息 */
    status?: string | number;
    /** 其他元数据字段 */
    [k: string]: CmdpMetaValue;
  } | null;
  ```

### 3.3 Payload (载荷)

载荷类似于 HTTP Body，用于携带实际的业务数据。

- **类型定义**：
  ```typescript
  export type CmdpPayload = Record<string, any> | CmdpMetaValue;
  ```

## 4. 交互流程

### 4.1 请求 (Request)

客户端发送请求时，构造包含目标地址、Meta 和 Payload 的消息。

```javascript
{
  address: "cmdp://@guest.global:1/user.login",
  meta: {
    timestamp: 1630000000000,
    messageId: "req-1001"
  },
  payload: {
    username: "admin",
    password: "***"
  }
}
```

### 4.2 响应 (Response)

服务端处理后返回响应消息，通常包含原始地址、返回元数据（`returnMeta`）和返回载荷（`returnPayload`）。

```javascript
{
  address: "cmdp://@guest.global:1/user.login",
  meta: {
    status: "success",
    messageId: "req-1001", // 对应请求ID
    timestamp: 1630000000100
  },
  payload: {
    token: "eyJhbGciOi...",
    expire: 3600
  }
}
```

## 5. 实现参考

CMDP 协议的完整实现位于 [`@istock-shell/iswork`](/packages/iswork/classes/Cmdp.html) 包中。

- **源码路径**：`packages/iswork/src/cmdp`
- **核心类**：
  - `AbstractCmdp`: 定义协议基础解析与校验逻辑。
  - `Cmdp`: 协议的具体实现类，提供 `setMeta`, `setPayload`, `getMessage` 等 API。
