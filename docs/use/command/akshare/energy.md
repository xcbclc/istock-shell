---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---

# akshare

## tpfq_gn 碳排放权-国内

碳交易网-行情信息

### 用法

`tpfq_gn [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                          |  类型  | 是否可选 | 默认值 |                 可选值                  |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :-------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;湖北&quot;; choice of &#123;&#39;湖北&#39;, &#39;上海&#39;, &#39;北京&#39;, &#39;重庆&#39;, &#39;广东&#39;, &#39;天津&#39;, &#39;深圳&#39;, &#39;福建&#39;&#125; | string |   true   |  湖北  | 湖北,上海,北京,重庆,广东,天津,深圳,福建 |

### 命令示例

`tpfq_gn`
<IStockShellDemo cmd='tpfq_gn' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## tpfq_bj 碳排放权-北京

北京市碳排放权电子交易平台-北京市碳排放权公开交易行情

### 用法

`tpfq_bj`

### 命令示例

`tpfq_bj`
<IStockShellDemo cmd='tpfq_bj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## tpfq_sz 碳排放权-深圳

深圳碳排放交易所-国内碳情

### 用法

`tpfq_sz`

### 命令示例

`tpfq_sz`
<IStockShellDemo cmd='tpfq_sz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## tpfq_gj 碳排放权-国际

深圳碳排放交易所-国际碳情

### 用法

`tpfq_gj`

### 命令示例

`tpfq_gj`
<IStockShellDemo cmd='tpfq_gj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## tpfq_hb 碳排放权-湖北

湖北碳排放权交易中心-碳排放权交易数据

### 用法

`tpfq_hb`

### 命令示例

`tpfq_hb`
<IStockShellDemo cmd='tpfq_hb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## tpfq_gz 碳排放权-广州

广州碳排放权交易中心-行情信息

### 用法

`tpfq_gz`

### 命令示例

`tpfq_gz`
<IStockShellDemo cmd='tpfq_gz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qcylstjxx 汽柴油历史调价信息

东方财富-数据中心-中国油价-汽柴油历史调价信息

### 用法

`qcylstjxx`

### 命令示例

`qcylstjxx`
<IStockShellDemo cmd='qcylstjxx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dqyj 地区油价

东方财富-数据中心-中国油价-地区油价

### 用法

`dqyj [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20200319&quot;; 此日期为调价日期, 通过调用 ak.energy_oil_hist() 可以获取历史调价日期 | string |   true   | 20200319 |        |

### 命令示例

`dqyj`
<IStockShellDemo cmd='dqyj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
