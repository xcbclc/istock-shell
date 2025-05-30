import { type ControllerMethodComponentResponse } from '@istock-shell/iswork';
import type { TCmdRequest } from './cmd-request';
import type { ENumberUnit, EPercentageUnit } from '../constants';

export type TTableHeader<Key = string> = {
  value: Key;
  dataKey: string;
  unit?: {
    text?: string;
    show?: boolean;
  };
};

export type TTableBody<Value = unknown> = {
  value: Value;
  dataKey: string;
  unit?: {
    text?: string;
    show?: boolean;
  };
};

export type TMatrixTable = [TTableHeader[], ...TTableBody[][]];

export type TUiTableProps = {
  caption?: string;
  thead: TTableHeader[];
  tbody: TTableBody[][];
};

export type TCmdTablePipeRequest<Opt = unknown, Args = unknown[]> = TCmdRequest<
  Opt,
  Args,
  ControllerMethodComponentResponse<TUiTableProps>
>;
export type TTableUnit = ENumberUnit | EPercentageUnit | string;
