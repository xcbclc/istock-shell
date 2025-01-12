# A股

## szgpsczm 上证股票市场总貌

上海证券交易所-股票数据总貌

### 用法

`szgpsczm`

### 选项

|   选项参数    | 名称 | 描述                                                                                                                                                                                           | 类型  | 是否可选 |                             默认值                             | 可选值 |
| :-----------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---: | :------: | :------------------------------------------------------------: | :----: |
| `-dw，--单位` | 单位 | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array |   true   | \*:流通股本·亿，\*:总市值·万亿，\*:流通市值·万亿，\*:总股本·亿 |        |

### 命令示例

`szgpsczm -dw`
<IStockShellDemo cmd='szgpsczm -dw' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>

## szlbtj 深证类别统计

深圳证券交易所-市场总貌-证券类别统计

### 用法

`szlbtj <-rq <日期>>`

### 选项

|   选项参数    | 名称 | 描述                                                                                                                                                                                           |  类型  | 是否可选 |                    默认值                    | 可选值 |
| :-----------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------------------------------------------: | :----: |
| `-rq，--日期` | 日期 | 需要查询的日期，格式：20230901                                                                                                                                                                 | string |  false   |            $formatDate{YYYYMMDD}             |        |
| `-dw，--单位` | 单位 | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array  |   true   | 成交金额:\*·亿，总市值:\*·亿，流通市值:\*·亿 |        |

### 命令示例

`szlbtj -rq 20240424 -dw`
<IStockShellDemo cmd='szlbtj -rq 20240424 -dw' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>

## szdqjypx 深证地区交易排序

深圳证券交易所-市场总貌-地区交易排序

### 用法

`szdqjypx <-ny <年月>>`

### 选项

|   选项参数    | 名称 | 描述                                                                                                                                                                                           |  类型  | 是否可选 |                                          默认值                                           | 可选值 |
| :-----------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :---------------------------------------------------------------------------------------: | :----: |
| `-ny，--年月` | 年月 | 需要查询的年月，格式：202310                                                                                                                                                                   | string |  false   |                                    $formatDate{YYYYMM}                                    |        |
| `-dw，--单位` | 单位 | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array  |   true   | 总交易额:\*·千亿，股票交易额:\*·千亿，基金交易额:\*·千亿，债券交易额:\*·千亿，占市场:\*·% |        |

### 命令示例

`szdqjypx -ny 202403 -dw`
<IStockShellDemo cmd='szdqjypx -ny 202403 -dw' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>

## szgphycj 深证股票行业成交

圳证券交易所-统计资料-股票行业成交数据

### 用法

`szgphycj [-ny <年月>] [-sjd <时间段>]`

### 选项

|     选项参数     |  名称  | 描述                                                                                                                                                                                           |  类型  | 是否可选 |                                                               默认值                                                                |  可选值   |
| :--------------: | :----: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :---------------------------------------------------------------------------------------------------------------------------------: | :-------: |
|  `-ny，--年月`   |  年月  | 需要查询的年月，格式：202310                                                                                                                                                                   | string |   true   |                                                         $formatDate{YYYYMM}                                                         |           |
|  `-dw，--单位`   |  单位  | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array  |   true   | 成交金额-人民币元:\*·亿，成交股数-股数:\*·亿，成交笔数-笔:\*·千万，成交金额-占总计:\*·%, 成交股数-占总计:\*·%, 成交笔数-占总计:\*·% |           |
| `-sjd，--时间段` | 时间段 | 时间段固定选项                                                                                                                                                                                 | string |   true   |                                                                当年                                                                 | 当年,当月 |

### 命令示例

`szgphycj -sjd 当月 -dw`
<IStockShellDemo cmd='szgphycj -sjd 当月 -dw' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>

## szmrgk 上证每日概况

上海证券交易所-数据-股票数据-成交概况-股票成交概况-每日股票情况

### 用法

`szmrgk <-rq <日期>>`

### 选项

|   选项参数    | 名称 | 描述                                                                                                                                                                                           |  类型  | 是否可选 |                            默认值                             | 可选值 |
| :-----------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-----------------------------------------------------------: | :----: |
| `-rq，--日期` | 日期 | 需要查询的日期，格式：20230901                                                                                                                                                                 | string |  false   |                     $formatDate{YYYYMMDD}                     |        |
| `-dw，--单位` | 单位 | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array  |   true   | \*:市价总值·万亿,\*:成交量·亿,\*:成交金额·亿,\*:流通市值·千亿 |        |

### 命令示例

`szmrgk -rq 20240424 -dw`
<IStockShellDemo cmd='szmrgk -rq 20240424 -dw' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>
