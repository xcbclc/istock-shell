# 术语表 

本文档定义了 **istock-shell** 项目及 **iswork** 框架中使用的核心术语，旨在帮助开发者和用户统一认知，理解系统架构与设计理念。

## 1. 基础概念

### CLI (Command Line Interface)

命令行界面，用户通过键盘输入文本指令与计算机程序进行交互的界面。istock-shell 提供了一个基于 Web 的类 UNIX 风格 CLI 环境。

### Monorepo

单体仓库（Monolithic Repository），一种软件开发策略，将多个项目（如 `iswork` 核心库、`command-parser` 解析器、`cli` 工具等）的代码存储在同一个版本控制仓库中。本项目使用 `pnpm workspaces` 进行管理。

### Shell

外壳程序，此处指 istock-shell 的主界面容器，负责接收用户输入、渲染输出结果，并作为宿主环境运行各种应用。通常运行在浏览器的主线程（Main Thread）中。

### 主线程（Main Thread）

浏览器的主执行线程，负责 UI 渲染、DOM 操作以及与用户的直接交互。在 istock-shell 架构中，Shell 容器运行在此线程。

### 工作线程（Worker Thread）

Web Worker 线程，用于在后台运行脚本，不阻塞主线程 UI。在 istock-shell 架构中，具体的应用（Application）逻辑运行在 Worker 线程中，通过消息机制与主线程通信。

### CLI 工具（Command Line Interface Tool）

指 `@istock-shell/cli` 工具，用于快速生成项目结构、应用模板和组件代码，帮助开发者遵循最佳实践并提高开发效率。

## 2. 架构与框架

### IsWork

本项目基于的核心开发框架，提供了一套标准化的应用生命周期管理、依赖注入（IOC）和消息通信机制。它旨在让 Web 应用开发像后端服务一样结构化。

### IOC (Inversion of Control)

控制反转，iswork 框架的核心特性之一。通过依赖注入（Dependency Injection），将对象的创建和依赖关系管理交给容器（Container），而不是在代码中硬编码。这提高了代码的解耦性和可测试性。

### 装饰器（Decorator）

一种特殊的 TypeScript 声明，可以附加到类声明、方法、访问符、属性或参数上。iswork 大量使用装饰器（如 `@Controller`, `@Inject`, `@Model`）来通过元编程方式注入依赖或配置元数据。

### 上下文（Context）

在应用执行期间（如处理一个命令请求时）存在的环境信息对象（`ApplicationContext`）。它通常包含当前应用实例、请求消息、用户信息以及其他请求级状态。

### 中间件（Middleware）

位于请求处理管道中的函数或组件，用于拦截、处理或转换消息。常用于日志记录、权限验证、错误处理等横切关注点。

### 管道（Pipe）

在 iswork 中，Pipe 指一种轻量级的数据处理函数机制，支持流式执行。不同于 Shell 命令管道，这里的 Pipe 通常用于内部数据的转换和验证逻辑。

### 应用（Application）

运行在 iswork 框架之上的独立功能单元。每个应用拥有独立的命名空间、生命周期和上下文。

### 领域（Domain）

应用的核心业务逻辑层。在 DDD（领域驱动设计）上下文中，它封装了业务规则和状态，不直接依赖于具体的 UI 或底层实现。

### 控制器（Controller）

负责接收命令请求，协调领域模型（Domain）和服务（Service）来处理业务逻辑，并返回结果。它是命令执行的入口点。

### 服务（Service） / 提供者（Provider）

封装通用逻辑或外部资源访问（如 API 请求、硬件接口）的组件。通过 IOC 容器注入到 Controller 或 Domain 中使用。

### 模型（Model）

数据结构的抽象定义，通常对应数据库中的表结构或 API 返回的数据对象。

## 3. 命令系统

### 命令（Command）

用户输入的执行单元。一个标准的命令结构通常包含：`<命令名> [子命令] [选项...] [参数...]`。

### 全局命令（Global Command）

在任何应用上下文中均可执行的命令，通常用于系统管理、环境切换或通用工具（如 `yycz`, `yyjr`, `lssc`）。

### 应用命令（Application Command）

仅在特定应用下才能执行的命令。

### 命令管道（Command Pipeline）

使用管道符 `|` 连接多个命令的机制。前一个命令的输出（Output）将作为后一个命令的输入（Input），实现数据流的链式处理。

### 分词器（Tokenizer）

命令解析的第一阶段，负责将用户输入的原始字符串分割成最小的语法单元（Token），如字符串、操作符、空白符等。

### 解析器（Parser）

命令解析的第二阶段，将 Token 序列转换为抽象语法树（AST）或结构化的命令对象，识别出命令名、选项和参数。

### 抽象语法树（Abstract Syntax Tree / AST）

源代码（此处指命令行输入）的树状表现形式。解析器 将线性 Token 流转换为 AST，以便准确理解命令的结构和嵌套关系。

### 验证器（Validator）

命令解析的第三阶段，根据命令定义（Schema）检查解析后的对象是否合法（例如参数类型是否匹配、必选参数是否缺失）。

## 4. 协议与通信

### CMDP (Command Prompt Protocol)

本项目定义的专用通信协议，用于 Shell 主线程与 Web Worker（运行应用逻辑）之间进行标准化数据交互。

### 消息通道（Message Channel）

基于浏览器 `MessageChannel` API 或类似机制实现的双向通信管道，是 CMDP 协议的底层传输载体。

### 元数据（CmdpMeta）

CMDP 协议消息头部的一部分，包含消息 ID、时间戳、源地址、目标地址等控制信息，用于路由和追踪。

### 载荷（CmdpPayload）

CMDP 协议消息的主体部分，包含实际的业务数据、命令执行结果或错误信息。

### 地址（Address）

用于在 CMDP 协议中唯一标识通信端点。

## 5. 数据与存储

### IDB Driver

基于浏览器 IndexedDB 的数据存储驱动，用于持久化保存应用数据。

### Memory Driver

基于内存的数据存储驱动，数据在页面刷新后丢失，用于临时缓存或测试。

### HTTP Driver

将数据操作映射为 HTTP 请求的驱动，用于与远程服务器进行数据交互。
