# A股

## lshqsj 历史行情数据

东方财富-沪深京A股日频率数据; 历史数据按日频率更新, 当日收盘价请在收盘后获取

### 用法

`lshqsj [-gpdm <股票代码>] [-gpmc <股票名称>] [-ksrq <开始日期>] [-jsrq <结束日期>] [-sjzq <时间周期>] [-fq <复权类型>]`

### 选项

|      选项参数       |   名称   | 描述                                                                                                                                                                                           |  类型  | 是否可选 |        默认值         |        可选值        |
| :-----------------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-------------------: | :------------------: |
|    `-dw，--单位`    |   单位   | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array  |   true   |                       |                      |
| `-gpdm，--股票代码` | 股票代码 | 需要查询的股票代码，如：600519                                                                                                                                                                 | string |   true   |                       |                      |
| `-gpmc，--股票名称` | 股票名称 | 需要查询的股票名称，如：贵州茅台                                                                                                                                                               | string |   true   |                       |                      |
| `-ksrq，--开始日期` | 开始日期 | 需要查询的开始日期，格式：20230901                                                                                                                                                             | string |   true   | $formatDate{YYYYMMDD} |                      |
| `-jsrq，--结束日期` | 结束日期 | 需要查询的结束日期，格式：20230901                                                                                                                                                             | string |   true   | $formatDate{YYYYMMDD} |                      |
|    `-fq，--复权`    |   复权   | 复权类型：前复权(qfq)、后复权(hfq)                                                                                                                                                             | string |   true   |                       |       qfq,hfq        |
| `-sjzq，--时间周期` | 时间周期 | 时间周期，支持日(daily)、周(weekly)、月(monthly)                                                                                                                                               | string |   true   |         daily         | daily,weekly,monthly |

### 命令示例

`lshqsj -gpmc 贵州茅台 -ksrq 20240301 -jsrq 20240330 -sjzq daily -fq qfq`
<IStockShellDemo cmd='lshqsj -gpmc 贵州茅台 -ksrq 20240301 -jsrq 20240330 -sjzq daily -fq qfq' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>

## lshqxl 历史行情新浪

新浪财经-沪深京A股的数据, 历史数据按日频率更新;

### 用法

`lshqxl [-gpdm <股票代码>] [-gpmc <股票名称>] [-ksrq <开始日期>] [-jsrq <结束日期>] [-fq <复权类型>]`

### 选项

|      选项参数       |   名称   | 描述                                                                                                                                                                                           |  类型  | 是否可选 |        默认值         | 可选值  |
| :-----------------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-------------------: | :-----: |
|    `-dw，--单位`    |   单位   | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array  |   true   |                       |         |
| `-gpdm，--股票代码` | 股票代码 | 需要查询的股票代码，如：600519                                                                                                                                                                 | string |   true   |                       |         |
| `-gpmc，--股票名称` | 股票名称 | 需要查询的股票名称，如：贵州茅台                                                                                                                                                               | string |   true   |                       |         |
| `-ksrq，--开始日期` | 开始日期 | 需要查询的开始日期，格式：20230901                                                                                                                                                             | string |   true   | $formatDate{YYYYMMDD} |         |
| `-jsrq，--结束日期` | 结束日期 | 需要查询的结束日期，格式：20230901                                                                                                                                                             | string |   true   | $formatDate{YYYYMMDD} |         |
|    `-fq，--复权`    |   复权   | 复权类型：前复权(qfq)、后复权(hfq)                                                                                                                                                             | string |   true   |                       | qfq,hfq |

### 命令示例

`lshqxl -gpmc 贵州茅台 -ksrq 20240301 -jsrq 20240330 -fq qfq`
<IStockShellDemo cmd='lshqxl -gpmc 贵州茅台 -ksrq 20240301 -jsrq 20240330 -fq qfq' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>

## lshqtx 历史行情腾讯

腾讯证券-日频-股票历史数据; 历史数据按日频率更新, 当日收盘价请在收盘后获取

### 用法

`lshqtx [-gpdm <股票代码>] [-gpmc <股票名称>] [-ksrq <开始日期>] [-jsrq <结束日期>] [-fq <复权类型>]`

### 选项

|      选项参数       |   名称   | 描述                                                                                                                                                                                           |  类型  | 是否可选 |        默认值         | 可选值  |
| :-----------------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-------------------: | :-----: |
|    `-dw，--单位`    |   单位   | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array  |   true   |                       |         |
| `-gpdm，--股票代码` | 股票代码 | 需要查询的股票代码，如：600519                                                                                                                                                                 | string |   true   |                       |         |
| `-gpmc，--股票名称` | 股票名称 | 需要查询的股票名称，如：贵州茅台                                                                                                                                                               | string |   true   |                       |         |
| `-ksrq，--开始日期` | 开始日期 | 需要查询的开始日期，格式：20230901                                                                                                                                                             | string |   true   | $formatDate{YYYYMMDD} |         |
| `-jsrq，--结束日期` | 结束日期 | 需要查询的结束日期，格式：20230901                                                                                                                                                             | string |   true   | $formatDate{YYYYMMDD} |         |
|    `-fq，--复权`    |   复权   | 复权类型：前复权(qfq)、后复权(hfq)                                                                                                                                                             | string |   true   |                       | qfq,hfq |

### 命令示例

`lshqtx -gpmc 贵州茅台 -ksrq 20240301 -jsrq 20240330 -fq qfq`
<IStockShellDemo cmd='lshqtx -gpmc 贵州茅台 -ksrq 20240301 -jsrq 20240330 -fq qfq' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>

## fssjxl 分时数据新浪

新浪财经-沪深京A股股票或者指数的分时数据，目前可以获取 1, 5, 15, 30, 60 分钟的数据频率, 可以指定是否复权

### 用法

`fssjxl [-gpdm <股票代码>] [-gpmc <股票名称>] [-rp <日频>] [-fq <复权类型>]`

### 选项

|      选项参数       |   名称   | 描述                                                                                                                                                                                           |  类型  | 是否可选 | 默认值 |          可选值           |
| :-----------------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :-----------------------: |
|    `-dw，--单位`    |   单位   | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array  |   true   |        |                           |
| `-gpdm，--股票代码` | 股票代码 | 需要查询的股票代码，如：600519                                                                                                                                                                 | string |   true   |        |                           |
| `-gpmc，--股票名称` | 股票名称 | 需要查询的股票名称，如：贵州茅台                                                                                                                                                               | string |   true   |        |                           |
|    `-rp，--日频`    |   日频   | 获取1,5,15,30,60分钟的数据频率                                                                                                                                                                 | string |   true   |   1    | Y,W,SW,SS,LS,1,5,15,30,60 |
|    `-fq，--复权`    |   复权   | 复权类型：前复权(qfq)、后复权(hfq)                                                                                                                                                             | string |   true   |        |          qfq,hfq          |

### 命令示例

`fssjxl -gpmc 贵州茅台 -rp 5 -fq qfq`
<IStockShellDemo cmd='fssjxl -gpmc 贵州茅台 -rp 5 -fq qfq' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>

## fssjdc 分时数据东财

东方财富网-行情首页-沪深京 A 股-每日分时行情; 该接口只能获取近期的分时数据，注意时间周期的设置

### 用法

`fssjdc [-gpdm <股票代码>] [-gpmc <股票名称>] [-ksrq <开始日期>] [-jsrq <结束日期>] [-rp <日频>] [-fq <复权类型>]`

### 选项

|      选项参数       |   名称   | 描述                                                                                                                                                                                           |  类型  | 是否可选 |        默认值         |          可选值           |
| :-----------------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-------------------: | :-----------------------: |
|    `-dw，--单位`    |   单位   | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array  |   true   |                       |                           |
| `-gpdm，--股票代码` | 股票代码 | 需要查询的股票代码，如：600519                                                                                                                                                                 | string |   true   |                       |                           |
| `-gpmc，--股票名称` | 股票名称 | 需要查询的股票名称，如：贵州茅台                                                                                                                                                               | string |   true   |                       |                           |
| `-ksrq，--开始日期` | 开始日期 | 需要查询的开始日期，格式：20230901                                                                                                                                                             | string |   true   | $formatDate{YYYYMMDD} |                           |
| `-jsrq，--结束日期` | 结束日期 | 需要查询的结束日期，格式：20230901                                                                                                                                                             | string |   true   | $formatDate{YYYYMMDD} |                           |
|    `-rp，--日频`    |   日频   | 获取1,5,15,30,60分钟的数据频率                                                                                                                                                                 | string |   true   |           1           | Y,W,SW,SS,LS,1,5,15,30,60 |
|    `-fq，--复权`    |   复权   | 复权类型：前复权(qfq)、后复权(hfq)                                                                                                                                                             | string |   true   |                       |          qfq,hfq          |

### 命令示例

`fssjdc -gpmc 贵州茅台 -ksrq 20240301 -jsrq 20240330 -rp 5 -fq qfq`
<IStockShellDemo cmd='fssjdc -gpmc 贵州茅台 -ksrq 20240301 -jsrq 20240330 -rp 5 -fq qfq' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>

## rnfssjdc 日内分时数据东财

东财财富-分时数据

### 用法

`rnfssjdc [-gpdm <股票代码>] [-gpmc <股票名称>]`

### 选项

|      选项参数       |   名称   | 描述                                                                                                                                                                                           |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
|    `-dw，--单位`    |   单位   | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array  |   true   |        |        |
| `-gpdm，--股票代码` | 股票代码 | 需要查询的股票代码，如：600519                                                                                                                                                                 | string |   true   |        |        |
| `-gpmc，--股票名称` | 股票名称 | 需要查询的股票名称，如：贵州茅台                                                                                                                                                               | string |   true   |        |        |

### 命令示例

`rnfssjdc -gpmc 贵州茅台`
<IStockShellDemo cmd='rnfssjdc -gpmc 贵州茅台' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>

## pqsj 盘前数据

东方财富-股票行情-盘前数据

### 用法

`pqsj [-gpdm <股票代码>] [-gpmc <股票名称>]`

### 选项

|      选项参数       |   名称   | 描述                                                                                                                                                                                           |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
|    `-dw，--单位`    |   单位   | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array  |   true   |        |        |
| `-gpdm，--股票代码` | 股票代码 | 需要查询的股票代码，如：600519                                                                                                                                                                 | string |   true   |        |        |
| `-gpmc，--股票名称` | 股票名称 | 需要查询的股票名称，如：贵州茅台                                                                                                                                                               | string |   true   |        |        |

### 命令示例

`pqsj -gpmc 贵州茅台`
<IStockShellDemo cmd='pqsj -gpmc 贵州茅台' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>
