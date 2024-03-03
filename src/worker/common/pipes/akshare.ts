import { isNumber, isString } from '@istock/util';
import { NumberUnits } from '../constants';
import { parseFilterConditions } from './table-query';

/**
 * 获取akshare返回数据表格数据
 * @param response
 * @param headers
 */
export const getTableData = (
  response: Array<Record<string, unknown>>,
  headers: string[],
  unit: string
): unknown[][] => {
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
  const matrix: unknown[][] = response.map((item) => {
    let rowPipe: string | null = null;
    return headers.map((key, columnIndex) => {
      let value: unknown = item[key];
      if (conditionRecord[key] && !columnPipeRecord[columnIndex]) {
        columnPipeRecord[columnIndex] = conditionRecord[key];
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
      return value ?? null;
    });
  });
  return [headers, ...matrix];
};

export default {
  getTableData,
};
