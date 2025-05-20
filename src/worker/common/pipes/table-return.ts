import { isNumber, isString } from '@istock/util';
import type { TMatrixTable, TTableBody, TTableHeader } from '../types';
import { NumberUnits } from '../constants';
import { parseFilterConditions } from './table-query';
/**
 * 获取table返回数据表格数据
 * @param response
 * @param headers
 * @param unit
 */
export const getTableData = (
  response: Array<Record<string, unknown>>,
  headers: string[],
  unit: string
): TMatrixTable => {
  const conditions = parseFilterConditions(unit);
  const conditionRecord = conditions.reduce<Record<string, string>>((record, condition) => {
    const { row, column, pipe } = condition;
    if (row?.name && pipe) {
      record[row.name] = pipe;
    }
    if (column?.name && pipe) {
      record[column.name] = pipe;
    }
    return record;
  }, {});
  const columnPipeRecord: Record<string | number, string> = {};
  const thead: TTableHeader[] = headers.map((header) => ({
    value: header,
    dataKey: header,
  }));
  const tbody: TTableBody[][] = response.map((item) => {
    let rowPipe: string | null = null;
    return thead.map((head, columnIndex) => {
      let value = item[head.dataKey];
      if (conditionRecord[head.dataKey] && !columnPipeRecord[columnIndex]) {
        columnPipeRecord[columnIndex] = conditionRecord[head.dataKey]; // 保存列表管道
      }
      // 第一列默认为行标题，获取行管道单位
      if (columnIndex === 0) {
        if (isString(value) && conditionRecord[value]) {
          rowPipe = conditionRecord[value];
        } else {
          rowPipe = null;
        }
      }
      if (isNumber(value) || !isNaN(Number(value))) {
        let index: number | null = null;
        if (rowPipe) {
          index = NumberUnits.findIndex((v) => v === rowPipe);
        }
        // 如果列有管道单位，覆盖行管道单位
        if (conditionRecord[columnIndex]) {
          index = NumberUnits.findIndex((v) => v === conditionRecord[columnIndex]);
        }
        if (index !== null && index > 0) {
          let number: number = Number(value);
          number = number * Math.pow(10, index);
          value = number.toFixed(2);
        }
      }
      return {
        value: value ?? null,
        dataKey: head.dataKey,
      };
    });
  });

  return [thead, ...tbody];
};

export default {
  getTableData,
};
