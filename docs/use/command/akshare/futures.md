---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---
# akshare

## qh_qhjyfyczb 期货交易费用参照表 
openctp 期货交易费用参照表

### 用法

`qh_qhjyfyczb`



### 命令示例

`qh_qhjyfyczb`
<IStockShellDemo cmd='qh_qhjyfyczb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_qhsxfybzj 期货手续费与保证金 
九期网-期货手续费数据

### 用法

`qh_qhsxfybzj [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;所有&quot;; choice of &#123;&quot;所有&quot;, &quot;上海期货交易所&quot;, &quot;大连商品交易所&quot;, &quot;郑州商品交易所&quot;, &quot;上海国际能源交易中心&quot;, &quot;中国金融期货交易所&quot;, &quot;广州期货交易所&quot;&#125; | string | true | 所有 | 所有,上海期货交易所,大连商品交易所,郑州商品交易所,上海国际能源交易中心,中国金融期货交易所,广州期货交易所 |

### 命令示例

`qh_qhsxfybzj`
<IStockShellDemo cmd='qh_qhsxfybzj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_qhgz_jyrlb 期货规则-交易日历表 
国泰君安期货-交易日历数据表

### 用法

`qh_qhgz_jyrlb [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20231205&quot;; 需要指定为交易日, 且是近期的日期 | string | true | 20231205 |  |

### 命令示例

`qh_qhgz_jyrlb`
<IStockShellDemo cmd='qh_qhgz_jyrlb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_kcsj_99qhw 库存数据-99期货网 
99 期货网-大宗商品库存数据

### 用法

`qh_kcsj_99qhw [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&#39;豆一&#39;; 交易所对应的具体品种中文名称或者英文代码; 如：大连商品交易所的豆一; 具体品种查询：https://www.99qh.com/data/stockIn?productId=61 | string | true | 豆一 |  |

### 命令示例

`qh_kcsj_99qhw`
<IStockShellDemo cmd='qh_kcsj_99qhw' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_kcsj_dfcf 库存数据-东方财富 
东方财富网-期货数据-库存数据; 近 60 个交易日的期货库存日频率数据

### 用法

`qh_kcsj_dfcf [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;A&quot;; 支持品种代码和中文名称，中文名称参见：https://data.eastmoney.com/ifdata/kcsj.html | string | true | A |  |

### 命令示例

`qh_kcsj_dfcf`
<IStockShellDemo cmd='qh_kcsj_dfcf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_dlspjys1 大连商品交易所 
大连商品交易所指定交易日的具体合约的持仓排名

### 用法

`qh_dlspjys1 <vars_list> [-date [date]]`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| vars_list | vars\_list=cons.contract\_symbols; 指定品种，比如：\[&quot;C&quot;, &quot;CS&quot;\] | string | false |  |  |

### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20200511&quot;; 指定交易日, 该数据接口可以获取从 2000 年开始的数据, 20160104 由于交易所数据问题，返回为空可以调用 \*\*futures\_dce\_position\_rank\_other\*\* 来返回数据 | string | true | 20200511 |  |

## qh_gzqhjys1 广州期货交易所 
广州期货交易所-日成交持仓排名

### 用法

`qh_gzqhjys1 [-date [date]] [-vars_list <vars_list>]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20231113&quot;; 指定交易日, 该数据接口可以获取从 20231110 开始的日成交持仓排名数据 | string | true | 20231113 |  |
| `-vars_list，--vars_list` | vars_list | vars\_list=None; 指定品种，比如：\[&#39;SI&#39;, &#39;LC&#39;\] | string | true |  |  |

### 命令示例

`qh_gzqhjys1`
<IStockShellDemo cmd='qh_gzqhjys1' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_cdrb_zzspjys 仓单日报-郑州商品交易所 
郑州商品交易所-交易数据-仓单日报

### 用法

`qh_cdrb_zzspjys [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20200702&quot;; 交易日 | string | true | 20200702 |  |

### 命令示例

`qh_cdrb_zzspjys`
<IStockShellDemo cmd='qh_cdrb_zzspjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_cdrb_dlspjys 仓单日报-大连商品交易所 
大连商品交易所-行情数据-统计数据-日统计-仓单日报

### 用法

`qh_cdrb_dlspjys [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20200702&quot;; 交易日 | string | true | 20200702 |  |

### 命令示例

`qh_cdrb_dlspjys`
<IStockShellDemo cmd='qh_cdrb_dlspjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_cdrb_shqhjys 仓单日报-上海期货交易所 
提供上海期货交易所指定交割仓库期货仓单日报

### 用法

`qh_cdrb_shqhjys [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20200702&quot;; 交易日 | string | true | 20200702 |  |

### 命令示例

`qh_cdrb_shqhjys`
<IStockShellDemo cmd='qh_cdrb_shqhjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_cdrb_gzqhjys 仓单日报-广州期货交易所 
广州期货交易所-行情数据-仓单日报

### 用法

`qh_cdrb_gzqhjys [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20240122&quot;; 交易日 | string | true | 20240122 |  |

### 命令示例

`qh_cdrb_gzqhjys`
<IStockShellDemo cmd='qh_cdrb_gzqhjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_qzx_dss 期转现-大商所 
大连商品交易所-期转现统计数据

### 用法

`qh_qzx_dss [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;202312&quot;; 交易年月 | string | true | 202312 |  |

### 命令示例

`qh_qzx_dss`
<IStockShellDemo cmd='qh_qzx_dss' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_qzx_zss 期转现-郑商所 
郑州商品交易所-期转现统计数据

### 用法

`qh_qzx_zss [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20210112&quot;; 交易日 | string | true | 20210112 |  |

### 命令示例

`qh_qzx_zss`
<IStockShellDemo cmd='qh_qzx_zss' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_qzx_sqs 期转现-上期所 
上海期货交易所-期转现数据

### 用法

`qh_qzx_sqs [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;202312&quot;; 交易月份 | string | true | 202312 |  |

### 命令示例

`qh_qzx_sqs`
<IStockShellDemo cmd='qh_qzx_sqs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_jgtj_dss 交割统计-大商所 
大连商品交易所-交割统计

### 用法

`qh_jgtj_dss [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;202312&quot;; 交易月份 | string | true | 202312 |  |

### 命令示例

`qh_jgtj_dss`
<IStockShellDemo cmd='qh_jgtj_dss' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_jgtj_zss 交割统计-郑商所 
郑州商品交易所-交割统计

### 用法

`qh_jgtj_zss [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20210112&quot;; 交易日 | string | true | 20210112 |  |

### 命令示例

`qh_jgtj_zss`
<IStockShellDemo cmd='qh_jgtj_zss' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_jgtj_sqs 交割统计-上期所 
上海期货交易所-交割统计

### 用法

`qh_jgtj_sqs [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;202312&quot;; 交易月份 | string | true | 202312 |  |

### 命令示例

`qh_jgtj_sqs`
<IStockShellDemo cmd='qh_jgtj_sqs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_jgpd_dss 交割配对-大商所 
大连商品交易所-交割配对

### 用法

`qh_jgpd_dss [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;a&quot;; 交易品种 | string | true | a |  |

### 命令示例

`qh_jgpd_dss`
<IStockShellDemo cmd='qh_jgpd_dss' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_jgpd_zss 交割配对-郑商所 
郑州商品交易所-交割配对

### 用法

`qh_jgpd_zss [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20210106&quot;; 交易日 | string | true | 20210106 |  |

### 命令示例

`qh_jgpd_zss`
<IStockShellDemo cmd='qh_jgpd_zss' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_shqhjys1 上海期货交易所 
金十财经-上海期货交易所指定交割仓库库存周报

### 用法

`qh_shqhjys1 [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20240419&quot;; 库存周报只在每周的最后一个交易日公布数据 | string | true | 20240419 |  |

### 命令示例

`qh_shqhjys1`
<IStockShellDemo cmd='qh_shqhjys1' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_cjcc 成交持仓 
新浪财经-期货-成交持仓

### 用法

`qh_cjcc [-symbol [symbol]] [-contract [contract]] [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;成交量&quot;; choice of &#123;&quot;成交量&quot;, &quot;多单持仓&quot;, &quot;空单持仓&quot;&#125; | string | true | 成交量 | 成交量,多单持仓,空单持仓 |
| `-contract，--contract` | contract | contract=&quot;OI2501&quot;; 只限于商品期货 | string | true | OI2501 |  |
| `-date，--date` | date | date=&quot;20240223&quot; | string | true | 20240223 |  |

### 命令示例

`qh_cjcc`
<IStockShellDemo cmd='qh_cjcc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_xqt 现期图 
生意社-商品与期货-现期图

### 用法

`qh_xqt [-symbol [symbol]] [-contract [contract]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;铜&quot;; 期货品种 | string | true | 铜 |  |
| `-contract，--contract` | contract | indicator=&quot;市场价格&quot;; choice of &#123;&quot;市场价格&quot;, &quot;基差率&quot;, &quot;主力基差&quot;&#125; | string | true | 市场价格 | 市场价格,基差率,主力基差 |

### 命令示例

`qh_xqt`
<IStockShellDemo cmd='qh_xqt' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_shqhjys2 上海期货交易所 
上海期货交易所-交易所服务-业务数据-交易参数汇总查询

### 用法

`qh_shqhjys2 [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20240513&quot;; 交易日 | string | true | 20240513 |  |

### 命令示例

`qh_shqhjys2`
<IStockShellDemo cmd='qh_shqhjys2' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_shgjnyjyzx 上海国际能源交易中心 
上海国际能源交易中心-业务指南-交易参数汇总(期货)

### 用法

`qh_shgjnyjyzx [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20241129&quot;; 交易日 | string | true | 20241129 |  |

### 命令示例

`qh_shgjnyjyzx`
<IStockShellDemo cmd='qh_shgjnyjyzx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_dlspjys2 大连商品交易所 
大连商品交易所-业务/服务-业务参数-交易参数-合约信息查询

### 用法

`qh_dlspjys2`



### 命令示例

`qh_dlspjys2`
<IStockShellDemo cmd='qh_dlspjys2' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_zzspjys 郑州商品交易所 
郑州商品交易所-交易数据-参考数据

### 用法

`qh_zzspjys [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20240228&quot;; 交易日 | string | true | 20240228 |  |

### 命令示例

`qh_zzspjys`
<IStockShellDemo cmd='qh_zzspjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_gzqhjys2 广州期货交易所 
广州期货交易所-业务/服务-合约信息

### 用法

`qh_gzqhjys2`



### 命令示例

`qh_gzqhjys2`
<IStockShellDemo cmd='qh_gzqhjys2' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_zgjrqhjys 中国金融期货交易所 
中国金融期货交易所-数据-交易参数

### 用法

`qh_zgjrqhjys [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20240228&quot;; 交易日 | string | true | 20240228 |  |

### 命令示例

`qh_zgjrqhjys`
<IStockShellDemo cmd='qh_zgjrqhjys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_np_sshqsj 内盘-实时行情数据 
新浪财经-期货页面的实时行情数据

### 用法

`qh_np_sshqsj <subscribe_list> [-market [market]] [-adjust [adjust]]`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| subscribe_list | 需要订阅的合约代码; e.g., 按照示例获取 | string | false |  |  |

### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-market，--market` | market | market=&quot;CF&quot;; market=&quot;CF&quot;: 商品期货, market=&quot;FF&quot;: 金融期货 | string | true | CF |  |
| `-adjust，--adjust` | adjust | adjust=&#39;0&#39;; adjust=&#39;1&#39;: 返回合约、交易所和最小变动单位的实时数据, 返回数据会变慢 | string | true | 0 |  |

## qh_np_sshqsj_pz 内盘-实时行情数据(品种) 
新浪财经-期货实时行情数据

### 用法

`qh_np_sshqsj_pz [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;白糖&quot;, 品种名称；可以通过 ak.futures\_symbol\_mark() 获取所有品种命名表 | string | true | 白糖 |  |

### 命令示例

`qh_np_sshqsj_pz`
<IStockShellDemo cmd='qh_np_sshqsj_pz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_np_fshqsj 内盘-分时行情数据 
新浪财经-期货-分时数据

### 用法

`qh_np_fshqsj [-symbol [symbol]] [-period [period]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;IF2008&quot;; 具体合约(期货品种符号需要大写), 可以通过调用 ak.match\_main\_contract(symbol=&quot;cffex&quot;) 接口获取, 或者访问网页获取 | string | true | IF2008 |  |
| `-period，--period` | period | period=&quot;1&quot;; choice of &#123;&quot;1&quot;: &quot;1分钟&quot;, &quot;5&quot;: &quot;5分钟&quot;, &quot;15&quot;: &quot;15分钟&quot;, &quot;30&quot;: &quot;30分钟&quot;, &quot;60&quot;: &quot;60分钟&quot;&#125; | string | true | 1 | 1: 1分钟,5: 5分钟,15: 15分钟,30: 30分钟,60: 60分钟 |

### 命令示例

`qh_np_fshqsj`
<IStockShellDemo cmd='qh_np_fshqsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_np_lshqsj_dc 内盘-历史行情数据-东财 
东方财富网-期货行情-行情数据

### 用法

`qh_np_lshqsj_dc [-symbol [symbol]] [-period [period]] [-start_date [start_date]] [-end_date [end_date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;热卷主连&quot;; 具体合约可以通过 ak.futures\_hist\_table\_em() 获取所有当期能获取数据的合约表 | string | true | 热卷主连 |  |
| `-period，--period` | period | period=&quot;daily&quot;; choice of &#123;&quot;daily&quot;, &quot;weekly&quot;, &quot;monthly&quot;&#125; | string | true | daily | daily,weekly,monthly |
| `-start_date，--start_date` | start_date | start\_date=&quot;19900101&quot;; | string | true | 19900101 |  |
| `-end_date，--end_date` | end_date | end\_date=&quot;20500101&quot;; | string | true | 20500101 |  |

### 命令示例

`qh_np_lshqsj_dc`
<IStockShellDemo cmd='qh_np_lshqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_np_lshqsj_xl 内盘-历史行情数据-新浪 
新浪财经-期货-日频数据

### 用法

`qh_np_lshqsj_xl [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;RB0&quot;; 具体合约可以通过 ak.match\_main\_contract(symbol=&quot;shfe&quot;) 获取或者访问网页 | string | true | RB0 |  |

### 命令示例

`qh_np_lshqsj_xl`
<IStockShellDemo cmd='qh_np_lshqsj_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_np_lshqsj_jys 内盘-历史行情数据-交易所 
提供各交易所各品种的网站的历史行情数据, 其中 20040625, 20070604, 20081226, 20090119 原网页数据缺失

### 用法

`qh_np_lshqsj_jys [-start_date [start_date]] [-end_date [end_date]] [-market [market]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-start_date，--start_date` | start_date | start\_date=&quot;20200701&quot; | string | true | 20200701 |  |
| `-end_date，--end_date` | end_date | end\_date=&quot;20200716&quot; | string | true | 20200716 |  |
| `-market，--market` | market | market=&quot;DCE&quot;; choice of &#123;&quot;CFFEX&quot;, &quot;INE&quot;, &quot;CZCE&quot;, &quot;DCE&quot;, &quot;SHFE&quot;, &quot;GFEX&quot;&#125; | string | true | DCE | CFFEX,INE,CZCE,DCE,SHFE,GFEX |

### 命令示例

`qh_np_lshqsj_jys`
<IStockShellDemo cmd='qh_np_lshqsj_jys' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_wp_pzdmb 外盘-品种代码表 
新浪财经-外盘商品期货品种代码表数据

### 用法

`qh_wp_pzdmb`



### 命令示例

`qh_wp_pzdmb`
<IStockShellDemo cmd='qh_wp_pzdmb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_wp_sshqsj 外盘-实时行情数据 
新浪财经-外盘商品期货数据

### 用法

`qh_wp_sshqsj <symbol>`

### 参数
| 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :-- | :--: | :--: | :--: | :--: |
| symbol | 需要订阅的合约代码; 调用 \*\*ak.futures\_hq\_subscribe\_exchange\_symbol()\*\* 获取字段及代码对应表 | string | false |  |  |


## qh_wp_sshqsj_dc 外盘-实时行情数据-东财 
东方财富网-行情中心-期货市场-国际期货-实时行情数据

### 用法

`qh_wp_sshqsj_dc`



### 命令示例

`qh_wp_sshqsj_dc`
<IStockShellDemo cmd='qh_wp_sshqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_wp_lshqsj_dc 外盘-历史行情数据-东财 
东方财富网-行情中心-期货市场-国际期货-历史行情数据

### 用法

`qh_wp_lshqsj_dc [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;HG00Y&quot;; 品种代码；可以通过 ak.futures\_global\_spot\_em() 来获取所有可获取历史行情数据的品种代码 | string | true | HG00Y |  |

### 命令示例

`qh_wp_lshqsj_dc`
<IStockShellDemo cmd='qh_wp_lshqsj_dc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_wp_lshqsj_xl 外盘-历史行情数据-新浪 
新浪财经-期货外盘历史行情数据

### 用法

`qh_wp_lshqsj_xl [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;ZSD&quot;; 外盘期货的 \*\*symbol\*\* 可以通过 \*\*ak.hf\_subscribe\_exchange\_symbol()\*\* 获取 | string | true | ZSD |  |

### 命令示例

`qh_wp_lshqsj_xl`
<IStockShellDemo cmd='qh_wp_lshqsj_xl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_wp_hyxq 外盘-合约详情 
新浪财经-期货外盘期货合约详情

### 用法

`qh_wp_hyxq [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;ZSD&quot;; 外盘期货的 \*\*symbol\*\* 可以通过 \*\*hf\_subscribe\_exchange\_symbol\*\* 获取 | string | true | ZSD |  |

### 命令示例

`qh_wp_hyxq`
<IStockShellDemo cmd='qh_wp_hyxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_xjpjysqh 新加坡交易所期货 
新加坡交易所-衍生品-历史数据-历史结算价格; 数据于下个工作日新加坡时间下午 2 点起提供

### 用法

`qh_xjpjysqh [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-date，--date` | date | date=&quot;20231107&quot;; 交易日 | string | true | 20231107 |  |

### 命令示例

`qh_xjpjysqh`
<IStockShellDemo cmd='qh_xjpjysqh' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_qhlxhy 期货连续合约 
新浪财经-期货-主力连续合约历史数据

### 用法

`qh_qhlxhy`



### 命令示例

`qh_qhlxhy`
<IStockShellDemo cmd='qh_qhlxhy' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_qhhyxq 期货合约详情 
新浪财经-期货-期货合约详情数据

### 用法

`qh_qhhyxq`



### 命令示例

`qh_qhhyxq`
<IStockShellDemo cmd='qh_qhhyxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_zzspzs 中证商品指数 
中证商品指数

### 用法

`qh_zzspzs [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;中证商品期货指数&quot;; choice of &#123;&quot;中证商品期货指数&quot;, &quot;中证商品期货价格指数&quot;, &#125; | string | true | 中证商品期货指数 | 中证商品期货指数,中证商品期货价格指数, |

### 命令示例

`qh_zzspzs`
<IStockShellDemo cmd='qh_zzspzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_zzspzs_fs 中证商品指数-分时 
中证商品指数-分时数据

### 用法

`qh_zzspzs_fs [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;中证监控油脂油料期货指数&quot;; choice of &#123;&quot;中证商品期货指数&quot;, &quot;中证商品期货价格指数&quot;, &quot;中证监控油脂油料期货指数&quot;, &quot;中证监控软商品期货指数&quot;, &quot;中证监控能化期货指数&quot;, &quot;中证监控钢铁期货指数&quot;&#125; | string | true | 中证监控油脂油料期货指数 | 中证商品期货指数,中证商品期货价格指数,中证监控油脂油料期货指数,中证监控软商品期货指数,中证监控能化期货指数,中证监控钢铁期货指数 |

### 命令示例

`qh_zzspzs_fs`
<IStockShellDemo cmd='qh_zzspzs_fs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_xhygp 现货与股票 
东方财富网-数据中心-现货与股票

### 用法

`qh_xhygp [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;能源&quot;; choice of &#123;&#39;能源&#39;, &#39;化工&#39;, &#39;塑料&#39;, &#39;纺织&#39;, &#39;有色&#39;, &#39;钢铁&#39;, &#39;建材&#39;, &#39;农副&#39;&#125; | string | true | 能源 | 能源,化工,塑料,纺织,有色,钢铁,建材,农副 |

### 命令示例

`qh_xhygp`
<IStockShellDemo cmd='qh_xhygp' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_comex_kcsj COMEX 库存数据 
东方财富网-数据中心-期货期权-COMEX 库存数据

### 用法

`qh_comex_kcsj [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;黄金&quot;; choice of &#123;&quot;黄金&quot;, &quot;白银&quot;&#125; | string | true | 黄金 | 黄金,白银 |

### 命令示例

`qh_comex_kcsj`
<IStockShellDemo cmd='qh_comex_kcsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_hxsj 核心数据 
玄田数据-核心数据

### 用法

`qh_hxsj [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;外三元&quot;; choice of &#123;&quot;外三元&quot;, &quot;内三元&quot;, &quot;土杂猪&quot;&#125; | string | true | 外三元 | 外三元,内三元,土杂猪 |

### 命令示例

`qh_hxsj`
<IStockShellDemo cmd='qh_hxsj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_cbwd 成本维度 
玄田数据-成本维度

### 用法

`qh_cbwd [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;玉米&quot;; choice of &#123;&quot;玉米&quot;, &quot;豆粕&quot;, &quot;二元母猪价格&quot;, &quot;仔猪价格&quot;&#125; | string | true | 玉米 | 玉米,豆粕,二元母猪价格,仔猪价格 |

### 命令示例

`qh_cbwd`
<IStockShellDemo cmd='qh_cbwd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_gywd 供应维度 
玄田数据-供应维度

### 用法

`qh_gywd [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;玉米&quot;; choice of &#123;&quot;猪肉批发价&quot;, &quot;储备冻猪肉&quot;, &quot;饲料原料数据&quot;, &quot;白条肉&quot;, &quot;生猪产能&quot;, &quot;育肥猪&quot;, &quot;肉类价格指数&quot;, &quot;猪粮比价&quot;&#125; | string | true | 玉米 | 猪肉批发价,储备冻猪肉,饲料原料数据,白条肉,生猪产能,育肥猪,肉类价格指数,猪粮比价 |

### 命令示例

`qh_gywd`
<IStockShellDemo cmd='qh_gywd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_szscjgzs 生猪市场价格指数 
行情宝-生猪市场价格指数

### 用法

`qh_szscjgzs`



### 命令示例

`qh_szscjgzs`
<IStockShellDemo cmd='qh_szscjgzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qh_qhzx 期货资讯 
上海金属网-快讯

### 用法

`qh_qhzx [-symbol [symbol]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-symbol，--symbol` | symbol | symbol=&quot;全部&quot;; choice of &#123;&quot;全部&quot;, &quot;要闻&quot;, &quot;VIP&quot;, &quot;财经&quot;, &quot;铜&quot;, &quot;铝&quot;, &quot;铅&quot;, &quot;锌&quot;, &quot;镍&quot;, &quot;锡&quot;, &quot;贵金属&quot;, &quot;小金属&quot;&#125; | string | true | 全部 | 全部,要闻,VIP,财经,铜,铝,铅,锌,镍,锡,贵金属,小金属 |

### 命令示例

`qh_qhzx`
<IStockShellDemo cmd='qh_qhzx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
