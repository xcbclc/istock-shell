# 全局

## yycz 应用查找 
查看指定应用数据

### 用法

`yycz [-gl <正则表达式|字符串>] [-sl <数量>]`


### 选项
| 选项参数 | 名称 | 描述 | 类型 | 是否可选 | 默认值 | 可选值 |
| :--: | :--: | :-- | :--: | :--: | :--: | :--: |
| `-gl，--过滤` | 过滤 | 用正则或字符串匹配过滤菜单列表 | string，RegExp | true |  |  |
| `-sl，--数量` | 数量 | 限制展示查看应用列表的数量 | number | true |  |  |

### 命令示例

`yycz -gl A股 -sl 1`
<IStockShellDemo cmd='yycz -gl A股 -sl 1' :domains='[]' :height='480'/>
## yyjr 应用进入 
进入指定应用

### 用法

`yyjr <应用名或应用显示名称>`



### 命令示例

`yyjr A股`
<IStockShellDemo cmd='yyjr A股' :domains='[]' :height='480'/>
