# 投资日历

## tzrl 投资日历

查看投资日历

### 用法

`tzrl`

### 选项

|   选项参数    | 名称 | 描述                                                                                                                                                                                                                                                                                                                                                       |  类型  | 是否可选 |                默认值                |                                                               可选值                                                               |
| :-----------: | :--: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----: | :------: | :----------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
| `-lx，--类型` |  lx  | 投资日历类型，参数说明：newstock_onlist（新股上市）、newstock_apply（新股申购）、CNV（可转债）、kzzsg（可转债申购和上市）、CBDIV（正股分红）、cnreits（REITs）、FUND（基金）、BOND（债券）、STOCK（股票）、OTHER（其它）、newbond_apply（新债申购）、newbond_onlist（新债上市）、diva（A股分红）、divhk（H股分红）、idxfut（股指期货）、idxopt（股指期权） | string |   true   | newstock_apply,newstock_onlist,kzzsg | newstock_onlist,newstock_apply,CNV,kzzsg,CBDIV,cnreits,FUND,BOND,STOCK,OTHER,newbond_apply,newbond_onlist,diva,divhk,idxfut,idxopt |

### 命令示例

`tzrl -lx newstock_onlist,newstock_apply,CNV,kzzsg,CBDIV,cnreits,FUND,BOND,STOCK,OTHER,newbond_apply,newbond_onlist,diva,divhk,idxfut,idxopt`
<IStockShellDemo cmd='tzrl -lx newstock_onlist,newstock_apply,CNV,kzzsg,CBDIV,cnreits,FUND,BOND,STOCK,OTHER,newbond_apply,newbond_onlist,diva,divhk,idxfut,idxopt' :domains='[{"viewName":"投资日历","name":"tzrl"}]' :height='480'/>
