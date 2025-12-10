---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---

# akshare

## xwccsj 席位持仓数据

席位持仓数据接口

### 用法

`xwccsj <broker> <date>`

### 参数

|  名称  | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :--------- | :----: | :------: | :----: | :----: |
| broker | 永安期货   | string |  false   |        |        |
|  date  | 2018-08-08 | string |  false   |        |        |

## xwyksj 席位盈亏数据

席位盈亏数据接口

### 用法

`xwyksj <broker> <start_date> <end_date>`

### 参数

|    名称    | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--------: | :--------- | :----: | :------: | :----: | :----: |
|   broker   | 永安期货   | string |  false   |        |        |
| start_date | 2018-07-08 | string |  false   |        |        |
|  end_date  | 2018-08-08 | string |  false   |        |        |

## xwmrdzjldsj 席位每日大资金流动数据

席位每日大资金流动数据接口

### 用法

`xwmrdzjldsj <broker> <date> <offset>`

### 参数

|  名称  | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :--------- | :----: | :------: | :----: | :----: |
| broker | 永安期货   | string |  false   |        |        |
|  date  | 2018-08-08 | string |  false   |        |        |
| offset | 1000000    | string |  false   |        |        |

## xwdkbsj 席位多空比数据

席位多空比数据接口

### 用法

`xwdkbsj <broker> <date>`

### 参数

|  名称  | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :--------- | :----: | :------: | :----: | :----: |
| broker | 永安期货   | string |  false   |        |        |
|  date  | 2018-08-08 | string |  false   |        |        |

## xwjccbzjbhsj 席位净持仓保证金变化数据

席位净持仓保证金变化数据接口

### 用法

`xwjccbzjbhsj <broker> <date>`

### 参数

|  名称  | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :--------- | :----: | :------: | :----: | :----: |
| broker | 永安期货   | string |  false   |        |        |
|  date  | 2018-08-08 | string |  false   |        |        |

## xwjccbzjsj 席位净持仓保证金数据

席位净持仓保证金数据接口

### 用法

`xwjccbzjsj <broker> <date>`

### 参数

|  名称  | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :--------- | :----: | :------: | :----: | :----: |
| broker | 永安期货   | string |  false   |        |        |
|  date  | 2018-08-08 | string |  false   |        |        |

## xwzccbzjsj 席位总持仓保证金数据

席位总持仓保证金数据接口

### 用法

`xwzccbzjsj <broker> <date>`

### 参数

|  名称  | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :--------- | :----: | :------: | :----: | :----: |
| broker | 永安期货   | string |  false   |        |        |
|  date  | 2018-08-08 | string |  false   |        |        |

## xwdspyksj 席位的商品盈亏数据

席位的商品盈亏数据接口

### 用法

`xwdspyksj <broker> <start_date> <end_date>`

### 参数

|    名称    | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--------: | :--------- | :----: | :------: | :----: | :----: |
|   broker   | 永安期货   | string |  false   |        |        |
| start_date | 2018-07-08 | string |  false   |        |        |
|  end_date  | 2018-07-08 | string |  false   |        |        |

## xwylpx 席位盈利排行

席位盈利排行数据接口

### 用法

`xwylpx <start_date> <end_date> <count>`

### 参数

|    名称    | 描述         |  类型  | 是否可选 | 默认值 | 可选值 |
| :--------: | :----------- | :----: | :------: | :----: | :----: |
| start_date | 2018-07-08   | string |  false   |        |        |
|  end_date  | 2018-07-08   | string |  false   |        |        |
|   count    | 10; 默认10条 | string |  false   |        |        |

## xwkspx 席位亏损排行

席位亏损排行数据接口

### 用法

`xwkspx <start_date> <end_date> <count>`

### 参数

|    名称    | 描述         |  类型  | 是否可选 | 默认值 | 可选值 |
| :--------: | :----------- | :----: | :------: | :----: | :----: |
| start_date | 2018-07-08   | string |  false   |        |        |
|  end_date  | 2018-07-08   | string |  false   |        |        |
|   count    | 10; 默认10条 | string |  false   |        |        |

## syxwsj 所有席位数据

所有席位数据接口

### 用法

`syxwsj <offset_days>`

### 参数

|    名称     | 描述                            |  类型  | 是否可选 | 默认值 | 可选值 |
| :---------: | :------------------------------ | :----: | :------: | :----: | :----: |
| offset_days | 默认为365，即一年内上过榜的席位 | string |  false   |        |        |

## jcgc 建仓过程

建仓过程数据接口

### 用法

`jcgc <broker> <code> [-start_date <start_date>] [-end_date <end_date>]`

### 参数

|  名称  | 描述     |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :------- | :----: | :------: | :----: | :----: |
| broker | 永安期货 | string |  false   |        |        |
|  code  | rb1810   | string |  false   |        |        |

### 选项

|          选项参数           |    名称    | 描述                             |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------------------: | :--------: | :------------------------------- | :----: | :------: | :----: | :----: |
| `-start_date，--start_date` | start_date | &quot;2020-02-03&quot;; 可选参数 | string |   true   |        |        |
|   `-end_date，--end_date`   |  end_date  | &quot;2020-06-03&quot;; 可选参数 | string |   true   |        |        |

## xwddp 席位对对碰

席位对对碰数据接口

### 用法

`xwddp <broker1> <broker2> <symbol>`

### 参数

|  名称   | 描述     |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :------- | :----: | :------: | :----: | :----: |
| broker1 | 永安期货 | string |  false   |        |        |
| broker2 | 兴证期货 | string |  false   |        |        |
| symbol  | 螺纹钢   | string |  false   |        |        |

## hyccsj 合约持仓数据

合约持仓数据接口

### 用法

`hyccsj <fields> <code> <date>`

### 参数

|  名称  | 描述                                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :---------------------------------------- | :----: | :------: | :----: | :----: |
| fields | longs: 返回多头数据; shorts: 返回空头数据 | string |  false   |        |        |
|  code  | rb1810                                    | string |  false   |        |        |
|  date  | 2018-08-08                                | string |  false   |        |        |

## spccsj 商品持仓数据

### 用法

`spccsj`

### 命令示例

`spccsj`
<IStockShellDemo cmd='spccsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## spjccsj 商品净持仓数据

商品净持仓数据接口

### 用法

`spjccsj <symbol> <broker> <date>`

### 参数

|  名称  | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :--------- | :----: | :------: | :----: | :----: |
| symbol | RB         | string |  false   |        |        |
| broker | 永安期货   | string |  false   |        |        |
|  date  | 2018-08-08 | string |  false   |        |        |

## hyhqsj 合约行情数据

合约行情数据接口

### 用法

`hyhqsj <code> <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| code | rb1810     | string |  false   |        |        |
| date | 2018-08-08 | string |  false   |        |        |

## spcdzjsj 商品沉淀资金数据

商品沉淀资金数据接口

### 用法

`spcdzjsj <symbol> <date>`

### 参数

|  名称  | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :--------- | :----: | :------: | :----: | :----: |
| symbol | RB         | string |  false   |        |        |
|  date  | 2018-08-08 | string |  false   |        |        |

## hydkbsj 合约多空比数据

合约多空比数据接口

### 用法

`hydkbsj <code> <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| code | rb1810     | string |  false   |        |        |
| date | 2018-08-08 | string |  false   |        |        |

## hyjccbzjbhsj 合约净持仓保证金变化数据

合约净持仓保证金变化数据接口

### 用法

`hyjccbzjbhsj <code> <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| code | rb1810     | string |  false   |        |        |
| date | 2018-08-08 | string |  false   |        |        |

## hyjccbzjsj 合约净持仓保证金数据

合约净持仓保证金数据接口

### 用法

`hyjccbzjsj <code> <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| code | rb1810     | string |  false   |        |        |
| date | 2018-08-08 | string |  false   |        |        |

## hyzccbzjsj 合约总持仓保证金数据

合约总持仓保证金数据接口

### 用法

`hyzccbzjsj <code> <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| code | rb1810     | string |  false   |        |        |
| date | 2018-08-08 | string |  false   |        |        |

## spdxwyksj 商品的席位盈亏数据

商品的席位盈亏数据接口

### 用法

`spdxwyksj <symbol> <start_date> <end_date>`

### 参数

|    名称    | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--------: | :--------- | :----: | :------: | :----: | :----: |
|   symbol   | RB         | string |  false   |        |        |
| start_date | 2018-02-08 | string |  false   |        |        |
|  end_date  | 2018-08-08 | string |  false   |        |        |

## zyzbsj 自研指标数据

自研指标数据接口

### 用法

`zyzbsj <code> <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| code | rb1810     | string |  false   |        |        |
| date | 2018-08-08 | string |  false   |        |        |

## spxgybsj 商品相关研报数据

商品相关研报数据接口

### 用法

`spxgybsj <csymbolode> <date>`

### 参数

|    名称    | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--------: | :--------- | :----: | :------: | :----: | :----: |
| csymbolode | RB         | string |  false   |        |        |
|    date    | 2018-08-08 | string |  false   |        |        |

## splbsj 商品列表数据

商品列表数据接口

### 用法

`splbsj <csymbolode> <date>`

### 参数

|    名称    | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--------: | :--------- | :----: | :------: | :----: | :----: |
| csymbolode | RB         | string |  false   |        |        |
|    date    | 2018-08-08 | string |  false   |        |        |

## hysy 合约索引

合约索引数据接口

### 用法

`hysy <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| date | 2018-08-08 | string |  false   |        |        |

## fqhgsjcc 非期货公司净持仓

非期货公司净持仓数据接口

### 用法

`fqhgsjcc <symbol> <date>`

### 参数

|  名称  | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :--------- | :----: | :------: | :----: | :----: |
| symbol | RB         | string |  false   |        |        |
|  date  | 2018-08-08 | string |  false   |        |        |

## mrjldlb_sp 每日净流多列表(商品)

每日净流多列表（商品）接口

### 用法

`mrjldlb_sp <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| date | 2018-08-08 | string |  false   |        |        |

## mrjlklb_sp 每日净流空列表(商品)

每日净流空列表(商品)接口

### 用法

`mrjlklb_sp <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| date | 2018-08-08 | string |  false   |        |        |

## mrjldlb_zs 每日净流多列表(指数)

每日净流多列表(指数)接口

### 用法

`mrjldlb_zs <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| date | 2018-08-08 | string |  false   |        |        |

## mrjlklb_zs 每日净流空列表(指数)

每日净流空列表(指数)接口

### 用法

`mrjlklb_zs <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| date | 2018-08-08 | string |  false   |        |        |

## mrspbzjcdbh 每日商品保证金沉淀变化

每日商品保证金沉淀变化接口

### 用法

`mrspbzjcdbh <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| date | 2018-08-08 | string |  false   |        |        |

## jcsj 基差数据

基差数据接口

### 用法

`jcsj <variety> <date>`

### 参数

|  名称   | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :--------- | :----: | :------: | :----: | :----: |
| variety | RB         | string |  false   |        |        |
|  date   | 2018-08-08 | string |  false   |        |        |

## qxjg 期限结构

期限结构接口

### 用法

`qxjg <variety> <date>`

### 参数

|  名称   | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :--------- | :----: | :------: | :----: | :----: |
| variety | RB         | string |  false   |        |        |
|  date   | 2018-08-08 | string |  false   |        |        |

## lrsj 利润数据

利润数据接口

### 用法

`lrsj <variety> <date>`

### 参数

|  名称   | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :--------- | :----: | :------: | :----: | :----: |
| variety | RB         | string |  false   |        |        |
|  date   | 2018-12-08 | string |  false   |        |        |

## xhmysbj 现货贸易商报价

现货贸易商报价接口

### 用法

`xhmysbj <variety> <date>`

### 参数

|  名称   | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :--------- | :----: | :------: | :----: | :----: |
| variety | RB         | string |  false   |        |        |
|  date   | 2018-08-08 | string |  false   |        |        |

## kqtlsj 跨期套利数据

跨期套利数据接口

### 用法

`kqtlsj <variety> <code1> <code2> <date>`

### 参数

|  名称   | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :--------- | :----: | :------: | :----: | :----: |
| variety | RB         | string |  false   |        |        |
|  code1  | 01         | string |  false   |        |        |
|  code2  | 05         | string |  false   |        |        |
|  date   | 2018-08-08 | string |  false   |        |        |

## zyjcsj 自由价差数据

自由价差数据接口

### 用法

`zyjcsj <variety1> <code1> <variety2> <code2> <date>`

### 参数

|   名称   | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :------: | :--------- | :----: | :------: | :----: | :----: |
| variety1 | RB         | string |  false   |        |        |
|  code1   | 01         | string |  false   |        |        |
| variety2 | HC         | string |  false   |        |        |
|  code2   | 01         | string |  false   |        |        |
|   date   | 2018-08-08 | string |  false   |        |        |

## zyjbsj 自由价比数据

自由价比数据接口

### 用法

`zyjbsj <variety1> <code1> <variety2> <code2> <date>`

### 参数

|   名称   | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :------: | :--------- | :----: | :------: | :----: | :----: |
| variety1 | RB         | string |  false   |        |        |
|  code1   | 01         | string |  false   |        |        |
| variety2 | HC         | string |  false   |        |        |
|  code2   | 01         | string |  false   |        |        |
|   date   | 2018-08-08 | string |  false   |        |        |

## cdsj 仓单数据

仓单数据接口

### 用法

`cdsj <variety> <date>`

### 参数

|  名称   | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :--------- | :----: | :------: | :----: | :----: |
| variety | RB         | string |  false   |        |        |
|  date   | 2018-08-08 | string |  false   |        |        |

## cdhzsj 仓单汇总数据

仓单汇总数据接口

### 用法

`cdhzsj <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| date | 2018-08-08 | string |  false   |        |        |

## xspbsj 虚实盘比数据

虚实盘比数据接口

### 用法

`xspbsj <variety> <code> <date>`

### 参数

|  名称   | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :--------- | :----: | :------: | :----: | :----: |
| variety | RB         | string |  false   |        |        |
|  code   | 10         | string |  false   |        |        |
|  date   | 2018-08-08 | string |  false   |        |        |

## zsxx 指数信息

指数信息接口

### 用法

`zsxx <index_id>`

### 参数

|   名称   | 描述                                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :------: | :---------------------------------------- | :----: | :------: | :----: | :----: |
| index_id | index0070c0eb-93ba-2da9-6633-fa70cb90e959 | string |  false   |        |        |

## zsqzsj 指数权重数据

指数权重数据接口

### 用法

`zsqzsj <index_id> <date>`

### 参数

|   名称   | 描述                                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :------: | :---------------------------------------- | :----: | :------: | :----: | :----: |
| index_id | index0070c0eb-93ba-2da9-6633-fa70cb90e959 | string |  false   |        |        |
|   date   | 2018-08-08                                | string |  false   |        |        |

## zshqsj 指数行情数据

指数行情数据接口

### 用法

`zshqsj <index_id> <date>`

### 参数

|   名称   | 描述                                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :------: | :---------------------------------------- | :----: | :------: | :----: | :----: |
| index_id | index0070c0eb-93ba-2da9-6633-fa70cb90e959 | string |  false   |        |        |
|   date   | 2018-08-08                                | string |  false   |        |        |

## zscdzjsj 指数沉淀资金数据

指数沉淀资金数据接口

### 用法

`zscdzjsj <index_id> <date>`

### 参数

|   名称   | 描述                                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :------: | :---------------------------------------- | :----: | :------: | :----: | :----: |
| index_id | index0070c0eb-93ba-2da9-6633-fa70cb90e959 | string |  false   |        |        |
|   date   | 2018-08-08                                | string |  false   |        |        |

## ggzslb 公共指数列表

公共指数列表接口

### 用法

`ggzslb`

### 命令示例

`ggzslb`
<IStockShellDemo cmd='ggzslb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## grzslb 个人指数列表

个人指数列表接口

### 用法

`grzslb`

### 命令示例

`grzslb`
<IStockShellDemo cmd='grzslb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zszjdx 指数资金动向

指数资金动向接口

### 用法

`zszjdx <index_id> <date>`

### 参数

|   名称   | 描述                                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :------: | :---------------------------------------- | :----: | :------: | :----: | :----: |
| index_id | index0070c0eb-93ba-2da9-6633-fa70cb90e959 | string |  false   |        |        |
|   date   | 2018-08-08                                | string |  false   |        |        |

## zsdxwyksj 指数的席位盈亏数据

指数的席位盈亏数据接口

### 用法

`zsdxwyksj <index_id> <start_date> <end_date>`

### 参数

|    名称    | 描述                                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :--------: | :---------------------------------------- | :----: | :------: | :----: | :----: |
|  index_id  | index0070c0eb-93ba-2da9-6633-fa70cb90e959 | string |  false   |        |        |
| start_date | 2018-07-08                                | string |  false   |        |        |
|  end_date  | 2018-08-08                                | string |  false   |        |        |

## lhnxdthyc 龙虎牛熊多头合约池

龙虎牛熊多头合约池接口

### 用法

`lhnxdthyc <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| date | 2018-08-08 | string |  false   |        |        |

## lhnxkthyc 龙虎牛熊空头合约池

龙虎牛熊空头合约池

### 用法

`lhnxkthyc <date>`

### 参数

| 名称 | 描述       |  类型  | 是否可选 | 默认值 | 可选值 |
| :--: | :--------- | :----: | :------: | :----: | :----: |
| date | 2018-08-08 | string |  false   |        |        |
