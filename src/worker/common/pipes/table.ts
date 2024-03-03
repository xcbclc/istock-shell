import { isUndefined } from '@istock/util';
import type { TTableFilterConditions, TTableFilterItem } from './table-query';
import { ETableFilterOperate } from './table-query';

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
export function transpose<T>(matrix: T[][]): T[][] {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

/**
 * 90度旋转
 * @param matrix
 */
export function rotate90<T>(matrix: T[][]): T[][] {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]).reverse());
}

/**
 * 180度旋转
 * @param matrix
 */
export function rotate180<T>(matrix: T[][]): T[][] {
  return rotate90(rotate90(matrix));
}

/**
 * 排序 可以根据需要增加对不同列的排序
 * @param matrix
 * @param columnIndex
 */
export function sortMatrix<T>(matrix: T[][], columnIndex = 0): T[][] {
  return matrix.slice().sort((a, b) => {
    if (a[columnIndex] < b[columnIndex]) return -1;
    if (a[columnIndex] > b[columnIndex]) return 1;
    return 0;
  });
}

/**
 * 过滤 根据某列的某个条件过滤行
 * @param matrix
 * @param columnIndex
 * @param filterFunction
 */
export function filterMatrix<T>(matrix: T[][], columnIndex = 0, filterFunction: (element: T) => boolean): T[][] {
  return matrix.filter((row) => filterFunction(row[columnIndex]));
}

/**
 * 连接 两个表格可以根据某列的值连接
 * @param table1
 * @param table2
 * @param joinColumnIndex
 */
export function joinTables<T>(table1: T[][], table2: T[][], joinColumnIndex = 0): T[][] {
  // 简化示例，实际实现可能需要更复杂的逻辑
  const result: T[][] = [];
  for (const row1 of table1) {
    for (const row2 of table2) {
      if (row1[joinColumnIndex] === row2[joinColumnIndex]) {
        result.push([...row1, ...row2]);
      }
    }
  }
  return result;
}

/**
 * 合并 表格按行合并
 * @param table1
 * @param table2
 */
export function mergeTables<T>(table1: T[][], table2: T[][]): T[][] {
  return [...table1, ...table2];
}

/**
 * 变形（Reshape）
 * @param matrix
 * @param newRowCount
 * @param newColCount
 */
export function reshape<T>(matrix: T[][], newRowCount: number, newColCount: number): T[][] {
  if (matrix.length * matrix[0].length !== newRowCount * newColCount) {
    throw new Error('Reshape dimensions do not match original data size.');
  }

  const result: T[][] = [];
  let row: T[] = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      row.push(matrix[i][j]);
      if (row.length === newColCount) {
        result.push(row);
        row = [];
      }
    }
  }
  return result;
}

/**
 * 求和
 * @param matrix
 * @param columnIndex
 */
export function aggregateSum(matrix: number[][], columnIndex: number): number {
  return matrix.reduce((sum, row) => sum + row[columnIndex], 0);
}

/**
 * 按照某列的值对行进行分组
 * @param matrix
 * @param groupFunction
 */
export function groupBy<T, K>(matrix: T[][], groupFunction: (row: T[]) => K): Map<K, T[][]> {
  const groups = new Map<K, T[][]>();
  matrix.forEach((row) => {
    const key = groupFunction(row);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)?.push(row);
  });
  return groups;
}

/**
 * 数据透视表（Pivot Table）
 * @param matrix
 * @param rowIndex
 * @param columnIndex
 * @param valueIndex
 */
export function createPivotTable(matrix: any[][], rowIndex: number, columnIndex: number, valueIndex: number): any {
  const result: Record<any, any> = {};
  matrix.forEach((row) => {
    if (!result[row[rowIndex]]) {
      result[row[rowIndex]] = {};
    }
    result[row[rowIndex]][row[columnIndex]] = row[valueIndex];
  });
  return result;
}

/**
 * 根据管道函数格式化表格数据
 * @param matrix
 * @param filterConditions
 * @param pipeAlias
 */
export function format(matrix: any[][], filterConditions: TTableFilterConditions, pipeAlias: Record<string, Function>) {
  const [headers] = matrix;

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
    if (start && end) {
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
      for (let columnIndex = column[0]; columnIndex < column[1]; columnIndex++) {
        matrix[rowIndex][columnIndex] = pipe(matrix[rowIndex][columnIndex]);
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
