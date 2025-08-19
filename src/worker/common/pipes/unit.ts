import { isNil, isNumber, isString } from '@istock-shell/util';
import { ENumberUnit, EPercentageUnit, NumberUnits } from '../constants';
import type { TMatrixTable, TTableBody, TTableHeader, TTableUnit } from '../types';
import type { TTableFilterConditions } from './table-query';

/**
 * 表格头部单位处理
 * @param header
 * @param unitValue
 */
const switchHeaderHandler = (header: TTableHeader, unitValue?: TTableUnit): TTableHeader => {
  header.unit = unitValue ? { text: unitValue, show: true } : undefined;
  return header;
};

/**
 * 表格数据单位处理
 * @param body
 * @param unitValue
 */
const switchBodyHandler = (body: TTableBody, unitValue?: TTableUnit, shwoUnit: boolean = false): TTableBody => {
  const value = body.value;
  body.unit = unitValue ? { text: unitValue, show: shwoUnit } : undefined;
  if (!unitValue || isNil(value) || Number.isNaN(Number(value))) {
    return body;
  }
  if (unitValue in EPercentageUnit) {
    return body;
  }
  if (unitValue in ENumberUnit) {
    let newValue: unknown = value;
    const index = NumberUnits.findIndex((str) => str === unitValue);
    if (index > 0) {
      newValue = +(Number(value) / Math.pow(10, index));
      if (isNumber(newValue)) {
        if (newValue > 1) {
          newValue = newValue.toFixed(2);
        } else if (newValue > 0.01) {
          newValue = newValue.toFixed(4);
        } else if (newValue > 0.0001) {
          newValue = newValue.toFixed(6);
        } else if (newValue !== 0) {
          newValue = newValue.toFixed(12);
        }
      }
    }
    return { ...body, value: newValue };
  }
  return body;
};

/**
 * 表格数据附带对应单位
 * @param matrix
 * @param tableItemUnits
 */
export const withUnit = (matrix: TMatrixTable, conditions: TTableFilterConditions = []): TMatrixTable => {
  const conditionRecord = conditions.reduce<Record<string, TTableUnit>>((record, condition) => {
    const { row, column, pipe } = condition;
    if (row?.name && pipe) {
      record[row.name] = pipe;
    }
    if (column?.name && pipe) {
      record[column.name] = pipe;
    }
    return record;
  }, {});
  const columnConditionRecord: Record<string, TTableUnit> = {};
  const [headers, ...body] = matrix;
  // 表头列数据处理
  const newHeader = headers.map((header, columnIndex) => {
    const unit = conditionRecord[header.dataKey];
    columnConditionRecord[columnIndex] = unit;
    return switchHeaderHandler(header, unit);
  });

  // 数据列和行处理
  const newBody: TTableBody[][] = body.map((rows) => {
    let rowUnit: string | null = null;
    return rows.map((item, columnIndex) => {
      let unit: TTableUnit = '';
      // 第一列默认为行标题，获取行管道单位
      if (columnIndex === 0 && isString(item.value)) {
        rowUnit = conditionRecord[item.value] ?? null;
      }
      if (rowUnit) unit = rowUnit;
      // 如果列有管道单位，覆盖行管道单位
      if (columnConditionRecord[columnIndex]) {
        unit = columnConditionRecord[columnIndex];
      }
      return switchBodyHandler(item, unit, columnIndex === 0);
    });
  });
  return [newHeader, ...newBody];
};

export default {
  withUnit,
};
