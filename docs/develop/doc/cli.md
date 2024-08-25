# 脚手架命令

项目内置了一些脚手架命令，这些命令有助于我们提升开发效率，减少维护时间。

## 应用命令域开发

在开发应用命令域时，可以选择脚手架命令初始化，初始化命令是：`istock cmd init`，注意需要在项目根目录执行。

示例：在gpxx（股票学习）应用命令域开发zl（资料）项目。

```shell
PS D:\project\istock-shell> istock cmd init
? 在哪个命令域下开发命令？ gpxx
? 您期望命令相关文件名为？ zl
gpxx命令域文件夹创建成功
初始化命令开发已完成

```

执行成功后会在`src/worker/domains`文件夹下生成如下初始化文件：

```
domains
└─ gpxx
  ├─zl.cmd.ts
  ├─zl.controller.ts
  ├─zl.model.ts
  └─zl.service.t
```

## 文档自动生成

执行`istock doc cmd`自动生成`src/worker/domains`目录下相关命令文档到`docs/use/command`目录下。

::: tip 提示
请务必写好命令描述文件，命令描述即命令文档。在执行`istock doc cmd`命令时会根据命令描述文件去生成命令文档。
:::

执行`istock doc package`自动生成`src/packages`目录下代码库的文档到`docs/packages`目录下。
