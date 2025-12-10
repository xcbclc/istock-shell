---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---

# akshare

## qryqcdxq 迁入与迁出地详情

百度-百度地图慧眼-百度迁徙-迁入/迁出地数据接口

### 用法

`qryqcdxq [-area [area]] [-indicator [indicator]] [-date [date]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                    |  类型  | 是否可选 |   默认值   | 可选值 |
| :-----------------------: | :-------: | :---------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :--------: | :----: |
|      `-area，--area`      |   area    | area=&quot;乌鲁木齐市&quot;, 输入需要查询的省份或者城市, 都需要用全称, 比如: &quot;浙江省&quot;, &quot;乌鲁木齐市&quot; | string |   true   | 乌鲁木齐市 |        |
| `-indicator，--indicator` | indicator | indicator=&quot;move_in&quot;, 返回迁入地详情, indicator=&quot;move_out&quot;, 返回迁出地详情                           | string |   true   |  move_in   |        |
|      `-date，--date`      |   date    | date=&quot;20230922&quot;, 需要滞后一天                                                                                 | string |   true   |  20230922  |        |

### 命令示例

`qryqcdxq`
<IStockShellDemo cmd='qryqcdxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## qxgm 迁徙规模

百度-百度地图慧眼-百度迁徙-迁徙规模

### 用法

`qxgm [-area [area]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                |  类型  | 是否可选 | 默认值  | 可选值 |
| :-----------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :-----: | :----: |
|      `-area，--area`      |   area    | area=&quot;广州市&quot;, 输入需要查询的省份或者城市, 都需要用全称, 比如: &quot;浙江省&quot;, &quot;乌鲁木齐市&quot; | string |   true   | 广州市  |        |
| `-indicator，--indicator` | indicator | indicator=&quot;move_in&quot;, 返回迁入地详情, indicator=&quot;move_out&quot;, 返回迁出地详情                       | string |   true   | move_in |        |

### 命令示例

`qxgm`
<IStockShellDemo cmd='qxgm' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
