---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---

# akshare

## hbbjzxsj 货币报价最新数据

货币报价最新数据

### 用法

`hbbjzxsj <api_key> [-base [base]] [-symbols <symbols>]`

### 参数

|  名称   | 描述                              |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :-------------------------------- | :----: | :------: | :----: | :----: |
| api_key | api_key=&quot;此处输入 API&quot;; | string |  false   |        |        |

### 选项

|       选项参数        |  名称   | 描述                                                                                                                                                                       |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
|    `-base，--base`    |  base   | base=&quot;USD&quot;                                                                                                                                                       | string |   true   |  USD   |        |
| `-symbols，--symbols` | symbols | symbols=&quot;&quot;; 默认返回全部, 可以在此处设置 symbols=&quot;AUD&quot;, 则返回 AUD 的数据; 可以在此处设置 symbols: str = &quot;AUD,CNY&quot;, 则返回 AUD 和 CNY 的数据 | string |   true   |        |        |

## hbbjlssj 货币报价历史数据

货币报价历史数据

### 用法

`hbbjlssj <api_key> [-base [base]] [-date [date]] [-symbols <symbols>]`

### 参数

|  名称   | 描述                              |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :-------------------------------- | :----: | :------: | :----: | :----: |
| api_key | api_key=&quot;此处输入 API&quot;; | string |  false   |        |        |

### 选项

|       选项参数        |  名称   | 描述                                                                                                                                                                       |  类型  | 是否可选 |   默认值   | 可选值 |
| :-------------------: | :-----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :--------: | :----: |
|    `-base，--base`    |  base   | base=&quot;USD&quot;                                                                                                                                                       | string |   true   |    USD     |        |
|    `-date，--date`    |  date   | date=&quot;2023-02-03&quot;                                                                                                                                                | string |   true   | 2023-02-03 |        |
| `-symbols，--symbols` | symbols | symbols=&quot;&quot;; 默认返回全部, 可以在此处设置 symbols=&quot;AUD&quot;, 则返回 AUD 的数据; 可以在此处设置 symbols: str = &quot;AUD,CNY&quot;, 则返回 AUD 和 CNY 的数据 | string |   true   |            |        |

## hbbjsjxlsj 货币报价时间序列数据

货币报价时间序列数据

### 用法

`hbbjsjxlsj <api_key> [-base [base]] [-start_date [start_date]] [-end_date [end_date]] [-symbols <symbols>]`

### 参数

|  名称   | 描述                              |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :-------------------------------- | :----: | :------: | :----: | :----: |
| api_key | api_key=&quot;此处输入 API&quot;; | string |  false   |        |        |

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                                                       |  类型  | 是否可选 |   默认值   | 可选值 |
| :-------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :--------: | :----: |
|       `-base，--base`       |    base    | base=&quot;USD&quot;                                                                                                                                                       | string |   true   |    USD     |        |
| `-start_date，--start_date` | start_date | start_date=&quot;2023-02-03&quot;                                                                                                                                          | string |   true   | 2023-02-03 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;2023-03-04&quot;                                                                                                                                            | string |   true   | 2023-03-04 |        |
|    `-symbols，--symbols`    |  symbols   | symbols=&quot;&quot;; 默认返回全部, 可以在此处设置 symbols=&quot;AUD&quot;, 则返回 AUD 的数据; 可以在此处设置 symbols: str = &quot;AUD,CNY&quot;, 则返回 AUD 和 CNY 的数据 | string |   true   |            |        |

## hbjcxxcx 货币基础信息查询

所有货币的基础信息

### 用法

`hbjcxxcx <api_key> [-c_type [c_type]]`

### 参数

|  名称   | 描述                              |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :-------------------------------- | :----: | :------: | :----: | :----: |
| api_key | api_key=&quot;此处输入 API&quot;; | string |  false   |        |        |

### 选项

|      选项参数       |  名称  | 描述                    |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------- | :----: | :------: | :----: | :----: |
| `-c_type，--c_type` | c_type | c_type=&quot;fiat&quot; | string |   true   |  fiat  |        |

## hbdjgzh 货币对价格转换

指定货币对指定货币数量的转换后价格

### 用法

`hbdjgzh <api_key> [-base [base]] [-to [to]] [-amount [amount]]`

### 参数

|  名称   | 描述                              |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----: | :-------------------------------- | :----: | :------: | :----: | :----: |
| api_key | api_key=&quot;此处输入 API&quot;; | string |  false   |        |        |

### 选项

|      选项参数       |  名称  | 描述                                 |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :----------------------------------- | :----: | :------: | :----: | :----: |
|   `-base，--base`   |  base  | base=&quot;USD&quot;; 基础货币       | string |   true   |  USD   |        |
|     `-to，--to`     |   to   | to=&quot;CNY&quot;; 需要转换到的货币 | string |   true   |  CNY   |        |
| `-amount，--amount` | amount | amount=&quot;10000&quot;; 转换量     | string |   true   | 10000  |        |
