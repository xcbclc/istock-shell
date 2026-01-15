---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---
# akshare

## zssj_sshqsj_dc1 实时行情数据-东财 
东方财富网-行情中心-沪深京指数

### 用法

`zssj_sshqsj_dc1 [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;上证系列指数&quot;；choice of &#123;&quot;沪深重要指数&quot;, &quot;上证系列指数&quot;, &quot;深证系列指数&quot;, &quot;指数成份&quot;, &quot;中证系列指数&quot;&#125; | string | true | 上证系列指数 | 沪深重要指数,上证系列指数,深证系列指数,指数成份,中证系列指数 |

### 命令示例

`zssj_sshqsj_dc1`
<IStockShellDemo cmd='zssj_sshqsj_dc1' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_sshqsj_xl1 实时行情数据-新浪 
新浪财经-中国股票指数数据

### 用法

`zssj_sshqsj_xl1`



### 命令示例

`zssj_sshqsj_xl1`
<IStockShellDemo cmd='zssj_sshqsj_xl1' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_lshqsj_xl1 历史行情数据-新浪 
股票指数的历史数据按日频率更新

### 用法

`zssj_lshqsj_xl1 [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;sz399552&quot; | string | true | sz399552 |  |

### 命令示例

`zssj_lshqsj_xl1`
<IStockShellDemo cmd='zssj_lshqsj_xl1' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_lshqsj_tx 历史行情数据-腾讯 
股票指数(或者股票)历史行情数据

### 用法

`zssj_lshqsj_tx`



### 命令示例

`zssj_lshqsj_tx`
<IStockShellDemo cmd='zssj_lshqsj_tx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_lshqsj_dfcf 历史行情数据-东方财富 
东方财富股票指数数据, 历史数据按日频率更新

### 用法

`zssj_lshqsj_dfcf [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;sz399552&quot;; 支持 sz: 深交所, sh: 上交所, csi: 中证指数 + id(000905) | string | true | sz399552 |  |
| `-start_date，--start_date` | start_date | start\_date=&quot;19900101&quot; | string | true | 19900101 |  |
| `-end_date，--end_date` | end_date | end\_date=&quot;20500101&quot; | string | true | 20500101 |  |

### 命令示例

`zssj_lshqsj_dfcf`
<IStockShellDemo cmd='zssj_lshqsj_dfcf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_lshqsj_ty 历史行情数据-通用 
东方财富网-中国股票指数-行情数据

### 用法

`zssj_lshqsj_ty [-symbol [symbol]] [-period [period]] [-start_date [start_date]] [-end_date [end_date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;399282&quot;; 指数代码，此处不用市场标识 | string | true | 399282 |  |
| `-period，--period` | period | period=&quot;daily&quot;; choice of &#123;&#39;daily&#39;, &#39;weekly&#39;, &#39;monthly&#39;&#125; | string | true | daily | daily,weekly,monthly |
| `-start_date，--start_date` | start_date | start\_date=&quot;19700101&quot;; 开始日期 | string | true | 19700101 |  |
| `-end_date，--end_date` | end_date | end\_date=&quot;22220101&quot;; 结束时间 | string | true | 22220101 |  |

### 命令示例

`zssj_lshqsj_ty`
<IStockShellDemo cmd='zssj_lshqsj_ty' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_fshqsj 分时行情数据 
东方财富网-指数数据-分时行情

### 用法

`zssj_fshqsj [-symbol [symbol]] [-period [period]] [-start_date [start_date]] [-end_date [end_date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;399006&quot;; 指数代码，此处不用市场标识 | string | true | 399006 |  |
| `-period，--period` | period | period=&quot;1&quot;; choice of &#123;&#39;1&#39;, &#39;5&#39;, &#39;15&#39;, &#39;30&#39;, &#39;60&#39;&#125;, 其中 1 分钟数据只能返回当前的, 其余只能返回近期的数据 | string | true | 1 | 1,5,15,30,60 |
| `-start_date，--start_date` | start_date | start\_date=&quot;1979-09-01 09:32:00&quot;; 开始日期时间 | string | true | 1979-09-01 09:32:00 |  |
| `-end_date，--end_date` | end_date | end\_date=&quot;2222-01-01 09:32:00&quot;; 结束时间时间 | string | true | 2222-01-01 09:32:00 |  |

### 命令示例

`zssj_fshqsj`
<IStockShellDemo cmd='zssj_fshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_sshqsj_xl2 实时行情数据-新浪 
新浪财经-行情中心-港股指数

### 用法

`zssj_sshqsj_xl2`



### 命令示例

`zssj_sshqsj_xl2`
<IStockShellDemo cmd='zssj_sshqsj_xl2' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_lshqsj_xl2 历史行情数据-新浪 
新浪财经-港股指数-历史行情数据

### 用法

`zssj_lshqsj_xl2 [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;CES100&quot; | string | true | CES100 |  |

### 命令示例

`zssj_lshqsj_xl2`
<IStockShellDemo cmd='zssj_lshqsj_xl2' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_sshqsj_dc2 实时行情数据-东财 
东方财富网-行情中心-港股-指数实时行情

### 用法

`zssj_sshqsj_dc2`



### 命令示例

`zssj_sshqsj_dc2`
<IStockShellDemo cmd='zssj_sshqsj_dc2' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_lshqsj_dc 历史行情数据-东财 
东方财富网-港股-股票指数数据

### 用法

`zssj_lshqsj_dc [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;HSTECF2L&quot;; 可以通过 ak.stock\_hk\_index\_spot\_em() 获取 | string | true | HSTECF2L |  |

### 命令示例

`zssj_lshqsj_dc`
<IStockShellDemo cmd='zssj_lshqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zshq1 指数行情 
新浪财经-美股指数行情

### 用法

`zssj_zshq1 [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;.INX&quot;; choice of &#123;&quot;.IXIC&quot;, &quot;.DJI&quot;, &quot;.INX&quot;, &quot;.NDX&quot;&#125; | string | true | .INX | .IXIC,.DJI,.INX,.NDX |

### 命令示例

`zssj_zshq1`
<IStockShellDemo cmd='zssj_zshq1' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_qqzs_sshqsj 全球指数-实时行情数据 
东方财富网-行情中心-全球指数-实时行情数据

### 用法

`zssj_qqzs_sshqsj`



### 命令示例

`zssj_qqzs_sshqsj`
<IStockShellDemo cmd='zssj_qqzs_sshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_qqzs_lshqsj_dc 全球指数-历史行情数据-东财 
东方财富网-行情中心-全球指数-历史行情数据

### 用法

`zssj_qqzs_lshqsj_dc [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;美元指数&quot;; 可以通过 ak.index\_global\_spot\_em() 获取 | string | true | 美元指数 |  |

### 命令示例

`zssj_qqzs_lshqsj_dc`
<IStockShellDemo cmd='zssj_qqzs_lshqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_qqzs_lshqsj_xl 全球指数-历史行情数据-新浪 
新浪财经-行情中心-环球市场-历史行情

### 用法

`zssj_qqzs_lshqsj_xl [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;瑞士股票指数&quot;; 可以通过 ak.index\_global\_name\_table() 获取 | string | true | 瑞士股票指数 |  |

### 命令示例

`zssj_qqzs_lshqsj_xl`
<IStockShellDemo cmd='zssj_qqzs_lshqsj_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zxcf 最新成份 
指定指数的最新成份股票信息, 注意该接口返回的数据有部分是重复会导致数据缺失, 可以调用 **ak.index_stock_cons_sina()** 获取主流指数数据, 或调用**ak.index_stock_cons_csindex()**获取中证指数网提供的成分数据

### 用法

`zssj_zxcf`



### 命令示例

`zssj_zxcf`
<IStockShellDemo cmd='zssj_zxcf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zzzscfg 中证指数成份股 
中证指数网站-成份股目录

### 用法

`zssj_zzzscfg [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;000300&quot;; 指数代码 | string | true | 000300 |  |

### 命令示例

`zssj_zzzscfg`
<IStockShellDemo cmd='zssj_zzzscfg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zzzscfgqz 中证指数成份股权重 
中证指数网站-成份股权重

### 用法

`zssj_zzzscfgqz [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;000300&quot;; 指数代码 | string | true | 000300 |  |

### 命令示例

`zssj_zzzscfgqz`
<IStockShellDemo cmd='zssj_zzzscfgqz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_qbzs 全部指数 
国证指数-最近交易日的所有指数的代码和基本信息

### 用法

`zssj_qbzs`



### 命令示例

`zssj_qbzs`
<IStockShellDemo cmd='zssj_qbzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zshq2 指数行情 
国证指数-具体指数的日频率行情数据

### 用法

`zssj_zshq2 [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;399005&quot;; 从 ak.index\_all\_cni() 接口获取指数代码 | string | true | 399005 |  |
| `-start_date，--start_date` | start_date | start\_date=&quot;20230114&quot; | string | true | 20230114 |  |
| `-end_date，--end_date` | end_date | end\_date=&quot;20240114&quot; | string | true | 20240114 |  |

### 命令示例

`zssj_zshq2`
<IStockShellDemo cmd='zssj_zshq2' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zsybxq 指数样本详情 
国证指数-指数样本详情数据

### 用法

`zssj_zsybxq [-symbol [symbol]] [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&#39;399001&#39;; 从 \*\*ak.index\_all\_cni()\*\* 接口获取指数代码 | string | true | 399001 |  |
| `-date，--date` | date | date=&#39;202404&#39;; 指定年月 | string | true | 202404 |  |

### 命令示例

`zssj_zsybxq`
<IStockShellDemo cmd='zssj_zsybxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_lsyb 历史样本 
国证指数-历史样本数据

### 用法

`zssj_lsyb [-symbol [symbol]] [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&#39;399005&#39;; 从 \*\*ak.index\_all\_cni()\*\* 接口获取指数代码 | string | true | 399005 |  |
| `-date，--date` | date | date=&#39;202201&#39;, 默认空返回所有数据; date=&quot;202201&quot;, 则返回 2022 年 1 月的全部数据 | string | true | 202201 |  |

### 命令示例

`zssj_lsyb`
<IStockShellDemo cmd='zssj_lsyb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_lsty 历史调样 
国证指数-样本详情-历史调样

### 用法

`zssj_lsty [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&#39;399005&#39;; 从 \*\*ak.index\_all\_cni()\*\* 接口获取指数代码 | string | true | 399005 |  |

### 命令示例

`zssj_lsty`
<IStockShellDemo cmd='zssj_lsty' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_50etf_qqbdlzs 50ETF 期权波动率指数 
50ETF 期权波动率指数 QVIX; 又称中国版的恐慌指数

### 用法

`zssj_50etf_qqbdlzs`



### 命令示例

`zssj_50etf_qqbdlzs`
<IStockShellDemo cmd='zssj_50etf_qqbdlzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_50etf_qqbdlzs_fs 50ETF 期权波动率指数-分时 
50ETF 期权波动率指数-分时

### 用法

`zssj_50etf_qqbdlzs_fs`



### 命令示例

`zssj_50etf_qqbdlzs_fs`
<IStockShellDemo cmd='zssj_50etf_qqbdlzs_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_300etf_qqbdlzs 300ETF 期权波动率指数 
300ETF 期权波动率指数 QVIX

### 用法

`zssj_300etf_qqbdlzs`



### 命令示例

`zssj_300etf_qqbdlzs`
<IStockShellDemo cmd='zssj_300etf_qqbdlzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_300etf_qqbdlzs_fs 300ETF 期权波动率指数-分时 
300ETF 期权波动率指数-分时

### 用法

`zssj_300etf_qqbdlzs_fs`



### 命令示例

`zssj_300etf_qqbdlzs_fs`
<IStockShellDemo cmd='zssj_300etf_qqbdlzs_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_500etf_qqbdlzs 500ETF 期权波动率指数 
500ETF 期权波动率指数 QVIX

### 用法

`zssj_500etf_qqbdlzs`



### 命令示例

`zssj_500etf_qqbdlzs`
<IStockShellDemo cmd='zssj_500etf_qqbdlzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_500etf_qqbdlzs_fs 500ETF 期权波动率指数-分时 
500ETF 期权波动率指数-分时

### 用法

`zssj_500etf_qqbdlzs_fs`



### 命令示例

`zssj_500etf_qqbdlzs_fs`
<IStockShellDemo cmd='zssj_500etf_qqbdlzs_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_cyb_qqbdlzs 创业板 期权波动率指数 
创业板 期权波动率指数 QVIX

### 用法

`zssj_cyb_qqbdlzs`



### 命令示例

`zssj_cyb_qqbdlzs`
<IStockShellDemo cmd='zssj_cyb_qqbdlzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_cyb_qqbdlzs_fs 创业板 期权波动率指数-分时 
创业板 期权波动率指数-分时

### 用法

`zssj_cyb_qqbdlzs_fs`



### 命令示例

`zssj_cyb_qqbdlzs_fs`
<IStockShellDemo cmd='zssj_cyb_qqbdlzs_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_kcb_qqbdlzs 科创板 期权波动率指数 
科创板 期权波动率指数 QVIX

### 用法

`zssj_kcb_qqbdlzs`



### 命令示例

`zssj_kcb_qqbdlzs`
<IStockShellDemo cmd='zssj_kcb_qqbdlzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_kcb_qqbdlzs_fs 科创板 期权波动率指数-分时 
科创板 期权波动率指数-分时

### 用法

`zssj_kcb_qqbdlzs_fs`



### 命令示例

`zssj_kcb_qqbdlzs_fs`
<IStockShellDemo cmd='zssj_kcb_qqbdlzs_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_sz100etf_qqbdlzs 深证100ETF 期权波动率指数 
深证100ETF 期权波动率指数 QVIX

### 用法

`zssj_sz100etf_qqbdlzs`



### 命令示例

`zssj_sz100etf_qqbdlzs`
<IStockShellDemo cmd='zssj_sz100etf_qqbdlzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_sz100etf_qqbdlzs_fs 深证100ETF 期权波动率指数-分时 
深证100ETF 期权波动率指数-分时

### 用法

`zssj_sz100etf_qqbdlzs_fs`



### 命令示例

`zssj_sz100etf_qqbdlzs_fs`
<IStockShellDemo cmd='zssj_sz100etf_qqbdlzs_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zz300gz_qqbdlzs 中证300股指 期权波动率指数 
中证300股指 期权波动率指数 QVIX

### 用法

`zssj_zz300gz_qqbdlzs`



### 命令示例

`zssj_zz300gz_qqbdlzs`
<IStockShellDemo cmd='zssj_zz300gz_qqbdlzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zz300gz_qqbdlzs_fs 中证300股指 期权波动率指数-分时 
中证300股指 期权波动率指数-分时

### 用法

`zssj_zz300gz_qqbdlzs_fs`



### 命令示例

`zssj_zz300gz_qqbdlzs_fs`
<IStockShellDemo cmd='zssj_zz300gz_qqbdlzs_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zz1000gz_qqbdlzs 中证1000股指 期权波动率指数 
中证1000股指 期权波动率指数 QVIX

### 用法

`zssj_zz1000gz_qqbdlzs`



### 命令示例

`zssj_zz1000gz_qqbdlzs`
<IStockShellDemo cmd='zssj_zz1000gz_qqbdlzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zz1000gz_qqbdlzs_fs 中证1000股指 期权波动率指数-分时 
中证1000股指 期权波动率指数-分时

### 用法

`zssj_zz1000gz_qqbdlzs_fs`



### 命令示例

`zssj_zz1000gz_qqbdlzs_fs`
<IStockShellDemo cmd='zssj_zz1000gz_qqbdlzs_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_sz50gz_qqbdlzs 上证50股指 期权波动率指数 
上证50股指 期权波动率指数 QVIX

### 用法

`zssj_sz50gz_qqbdlzs`



### 命令示例

`zssj_sz50gz_qqbdlzs`
<IStockShellDemo cmd='zssj_sz50gz_qqbdlzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_sz50gz_qqbdlzs_fs 上证50股指 期权波动率指数-分时 
上证50股指 期权波动率指数-分时

### 用法

`zssj_sz50gz_qqbdlzs_fs`



### 命令示例

`zssj_sz50gz_qqbdlzs_fs`
<IStockShellDemo cmd='zssj_sz50gz_qqbdlzs_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_swyjhyxx 申万一级行业信息 
申万一级行业信息

### 用法

`zssj_swyjhyxx`



### 命令示例

`zssj_swyjhyxx`
<IStockShellDemo cmd='zssj_swyjhyxx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_swejhyxx 申万二级行业信息 
申万二级行业信息

### 用法

`zssj_swejhyxx`



### 命令示例

`zssj_swejhyxx`
<IStockShellDemo cmd='zssj_swejhyxx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_swsjhyxx 申万三级行业信息 
申万三级行业信息

### 用法

`zssj_swsjhyxx`



### 命令示例

`zssj_swsjhyxx`
<IStockShellDemo cmd='zssj_swsjhyxx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_swsjhycf 申万三级行业成份 
申万三级行业成份

### 用法

`zssj_swsjhycf [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;850111.SI&quot;; 行业代码; 可以通过 ak.sw\_index\_third\_info() 获取所有行业代码 | string | true | 850111.SI |  |

### 命令示例

`zssj_swsjhycf`
<IStockShellDemo cmd='zssj_swsjhycf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_spxhjgzs 商品现货价格指数 
新浪财经-商品现货价格指数

### 用法

`zssj_spxhjgzs`



### 命令示例

`zssj_spxhjgzs`
<IStockShellDemo cmd='zssj_spxhjgzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_ywxspzs 义乌小商品指数 
指定 symbol 的义乌小商品指数的近期历史数据

### 用法

`zssj_ywxspzs [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;周价格指数&quot;; choice of &#123;&quot;周价格指数&quot;, &quot;月价格指数&quot;, &quot;月景气指数&quot;&#125; | string | true | 周价格指数 | 周价格指数,月价格指数,月景气指数 |

### 命令示例

`zssj_ywxspzs`
<IStockShellDemo cmd='zssj_ywxspzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_kqfzpzs 柯桥纺织品指数 
指定 symbol 的柯桥纺织品指数的所有历史数据

### 用法

`zssj_kqfzpzs [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;价格指数&quot;; choice of &#123;&#39;价格指数&#39;, &#39;景气指数&#39;, &#39;外贸指数&#39;&#125; | string | true | 价格指数 | 价格指数,景气指数,外贸指数 |

### 命令示例

`zssj_kqfzpzs`
<IStockShellDemo cmd='zssj_kqfzpzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_kqsszs 柯桥时尚指数 
指定 symbol 的柯桥时尚指数的所有数据

### 用法

`zssj_kqsszs [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;柯桥时尚指数&quot;; choice of &#123;&#39;柯桥时尚指数&#39;, &#39;时尚创意指数&#39;, &#39;时尚设计人才数&#39;, &#39;新花型推出数&#39;, &#39;创意产品成交数&#39;, &#39;创意企业数量&#39;, &#39;时尚活跃度指数&#39;, &#39;电商运行数&#39;, &#39;时尚平台拓展数&#39;, &#39;新产品销售额占比&#39;, &#39;企业合作占比&#39;, &#39;品牌传播费用&#39;, &#39;时尚推广度指数&#39;, &#39;国际交流合作次数&#39;, &#39;企业参展次数&#39;, &#39;外商驻点数量变化&#39;, &#39;时尚评价指数&#39;&#125; | string | true | 柯桥时尚指数 | 柯桥时尚指数,时尚创意指数,时尚设计人才数,新花型推出数,创意产品成交数,创意企业数量,时尚活跃度指数,电商运行数,时尚平台拓展数,新产品销售额占比,企业合作占比,品牌传播费用,时尚推广度指数,国际交流合作次数,企业参展次数,外商驻点数量变化,时尚评价指数 |

### 命令示例

`zssj_kqsszs`
<IStockShellDemo cmd='zssj_kqsszs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zgstzs 中国食糖指数 
沐甜科技数据中心-中国食糖指数

### 用法

`zssj_zgstzs`



### 命令示例

`zssj_zgstzs`
<IStockShellDemo cmd='zssj_zgstzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_penjktgszs 配额内进口糖估算指数 
沐甜科技数据中心-配额内进口糖估算指数

### 用法

`zssj_penjktgszs`



### 命令示例

`zssj_penjktgszs`
<IStockShellDemo cmd='zssj_penjktgszs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_pewjktgszs 配额外进口糖估算指数 
沐甜科技数据中心-配额外进口糖估算指数

### 用法

`zssj_pewjktgszs`



### 命令示例

`zssj_pewjktgszs`
<IStockShellDemo cmd='zssj_pewjktgszs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_pwqzs 排污权指数 
浙江省排污权交易指数的数据

### 用法

`zssj_pwqzs [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;月度&quot;; choice of &#123;&quot;月度&quot;, &quot;季度&quot;&#125; | string | true | 月度 | 月度,季度 |

### 命令示例

`zssj_pwqzs`
<IStockShellDemo cmd='zssj_pwqzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_jzxzs 集装箱指数 
Drewry 集装箱指数的数据

### 用法

`zssj_jzxzs [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;composite&quot;; choice of &#123;&quot;composite&quot;, &quot;shanghai-rotterdam&quot;, &quot;rotterdam-shanghai&quot;, &quot;shanghai-los angeles&quot;, &quot;los angeles-shanghai&quot;, &quot;shanghai-genoa&quot;, &quot;new york-rotterdam&quot;, &quot;rotterdam-new york&quot;&#125; | string | true | composite | composite,shanghai-rotterdam,rotterdam-shanghai,shanghai-los angeles,los angeles-shanghai,shanghai-genoa,new york-rotterdam,rotterdam-new york |

### 命令示例

`zssj_jzxzs`
<IStockShellDemo cmd='zssj_jzxzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zgglwlyjzs 中国公路物流运价指数 
获取指定 symbol 的中国公路物流运价指数的数据

### 用法

`zssj_zgglwlyjzs [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;周指数&quot;; choice of &#123;&quot;周指数&quot;, &quot;月指数&quot;, &quot;季度指数&quot;, &quot;年度指数&quot;&#125; | string | true | 周指数 | 周指数,月指数,季度指数,年度指数 |

### 命令示例

`zssj_zgglwlyjzs`
<IStockShellDemo cmd='zssj_zgglwlyjzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zgglwlylzs 中国公路物流运量指数 
指定 symbol 的中国公路物流运量指数的数据

### 用法

`zssj_zgglwlylzs [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;周指数&quot;; choice of &#123;&quot;月指数&quot;, &quot;季度指数&quot;, &quot;年度指数&quot;&#125; | string | true | 周指数 | 月指数,季度指数,年度指数 |

### 命令示例

`zssj_zgglwlylzs`
<IStockShellDemo cmd='zssj_zgglwlylzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zzzs 中证指数 
中证指数日频率的数据

### 用法

`zssj_zzzs [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;000928&quot;; 指数代码 | string | true | 000928 |  |
| `-start_date，--start_date` | start_date | start\_date=&quot;20180526&quot; | string | true | 20180526 |  |
| `-end_date，--end_date` | end_date | end\_date=&quot;20240604&quot; | string | true | 20240604 |  |

### 命令示例

`zssj_zzzs`
<IStockShellDemo cmd='zssj_zzzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zh_pmi 综合 PMI 
财新数据-指数报告-财新中国 PMI-综合 PMI

### 用法

`zssj_zh_pmi`



### 命令示例

`zssj_zh_pmi`
<IStockShellDemo cmd='zssj_zh_pmi' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zzy_pmi 制造业 PMI 
财新数据-指数报告-财新中国 PMI-制造业 PMI

### 用法

`zssj_zzy_pmi`



### 命令示例

`zssj_zzy_pmi`
<IStockShellDemo cmd='zssj_zzy_pmi' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_fwy_pmi 服务业 PMI 
财新数据-指数报告-财新中国 PMI-服务业 PMI

### 用法

`zssj_fwy_pmi`



### 命令示例

`zssj_fwy_pmi`
<IStockShellDemo cmd='zssj_fwy_pmi' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_szjjzs 数字经济指数 
财新指数-数字经济指数

### 用法

`zssj_szjjzs`



### 命令示例

`zssj_szjjzs`
<IStockShellDemo cmd='zssj_szjjzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_cyzs 产业指数 
财新指数-产业指数

### 用法

`zssj_cyzs`



### 命令示例

`zssj_cyzs`
<IStockShellDemo cmd='zssj_cyzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_yczs 溢出指数 
财新指数-溢出指数

### 用法

`zssj_yczs`



### 命令示例

`zssj_yczs`
<IStockShellDemo cmd='zssj_yczs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_rhzs 融合指数 
财新指数-融合指数

### 用法

`zssj_rhzs`



### 命令示例

`zssj_rhzs`
<IStockShellDemo cmd='zssj_rhzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_jczs 基础指数 
财新指数-基础指数

### 用法

`zssj_jczs`



### 命令示例

`zssj_jczs`
<IStockShellDemo cmd='zssj_jczs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zgxjjzs 中国新经济指数 
财新指数-中国新经济指数

### 用法

`zssj_zgxjjzs`



### 命令示例

`zssj_zgxjjzs`
<IStockShellDemo cmd='zssj_zgxjjzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_ldltrzs 劳动力投入指数 
财新指数-劳动力投入指数

### 用法

`zssj_ldltrzs`



### 命令示例

`zssj_ldltrzs`
<IStockShellDemo cmd='zssj_ldltrzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zbtrzs 资本投入指数 
财新指数-资本投入指数

### 用法

`zssj_zbtrzs`



### 命令示例

`zssj_zbtrzs`
<IStockShellDemo cmd='zssj_zbtrzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_kjtrzs 科技投入指数 
财新指数-科技投入指数

### 用法

`zssj_kjtrzs`



### 命令示例

`zssj_kjtrzs`
<IStockShellDemo cmd='zssj_kjtrzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_xjjhyrzpjgzsp 新经济行业入职平均工资水平 
财新指数-新经济行业入职平均工资水平

### 用法

`zssj_xjjhyrzpjgzsp`



### 命令示例

`zssj_xjjhyrzpjgzsp`
<IStockShellDemo cmd='zssj_xjjhyrzpjgzsp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_xjjrzgzyjsp 新经济入职工资溢价水平 
财新指数-新经济入职工资溢价水平

### 用法

`zssj_xjjrzgzyjsp`



### 命令示例

`zssj_xjjrzgzyjsp`
<IStockShellDemo cmd='zssj_xjjrzgzyjsp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_dzspzs 大宗商品指数 
财新指数-大宗商品指数

### 用法

`zssj_dzspzs`



### 命令示例

`zssj_dzspzs`
<IStockShellDemo cmd='zssj_dzspzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_gzlyz 高质量因子 
财新指数-高质量因子

### 用法

`zssj_gzlyz`



### 命令示例

`zssj_gzlyz`
<IStockShellDemo cmd='zssj_gzlyz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_aiclzs AI策略指数 
财新指数-AI策略指数

### 用法

`zssj_aiclzs`



### 命令示例

`zssj_aiclzs`
<IStockShellDemo cmd='zssj_aiclzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_jsjjzs 基石经济指数 
财新指数-基石经济指数

### 用法

`zssj_jsjjzs`



### 命令示例

`zssj_jsjjzs`
<IStockShellDemo cmd='zssj_jsjjzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_xdnzs 新动能指数 
财新指数-新动能指数

### 用法

`zssj_xdnzs`



### 命令示例

`zssj_xdnzs`
<IStockShellDemo cmd='zssj_xdnzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_zsgz_zz 指数估值-中证 
中证指数-指数估值数据

### 用法

`zssj_zsgz_zz [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;H30374&quot;; 指数代码 | string | true | H30374 |  |

### 命令示例

`zssj_zsgz_zz`
<IStockShellDemo cmd='zssj_zsgz_zz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_jjzssshq 基金指数实时行情 
申万宏源研究-申万指数-指数发布-基金指数-实时行情

### 用法

`zssj_jjzssshq [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;基础一级&quot;; choice of &#123;&quot;基础一级&quot;, &quot;基础二级&quot;, &quot;基础三级&quot;, &quot;特色指数&quot;&#125; | string | true | 基础一级 | 基础一级,基础二级,基础三级,特色指数 |

### 命令示例

`zssj_jjzssshq`
<IStockShellDemo cmd='zssj_jjzssshq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_jjzslshq 基金指数历史行情 
申万宏源研究-申万指数-指数发布-基金指数-历史行情

### 用法

`zssj_jjzslshq [-symbol [symbol]] [-period [period]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;807200&quot;; 基金指数代码 | string | true | 807200 |  |
| `-period，--period` | period | period=&quot;day&quot;; choice of &#123;&quot;day&quot;, &quot;week&quot;, &quot;month&quot;&#125; | string | true | day | day,week,month |

### 命令示例

`zssj_jjzslshq`
<IStockShellDemo cmd='zssj_jjzslshq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_swzssshq 申万指数实时行情 
申万宏源研究-指数系列; 注意其中大类风格指数和金创指数的字段

### 用法

`zssj_swzssshq [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;市场表征&quot;; choice of &#123;&quot;市场表征&quot;, &quot;一级行业&quot;, &quot;二级行业&quot;, &quot;风格指数&quot;, &quot;大类风格指数&quot;, &quot;金创指数&quot;&#125; | string | true | 市场表征 | 市场表征,一级行业,二级行业,风格指数,大类风格指数,金创指数 |

### 命令示例

`zssj_swzssshq`
<IStockShellDemo cmd='zssj_swzssshq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_swzslshq 申万指数历史行情 
申万宏源研究-指数发布-指数详情-指数历史数据

### 用法

`zssj_swzslshq [-symbol [symbol]] [-period [period]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;801030&quot;; 指数代码 | string | true | 801030 |  |
| `-period，--period` | period | period=&quot;day&quot;; choice of &#123;&quot;day&quot;, &quot;week&quot;, &quot;month&quot;&#125; | string | true | day | day,week,month |

### 命令示例

`zssj_swzslshq`
<IStockShellDemo cmd='zssj_swzslshq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_swzsfshq 申万指数分时行情 
申万宏源研究-指数发布-指数详情-指数分时数据

### 用法

`zssj_swzsfshq [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;801030&quot;; 指数代码 | string | true | 801030 |  |

### 命令示例

`zssj_swzsfshq`
<IStockShellDemo cmd='zssj_swzsfshq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_swzscfg 申万指数成分股 
申万宏源研究-指数发布-指数详情-成分股

### 用法

`zssj_swzscfg [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;801001&quot;; 指数代码 | string | true | 801001 |  |

### 命令示例

`zssj_swzscfg`
<IStockShellDemo cmd='zssj_swzscfg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_swzsfx_rbb 申万指数分析-日报表 
申万宏源研究-指数分析-日报表

### 用法

`zssj_swzsfx_rbb [-symbol [symbol]] [-start_date [start_date]] [-end_date [end_date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;市场表征&quot;; choice of &#123;&quot;市场表征&quot;, &quot;一级行业&quot;, &quot;二级行业&quot;, &quot;风格指数&quot;&#125; | string | true | 市场表征 | 市场表征,一级行业,二级行业,风格指数 |
| `-start_date，--start_date` | start_date | start\_date=&quot;20221103&quot; | string | true | 20221103 |  |
| `-end_date，--end_date` | end_date | end\_date=&quot;20221103&quot; | string | true | 20221103 |  |

### 命令示例

`zssj_swzsfx_rbb`
<IStockShellDemo cmd='zssj_swzsfx_rbb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_swzsfx_zbb 申万指数分析-周报表 
申万宏源研究-指数分析-周报表

### 用法

`zssj_swzsfx_zbb [-symbol [symbol]] [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;市场表征&quot;; choice of &#123;&quot;市场表征&quot;, &quot;一级行业&quot;, &quot;二级行业&quot;, &quot;风格指数&quot;&#125; | string | true | 市场表征 | 市场表征,一级行业,二级行业,风格指数 |
| `-date，--date` | date | start\_date=&quot;20221104&quot;; 通过调用 ak.index\_analysis\_week\_month\_sw(date=&quot;week&quot;) 接口获取 | string | true | 20221104 |  |

### 命令示例

`zssj_swzsfx_zbb`
<IStockShellDemo cmd='zssj_swzsfx_zbb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_swzsfx_ybb 申万指数分析-月报表 
申万宏源研究-指数分析-月报表

### 用法

`zssj_swzsfx_ybb [-symbol [symbol]] [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;市场表征&quot;; choice of &#123;&quot;市场表征&quot;, &quot;一级行业&quot;, &quot;二级行业&quot;, &quot;风格指数&quot;&#125; | string | true | 市场表征 | 市场表征,一级行业,二级行业,风格指数 |
| `-date，--date` | date | start\_date=&quot;20221031&quot;; 通过调用 ak.index\_analysis\_week\_month\_sw(date=&quot;month&quot;) 接口获取 | string | true | 20221031 |  |

### 命令示例

`zssj_swzsfx_ybb`
<IStockShellDemo cmd='zssj_swzsfx_ybb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## zssj_a_gxwqxzs A 股新闻情绪指数 
数库-A股新闻情绪指数

### 用法

`zssj_a_gxwqxzs`



### 命令示例

`zssj_a_gxwqxzs`
<IStockShellDemo cmd='zssj_a_gxwqxzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
