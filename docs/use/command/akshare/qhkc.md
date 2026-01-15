---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---
# akshare

## xw_xwccsj 席位持仓数据 
席位持仓数据接口

### 用法

`xw_xwccsj <broker> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| broker | 永安期货 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## xw_xwyksj 席位盈亏数据 
席位盈亏数据接口

### 用法

`xw_xwyksj <broker> <start_date> <end_date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| broker | 永安期货 | string | false |  |  |
| start_date | 2018-07-08 | string | false |  |  |
| end_date | 2018-08-08 | string | false |  |  |


## xw_xwmrdzjldsj 席位每日大资金流动数据 
席位每日大资金流动数据接口

### 用法

`xw_xwmrdzjldsj <broker> <date> <offset>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| broker | 永安期货 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |
| offset | 1000000 | string | false |  |  |


## xw_xwdkbsj 席位多空比数据 
席位多空比数据接口

### 用法

`xw_xwdkbsj <broker> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| broker | 永安期货 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## xw_xwjccbzjbhsj 席位净持仓保证金变化数据 
席位净持仓保证金变化数据接口

### 用法

`xw_xwjccbzjbhsj <broker> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| broker | 永安期货 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## xw_xwjccbzjsj 席位净持仓保证金数据 
席位净持仓保证金数据接口

### 用法

`xw_xwjccbzjsj <broker> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| broker | 永安期货 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## xw_xwzccbzjsj 席位总持仓保证金数据 
席位总持仓保证金数据接口

### 用法

`xw_xwzccbzjsj <broker> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| broker | 永安期货 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## xw_xwdspyksj 席位的商品盈亏数据 
席位的商品盈亏数据接口

### 用法

`xw_xwdspyksj <broker> <start_date> <end_date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| broker | 永安期货 | string | false |  |  |
| start_date | 2018-07-08 | string | false |  |  |
| end_date | 2018-07-08 | string | false |  |  |


## xw_xwylpx 席位盈利排行 
席位盈利排行数据接口

### 用法

`xw_xwylpx <start_date> <end_date> <count>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| start_date | 2018-07-08 | string | false |  |  |
| end_date | 2018-07-08 | string | false |  |  |
| count | 10; 默认10条 | string | false |  |  |


## xw_xwkspx 席位亏损排行 
席位亏损排行数据接口

### 用法

`xw_xwkspx <start_date> <end_date> <count>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| start_date | 2018-07-08 | string | false |  |  |
| end_date | 2018-07-08 | string | false |  |  |
| count | 10; 默认10条 | string | false |  |  |


## xw_syxwsj 所有席位数据 
所有席位数据接口

### 用法

`xw_syxwsj <offset_days>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| offset_days | 默认为365，即一年内上过榜的席位 | string | false |  |  |


## xw_jcgc 建仓过程 
建仓过程数据接口

### 用法

`xw_jcgc <broker> <code> [-start_date <start_date>] [-end_date <end_date>]`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| broker | 永安期货 | string | false |  |  |
| code | rb1810 | string | false |  |  |

### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-start_date，--start_date` | start_date | &quot;2020-02-03&quot;; 可选参数 | string | true |  |  |
| `-end_date，--end_date` | end_date | &quot;2020-06-03&quot;; 可选参数 | string | true |  |  |

## xw_xwddp 席位对对碰 
席位对对碰数据接口

### 用法

`xw_xwddp <broker1> <broker2> <symbol>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| broker1 | 永安期货 | string | false |  |  |
| broker2 | 兴证期货 | string | false |  |  |
| symbol | 螺纹钢 | string | false |  |  |


## sp_hyccsj 合约持仓数据 
合约持仓数据接口

### 用法

`sp_hyccsj <fields> <code> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| fields | longs: 返回多头数据; shorts: 返回空头数据 | string | false |  |  |
| code | rb1810 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## sp_spccsj 商品持仓数据 


### 用法

`sp_spccsj`



### 命令示例

`sp_spccsj`
<IStockShellDemo cmd='sp_spccsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## sp_spjccsj 商品净持仓数据 
商品净持仓数据接口

### 用法

`sp_spjccsj <symbol> <broker> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| symbol | RB | string | false |  |  |
| broker | 永安期货 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## sp_hyhqsj 合约行情数据 
合约行情数据接口

### 用法

`sp_hyhqsj <code> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| code | rb1810 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## sp_spcdzjsj 商品沉淀资金数据 
商品沉淀资金数据接口

### 用法

`sp_spcdzjsj <symbol> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| symbol | RB | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## sp_hydkbsj 合约多空比数据 
合约多空比数据接口

### 用法

`sp_hydkbsj <code> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| code | rb1810 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## sp_hyjccbzjbhsj 合约净持仓保证金变化数据 
合约净持仓保证金变化数据接口

### 用法

`sp_hyjccbzjbhsj <code> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| code | rb1810 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## sp_hyjccbzjsj 合约净持仓保证金数据 
合约净持仓保证金数据接口

### 用法

`sp_hyjccbzjsj <code> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| code | rb1810 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## sp_hyzccbzjsj 合约总持仓保证金数据 
合约总持仓保证金数据接口

### 用法

`sp_hyzccbzjsj <code> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| code | rb1810 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## sp_spdxwyksj 商品的席位盈亏数据 
商品的席位盈亏数据接口

### 用法

`sp_spdxwyksj <symbol> <start_date> <end_date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| symbol | RB | string | false |  |  |
| start_date | 2018-02-08 | string | false |  |  |
| end_date | 2018-08-08 | string | false |  |  |


## sp_zyzbsj 自研指标数据 
自研指标数据接口

### 用法

`sp_zyzbsj <code> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| code | rb1810 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## sp_spxgybsj 商品相关研报数据 
商品相关研报数据接口

### 用法

`sp_spxgybsj <csymbolode> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| csymbolode | RB | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## sp_splbsj 商品列表数据 
商品列表数据接口

### 用法

`sp_splbsj <csymbolode> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| csymbolode | RB | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## sp_hysy 合约索引 
合约索引数据接口

### 用法

`sp_hysy <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| date | 2018-08-08 | string | false |  |  |


## sp_fqhgsjcc 非期货公司净持仓 
非期货公司净持仓数据接口

### 用法

`sp_fqhgsjcc <symbol> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| symbol | RB | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## zj_mrjldlb_sp 每日净流多列表(商品) 
每日净流多列表（商品）接口

### 用法

`zj_mrjldlb_sp <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| date | 2018-08-08 | string | false |  |  |


## zj_mrjlklb_sp 每日净流空列表(商品) 
每日净流空列表(商品)接口

### 用法

`zj_mrjlklb_sp <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| date | 2018-08-08 | string | false |  |  |


## zj_mrjldlb_zs 每日净流多列表(指数) 
每日净流多列表(指数)接口

### 用法

`zj_mrjldlb_zs <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| date | 2018-08-08 | string | false |  |  |


## zj_mrjlklb_zs 每日净流空列表(指数) 
每日净流空列表(指数)接口

### 用法

`zj_mrjlklb_zs <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| date | 2018-08-08 | string | false |  |  |


## zj_mrspbzjcdbh 每日商品保证金沉淀变化 
每日商品保证金沉淀变化接口

### 用法

`zj_mrspbzjcdbh <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| date | 2018-08-08 | string | false |  |  |


## jbm_jcsj 基差数据 
基差数据接口

### 用法

`jbm_jcsj <variety> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| variety | RB | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## jbm_qxjg 期限结构 
期限结构接口

### 用法

`jbm_qxjg <variety> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| variety | RB | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## jbm_lrsj 利润数据 
利润数据接口

### 用法

`jbm_lrsj <variety> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| variety | RB | string | false |  |  |
| date | 2018-12-08 | string | false |  |  |


## jbm_xhmysbj 现货贸易商报价 
现货贸易商报价接口

### 用法

`jbm_xhmysbj <variety> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| variety | RB | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## jbm_kqtlsj 跨期套利数据 
跨期套利数据接口

### 用法

`jbm_kqtlsj <variety> <code1> <code2> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| variety | RB | string | false |  |  |
| code1 | 01 | string | false |  |  |
| code2 | 05 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## jbm_zyjcsj 自由价差数据 
自由价差数据接口

### 用法

`jbm_zyjcsj <variety1> <code1> <variety2> <code2> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| variety1 | RB | string | false |  |  |
| code1 | 01 | string | false |  |  |
| variety2 | HC | string | false |  |  |
| code2 | 01 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## jbm_zyjbsj 自由价比数据 
自由价比数据接口

### 用法

`jbm_zyjbsj <variety1> <code1> <variety2> <code2> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| variety1 | RB | string | false |  |  |
| code1 | 01 | string | false |  |  |
| variety2 | HC | string | false |  |  |
| code2 | 01 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## jbm_cdsj 仓单数据 
仓单数据接口

### 用法

`jbm_cdsj <variety> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| variety | RB | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## jbm_cdhzsj 仓单汇总数据 
仓单汇总数据接口

### 用法

`jbm_cdhzsj <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| date | 2018-08-08 | string | false |  |  |


## jbm_xspbsj 虚实盘比数据 
虚实盘比数据接口

### 用法

`jbm_xspbsj <variety> <code> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| variety | RB | string | false |  |  |
| code | 10 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## zsxx_zsxx 指数信息 
指数信息接口

### 用法

`zsxx_zsxx <index_id>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| index_id | index0070c0eb-93ba-2da9-6633-fa70cb90e959 | string | false |  |  |


## zsxx_zsqzsj 指数权重数据 
指数权重数据接口

### 用法

`zsxx_zsqzsj <index_id> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| index_id | index0070c0eb-93ba-2da9-6633-fa70cb90e959 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## zsxx_zshqsj 指数行情数据 
指数行情数据接口

### 用法

`zsxx_zshqsj <index_id> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| index_id | index0070c0eb-93ba-2da9-6633-fa70cb90e959 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## zsxx_zscdzjsj 指数沉淀资金数据 
指数沉淀资金数据接口

### 用法

`zsxx_zscdzjsj <index_id> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| index_id | index0070c0eb-93ba-2da9-6633-fa70cb90e959 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## zsxx_ggzslb 公共指数列表 
公共指数列表接口

### 用法

`zsxx_ggzslb`



### 命令示例

`zsxx_ggzslb`
<IStockShellDemo cmd='zsxx_ggzslb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zsxx_grzslb 个人指数列表 
个人指数列表接口

### 用法

`zsxx_grzslb`



### 命令示例

`zsxx_grzslb`
<IStockShellDemo cmd='zsxx_grzslb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zsxx_zszjdx 指数资金动向 
指数资金动向接口

### 用法

`zsxx_zszjdx <index_id> <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| index_id | index0070c0eb-93ba-2da9-6633-fa70cb90e959 | string | false |  |  |
| date | 2018-08-08 | string | false |  |  |


## zsxx_zsdxwyksj 指数的席位盈亏数据 
指数的席位盈亏数据接口

### 用法

`zsxx_zsdxwyksj <index_id> <start_date> <end_date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| index_id | index0070c0eb-93ba-2da9-6633-fa70cb90e959 | string | false |  |  |
| start_date | 2018-07-08 | string | false |  |  |
| end_date | 2018-08-08 | string | false |  |  |


## qhgj_lhnxdthyc 龙虎牛熊多头合约池 
龙虎牛熊多头合约池接口

### 用法

`qhgj_lhnxdthyc <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| date | 2018-08-08 | string | false |  |  |


## qhgj_lhnxkthyc 龙虎牛熊空头合约池 
龙虎牛熊空头合约池

### 用法

`qhgj_lhnxkthyc <date>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| date | 2018-08-08 | string | false |  |  |


