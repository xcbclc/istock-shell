---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---
# akshare

## yh_ybjfjbjxzcf 银保监分局本级行政处罚 
首页-政务信息-行政处罚-银保监分局本级-XXXX行政处罚信息公开表, 是信息公开表不是处罚决定书书

### 用法

`yh_ybjfjbjxzcf [-page [page]] [-item [item]] [-begin [begin]]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-page，--page` | page | page=5; 获取前 5 页数据, 并返回处理好后的数据框 | number | true | 5 |  |
| `-item，--item` | item | item=&quot;分局本级&quot;; choice of &#123;&quot;机关&quot;, &quot;本级&quot;, &quot;分局本级&quot;&#125; | number | true | 分局本级 | 机关,本级,分局本级 |
| `-begin，--begin` | begin | begin=1; 开始页面 | number | true | 1 |  |

### 命令示例

`yh_ybjfjbjxzcf`
<IStockShellDemo cmd='yh_ybjfjbjxzcf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
