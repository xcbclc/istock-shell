import type { TMatrixTable } from '../types';

/**
 * 矩阵二维数组转标准表格数据
 * @param matrix
 * @param caption
 */
export const matrixToUiTableData = (matrix: TMatrixTable, caption: string = '') => {
  const [thead, ...tbody] = matrix;
  return {
    caption,
    thead,
    tbody,
  };
};

export default {
  matrixToUiTableData,
};
