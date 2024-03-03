import { type TControllerMethodComponentResponse } from '@istock/iswork';

export type TCmdRequest<Opt = unknown, Args = unknown[], Previous = TControllerMethodComponentResponse> = {
  options: Opt;
  arguments: Args;
  previous?: Previous;
};
