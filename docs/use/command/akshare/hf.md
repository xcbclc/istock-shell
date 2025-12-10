---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---

# akshare

## bp_500_zs 标普 500 指数

获取标普 500 指数的分钟数据, 由于数据量比较大, 需要等待, 由于服务器在国外, 建议使用代理访问

### 用法

`bp_500_zs [-year [year]]`

### 选项

|    选项参数     | 名称 | 描述                                                       |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------: | :--: | :--------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-year，--year` | year | year=&quot;2017&quot;; 只能获取 \*\*2012-2018\*\* 年的数据 | string |   true   |  2017  |        |

### 命令示例

`bp_500_zs`
<IStockShellDemo cmd='bp_500_zs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
