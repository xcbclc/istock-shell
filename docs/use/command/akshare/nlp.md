---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---

# akshare

## zstp 知识图谱

思知-知识图谱的接口, 以此来查询知识图谱数据

### 用法

`zstp <fields> <entity> <desc> <tag> <avg> [-word [word]] [-indicator [indicator]]`

### 参数

|  名称  | 描述                                                       |  类型  | 是否可选 | 默认值 | 可选值 |
| :----: | :--------------------------------------------------------- | :----: | :------: | :----: | :----: |
| fields | description                                                | string |  false   |        |        |
| entity | 实体名                                                     | string |  false   |        |        |
|  desc  | 实体简介                                                   | string |  false   |        |        |
|  tag   | 实体标签                                                   | string |  false   |        |        |
|  avg   | 实体属性值，第一列为实体的属性，第二列为实体属性所对应的值 | string |  false   |        |        |

### 选项

|         选项参数          |   名称    | 描述                                                                    |  类型  | 是否可选 |  默认值  | 可选值 |
| :-----------------------: | :-------: | :---------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
|      `-word，--word`      |   word    | word=&quot;人工智能&quot;                                               | string |   true   | 人工智能 |        |
| `-indicator，--indicator` | indicator | indicator=&quot;entity&quot;; Please refer \*\*Indicator Info\*\* table | string |   true   |  entity  |        |

## znwd 智能问答

思知-对话机器人的接口, 以此来进行智能问答

### 用法

`znwd [-question [question]]`

### 选项

|        选项参数         |   名称   | 描述                            |  类型  | 是否可选 |   默认值   | 可选值 |
| :---------------------: | :------: | :------------------------------ | :----: | :------: | :--------: | :----: |
| `-question，--question` | question | question=&quot;姚明的身高&quot; | string |   true   | 姚明的身高 |        |

### 命令示例

`znwd`
<IStockShellDemo cmd='znwd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
