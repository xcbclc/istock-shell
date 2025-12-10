---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---

# akshare

## oxford_man Oxford-Man

获取 Oxford-Man 已实现波动率数据

### 用法

`oxford_man`

### 命令示例

`oxford_man`
<IStockShellDemo cmd='oxford_man' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## risk_lab Risk-Lab

获取 Risk-Lab 已实现波动率数据

### 用法

`risk_lab [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                         |  类型  | 是否可选 | 默认值 | 可选值 |
| :-----------------: | :----: | :----------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-symbol，--symbol` | symbol | symbol=&quot;39693&quot;, 某个具体指数 help(article_rlab_rv) | string |   true   | 39693  |        |

### 命令示例

`risk_lab`
<IStockShellDemo cmd='risk_lab' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## current_research_returns Current Research Returns

获取 Current Research Returns 多因子数据; 更多信息请访问目标地址

### 用法

`current_research_returns`

### 命令示例

`current_research_returns`
<IStockShellDemo cmd='current_research_returns' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gjhdqzs 国家和地区指数

国家或地区的经济政策不确定性(EPU)数据

### 用法

`gjhdqzs`

### 命令示例

`gjhdqzs`
<IStockShellDemo cmd='gjhdqzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
