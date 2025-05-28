import { type TControllerMethodComponentResponse } from '@istock-shell/iswork';

export type TCmdRequest<Opt = unknown, Args = unknown[], Previous = TControllerMethodComponentResponse> = {
  options: Opt;
  arguments: Args;
  previous?: Previous;
};
