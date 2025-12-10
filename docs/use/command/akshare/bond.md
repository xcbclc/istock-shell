---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---

# akshare

## zqcx 债券查询

中国外汇交易中心暨全国银行间同业拆借中心-数据-债券信息-信息查询

### 用法

`zqcx [-bond_name <bond_name>] [-bond_code <bond_code>] [-bond_issue <bond_issue>] [-bond_type <bond_type>] [-coupon_type <coupon_type>] [-issue_year <issue_year>] [-underwriter <underwriter>] [-grade <grade>]`

### 选项

|           选项参数            |    名称     | 描述                                                                          |  类型  | 是否可选 | 默认值 | 可选值 |
| :---------------------------: | :---------: | :---------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
|   `-bond_name，--bond_name`   |  bond_name  | bond_name=&quot;&quot;; 默认为空                                              | string |   true   |        |        |
|   `-bond_code，--bond_code`   |  bond_code  | bond_code=&quot;&quot;; 默认为空                                              | string |   true   |        |        |
|  `-bond_issue，--bond_issue`  | bond_issue  | bond_issue=&quot;&quot;; 默认为空, 通过 ak.bond_info_cm_query() 查询相关参数  | string |   true   |        |        |
|   `-bond_type，--bond_type`   |  bond_type  | bond_type=&quot;&quot;; 默认为空, 通过 ak.bond_info_cm_query() 查询相关参数   | string |   true   |        |        |
| `-coupon_type，--coupon_type` | coupon_type | coupon_type=&quot;&quot;; 默认为空, 通过 ak.bond_info_cm_query() 查询相关参数 | string |   true   |        |        |
|  `-issue_year，--issue_year`  | issue_year  | issue_year=&quot;&quot;; 默认为空                                             | string |   true   |        |        |
| `-underwriter，--underwriter` | underwriter | underwriter=&quot;&quot;; 默认为空, 通过 ak.bond_info_cm_query() 查询相关参数 | string |   true   |        |        |
|       `-grade，--grade`       |    grade    | grade=&quot;&quot;; 默认为空                                                  | string |   true   |        |        |

### 命令示例

`zqcx`
<IStockShellDemo cmd='zqcx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zqjcxx 债券基础信息

中国外汇交易中心暨全国银行间同业拆借中心-数据-债券信息-信息查询-债券详情

### 用法

`zqjcxx [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                     |  类型  | 是否可选 |     默认值      | 可选值 |
| :-----------------: | :----: | :----------------------------------------------------------------------- | :----: | :------: | :-------------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;19万林投资CP001&quot;; 通过 ak.bond_info_cm() 查询 债券简称 | string |   true   | 19万林投资CP001 |        |

### 命令示例

`zqjcxx`
<IStockShellDemo cmd='zqjcxx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zqxqscgl 债券现券市场概览

上登债券信息网-市场数据-市场统计-市场概览-债券现券市场概览

### 用法

`zqxqscgl [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&#39;20200111&#39; | string |   true   | 20200111 |        |

### 命令示例

`zqxqscgl`
<IStockShellDemo cmd='zqxqscgl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zqcjgl 债券成交概览

上登债券信息网-市场数据-市场统计-市场概览-债券成交概览

### 用法

`zqcjgl [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&#39;20200104&#39; | string |   true   | 20200104 |        |

### 命令示例

`zqcjgl`
<IStockShellDemo cmd='zqcjgl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yhjsczqfxjcsj 银行间市场债券发行基础数据

中国银行间市场交易商协会-非金融企业债务融资工具注册信息系统

### 用法

`yhjsczqfxjcsj [-page [page]]`

### 选项

|    选项参数     | 名称 | 描述                                   |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------: | :--: | :------------------------------------- | :----: | :------: | :----: | :----: |
| `-page，--page` | page | page=&quot;1&quot;, 需要获取第 page 页 | string |   true   |   1    |        |

### 命令示例

`yhjsczqfxjcsj`
<IStockShellDemo cmd='yhjsczqfxjcsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xqsczsbj 现券市场做市报价

中国外汇交易中心暨全国银行间同业拆借中心-市场数据-市场行情-债券市场行情-现券市场做市报价

### 用法

`xqsczsbj`

### 命令示例

`xqsczsbj`
<IStockShellDemo cmd='xqsczsbj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xqsccjhq 现券市场成交行情

中国外汇交易中心暨全国银行间同业拆借中心-市场数据-市场行情-债券市场行情-现券市场成交行情

### 用法

`xqsccjhq`

### 命令示例

`xqsccjhq`
<IStockShellDemo cmd='xqsccjhq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gzjqtzqsylqx 国债及其他债券收益率曲线

中国债券信息网-国债及其他债券收益率曲线

### 用法

`gzjqtzqsylqx [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                               |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :--------------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;20190204&quot;, 指定开始日期; start_date 到 end_date 需要小于一年 | string |   true   | 20190204 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20200204&quot;, 指定结束日期; start_date 到 end_date 需要小于一年   | string |   true   | 20200204 |        |

### 命令示例

`gzjqtzqsylqx`
<IStockShellDemo cmd='gzjqtzqsylqx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj 实时行情数据

新浪财经-债券-沪深债券-实时行情数据

### 用法

`sshqsj [-start_page [start_page]] [-end_page [end_page]]`

### 选项

|          选项参数           |    名称    | 描述                                                     |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------------------: | :--------: | :------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-start_page，--start_page` | start_page | start_page=&quot;1&quot;; 开始获取的页面，每页 80 条数据 | string |   true   |   1    |        |
|   `-end_page，--end_page`   |  end_page  | end_page=&quot;10&quot;; 结束获取的页面，每页 80 条数据  | string |   true   |   10   |        |

### 命令示例

`sshqsj`
<IStockShellDemo cmd='sshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj 历史行情数据

新浪财经-债券-沪深债券-历史行情数据, 历史数据按日频率更新

### 用法

`lshqsj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;sh010107&quot; | string |   true   | sh010107 |        |

### 命令示例

`lshqsj`
<IStockShellDemo cmd='lshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzz_xqzl 可转债-详情资料

新浪财经-债券-可转债-详情资料

### 用法

`kzz_xqzl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                              |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;sz128039&quot;; 带市场标识的转债代码 | string |   true   | sz128039 |        |

### 命令示例

`kzz_xqzl`
<IStockShellDemo cmd='kzz_xqzl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzz_zqgk 可转债-债券概况

新浪财经-债券-可转债-债券概况

### 用法

`kzz_zqgk [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                              |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :------------------------------------------------ | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;sh155255&quot;; 带市场标识的转债代码 | string |   true   | sh155255 |        |

### 命令示例

`kzz_zqgk`
<IStockShellDemo cmd='kzz_zqgk' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sshqsj 实时行情数据

新浪财经-沪深可转债数据

### 用法

`sshqsj`

### 命令示例

`sshqsj`
<IStockShellDemo cmd='sshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj_rp 历史行情数据-日频

新浪财经-历史行情数据，日频率更新, 新上的标的需要次日更新数据

### 用法

`lshqsj_rp [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                        |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------: | :----: | :-------------------------- | :----: | :------: | :------: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;sh113542&quot; | string |   true   | sh113542 |        |

### 命令示例

`lshqsj_rp`
<IStockShellDemo cmd='lshqsj_rp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj_fs 历史行情数据-分时

东方财富网-可转债-分时行情

### 用法

`lshqsj_fs [-symbol [symbol]] [-period [period]] [-adjust <adjust>] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                                                                              |  类型  | 是否可选 |       默认值        |    可选值    |
| :-------------------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :-----------------: | :----------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&#39;sz123106&#39;; 转债代码                                                                                                                                                               | string |   true   |      sz123106       |              |
|     `-period，--period`     |   period   | period=&#39;5&#39;; choice of &#123;&#39;1&#39;, &#39;5&#39;, &#39;15&#39;, &#39;30&#39;, &#39;60&#39;&#125;; 其中 1 分钟数据返回近 1 个交易日数据且不复权                                        | string |   true   |          5          | 1,5,15,30,60 |
|     `-adjust，--adjust`     |   adjust   | adjust=&#39;&#39;; choice of &#123;&#39;&#39;, &#39;qfq&#39;, &#39;hfq&#39;&#125;; &#39;&#39;: 不复权, &#39;qfq&#39;: 前复权, &#39;hfq&#39;: 后复权, 其中 1 分钟数据返回近 1 个交易日数据且不复权 | string |   true   |                     |   ,qfq,hfq   |
| `-start_date，--start_date` | start_date | start_date=&quot;1979-09-01 09:32:00&quot;; 日期时间; 默认返回所有数据                                                                                                                            | string |   true   | 1979-09-01 09:32:00 |              |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;2222-01-01 09:32:00&quot;; 日期时间; 默认返回所有数据                                                                                                                              | string |   true   | 2222-01-01 09:32:00 |              |

### 命令示例

`lshqsj_fs`
<IStockShellDemo cmd='lshqsj_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lshqsj_pqfs 历史行情数据-盘前分时

东方财富网-可转债-分时行情-盘前分时

### 用法

`lshqsj_pqfs`

### 命令示例

`lshqsj_pqfs`
<IStockShellDemo cmd='lshqsj_pqfs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzzsjylb 可转债数据一览表

东方财富网-数据中心-新股数据-可转债数据一览表

### 用法

`kzzsjylb`

### 命令示例

`kzzsjylb`
<IStockShellDemo cmd='kzzsjylb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzzxq 可转债详情

东方财富网-数据中心-新股数据-可转债详情

### 用法

`kzzxq [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                                                                  |  类型  | 是否可选 |  默认值  |              可选值               |
| :-----------------------: | :-------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-------------------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;123121&quot;; 可转债代码                                                                                                                                                                 | string |   true   |  123121  |                                   |
| `-indicator，--indicator` | indicator | indicator=&quot;基本信息&quot;; choice of &#123;&quot;基本信息&quot;, &quot;中签号&quot;, &quot;筹资用途&quot;, &quot;重要日期&quot;&#125;, 其中 &quot;可转债重要条款&quot; 在 &quot;基本信息中&quot; | string |   true   | 基本信息 | 基本信息,中签号,筹资用途,重要日期 |

### 命令示例

`kzzxq`
<IStockShellDemo cmd='kzzxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzzxq_ths 可转债详情-同花顺

同花顺-数据中心-可转债

### 用法

`kzzxq_ths`

### 命令示例

`kzzxq_ths`
<IStockShellDemo cmd='kzzxq_ths' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzzbjb 可转债比价表

东方财富网-行情中心-债券市场-可转债比价表

### 用法

`kzzbjb`

### 命令示例

`kzzbjb`
<IStockShellDemo cmd='kzzbjb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzzjzfx 可转债价值分析

东方财富网-行情中心-新股数据-可转债数据-可转债价值分析

### 用法

`kzzjzfx [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                  |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;113527&quot;; 可转债代码 | string |   true   | 113527 |        |

### 命令示例

`kzzjzfx`
<IStockShellDemo cmd='kzzjzfx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzzyjlfx 可转债溢价率分析

东方财富网-行情中心-新股数据-可转债数据-可转债溢价率分析

### 用法

`kzzyjlfx [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                  |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;113527&quot;; 可转债代码 | string |   true   | 113527 |        |

### 命令示例

`kzzyjlfx`
<IStockShellDemo cmd='kzzyjlfx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## szzyshg 上证质押式回购

东方财富网-行情中心-债券市场-上证质押式回购

### 用法

`szzyshg`

### 命令示例

`szzyshg`
<IStockShellDemo cmd='szzyshg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## szzyshg 深证质押式回购

东方财富网-行情中心-债券市场-深证质押式回购

### 用法

`szzyshg`

### 命令示例

`szzyshg`
<IStockShellDemo cmd='szzyshg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zyshglssj 质押式回购历史数据

东方财富网-行情中心-债券市场-质押式回购-历史数据

### 用法

`zyshglssj [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                      |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :---------------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;204001&quot;; 质押式回购代码 | string |   true   | 204001 |        |

### 命令示例

`zyshglssj`
<IStockShellDemo cmd='zyshglssj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzzsssj_jsl 可转债实时数据-集思录

集思录可转债实时数据，包含行情数据（涨跌幅，成交量和换手率等）及可转债基本信息（转股价，溢价率和到期收益率等）

### 用法

`kzzsssj_jsl [-cookie <cookie>]`

### 选项

|      选项参数       |  名称  | 描述                                                                                  |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------------------------------------------------------------------ | :----: | :------: | :----: | :----: |
| `-cookie，--cookie` | cookie | cookie=&#39;&#39;; 此处输入您的集思录 cookie 就可以获取完整数据，否则只能返回前 30 条 | string |   true   |        |        |

### 命令示例

`kzzsssj_jsl`
<IStockShellDemo cmd='kzzsssj_jsl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzzqs 可转债强赎

集思录可转债-强赎

### 用法

`kzzqs`

### 命令示例

`kzzqs`
<IStockShellDemo cmd='kzzqs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jslkzzdqzs 集思录可转债等权指数

可转债-集思录可转债等权指数

### 用法

`jslkzzdqzs`

### 命令示例

`jslkzzdqzs`
<IStockShellDemo cmd='jslkzzdqzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzzzgjgdzjl_jsl 可转债转股价格调整记录-集思录

集思录-单个可转债的转股价格-调整记录

### 用法

`kzzzgjgdzjl_jsl [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                  |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :------------------------------------ | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;128013&quot;; 可转债代码 | string |   true   | 128013 |        |

### 命令示例

`kzzzgjgdzjl_jsl`
<IStockShellDemo cmd='kzzzgjgdzjl_jsl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## spsylqxlssj 收盘收益率曲线历史数据

收盘收益率曲线历史数据, 该接口只能获取近 3 个月的数据，且每次获取的数据不超过 1 个月

### 用法

`spsylqxlssj [-symbol [symbol]] [-period [period]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                        |  类型  | 是否可选 |         默认值         |  可选值   |
| :-------------------------: | :--------: | :---------------------------------------------------------------------------------------------------------- | :----: | :------: | :--------------------: | :-------: |
|     `-symbol，--symbol`     |   symbol   | symbol=&quot;政策性金融债(进出口行)&quot;; 通过网页查询或调用 \*\*ak.bond_china_close_return_map()\*\* 获取 | string |   true   | 政策性金融债(进出口行) |           |
|     `-period，--period`     |   period   | period: str = &quot;1&quot;; 期限间隔, choice of &#123;&#39;0.1&#39;, &#39;0.5&#39;, &#39;1&#39;&#125;      | string |   true   |           1            | 0.1,0.5,1 |
| `-start_date，--start_date` | start_date | start_date=&quot;20231101&quot;; 结束日期, 结束日期和开始日期不要超过 1 个月                                | string |   true   |        20231101        |           |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20231101&quot;; 结束日期, 结束日期和开始日期不要超过 1 个月                                  | string |   true   |        20231101        |           |

### 命令示例

`spsylqxlssj`
<IStockShellDemo cmd='spsylqxlssj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zmgzsyl 中美国债收益率

东方财富网-数据中心-经济数据-中美国债收益率历史数据

### 用法

`zmgzsyl [-start_date [start_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;19901219&quot; | string |   true   | 19901219 |        |

### 命令示例

`zmgzsyl`
<IStockShellDemo cmd='zmgzsyl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gzfx 国债发行

巨潮资讯-数据中心-专题统计-债券报表-债券发行-国债发行

### 用法

`gzfx [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;20210911&quot; | string |   true   | 20210911 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20211110&quot;   | string |   true   | 20211110 |        |

### 命令示例

`gzfx`
<IStockShellDemo cmd='gzfx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dfzfx 地方债发行

巨潮资讯-数据中心-专题统计-债券报表-债券发行-地方债发行

### 用法

`dfzfx [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;20210911&quot; | string |   true   | 20210911 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20211110&quot;   | string |   true   | 20211110 |        |

### 命令示例

`dfzfx`
<IStockShellDemo cmd='dfzfx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qyzfx 企业债发行

巨潮资讯-数据中心-专题统计-债券报表-债券发行-企业债发行

### 用法

`qyzfx [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;20210911&quot; | string |   true   | 20210911 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20211110&quot;   | string |   true   | 20211110 |        |

### 命令示例

`qyzfx`
<IStockShellDemo cmd='qyzfx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzzfx 可转债发行

巨潮资讯-数据中心-专题统计-债券报表-债券发行-可转债发行

### 用法

`kzzfx [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                            |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :------------------------------ | :----: | :------: | :------: | :----: |
| `-start_date，--start_date` | start_date | start_date=&quot;20210913&quot; | string |   true   | 20210913 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20211112&quot;   | string |   true   | 20211112 |        |

### 命令示例

`kzzfx`
<IStockShellDemo cmd='kzzfx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kzzzg 可转债转股

巨潮资讯-数据中心-专题统计-债券报表-债券发行-可转债转股

### 用法

`kzzzg`

### 命令示例

`kzzzg`
<IStockShellDemo cmd='kzzzg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xzhzs 新综合指数

中国债券信息网-中债指数-中债指数族系-总指数-综合类指数-中债-新综合指数

### 用法

`xzhzs [-indicator [indicator]] [-period [period]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |  类型  | 是否可选 | 默认值 |                                                                                                                可选值                                                                                                                |
| :-----------------------: | :-------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `-indicator，--indicator` | indicator | indicator=&quot;财富&quot;; choice of &#123;&quot;全价&quot;, &quot;净价&quot;, &quot;财富&quot;, &quot;平均市值法久期&quot;, &quot;平均现金流法久期&quot;, &quot;平均市值法凸性&quot;, &quot;平均现金流法凸性&quot;, &quot;平均现金流法到期收益率&quot;, &quot;平均市值法到期收益率&quot;, &quot;平均基点价值&quot;, &quot;平均待偿期&quot;, &quot;平均派息率&quot;, &quot;指数上日总市值&quot;, &quot;财富指数涨跌幅&quot;, &quot;全价指数涨跌幅&quot;, &quot;净价指数涨跌幅&quot;, &quot;现券结算量&quot;&#125; | string |   true   |  财富  | 全价,净价,财富,平均市值法久期,平均现金流法久期,平均市值法凸性,平均现金流法凸性,平均现金流法到期收益率,平均市值法到期收益率,平均基点价值,平均待偿期,平均派息率,指数上日总市值,财富指数涨跌幅,全价指数涨跌幅,净价指数涨跌幅,现券结算量 |
|    `-period，--period`    |  period   | period=&quot;总值&quot;; choice of &#123;&quot;总值&quot;, &quot;1年以下&quot;, &quot;1-3年&quot;, &quot;3-5年&quot;, &quot;5-7年&quot;, &quot;7-10年&quot;, &quot;10年以上&quot;, &quot;0-3个月&quot;, &quot;3-6个月&quot;, &quot;6-9个月&quot;, &quot;9-12个月&quot;, &quot;0-6个月&quot;, &quot;6-12个月&quot;&#125;                                                                                                                                                                                            | string |   true   |  总值  |                                                                   总值,1年以下,1-3年,3-5年,5-7年,7-10年,10年以上,0-3个月,3-6个月,6-9个月,9-12个月,0-6个月,6-12个月                                                                   |

### 命令示例

`xzhzs`
<IStockShellDemo cmd='xzhzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zhzs 综合指数

中国债券信息网-中债指数-中债指数族系-总指数-综合类指数-中债-综合指数

### 用法

`zhzs [-indicator [indicator]] [-period [period]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |  类型  | 是否可选 | 默认值 |                                                                                                                可选值                                                                                                                |
| :-----------------------: | :-------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `-indicator，--indicator` | indicator | indicator=&quot;财富&quot;; choice of &#123;&quot;全价&quot;, &quot;净价&quot;, &quot;财富&quot;, &quot;平均市值法久期&quot;, &quot;平均现金流法久期&quot;, &quot;平均市值法凸性&quot;, &quot;平均现金流法凸性&quot;, &quot;平均现金流法到期收益率&quot;, &quot;平均市值法到期收益率&quot;, &quot;平均基点价值&quot;, &quot;平均待偿期&quot;, &quot;平均派息率&quot;, &quot;指数上日总市值&quot;, &quot;财富指数涨跌幅&quot;, &quot;全价指数涨跌幅&quot;, &quot;净价指数涨跌幅&quot;, &quot;现券结算量&quot;&#125; | string |   true   |  财富  | 全价,净价,财富,平均市值法久期,平均现金流法久期,平均市值法凸性,平均现金流法凸性,平均现金流法到期收益率,平均市值法到期收益率,平均基点价值,平均待偿期,平均派息率,指数上日总市值,财富指数涨跌幅,全价指数涨跌幅,净价指数涨跌幅,现券结算量 |
|    `-period，--period`    |  period   | period=&quot;总值&quot;; choice of &#123;&quot;总值&quot;, &quot;1年以下&quot;, &quot;1-3年&quot;, &quot;3-5年&quot;, &quot;5-7年&quot;, &quot;7-10年&quot;, &quot;10年以上&quot;, &quot;0-3个月&quot;, &quot;3-6个月&quot;, &quot;6-9个月&quot;, &quot;9-12个月&quot;, &quot;0-6个月&quot;, &quot;6-12个月&quot;&#125;                                                                                                                                                                                            | string |   true   |  总值  |                                                                   总值,1年以下,1-3年,3-5年,5-7年,7-10年,10年以上,0-3个月,3-6个月,6-9个月,9-12个月,0-6个月,6-12个月                                                                   |

### 命令示例

`zhzs`
<IStockShellDemo cmd='zhzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
