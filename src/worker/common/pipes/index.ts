import table from './table';
import akshare from './akshare';
import unit from './unit';
import methodReturn from './return';
import pipeArguments from './pipe-args';
import { formatAlias } from './format';

export * from './table';
export * from './unit';
export * from './akshare';
export * from './return';
export * from './pipe-args';
export * from './table-query';
export * from './format';
export * from './stock-code';

export const getPipeAlias = (): Record<string, Function> => {
  return {
    ...formatAlias,
    '表格·转置': table.transpose,
    '表格·旋转90': table.rotate90,
    '表格·旋转180': table.rotate180,
    '表格·排序': table.sortMatrix,
    '表格·过滤': table.filterMatrix,
    '表格·连接': table.joinTables,
    '表格·合并': table.mergeTables,
    '表格·变形': table.reshape,
    '表格·求和': table.aggregateSum,
    '表格·分组': table.groupBy,
    '表格·透视': table.createPivotTable,
    '表格·格式化': table.format,
    '表格·单位': unit.withUnit,
    'AKShare·二维表格': akshare.getTableData,
    '返回·标准表格': methodReturn.matrixToUiTableData,
    '管道参数·表格单位': pipeArguments.parseCmdInfoToUnit,
  };
};
