---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---
# akshare

## qx_qryqcdxq 迁入与迁出地详情 
百度-百度地图慧眼-百度迁徙-迁入/迁出地数据接口

### 用法

`qx_qryqcdxq [-area [area]] [-indicator [indicator]] [-date [date]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-area，--area` | area | area=&quot;乌鲁木齐市&quot;, 输入需要查询的省份或者城市, 都需要用全称, 比如: &quot;浙江省&quot;, &quot;乌鲁木齐市&quot; | string | true | 乌鲁木齐市 |  |
| `-indicator，--indicator` | indicator | indicator=&quot;move\_in&quot;, 返回迁入地详情, indicator=&quot;move\_out&quot;, 返回迁出地详情 | string | true | move\_in |  |
| `-date，--date` | date | date=&quot;20230922&quot;, 需要滞后一天 | string | true | 20230922 |  |

### 命令示例

`qx_qryqcdxq`
<IStockShellDemo cmd='qx_qryqcdxq' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
## qx_qxgm 迁徙规模 
百度-百度地图慧眼-百度迁徙-迁徙规模

### 用法

`qx_qxgm [-area [area]] [-indicator [indicator]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-area，--area` | area | area=&quot;广州市&quot;, 输入需要查询的省份或者城市, 都需要用全称, 比如: &quot;浙江省&quot;, &quot;乌鲁木齐市&quot; | string | true | 广州市 |  |
| `-indicator，--indicator` | indicator | indicator=&quot;move\_in&quot;, 返回迁入地详情, indicator=&quot;move\_out&quot;, 返回迁出地详情 | string | true | move\_in |  |

### 命令示例

`qx_qxgm`
<IStockShellDemo cmd='qx_qxgm' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
