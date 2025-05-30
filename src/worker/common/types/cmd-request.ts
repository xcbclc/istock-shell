import { type ControllerMethodComponentResponse } from '@istock-shell/iswork';

export type TCmdRequest<Opt = unknown, Args = unknown[], Previous = ControllerMethodComponentResponse> = {
  options: Opt;
  arguments: Args;
  previous?: Previous;
};
