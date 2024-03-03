import { type TControllerMethodComponentResponse } from '@istock/iswork';
import type { TCmdRequest } from './cmd-request';
import type { ENumberUnit, EPercentageUnit } from '../constants';

export type TTableHeader<Key = string> = {
  value: Key;
  unit?: {
    value: string;
    show: Boolean;
  };
};

export type TTableBody<Value = unknown> = {
  value: Value;
  unit?: {
    value: string;
    show: Boolean;
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
  TControllerMethodComponentResponse<TUiTableProps>
>;
export type TTableUnit = ENumberUnit | EPercentageUnit | string;
