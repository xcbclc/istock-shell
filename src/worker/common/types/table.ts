import { type ControllerMethodComponentResponse } from '@istock-shell/iswork';
import type { CmdRequest } from './cmd-request';
import type { ENumberUnit, EPercentageUnit } from '../constants';

export type TableHeader<Key = string> = {
  value: Key;
  dataKey: string;
  unit?: {
    text?: string;
    show?: boolean;
  };
};

export type TableBody<Value = unknown> = {
  value: Value;
  dataKey: string;
  unit?: {
    text?: string;
    show?: boolean;
  };
};

export type MatrixTable = [TableHeader[], ...TableBody[][]];

export type UiTableProps = {
  caption?: string;
  thead: TableHeader[];
  tbody: TableBody[][];
  size?: string;
};

export type CmdTablePipeRequest<Opt = unknown, Args = unknown[]> = CmdRequest<
  Opt,
  Args,
  ControllerMethodComponentResponse<UiTableProps>
>;
export type TableUnit = ENumberUnit | EPercentageUnit | string;
