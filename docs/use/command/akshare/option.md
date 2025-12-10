---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---

# akshare

## hqsj 行情数据

上海证券交易所、深圳证券交易所、中国金融期货交易所的金融期权行情数据

### 用法

`hqsj [-symbol [symbol]] [-end_month [end_month]]`

### 选项

|         选项参数          |   名称    | 描述                                                                               |  类型  | 是否可选 |         默认值         | 可选值 |
| :-----------------------: | :-------: | :--------------------------------------------------------------------------------- | :----: | :------: | :--------------------: | :----: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;华泰柏瑞沪深300ETF期权&quot;; 合约名称: \*\*期权基础信息-金融期权\*\* | string |   true   | 华泰柏瑞沪深300ETF期权 |        |
| `-end_month，--end_month` | end_month | end_month=&quot;2306&quot;; 合约到期月份: 2023 年 6 月, 只能获取近期合约的数据     | string |   true   |          2306          |        |

### 命令示例

`hqsj`
<IStockShellDemo cmd='hqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fxzb_shzqjys 风险指标-上海证券交易所

上海证券交易所-产品-股票期权-期权风险指标数据

### 用法

`fxzb_shzqjys [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240626&quot;; 交易日; 从 20150209 开始 | string |   true   | 20240626 |        |

### 命令示例

`fxzb_shzqjys`
<IStockShellDemo cmd='fxzb_shzqjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## mrtj_shzqjys 每日统计-上海证券交易所

上海证券交易所-产品-股票期权-每日统计

### 用法

`mrtj_shzqjys [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                              |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240626&quot;; 交易日 | string |   true   | 20240626 |        |

### 命令示例

`mrtj_shzqjys`
<IStockShellDemo cmd='mrtj_shzqjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## mrtj_szzqjys 每日统计-深圳证券交易所

深圳证券交易所-市场数据-期权数据-日度概况

### 用法

`mrtj_szzqjys [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                              |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240626&quot;; 交易日 | string |   true   | 20240626 |        |

### 命令示例

`mrtj_szzqjys`
<IStockShellDemo cmd='mrtj_szzqjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sz50zslb 上证50指数列表

中金所-上证50指数-所有合约, 返回的第一个合约为主力合约

### 用法

`sz50zslb`

### 命令示例

`sz50zslb`
<IStockShellDemo cmd='sz50zslb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hs300zslb 沪深300指数列表

中金所-沪深300指数-所有合约, 返回的第一个合约为主力合约

### 用法

`hs300zslb`

### 命令示例

`hs300zslb`
<IStockShellDemo cmd='hs300zslb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zz1000zslb 中证1000指数列表

中金所-中证1000指数-所有合约, 返回的第一个合约为主力合约

### 用法

`zz1000zslb`

### 命令示例

`zz1000zslb`
<IStockShellDemo cmd='zz1000zslb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshq_sz50zs 实时行情-上证50指数

新浪财经-中金所-上证50指数-指定合约-实时行情

### 用法

`sshq_sz50zs [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;ho2303&quot; | string |   true   | ho2303 |        |

### 命令示例

`sshq_sz50zs`
<IStockShellDemo cmd='sshq_sz50zs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshq_hs300zs 实时行情-沪深300指数

新浪财经-中金所-沪深300指数-指定合约-实时行情

### 用法

`sshq_hs300zs [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;io2104&quot; | string |   true   | io2104 |        |

### 命令示例

`sshq_hs300zs`
<IStockShellDemo cmd='sshq_hs300zs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshq_zz1000zs 实时行情-中证1000指数

新浪财经-中金所-中证1000指数-指定合约-实时行情

### 用法

`sshq_zz1000zs [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;mo2208&quot; | string |   true   | mo2208 |        |

### 命令示例

`sshq_zz1000zs`
<IStockShellDemo cmd='sshq_zz1000zs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rphq_sz50zs 日频行情-上证50指数

中金所-上证50指数-指定合约-日频行情

### 用法

`rphq_sz50zs [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                          |  类型  | 是否可选 |   默认值    | 可选值 |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :---------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;ho2303P2350&quot;; 具体合约代码(包括看涨和看跌标识), 可以通过 ak.option_cffex_sz50_spot_sina 中的 call-标识 获取 | string |   true   | ho2303P2350 |        |

### 命令示例

`rphq_sz50zs`
<IStockShellDemo cmd='rphq_sz50zs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rphq_hs300zs 日频行情-沪深300指数

中金所-沪深300指数-指定合约-日频行情

### 用法

`rphq_hs300zs [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                           |  类型  | 是否可选 |   默认值    | 可选值 |
| :-----------------: | :----: | :----------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :---------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;io2202P4350&quot;; 具体合约代码(包括看涨和看跌标识), 可以通过 ak.option_cffex_hs300_spot_sina 中的 call-标识 获取 | string |   true   | io2202P4350 |        |

### 命令示例

`rphq_hs300zs`
<IStockShellDemo cmd='rphq_hs300zs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rphq_zz1000zs 日频行情-中证1000指数

中金所-中证1000指数-指定合约-日频行情

### 用法

`rphq_zz1000zs [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                            |  类型  | 是否可选 |   默认值    | 可选值 |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :---------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;mo2208P6200&quot;; 具体合约代码(包括看涨和看跌标识), 可以通过 ak.option_cffex_zz1000_spot_sina 中的 call-标识 获取 | string |   true   | mo2208P6200 |        |

### 命令示例

`rphq_zz1000zs`
<IStockShellDemo cmd='rphq_zz1000zs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hydqyflb 合约到期月份列表

获取期权-上交所-50ETF-合约到期月份列表

### 用法

`hydqyflb [-symbol [symbol]] [-exchange [exchange]]`

### 选项

|        选项参数         |   名称   | 描述                                                              |  类型  | 是否可选 | 默认值 | 可选值 |
| :---------------------: | :------: | :---------------------------------------------------------------- | :----: | :------: | :----: | :----: |
|   `-symbol，--symbol`   |  symbol  | symbol=&quot;50ETF&quot;; &quot;50ETF&quot; or &quot;300ETF&quot; | string |   true   | 50ETF  |        |
| `-exchange，--exchange` | exchange | exchange=&quot;null&quot;                                         | string |   true   |  null  |        |

### 命令示例

`hydqyflb`
<IStockShellDemo cmd='hydqyflb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hydqyflb 合约到期月份列表

获取指定到期月份指定品种的剩余到期时间

### 用法

`hydqyflb [-trade_date [trade_date]] [-symbol [symbol]] [-exchange [exchange]]`

### 选项

|          选项参数           |    名称    | 描述                                                              |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------------------: | :--------: | :---------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-trade_date，--trade_date` | trade_date | trade_date=&quot;202002&quot;;                                    | string |   true   | 202002 |        |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;50ETF&quot;; &quot;50ETF&quot; or &quot;300ETF&quot; | string |   true   | 50ETF  |        |
|   `-exchange，--exchange`   |  exchange  | exchange=&quot;null&quot;                                         | string |   true   |  null  |        |

### 命令示例

`hydqyflb`
<IStockShellDemo cmd='hydqyflb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## syhyddm 所有合约的代码

新浪期权-看涨看跌合约合约的代码

### 用法

`syhyddm [-symbol [symbol]] [-trade_date [trade_date]] [-underlying [underlying]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                          |  类型  | 是否可选 |  默认值  |      可选值       |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :---------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;看涨期权&quot;; choice of &#123;&quot;看涨期权&quot;, &quot;看跌期权&quot;&#125; | string |   true   | 看涨期权 | 看涨期权,看跌期权 |
| `-trade_date，--trade_date` | trade_date | trade_date=&quot;202002&quot;;                                                                | string |   true   |  202002  |                   |
| `-underlying，--underlying` | underlying | underlying=&quot;510300&quot;                                                                 | string |   true   |  510300  |                   |

### 命令示例

`syhyddm`
<IStockShellDemo cmd='syhyddm' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sssj 实时数据

期权实时数据

### 用法

`sssj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;10002273&quot; | string |   true   | 10002273 |        |

### 命令示例

`sssj`
<IStockShellDemo cmd='sssj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qqbdwdsssj 期权标的物的实时数据

获取期权标的物的实时数据

### 用法

`qqbdwdsssj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;sh510300&quot; | string |   true   | sh510300 |        |

### 命令示例

`qqbdwdsssj`
<IStockShellDemo cmd='qqbdwdsssj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qqxlzmxxb 期权希腊字母信息表

新浪财经-期权希腊字母信息表

### 用法

`qqxlzmxxb [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;10002273&quot; | string |   true   | 10002273 |        |

### 命令示例

`qqxlzmxxb`
<IStockShellDemo cmd='qqxlzmxxb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qqhqfzsj 期权行情分钟数据

期权行情分钟数据, 只能返还当天的分钟数据

### 用法

`qqhqfzsj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;10002273&quot; | string |   true   | 10002273 |        |

### 命令示例

`qqhqfzsj`
<IStockShellDemo cmd='qqhqfzsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qqhqrsj 期权行情日数据

期权行情日数据

### 用法

`qqhqrsj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;10002273&quot; | string |   true   | 10002273 |        |

### 命令示例

`qqhqrsj`
<IStockShellDemo cmd='qqhqrsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qqhqfssj_xl 期权行情分时数据-新浪

新浪财经-金融期权-股票期权分时行情数据

### 用法

`qqhqfssj_xl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                      |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;10002530&quot;; 通过 \*\*ak.option_sse_codes_sina()\*\* 获取 | string |   true   | 10002530 |        |

### 命令示例

`qqhqfssj_xl`
<IStockShellDemo cmd='qqhqfssj_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qqhqfssj_dc 期权行情分时数据-东财

东方财富网-行情中心-期权市场-分时行情

### 用法

`qqhqfssj_dc [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                       |  类型  | 是否可选 |    默认值     | 可选值 |
| :-----------------: | :----: | :------------------------------------------------------------------------- | :----: | :------: | :-----------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;MO2402-C-5400&quot;; 通过 \*\*ak.option_current_em()\*\* 获取 | string |   true   | MO2402-C-5400 |        |

### 命令示例

`qqhqfssj_dc`
<IStockShellDemo cmd='qqhqfssj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qqsshq_dfcf 期权实时行情-东方财富

东方财富网-行情中心-期权市场

### 用法

`qqsshq_dfcf`

### 命令示例

`qqsshq_dfcf`
<IStockShellDemo cmd='qqsshq_dfcf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qqlhb_jrqq 期权龙虎榜-金融期权

东方财富网-数据中心-期货期权-期权龙虎榜单-金融期权

### 用法

`qqlhb_jrqq [-symbol [symbol]] [-indicator [indicator]] [-trade_date [trade_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                                                                                                   |  类型  | 是否可选 |         默认值          |                                             可选值                                              |
| :-------------------------: | :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :---------------------: | :---------------------------------------------------------------------------------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;510050&quot;; choice of &#123;&quot;510050&quot;, &quot;510300&quot;, &quot;159919&quot;&#125;                                                                                                            | string |   true   |         510050          |                                      510050,510300,159919                                       |
|  `-indicator，--indicator`  | indicator  | indicator=&quot;期权交易情况-认沽交易量&quot;; choice of &#123;&quot;期权交易情况-认沽交易量&quot;,&quot;期权持仓情况-认沽持仓量&quot;, &quot;期权交易情况-认购交易量&quot;, &quot;期权持仓情况-认购持仓量&quot;&#125; | string |   true   | 期权交易情况-认沽交易量 | 期权交易情况-认沽交易量,期权持仓情况-认沽持仓量,期权交易情况-认购交易量,期权持仓情况-认购持仓量 |
| `-trade_date，--trade_date` | trade_date | trade_date=&quot;20220121&quot;                                                                                                                                                                                        | string |   true   |        20220121         |                                                                                                 |

### 命令示例

`qqlhb_jrqq`
<IStockShellDemo cmd='qqlhb_jrqq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qqjzfx_jrqq 期权价值分析-金融期权

东方财富网-数据中心-特色数据-期权价值分析

### 用法

`qqjzfx_jrqq`

### 命令示例

`qqjzfx_jrqq`
<IStockShellDemo cmd='qqjzfx_jrqq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qqfxfx_jrqq 期权风险分析-金融期权

东方财富网-数据中心-特色数据-期权风险分析

### 用法

`qqfxfx_jrqq`

### 命令示例

`qqfxfx_jrqq`
<IStockShellDemo cmd='qqfxfx_jrqq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qqzyj_jrqq 期权折溢价-金融期权

东方财富网-数据中心-特色数据-期权折溢价

### 用法

`qqzyj_jrqq`

### 命令示例

`qqzyj_jrqq`
<IStockShellDemo cmd='qqzyj_jrqq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dqhy 当前合约

新浪财经-商品期权当前在交易的合约

### 用法

`dqhy [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;玉米期权&quot; | string |   true   | 玉米期权 |        |

### 命令示例

`dqhy`
<IStockShellDemo cmd='dqhy' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dqhy 当前合约

新浪财经-商品期权的 T 型报价表

### 用法

`dqhy [-symbol [symbol]] [-contract [contract]]`

### 选项

|        选项参数         |   名称   | 描述                                                                               |  类型  | 是否可选 |  默认值  | 可选值 |
| :---------------------: | :------: | :--------------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
|   `-symbol，--symbol`   |  symbol  | symbol=&quot;玉米期权&quot;                                                        | string |   true   | 玉米期权 |        |
| `-contract，--contract` | contract | contract=&quot;au2204&quot;; 可以通过 ak.option_commodity_contract_sina() 接口获取 | string |   true   |  au2204  |        |

### 命令示例

`dqhy`
<IStockShellDemo cmd='dqhy' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshq 历史行情

新浪财经-商品期权的历史行情数据-日频率

### 用法

`lshq [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                               |  类型  | 是否可选 |   默认值   | 可选值 |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------- | :----: | :------: | :--------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;au2012C328&quot;; 可以通过 ak.option_commodity_contract_table_sina() 获取具体合约代码 | string |   true   | au2012C328 |        |

### 命令示例

`lshq`
<IStockShellDemo cmd='lshq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## spqqsxf 商品期权手续费

九期网-商品期权手续费数据

### 用法

`spqqsxf [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                        |  类型  | 是否可选 |   默认值   | 可选值 |
| :-----------------: | :----: | :-------------------------------------------------------------------------- | :----: | :------: | :--------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;工业硅期权&quot;; 可以通过 ak.option_comm_symbol() 所有 symbol | string |   true   | 工业硅期权 |        |

### 命令示例

`spqqsxf`
<IStockShellDemo cmd='spqqsxf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## spqqbzj 商品期权保证金

唯爱期货-期权保证金

### 用法

`spqqbzj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                    |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;原油&quot;; 可以通过 ak.option_margin_symbol() 所有 symbol | string |   true   |  原油  |        |

### 命令示例

`spqqbzj`
<IStockShellDemo cmd='spqqbzj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## shqhjys 上海期货交易所

上海期货交易所-商品期权数据

### 用法

`shqhjys [-symbol [symbol]] [-trade_date [trade_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                                                                                                                                                                                              |  类型  | 是否可选 |  默认值  |                                                       可选值                                                       |
| :-------------------------: | :--------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----------------------------------------------------------------------------------------------------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;铜期权&quot;; choice of &#123;&#39;原油期权&#39;, &#39;铜期权&#39;, &#39;铝期权&#39;, &#39;锌期权&#39;, &#39;铅期权&#39;, &#39;螺纹钢期权&#39;, &#39;镍期权&#39;, &#39;锡期权&#39;, &#39;氧化铝期权&#39;, &#39;黄金期权&#39;, &#39;白银期权&#39;, &#39;丁二烯橡胶期权&#39;, &#39;天胶期权&#39;&#125; | string |   true   |  铜期权  | 原油期权,铜期权,铝期权,锌期权,铅期权,螺纹钢期权,镍期权,锡期权,氧化铝期权,黄金期权,白银期权,丁二烯橡胶期权,天胶期权 |
| `-trade_date，--trade_date` | trade_date | trade_date=&quot;20191017&quot;                                                                                                                                                                                                                                                                                   | string |   true   | 20191017 |                                                                                                                    |

### 命令示例

`shqhjys`
<IStockShellDemo cmd='shqhjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dlspjys 大连商品交易所

大连商品交易所-商品期权数据

### 用法

`dlspjys [-symbol [symbol]] [-trade_date [trade_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;玉米期权&quot;     | string |   true   | 玉米期权 |        |
| `-trade_date，--trade_date` | trade_date | trade_date=&quot;20191017&quot; | string |   true   | 20191017 |        |

### 命令示例

`dlspjys`
<IStockShellDemo cmd='dlspjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zzspjys 郑州商品交易所

郑州商品交易所-商品期权数据

### 用法

`zzspjys [-symbol [symbol]] [-trade_date [trade_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :---------------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;白糖期权&quot;; 交易所上市的期权品种，最早上市的为 20170419 的白糖期权 | string |   true   | 白糖期权 |        |
| `-trade_date，--trade_date` | trade_date | trade_date=&quot;20191017&quot;                                                     | string |   true   | 20191017 |        |

### 命令示例

`zzspjys`
<IStockShellDemo cmd='zzspjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gzqhjys 广州期货交易所

广州期货交易所-商品期权数据

### 用法

`gzqhjys [-symbol [symbol]] [-trade_date [trade_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                    |  类型  | 是否可选 |  默认值  |    可选值     |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-----------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;工业硅&quot;; choice of &#123;&quot;工业硅&quot;, &quot;碳酸锂&quot;&#125; | string |   true   |  工业硅  | 工业硅,碳酸锂 |
| `-trade_date，--trade_date` | trade_date | trade_date=&quot;20230724&quot;; 交易日                                                 | string |   true   | 20230724 |               |

### 命令示例

`gzqhjys`
<IStockShellDemo cmd='gzqhjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gzqhjys_yhbdckz 广州期货交易所-隐含波动参考值

广州期货交易所-商品期权数据-隐含波动参考值

### 用法

`gzqhjys_yhbdckz [-symbol [symbol]] [-trade_date [trade_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                    |  类型  | 是否可选 |  默认值  |    可选值     |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-----------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;工业硅&quot;; choice of &#123;&quot;工业硅&quot;, &quot;碳酸锂&quot;&#125; | string |   true   |  工业硅  | 工业硅,碳酸锂 |
| `-trade_date，--trade_date` | trade_date | trade_date=&quot;20230724&quot;                                                         | string |   true   | 20230724 |               |

### 命令示例

`gzqhjys_yhbdckz`
<IStockShellDemo cmd='gzqhjys_yhbdckz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lssj 历史数据

郑州商品交易所的商品期权历史行情数据

### 用法

`lssj [-year [year]] [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |  类型  | 是否可选 | 默认值 |                                                                                       可选值                                                                                        |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|   `-year，--year`   |  year  | year=&quot;2019&quot;; 指定年份                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | string |   true   |  2019  |                                                                                                                                                                                     |
| `-symbol，--symbol` | symbol | symbol=&quot;SR&quot;; choice of &#123;&quot;白糖&quot;: &quot;SR&quot;, &quot;棉花&quot;: &quot;CF&quot;, &quot;PTA&quot;: &quot;TA&quot;, &quot;甲醇&quot;: &quot;MA&quot;, &quot;菜籽粕&quot;: &quot;RM&quot;, &quot;动力煤&quot;: &quot;ZC&quot;, &quot;菜籽油&quot;: &quot;OI&quot;, &quot;花生&quot;: &quot;PK&quot;, &quot;对二甲苯&quot;: &quot;PX&quot;, &quot;烧碱&quot;: &quot;SH&quot;, &quot;纯碱&quot;: &quot;SA&quot;, &quot;短纤&quot;: &quot;PF&quot;, &quot;锰硅&quot;: &quot;SM&quot;, &quot;硅铁&quot;: &quot;SF&quot;, &quot;尿素&quot;: &quot;UR&quot;, &quot;苹果&quot;: &quot;AP&quot;, &quot;红枣&quot;: &quot;CJ&quot;, &quot;玻璃&quot;: &quot;FG&quot;, &quot;瓶片&quot;: &quot;PR&quot;&#125; | string |   true   |   SR   | 白糖: SR,棉花: CF,PTA: TA,甲醇: MA,菜籽粕: RM,动力煤: ZC,菜籽油: OI,花生: PK,对二甲苯: PX,烧碱: SH,纯碱: SA,短纤: PF,锰硅: SM,硅铁: SF,尿素: UR,苹果: AP,红枣: CJ,玻璃: FG,瓶片: PR |

### 命令示例

`lssj`
<IStockShellDemo cmd='lssj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
