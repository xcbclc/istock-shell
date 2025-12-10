---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---

# akshare

## shzqjys 上海证券交易所

上海证券交易所-股票数据总貌

### 用法

`shzqjys`

### 命令示例

`shzqjys`
<IStockShellDemo cmd='shzqjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zqlbtj 证券类别统计

深圳证券交易所-市场总貌-证券类别统计

### 用法

`zqlbtj [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20200619&quot;; 当前交易日的数据需要交易所收盘后统计 | string |   true   | 20200619 |        |

### 命令示例

`zqlbtj`
<IStockShellDemo cmd='zqlbtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dqjypx 地区交易排序

深圳证券交易所-市场总貌-地区交易排序

### 用法

`dqjypx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                          |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------: | :--: | :---------------------------- | :----: | :------: | :----: | :----: |
| `-date，--date` | date | date=&quot;202203&quot;; 年月 | string |   true   | 202203 |        |

### 命令示例

`dqjypx`
<IStockShellDemo cmd='dqjypx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gphycj 股票行业成交

深圳证券交易所-统计资料-股票行业成交数据

### 用法

`gphycj [-symbol [symbol]] [-date [date]]`

### 选项

|      选项参数       |  名称  | 描述                                                                              |  类型  | 是否可选 | 默认值 |  可选值   |
| :-----------------: | :----: | :-------------------------------------------------------------------------------- | :----: | :------: | :----: | :-------: |
| `-symbol，--symbol` | symbol | symbol=&quot;当月&quot;; choice of &#123;&quot;当月&quot;, &quot;当年&quot;&#125; | string |   true   |  当月  | 当月,当年 |
|   `-date，--date`   |  date  | date=&quot;202501&quot;; 年月                                                     | string |   true   | 202501 |           |

### 命令示例

`gphycj`
<IStockShellDemo cmd='gphycj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## shzqjys_mrgk 上海证券交易所-每日概况

上海证券交易所-数据-股票数据-成交概况-股票成交概况-每日股票情况

### 用法

`shzqjys_mrgk [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                                         |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :----------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20250221&quot;; 当前交易日的数据需要交易所收盘后统计; 注意仅支持获取在 20211227（包含）之后的数据 | string |   true   | 20250221 |        |

### 命令示例

`shzqjys_mrgk`
<IStockShellDemo cmd='shzqjys_mrgk' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggxxcx_dc 个股信息查询-东财

东方财富-个股-股票信息

### 用法

`ggxxcx_dc [-symbol [symbol]] [-timeout <timeout>]`

### 选项

|       选项参数        |  名称   | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------------: | :-----: | :---------------------------------- | :----: | :------: | :----: | :----: |
|  `-symbol，--symbol`  | symbol  | symbol=&quot;603777&quot;; 股票代码 | string |   true   | 603777 |        |
| `-timeout，--timeout` | timeout | timeout=None; 默认不设置超时参数    | number |   true   |        |        |

### 命令示例

`ggxxcx_dc`
<IStockShellDemo cmd='ggxxcx_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggxxcx_xq 个股信息查询-雪球

雪球财经-个股-公司概况-公司简介

### 用法

`ggxxcx_xq [-symbol [symbol]] [-token <token>] [-timeout <timeout>]`

### 选项

|       选项参数        |  名称   | 描述                                  |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------: | :-----: | :------------------------------------ | :----: | :------: | :------: | :----: |
|  `-symbol，--symbol`  | symbol  | symbol=&quot;SH601127&quot;; 股票代码 | string |   true   | SH601127 |        |
|   `-token，--token`   |  token  | token=None;                           | string |   true   |          |        |
| `-timeout，--timeout` | timeout | timeout=None; 默认不设置超时参数      | number |   true   |          |        |

### 命令示例

`ggxxcx_xq`
<IStockShellDemo cmd='ggxxcx_xq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hqbj 行情报价

东方财富-行情报价

### 用法

`hqbj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;000001&quot;; 股票代码 | string |   true   | 000001 |        |

### 命令示例

`hqbj`
<IStockShellDemo cmd='hqbj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hsj_a_g 沪深京 A 股

东方财富网-沪深京 A 股-实时行情数据

### 用法

`hsj_a_g`

### 命令示例

`hsj_a_g`
<IStockShellDemo cmd='hsj_a_g' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## h_a_g 沪 A 股

东方财富网-沪 A 股-实时行情数据

### 用法

`h_a_g`

### 命令示例

`h_a_g`
<IStockShellDemo cmd='h_a_g' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## s_a_g 深 A 股

东方财富网-深 A 股-实时行情数据

### 用法

`s_a_g`

### 命令示例

`s_a_g`
<IStockShellDemo cmd='s_a_g' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## j_a_g 京 A 股

东方财富网-京 A 股-实时行情数据

### 用法

`j_a_g`

### 命令示例

`j_a_g`
<IStockShellDemo cmd='j_a_g' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xg 新股

东方财富网-新股-实时行情数据

### 用法

`xg`

### 命令示例

`xg`
<IStockShellDemo cmd='xg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cyb 创业板

东方财富网-创业板-实时行情

### 用法

`cyb`

### 命令示例

`cyb`
<IStockShellDemo cmd='cyb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kcb 科创板

东方财富网-科创板-实时行情

### 用法

`kcb`

### 命令示例

`kcb`
<IStockShellDemo cmd='kcb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ab_gbj AB 股比价

东方财富网-行情中心-沪深京个股-AB股比价-全部AB股比价

### 用法

`ab_gbj`

### 命令示例

`ab_gbj`
<IStockShellDemo cmd='ab_gbj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj_xl 实时行情数据-新浪

新浪财经-沪深京 A 股数据, 重复运行本函数会被新浪暂时封 IP, 建议增加时间间隔

### 用法

`sshqsj_xl`

### 命令示例

`sshqsj_xl`
<IStockShellDemo cmd='sshqsj_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj_xq 实时行情数据-雪球

雪球-行情中心-个股

### 用法

`sshqsj_xq [-symbol [symbol]] [-token <token>] [-timeout <timeout>]`

### 选项

|       选项参数        |  名称   | 描述                                                                                                       |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------: | :-----: | :--------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
|  `-symbol，--symbol`  | symbol  | symbol=&quot;SH600000&quot;; 证券代码，可以是 A 股个股代码，A 股场内基金代码，A 股指数，美股代码, 美股指数 | string |   true   | SH600000 |        |
|   `-token，--token`   |  token  | token=None; 默认不设置token                                                                                | number |   true   |          |        |
| `-timeout，--timeout` | timeout | timeout=None; 默认不设置超时参数                                                                           | number |   true   |          |        |

### 命令示例

`sshqsj_xq`
<IStockShellDemo cmd='sshqsj_xq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj_dc 历史行情数据-东财

东方财富-沪深京 A 股日频率数据; 历史数据按日频率更新, 当日收盘价请在收盘后获取

### 用法

`lshqsj_dc [-symbol [symbol]] [-period [period]] [-start_date [start_date]] [-end_date [end_date]] [-adjust <adjust>] [-timeout <timeout>]`

### 选项

|          选项参数           |    名称    | 描述                                                                                               |  类型  | 是否可选 |  默认值  |        可选值        |
| :-------------------------: | :--------: | :------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&#39;603777&#39;; 股票代码可以在 \*\*ak.stock_zh_a_spot_em()\*\* 中获取                     | string |   true   |  603777  |                      |
|     `-period，--period`     |   period   | period=&#39;daily&#39;; choice of &#123;&#39;daily&#39;, &#39;weekly&#39;, &#39;monthly&#39;&#125; | string |   true   |  daily   | daily,weekly,monthly |
| `-start_date，--start_date` | start_date | start_date=&#39;20210301&#39;; 开始查询的日期                                                      | string |   true   | 20210301 |                      |
|   `-end_date，--end_date`   |  end_date  | end_date=&#39;20210616&#39;; 结束查询的日期                                                        | string |   true   | 20210616 |                      |
|     `-adjust，--adjust`     |   adjust   | 默认返回不复权的数据; qfq: 返回前复权后的数据; hfq: 返回后复权后的数据                             | string |   true   |          |       ,qfq,hfq       |
|    `-timeout，--timeout`    |  timeout   | timeout=None; 默认不设置超时参数                                                                   | number |   true   |          |                      |

### 命令示例

`lshqsj_dc`
<IStockShellDemo cmd='lshqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj_xl 历史行情数据-新浪

新浪财经-沪深京 A 股的数据, 历史数据按日频率更新; 注意其中的 **sh689009** 为 CDR, 请 通过 **ak.stock_zh_a_cdr_daily** 接口获取

### 用法

`lshqsj_xl [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]] [-adjust <adjust>]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                           |  类型  | 是否可选 |  默认值  |             可选值             |
| :-------------------------: | :--------: | :----------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----------------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&#39;sh600000&#39;; 股票代码可以在 \*\*ak.stock_zh_a_spot()\*\* 中获取                                                  | string |   true   | sh600000 |                                |
| `-start_date，--start_date` | start_date | start_date=&#39;20201103&#39;; 开始查询的日期                                                                                  | string |   true   | 20201103 |                                |
|   `-end_date，--end_date`   |  end_date  | end_date=&#39;20201116&#39;; 结束查询的日期                                                                                    | string |   true   | 20201116 |                                |
|     `-adjust，--adjust`     |   adjust   | 默认返回不复权的数据; qfq: 返回前复权后的数据; hfq: 返回后复权后的数据; hfq-factor: 返回后复权因子; qfq-factor: 返回前复权因子 | string |   true   |          | ,qfq,hfq,qfq-factor,hfq-factor |

### 命令示例

`lshqsj_xl`
<IStockShellDemo cmd='lshqsj_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj_tx 历史行情数据-腾讯

腾讯证券-日频-股票历史数据; 历史数据按日频率更新, 当日收盘价请在收盘后获取

### 用法

`lshqsj_tx [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]] [-adjust <adjust>] [-timeout <timeout>]`

### 选项

|          选项参数           |    名称    | 描述                                                                   |  类型  | 是否可选 |  默认值  |  可选值  |
| :-------------------------: | :--------: | :--------------------------------------------------------------------- | :----: | :------: | :------: | :------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&#39;sz000001&#39;; 带市场标识                                  | string |   true   | sz000001 |          |
| `-start_date，--start_date` | start_date | start_date=&#39;19000101&#39;; 开始查询的日期                          | string |   true   | 19000101 |          |
|   `-end_date，--end_date`   |  end_date  | end_date=&#39;20500101&#39;; 结束查询的日期                            | string |   true   | 20500101 |          |
|     `-adjust，--adjust`     |   adjust   | 默认返回不复权的数据; qfq: 返回前复权后的数据; hfq: 返回后复权后的数据 | string |   true   |          | ,qfq,hfq |
|    `-timeout，--timeout`    |  timeout   | timeout=None; 默认不设置超时参数                                       | number |   true   |          |          |

### 命令示例

`lshqsj_tx`
<IStockShellDemo cmd='lshqsj_tx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fssj_xl 分时数据-新浪

新浪财经-沪深京 A 股股票或者指数的分时数据，目前可以获取 1, 5, 15, 30, 60 分钟的数据频率, 可以指定是否复权

### 用法

`fssj_xl [-symbol [symbol]] [-period [period]] [-adjust <adjust>]`

### 选项

|      选项参数       |  名称  | 描述                                                                                               |  类型  | 是否可选 |  默认值  |  可选值  |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :------: |
| `-symbol，--symbol` | symbol | symbol=&#39;sh000300&#39;; 同日频率数据接口                                                        | string |   true   | sh000300 |          |
| `-period，--period` | period | period=&#39;1&#39;; 获取 1, 5, 15, 30, 60 分钟的数据频率                                           | string |   true   |    1     |          |
| `-adjust，--adjust` | adjust | adjust=&quot;&quot;; 默认为空: 返回不复权的数据; qfq: 返回前复权后的数据; hfq: 返回后复权后的数据; | string |   true   |          | ,qfq,hfq |

### 命令示例

`fssj_xl`
<IStockShellDemo cmd='fssj_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fssj_dc 分时数据-东财

东方财富网-行情首页-沪深京 A 股-每日分时行情; 该接口只能获取近期的分时数据，注意时间周期的设置

### 用法

`fssj_dc [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]] [-period [period]] [-adjust <adjust>]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                                                                              |  类型  | 是否可选 |       默认值        |    可选值    |
| :-------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :-----------------: | :----------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&#39;000300&#39;; 股票代码                                                                                                                                                                 | string |   true   |       000300        |              |
| `-start_date，--start_date` | start_date | start_date=&quot;1979-09-01 09:32:00&quot;; 日期时间; 默认返回所有数据                                                                                                                            | string |   true   | 1979-09-01 09:32:00 |              |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;2222-01-01 09:32:00&quot;; 日期时间; 默认返回所有数据                                                                                                                              | string |   true   | 2222-01-01 09:32:00 |              |
|     `-period，--period`     |   period   | period=&#39;5&#39;; choice of &#123;&#39;1&#39;, &#39;5&#39;, &#39;15&#39;, &#39;30&#39;, &#39;60&#39;&#125;; 其中 1 分钟数据返回近 5 个交易日数据且不复权                                        | string |   true   |          5          | 1,5,15,30,60 |
|     `-adjust，--adjust`     |   adjust   | adjust=&#39;&#39;; choice of &#123;&#39;&#39;, &#39;qfq&#39;, &#39;hfq&#39;&#125;; &#39;&#39;: 不复权, &#39;qfq&#39;: 前复权, &#39;hfq&#39;: 后复权, 其中 1 分钟数据返回近 5 个交易日数据且不复权 | string |   true   |                     |   ,qfq,hfq   |

### 命令示例

`fssj_dc`
<IStockShellDemo cmd='fssj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rnfssj_dc 日内分时数据-东财

东方财富-分时数据

### 用法

`rnfssj_dc [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;000001&quot;; 股票代码 | string |   true   | 000001 |        |

### 命令示例

`rnfssj_dc`
<IStockShellDemo cmd='rnfssj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rnfssj_xl 日内分时数据-新浪

新浪财经-日内分时数据

### 用法

`rnfssj_xl [-symbol [symbol]] [-date [date]]`

### 选项

|      选项参数       |  名称  | 描述                                              |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;sz000001&quot;; 带市场标识的股票代码 | string |   true   | sz000001 |        |
|   `-date，--date`   |  date  | date=&quot;20240321&quot;; 交易日                 | string |   true   | 20240321 |        |

### 命令示例

`rnfssj_xl`
<IStockShellDemo cmd='rnfssj_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## pqsj 盘前数据

东方财富-股票行情-盘前数据

### 用法

`pqsj [-symbol [symbol]] [-start_time [start_time]] [-end_time [end_time]]`

### 选项

|          选项参数           |    名称    | 描述                                                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------------------------------ | :----: | :------: | :------: | :----: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;000001&quot;; 股票代码                     | string |   true   |  000001  |        |
| `-start_time，--start_time` | start_time | start_time=&quot;09:00:00&quot;; 时间; 默认返回所有数据 | string |   true   | 09:00:00 |        |
|   `-end_time，--end_time`   |  end_time  | end_time=&quot;15:40:00&quot;; 时间; 默认返回所有数据   | string |   true   | 15:40:00 |        |

### 命令示例

`pqsj`
<IStockShellDemo cmd='pqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## txcj 腾讯财经

每个交易日 16:00 提供当日数据; 如遇到数据缺失, 请使用 **ak.stock_zh_a_tick_163()** 接口(注意数据会有一定差异)

### 用法

`txcj`

### 命令示例

`txcj`
<IStockShellDemo cmd='txcj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj 历史行情数据

上海证券交易所-科创板-CDR

### 用法

`lshqsj [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :-------------------------------------- | :----: | :------: | :------: | :----: |
|     `-symbol，--symbol`     |   symbol   | symbol=&#39;sh689009&#39;; CDR 股票代码 | string |   true   | sh689009 |        |
| `-start_date，--start_date` | start_date | start_date=&#39;20201103&#39;           | string |   true   | 20201103 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&#39;20201116&#39;             | string |   true   | 20201116 |        |

### 命令示例

`lshqsj`
<IStockShellDemo cmd='lshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj_dc 实时行情数据-东财

东方财富网-实时行情数据

### 用法

`sshqsj_dc`

### 命令示例

`sshqsj_dc`
<IStockShellDemo cmd='sshqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj_xl 实时行情数据-新浪

B 股数据是从新浪财经获取的数据, 重复运行本函数会被新浪暂时封 IP, 建议增加时间间隔

### 用法

`sshqsj_xl`

### 命令示例

`sshqsj_xl`
<IStockShellDemo cmd='sshqsj_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj 历史行情数据

B 股数据是从新浪财经获取的数据, 历史数据按日频率更新

### 用法

`lshqsj [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]] [-adjust <adjust>]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                           |  类型  | 是否可选 |  默认值  |             可选值             |
| :-------------------------: | :--------: | :----------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----------------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&#39;sh900901&#39;; 股票代码可以在 \*\*ak.stock_zh_b_spot()\*\* 中获取                                                  | string |   true   | sh900901 |                                |
| `-start_date，--start_date` | start_date | start_date=&#39;20201103&#39;; 开始查询的日期                                                                                  | string |   true   | 20201103 |                                |
|   `-end_date，--end_date`   |  end_date  | end_date=&#39;20201116&#39;; 结束查询的日期                                                                                    | string |   true   | 20201116 |                                |
|     `-adjust，--adjust`     |   adjust   | 默认返回不复权的数据; qfq: 返回前复权后的数据; hfq: 返回后复权后的数据; hfq-factor: 返回后复权因子; qfq-factor: 返回前复权因子 | string |   true   |          | ,qfq,hfq,qfq-factor,hfq-factor |

### 命令示例

`lshqsj`
<IStockShellDemo cmd='lshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fssj 分时数据

新浪财经 B 股股票或者指数的分时数据，目前可以获取 1, 5, 15, 30, 60 分钟的数据频率, 可以指定是否复权

### 用法

`fssj [-symbol [symbol]] [-period [period]] [-adjust <adjust>]`

### 选项

|      选项参数       |  名称  | 描述                                                                                               |  类型  | 是否可选 |  默认值  |  可选值  |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :------: |
| `-symbol，--symbol` | symbol | symbol=&#39;sh900901&#39;; 同日频率数据接口                                                        | string |   true   | sh900901 |          |
| `-period，--period` | period | period=&#39;1&#39;; 获取 1, 5, 15, 30, 60 分钟的数据频率                                           | string |   true   |    1     |          |
| `-adjust，--adjust` | adjust | adjust=&quot;&quot;; 默认为空: 返回不复权的数据; qfq: 返回前复权后的数据; hfq: 返回后复权后的数据; | string |   true   |          | ,qfq,hfq |

### 命令示例

`fssj`
<IStockShellDemo cmd='fssj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cxg 次新股

新浪财经-行情中心-沪深股市-次新股

### 用法

`cxg`

### 命令示例

`cxg`
<IStockShellDemo cmd='cxg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gsdt 公司动态

东方财富网-数据中心-股市日历-公司动态

### 用法

`gsdt [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                              |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20230808&quot;; 交易日 | string |   true   | 20230808 |        |

### 命令示例

`gsdt`
<IStockShellDemo cmd='gsdt' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fxjsb 风险警示板

东方财富网-行情中心-沪深个股-风险警示板

### 用法

`fxjsb`

### 命令示例

`fxjsb`
<IStockShellDemo cmd='fxjsb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xg 新股

东方财富网-行情中心-沪深个股-新股

### 用法

`xg`

### 命令示例

`xg`
<IStockShellDemo cmd='xg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xgsssr 新股上市首日

同花顺-数据中心-新股数据-新股上市首日

### 用法

`xgsssr`

### 命令示例

`xgsssr`
<IStockShellDemo cmd='xgsssr' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ipo_syg IPO 受益股

同花顺-数据中心-新股数据-IPO受益股

### 用法

`ipo_syg`

### 命令示例

`ipo_syg`
<IStockShellDemo cmd='ipo_syg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lwjts 两网及退市

东方财富网-行情中心-沪深个股-两网及退市

### 用法

`lwjts`

### 命令示例

`lwjts`
<IStockShellDemo cmd='lwjts' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj 实时行情数据

新浪财经-科创板股票实时行情数据

### 用法

`sshqsj`

### 命令示例

`sshqsj`
<IStockShellDemo cmd='sshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj 历史行情数据

新浪财经-科创板股票历史行情数据

### 用法

`lshqsj [-symbol [symbol]] [-adjust <adjust>]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                       |  类型  | 是否可选 |  默认值  |             可选值             |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;sh688008&quot;; 带市场标识的股票代码                                                                          | string |   true   | sh688008 |                                |
| `-adjust，--adjust` | adjust | 默认不复权的数据; qfq: 返回前复权后的数据; hfq: 返回后复权后的数据; hfq-factor: 返回后复权因子; qfq-factor: 返回前复权因子 | string |   true   |          | ,qfq,hfq,qfq-factor,hfq-factor |

### 命令示例

`lshqsj`
<IStockShellDemo cmd='lshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kcbgg 科创板公告

东方财富-科创板报告数据

### 用法

`kcbgg [-from_page [from_page]] [-to_page [to_page]]`

### 选项

|         选项参数          |   名称    | 描述                        |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------------: | :-------: | :-------------------------- | :----: | :------: | :----: | :----: |
| `-from_page，--from_page` | from_page | from_page=1; 始获取的页码   | number |   true   |   1    |        |
|   `-to_page，--to_page`   |  to_page  | to_page=100; 结束获取的页码 | number |   true   |  100   |        |

### 命令示例

`kcbgg`
<IStockShellDemo cmd='kcbgg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj_dc 实时行情数据-东财

东方财富网-行情中心-沪深港通-AH股比价-实时行情, 延迟 15 分钟更新

### 用法

`sshqsj_dc`

### 命令示例

`sshqsj_dc`
<IStockShellDemo cmd='sshqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj_tx 实时行情数据-腾讯

A+H 股数据是从腾讯财经获取的数据, 延迟 15 分钟更新

### 用法

`sshqsj_tx`

### 命令示例

`sshqsj_tx`
<IStockShellDemo cmd='sshqsj_tx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj 历史行情数据

腾讯财经-A+H 股数据

### 用法

`lshqsj [-symbol [symbol]] [-start_year [start_year]] [-end_year [end_year]] [-adjust <adjust>]`

### 选项

|          选项参数           |    名称    | 描述                                                                                    |  类型  | 是否可选 | 默认值 |  可选值  |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------------- | :----: | :------: | :----: | :------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;02318&quot;; 港股股票代码, 可以通过 \*\*ak.stock_zh_ah_name()\*\* 函数获取 | string |   true   | 02318  |          |
| `-start_year，--start_year` | start_year | start_year=&quot;2000&quot;; 开始年份                                                   | string |   true   |  2000  |          |
|   `-end_year，--end_year`   |  end_year  | end_year=&quot;2019&quot;; 结束年份                                                     | string |   true   |  2019  |          |
|     `-adjust，--adjust`     |   adjust   | adjust=&quot;&quot;; 默认为空不复权; &#39;qfq&#39;: 前复权, &#39;hfq&#39;: 后复权       | string |   true   |        | ,qfq,hfq |

### 命令示例

`lshqsj`
<IStockShellDemo cmd='lshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## a+hgpzd A+H股票字典

A+H 股数据是从腾讯财经获取的数据, 历史数据按日频率更新

### 用法

`a+hgpzd`

### 命令示例

`a+hgpzd`
<IStockShellDemo cmd='a+hgpzd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj_dc 实时行情数据-东财

东方财富网-美股-实时行情

### 用法

`sshqsj_dc`

### 命令示例

`sshqsj_dc`
<IStockShellDemo cmd='sshqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj_xl 实时行情数据-新浪

新浪财经-美股; 获取的数据有 15 分钟延迟; 建议使用 ak.stock_us_spot_em() 来获取数据

### 用法

`sshqsj_xl`

### 命令示例

`sshqsj_xl`
<IStockShellDemo cmd='sshqsj_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj_dc 历史行情数据-东财

东方财富网-行情-美股-每日行情

### 用法

`lshqsj_dc <symbol> [-period [period]] [-start_date [start_date]] [-end_date [end_date]] [-adjust <adjust>]`

### 参数

|  名称  | 描述                                                                                                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :-------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| symbol | 美股代码, 可以通过 \*\*ak.stock_us_spot_em()\*\* 函数返回所有的 pandas.DataFrame 里面的 \`代码\` 字段获取 | string |  false   |        |        |

### 选项

|          选项参数           |    名称    | 描述                                                                                                                               |  类型  | 是否可选 |  默认值  |        可选值        |
| :-------------------------: | :--------: | :--------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :------------------: |
|     `-period，--period`     |   period   | period=&#39;daily&#39;; choice of &#123;&#39;daily&#39;, &#39;weekly&#39;, &#39;monthly&#39;&#125;                                 | string |   true   |  daily   | daily,weekly,monthly |
| `-start_date，--start_date` | start_date | start_date=&quot;20210101&quot;                                                                                                    | string |   true   | 20210101 |                      |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20210601&quot;                                                                                                      | string |   true   | 20210601 |                      |
|     `-adjust，--adjust`     |   adjust   | 默认 adjust=&quot;&quot;, 则返回未复权的数据; adjust=&quot;qfq&quot; 则返回前复权的数据, adjust=&quot;hfq&quot; 则返回后复权的数据 | string |   true   |          |       ,qfq,hfq       |

## ggxxcx_xq 个股信息查询-雪球

雪球-个股-公司概况-公司简介

### 用法

`ggxxcx_xq [-symbol [symbol]] [-token <token>] [-timeout <timeout>]`

### 选项

|       选项参数        |  名称   | 描述                              |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------------: | :-----: | :-------------------------------- | :----: | :------: | :----: | :----: |
|  `-symbol，--symbol`  | symbol  | symbol=&quot;NVDA&quot;; 股票代码 | string |   true   |  NVDA  |        |
|   `-token，--token`   |  token  | token=None;                       | string |   true   |        |        |
| `-timeout，--timeout` | timeout | timeout=None; 默认不设置超时参数  | number |   true   |        |        |

### 命令示例

`ggxxcx_xq`
<IStockShellDemo cmd='ggxxcx_xq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fssj_dc 分时数据-东财

东方财富网-行情首页-美股-每日分时行情

### 用法

`fssj_dc [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                 |  类型  | 是否可选 |       默认值        | 可选值 |
| :-------------------------: | :--------: | :----------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-----------------: | :----: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;105.ATER&quot;; 美股代码可以通过 \*\*ak.stock_us_spot_em()\*\* 函数返回所有的 pandas.DataFrame 里面的 \`代码\` 字段获取 | string |   true   |      105.ATER       |        |
| `-start_date，--start_date` | start_date | start_date=&quot;1979-09-01 09:32:00&quot;; 日期时间; 默认返回所有数据                                                               | string |   true   | 1979-09-01 09:32:00 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;2222-01-01 09:32:00&quot;; 日期时间; 默认返回所有数据                                                                 | string |   true   | 2222-01-01 09:32:00 |        |

### 命令示例

`fssj_dc`
<IStockShellDemo cmd='fssj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj_xl 历史行情数据-新浪

美股历史行情数据，设定 adjust="qfq" 则返回前复权后的数据，默认 adjust="", 则返回未复权的数据，历史数据按日频率更新

### 用法

`lshqsj_xl <symbol> [-adjust [adjust]]`

### 参数

|  名称  | 描述                                                                                                     |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| symbol | 美股代码, 可以通过 \*\*ak.get_us_stock_name()\*\* 函数返回所有美股代码, 由于美股数据量大, 建议按需要获取 | string |  false   |        |        |

### 选项

|      选项参数       |  名称  | 描述                                                                                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-adjust，--adjust` | adjust | adjust=&quot;qfq&quot; 则返回前复权后的数据，默认 adjust=&quot;&quot;, 则返回未复权的数据 | string |   true   |  qfq   |  ,qfq  |

## fdsc 粉单市场

美股粉单市场的实时行情数据

### 用法

`fdsc`

### 命令示例

`fdsc`
<IStockShellDemo cmd='fdsc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zmmg 知名美股

美股-知名美股的实时行情数据

### 用法

`zmmg [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                    |  类型  | 是否可选 | 默认值 |                        可选值                         |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :---------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;科技类&quot;; choice of &#123;&#39;科技类&#39;, &#39;金融类&#39;, &#39;医药食品类&#39;, &#39;媒体类&#39;, &#39;汽车能源类&#39;, &#39;制造零售类&#39;&#125; | string |   true   | 科技类 | 科技类,金融类,医药食品类,媒体类,汽车能源类,制造零售类 |

### 命令示例

`zmmg`
<IStockShellDemo cmd='zmmg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj_dc 实时行情数据-东财

所有港股的实时行情数据; 该数据有 15 分钟延时

### 用法

`sshqsj_dc`

### 命令示例

`sshqsj_dc`
<IStockShellDemo cmd='sshqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggzbsshqsj_dc 港股主板实时行情数据-东财

港股主板的实时行情数据; 该数据有 15 分钟延时

### 用法

`ggzbsshqsj_dc`

### 命令示例

`ggzbsshqsj_dc`
<IStockShellDemo cmd='ggzbsshqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj_xl 实时行情数据-新浪

获取所有港股的实时行情数据 15 分钟延时

### 用法

`sshqsj_xl`

### 命令示例

`sshqsj_xl`
<IStockShellDemo cmd='sshqsj_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggxxcx_xq 个股信息查询-雪球

雪球-个股-公司概况-公司简介

### 用法

`ggxxcx_xq [-symbol [symbol]] [-token <token>] [-timeout <timeout>]`

### 选项

|       选项参数        |  名称   | 描述                               |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------------: | :-----: | :--------------------------------- | :----: | :------: | :----: | :----: |
|  `-symbol，--symbol`  | symbol  | symbol=&quot;02097&quot;; 股票代码 | string |   true   | 02097  |        |
|   `-token，--token`   |  token  | token=None;                        | string |   true   |        |        |
| `-timeout，--timeout` | timeout | timeout=None; 默认不设置超时参数   | number |   true   |        |        |

### 命令示例

`ggxxcx_xq`
<IStockShellDemo cmd='ggxxcx_xq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fssj_dc 分时数据-东财

东方财富网-行情首页-港股-每日分时行情

### 用法

`fssj_dc [-symbol [symbol]] [-period [period]] [-adjust <adjust>] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                                                                              |  类型  | 是否可选 |       默认值        |    可选值    |
| :-------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :-----------------: | :----------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;01611&quot;; 港股代码可以通过 \*\*ak.stock_hk_spot_em()\*\* 函数返回所有的 pandas.DataFrame 里面的 \`代码\` 字段获取                                                                 | string |   true   |        01611        |              |
|     `-period，--period`     |   period   | period=&#39;5&#39;; choice of &#123;&#39;1&#39;, &#39;5&#39;, &#39;15&#39;, &#39;30&#39;, &#39;60&#39;&#125;; 其中 1 分钟数据返回近 5 个交易日数据且不复权                                        | string |   true   |          5          | 1,5,15,30,60 |
|     `-adjust，--adjust`     |   adjust   | adjust=&#39;&#39;; choice of &#123;&#39;&#39;, &#39;qfq&#39;, &#39;hfq&#39;&#125;; &#39;&#39;: 不复权, &#39;qfq&#39;: 前复权, &#39;hfq&#39;: 后复权, 其中 1 分钟数据返回近 5 个交易日数据且不复权 | string |   true   |                     |   ,qfq,hfq   |
| `-start_date，--start_date` | start_date | start_date=&quot;1979-09-01 09:32:00&quot;; 日期时间; 默认返回所有数据                                                                                                                            | string |   true   | 1979-09-01 09:32:00 |              |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;2222-01-01 09:32:00&quot;; 日期时间; 默认返回所有数据                                                                                                                              | string |   true   | 2222-01-01 09:32:00 |              |

### 命令示例

`fssj_dc`
<IStockShellDemo cmd='fssj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj_dc 历史行情数据-东财

港股-历史行情数据, 可以选择返回复权后数据, 更新频率为日频

### 用法

`lshqsj_dc [-symbol [symbol]] [-period [period]] [-start_date [start_date]] [-end_date [end_date]] [-adjust <adjust>]`

### 选项

|          选项参数           |    名称    | 描述                                                                                               |  类型  | 是否可选 |  默认值  |        可选值        |
| :-------------------------: | :--------: | :------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;00593&quot;; 港股代码,可以通过 \*\*ak.stock_hk_spot_em()\*\* 函数返回所有港股代码     | string |   true   |  00593   |                      |
|     `-period，--period`     |   period   | period=&#39;daily&#39;; choice of &#123;&#39;daily&#39;, &#39;weekly&#39;, &#39;monthly&#39;&#125; | string |   true   |  daily   | daily,weekly,monthly |
| `-start_date，--start_date` | start_date | start_date=&quot;19700101&quot;; 开始日期                                                          | string |   true   | 19700101 |                      |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;22220101&quot;; 结束日期                                                            | string |   true   | 22220101 |                      |
|     `-adjust，--adjust`     |   adjust   | adjust=&quot;&quot;: 返回未复权的数据, 默认; qfq: 返回前复权数据; hfq: 返回后复权数据;             | string |   true   |          |       ,qfq,hfq       |

### 命令示例

`lshqsj_dc`
<IStockShellDemo cmd='lshqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj_xl 历史行情数据-新浪

港股-历史行情数据, 可以选择返回复权后数据,更新频率为日频

### 用法

`lshqsj_xl <symbol> [-adjust <adjust>]`

### 参数

|  名称  | 描述                                                              |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :---------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| symbol | 港股代码,可以通过 \*\*ak.stock_hk_spot()\*\* 函数返回所有港股代码 | string |  false   |        |        |

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                   |  类型  | 是否可选 | 默认值 |             可选值             |
| :-----------------: | :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----------------------------: |
| `-adjust，--adjust` | adjust | &quot;&quot;: 返回未复权的数据 ; qfq: 返回前复权后的数据; hfq: 返回后复权后的数据; qfq-factor: 返回前复权因子和调整; hfq-factor: 返回后复权因子和调整; | string |   true   |        | ,qfq,hfq,qfq-factor,hfq-factor |

## zmgg 知名港股

东方财富网-行情中心-港股市场-知名港股实时行情数据

### 用法

`zmgg`

### 命令示例

`zmgg`
<IStockShellDemo cmd='zmgg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zqzl 证券资料

东方财富-港股-证券资料

### 用法

`zqzl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                     |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :----------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;03900&quot; | string |   true   | 03900  |        |

### 命令示例

`zqzl`
<IStockShellDemo cmd='zqzl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gszl 公司资料

东方财富-港股-公司资料

### 用法

`gszl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                     |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :----------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;03900&quot; | string |   true   | 03900  |        |

### 命令示例

`gszl`
<IStockShellDemo cmd='gszl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jgdy_tj 机构调研-统计

东方财富网-数据中心-特色数据-机构调研-机构调研统计

### 用法

`jgdy_tj [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20180928&quot;; 开始查询的时间 | string |   true   | 20180928 |        |

### 命令示例

`jgdy_tj`
<IStockShellDemo cmd='jgdy_tj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jgdy_xx 机构调研-详细

东方财富网-数据中心-特色数据-机构调研-机构调研详细

### 用法

`jgdy_xx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20241211&quot;; 开始查询的时间 | string |   true   | 20241211 |        |

### 命令示例

`jgdy_xx`
<IStockShellDemo cmd='jgdy_xx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zyjs_ths 主营介绍-同花顺

同花顺-主营介绍

### 用法

`zyjs_ths [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;000066&quot; | string |   true   | 000066 |        |

### 命令示例

`zyjs_ths`
<IStockShellDemo cmd='zyjs_ths' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zygc_dc 主营构成-东财

东方财富网-个股-主营构成

### 用法

`zygc_dc [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SH688041&quot; | string |   true   | SH688041 |        |

### 命令示例

`zygc_dc`
<IStockShellDemo cmd='zygc_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gqzyscgk 股权质押市场概况

东方财富网-数据中心-特色数据-股权质押-股权质押市场概况

### 用法

`gqzyscgk`

### 命令示例

`gqzyscgk`
<IStockShellDemo cmd='gqzyscgk' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ssgszybl 上市公司质押比例

东方财富网-数据中心-特色数据-股权质押-上市公司质押比例

### 用法

`ssgszybl [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                             |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :----------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240906&quot;; 请访问 http://data.eastmoney.com/gpzy/pledgeRatio.aspx 查询具体交易日 | string |   true   | 20240906 |        |

### 命令示例

`ssgszybl`
<IStockShellDemo cmd='ssgszybl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zygdgqzymx 重要股东股权质押明细

东方财富网-数据中心-特色数据-股权质押-重要股东股权质押明细

### 用法

`zygdgqzymx`

### 命令示例

`zygdgqzymx`
<IStockShellDemo cmd='zygdgqzymx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zyjgfbtj_zqgs 质押机构分布统计-证券公司

东方财富网-数据中心-特色数据-股权质押-质押机构分布统计-证券公司

### 用法

`zyjgfbtj_zqgs`

### 命令示例

`zyjgfbtj_zqgs`
<IStockShellDemo cmd='zyjgfbtj_zqgs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zyjgfbtj_yh 质押机构分布统计-银行

东方财富网-数据中心-特色数据-股权质押-质押机构分布统计-银行

### 用法

`zyjgfbtj_yh`

### 命令示例

`zyjgfbtj_yh`
<IStockShellDemo cmd='zyjgfbtj_yh' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ssgszybl 上市公司质押比例

东方财富网-数据中心-特色数据-股权质押-上市公司质押比例-行业数据

### 用法

`ssgszybl`

### 命令示例

`ssgszybl`
<IStockShellDemo cmd='ssgszybl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## agsyscgk A股商誉市场概况

东方财富网-数据中心-特色数据-商誉-A股商誉市场概况

### 用法

`agsyscgk`

### 命令示例

`agsyscgk`
<IStockShellDemo cmd='agsyscgk' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## syjzyqmx 商誉减值预期明细

东方财富网-数据中心-特色数据-商誉-商誉减值预期明细

### 用法

`syjzyqmx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20221231&quot;; 参见网页选项 | string |   true   | 20221231 |        |

### 命令示例

`syjzyqmx`
<IStockShellDemo cmd='syjzyqmx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggsyjzmx 个股商誉减值明细

东方财富网-数据中心-特色数据-商誉-个股商誉减值明细

### 用法

`ggsyjzmx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20230331&quot;; 参见网页选项 | string |   true   | 20230331 |        |

### 命令示例

`ggsyjzmx`
<IStockShellDemo cmd='ggsyjzmx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggsymx 个股商誉明细

东方财富网-数据中心-特色数据-商誉-个股商誉明细

### 用法

`ggsymx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240630&quot;; 参见网页选项 | string |   true   | 20240630 |        |

### 命令示例

`ggsymx`
<IStockShellDemo cmd='ggsymx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hysy 行业商誉

东方财富网-数据中心-特色数据-商誉-行业商誉

### 用法

`hysy [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240930&quot;; 参见网页选项 | string |   true   | 20240930 |        |

### 命令示例

`hysy`
<IStockShellDemo cmd='hysy' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gpzhtjyd 股票账户统计月度

东方财富网-数据中心-特色数据-股票账户统计

### 用法

`gpzhtjyd`

### 命令示例

`gpzhtjyd`
<IStockShellDemo cmd='gpzhtjyd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fxszspx 分析师指数排行

东方财富网-数据中心-研究报告-东方财富分析师指数

### 用法

`fxszspx [-year [year]]`

### 选项

|    选项参数     | 名称 | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------: | :--: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-year，--year` | year | year=&#39;2024&#39;; 从 2013 年至今 | string |   true   |  2024  |        |

### 命令示例

`fxszspx`
<IStockShellDemo cmd='fxszspx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fxsxq 分析师详情

东方财富网-数据中心-研究报告-东方财富分析师指数-分析师详情

### 用法

`fxsxq [-analyst_id [analyst_id]] [-indicator [indicator]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                     |  类型  | 是否可选 |     默认值     | 可选值 |
| :-------------------------: | :--------: | :--------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------------: | :----: |
| `-analyst_id，--analyst_id` | analyst_id | analyst_id=&quot;11000257131&quot;; 分析师ID, 从 ak.stock_analyst_rank_em() 获取                                                         | string |   true   |  11000257131   |        |
|  `-indicator，--indicator`  | indicator  | indicator=&quot;最新跟踪成分股&quot;; 从 &#123;&quot;最新跟踪成分股&quot;, &quot;历史跟踪成分股&quot;, &quot;历史指数&quot;&#125; 中选择 | string |   true   | 最新跟踪成分股 |        |

### 命令示例

`fxsxq`
<IStockShellDemo cmd='fxsxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qgqp 千股千评

东方财富网-数据中心-特色数据-千股千评

### 用法

`qgqp`

### 命令示例

`qgqp`
<IStockShellDemo cmd='qgqp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jgcyd 机构参与度

东方财富网-数据中心-特色数据-千股千评-主力控盘-机构参与度

### 用法

`jgcyd [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600000&quot; | string |   true   | 600000 |        |

### 命令示例

`jgcyd`
<IStockShellDemo cmd='jgcyd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lspf 历史评分

东方财富网-数据中心-特色数据-千股千评-综合评价-历史评分

### 用法

`lspf [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600000&quot; | string |   true   | 600000 |        |

### 命令示例

`lspf`
<IStockShellDemo cmd='lspf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yhgzzs 用户关注指数

东方财富网-数据中心-特色数据-千股千评-市场热度-用户关注指数

### 用法

`yhgzzs [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600000&quot; | string |   true   | 600000 |        |

### 命令示例

`yhgzzs`
<IStockShellDemo cmd='yhgzzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sccyyy 市场参与意愿

东方财富网-数据中心-特色数据-千股千评-市场热度-市场参与意愿

### 用法

`sccyyy [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600000&quot; | string |   true   | 600000 |        |

### 命令示例

`sccyyy`
<IStockShellDemo cmd='sccyyy' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rdsccyyy 日度市场参与意愿

东方财富网-数据中心-特色数据-千股千评-市场热度-日度市场参与意愿

### 用法

`rdsccyyy [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600000&quot; | string |   true   | 600000 |        |

### 命令示例

`rdsccyyy`
<IStockShellDemo cmd='rdsccyyy' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hsgtzjlx 沪深港通资金流向

东方财富网-数据中心-资金流向-沪深港通资金流向

### 用法

`hsgtzjlx`

### 命令示例

`hsgtzjlx`
<IStockShellDemo cmd='hsgtzjlx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jshl_sgt 结算汇率-深港通

深港通-港股通业务信息-结算汇率

### 用法

`jshl_sgt`

### 命令示例

`jshl_sgt`
<IStockShellDemo cmd='jshl_sgt' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jshl_hgt 结算汇率-沪港通

沪港通-港股通信息披露-结算汇兑

### 用法

`jshl_hgt`

### 命令示例

`jshl_hgt`
<IStockShellDemo cmd='jshl_hgt' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ckhl_sgt 参考汇率-深港通

深港通-港股通业务信息-参考汇率

### 用法

`ckhl_sgt`

### 命令示例

`ckhl_sgt`
<IStockShellDemo cmd='ckhl_sgt' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ckhl_hgt 参考汇率-沪港通

沪港通-港股通信息披露-参考汇率

### 用法

`ckhl_hgt`

### 命令示例

`ckhl_hgt`
<IStockShellDemo cmd='ckhl_hgt' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggtcfg 港股通成份股

东方财富网-行情中心-港股市场-港股通成份股

### 用法

`ggtcfg`

### 命令示例

`ggtcfg`
<IStockShellDemo cmd='ggtcfg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hsgtfssj 沪深港通分时数据

东方财富-数据中心-沪深港通-市场概括-分时数据

### 用法

`hsgtfssj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                          |  类型  | 是否可选 |  默认值  |      可选值       |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;北向资金&quot;; choice of &#123;&quot;北向资金&quot;, &quot;南向资金&quot;&#125; | string |   true   | 北向资金 | 北向资金,南向资金 |

### 命令示例

`hsgtfssj`
<IStockShellDemo cmd='hsgtfssj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## bkpx 板块排行

东方财富网-数据中心-沪深港通持股-板块排行

### 用法

`bkpx [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                                                |  类型  | 是否可选 |          默认值          |                                   可选值                                   |
| :-----------------------: | :-------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----------------------: | :------------------------------------------------------------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;北向资金增持行业板块排行&quot;; choice of &#123;&quot;北向资金增持行业板块排行&quot;, &quot;北向资金增持概念板块排行&quot;, &quot;北向资金增持地域板块排行&quot;&#125; | string |   true   | 北向资金增持行业板块排行 | 北向资金增持行业板块排行,北向资金增持概念板块排行,北向资金增持地域板块排行 |
| `-indicator，--indicator` | indicator | indicator=&quot;今日&quot;; choice of &#123;&quot;今日&quot;, &quot;3日&quot;, &quot;5日&quot;, &quot;10日&quot;, &quot;1月&quot;, &quot;1季&quot;, &quot;1年&quot;&#125;           | string |   true   |           今日           |                       今日,3日,5日,10日,1月,1季,1年                        |

### 命令示例

`bkpx`
<IStockShellDemo cmd='bkpx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggpx 个股排行

东方财富网-数据中心-沪深港通持股-个股排行

### 用法

`ggpx [-market [market]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                                                                 |  类型  | 是否可选 | 默认值 |                         可选值                         |
| :-----------------------: | :-------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----------------------------------------------------: |
|    `-market，--market`    |  market   | market=&quot;沪股通&quot;; choice of &#123;&quot;北向&quot;, &quot;沪股通&quot;, &quot;深股通&quot;&#125;                                                                                            | string |   true   | 沪股通 |                   北向,沪股通,深股通                   |
| `-indicator，--indicator` | indicator | indicator=&quot;沪股通&quot;; choice of &#123;&quot;今日排行&quot;, &quot;3日排行&quot;, &quot;5日排行&quot;, &quot;10日排行&quot;, &quot;月排行&quot;, &quot;季排行&quot;, &quot;年排行&quot;&#125; | string |   true   | 沪股通 | 今日排行,3日排行,5日排行,10日排行,月排行,季排行,年排行 |

### 命令示例

`ggpx`
<IStockShellDemo cmd='ggpx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## mrggtj 每日个股统计

东方财富网-数据中心-沪深港通-沪深港通持股-每日个股统计

### 用法

`mrggtj [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                          |  类型  | 是否可选 |  默认值  |                 可选值                  |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-------------------------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;北向持股&quot;; choice of &#123;&quot;北向持股&quot;, &quot;沪股通持股&quot;, &quot;深股通持股&quot;, &quot;南向持股&quot;&#125; | string |   true   | 北向持股 | 北向持股,沪股通持股,深股通持股,南向持股 |
| `-start_date，--start_date` | start_date | start_date=&quot;20210601&quot;; 此处指定近期交易日                                                                                           | string |   true   | 20210601 |                                         |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20210608&quot;; 此处指定近期交易日                                                                                             | string |   true   | 20210608 |                                         |

### 命令示例

`mrggtj`
<IStockShellDemo cmd='mrggtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jgpx 机构排行

东方财富网-数据中心-沪深港通-沪深港通持股-机构排行

### 用法

`jgpx [-market [market]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                          |  类型  | 是否可选 |  默认值  |                 可选值                  |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-------------------------------------: |
|     `-market，--market`     |   market   | market=&quot;北向持股&quot;; choice of &#123;&quot;北向持股&quot;, &quot;沪股通持股&quot;, &quot;深股通持股&quot;, &quot;南向持股&quot;&#125; | string |   true   | 北向持股 | 北向持股,沪股通持股,深股通持股,南向持股 |
| `-start_date，--start_date` | start_date | start_date=&quot;20201218&quot;; 此处指定近期交易日                                                                                           | string |   true   | 20201218 |                                         |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20201218&quot;; 此处指定近期交易日                                                                                             | string |   true   | 20201218 |                                         |

### 命令示例

`jgpx`
<IStockShellDemo cmd='jgpx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hsgt_ggt_h>gsshq 沪深港通-港股通(沪>港)实时行情

东方财富网-行情中心-沪深港通-港股通(沪>港)-股票；按股票代码排序

### 用法

`hsgt_ggt_h>gsshq`

### 命令示例

`hsgt_ggt_h>gsshq`
<IStockShellDemo cmd='hsgt_ggt_h>gsshq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hsgtlssj 沪深港通历史数据

东方财富网-数据中心-资金流向-沪深港通资金流向-沪深港通历史数据

### 用法

`hsgtlssj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                              |  类型  | 是否可选 |  默认值  |                      可选值                       |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-----------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;北向资金&quot;; choice of &#123;&quot;北向资金&quot;, &quot;沪股通&quot;, &quot;深股通&quot;, &quot;南向资金&quot;, &quot;港股通沪&quot;, &quot;港股通深&quot;&#125; | string |   true   | 北向资金 | 北向资金,沪股通,深股通,南向资金,港股通沪,港股通深 |

### 命令示例

`hsgtlssj`
<IStockShellDemo cmd='hsgtlssj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hsgtcg_gg 沪深港通持股-个股

东方财富网-数据中心-沪深港通-沪深港通持股-具体股票

### 用法

`hsgtcg_gg [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                     |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :--------------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;002008&quot;; 支持港股和A股 | string |   true   | 002008 |        |

### 命令示例

`hsgtcg_gg`
<IStockShellDemo cmd='hsgtcg_gg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hsgtcg_ggxq 沪深港通持股-个股详情

东方财富网-数据中心-沪深港通-沪深港通持股-具体股票-个股详情

### 用法

`hsgtcg_ggxq [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :---------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;002008&quot;                                                     | string |   true   |  002008  |        |
| `-start_date，--start_date` | start_date | start_date=&quot;20210830&quot;; 注意只能返回离最近交易日 90 个交易日内的数据 | string |   true   | 20210830 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20211026&quot;; 注意只能返回离最近交易日 90 个交易日内的数据   | string |   true   | 20211026 |        |

### 命令示例

`hsgtcg_ggxq`
<IStockShellDemo cmd='hsgtcg_ggxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## tfpxx 停复牌信息

东方财富网-数据中心-特色数据-停复牌信息

### 用法

`tfpxx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :------------------------ | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240426&quot; | string |   true   | 20240426 |        |

### 命令示例

`tfpxx`
<IStockShellDemo cmd='tfpxx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## tfp 停复牌

百度股市通-交易提醒-停复牌

### 用法

`tfp [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :------------------------ | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20241107&quot; | string |   true   | 20241107 |        |

### 命令示例

`tfp`
<IStockShellDemo cmd='tfp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fhpx 分红派息

百度股市通-交易提醒-分红派息

### 用法

`fhpx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :------------------------ | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20241107&quot; | string |   true   | 20241107 |        |

### 命令示例

`fhpx`
<IStockShellDemo cmd='fhpx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggxw 个股新闻

东方财富指定个股的新闻资讯数据

### 用法

`ggxw [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                            |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;603777&quot;; 股票代码或其他关键词 | string |   true   | 603777 |        |

### 命令示例

`ggxw`
<IStockShellDemo cmd='ggxw' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cjnrjx 财经内容精选

财新网-财新数据通-内容精选

### 用法

`cjnrjx`

### 命令示例

`cjnrjx`
<IStockShellDemo cmd='cjnrjx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cbfx 财报发行

百度股市通-财报发行

### 用法

`cbfx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :------------------------ | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20241107&quot; | string |   true   | 20241107 |        |

### 命令示例

`cbfx`
<IStockShellDemo cmd='cbfx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dxsyl 打新收益率

东方财富网-数据中心-新股申购-打新收益率

### 用法

`dxsyl`

### 命令示例

`dxsyl`
<IStockShellDemo cmd='dxsyl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xgsgyzq 新股申购与中签

东方财富网-数据中心-新股数据-新股申购-新股申购与中签查询

### 用法

`xgsgyzq [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                            |  类型  | 是否可选 |  默认值  |                     可选值                      |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :------: | :---------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;全部股票&quot;; choice of &#123;&quot;全部股票&quot;, &quot;沪市主板&quot;, &quot;科创板&quot;, &quot;深市主板&quot;, &quot;创业板&quot;, &quot;北交所&quot;&#125; | string |   true   | 全部股票 | 全部股票,沪市主板,科创板,深市主板,创业板,北交所 |

### 命令示例

`xgsgyzq`
<IStockShellDemo cmd='xgsgyzq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yjbb 业绩报表

东方财富-数据中心-年报季报-业绩报表

### 用法

`yjbb [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                                                                                      |  类型  | 是否可选 |  默认值  |               可选值                |
| :-------------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------------------------: |
| `-date，--date` | date | date=&quot;20200331&quot;; choice of &#123;&quot;XXXX0331&quot;, &quot;XXXX0630&quot;, &quot;XXXX0930&quot;, &quot;XXXX1231&quot;&#125;; 从 20100331 开始 | string |   true   | 20200331 | XXXX0331,XXXX0630,XXXX0930,XXXX1231 |

### 命令示例

`yjbb`
<IStockShellDemo cmd='yjbb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yjkb 业绩快报

东方财富-数据中心-年报季报-业绩快报

### 用法

`yjkb [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                                                                                      |  类型  | 是否可选 |  默认值  |               可选值                |
| :-------------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------------------------: |
| `-date，--date` | date | date=&quot;20200331&quot;; choice of &#123;&quot;XXXX0331&quot;, &quot;XXXX0630&quot;, &quot;XXXX0930&quot;, &quot;XXXX1231&quot;&#125;; 从 20100331 开始 | string |   true   | 20200331 | XXXX0331,XXXX0630,XXXX0930,XXXX1231 |

### 命令示例

`yjkb`
<IStockShellDemo cmd='yjkb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yjyg 业绩预告

东方财富-数据中心-年报季报-业绩预告

### 用法

`yjyg [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                                                                                      |  类型  | 是否可选 |  默认值  |               可选值                |
| :-------------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------------------------: |
| `-date，--date` | date | date=&quot;20200331&quot;; choice of &#123;&quot;XXXX0331&quot;, &quot;XXXX0630&quot;, &quot;XXXX0930&quot;, &quot;XXXX1231&quot;&#125;; 从 20081231 开始 | string |   true   | 20200331 | XXXX0331,XXXX0630,XXXX0930,XXXX1231 |

### 命令示例

`yjyg`
<IStockShellDemo cmd='yjyg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yyplsj_dfcf 预约披露时间-东方财富

东方财富-数据中心-年报季报-预约披露时间

### 用法

`yyplsj_dfcf [-symbol [symbol]] [-date [date]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                             |  类型  | 是否可选 |  默认值  |                       可选值                       |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;沪深A股&quot;; choice of &#123;&#39;沪深A股&#39;, &#39;沪市A股&#39;, &#39;科创板&#39;, &#39;深市A股&#39;, &#39;创业板&#39;, &#39;京市A股&#39;, &#39;ST板&#39;&#125; | string |   true   | 沪深A股  | 沪深A股,沪市A股,科创板,深市A股,创业板,京市A股,ST板 |
|   `-date，--date`   |  date  | date=&quot;20200331&quot;; choice of &#123;&quot;XXXX0331&quot;, &quot;XXXX0630&quot;, &quot;XXXX0930&quot;, &quot;XXXX1231&quot;&#125;; 从 20081231 开始                        | string |   true   | 20200331 |        XXXX0331,XXXX0630,XXXX0930,XXXX1231         |

### 命令示例

`yyplsj_dfcf`
<IStockShellDemo cmd='yyplsj_dfcf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yyplsj_jczx 预约披露时间-巨潮资讯

巨潮资讯-数据-预约披露的数据

### 用法

`yyplsj_jczx [-market [market]] [-period [period]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                                        |  类型  | 是否可选 |  默认值  |                       可选值                        |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-------------------------------------------------: |
| `-market，--market` | market | market=&quot;沪深京&quot;; choice of &#123;&quot;沪深京&quot;, &quot;深市&quot;, &quot;深主板&quot;, &quot;创业板&quot;, &quot;沪市&quot;, &quot;沪主板&quot;, &quot;科创板&quot;, &quot;北交所&quot;&#125; | string |   true   |  沪深京  | 沪深京,深市,深主板,创业板,沪市,沪主板,科创板,北交所 |
| `-period，--period` | period | period=&quot;2021年报&quot;; 近四期的财务报告; e.g., choice of &#123;&quot;2021一季&quot;, &quot;2021半年报&quot;, &quot;2021三季&quot;, &quot;2021年报&quot;&#125;                                         | string |   true   | 2021年报 |        2021一季,2021半年报,2021三季,2021年报        |

### 命令示例

`yyplsj_jczx`
<IStockShellDemo cmd='yyplsj_jczx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xxplgg_jczx 信息披露公告-巨潮资讯

巨潮资讯-首页-公告查询-信息披露公告-沪深京

### 用法

`xxplgg_jczx [-symbol [symbol]] [-market [market]] [-keyword <keyword>] [-category <category>] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |  类型  | 是否可选 |  默认值  |                                                                                                     可选值                                                                                                      |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;000001&quot;; 股票代码                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | string |   true   |  000001  |                                                                                                                                                                                                                 |
|     `-market，--market`     |   market   | market=&quot;沪深京&quot;; choice of &#123;&quot;沪深京&quot;, &quot;港股&quot;, &quot;三板&quot;, &quot;基金&quot;, &quot;债券&quot;, &quot;监管&quot;, &quot;预披露&quot;&#125;                                                                                                                                                                                                                                                                                                                                                                         | string |   true   |  沪深京  |                                                                                     沪深京,港股,三板,基金,债券,监管,预披露                                                                                      |
|    `-keyword，--keyword`    |  keyword   | keyword=&quot;&quot;; 关键词                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | string |   true   |          |                                                                                                                                                                                                                 |
|   `-category，--category`   |  category  | category=&quot;&quot;; choice of &#123;&#39;年报&#39;, &#39;半年报&#39;, &#39;一季报&#39;, &#39;三季报&#39;, &#39;业绩预告&#39;, &#39;权益分派&#39;, &#39;董事会&#39;, &#39;监事会&#39;, &#39;股东大会&#39;, &#39;日常经营&#39;, &#39;公司治理&#39;, &#39;中介报告&#39;, &#39;首发&#39;, &#39;增发&#39;, &#39;股权激励&#39;, &#39;配股&#39;, &#39;解禁&#39;, &#39;公司债&#39;, &#39;可转债&#39;, &#39;其他融资&#39;, &#39;股权变动&#39;, &#39;补充更正&#39;, &#39;澄清致歉&#39;, &#39;风险提示&#39;, &#39;特别处理和退市&#39;, &#39;退市整理期&#39;&#125; | string |   true   |          | 年报,半年报,一季报,三季报,业绩预告,权益分派,董事会,监事会,股东大会,日常经营,公司治理,中介报告,首发,增发,股权激励,配股,解禁,公司债,可转债,其他融资,股权变动,补充更正,澄清致歉,风险提示,特别处理和退市,退市整理期 |
| `-start_date，--start_date` | start_date | start_date=&quot;20230618&quot;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | string |   true   | 20230618 |                                                                                                                                                                                                                 |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20231219&quot;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | string |   true   | 20231219 |                                                                                                                                                                                                                 |

### 命令示例

`xxplgg_jczx`
<IStockShellDemo cmd='xxplgg_jczx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xxpldy_jczx 信息披露调研-巨潮资讯

巨潮资讯-首页-公告查询-信息披露调研-沪深京

### 用法

`xxpldy_jczx [-symbol [symbol]] [-market [market]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                                                              |  类型  | 是否可选 |  默认值  |                 可选值                 |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :------------------------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;000001&quot;; 股票代码                                                                                                                                               | string |   true   |  000001  |                                        |
|     `-market，--market`     |   market   | market=&quot;沪深京&quot;; choice of &#123;&quot;沪深京&quot;, &quot;港股&quot;, &quot;三板&quot;, &quot;基金&quot;, &quot;债券&quot;, &quot;监管&quot;, &quot;预披露&quot;&#125; | string |   true   |  沪深京  | 沪深京,港股,三板,基金,债券,监管,预披露 |
| `-start_date，--start_date` | start_date | start_date=&quot;20230618&quot;                                                                                                                                                   | string |   true   | 20230618 |                                        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20231219&quot;                                                                                                                                                     | string |   true   | 20231219 |                                        |

### 命令示例

`xxpldy_jczx`
<IStockShellDemo cmd='xxpldy_jczx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hyflsj_jczx 行业分类数据-巨潮资讯

巨潮资讯-数据-行业分类数据

### 用法

`hyflsj_jczx [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                                                                                                                                                |  类型  | 是否可选 |      默认值      |                                                                      可选值                                                                       |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :--------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;巨潮行业分类标准&quot;; choice of &#123;&quot;证监会行业分类标准&quot;, &quot;巨潮行业分类标准&quot;, &quot;申银万国行业分类标准&quot;, &quot;新财富行业分类标准&quot;, &quot;国资委行业分类标准&quot;, &quot;巨潮产业细分标准&quot;, &quot;天相行业分类标准&quot;, &quot;全球行业分类标准&quot;&#125; | string |   true   | 巨潮行业分类标准 | 证监会行业分类标准,巨潮行业分类标准,申银万国行业分类标准,新财富行业分类标准,国资委行业分类标准,巨潮产业细分标准,天相行业分类标准,全球行业分类标准 |

### 命令示例

`hyflsj_jczx`
<IStockShellDemo cmd='hyflsj_jczx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ssgshygsdbdqk_jczx 上市公司行业归属的变动情况-巨潮资讯

巨潮资讯-数据-上市公司行业归属的变动情况

### 用法

`ssgshygsdbdqk_jczx [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;002594&quot;       | string |   true   |  002594  |        |
| `-start_date，--start_date` | start_date | start_date=&quot;20091227&quot; | string |   true   | 20091227 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20220708&quot;   | string |   true   | 20220708 |        |

### 命令示例

`ssgshygsdbdqk_jczx`
<IStockShellDemo cmd='ssgshygsdbdqk_jczx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gsgbbd_jczx 公司股本变动-巨潮资讯

巨潮资讯-数据-公司股本变动

### 用法

`gsgbbd_jczx [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;002594&quot;       | string |   true   |  002594  |        |
| `-start_date，--start_date` | start_date | start_date=&quot;20091227&quot; | string |   true   | 20091227 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20241021&quot;   | string |   true   | 20241021 |        |

### 命令示例

`gsgbbd_jczx`
<IStockShellDemo cmd='gsgbbd_jczx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## pgssfa_jczx 配股实施方案-巨潮资讯

巨潮资讯-个股-配股实施方案

### 用法

`pgssfa_jczx [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;600030&quot;       | string |   true   |  600030  |        |
| `-start_date，--start_date` | start_date | start_date=&quot;19700101&quot; | string |   true   | 19700101 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;22220222&quot;   | string |   true   | 22220222 |        |

### 命令示例

`pgssfa_jczx`
<IStockShellDemo cmd='pgssfa_jczx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gsgk_jczx 公司概况-巨潮资讯

巨潮资讯-个股-公司概况

### 用法

`gsgk_jczx [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600030&quot; | string |   true   | 600030 |        |

### 命令示例

`gsgk_jczx`
<IStockShellDemo cmd='gsgk_jczx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ssxg_jczx 上市相关-巨潮资讯

巨潮资讯-个股-上市相关

### 用法

`ssxg_jczx [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600030&quot; | string |   true   | 600030 |        |

### 命令示例

`ssxg_jczx`
<IStockShellDemo cmd='ssxg_jczx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zcfzb_hs 资产负债表-沪深

东方财富-数据中心-年报季报-业绩快报-资产负债表

### 用法

`zcfzb_hs [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                                                                                      |  类型  | 是否可选 |  默认值  |               可选值                |
| :-------------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------------------------: |
| `-date，--date` | date | date=&quot;20240331&quot;; choice of &#123;&quot;XXXX0331&quot;, &quot;XXXX0630&quot;, &quot;XXXX0930&quot;, &quot;XXXX1231&quot;&#125;; 从 20081231 开始 | string |   true   | 20240331 | XXXX0331,XXXX0630,XXXX0930,XXXX1231 |

### 命令示例

`zcfzb_hs`
<IStockShellDemo cmd='zcfzb_hs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zcfzb_bjs 资产负债表-北交所

东方财富-数据中心-年报季报-业绩快报-资产负债表

### 用法

`zcfzb_bjs [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                                                                                      |  类型  | 是否可选 |  默认值  |               可选值                |
| :-------------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------------------------: |
| `-date，--date` | date | date=&quot;20240331&quot;; choice of &#123;&quot;XXXX0331&quot;, &quot;XXXX0630&quot;, &quot;XXXX0930&quot;, &quot;XXXX1231&quot;&#125;; 从 20081231 开始 | string |   true   | 20240331 | XXXX0331,XXXX0630,XXXX0930,XXXX1231 |

### 命令示例

`zcfzb_bjs`
<IStockShellDemo cmd='zcfzb_bjs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lrb 利润表

东方财富-数据中心-年报季报-业绩快报-利润表

### 用法

`lrb [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                                                                                      |  类型  | 是否可选 |  默认值  |               可选值                |
| :-------------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------------------------: |
| `-date，--date` | date | date=&quot;20240331&quot;; choice of &#123;&quot;XXXX0331&quot;, &quot;XXXX0630&quot;, &quot;XXXX0930&quot;, &quot;XXXX1231&quot;&#125;; 从 20120331 开始 | string |   true   | 20240331 | XXXX0331,XXXX0630,XXXX0930,XXXX1231 |

### 命令示例

`lrb`
<IStockShellDemo cmd='lrb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xjllb 现金流量表

东方财富-数据中心-年报季报-业绩快报-现金流量表

### 用法

`xjllb [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                                                                                      |  类型  | 是否可选 |  默认值  |               可选值                |
| :-------------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------------------------: |
| `-date，--date` | date | date=&quot;20200331&quot;; choice of &#123;&quot;XXXX0331&quot;, &quot;XXXX0630&quot;, &quot;XXXX0930&quot;, &quot;XXXX1231&quot;&#125;; 从 20081231 开始 | string |   true   | 20200331 | XXXX0331,XXXX0630,XXXX0930,XXXX1231 |

### 命令示例

`xjllb`
<IStockShellDemo cmd='xjllb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdzjc 股东增减持

东方财富网-数据中心-特色数据-高管持股

### 用法

`gdzjc [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                        |  类型  | 是否可选 | 默认值 |         可选值         |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :--------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;全部&quot;; choice of &#123;&quot;全部&quot;, &quot;股东增持&quot;, &quot;股东减持&quot;&#125; | string |   true   |  全部  | 全部,股东增持,股东减持 |

### 命令示例

`gdzjc`
<IStockShellDemo cmd='gdzjc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fhps_dc 分红配送-东财

东方财富-数据中心-年报季报-分红配送

### 用法

`fhps_dc [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                                          |  类型  | 是否可选 |  默认值  |      可选值       |
| :-------------: | :--: | :------------------------------------------------------------------------------------------------------------ | :----: | :------: | :------: | :---------------: |
| `-date，--date` | date | date=&quot;20231231&quot;; choice of &#123;&quot;XXXX0630&quot;, &quot;XXXX1231&quot;&#125;; 从 19901231 开始 | string |   true   | 20231231 | XXXX0630,XXXX1231 |

### 命令示例

`fhps_dc`
<IStockShellDemo cmd='fhps_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fhpsxq_dc 分红配送详情-东财

东方财富网-数据中心-分红送配-分红送配详情

### 用法

`fhpsxq_dc [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;300073&quot; | string |   true   | 300073 |        |

### 命令示例

`fhpsxq_dc`
<IStockShellDemo cmd='fhpsxq_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fhqk_ths 分红情况-同花顺

同花顺-分红情况

### 用法

`fhqk_ths [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                        |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;603444&quot;; 兼容 A 股和 B 股 | string |   true   | 603444 |        |

### 命令示例

`fhqk_ths`
<IStockShellDemo cmd='fhqk_ths' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fhpsxq_gg_ths 分红配送详情-港股-同花顺

同花顺-港股-分红派息

### 用法

`fhpsxq_gg_ths [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                              |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :-------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;0700&quot;; 港股代码 | string |   true   |  0700  |        |

### 命令示例

`fhpsxq_gg_ths`
<IStockShellDemo cmd='fhpsxq_gg_ths' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggzjl 个股资金流

同花顺-数据中心-资金流向-个股资金流

### 用法

`ggzjl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                        |  类型  | 是否可选 | 默认值 |                  可选值                  |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :--------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;即时&quot;; choice of &#123;“即时”, &quot;3日排行&quot;, &quot;5日排行&quot;, &quot;10日排行&quot;, &quot;20日排行&quot;&#125; | string |   true   |  即时  | “即时”,3日排行,5日排行,10日排行,20日排行 |

### 命令示例

`ggzjl`
<IStockShellDemo cmd='ggzjl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gnzjl 概念资金流

同花顺-数据中心-资金流向-概念资金流

### 用法

`gnzjl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                        |  类型  | 是否可选 | 默认值 |                  可选值                  |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :--------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;即时&quot;; choice of &#123;“即时”, &quot;3日排行&quot;, &quot;5日排行&quot;, &quot;10日排行&quot;, &quot;20日排行&quot;&#125; | string |   true   |  即时  | “即时”,3日排行,5日排行,10日排行,20日排行 |

### 命令示例

`gnzjl`
<IStockShellDemo cmd='gnzjl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hyzjl 行业资金流

同花顺-数据中心-资金流向-行业资金流

### 用法

`hyzjl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                        |  类型  | 是否可选 | 默认值 |                  可选值                  |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :--------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;即时&quot;; choice of &#123;“即时”, &quot;3日排行&quot;, &quot;5日排行&quot;, &quot;10日排行&quot;, &quot;20日排行&quot;&#125; | string |   true   |  即时  | “即时”,3日排行,5日排行,10日排行,20日排行 |

### 命令示例

`hyzjl`
<IStockShellDemo cmd='hyzjl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ddzz 大单追踪

同花顺-数据中心-资金流向-大单追踪

### 用法

`ddzz`

### 命令示例

`ddzz`
<IStockShellDemo cmd='ddzz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggzjl 个股资金流

东方财富网-数据中心-个股资金流向

### 用法

`ggzjl [-stock [stock]] [-market [market]]`

### 选项

|      选项参数       |  名称  | 描述                                                                              |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :-------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
|  `-stock，--stock`  | stock  | stock=&quot;000425&quot;; 股票代码                                                | string |   true   | 000425 |        |
| `-market，--market` | market | market=&quot;sh&quot;; 上海证券交易所: sh, 深证证券交易所: sz, 北京证券交易所: bj | string |   true   |   sh   |        |

### 命令示例

`ggzjl`
<IStockShellDemo cmd='ggzjl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggzjlpm 个股资金流排名

东方财富网-数据中心-资金流向-排名

### 用法

`ggzjlpm [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :----: |
| `-indicator，--indicator` | indicator | indicator=&quot;今日&quot;; choice &#123;&quot;今日&quot;, &quot;3日&quot;, &quot;5日&quot;, &quot;10日&quot;&#125; | string |   true   |  今日  |        |

### 命令示例

`ggzjlpm`
<IStockShellDemo cmd='ggzjlpm' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dpzjl 大盘资金流

东方财富网-数据中心-资金流向-大盘

### 用法

`dpzjl`

### 命令示例

`dpzjl`
<IStockShellDemo cmd='dpzjl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## bkzjlpm 板块资金流排名

东方财富网-数据中心-资金流向-板块资金流-排名

### 用法

`bkzjlpm [-indicator [indicator]] [-sector_type [sector_type]]`

### 选项

|           选项参数            |    名称     | 描述                                                                                                                             |  类型  | 是否可选 |   默认值   |              可选值              |
| :---------------------------: | :---------: | :------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :--------: | :------------------------------: |
|   `-indicator，--indicator`   |  indicator  | indicator=&quot;今日&quot;; choice of &#123;&quot;今日&quot;, &quot;5日&quot;, &quot;10日&quot;&#125;                            | string |   true   |    今日    |          今日,5日,10日           |
| `-sector_type，--sector_type` | sector_type | sector_type=&quot;行业资金流&quot;; choice of &#123;&quot;行业资金流&quot;, &quot;概念资金流&quot;, &quot;地域资金流&quot;&#125; | string |   true   | 行业资金流 | 行业资金流,概念资金流,地域资金流 |

### 命令示例

`bkzjlpm`
<IStockShellDemo cmd='bkzjlpm' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zljlrpm 主力净流入排名

东方财富网-数据中心-资金流向-主力净流入排名

### 用法

`zljlrpm [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                                                     |  类型  | 是否可选 |  默认值  |                             可选值                             |
| :-----------------: | :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :------------------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;全部股票&quot;；choice of &#123;&quot;全部股票&quot;, &quot;沪深A股&quot;, &quot;沪市A股&quot;, &quot;科创板&quot;, &quot;深市A股&quot;, &quot;创业板&quot;, &quot;沪市B股&quot;, &quot;深市B股&quot;&#125; | string |   true   | 全部股票 | 全部股票,沪深A股,沪市A股,科创板,深市A股,创业板,沪市B股,深市B股 |

### 命令示例

`zljlrpm`
<IStockShellDemo cmd='zljlrpm' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hyggzjl 行业个股资金流

东方财富网-数据中心-资金流向-行业资金流-xx行业个股资金流

### 用法

`hyggzjl [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                  |  类型  | 是否可选 |  默认值  |    可选值     |
| :-----------------------: | :-------: | :---------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-----------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;电源设备&quot;                                                                           | string |   true   | 电源设备 |               |
| `-indicator，--indicator` | indicator | indicator=&quot;今日&quot;; choice of &#123;&quot;今日&quot;, &quot;5日&quot;, &quot;10日&quot;&#125; | string |   true   |   今日   | 今日,5日,10日 |

### 命令示例

`hyggzjl`
<IStockShellDemo cmd='hyggzjl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hylszjl 行业历史资金流

东方财富网-数据中心-资金流向-行业资金流-行业历史资金流

### 用法

`hylszjl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;汽车服务&quot; | string |   true   | 汽车服务 |        |

### 命令示例

`hylszjl`
<IStockShellDemo cmd='hylszjl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gnlszjl 概念历史资金流

东方财富网-数据中心-资金流向-概念资金流-概念历史资金流

### 用法

`gnlszjl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;数据要素&quot; | string |   true   | 数据要素 |        |

### 命令示例

`gnlszjl`
<IStockShellDemo cmd='gnlszjl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cmfb 筹码分布

东方财富网-概念板-行情中心-日K-筹码分布

### 用法

`cmfb [-symbol [symbol]] [-adjust <adjust>]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                  |  类型  | 是否可选 | 默认值 |  可选值  |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :------: |
| `-symbol，--symbol` | symbol | symbol=&quot;000001&quot;; 股票代码                                                                                                                   | string |   true   | 000001 |          |
| `-adjust，--adjust` | adjust | adjust=&quot;&quot;; choice of &#123;&quot;qfq&quot;: &quot;前复权&quot;, &quot;hfq&quot;: &quot;后复权&quot;, &quot;&quot;: &quot;不复权&quot;&#125; | string |   true   |        | ,qfq,hfq |

### 命令示例

`cmfb`
<IStockShellDemo cmd='cmfb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gddh 股东大会

东方财富网-数据中心-股东大会

### 用法

`gddh`

### 命令示例

`gddh`
<IStockShellDemo cmd='gddh' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zdht 重大合同

东方财富网-数据中心-重大合同-重大合同明细

### 用法

`zdht [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;20200819&quot; | string |   true   | 20200819 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20230819&quot;   | string |   true   | 20230819 |        |

### 命令示例

`zdht`
<IStockShellDemo cmd='zdht' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggyb 个股研报

东方财富网-数据中心-研究报告-个股研报

### 用法

`ggyb [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;000001&quot; | string |   true   | 000001 |        |

### 命令示例

`ggyb`
<IStockShellDemo cmd='ggyb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hsj_a_ggg 沪深京 A 股公告

东方财富网-数据中心-公告大全-沪深京 A 股公告

### 用法

`hsj_a_ggg [-symbol [symbol]] [-date [date]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                                                        |  类型  | 是否可选 |  默认值  |                               可选值                                |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-----------------------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&#39;财务报告&#39;; choice of &#123;&quot;全部&quot;, &quot;重大事项&quot;, &quot;财务报告&quot;, &quot;融资公告&quot;, &quot;风险提示&quot;, &quot;资产重组&quot;, &quot;信息变更&quot;, &quot;持股变动&quot;&#125; | string |   true   | 财务报告 | 全部,重大事项,财务报告,融资公告,风险提示,资产重组,信息变更,持股变动 |
|   `-date，--date`   |  date  | date=&quot;20220511&quot;; 指定日期                                                                                                                                                                                         | string |   true   | 20220511 |                                                                     |

### 命令示例

`hsj_a_ggg`
<IStockShellDemo cmd='hsj_a_ggg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cwbb_xl 财务报表-新浪

新浪财经-财务报表-三大报表

### 用法

`cwbb_xl [-stock [stock]] [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                    |  类型  | 是否可选 |   默认值   |            可选值            |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :--------: | :--------------------------: |
|  `-stock，--stock`  | stock  | stock=&quot;sh600600&quot;; 带市场标识的股票代码                                                                        | string |   true   |  sh600600  |                              |
| `-symbol，--symbol` | symbol | symbol=&quot;现金流量表&quot;; choice of &#123;&quot;资产负债表&quot;, &quot;利润表&quot;, &quot;现金流量表&quot;&#125; | string |   true   | 现金流量表 | 资产负债表,利润表,现金流量表 |

### 命令示例

`cwbb_xl`
<IStockShellDemo cmd='cwbb_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zcfzb_abgq 资产负债表-按报告期

东方财富-股票-财务分析-资产负债表-按报告期

### 用法

`zcfzb_abgq [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                  |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SH600519&quot;; 股票代码 | string |   true   | SH600519 |        |

### 命令示例

`zcfzb_abgq`
<IStockShellDemo cmd='zcfzb_abgq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zcfzb_and 资产负债表-按年度

东方财富-股票-财务分析-资产负债表-按年度

### 用法

`zcfzb_and [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                  |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SH600519&quot;; 股票代码 | string |   true   | SH600519 |        |

### 命令示例

`zcfzb_and`
<IStockShellDemo cmd='zcfzb_and' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lrb_abgq 利润表-按报告期

东方财富-股票-财务分析-利润表-报告期

### 用法

`lrb_abgq [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                  |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SH600519&quot;; 股票代码 | string |   true   | SH600519 |        |

### 命令示例

`lrb_abgq`
<IStockShellDemo cmd='lrb_abgq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lrb_and 利润表-按年度

东方财富-股票-财务分析-利润表-按年度

### 用法

`lrb_and [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                  |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SH600519&quot;; 股票代码 | string |   true   | SH600519 |        |

### 命令示例

`lrb_and`
<IStockShellDemo cmd='lrb_and' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lrb_adjd 利润表-按单季度

东方财富-股票-财务分析-利润表-按单季度

### 用法

`lrb_adjd [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                  |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SH600519&quot;; 股票代码 | string |   true   | SH600519 |        |

### 命令示例

`lrb_adjd`
<IStockShellDemo cmd='lrb_adjd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xjllb_abgq 现金流量表-按报告期

东方财富-股票-财务分析-现金流量表-按报告期

### 用法

`xjllb_abgq [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                  |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SH600519&quot;; 股票代码 | string |   true   | SH600519 |        |

### 命令示例

`xjllb_abgq`
<IStockShellDemo cmd='xjllb_abgq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xjllb_and 现金流量表-按年度

东方财富-股票-财务分析-现金流量表-按年度

### 用法

`xjllb_and [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                  |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SH600519&quot;; 股票代码 | string |   true   | SH600519 |        |

### 命令示例

`xjllb_and`
<IStockShellDemo cmd='xjllb_and' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xjllb_adjd 现金流量表-按单季度

东方财富-股票-财务分析-现金流量表-按单季度

### 用法

`xjllb_adjd [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                  |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SH600519&quot;; 股票代码 | string |   true   | SH600519 |        |

### 命令示例

`xjllb_adjd`
<IStockShellDemo cmd='xjllb_adjd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zcfzb 资产负债表

同花顺-财务指标-资产负债表

### 用法

`zcfzb [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                 |  类型  | 是否可选 |  默认值  |          可选值          |
| :-----------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;000063&quot;; 股票代码                                                                                  | string |   true   |  000063  |                          |
| `-indicator，--indicator` | indicator | indicator=&quot;按报告期&quot;; choice of &#123;&quot;按报告期&quot;, &quot;按年度&quot;, &quot;按单季度&quot;&#125; | string |   true   | 按报告期 | 按报告期,按年度,按单季度 |

### 命令示例

`zcfzb`
<IStockShellDemo cmd='zcfzb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lrb 利润表

同花顺-财务指标-利润表

### 用法

`lrb [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                 |  类型  | 是否可选 |  默认值  |          可选值          |
| :-----------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;000063&quot;; 股票代码                                                                                  | string |   true   |  000063  |                          |
| `-indicator，--indicator` | indicator | indicator=&quot;按报告期&quot;; choice of &#123;&quot;按报告期&quot;, &quot;按年度&quot;, &quot;按单季度&quot;&#125; | string |   true   | 按报告期 | 按报告期,按年度,按单季度 |

### 命令示例

`lrb`
<IStockShellDemo cmd='lrb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xjllb 现金流量表

同花顺-财务指标-现金流量表

### 用法

`xjllb [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                 |  类型  | 是否可选 |  默认值  |          可选值          |
| :-----------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;000063&quot;; 股票代码                                                                                  | string |   true   |  000063  |                          |
| `-indicator，--indicator` | indicator | indicator=&quot;按报告期&quot;; choice of &#123;&quot;按报告期&quot;, &quot;按年度&quot;, &quot;按单季度&quot;&#125; | string |   true   | 按报告期 | 按报告期,按年度,按单季度 |

### 命令示例

`xjllb`
<IStockShellDemo cmd='xjllb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zcfzb_abgq 资产负债表-按报告期

东方财富-股票-财务分析-资产负债表-已退市股票-按报告期

### 用法

`zcfzb_abgq [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SZ000013&quot;; 带市场标识的已退市股票代码 | string |   true   | SZ000013 |        |

### 命令示例

`zcfzb_abgq`
<IStockShellDemo cmd='zcfzb_abgq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lrb_abgq 利润表-按报告期

东方财富-股票-财务分析-利润表-已退市股票-按报告期

### 用法

`lrb_abgq [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SZ000013&quot;; 带市场标识的已退市股票代码 | string |   true   | SZ000013 |        |

### 命令示例

`lrb_abgq`
<IStockShellDemo cmd='lrb_abgq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xjllb_abgq 现金流量表-按报告期

东方财富-股票-财务分析-现金流量表-已退市股票-按报告期

### 用法

`xjllb_abgq [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SZ000013&quot;; 带市场标识的已退市股票代码 | string |   true   | SZ000013 |        |

### 命令示例

`xjllb_abgq`
<IStockShellDemo cmd='xjllb_abgq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggcwbb 港股财务报表

东方财富-港股-财务报表-三大报表

### 用法

`ggcwbb [-stock [stock]] [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                    |  类型  | 是否可选 |   默认值   |            可选值            |
| :-----------------------: | :-------: | :---------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :--------: | :--------------------------: |
|     `-stock，--stock`     |   stock   | stock=&quot;00700&quot;; 股票代码                                                                                       | string |   true   |   00700    |                              |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;现金流量表&quot;; choice of &#123;&quot;资产负债表&quot;, &quot;利润表&quot;, &quot;现金流量表&quot;&#125; | string |   true   | 现金流量表 | 资产负债表,利润表,现金流量表 |
| `-indicator，--indicator` | indicator | indicator=&quot;年度&quot;; choice of &#123;&quot;年度&quot;, &quot;报告期&quot;&#125;                                  | string |   true   |    年度    |         年度,报告期          |

### 命令示例

`ggcwbb`
<IStockShellDemo cmd='ggcwbb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## mgcwbb 美股财务报表

东方财富-美股-财务分析-三大报表

### 用法

`mgcwbb [-stock [stock]] [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                        |  类型  | 是否可选 |   默认值   |              可选值              |
| :-----------------------: | :-------: | :-------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :--------: | :------------------------------: |
|     `-stock，--stock`     |   stock   | stock=&quot;TSLA&quot;; 股票代码                                                                                            | string |   true   |    TSLA    |                                  |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;资产负债表&quot;; choice of &#123;&quot;资产负债表&quot;, &quot;综合损益表&quot;, &quot;现金流量表&quot;&#125; | string |   true   | 资产负债表 | 资产负债表,综合损益表,现金流量表 |
| `-indicator，--indicator` | indicator | indicator=&quot;年报&quot;; choice of &#123;&quot;年报&quot;, &quot;单季报&quot;, &quot;累计季报&quot;&#125;                | string |   true   |    年报    |       年报,单季报,累计季报       |

### 命令示例

`mgcwbb`
<IStockShellDemo cmd='mgcwbb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gjzb_xl 关键指标-新浪

新浪财经-财务报表-关键指标

### 用法

`gjzb_xl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600004&quot;; 股票代码 | string |   true   | 600004 |        |

### 命令示例

`gjzb_xl`
<IStockShellDemo cmd='gjzb_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gjzb_ths 关键指标-同花顺

同花顺-财务指标-主要指标

### 用法

`gjzb_ths [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                 |  类型  | 是否可选 |  默认值  |          可选值          |
| :-----------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;000063&quot;; 股票代码                                                                                  | string |   true   |  000063  |                          |
| `-indicator，--indicator` | indicator | indicator=&quot;按报告期&quot;; choice of &#123;&quot;按报告期&quot;, &quot;按年度&quot;, &quot;按单季度&quot;&#125; | string |   true   | 按报告期 | 按报告期,按年度,按单季度 |

### 命令示例

`gjzb_ths`
<IStockShellDemo cmd='gjzb_ths' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cwzb 财务指标

新浪财经-财务分析-财务指标

### 用法

`cwzb [-symbol [symbol]] [-start_year [start_year]]`

### 选项

|          选项参数           |    名称    | 描述                                        |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------------------: | :--------: | :------------------------------------------ | :----: | :------: | :----: | :----: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;600004&quot;; 股票代码         | string |   true   | 600004 |        |
| `-start_year，--start_year` | start_year | start_year=&quot;2020&quot;; 开始查询的时间 | string |   true   |  2020  |        |

### 命令示例

`cwzb`
<IStockShellDemo cmd='cwzb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggcwzb 港股财务指标

东方财富-港股-财务分析-主要指标

### 用法

`ggcwzb [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                   |  类型  | 是否可选 | 默认值 |   可选值    |
| :-----------------------: | :-------: | :------------------------------------------------------------------------------------- | :----: | :------: | :----: | :---------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;00700&quot;; 股票代码                                                     | string |   true   | 00700  |             |
| `-indicator，--indicator` | indicator | indicator=&quot;年度&quot;; choice of &#123;&quot;年度&quot;, &quot;报告期&quot;&#125; | string |   true   |  年度  | 年度,报告期 |

### 命令示例

`ggcwzb`
<IStockShellDemo cmd='ggcwzb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## mgcwzb 美股财务指标

东方财富-美股-财务分析-主要指标

### 用法

`mgcwzb [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                         |  类型  | 是否可选 | 默认值 |        可选值        |
| :-----------------------: | :-------: | :----------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;TSLA&quot;; 股票代码                                                                            | string |   true   |  TSLA  |                      |
| `-indicator，--indicator` | indicator | indicator=&quot;年报&quot;; choice of &#123;&quot;年报&quot;, &quot;单季报&quot;, &quot;累计季报&quot;&#125; | string |   true   |  年报  | 年报,单季报,累计季报 |

### 命令示例

`mgcwzb`
<IStockShellDemo cmd='mgcwzb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lsfh 历史分红

新浪财经-发行与分配-历史分红

### 用法

`lsfh`

### 命令示例

`lsfh`
<IStockShellDemo cmd='lsfh' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sdltgd_gg 十大流通股东(个股)

东方财富网-个股-十大流通股东

### 用法

`sdltgd_gg [-symbol [symbol]] [-date [date]]`

### 选项

|      选项参数       |  名称  | 描述                                              |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;sh688686&quot;; 带市场标识的股票代码 | string |   true   | sh688686 |        |
|   `-date，--date`   |  date  | date=&quot;20240930&quot;; 财报发布季度最后日     | string |   true   | 20240930 |        |

### 命令示例

`sdltgd_gg`
<IStockShellDemo cmd='sdltgd_gg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sdgd_gg 十大股东(个股)

东方财富网-个股-十大股东

### 用法

`sdgd_gg [-symbol [symbol]] [-date [date]]`

### 选项

|      选项参数       |  名称  | 描述                                              |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;sh688686&quot;; 带市场标识的股票代码 | string |   true   | sh688686 |        |
|   `-date，--date`   |  date  | date=&quot;20210630&quot;; 财报发布季度最后日     | string |   true   | 20210630 |        |

### 命令示例

`sdgd_gg`
<IStockShellDemo cmd='sdgd_gg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdcgbdtj_sdltgd 股东持股变动统计-十大流通股东

东方财富网-数据中心-股东分析-股东持股变动统计-十大流通股东

### 用法

`gdcgbdtj_sdltgd [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20210930&quot;; 财报发布季度最后日 | string |   true   | 20210930 |        |

### 命令示例

`gdcgbdtj_sdltgd`
<IStockShellDemo cmd='gdcgbdtj_sdltgd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdcgbdtj_sdgd 股东持股变动统计-十大股东

东方财富网-数据中心-股东分析-股东持股变动统计-十大股东

### 用法

`gdcgbdtj_sdgd [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20210930&quot;; 财报发布季度最后日 | string |   true   | 20210930 |        |

### 命令示例

`gdcgbdtj_sdgd`
<IStockShellDemo cmd='gdcgbdtj_sdgd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggcgbdtj 高管持股变动统计

同花顺-公司大事-高管持股变动

### 用法

`ggcgbdtj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;688981&quot;; 股票代码 | string |   true   | 688981 |        |

### 命令示例

`ggcgbdtj`
<IStockShellDemo cmd='ggcgbdtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdcgbdtj 股东持股变动统计

同花顺-公司大事-股东持股变动

### 用法

`gdcgbdtj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;688981&quot;; 股票代码 | string |   true   | 688981 |        |

### 命令示例

`gdcgbdtj`
<IStockShellDemo cmd='gdcgbdtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdcgfx_sdltgd 股东持股分析-十大流通股东

东方财富网-数据中心-股东分析-股东持股分析-十大流通股东

### 用法

`gdcgfx_sdltgd [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20230930&quot;; 财报发布季度最后日 | string |   true   | 20230930 |        |

### 命令示例

`gdcgfx_sdltgd`
<IStockShellDemo cmd='gdcgfx_sdltgd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdcgfx_sdgd 股东持股分析-十大股东

东方财富网-数据中心-股东分析-股东持股分析-十大股东

### 用法

`gdcgfx_sdgd [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20210930&quot;; 财报发布季度最后日 | string |   true   | 20210930 |        |

### 命令示例

`gdcgfx_sdgd`
<IStockShellDemo cmd='gdcgfx_sdgd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdcgmx_sdltgd 股东持股明细-十大流通股东

东方财富网-数据中心-股东分析-股东持股明细-十大流通股东

### 用法

`gdcgmx_sdltgd [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20210930&quot;; 财报发布季度最后日 | string |   true   | 20210930 |        |

### 命令示例

`gdcgmx_sdltgd`
<IStockShellDemo cmd='gdcgmx_sdltgd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdcgmx_sdgd 股东持股明细-十大股东

东方财富网-数据中心-股东分析-股东持股明细-十大股东

### 用法

`gdcgmx_sdgd [-date [date]] [-indicator [indicator]] [-symbol [symbol]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                                   |  类型  | 是否可选 |  默认值  |            可选值             |
| :-----------------------: | :-------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------------------: |
|      `-date，--date`      |   date    | date=&quot;20230331&quot;; 财报发布季度最后日                                                                                                                          | string |   true   | 20230331 |                               |
| `-indicator，--indicator` | indicator | indicator=&quot;个人&quot;; 股东类型; choice of &#123;&quot;个人&quot;, &quot;基金&quot;, &quot;QFII&quot;, &quot;社保&quot;, &quot;券商&quot;, &quot;信托&quot;&#125; | string |   true   |   个人   | 个人,基金,QFII,社保,券商,信托 |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;新进&quot;; 持股变动; choice of &#123;&quot;新进&quot;, &quot;增加&quot;, &quot;不变&quot;, &quot;减少&quot;&#125;                                        | string |   true   |   新进   |      新进,增加,不变,减少      |

### 命令示例

`gdcgmx_sdgd`
<IStockShellDemo cmd='gdcgmx_sdgd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdcgtj_sdltgd 股东持股统计-十大流通股东

东方财富网-数据中心-股东分析-股东持股统计-十大股东

### 用法

`gdcgtj_sdltgd [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20210930&quot;; 财报发布季度最后日 | string |   true   | 20210930 |        |

### 命令示例

`gdcgtj_sdltgd`
<IStockShellDemo cmd='gdcgtj_sdltgd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdcgtj_sdgd 股东持股统计-十大股东

东方财富网-数据中心-股东分析-股东持股统计-十大股东

### 用法

`gdcgtj_sdgd [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20210930&quot;; 财报发布季度最后日 | string |   true   | 20210930 |        |

### 命令示例

`gdcgtj_sdgd`
<IStockShellDemo cmd='gdcgtj_sdgd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdxt_sdltgd 股东协同-十大流通股东

东方财富网-数据中心-股东分析-股东协同-十大流通股东

### 用法

`gdxt_sdltgd [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                        |  类型  | 是否可选 | 默认值 |               可选值               |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :--------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;社保&quot;; choice of &#123;&quot;全部&quot;, &quot;个人&quot;, &quot;基金&quot;, &quot;QFII&quot;, &quot;社保&quot;, &quot;券商&quot;, &quot;信托&quot;&#125; | string |   true   |  社保  | 全部,个人,基金,QFII,社保,券商,信托 |

### 命令示例

`gdxt_sdltgd`
<IStockShellDemo cmd='gdxt_sdltgd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdxt_sdgd 股东协同-十大股东

东方财富网-数据中心-股东分析-股东协同-十大股东

### 用法

`gdxt_sdgd [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                        |  类型  | 是否可选 | 默认值 |               可选值               |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :--------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;社保&quot;; choice of &#123;&quot;全部&quot;, &quot;个人&quot;, &quot;基金&quot;, &quot;QFII&quot;, &quot;社保&quot;, &quot;券商&quot;, &quot;信托&quot;&#125; | string |   true   |  社保  | 全部,个人,基金,QFII,社保,券商,信托 |

### 命令示例

`gdxt_sdgd`
<IStockShellDemo cmd='gdxt_sdgd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdhs 股东户数

东方财富网-数据中心-特色数据-股东户数数据

### 用法

`gdhs [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                       |  类型  | 是否可选 |  默认值  |     可选值      |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;20230930&quot;; choice of &#123;&quot;最新&quot;, 每个季度末&#125;, 其中 每个季度末需要写成 \`20230930\` 格式 | string |   true   | 20230930 | 最新,每个季度末 |

### 命令示例

`gdhs`
<IStockShellDemo cmd='gdhs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdhsxq 股东户数详情

东方财富网-数据中心-特色数据-股东户数详情

### 用法

`gdhsxq [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;000001&quot;; 股票代码 | string |   true   | 000001 |        |

### 命令示例

`gdhsxq`
<IStockShellDemo cmd='gdhsxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fhpg 分红配股

新浪财经-发行与分配-分红配股

### 用法

`fhpg [-symbol [symbol]] [-indicator [indicator]] [-date [date]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                 |  类型  | 是否可选 |   默认值   |  可选值   |
| :-----------------------: | :-------: | :----------------------------------------------------------------------------------- | :----: | :------: | :--------: | :-------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;600012&quot;; 股票代码                                                  | string |   true   |   600012   |           |
| `-indicator，--indicator` | indicator | indicator=&quot;配股&quot;; choice of &#123;&quot;分红&quot;, &quot;配股&quot;&#125; | string |   true   |    配股    | 分红,配股 |
|      `-date，--date`      |   date    | date=&quot;1994-12-24&quot;; 分红配股的具体日期, e.g., &quot;1994-12-24&quot;        | string |   true   | 1994-12-24 |           |

### 命令示例

`fhpg`
<IStockShellDemo cmd='fhpg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lsfh 历史分红

巨潮资讯-个股-历史分红

### 用法

`lsfh [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600009&quot; | string |   true   | 600009 |        |

### 命令示例

`lsfh`
<IStockShellDemo cmd='lsfh' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xgfx 新股发行

新浪财经-发行与分配-新股发行

### 用法

`xgfx [-stock [stock]]`

### 选项

|     选项参数      | 名称  | 描述                               |  类型  | 是否可选 | 默认值 | 可选值 |
| :---------------: | :---: | :--------------------------------- | :----: | :------: | :----: | :----: |
| `-stock，--stock` | stock | stock=&quot;600004&quot;; 股票代码 | string |   true   | 600004 |        |

### 命令示例

`xgfx`
<IStockShellDemo cmd='xgfx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gpzf 股票增发

新浪财经-发行与分配-增发

### 用法

`gpzf [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600004&quot;; 股票代码 | string |   true   | 600004 |        |

### 命令示例

`gpzf`
<IStockShellDemo cmd='gpzf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggxsjj_xl 个股限售解禁-新浪

新浪财经-发行分配-限售解禁

### 用法

`ggxsjj_xl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600000&quot;; 股票代码 | string |   true   | 600000 |        |

### 命令示例

`ggxsjj_xl`
<IStockShellDemo cmd='ggxsjj_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xsgjj 限售股解禁

东方财富网-数据中心-特色数据-限售股解禁

### 用法

`xsgjj [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                                                           |  类型  | 是否可选 |  默认值  |                     可选值                     |
| :-------------------------: | :--------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :--------------------------------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;全部股票&quot;; choice of &#123;&quot;全部股票&quot;, &quot;沪市A股&quot;, &quot;科创板&quot;, &quot;深市A股&quot;, &quot;创业板&quot;, &quot;京市A股&quot;&#125; | string |   true   | 全部股票 | 全部股票,沪市A股,科创板,深市A股,创业板,京市A股 |
| `-start_date，--start_date` | start_date | start_date=&quot;20221101&quot;                                                                                                                                                | string |   true   | 20221101 |                                                |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20221209&quot;                                                                                                                                                  | string |   true   | 20221209 |                                                |

### 命令示例

`xsgjj`
<IStockShellDemo cmd='xsgjj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xsgjjxq 限售股解禁详情

东方财富网-数据中心-限售股解禁-解禁详情一览

### 用法

`xsgjjxq [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;20221202&quot; | string |   true   | 20221202 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20241202&quot;   | string |   true   | 20241202 |        |

### 命令示例

`xsgjjxq`
<IStockShellDemo cmd='xsgjjxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jjpc 解禁批次

东方财富网-数据中心-个股限售解禁-解禁批次

### 用法

`jjpc [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600000&quot; | string |   true   | 600000 |        |

### 命令示例

`jjpc`
<IStockShellDemo cmd='jjpc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jjgd 解禁股东

东方财富网-数据中心-个股限售解禁-解禁股东

### 用法

`jjgd [-symbol [symbol]] [-date [date]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                 |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :--------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600000&quot;                                                                            | string |   true   |  600000  |        |
|   `-date，--date`   |  date  | date=&quot;20200904&quot;; 通过 ak.stock_restricted_release_queue_em(symbol=&quot;600000&quot;) 获取 | string |   true   | 20200904 |        |

### 命令示例

`jjgd`
<IStockShellDemo cmd='jjgd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ltgd 流通股东

新浪财经-股东股本-流通股东

### 用法

`ltgd [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600000&quot;; 股票代码 | string |   true   | 600000 |        |

### 命令示例

`ltgd`
<IStockShellDemo cmd='ltgd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## bkhq 板块行情

新浪行业-板块行情

### 用法

`bkhq [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                     |  类型  | 是否可选 |  默认值  |               可选值               |
| :-----------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :--------------------------------: |
| `-indicator，--indicator` | indicator | indicator=&quot;新浪行业&quot;; choice of &#123;&quot;新浪行业&quot;, &quot;启明星行业&quot;, &quot;概念&quot;, &quot;地域&quot;, &quot;行业&quot;&#125; | string |   true   | 新浪行业 | 新浪行业,启明星行业,概念,地域,行业 |

### 命令示例

`bkhq`
<IStockShellDemo cmd='bkhq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## bkxq 板块详情

新浪行业-板块行情-成份详情, 由于新浪网页提供的统计数据有误, 部分行业数量大于统计数

### 用法

`bkxq [-sector [sector]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                               |  类型  | 是否可选 |   默认值    | 可选值 |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------- | :----: | :------: | :---------: | :----: |
| `-sector，--sector` | sector | sector=&quot;hangye_ZL01&quot;; 通过 \*\*ak.stock_sector_spot\*\* 返回数据的 label 字段选择 sector | string |   true   | hangye_ZL01 |        |

### 命令示例

`bkxq`
<IStockShellDemo cmd='bkxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gplb_ag 股票列表-A股

沪深京 A 股股票代码和股票简称数据

### 用法

`gplb_ag`

### 命令示例

`gplb_ag`
<IStockShellDemo cmd='gplb_ag' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gplb_sz 股票列表-上证

上海证券交易所股票代码和简称数据

### 用法

`gplb_sz [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                           |  类型  | 是否可选 | 默认值  |         可选值         |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-----: | :--------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;主板A股&quot;; choice of &#123;&quot;主板A股&quot;, &quot;主板B股&quot;, &quot;科创板&quot;&#125; | string |   true   | 主板A股 | 主板A股,主板B股,科创板 |

### 命令示例

`gplb_sz`
<IStockShellDemo cmd='gplb_sz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gplb_sz 股票列表-深证

深证证券交易所股票代码和股票简称数据

### 用法

`gplb_sz [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                  |  类型  | 是否可选 | 默认值  |              可选值              |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :-----: | :------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;A股列表&quot;; choice of &#123;&quot;A股列表&quot;, &quot;B股列表&quot;, &quot;CDR列表&quot;, &quot;AB股列表&quot;&#125; | string |   true   | A股列表 | A股列表,B股列表,CDR列表,AB股列表 |

### 命令示例

`gplb_sz`
<IStockShellDemo cmd='gplb_sz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gplb_bz 股票列表-北证

北京证券交易所股票代码和简称数据

### 用法

`gplb_bz`

### 命令示例

`gplb_bz`
<IStockShellDemo cmd='gplb_bz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zz/ztss_sz 终止/暂停上市-深证

深证证券交易所终止/暂停上市股票

### 用法

`zz/ztss_sz [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                      |  类型  | 是否可选 |    默认值    |          可选值           |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------------------- | :----: | :------: | :----------: | :-----------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;终止上市公司&quot;; choice of &#123;&quot;暂停上市公司&quot;, &quot;终止上市公司&quot;&#125; | string |   true   | 终止上市公司 | 暂停上市公司,终止上市公司 |

### 命令示例

`zz/ztss_sz`
<IStockShellDemo cmd='zz/ztss_sz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lwjts 两网及退市

东方财富网-行情中心-沪深个股-两网及退市

### 用法

`lwjts`

### 命令示例

`lwjts`
<IStockShellDemo cmd='lwjts' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zt/zzss_sz 暂停/终止上市-上证

上海证券交易所暂停/终止上市股票

### 用法

`zt/zzss_sz [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                  |  类型  | 是否可选 | 默认值 |      可选值      |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :--------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;全部&quot;; choice of &#123;&quot;全部&quot;, &quot;沪市&quot;, &quot;科创板&quot;&#125; | string |   true   |  全部  | 全部,沪市,科创板 |

### 命令示例

`zt/zzss_sz`
<IStockShellDemo cmd='zt/zzss_sz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gpgm 股票更名

新浪财经-股票曾用名

### 用法

`gpgm [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;000503&quot;; 股票代码 | string |   true   | 000503 |        |

### 命令示例

`gpgm`
<IStockShellDemo cmd='gpgm' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## mcbg_sz 名称变更-深证

深证证券交易所-市场数据-股票数据-名称变更

### 用法

`mcbg_sz [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                          |  类型  | 是否可选 |  默认值  |      可选值       |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;全称变更&quot;; choice of &#123;&quot;全称变更&quot;, &quot;简称变更&quot;&#125; | string |   true   | 全称变更 | 全称变更,简称变更 |

### 命令示例

`mcbg_sz`
<IStockShellDemo cmd='mcbg_sz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jjcg 基金持股

新浪财经-股本股东-基金持股

### 用法

`jjcg [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;600004&quot;; 股票代码 | string |   true   | 600004 |        |

### 命令示例

`jjcg`
<IStockShellDemo cmd='jjcg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zygd 主要股东

新浪财经-股本股东-主要股东

### 用法

`zygd [-stock [stock]]`

### 选项

|     选项参数      | 名称  | 描述                               |  类型  | 是否可选 | 默认值 | 可选值 |
| :---------------: | :---: | :--------------------------------- | :----: | :------: | :----: | :----: |
| `-stock，--stock` | stock | stock=&quot;600004&quot;; 股票代码 | string |   true   | 600004 |        |

### 命令示例

`zygd`
<IStockShellDemo cmd='zygd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jgcgylb 机构持股一览表

新浪财经-机构持股-机构持股一览表

### 用法

`jgcgylb [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                                                          |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;20051&quot;; 从 2005 年开始, &#123;&quot;一季报&quot;:1, &quot;中报&quot;:2 &quot;三季报&quot;:3 &quot;年报&quot;:4&#125;, e.g., &quot;20191&quot;, 其中的 1 表示一季报; &quot;20193&quot;, 其中的 3 表示三季报; | string |   true   | 20051  |        |

### 命令示例

`jgcgylb`
<IStockShellDemo cmd='jgcgylb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jgcgxq 机构持股详情

新浪财经-机构持股-机构持股详情

### 用法

`jgcgxq [-stock [stock]] [-quarter [quarter]]`

### 选项

|       选项参数        |  名称   | 描述                                                                                                                                                                                                                           |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------------: | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
|   `-stock，--stock`   |  stock  | stock=&quot;300003&quot;; 股票代码                                                                                                                                                                                             | string |   true   | 300003 |        |
| `-quarter，--quarter` | quarter | quarter=&quot;20201&quot;; 从 2005 年开始, &#123;&quot;一季报&quot;:1, &quot;中报&quot;:2 &quot;三季报&quot;:3 &quot;年报&quot;:4&#125;, e.g., &quot;20191&quot;, 其中的 1 表示一季报; &quot;20193&quot;, 其中的 3 表示三季报; | string |   true   | 20201  |        |

### 命令示例

`jgcgxq`
<IStockShellDemo cmd='jgcgxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jgtjc 机构推荐池

新浪财经-机构推荐池-具体指标的数据

### 用法

`jgtjc [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                                                                                                    |  类型  | 是否可选 |   默认值   |                                                      可选值                                                      |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :--------: | :--------------------------------------------------------------------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;行业关注度&quot;; choice of &#123;&#39;最新投资评级&#39;, &#39;上调评级股票&#39;, &#39;下调评级股票&#39;, &#39;股票综合评级&#39;, &#39;首次评级股票&#39;, &#39;目标涨幅排名&#39;, &#39;机构关注度&#39;, &#39;行业关注度&#39;, &#39;投资评级选股&#39;&#125; | string |   true   | 行业关注度 | 最新投资评级,上调评级股票,下调评级股票,股票综合评级,首次评级股票,目标涨幅排名,机构关注度,行业关注度,投资评级选股 |

### 命令示例

`jgtjc`
<IStockShellDemo cmd='jgtjc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gppjjl 股票评级记录

新浪财经-机构推荐池-股票评级记录

### 用法

`gppjjl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;000001&quot; | string |   true   | 000001 |        |

### 命令示例

`gppjjl`
<IStockShellDemo cmd='gppjjl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## tzpj 投资评级

巨潮资讯-数据中心-评级预测-投资评级

### 用法

`tzpj [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                              |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20210910&quot;; 交易日 | string |   true   | 20210910 |        |

### 命令示例

`tzpj`
<IStockShellDemo cmd='tzpj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## swgghyflbdls 申万个股行业分类变动历史

申万宏源研究-行业分类-全部行业分类

### 用法

`swgghyflbdls`

### 命令示例

`swgghyflbdls`
<IStockShellDemo cmd='swgghyflbdls' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hysyl 行业市盈率

巨潮资讯-数据中心-行业分析-行业市盈率

### 用法

`hysyl [-symbol [symbol]] [-date [date]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                          |  类型  | 是否可选 |     默认值     |           可选值            |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------ | :----: | :------: | :------------: | :-------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;证监会行业分类&quot;; choice of &#123;&quot;证监会行业分类&quot;, &quot;国证行业分类&quot;&#125; | string |   true   | 证监会行业分类 | 证监会行业分类,国证行业分类 |
|   `-date，--date`   |  date  | date=&quot;20210910&quot;; 交易日                                                                             | string |   true   |    20210910    |                             |

### 命令示例

`hysyl`
<IStockShellDemo cmd='hysyl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xggh 新股过会

巨潮资讯-数据中心-新股数据-新股过会

### 用法

`xggh`

### 命令示例

`xggh`
<IStockShellDemo cmd='xggh' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xgfx 新股发行

巨潮资讯-数据中心-新股数据-新股发行

### 用法

`xgfx`

### 命令示例

`xgfx`
<IStockShellDemo cmd='xgfx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## djgjxgrycgbd_sz 董监高及相关人员持股变动-上证

上海证券交易所-披露-监管信息公开-公司监管-董董监高人员股份变动

### 用法

`djgjxgrycgbd_sz [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                        |  类型  | 是否可选 | 默认值 |      可选值       |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :---------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;600000&quot;; choice of &#123;&quot;全部&quot;, &quot;具体股票代码&quot;&#125; | string |   true   | 600000 | 全部,具体股票代码 |

### 命令示例

`djgjxgrycgbd_sz`
<IStockShellDemo cmd='djgjxgrycgbd_sz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## djgjxgrycgbd_sz 董监高及相关人员持股变动-深证

深圳证券交易所-信息披露-监管信息公开-董监高人员股份变动

### 用法

`djgjxgrycgbd_sz [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                        |  类型  | 是否可选 | 默认值 |      可选值       |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :---------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;001308&quot;; choice of &#123;&quot;全部&quot;, &quot;具体股票代码&quot;&#125; | string |   true   | 001308 | 全部,具体股票代码 |

### 命令示例

`djgjxgrycgbd_sz`
<IStockShellDemo cmd='djgjxgrycgbd_sz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## djgjxgrycgbd_bz 董监高及相关人员持股变动-北证

北京证券交易所-信息披露-监管信息-董监高及相关人员持股变动

### 用法

`djgjxgrycgbd_bz [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                        |  类型  | 是否可选 | 默认值 |      可选值       |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :---------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;430489&quot;; choice of &#123;&quot;全部&quot;, &quot;具体股票代码&quot;&#125; | string |   true   | 430489 | 全部,具体股票代码 |

### 命令示例

`djgjxgrycgbd_bz`
<IStockShellDemo cmd='djgjxgrycgbd_bz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gdrsjcgjzd 股东人数及持股集中度

巨潮资讯-数据中心-专题统计-股东股本-股东人数及持股集中度

### 用法

`gdrsjcgjzd [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                                                                                      |  类型  | 是否可选 |  默认值  |               可选值                |
| :-------------: | :--: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------------------------: |
| `-date，--date` | date | date=&quot;20210630&quot;; choice of &#123;&quot;XXXX0331&quot;, &quot;XXXX0630&quot;, &quot;XXXX0930&quot;, &quot;XXXX1231&quot;&#125;; 从 20170331 开始 | string |   true   | 20210630 | XXXX0331,XXXX0630,XXXX0930,XXXX1231 |

### 命令示例

`gdrsjcgjzd`
<IStockShellDemo cmd='gdrsjcgjzd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gbbd 股本变动

巨潮资讯-数据中心-专题统计-股东股本-股本变动

### 用法

`gbbd [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                |  类型  | 是否可选 | 默认值 |                 可选值                  |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :-------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;全部&quot;; choice of &#123;&quot;深市主板&quot;, &quot;沪市&quot;, &quot;创业板&quot;, &quot;科创板&quot;, &quot;北交所&quot;, &quot;全部&quot;&#125; | string |   true   |  全部  | 深市主板,沪市,创业板,科创板,北交所,全部 |

### 命令示例

`gbbd`
<IStockShellDemo cmd='gbbd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sjkzrcgbd 实际控制人持股变动

巨潮资讯-数据中心-专题统计-股东股本-实际控制人持股变动

### 用法

`sjkzrcgbd [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                      |  类型  | 是否可选 | 默认值 |                    可选值                    |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;全部&quot;; choice of &#123;&quot;单独控制&quot;, &quot;实际控制人&quot;, &quot;一致行动人&quot;, &quot;家族控制&quot;, &quot;全部&quot;&#125;; 从 2010 开始 | string |   true   |  全部  | 单独控制,实际控制人,一致行动人,家族控制,全部 |

### 命令示例

`sjkzrcgbd`
<IStockShellDemo cmd='sjkzrcgbd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggcgbdmx 高管持股变动明细

巨潮资讯-数据中心-专题统计-股东股本-高管持股变动明细

### 用法

`ggcgbdmx [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                              |  类型  | 是否可选 | 默认值 |  可选值   |
| :-----------------: | :----: | :-------------------------------------------------------------------------------- | :----: | :------: | :----: | :-------: |
| `-symbol，--symbol` | symbol | symbol=&quot;增持&quot;; choice of &#123;&quot;增持&quot;, &quot;减持&quot;&#125; | string |   true   |  增持  | 增持,减持 |

### 命令示例

`ggcgbdmx`
<IStockShellDemo cmd='ggcgbdmx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## djgjxgrycgbdmx 董监高及相关人员持股变动明细

东方财富网-数据中心-特色数据-高管持股-董监高及相关人员持股变动明细

### 用法

`djgjxgrycgbdmx`

### 命令示例

`djgjxgrycgbdmx`
<IStockShellDemo cmd='djgjxgrycgbdmx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ryzjcgbdmx 人员增减持股变动明细

东方财富网-数据中心-特色数据-高管持股-人员增减持股变动明细

### 用法

`ryzjcgbdmx [-symbol [symbol]] [-name [name]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;001308&quot;; 股票代码 | string |   true   | 001308 |        |
|   `-name，--name`   |  name  | name=&quot;吴远&quot;; 高管名称     | string |   true   |  吴远  |        |

### 命令示例

`ryzjcgbdmx`
<IStockShellDemo cmd='ryzjcgbdmx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dwdb 对外担保

巨潮资讯-数据中心-专题统计-公司治理-对外担保

### 用法

`dwdb [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                            |  类型  | 是否可选 |  默认值  |              可选值              |
| :-------------------------: | :--------: | :---------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :------------------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;全部&quot;; choice of &#123;&quot;全部&quot;, &quot;深市主板&quot;, &quot;沪市&quot;, &quot;创业板&quot;, &quot;科创板&quot;&#125; | string |   true   |   全部   | 全部,深市主板,沪市,创业板,科创板 |
| `-start_date，--start_date` | start_date | start_date=&quot;20180630&quot;                                                                                                                 | string |   true   | 20180630 |                                  |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20210927&quot;                                                                                                                   | string |   true   | 20210927 |                                  |

### 命令示例

`dwdb`
<IStockShellDemo cmd='dwdb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gsss 公司诉讼

巨潮资讯-数据中心-专题统计-公司治理-公司诉讼

### 用法

`gsss [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                            |  类型  | 是否可选 |  默认值  |              可选值              |
| :-------------------------: | :--------: | :---------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :------------------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;全部&quot;; choice of &#123;&quot;全部&quot;, &quot;深市主板&quot;, &quot;沪市&quot;, &quot;创业板&quot;, &quot;科创板&quot;&#125; | string |   true   |   全部   | 全部,深市主板,沪市,创业板,科创板 |
| `-start_date，--start_date` | start_date | start_date=&quot;20180630&quot;                                                                                                                 | string |   true   | 20180630 |                                  |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20210927&quot;                                                                                                                   | string |   true   | 20210927 |                                  |

### 命令示例

`gsss`
<IStockShellDemo cmd='gsss' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gqzy 股权质押

巨潮资讯-数据中心-专题统计-公司治理-股权质押

### 用法

`gqzy [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :------------------------ | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20210930&quot; | string |   true   | 20210930 |        |

### 命令示例

`gqzy`
<IStockShellDemo cmd='gqzy' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## mgmbj 美港目标价

美港电讯-美港目标价数据

### 用法

`mgmbj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                        |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :-------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;us&quot;; choice of &#123;&quot;us&quot;, &quot;hk&quot;&#125; | string |   true   |   us   | us,hk  |

### 命令示例

`mgmbj`
<IStockShellDemo cmd='mgmbj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qsyjyb 券商业绩月报

东方财富网-数据中心-特色数据-券商业绩月报

### 用法

`qsyjyb [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20200430&quot;; 输入需要查询月份的最后一天的日期 | string |   true   | 20200430 |        |

### 命令示例

`qsyjyb`
<IStockShellDemo cmd='qsyjyb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## a_gggzb A 股个股指标

乐咕乐股-A 股个股指标: 市盈率, 市净率, 股息率

### 用法

`a_gggzb [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                 |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :--------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;000001&quot;; 参见 \*\*ak.stock_a_indicator_lg(symbol=&quot;all&quot;)\*\* 获取股票代码 | string |   true   | 000001 |        |

### 命令示例

`a_gggzb`
<IStockShellDemo cmd='a_gggzb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## a_ggxl A 股股息率

乐咕乐股-股息率-A 股股息率

### 用法

`a_ggxl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                               |  类型  | 是否可选 | 默认值  |            可选值             |
| :-----------------: | :----: | :--------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-----: | :---------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;上证A股&quot;; choice of &#123;&quot;上证A股&quot;, &quot;深证A股&quot;, &quot;创业板&quot;, &quot;科创板&quot;&#125; | string |   true   | 上证A股 | 上证A股,深证A股,创业板,科创板 |

### 命令示例

`a_ggxl`
<IStockShellDemo cmd='a_ggxl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hszsgxl 恒生指数股息率

乐咕乐股-股息率-恒生指数股息率

### 用法

`hszsgxl`

### 命令示例

`hszsgxl`
<IStockShellDemo cmd='hszsgxl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dpyjd 大盘拥挤度

乐咕乐股-大盘拥挤度

### 用法

`dpyjd`

### 命令示例

`dpyjd`
<IStockShellDemo cmd='dpyjd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gzlc 股债利差

乐咕乐股-股债利差

### 用法

`gzlc`

### 命令示例

`gzlc`
<IStockShellDemo cmd='gzlc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## bftzb 巴菲特指标

乐估乐股-底部研究-巴菲特指标

### 用法

`bftzb`

### 命令示例

`bftzb`
<IStockShellDemo cmd='bftzb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## a_gdqzyzwssyl A 股等权重与中位数市盈率

乐咕乐股-A 股等权重市盈率与中位数市盈率

### 用法

`a_gdqzyzwssyl`

### 命令示例

`a_gdqzyzwssyl`
<IStockShellDemo cmd='a_gdqzyzwssyl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## a_gdqzyzwssjl A 股等权重与中位数市净率

乐咕乐股-A 股等权重与中位数市净率

### 用法

`a_gdqzyzwssjl`

### 命令示例

`a_gdqzyzwssjl`
<IStockShellDemo cmd='a_gdqzyzwssjl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zbsyl 主板市盈率

乐咕乐股-主板市盈率

### 用法

`zbsyl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                      |  类型  | 是否可选 | 默认值 |         可选值          |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :---------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;上证&quot;; choice of &#123;&quot;上证&quot;, &quot;深证&quot;, &quot;创业板&quot;, &quot;科创版&quot;&#125; | string |   true   |  上证  | 上证,深证,创业板,科创版 |

### 命令示例

`zbsyl`
<IStockShellDemo cmd='zbsyl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zssyl 指数市盈率

乐咕乐股-指数市盈率

### 用法

`zssyl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                                                                                                                                           |  类型  | 是否可选 | 默认值 |                                               可选值                                               |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :------------------------------------------------------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;上证50&quot;; choice of &#123;&quot;上证50&quot;, &quot;沪深300&quot;, &quot;上证380&quot;, &quot;创业板50&quot;, &quot;中证500&quot;, &quot;上证180&quot;, &quot;深证红利&quot;, &quot;深证100&quot;, &quot;中证1000&quot;, &quot;上证红利&quot;, &quot;中证100&quot;, &quot;中证800&quot;&#125; | string |   true   | 上证50 | 上证50,沪深300,上证380,创业板50,中证500,上证180,深证红利,深证100,中证1000,上证红利,中证100,中证800 |

### 命令示例

`zssyl`
<IStockShellDemo cmd='zssyl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zbsjl 主板市净率

乐咕乐股-主板市净率

### 用法

`zbsjl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                      |  类型  | 是否可选 | 默认值 |         可选值          |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :---------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;上证&quot;; choice of &#123;&quot;上证&quot;, &quot;深证&quot;, &quot;创业板&quot;, &quot;科创版&quot;&#125; | string |   true   |  上证  | 上证,深证,创业板,科创版 |

### 命令示例

`zbsjl`
<IStockShellDemo cmd='zbsjl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zssjl 指数市净率

乐咕乐股-指数市净率

### 用法

`zssjl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                                                                                                                                           |  类型  | 是否可选 | 默认值 |                                               可选值                                               |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :------------------------------------------------------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;上证50&quot;; choice of &#123;&quot;上证50&quot;, &quot;沪深300&quot;, &quot;上证380&quot;, &quot;创业板50&quot;, &quot;中证500&quot;, &quot;上证180&quot;, &quot;深证红利&quot;, &quot;深证100&quot;, &quot;中证1000&quot;, &quot;上证红利&quot;, &quot;中证100&quot;, &quot;中证800&quot;&#125; | string |   true   | 上证50 | 上证50,沪深300,上证380,创业板50,中证500,上证180,深证红利,深证100,中证1000,上证红利,中证100,中证800 |

### 命令示例

`zssjl`
<IStockShellDemo cmd='zssjl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## a_ggzzb A 股估值指标

百度股市通-A 股-财务报表-估值数据

### 用法

`a_ggzzb [-symbol [symbol]] [-indicator [indicator]] [-period [period]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                            |  类型  | 是否可选 | 默认值 |                   可选值                    |
| :-----------------------: | :-------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :-----------------------------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;002044&quot;; A 股代码                                                                                                                             | string |   true   | 002044 |                                             |
| `-indicator，--indicator` | indicator | indicator=&quot;总市值&quot;; choice of &#123;&quot;总市值&quot;, &quot;市盈率(TTM)&quot;, &quot;市盈率(静)&quot;, &quot;市净率&quot;, &quot;市现率&quot;&#125; | string |   true   | 总市值 | 总市值,市盈率(TTM),市盈率(静),市净率,市现率 |
|    `-period，--period`    |  period   | period=&quot;近一年&quot;; choice of &#123;&quot;近一年&quot;, &quot;近三年&quot;, &quot;近五年&quot;, &quot;近十年&quot;, &quot;全部&quot;&#125;               | string |   true   | 近一年 |      近一年,近三年,近五年,近十年,全部       |

### 命令示例

`a_ggzzb`
<IStockShellDemo cmd='a_ggzzb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gggz 个股估值

东方财富网-数据中心-估值分析-每日互动-每日互动-估值分析

### 用法

`gggz [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;002044&quot;; A 股代码 | string |   true   | 002044 |        |

### 命令示例

`gggz`
<IStockShellDemo cmd='gggz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zdtp 涨跌投票

百度股市通- A 股或指数-股评-投票

### 用法

`zdtp [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                 |  类型  | 是否可选 | 默认值 |  可选值   |
| :-----------------------: | :-------: | :----------------------------------------------------------------------------------- | :----: | :------: | :----: | :-------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;000001&quot;; A 股股票或指数代码                                        | string |   true   | 000001 |           |
| `-indicator，--indicator` | indicator | indicator=&quot;指数&quot;; choice of &#123;&quot;指数&quot;, &quot;股票&quot;&#125; | string |   true   |  指数  | 指数,股票 |

### 命令示例

`zdtp`
<IStockShellDemo cmd='zdtp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggggzb 港股个股指标

亿牛网-港股个股指标: 市盈率, 市净率, 股息率, ROE, 市值

### 用法

`ggggzb [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                                |  类型  | 是否可选 | 默认值  |               可选值               |
| :-----------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :-----: | :--------------------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;hk01093&quot;; 可通过调用 \*\*ak.stock_hk_indicator_eniu(symbol=&quot;hk01093&quot;, indicator=&quot;港股&quot;)\*\* 获取股票代码                      | string |   true   | hk01093 |                                    |
| `-indicator，--indicator` | indicator | indicator=&quot;市盈率&quot;; choice of &#123;&quot;港股&quot;, &quot;市盈率&quot;, &quot;市净率&quot;, &quot;股息率&quot;, &quot;ROE&quot;, &quot;市值&quot;&#125; | string |   true   | 市盈率  | 港股,市盈率,市净率,股息率,ROE,市值 |

### 命令示例

`ggggzb`
<IStockShellDemo cmd='ggggzb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gggzzb 港股估值指标

百度股市通-港股-财务报表-估值数据

### 用法

`gggzzb [-symbol [symbol]] [-indicator [indicator]] [-period [period]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                            |  类型  | 是否可选 | 默认值 |                   可选值                    |
| :-----------------------: | :-------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :-----------------------------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;02358&quot;; 港股代码                                                                                                                              | string |   true   | 02358  |                                             |
| `-indicator，--indicator` | indicator | indicator=&quot;总市值&quot;; choice of &#123;&quot;总市值&quot;, &quot;市盈率(TTM)&quot;, &quot;市盈率(静)&quot;, &quot;市净率&quot;, &quot;市现率&quot;&#125; | string |   true   | 总市值 | 总市值,市盈率(TTM),市盈率(静),市净率,市现率 |
|    `-period，--period`    |  period   | period=&quot;近一年&quot;; choice of &#123;&quot;近一年&quot;, &quot;近三年&quot;, &quot;全部&quot;&#125;                                                       | string |   true   | 近一年 |             近一年,近三年,全部              |

### 命令示例

`gggzzb`
<IStockShellDemo cmd='gggzzb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cxghxddgpsl 创新高和新低的股票数量

不同市场的创新高和新低的股票数量

### 用法

`cxghxddgpsl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                           |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;all&quot;; &#123;&quot;all&quot;: &quot;全部A股&quot;, &quot;sz50&quot;: &quot;上证50&quot;, &quot;hs300&quot;: &quot;沪深300&quot;, &quot;zz500&quot;: &quot;中证500&quot;&#125; | string |   true   |  all   |        |

### 命令示例

`cxghxddgpsl`
<IStockShellDemo cmd='cxghxddgpsl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## pjgtj 破净股统计

乐咕乐股-A 股破净股统计数据

### 用法

`pjgtj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                |  类型  | 是否可选 | 默认值  |             可选值             |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-----: | :----------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;全部A股&quot;; choice of &#123;&quot;全部A股&quot;, &quot;沪深300&quot;, &quot;上证50&quot;, &quot;中证500&quot;&#125; | string |   true   | 全部A股 | 全部A股,沪深300,上证50,中证500 |

### 命令示例

`pjgtj`
<IStockShellDemo cmd='pjgtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jjcg 基金持股

东方财富网-数据中心-主力数据-基金持仓

### 用法

`jjcg [-symbol [symbol]] [-date [date]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                  |  类型  | 是否可选 |  默认值  |                        可选值                         |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :------: | :---------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;基金持仓&quot;; choice of &#123;&quot;基金持仓&quot;, &quot;QFII持仓&quot;, &quot;社保持仓&quot;, &quot;券商持仓&quot;, &quot;保险持仓&quot;, &quot;信托持仓&quot;&#125; | string |   true   | 基金持仓 | 基金持仓,QFII持仓,社保持仓,券商持仓,保险持仓,信托持仓 |
|   `-date，--date`   |  date  | date=&quot;20200630&quot;; 财报发布日期, xxxx-03-31, xxxx-06-30, xxxx-09-30, xxxx-12-31                                                                                               | string |   true   | 20200630 |                                                       |

### 命令示例

`jjcg`
<IStockShellDemo cmd='jjcg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jjcgmx 基金持股明细

东方财富网-数据中心-主力数据-基金持仓-基金持仓明细表

### 用法

`jjcgmx [-symbol [symbol]] [-date [date]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;005827&quot;; 基金代码                                                     | string |   true   |  005827  |        |
|   `-date，--date`   |  date  | date=&quot;20200630&quot;; 财报发布日期, xxxx-03-31, xxxx-06-30, xxxx-09-30, xxxx-12-31 | string |   true   | 20200630 |        |

### 命令示例

`jjcgmx`
<IStockShellDemo cmd='jjcgmx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lhbxq 龙虎榜详情

东方财富网-数据中心-龙虎榜单-龙虎榜详情

### 用法

`lhbxq [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;20220314&quot; | string |   true   | 20220314 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20220315&quot;   | string |   true   | 20220315 |        |

### 命令示例

`lhbxq`
<IStockShellDemo cmd='lhbxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggsbtj 个股上榜统计

东方财富网-数据中心-龙虎榜单-个股上榜统计

### 用法

`ggsbtj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                            |  类型  | 是否可选 | 默认值 |           可选值            |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :-------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;近一月&quot;; choice of &#123;&quot;近一月&quot;, &quot;近三月&quot;, &quot;近六月&quot;, &quot;近一年&quot;&#125; | string |   true   | 近一月 | 近一月,近三月,近六月,近一年 |

### 命令示例

`ggsbtj`
<IStockShellDemo cmd='ggsbtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jgmmmrtj 机构买卖每日统计

东方财富网-数据中心-龙虎榜单-机构买卖每日统计

### 用法

`jgmmmrtj [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;20240417&quot; | string |   true   | 20240417 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20240430&quot;   | string |   true   | 20240430 |        |

### 命令示例

`jgmmmrtj`
<IStockShellDemo cmd='jgmmmrtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jgxwzz 机构席位追踪

东方财富网-数据中心-龙虎榜单-机构席位追踪

### 用法

`jgxwzz [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                            |  类型  | 是否可选 | 默认值 |           可选值            |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :-------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;近一月&quot;; choice of &#123;&quot;近一月&quot;, &quot;近三月&quot;, &quot;近六月&quot;, &quot;近一年&quot;&#125; | string |   true   | 近一月 | 近一月,近三月,近六月,近一年 |

### 命令示例

`jgxwzz`
<IStockShellDemo cmd='jgxwzz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## mrhyyyb 每日活跃营业部

东方财富网-数据中心-龙虎榜单-每日活跃营业部

### 用法

`mrhyyyb [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;20220311&quot; | string |   true   | 20220311 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20220315&quot;   | string |   true   | 20220315 |        |

### 命令示例

`mrhyyyb`
<IStockShellDemo cmd='mrhyyyb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yybxqsj_dc 营业部详情数据-东财

东方财富网-数据中心-龙虎榜单-营业部历史交易明细-营业部交易明细

### 用法

`yybxqsj_dc [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                           |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :----------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;10026729&quot;; 营业部代码, 通过 ak.stock_lhb_hyyyb_em() 接口获取 | string |   true   | 10026729 |        |

### 命令示例

`yybxqsj_dc`
<IStockShellDemo cmd='yybxqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yybpx 营业部排行

东方财富网-数据中心-龙虎榜单-营业部排行

### 用法

`yybpx [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                            |  类型  | 是否可选 | 默认值 |           可选值            |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :-------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;近一月&quot;; choice of &#123;&quot;近一月&quot;, &quot;近三月&quot;, &quot;近六月&quot;, &quot;近一年&quot;&#125; | string |   true   | 近一月 | 近一月,近三月,近六月,近一年 |

### 命令示例

`yybpx`
<IStockShellDemo cmd='yybpx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yybtj 营业部统计

东方财富网-数据中心-龙虎榜单-营业部统计

### 用法

`yybtj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                            |  类型  | 是否可选 | 默认值 |           可选值            |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :-------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;近一月&quot;; choice of &#123;&quot;近一月&quot;, &quot;近三月&quot;, &quot;近六月&quot;, &quot;近一年&quot;&#125; | string |   true   | 近一月 | 近一月,近三月,近六月,近一年 |

### 命令示例

`yybtj`
<IStockShellDemo cmd='yybtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gglhbxq 个股龙虎榜详情

东方财富网-数据中心-龙虎榜单-个股龙虎榜详情

### 用法

`gglhbxq [-symbol [symbol]] [-date [date]] [-flag [flag]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                      |  类型  | 是否可选 |  默认值  |  可选值   |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-------: |
| `-symbol，--symbol` | symbol | symbol=&quot;600077&quot;;                                                                                                                | string |   true   |  600077  |           |
|   `-date，--date`   |  date  | date=&quot;20220310&quot;; 需要通过 ak.stock_lhb_stock_detail_date_em(symbol=&quot;600077&quot;) 接口获取相应股票的有龙虎榜详情数据的日期 | string |   true   | 20220310 |           |
|   `-flag，--flag`   |  flag  | flag=&quot;卖出&quot;; choice of &#123;&quot;买入&quot;, &quot;卖出&quot;&#125;                                                           | string |   true   |   卖出   | 买入,卖出 |

### 命令示例

`gglhbxq`
<IStockShellDemo cmd='gglhbxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lhb_yybpx_sbcszd 龙虎榜-营业部排行-上榜次数最多

龙虎榜-营业部排行-上榜次数最多

### 用法

`lhb_yybpx_sbcszd`

### 命令示例

`lhb_yybpx_sbcszd`
<IStockShellDemo cmd='lhb_yybpx_sbcszd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lhb_yybpx_zjslzq 龙虎榜-营业部排行-资金实力最强

龙虎榜-营业部排行-资金实力最强

### 用法

`lhb_yybpx_zjslzq`

### 命令示例

`lhb_yybpx_zjslzq`
<IStockShellDemo cmd='lhb_yybpx_zjslzq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lhb_yybpx_btczsl 龙虎榜-营业部排行-抱团操作实力

龙虎榜-营业部排行-抱团操作实力

### 用法

`lhb_yybpx_btczsl`

### 命令示例

`lhb_yybpx_btczsl`
<IStockShellDemo cmd='lhb_yybpx_btczsl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lhb_mrxq 龙虎榜-每日详情

新浪财经-龙虎榜-每日详情

### 用法

`lhb_mrxq [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                              |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240222&quot;; 交易日 | string |   true   | 20240222 |        |

### 命令示例

`lhb_mrxq`
<IStockShellDemo cmd='lhb_mrxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lhb_ggsbtj 龙虎榜-个股上榜统计

新浪财经-龙虎榜-个股上榜统计

### 用法

`lhb_ggsbtj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                      |  类型  | 是否可选 | 默认值 |                            可选值                             |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :-----------------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;5&quot;; choice of &#123;&quot;5&quot;: 最近 5 天; &quot;10&quot;: 最近 10 天; &quot;30&quot;: 最近 30 天; &quot;60&quot;: 最近 60 天;&#125; | string |   true   |   5    | 5: 最近 5 天; 10: 最近 10 天; 30: 最近 30 天; 60: 最近 60 天; |

### 命令示例

`lhb_ggsbtj`
<IStockShellDemo cmd='lhb_ggsbtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lhb_yysbtj 龙虎榜-营业上榜统计

新浪财经-龙虎榜-营业上榜统计

### 用法

`lhb_yysbtj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                      |  类型  | 是否可选 | 默认值 |                            可选值                             |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :-----------------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;5&quot;; choice of &#123;&quot;5&quot;: 最近 5 天; &quot;10&quot;: 最近 10 天; &quot;30&quot;: 最近 30 天; &quot;60&quot;: 最近 60 天;&#125; | string |   true   |   5    | 5: 最近 5 天; 10: 最近 10 天; 30: 最近 30 天; 60: 最近 60 天; |

### 命令示例

`lhb_yysbtj`
<IStockShellDemo cmd='lhb_yysbtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lhb_jgxwzz 龙虎榜-机构席位追踪

新浪财经-龙虎榜-机构席位追踪

### 用法

`lhb_jgxwzz [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                      |  类型  | 是否可选 | 默认值 |                            可选值                             |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :-----------------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;5&quot;; choice of &#123;&quot;5&quot;: 最近 5 天; &quot;10&quot;: 最近 10 天; &quot;30&quot;: 最近 30 天; &quot;60&quot;: 最近 60 天;&#125; | string |   true   |   5    | 5: 最近 5 天; 10: 最近 10 天; 30: 最近 30 天; 60: 最近 60 天; |

### 命令示例

`lhb_jgxwzz`
<IStockShellDemo cmd='lhb_jgxwzz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lhb_jgxwcjmx 龙虎榜-机构席位成交明细

新浪财经-龙虎榜-机构席位成交明细

### 用法

`lhb_jgxwcjmx`

### 命令示例

`lhb_jgxwcjmx`
<IStockShellDemo cmd='lhb_jgxwcjmx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sfsbxx 首发申报信息

东方财富网-数据中心-新股申购-首发申报信息-首发申报企业信息

### 用法

`sfsbxx`

### 命令示例

`sfsbxx`
<IStockShellDemo cmd='sfsbxx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kcb 科创板

东方财富网-数据中心-新股数据-IPO审核信息-科创板

### 用法

`kcb`

### 命令示例

`kcb`
<IStockShellDemo cmd='kcb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cyb 创业板

东方财富网-数据中心-新股数据-IPO审核信息-创业板

### 用法

`cyb`

### 命令示例

`cyb`
<IStockShellDemo cmd='cyb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## shzb 上海主板

东方财富网-数据中心-新股数据-IPO审核信息-上海主板

### 用法

`shzb`

### 命令示例

`shzb`
<IStockShellDemo cmd='shzb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## szzb 深圳主板

东方财富网-数据中心-新股数据-IPO审核信息-深圳主板

### 用法

`szzb`

### 命令示例

`szzb`
<IStockShellDemo cmd='szzb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## bjs 北交所

东方财富网-数据中心-新股数据-IPO审核信息-北交所

### 用法

`bjs`

### 命令示例

`bjs`
<IStockShellDemo cmd='bjs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dbqy 达标企业

东方财富网-数据中心-新股数据-注册制审核-达标企业

### 用法

`dbqy`

### 命令示例

`dbqy`
<IStockShellDemo cmd='dbqy' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zf 增发

东方财富网-数据中心-新股数据-增发-全部增发

### 用法

`zf`

### 命令示例

`zf`
<IStockShellDemo cmd='zf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## pg 配股

东方财富网-数据中心-新股数据-配股

### 用法

`pg`

### 命令示例

`pg`
<IStockShellDemo cmd='pg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gphgsj 股票回购数据

东方财富网-数据中心-股票回购-股票回购数据

### 用法

`gphgsj`

### 命令示例

`gphgsj`
<IStockShellDemo cmd='gphgsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gbjg 股本结构

东方财富-A股数据-股本结构

### 用法

`gbjg [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                         |  类型  | 是否可选 |  默认值   | 可选值 |
| :-----------------: | :----: | :--------------------------- | :----: | :------: | :-------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;603392.SH&quot; | string |   true   | 603392.SH |        |

### 命令示例

`gbjg`
<IStockShellDemo cmd='gbjg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sctj 市场统计

东方财富网-数据中心-大宗交易-市场统计

### 用法

`sctj`

### 命令示例

`sctj`
<IStockShellDemo cmd='sctj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## mrmx 每日明细

东方财富网-数据中心-大宗交易-每日明细

### 用法

`mrmx [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                      |  类型  | 是否可选 |  默认值  |      可选值       |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&#39;债券&#39;; choice of &#123;&#39;A股&#39;, &#39;B股&#39;, &#39;基金&#39;, &#39;债券&#39;&#125; | string |   true   |   债券   | A股,B股,基金,债券 |
| `-start_date，--start_date` | start_date | start_date=&#39;20201123&#39;; 开始日期                                                                   | string |   true   | 20201123 |                   |
|   `-end_date，--end_date`   |  end_date  | end_date=&#39;20201204&#39;; 结束日期                                                                     | string |   true   | 20201204 |                   |

### 命令示例

`mrmx`
<IStockShellDemo cmd='mrmx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## mrtj 每日统计

东方财富网-数据中心-大宗交易-每日统计

### 用法

`mrtj [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :-------------------------------------- | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&#39;20220105&#39;; 开始日期 | string |   true   | 20220105 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&#39;20220105&#39;; 结束日期   | string |   true   | 20220105 |        |

### 命令示例

`mrtj`
<IStockShellDemo cmd='mrtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hy_a_gtj 活跃 A 股统计

东方财富网-数据中心-大宗交易-活跃 A 股统计

### 用法

`hy_a_gtj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                  |  类型  | 是否可选 | 默认值 |           可选值            |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :-------------------------: |
| `-symbol，--symbol` | symbol | symbol=&#39;近三月&#39;; choice of &#123;&#39;近一月&#39;, &#39;近三月&#39;, &#39;近六月&#39;, &#39;近一年&#39;&#125; | string |   true   | 近三月 | 近一月,近三月,近六月,近一年 |

### 命令示例

`hy_a_gtj`
<IStockShellDemo cmd='hy_a_gtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hyyybtj 活跃营业部统计

东方财富网-数据中心-大宗交易-活跃营业部统计

### 用法

`hyyybtj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                     |  类型  | 是否可选 | 默认值 |                可选值                |
| :-----------------: | :----: | :--------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&#39;近3日&#39;; choice of &#123;&#39;当前交易日&#39;, &#39;近3日&#39;, &#39;近5日&#39;, &#39;近10日&#39;, &#39;近30日&#39;&#125; | string |   true   | 近3日  | 当前交易日,近3日,近5日,近10日,近30日 |

### 命令示例

`hyyybtj`
<IStockShellDemo cmd='hyyybtj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yybpx 营业部排行

东方财富网-数据中心-大宗交易-营业部排行

### 用法

`yybpx [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                  |  类型  | 是否可选 | 默认值 |           可选值            |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :-------------------------: |
| `-symbol，--symbol` | symbol | symbol=&#39;近三月&#39;; choice of &#123;&#39;近一月&#39;, &#39;近三月&#39;, &#39;近六月&#39;, &#39;近一年&#39;&#125; | string |   true   | 近三月 | 近一月,近三月,近六月,近一年 |

### 命令示例

`yybpx`
<IStockShellDemo cmd='yybpx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yzxdr 一致行动人

东方财富网-数据中心-特色数据-一致行动人

### 用法

`yzxdr [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20200930&quot;; 每年的季度末时间点 | string |   true   | 20200930 |        |

### 命令示例

`yzxdr`
<IStockShellDemo cmd='yzxdr' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## bdzqmdjbzjblcx 标的证券名单及保证金比例查询

融资融券-标的证券名单及保证金比例查询

### 用法

`bdzqmdjbzjblcx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :------------------------ | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20231013&quot; | string |   true   | 20231013 |        |

### 命令示例

`bdzqmdjbzjblcx`
<IStockShellDemo cmd='bdzqmdjbzjblcx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lrzhxx 两融账户信息

东方财富网-数据中心-融资融券-融资融券账户统计-两融账户信息

### 用法

`lrzhxx`

### 命令示例

`lrzhxx`
<IStockShellDemo cmd='lrzhxx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rzrqhz 融资融券汇总

上海证券交易所-融资融券数据-融资融券汇总数据

### 用法

`rzrqhz [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;20010106&quot; | string |   true   | 20010106 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20010106&quot;   | string |   true   | 20010106 |        |

### 命令示例

`rzrqhz`
<IStockShellDemo cmd='rzrqhz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rzrqmx 融资融券明细

上海证券交易所-融资融券数据-融资融券明细数据

### 用法

`rzrqmx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :------------------------ | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20210205&quot; | string |   true   | 20210205 |        |

### 命令示例

`rzrqmx`
<IStockShellDemo cmd='rzrqmx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rzrqhz 融资融券汇总

深圳证券交易所-融资融券数据-融资融券汇总数据

### 用法

`rzrqhz [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240411&quot;; 交易日期 | string |   true   | 20240411 |        |

### 命令示例

`rzrqhz`
<IStockShellDemo cmd='rzrqhz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rzrqmx 融资融券明细

深证证券交易所-融资融券数据-融资融券交易明细数据

### 用法

`rzrqmx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :------------------------ | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20220118&quot; | string |   true   | 20220118 |        |

### 命令示例

`rzrqmx`
<IStockShellDemo cmd='rzrqmx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## bdzqxx 标的证券信息

深圳证券交易所-融资融券数据-标的证券信息

### 用法

`bdzqxx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :------------------------ | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20210205&quot; | string |   true   | 20210205 |        |

### 命令示例

`bdzqxx`
<IStockShellDemo cmd='bdzqxx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ylyc_dfcf 盈利预测-东方财富

东方财富网-数据中心-研究报告-盈利预测; 该数据源网页端返回数据有异常, 本接口已修复该异常

### 用法

`ylyc_dfcf [-symbol <symbol>]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                        |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;&quot;, 默认为获取全部数据; symbol=&quot;船舶制造&quot;, 则获取具体行业板块的数据; 行业板块可以通过 ak.stock_board_industry_name_em() 接口获取 | string |   true   |        |        |

### 命令示例

`ylyc_dfcf`
<IStockShellDemo cmd='ylyc_dfcf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ggylyc_jjt 港股盈利预测-经济通

经济通-公司资料-盈利预测

### 用法

`ggylyc_jjt [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                           |  类型  | 是否可选 |    默认值    |                      可选值                       |
| :-----------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----------: | :-----------------------------------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;09999&quot;                                                                                                                                       | string |   true   |    09999     |                                                   |
| `-indicator，--indicator` | indicator | indicator=&quot;盈利预测概览&quot;; choice of &#123;&quot;评级总览&quot;, &quot;去年度业绩表现&quot;, &quot;综合盈利预测&quot;, &quot;盈利预测概览&quot;&#125; | string |   true   | 盈利预测概览 | 评级总览,去年度业绩表现,综合盈利预测,盈利预测概览 |

### 命令示例

`ggylyc_jjt`
<IStockShellDemo cmd='ggylyc_jjt' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ylyc_ths 盈利预测-同花顺

同花顺-盈利预测

### 用法

`ylyc_ths [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                                                         |  类型  | 是否可选 |      默认值      |                                   可选值                                    |
| :-----------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :--------------: | :-------------------------------------------------------------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;600519&quot;; 股票代码                                                                                                                                                          | string |   true   |      600519      |                                                                             |
| `-indicator，--indicator` | indicator | indicator=&quot;预测年报每股收益&quot;; choice of &#123;&quot;预测年报每股收益&quot;, &quot;预测年报净利润&quot;, &quot;业绩预测详表-机构&quot;, &quot;业绩预测详表-详细指标预测&quot;&#125; | string |   true   | 预测年报每股收益 | 预测年报每股收益,预测年报净利润,业绩预测详表-机构,业绩预测详表-详细指标预测 |

### 命令示例

`ylyc_ths`
<IStockShellDemo cmd='ylyc_ths' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ths_gnbkzs 同花顺-概念板块指数

同花顺-板块-概念板块-指数日频率数据

### 用法

`ths_gnbkzs [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                             |  类型  | 是否可选 |    默认值    | 可选值 |
| :-------------------------: | :--------: | :--------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----------: | :----: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;阿里巴巴概念&quot;; 可以通过调用 \*\*ak.stock_board_concept_name_ths()\*\* 查看同花顺的所有概念名称 | string |   true   | 阿里巴巴概念 |        |
| `-start_date，--start_date` | start_date | start_date=&quot;20200101&quot;; 开始时间                                                                        | string |   true   |   20200101   |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20250228&quot;; 结束时间                                                                          | string |   true   |   20250228   |        |

### 命令示例

`ths_gnbkzs`
<IStockShellDemo cmd='ths_gnbkzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ths_gnbkjj 同花顺-概念板块简介

同花顺-板块-概念板块-板块简介

### 用法

`ths_gnbkjj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                    |  类型  | 是否可选 |    默认值    | 可选值 |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----------: | :----: |
| `-symbol，--symbol` | symbol | symbol: str = &quot;阿里巴巴概念&quot;; 可以通过调用 \*\*ak.stock_board_concept_name_ths()\*\* 查看同花顺的所有概念名称 | string |   true   | 阿里巴巴概念 |        |

### 命令示例

`ths_gnbkjj`
<IStockShellDemo cmd='ths_gnbkjj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dfcf_gnbk 东方财富-概念板块

东方财富网-行情中心-沪深京板块-概念板块

### 用法

`dfcf_gnbk`

### 命令示例

`dfcf_gnbk`
<IStockShellDemo cmd='dfcf_gnbk' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dfcf_gnbk_sshq 东方财富-概念板块-实时行情

东方财富网-行情中心-沪深京板块-概念板块-实时行情

### 用法

`dfcf_gnbk_sshq`

### 命令示例

`dfcf_gnbk_sshq`
<IStockShellDemo cmd='dfcf_gnbk_sshq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dfcf_cfg 东方财富-成份股

东方财富-沪深板块-概念板块-板块成份

### 用法

`dfcf_cfg [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                 |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;融资融券&quot;; 支持传入板块代码比如：BK0655，可以通过调用 \*\*ak.stock_board_concept_name_em()\*\* 查看东方财富-概念板块的所有行业名称 | string |   true   | 融资融券 |        |

### 命令示例

`dfcf_cfg`
<IStockShellDemo cmd='dfcf_cfg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dfcf_zs 东方财富-指数

东方财富-沪深板块-概念板块-历史行情数据

### 用法

`dfcf_zs [-symbol [symbol]] [-period [period]] [-start_date [start_date]] [-end_date [end_date]] [-adjust <adjust>]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                   |  类型  | 是否可选 |  默认值  |        可选值        |
| :-------------------------: | :--------: | :--------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;绿色电力&quot;; 可以通过调用 \*\*ak.stock_board_concept_name_em()\*\* 查看东方财富-概念板块的所有概念代码 | string |   true   | 绿色电力 |                      |
|     `-period，--period`     |   period   | period=&quot;daily&quot;; choice of &#123;&quot;daily&quot;, &quot;weekly&quot;, &quot;monthly&quot;&#125;             | string |   true   |  daily   | daily,weekly,monthly |
| `-start_date，--start_date` | start_date | start_date=&quot;20220101&quot;                                                                                        | string |   true   | 20220101 |                      |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20221128&quot;                                                                                          | string |   true   | 20221128 |                      |
|     `-adjust，--adjust`     |   adjust   | adjust=&quot;&quot;; choice of &#123;&#39;&#39;: 不复权, 默认; &quot;qfq&quot;: 前复权, &quot;hfq&quot;: 后复权&#125;  | string |   true   |          |       ,qfq,hfq       |

### 命令示例

`dfcf_zs`
<IStockShellDemo cmd='dfcf_zs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dfcf_zs_fs 东方财富-指数-分时

东方财富-沪深板块-概念板块-分时历史行情数据

### 用法

`dfcf_zs_fs [-symbol [symbol]] [-period [period]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                     |  类型  | 是否可选 | 默认值 |    可选值    |
| :-----------------: | :----: | :----------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----------: |
| `-symbol，--symbol` | symbol | symbol=&quot;长寿药&quot;; 可以通过调用 \*\*ak.stock_board_concept_name_em()\*\* 查看东方财富-概念板块的所有概念代码     | string |   true   | 长寿药 |              |
| `-period，--period` | period | period=&quot;5&quot;; choice of &#123;&quot;1&quot;, &quot;5&quot;, &quot;15&quot;, &quot;30&quot;, &quot;60&quot;&#125; | string |   true   |   5    | 1,5,15,30,60 |

### 命令示例

`dfcf_zs_fs`
<IStockShellDemo cmd='dfcf_zs_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ftnn_mggn_cfg 富途牛牛-美股概念-成分股

富途牛牛-主题投资-概念板块-成分股

### 用法

`ftnn_mggn_cfg [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                            |  类型  | 是否可选 |    默认值    |               可选值               |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----------: | :--------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;特朗普概念股&quot;; choice of &#123;&quot;巴菲特持仓&quot;, &quot;佩洛西持仓&quot;, &quot;特朗普概念股&quot;&#125; | string |   true   | 特朗普概念股 | 巴菲特持仓,佩洛西持仓,特朗普概念股 |

### 命令示例

`ftnn_mggn_cfg`
<IStockShellDemo cmd='ftnn_mggn_cfg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ths_thshyylb 同花顺-同花顺行业一览表

同花顺-同花顺行业一览表

### 用法

`ths_thshyylb`

### 命令示例

`ths_thshyylb`
<IStockShellDemo cmd='ths_thshyylb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ths_zs 同花顺-指数

同花顺-板块-行业板块-指数日频率数据

### 用法

`ths_zs [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;元件&quot;; 可以通过调用 \*\*ak.stock_board_industry_name_ths()\*\* 查看同花顺的所有行业名称 | string |   true   |   元件   |        |
| `-start_date，--start_date` | start_date | start_date=&quot;20200101&quot;; 开始时间                                                                 | string |   true   | 20200101 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20211027&quot;; 结束时间                                                                   | string |   true   | 20211027 |        |

### 命令示例

`ths_zs`
<IStockShellDemo cmd='ths_zs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dfcf_hybk 东方财富-行业板块

东方财富-沪深京板块-行业板块

### 用法

`dfcf_hybk`

### 命令示例

`dfcf_hybk`
<IStockShellDemo cmd='dfcf_hybk' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dfcf_hybk_sshq 东方财富-行业板块-实时行情

东方财富网-沪深板块-行业板块-实时行情

### 用法

`dfcf_hybk_sshq [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;小金属&quot; | string |   true   | 小金属 |        |

### 命令示例

`dfcf_hybk_sshq`
<IStockShellDemo cmd='dfcf_hybk_sshq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dfcf_cfg 东方财富-成份股

东方财富-沪深板块-行业板块-板块成份

### 用法

`dfcf_cfg [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;小金属&quot;; 支持传入板块代码比如：BK1027，可以通过调用 \*\*ak.stock_board_industry_name_em()\*\* 查看东方财富-行业板块的所有行业代码 | string |   true   | 小金属 |        |

### 命令示例

`dfcf_cfg`
<IStockShellDemo cmd='dfcf_cfg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dfcf_zs_rp 东方财富-指数-日频

东方财富-沪深板块-行业板块-历史行情数据

### 用法

`dfcf_zs_rp [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]] [-period [period]] [-adjust <adjust>]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                  |  类型  | 是否可选 |  默认值  |   可选值    |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;小金属&quot;; 可以通过调用 \*\*ak.stock_board_industry_name_em()\*\* 查看东方财富-行业板块的所有行业代码 | string |   true   |  小金属  |             |
| `-start_date，--start_date` | start_date | start_date=&quot;20211201&quot;;                                                                                      | string |   true   | 20211201 |             |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20220401&quot;;                                                                                        | string |   true   | 20220401 |             |
|     `-period，--period`     |   period   | period=&quot;日k&quot;; 周期; choice of &#123;&quot;日k&quot;, &quot;周k&quot;, &quot;月k&quot;&#125;                 | string |   true   |   日k    | 日k,周k,月k |
|     `-adjust，--adjust`     |   adjust   | adjust=&quot;&quot;; choice of &#123;&#39;&#39;: 不复权, 默认; &quot;qfq&quot;: 前复权, &quot;hfq&quot;: 后复权&#125; | string |   true   |          |  ,qfq,hfq   |

### 命令示例

`dfcf_zs_rp`
<IStockShellDemo cmd='dfcf_zs_rp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dfcf_zs_fs 东方财富-指数-分时

东方财富-沪深板块-行业板块-分时历史行情数据

### 用法

`dfcf_zs_fs [-symbol [symbol]] [-period <period>]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                    |  类型  | 是否可选 | 默认值 |    可选值    |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----------: |
| `-symbol，--symbol` | symbol | symbol=&quot;小金属&quot;; 可以通过调用 \*\*ak.stock_board_industry_name_em()\*\* 查看东方财富-行业板块的所有行业代码   | string |   true   | 小金属 |              |
| `-period，--period` | period | period=&quot;&quot;; choice of &#123;&quot;1&quot;, &quot;5&quot;, &quot;15&quot;, &quot;30&quot;, &quot;60&quot;&#125; | string |   true   |        | 1,5,15,30,60 |

### 命令示例

`dfcf_zs_fs`
<IStockShellDemo cmd='dfcf_zs_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gzpxb 关注排行榜

雪球-沪深股市-热度排行榜-关注排行榜

### 用法

`gzpxb [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                      |  类型  | 是否可选 | 默认值 |     可选值      |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------- | :----: | :------: | :----: | :-------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;最热门&quot;; choice of &#123;&quot;本周新增&quot;, &quot;最热门&quot;&#125; | string |   true   | 最热门 | 本周新增,最热门 |

### 命令示例

`gzpxb`
<IStockShellDemo cmd='gzpxb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## tlpxb 讨论排行榜

雪球-沪深股市-热度排行榜-讨论排行榜

### 用法

`tlpxb [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                      |  类型  | 是否可选 | 默认值 |     可选值      |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------- | :----: | :------: | :----: | :-------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;最热门&quot;; choice of &#123;&quot;本周新增&quot;, &quot;最热门&quot;&#125; | string |   true   | 最热门 | 本周新增,最热门 |

### 命令示例

`tlpxb`
<IStockShellDemo cmd='tlpxb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jypxb 交易排行榜

雪球-沪深股市-热度排行榜-交易排行榜

### 用法

`jypxb [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                      |  类型  | 是否可选 | 默认值 |     可选值      |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------- | :----: | :------: | :----: | :-------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;最热门&quot;; choice of &#123;&quot;本周新增&quot;, &quot;最热门&quot;&#125; | string |   true   | 最热门 | 本周新增,最热门 |

### 命令示例

`jypxb`
<IStockShellDemo cmd='jypxb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rqb_ag 人气榜-A股

东方财富网站-股票热度

### 用法

`rqb_ag`

### 命令示例

`rqb_ag`
<IStockShellDemo cmd='rqb_ag' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## bsb_ag 飙升榜-A股

东方财富-个股人气榜-飙升榜

### 用法

`bsb_ag`

### 命令示例

`bsb_ag`
<IStockShellDemo cmd='bsb_ag' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rqb_gg 人气榜-港股

东方财富-个股人气榜-人气榜-港股市场

### 用法

`rqb_gg`

### 命令示例

`rqb_gg`
<IStockShellDemo cmd='rqb_gg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ag A股

东方财富网-股票热度-历史趋势及粉丝特征

### 用法

`ag [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SZ000665&quot; | string |   true   | SZ000665 |        |

### 命令示例

`ag`
<IStockShellDemo cmd='ag' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gg 港股

东方财富网-股票热度-历史趋势

### 用法

`gg [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                     |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :----------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;00700&quot; | string |   true   | 00700  |        |

### 命令示例

`gg`
<IStockShellDemo cmd='gg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hdy_tw 互动易-提问

互动易-提问

### 用法

`hdy_tw [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                       |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;002594&quot;; | string |   true   | 002594 |        |

### 命令示例

`hdy_tw`
<IStockShellDemo cmd='hdy_tw' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hdy_hd 互动易-回答

互动易-回答

### 用法

`hdy_hd [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                    |  类型  | 是否可选 |       默认值        | 可选值 |
| :-----------------: | :----: | :-------------------------------------------------------------------------------------- | :----: | :------: | :-----------------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;1495108801386602496&quot;; 通过 ak.stock_irm_cninfo 来获取具体的提问者编号 | string |   true   | 1495108801386602496 |        |

### 命令示例

`hdy_hd`
<IStockShellDemo cmd='hdy_hd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## szehd 上证e互动

上证e互动-提问与回答

### 用法

`szehd [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;603119&quot;; 股票代码 | string |   true   | 603119 |        |

### 命令示例

`szehd`
<IStockShellDemo cmd='szehd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ag A股

东方财富网-个股人气榜-实时变动

### 用法

`ag [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SZ000665&quot; | string |   true   | SZ000665 |        |

### 命令示例

`ag`
<IStockShellDemo cmd='ag' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gg 港股

东方财富网-个股人气榜-实时变动

### 用法

`gg [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                     |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :----------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;00700&quot; | string |   true   | 00700  |        |

### 命令示例

`gg`
<IStockShellDemo cmd='gg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rmgjc 热门关键词

东方财富-个股人气榜-热门关键词

### 用法

`rmgjc [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SZ000665&quot; | string |   true   | SZ000665 |        |

### 命令示例

`rmgjc`
<IStockShellDemo cmd='rmgjc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## nbjy 内部交易

雪球-行情中心-沪深股市-内部交易

### 用法

`nbjy`

### 命令示例

`nbjy`
<IStockShellDemo cmd='nbjy' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ag A股

东方财富-个股人气榜-最新排名

### 用法

`ag [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SZ000665&quot; | string |   true   | SZ000665 |        |

### 命令示例

`ag`
<IStockShellDemo cmd='ag' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gg 港股

东方财富-个股人气榜-最新排名

### 用法

`gg [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                     |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :----------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;00700&quot; | string |   true   | 00700  |        |

### 命令示例

`gg`
<IStockShellDemo cmd='gg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rsgp 热搜股票

百度股市通-热搜股票

### 用法

`rsgp [-symbol [symbol]] [-date [date]] [-time [time]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                |  类型  | 是否可选 |  默认值  |       可选值       |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :------: | :----------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;A股&quot;; choice of &#123;&quot;全部&quot;, &quot;A股&quot;, &quot;港股&quot;, &quot;美股&quot;&#125; | string |   true   |   A股    | 全部,A股,港股,美股 |
|   `-date，--date`   |  date  | date=&quot;20250616&quot;                                                                                           | string |   true   | 20250616 |                    |
|   `-time，--time`   |  time  | time=&quot;今日&quot;; choice of &#123;&quot;今日&quot;, &quot;1小时&quot;&#125;                                    | string |   true   |   今日   |     今日,1小时     |

### 命令示例

`rsgp`
<IStockShellDemo cmd='rsgp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xggp 相关股票

东方财富-个股人气榜-相关股票

### 用法

`xggp [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;SZ000665&quot; | string |   true   | SZ000665 |        |

### 命令示例

`xggp`
<IStockShellDemo cmd='xggp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## pkyd 盘口异动

东方财富-行情中心-盘口异动数据

### 用法

`pkyd [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |  类型  | 是否可选 |  默认值  |                                                                                                       可选值                                                                                                        |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;大笔买入&quot;; choice of &#123;&#39;火箭发射&#39;, &#39;快速反弹&#39;, &#39;大笔买入&#39;, &#39;封涨停板&#39;, &#39;打开跌停板&#39;, &#39;有大买盘&#39;, &#39;竞价上涨&#39;, &#39;高开5日线&#39;, &#39;向上缺口&#39;, &#39;60日新高&#39;, &#39;60日大幅上涨&#39;, &#39;加速下跌&#39;, &#39;高台跳水&#39;, &#39;大笔卖出&#39;, &#39;封跌停板&#39;, &#39;打开涨停板&#39;, &#39;有大卖盘&#39;, &#39;竞价下跌&#39;, &#39;低开5日线&#39;, &#39;向下缺口&#39;, &#39;60日新低&#39;, &#39;60日大幅下跌&#39;&#125; | string |   true   | 大笔买入 | 火箭发射,快速反弹,大笔买入,封涨停板,打开跌停板,有大买盘,竞价上涨,高开5日线,向上缺口,60日新高,60日大幅上涨,加速下跌,高台跳水,大笔卖出,封跌停板,打开涨停板,有大卖盘,竞价下跌,低开5日线,向下缺口,60日新低,60日大幅下跌 |

### 命令示例

`pkyd`
<IStockShellDemo cmd='pkyd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## bkydxq 板块异动详情

东方财富-行情中心-当日板块异动详情

### 用法

`bkydxq`

### 命令示例

`bkydxq`
<IStockShellDemo cmd='bkydxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ztgc 涨停股池

东方财富网-行情中心-涨停板行情-涨停股池

### 用法

`ztgc [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&#39;20241008&#39; | string |   true   | 20241008 |        |

### 命令示例

`ztgc`
<IStockShellDemo cmd='ztgc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zrztgc 昨日涨停股池

东方财富网-行情中心-涨停板行情-昨日涨停股池

### 用法

`zrztgc [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&#39;20240415&#39; | string |   true   | 20240415 |        |

### 命令示例

`zrztgc`
<IStockShellDemo cmd='zrztgc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qsgc 强势股池

东方财富网-行情中心-涨停板行情-强势股池

### 用法

`qsgc [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&#39;20241009&#39; | string |   true   | 20241009 |        |

### 命令示例

`qsgc`
<IStockShellDemo cmd='qsgc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cxgc 次新股池

东方财富网-行情中心-涨停板行情-次新股池

### 用法

`cxgc [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&#39;20241231&#39; | string |   true   | 20241231 |        |

### 命令示例

`cxgc`
<IStockShellDemo cmd='cxgc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zbgc 炸板股池

东方财富网-行情中心-涨停板行情-炸板股池

### 用法

`zbgc [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&#39;20241011&#39; | string |   true   | 20241011 |        |

### 命令示例

`zbgc`
<IStockShellDemo cmd='zbgc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dtgc 跌停股池

东方财富网-行情中心-涨停板行情-跌停股池

### 用法

`dtgc [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&#39;20241011&#39; | string |   true   | 20241011 |        |

### 命令示例

`dtgc`
<IStockShellDemo cmd='dtgc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zqxyfx 赚钱效应分析

乐咕乐股网-赚钱效应分析数据

### 用法

`zqxyfx`

### 命令示例

`zqxyfx`
<IStockShellDemo cmd='zqxyfx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cxfl 持续放量

同花顺-数据中心-技术选股-持续放量

### 用法

`cxfl`

### 命令示例

`cxfl`
<IStockShellDemo cmd='cxfl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cxsl 持续缩量

同花顺-数据中心-技术选股-持续缩量

### 用法

`cxsl`

### 命令示例

`cxsl`
<IStockShellDemo cmd='cxsl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xstp 向上突破

同花顺-数据中心-技术选股-向上突破

### 用法

`xstp [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                                                                |  类型  | 是否可选 |  默认值   |                                  可选值                                  |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-------: | :----------------------------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;500日均线&quot;; choice of &#123;&quot;5日均线&quot;, &quot;10日均线&quot;, &quot;20日均线&quot;, &quot;30日均线&quot;, &quot;60日均线&quot;, &quot;90日均线&quot;, &quot;250日均线&quot;, &quot;500日均线&quot;&#125; | string |   true   | 500日均线 | 5日均线,10日均线,20日均线,30日均线,60日均线,90日均线,250日均线,500日均线 |

### 命令示例

`xstp`
<IStockShellDemo cmd='xstp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xxtp 向下突破

同花顺-数据中心-技术选股-向下突破

### 用法

`xxtp [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                                                                |  类型  | 是否可选 |  默认值   |                                  可选值                                  |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-------: | :----------------------------------------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;500日均线&quot;; choice of &#123;&quot;5日均线&quot;, &quot;10日均线&quot;, &quot;20日均线&quot;, &quot;30日均线&quot;, &quot;60日均线&quot;, &quot;90日均线&quot;, &quot;250日均线&quot;, &quot;500日均线&quot;&#125; | string |   true   | 500日均线 | 5日均线,10日均线,20日均线,30日均线,60日均线,90日均线,250日均线,500日均线 |

### 命令示例

`xxtp`
<IStockShellDemo cmd='xxtp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ljqs 量价齐升

同花顺-数据中心-技术选股-量价齐升

### 用法

`ljqs`

### 命令示例

`ljqs`
<IStockShellDemo cmd='ljqs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ljqd 量价齐跌

同花顺-数据中心-技术选股-量价齐跌

### 用法

`ljqd`

### 命令示例

`ljqd`
<IStockShellDemo cmd='ljqd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xzjp 险资举牌

同花顺-数据中心-技术选股-险资举牌

### 用法

`xzjp`

### 命令示例

`xzjp`
<IStockShellDemo cmd='xzjp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## esg_pjsj ESG 评级数据

新浪财经-ESG评级中心-ESG评级-ESG评级数据

### 用法

`esg_pjsj`

### 命令示例

`esg_pjsj`
<IStockShellDemo cmd='esg_pjsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## msci MSCI

新浪财经-ESG评级中心-ESG评级-MSCI

### 用法

`msci`

### 命令示例

`msci`
<IStockShellDemo cmd='msci' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lft 路孚特

新浪财经-ESG评级中心-ESG评级-路孚特

### 用法

`lft`

### 命令示例

`lft`
<IStockShellDemo cmd='lft' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zd 秩鼎

新浪财经-ESG评级中心-ESG评级-秩鼎

### 用法

`zd`

### 命令示例

`zd`
<IStockShellDemo cmd='zd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hzzs 华证指数

新浪财经-ESG评级中心-ESG评级-华证指数

### 用法

`hzzs`

### 命令示例

`hzzs`
<IStockShellDemo cmd='hzzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
