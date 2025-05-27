---
title: 全局
description: 全局
keywords: [全局]
aside: false
editLink: false
---
# 全局

## yhdl 用户登录 
登录指定用户账号

### 用法

`yhdl [-zh <用户名>] [-mm <密码>]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-zh，--账号` | 账号 | 指定的用户账号 | string | true |  |  |
| `-mm，--密码` | 密码 | 账号密码 | string | true |  |  |

### 命令示例

`yhdl -zh daoyou -mm Dy123123`
<IStockShellDemo cmd='yhdl -zh daoyou -mm Dy123123' :domains='[]' :height='480'/>
