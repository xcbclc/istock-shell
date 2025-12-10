---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---

# akshare

## sshqsj 实时行情数据

东方财富网-行情中心-外汇市场-所有汇率-实时行情数据

### 用法

`sshqsj`

### 命令示例

`sshqsj`
<IStockShellDemo cmd='sshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj 历史行情数据

东方财富网-行情中心-外汇市场-所有汇率-历史行情数据

### 用法

`lshqsj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                    |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;USDCNH&quot;; 品种代码；可以通过 ak.forex_spot_em() 来获取所有可获取历史行情数据的品种代码 | string |   true   | USDCNH |        |

### 命令示例

`lshqsj`
<IStockShellDemo cmd='lshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rmbpjsj 人民币牌价数据

新浪财经-中行人民币牌价历史数据

### 用法

`rmbpjsj [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                                                                                                                                                                                                                                                        |  类型  | 是否可选 |  默认值  |                                                               可选值                                                               |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;美元&quot;; choice of &#123;&#39;美元&#39;, &#39;英镑&#39;, &#39;欧元&#39;, &#39;澳门元&#39;, &#39;泰国铢&#39;, &#39;菲律宾比索&#39;, &#39;港币&#39;, &#39;瑞士法郎&#39;, &#39;新加坡元&#39;, &#39;瑞典克朗&#39;, &#39;丹麦克朗&#39;, &#39;挪威克朗&#39;, &#39;日元&#39;, &#39;加拿大元&#39;, &#39;澳大利亚元&#39;, &#39;新西兰元&#39;, &#39;韩国元&#39;&#125; | string |   true   |   美元   | 美元,英镑,欧元,澳门元,泰国铢,菲律宾比索,港币,瑞士法郎,新加坡元,瑞典克朗,丹麦克朗,挪威克朗,日元,加拿大元,澳大利亚元,新西兰元,韩国元 |
| `-start_date，--start_date` | start_date | start_date=&quot;20230304&quot;; 开始日期和结束日期之间的间隔要超过 6 个月                                                                                                                                                                                                                                                                                                  | string |   true   | 20230304 |                                                                                                                                    |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20231110&quot;; 开始日期和结束日期之间的间隔要超过 6 个月                                                                                                                                                                                                                                                                                                    | string |   true   | 20231110 |                                                                                                                                    |

### 命令示例

`rmbpjsj`
<IStockShellDemo cmd='rmbpjsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rmbhlzjj 人民币汇率中间价

外汇管理局-人民币汇率中间价

### 用法

`rmbhlzjj`

### 命令示例

`rmbhlzjj`
<IStockShellDemo cmd='rmbhlzjj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rmbwhjqbj 人民币外汇即期报价

人民币外汇即期报价

### 用法

`rmbwhjqbj`

### 命令示例

`rmbwhjqbj`
<IStockShellDemo cmd='rmbwhjqbj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rmbwhydbj 人民币外汇远掉报价

人民币外汇远掉报价

### 用法

`rmbwhydbj`

### 命令示例

`rmbwhydbj`
<IStockShellDemo cmd='rmbwhydbj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## wbdjqbj 外币对即期报价

外币对即期报价

### 用法

`wbdjqbj`

### 命令示例

`wbdjqbj`
<IStockShellDemo cmd='wbdjqbj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zdbzdsyhbd 指定币种的所有货币对

指定币种的所有能够获取到的货币对信息，历史数据可以调用 **ak.currency_history()** 获取

### 用法

`zdbzdsyhbd [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                            |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;人民币&quot;; 此处提供中文的币种名称, 可以访问\[网页\](https://cn.investing.com/currencies/cny-jmd) 的页面下方查看 | string |   true   | 人民币 |        |

### 命令示例

`zdbzdsyhbd`
<IStockShellDemo cmd='zdbzdsyhbd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hbd_tjqxbg 货币对-投机情绪报告

货币对-投机情绪报告

### 用法

`hbd_tjqxbg [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                              |  类型  | 是否可选 |   默认值   | 可选值 |
| :-------------------------: | :--------: | :-------------------------------------------------------------------------------- | :----: | :------: | :--------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;2020-04-07&quot;; 所指定的日期必须在当前交易日之前的30个交易日内 | string |   true   | 2020-04-07 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;2020-04-07&quot;; 与 start_date 一致                               | string |   true   | 2020-04-07 |        |

### 命令示例

`hbd_tjqxbg`
<IStockShellDemo cmd='hbd_tjqxbg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## whhqbj 外汇行情报价

百度股市通-外汇-行情榜单

### 用法

`whhqbj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                            |  类型  | 是否可选 | 默认值 |   可选值    |
| :-----------------: | :----: | :------------------------------------------------------------------------------ | :----: | :------: | :----: | :---------: |
| `-symbol，--symbol` | symbol | symbol=&quot;人民币&quot;; choice of &#123;&quot;人民币&quot;, 美元&quot;&#125; | string |   true   | 人民币 | 人民币,美元 |

### 命令示例

`whhqbj`
<IStockShellDemo cmd='whhqbj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
