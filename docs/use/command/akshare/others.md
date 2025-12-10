---
title: akshare
description: akshare
keywords: [akshare]
aside: false
editLink: false
---

# akshare

## clh_tjsj_ztsc 乘联会-统计数据-总体市场

乘联会-统计数据-总体市场

### 用法

`clh_tjsj_ztsc [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                     |  类型  | 是否可选 |   默认值   |        可选值         |
| :-----------------------: | :-------: | :----------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :--------: | :-------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;狭义乘用车&quot;; choice of &#123;&quot;狭义乘用车&quot;, &quot;广义乘用车&quot;&#125;                      | string |   true   | 狭义乘用车 | 狭义乘用车,广义乘用车 |
| `-indicator，--indicator` | indicator | indicator=&quot;产量&quot;; choice of &#123;&quot;产量&quot;, &quot;批发&quot;, &quot;零售&quot;, &quot;出口&quot;&#125; | string |   true   |    产量    |  产量,批发,零售,出口  |

### 命令示例

`clh_tjsj_ztsc`
<IStockShellDemo cmd='clh_tjsj_ztsc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## clh_tjsj_cspm 乘联会-统计数据-厂商排名

乘联会-统计数据-厂商排名

### 用法

`clh_tjsj_cspm [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                                         |  类型  | 是否可选 |     默认值      |                             可选值                              |
| :-----------------------: | :-------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :-------------: | :-------------------------------------------------------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;狭义乘用车-单月&quot;; choice of &#123;&quot;狭义乘用车-单月&quot;, &quot;狭义乘用车-累计&quot;, &quot;广义乘用车-单月&quot;, &quot;广义乘用车-累计&quot;&#125; | string |   true   | 狭义乘用车-单月 | 狭义乘用车-单月,狭义乘用车-累计,广义乘用车-单月,广义乘用车-累计 |
| `-indicator，--indicator` | indicator | indicator=&quot;批发&quot;; choice of &#123;&quot;批发&quot;, &quot;零售&quot;&#125;                                                                                         | string |   true   |      批发       |                            批发,零售                            |

### 命令示例

`clh_tjsj_cspm`
<IStockShellDemo cmd='clh_tjsj_cspm' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## clh_tjsj_cxdl 乘联会-统计数据-车型大类

乘联会-统计数据-车型大类

### 用法

`clh_tjsj_cxdl [-symbol [symbol]] [-indicator [indicator]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                |  类型  | 是否可选 | 默认值 |      可选值       |
| :-----------------------: | :-------: | :------------------------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :---------------: |
|    `-symbol，--symbol`    |  symbol   | symbol=&quot;轿车&quot;; choice of &#123;&quot;轿车&quot;, &quot;MPV&quot;, &quot;SUV&quot;, &quot;占比&quot;&#125; | string |   true   |  轿车  | 轿车,MPV,SUV,占比 |
| `-indicator，--indicator` | indicator | indicator=&quot;批发&quot;; choice of &#123;&quot;批发&quot;, &quot;零售&quot;&#125;                                | string |   true   |  批发  |     批发,零售     |

### 命令示例

`clh_tjsj_cxdl`
<IStockShellDemo cmd='clh_tjsj_cxdl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## clh_tjsj_gbxfsc 乘联会-统计数据-国别细分市场

乘联会-统计数据-国别细分市场

### 用法

`clh_tjsj_gbxfsc`

### 命令示例

`clh_tjsj_gbxfsc`
<IStockShellDemo cmd='clh_tjsj_gbxfsc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## clh_tjsj_jbxfsc 乘联会-统计数据-级别细分市场

乘联会-统计数据-级别细分市场

### 用法

`clh_tjsj_jbxfsc [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                              |  类型  | 是否可选 | 默认值 |    可选值    |
| :-----------------: | :----: | :------------------------------------------------------------------------------------------------ | :----: | :------: | :----: | :----------: |
| `-symbol，--symbol` | symbol | symbol=&quot;轿车&quot;; choice of &#123;&quot;轿车&quot;, &quot;MPV&quot;, &quot;SUV&quot;&#125; | string |   true   |  轿车  | 轿车,MPV,SUV |

### 命令示例

`clh_tjsj_jbxfsc`
<IStockShellDemo cmd='clh_tjsj_jbxfsc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## clh_tjsj_xnyxfsc 乘联会-统计数据-新能源细分市场

乘联会-统计数据-车型大类

### 用法

`clh_tjsj_xnyxfsc [-symbol [symbol]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                                                 |  类型  | 是否可选 |  默认值  |                   可选值                    |
| :-----------------: | :----: | :----------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :-----------------------------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;整体市场&quot;; choice of &#123;&quot;整体市场&quot;, &quot;销量占比-PHEV-BEV&quot;, &quot;销量占比-ICE-NEV&quot;&#125; | string |   true   | 整体市场 | 整体市场,销量占比-PHEV-BEV,销量占比-ICE-NEV |

### 命令示例

`clh_tjsj_xnyxfsc`
<IStockShellDemo cmd='clh_tjsj_xnyxfsc' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## gsyjy 盖世研究院

盖世汽车资讯的汽车销量排行榜数据

### 用法

`gsyjy [-symbol [symbol]] [-date [date]]`

### 选项

|      选项参数       |  名称  | 描述                                                                                                        |  类型  | 是否可选 | 默认值 |        可选值        |
| :-----------------: | :----: | :---------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :------------------: |
| `-symbol，--symbol` | symbol | symbol=&quot;车型榜&quot;; choice of &#123;&quot;车企榜&quot;, &quot;品牌榜&quot;, &quot;车型榜&quot;&#125; | string |   true   | 车型榜 | 车企榜,品牌榜,车型榜 |
|   `-date，--date`   |  date  | date=&quot;202104&quot;; 指定到月份即可                                                                     | string |   true   | 202104 |                      |

### 命令示例

`gsyjy`
<IStockShellDemo cmd='gsyjy' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xwlbwzg 新闻联播文字稿

新闻联播文字稿, 数据区间从 20160330-至今

### 用法

`xwlbwzg [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                     |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :--------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240424&quot;; 20160330-至今 | string |   true   | 20240424 |        |

### 命令示例

`xwlbwzg`
<IStockShellDemo cmd='xwlbwzg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rchrl_t 日出和日落-天

中国各大城市-日出和日落时间, 数据区间从 19990101-至今, 推荐使用代理访问

### 用法

`rchrl_t [-date [date]] [-city [city]]`

### 选项

|    选项参数     | 名称 | 描述                                           |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :--------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240428&quot;                      | string |   true   | 20240428 |        |
| `-city，--city` | city | city=&quot;beijing&quot;; 注意输入的城市的拼音 | string |   true   | beijing  |        |

### 命令示例

`rchrl_t`
<IStockShellDemo cmd='rchrl_t' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## rchrl_y 日出和日落-月

中国各大城市-日出和日落时间, 数据区间从 19990101-至今, 推荐使用代理访问

### 用法

`rchrl_y [-date [date]] [-city [city]]`

### 选项

|    选项参数     | 名称 | 描述                                           |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :--------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240428&quot;                      | string |   true   | 20240428 |        |
| `-city，--city` | city | city=&quot;beijing&quot;; 注意输入的城市的拼音 | string |   true   | beijing  |        |

### 命令示例

`rchrl_y`
<IStockShellDemo cmd='rchrl_y' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jqkqzl 近期空气质量

河北省实时空气质量数据

### 用法

`jqkqzl`

### 命令示例

`jqkqzl`
<IStockShellDemo cmd='jqkqzl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cslb 城市列表

所有能获取空气质量数据的城市表

### 用法

`cslb`

### 命令示例

`cslb`
<IStockShellDemo cmd='cslb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kqzllssj 空气质量历史数据

指定城市和数据频率下并且在指定时间段内的空气质量数据

### 用法

`kqzllssj [-city [city]] [-period [period]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                                                                                                   |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------------------: | :--------: | :----------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :------: | :----: |
|       `-city，--city`       |    city    | city=&quot;北京&quot;; 调用 ak.air_city_table() 接口获取所有城市列表                                                                                   | string |   true   |   北京   |        |
|     `-period，--period`     |   period   | period=&quot;day&quot;; &quot;hour&quot;: 每小时一个数据, 由于数据量比较大, 下载较慢; &quot;day&quot;: 每天一个数据; &quot;month&quot;: 每个月一个数据 | string |   true   |   day    |        |
| `-start_date，--start_date` | start_date | start_date=&quot;20200320&quot;; 注意 \*\*start_date\*\* 和 \*\*end_date\*\* 跨度不宜过长                                                              | string |   true   | 20200320 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;20200427&quot;; 注意 \*\*start_date\*\* 和 \*\*end_date\*\* 跨度不宜过长                                                                | string |   true   | 20200427 |        |

### 命令示例

`kqzllssj`
<IStockShellDemo cmd='kqzllssj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## kqzlpm 空气质量排名

获取指定 date 时间点上所有城市(168个)的空气质量数据

### 用法

`kqzlpm [-date <date>]`

### 选项

|    选项参数     | 名称 | 描述                                                                                                                                                                           |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------: | :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----: |
| `-date，--date` | date | date=&quot;&quot;; &quot;&quot;: 当前时刻空气质量排名, 默认; &quot;20200312&quot;: 当日空气质量排名; &quot;202003&quot;: 当月空气质量排名; &quot;2019&quot;: 当年空气质量排名; | string |   true   |        |        |

### 命令示例

`kqzlpm`
<IStockShellDemo cmd='kqzlpm' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## jcdkqzl 监测点空气质量

获取每个城市的所有空气质量监测点的数据

### 用法

`jcdkqzl [-city [city]] [-start_date [start_date]] [-end_date [end_date]]`

### 选项

|          选项参数           |    名称    | 描述                                                                 |  类型  | 是否可选 |   默认值   | 可选值 |
| :-------------------------: | :--------: | :------------------------------------------------------------------- | :----: | :------: | :--------: | :----: |
|       `-city，--city`       |    city    | city=&quot;杭州&quot;; 调用 ak.air_city_table() 接口获取所有城市列表 | string |   true   |    杭州    |        |
| `-start_date，--start_date` | start_date | start_date=&quot;2018-01-01&quot;                                    | string |   true   | 2018-01-01 |        |
|   `-end_date，--end_date`   |  end_date  | end_date=&quot;2020-04-27&quot;                                      | string |   true   | 2020-04-27 |        |

### 命令示例

`jcdkqzl`
<IStockShellDemo cmd='jcdkqzl' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## cfpxb_zw 财富排行榜-中文

指定年份财富世界 500 强公司排行榜

### 用法

`cfpxb_zw [-year [year]]`

### 选项

|    选项参数     | 名称 | 描述                  |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------: | :--: | :-------------------- | :----: | :------: | :----: | :----: |
| `-year，--year` | year | year=&quot;2023&quot; | string |   true   |  2023  |        |

### 命令示例

`cfpxb_zw`
<IStockShellDemo cmd='cfpxb_zw' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## fbszgbd 福布斯中国榜单

福布斯中国-榜单数据, 一共 87 个指标的数据可以获取

### 用法

`fbszgbd`

### 命令示例

`fbszgbd`
<IStockShellDemo cmd='fbszgbd' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## xcffhb 新财富富豪榜

新财富 500 富豪榜, 从 2003 年至今

### 用法

`xcffhb [-year [year]]`

### 选项

|    选项参数     | 名称 | 描述                                  |  类型  | 是否可选 | 默认值 | 可选值 |
| :-------------: | :--: | :------------------------------------ | :----: | :------: | :----: | :----: |
| `-year，--year` | year | year=&quot;2020&quot;; 从 2003 年至今 | string |   true   |  2020  |        |

### 命令示例

`xcffhb`
<IStockShellDemo cmd='xcffhb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## hrpxb 胡润排行榜

胡润百富榜单；富豪榜系列，创业系列，500强系列，特色系列

### 用法

`hrpxb [-indicator [indicator]] [-year [year]]`

### 选项

|         选项参数          |   名称    | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                             |  类型  | 是否可选 |   默认值   |                                                                                                    可选值                                                                                                    |
| :-----------------------: | :-------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :--------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| `-indicator，--indicator` | indicator | indicator=&quot;胡润百富榜&quot;; choice of &#123;&quot;胡润百富榜&quot;, &quot;胡润全球富豪榜&quot;, &quot;胡润印度榜&quot;, &quot;胡润全球独角兽榜&quot;, &quot;全球瞪羚企业榜&quot;, &quot;胡润Under30s创业领袖榜&quot;, &quot;胡润世界500强&quot;, &quot;胡润艺术榜&quot;&#125;                                                                                                                                                                              | string |   true   | 胡润百富榜 |                                             胡润百富榜,胡润全球富豪榜,胡润印度榜,胡润全球独角兽榜,全球瞪羚企业榜,胡润Under30s创业领袖榜,胡润世界500强,胡润艺术榜                                             |
|      `-year，--year`      |   year    | year=&quot;2020&quot;; choice of &#123;&quot;胡润百富榜&quot;: &quot;2014-至今&quot;, &quot;胡润全球富豪榜&quot;: &quot;2019-至今&quot;, &quot;胡润印度榜&quot;: &quot;2018-至今&quot;, &quot;胡润全球独角兽榜&quot;: &quot;2019-至今&quot;, &quot;全球瞪羚企业榜&quot;: &quot;2021-至今&quot;, &quot;胡润Under30s创业领袖榜&quot;: &quot;2019-至今&quot;, &quot;胡润世界500强&quot;: &quot;2020-至今&quot;, &quot;胡润艺术榜&quot;: &quot;2019-至今&quot;&#125; | string |   true   |    2020    | 胡润百富榜: 2014-至今,胡润全球富豪榜: 2019-至今,胡润印度榜: 2018-至今,胡润全球独角兽榜: 2019-至今,全球瞪羚企业榜: 2021-至今,胡润Under30s创业领袖榜: 2019-至今,胡润世界500强: 2020-至今,胡润艺术榜: 2019-至今 |

### 命令示例

`hrpxb`
<IStockShellDemo cmd='hrpxb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## sspf 实时票房

当前时刻的实时电影票房数据, 每 5 分钟更新一次数据, 实时票房包含今天未开映场次已售出的票房

### 用法

`sspf`

### 命令示例

`sspf`
<IStockShellDemo cmd='sspf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## drpf 单日票房

指定日期的电影票房数据, 每日 10:30, 12:30更新日票房，16:30 同时补充前 7 日票房

### 用法

`drpf [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240219&quot;; 只能选择最近的日期 | string |   true   | 20240219 |        |

### 命令示例

`drpf`
<IStockShellDemo cmd='drpf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dzpf 单周票房

指定日期所在完整周的票房数据, 影片周票房数据初始更新周期为每周二，下周二补充数据

### 用法

`dzpf [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                                  |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :---------------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240218&quot;; 指定日期所在周必须已经完整 | string |   true   | 20240218 |        |

### 命令示例

`dzpf`
<IStockShellDemo cmd='dzpf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dypf 单月票房

获取指定日期所在月份的票房数据, 每月5号更新上月票房，并补充之前两个月票房

### 用法

`dypf [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20201019&quot;; 输入具体的日期即可 | string |   true   | 20201019 |        |

### 命令示例

`dypf`
<IStockShellDemo cmd='dypf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ndpf 年度票房

指定日期所在年度的票房数据

### 用法

`ndpf [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240218&quot;; 输入具体的日期即可 | string |   true   | 20240218 |        |

### 命令示例

`ndpf`
<IStockShellDemo cmd='ndpf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## ndszpf 年度首周票房

指定日期所在年度的年度首周票房数据

### 用法

`ndszpf [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20201018&quot;; 输入具体的日期即可 | string |   true   | 20201018 |        |

### 命令示例

`ndszpf`
<IStockShellDemo cmd='ndszpf' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yypf_rpfpx 影院票房-日票房排行

指定日期的每日各影院的票房数据

### 用法

`yypf_rpfpx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240219&quot;; 输入具体的日期即可 | string |   true   | 20240219 |        |

### 命令示例

`yypf_rpfpx`
<IStockShellDemo cmd='yypf_rpfpx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yypf_zpfpx 影院票房-周票房排行

指定日期的完整周各影院的票房数据

### 用法

`yypf_zpfpx [-date [date]]`

### 选项

|    选项参数     | 名称 | 描述                                          |  类型  | 是否可选 |  默认值  | 可选值 |
| :-------------: | :--: | :-------------------------------------------- | :----: | :------: | :------: | :----: |
| `-date，--date` | date | date=&quot;20240219&quot;; 输入具体的日期即可 | string |   true   | 20240219 |        |

### 命令示例

`yypf_zpfpx`
<IStockShellDemo cmd='yypf_zpfpx' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## dsjj 电视剧集

艺恩-视频放映-电视剧集

### 用法

`dsjj`

### 命令示例

`dsjj`
<IStockShellDemo cmd='dsjj' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## zyjm 综艺节目

艺恩-视频放映-综艺节目

### 用法

`zyjm`

### 命令示例

`zyjm`
<IStockShellDemo cmd='zyjm' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yrsyjz 艺人商业价值

艺恩-艺人-艺人商业价值

### 用法

`yrsyjz`

### 命令示例

`yrsyjz`
<IStockShellDemo cmd='yrsyjz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## yrlljz 艺人流量价值

艺恩-艺人-艺人流量价值

### 用法

`yrlljz`

### 命令示例

`yrlljz`
<IStockShellDemo cmd='yrlljz' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## shcb 生活成本

世界各大城市生活成本数据

### 用法

`shcb`

### 命令示例

`shcb`
<IStockShellDemo cmd='shcb' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## wbyqbg 微博舆情报告

微博舆情报告中近期受关注的股票

### 用法

`wbyqbg`

### 命令示例

`wbyqbg`
<IStockShellDemo cmd='wbyqbg' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## pbssywfhzs 彭博实时亿万富豪指数

彭博亿万富豪指数, 全球前 500 名; 该接口需要使用代理访问

### 用法

`pbssywfhzs`

### 命令示例

`pbssywfhzs`
<IStockShellDemo cmd='pbssywfhzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>

## lspbywfhzs 历史彭博亿万富豪指数

按照年份查询彭博亿万富豪指数; 该接口需要使用代理访问

### 用法

`lspbywfhzs [-year [year]]`

### 选项

|    选项参数     | 名称 | 描述                                                                                                   |  类型  | 是否可选 | 默认值 |       可选值       |
| :-------------: | :--: | :----------------------------------------------------------------------------------------------------- | :----: | :------: | :----: | :----------------: |
| `-year，--year` | year | year=&quot;2021&quot;; choice of &#123;&quot;2021&quot;, &quot;2019&quot;, &quot;2018&quot;, ...&#125; | string |   true   |  2021  | 2021,2019,2018,... |

### 命令示例

`lspbywfhzs`
<IStockShellDemo cmd='lspbywfhzs' :domains='[{"viewName":"akshare","name":"akshare"}]' :height='640'/>
