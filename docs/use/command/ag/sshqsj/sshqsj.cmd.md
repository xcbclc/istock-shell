# A股

## sshqsj 实时行情数据

东方财富网-沪深京 A股-实时行情数据

### 用法

`sshqsj <市场>`

### 参数

| 名称 | 描述     |  类型  | 是否可选 | 默认值 |          可选值           |
| :--: | :------- | :----: | :------: | :----: | :-----------------------: |
| 市场 | 市场编码 | string |  false   |        | qb,hag,sag,jag,xg,cyb,kcb |

### 选项

|   选项参数    | 名称 | 描述                                                                                                                                                                                           | 类型  | 是否可选 | 默认值 | 可选值 |
| :-----------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---: | :------: | :----: | :----: |
| `-dw，--单位` | 单位 | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array |   true   |        |        |

### 命令示例

`sshqsj hag`
<IStockShellDemo cmd='sshqsj hag' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>

## sshqxl 实时行情新浪 <Badge type="tip" text="不稳定" />

新浪财经-沪深京A股数据, 重复运行本函数会被新浪暂时封IP, 建议增加时间间隔

### 用法

`sshqxl`

### 选项

|   选项参数    | 名称 | 描述                                                                                                                                                                                           | 类型  | 是否可选 | 默认值 | 可选值 |
| :-----------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---: | :------: | :----: | :----: |
| `-dw，--单位` | 单位 | 设置表格单位，单位值支持（万亿、亿、千万、百万、十万、万、千、百、十），可带多个参数。<br/> 格式如：列名称:行名称·单位 或 \*:行名称·单位 或 列名称:\*·单位 或 列名称1:\*·单位，列名称2:\*·单位 | array |   true   |        |        |

### 命令示例

`sshqxl`
<IStockShellDemo cmd='sshqxl' :domains='[{"viewName":"A股","name":"ag"}]' :height='480'/>
