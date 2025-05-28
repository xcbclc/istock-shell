import { isUndefined } from '@istock-shell/util';
import type { TTableFilterConditions, TTableFilterItem } from './table-query';
import { ETableFilterOperate } from './table-query';
import type { TMatrixTable, TTableHeader, TTableBody } from '../types';

export type TTableFormatFilter = {
  row: [number, number] | [];
  column: [number, number] | [];
  pipe: Function;
  rowFilter: (value: unknown) => Boolean;
  columnFilter: (value: unknown) => Boolean;
};

/**
 * 转置 将表格的行变成列，列变成行。
 * @param matrix
 */
export function transpose<T extends TTableHeader | TTableBody>(matrix: [T[], ...T[][]]): [T[], ...T[][]] {
  const [headers, ...rows] = matrix;
  const transposed: [T[], ...T[][]] = [headers, ...headers.map((_, colIndex) => rows.map((row) => row[colIndex]))];
  return transposed;
}

/**
 * 90度旋转
 * @param matrix
 */
export function rotate90<T extends TTableHeader | TTableBody>(matrix: [T[], ...T[][]]): [T[], ...T[][]] {
  const [headers, ...rows] = matrix;
  const rotated: [T[], ...T[][]] = [
    headers,
    ...headers.map((_, colIndex) => rows.map((row) => row[colIndex]).reverse()),
  ];

  return rotated;
}

/**
 * 180度旋转
 * @param matrix
 */
export function rotate180<T extends TTableHeader | TTableBody>(matrix: [T[], ...T[][]]): [T[], ...T[][]] {
  return rotate90(rotate90(matrix));
}

/**
 * 排序 可以根据需要增加对不同列的排序
 * @param matrix
 * @param columnIndex
 */
export function sortMatrix<T extends TTableHeader | TTableBody>(
  matrix: [T[], ...T[][]],
  columnIndex = 0
): [T[], ...T[][]] {
  const [headers, ...rows] = matrix;
  const sortedRows = rows.slice().sort((a, b) => {
    const aValue: any = a[columnIndex]?.value;
    const bValue: any = b[columnIndex]?.value;
    if (aValue < bValue) return -1;
    if (aValue > bValue) return 1;
    return 0;
  });
  return [headers, ...sortedRows];
}

/**
 * 过滤 根据某列的某个条件过滤行
 * @param matrix
 * @param columnIndex
 * @param filterFunction
 */
export function filterMatrix<T extends TTableHeader | TTableBody>(
  matrix: [T[], ...T[][]],
  columnIndex = 0,
  filterFunction: (element: T) => boolean
): [T[], ...T[][]] {
  const [headers, ...rows] = matrix;
  const filteredRows = rows.filter((row) => filterFunction(row[columnIndex]));
  return [headers, ...filteredRows];
}

/**
 * 连接 两个表格可以根据某列的值连接
 * @param table1
 * @param table2
 * @param joinColumnIndex
 */
export function joinTables<T extends TTableHeader | TTableBody>(
  table1: [T[], ...T[][]],
  table2: [T[], ...T[][]],
  joinColumnIndex = 0
): [T[], ...T[][]] {
  const [headers1, ...rows1] = table1;
  const [headers2, ...rows2] = table2;

  // 合并表头
  const joinedHeaders = [...headers1, ...headers2.filter((h) => !headers1.some((h1) => h1.value === h.value))];

  // 连接行
  const result: T[][] = [];
  for (const row1 of rows1) {
    for (const row2 of rows2) {
      if (row1[joinColumnIndex]?.value === row2[joinColumnIndex]?.value) {
        result.push([...row1, ...row2.filter((_, i) => !headers1.some((h1) => h1.value === headers2[i]?.value))]);
      }
    }
  }

  return [joinedHeaders, ...result] as [T[], ...T[][]];
}

/**
 * 合并 表格按行合并
 * @param table1
 * @param table2
 */
export function mergeTables<T extends TTableHeader | TTableBody>(
  table1: [T[], ...T[][]],
  table2: [T[], ...T[][]]
): [T[], ...T[][]] {
  const [headers1, ...rows1] = table1;

  const [_, ...rows2] = table2; // 假设两个表格的表头相同
  return [headers1, ...rows1, ...rows2];
}

/**
 * 变形（Reshape）
 * @param matrix
 * @param newRowCount
 * @param newColCount
 */
export function reshape<T extends TTableHeader | TTableBody>(
  matrix: [T[], ...T[][]],
  newRowCount: number,
  newColCount: number
): [T[], ...T[][]] {
  const [headers, ...rows] = matrix;
  const flatData: T[] = rows.flat();

  if (flatData.length !== newRowCount * newColCount) {
    throw new Error('Reshape dimensions do not match original data size.');
  }

  const result: T[][] = [];
  let row: T[] = [];

  for (let i = 0; i < flatData.length; i++) {
    row.push(flatData[i]);
    if (row.length === newColCount) {
      result.push(row);
      row = [];
    }
  }

  return [headers, ...result] as [T[], ...T[][]];
}

/**
 * 求和
 * @param matrix
 * @param columnIndex
 */
export function aggregateSum(matrix: TMatrixTable, columnIndex: number): number {
  const [_, ...rows] = matrix;
  return rows.reduce((sum, row) => {
    const value = row[columnIndex]?.value;
    return sum + (typeof value === 'number' ? value : 0);
  }, 0);
}

/**
 * 按照某列的值对行进行分组
 * @param matrix
 * @param groupFunction
 */
export function groupBy<T extends TTableHeader | TTableBody, K>(
  matrix: [T[], ...T[][]],
  groupFunction: (row: T[]) => K
): Map<K, [T[], ...T[][]]> {
  const [headers, ...rows] = matrix;
  const groups = new Map<K, T[][]>();

  rows.forEach((row) => {
    const key = groupFunction(row);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)?.push(row);
  });

  // 转换为 [T[], ...T[][]] 格式
  const result = new Map<K, [T[], ...T[][]]>();
  groups.forEach((groupRows, key) => {
    result.set(key, [headers, ...groupRows] as [T[], ...T[][]]);
  });

  return result;
}

/**
 * 数据透视表（Pivot Table）
 * @param matrix
 * @param rowIndex
 * @param columnIndex
 * @param valueIndex
 */
export function createPivotTable(
  matrix: TMatrixTable,
  rowIndex: number,
  columnIndex: number,
  valueIndex: number
): Record<string, Record<string, any>> {
  const [_, ...rows] = matrix;
  const result: Record<string, Record<string, any>> = {};

  rows.forEach((row) => {
    const rowKey = String(row[rowIndex]?.value);
    const colKey = String(row[columnIndex]?.value);
    const value = row[valueIndex]?.value;

    if (!result[rowKey]) {
      result[rowKey] = {};
    }
    result[rowKey][colKey] = value;
  });

  return result;
}

/**
 * 根据管道函数格式化表格数据
 * @param matrix
 * @param filterConditions
 * @param pipeAlias
 */
export function format(
  matrix: TMatrixTable,
  filterConditions: TTableFilterConditions,
  pipeAlias: Record<string, Function>
) {
  const [headers, ...rows] = matrix;

  // 通过列表值查找
  const findIndexByValue = (items: any[], name: string) => {
    return items.findIndex((v) => v?.value === name || v === name);
  };
  // 通过列表索引查找
  const findIndexByIndex = (items: any[], index: number) => {
    return items.findIndex((_v, i) => index === i);
  };
  // 生成索引范围
  const setupIndex = (
    filterItem: TTableFilterItem | undefined,
    items: any[],
    defaultLength: number,
    type: 'row' | 'column'
  ): [number, number] | [] => {
    if (!filterItem?.name || filterItem.name === '*') {
      // 没有默认所有
      return [0, defaultLength];
    } else {
      let index: number = -1;
      if (type === 'row') index = findIndexByIndex(items, Number(filterItem.name));
      if (type === 'column') index = findIndexByValue(items, filterItem.name);
      return index === -1 ? [] : [index, index + 1];
    }
  };

  // 范围条件空值处理
  const indexRangeRule = (arr: [number, number] | []): [number, number] | [] => {
    let [start, end] = arr;
    if (start === undefined && end === undefined) {
      return [];
    }
    if (isUndefined(start) && end) {
      start = end - 1;
    }
    if (isUndefined(end) && start) {
      end = start + 1;
    }
    if (start !== undefined && end !== undefined) {
      return [start, end];
    } else {
      return [];
    }
  };

  const formatFilters: TTableFormatFilter[] = filterConditions
    .map((condition) => {
      const { row, column, range, pipe } = condition;
      if (!pipe || !pipeAlias[pipe]) return null;

      const formatFilter: TTableFormatFilter = {
        row: [],
        column: [],
        pipe: pipeAlias[pipe],
        rowFilter: () => true,
        columnFilter: () => true,
      };
      if (row ?? column) {
        formatFilter.row = setupIndex(row, matrix, matrix.length, 'row');
        formatFilter.column = setupIndex(column, headers, headers.length, 'column');
        if (row?.value && row?.filter === ETableFilterOperate['=']) formatFilter.rowFilter = (v) => row.value === v;
        if (column?.value && column?.filter === ETableFilterOperate['='])
          formatFilter.columnFilter = (v) => column.value === v;
        return formatFilter;
      }

      if (range) {
        const [startRange, endRange] = range;
        formatFilter.row[0] = startRange?.row ? setupIndex(startRange.row, matrix, matrix.length, 'row')[0] : 0;
        formatFilter.column[0] = startRange?.column
          ? setupIndex(startRange.column, headers, headers.length, 'column')[0]
          : 0;
        formatFilter.row[1] = endRange?.row ? setupIndex(endRange.row, matrix, matrix.length, 'row')[1] : matrix.length;
        formatFilter.column[1] = endRange?.column
          ? setupIndex(endRange.column, headers, headers.length, 'column')[1]
          : headers.length;
        // 空值情况处理
        formatFilter.row = indexRangeRule(formatFilter.row);
        formatFilter.column = indexRangeRule(formatFilter.column);
      }
      return formatFilter;
    })
    .filter<TTableFormatFilter>((formatFilter): formatFilter is TTableFormatFilter => Boolean(formatFilter));

  formatFilters.forEach(({ row, column, pipe }) => {
    // 没有范围
    if (!row.length || !column.length) return;
    for (let rowIndex = row[0]; rowIndex < row[1]; rowIndex++) {
      const currentRow = rowIndex === 0 ? headers : rows[rowIndex - 1];
      if (currentRow) {
        for (let columnIndex = column[0]; columnIndex < column[1]; columnIndex++) {
          if (currentRow[columnIndex]) {
            currentRow[columnIndex].value = pipe(currentRow[columnIndex].value);
          }
        }
      }
    }
  });

  return matrix;
}

export default {
  transpose,
  rotate90,
  rotate180,
  sortMatrix,
  filterMatrix,
  joinTables,
  mergeTables,
  reshape,
  aggregateSum,
  groupBy,
  createPivotTable,
  format,
};
