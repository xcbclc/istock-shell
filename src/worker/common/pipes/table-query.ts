export enum ETableFilterOperate {
  '=',
}
export type TTableFilterItem = {
  name?: string;
  value?: string;
  filter?: ETableFilterOperate;
};
export type TTableFilterConditionRange = [
  { row?: TTableFilterItem; column?: TTableFilterItem },
  { row?: TTableFilterItem; column?: TTableFilterItem },
];
export type TTableFilterCondition = {
  pipe?: string;
  row?: TTableFilterItem;
  column?: TTableFilterItem;
  range?: TTableFilterConditionRange;
};
export type TTableFilterConditions = TTableFilterCondition[];

const RangeStartSymbol = '[';
const RangeEndSymbol = ']';
const CallPipeSymbol = '·';
const ConditionSplitSymbols = [',', '，'];
const ConditionSplitReg = /,|，/;
const RowAndColumnSplitReg = /:|：/;

/**
 * 用，或,符号分割字符串，但[]里面的字符串不分割
 * @param inputString
 */
export const getConditionStringArray = (inputString: string) => {
  const resultArray: string[] = [];
  let currentSegment = '';
  let inBracket = false;

  for (const char of inputString) {
    if (char === RangeStartSymbol) {
      inBracket = true;
    } else if (char === RangeEndSymbol) {
      inBracket = false;
    }

    if (ConditionSplitSymbols.includes(char) && !inBracket) {
      // 当遇到逗号，并且不在方括号内时，完成一个分段
      resultArray.push(currentSegment);
      currentSegment = '';
    } else {
      // 否则继续构建当前分段
      currentSegment += char;
    }
  }

  // 添加最后一个分段（如果存在）
  if (currentSegment) {
    resultArray.push(currentSegment);
  }

  return resultArray;
};

/**
 * 解析表格筛选条件
 * @param filterStr
 */
export const parseFilterConditions = (filterStr: string = ''): TTableFilterConditions => {
  if (!filterStr) return [];
  const conditionStringArray = getConditionStringArray(filterStr);
  return conditionStringArray
    .map((str) => {
      const pipeSymbolIndex = str.indexOf(CallPipeSymbol);
      const filter = str.substring(0, pipeSymbolIndex);
      const pipe = str.substring(pipeSymbolIndex + 1);
      if (filter.startsWith(RangeStartSymbol) && filter.endsWith(RangeEndSymbol)) {
        // range
        const rangeStr = filter.substring(1, filter.length - 1);
        if (!rangeStr) return null;
        const [rangeStart, rangeEnd] = rangeStr.split(ConditionSplitReg);
        const [rowStart, columnStart] = rangeStart.split(RowAndColumnSplitReg);
        const [rowEnd, columnEnd] = rangeEnd.split(RowAndColumnSplitReg);
        const range: TTableFilterConditionRange = [
          { row: rowStart, column: columnStart },
          { row: rowEnd, column: columnEnd },
        ].map((item) => {
          const [rowName, rowValue] = item.row.split('=');
          const [columnName, columnValue] = item.column.split('=');
          return {
            row: {
              name: rowName,
              value: rowValue,
              filter: ETableFilterOperate['='],
            },
            column: {
              name: columnName,
              value: columnValue,
              filter: ETableFilterOperate['='],
            },
          };
        }) as TTableFilterConditionRange;
        const condition: TTableFilterCondition = {
          pipe,
          range,
        };
        return condition;
      } else {
        const [column, row] = filter.split(RowAndColumnSplitReg);
        // todo 暂时只处理=符号
        const [rowName, rowValue] = row.split('=');
        const [columnName, columnValue] = column.split('=');
        const condition: TTableFilterCondition = {
          pipe,
          row: {
            name: rowName,
            value: rowValue,
            filter: ETableFilterOperate['='],
          },
          column: {
            name: columnName,
            value: columnValue,
            filter: ETableFilterOperate['='],
          },
        };
        return condition;
      }
    })
    .filter((condition): condition is TTableFilterCondition => Boolean(condition));
};
