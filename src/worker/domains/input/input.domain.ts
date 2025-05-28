import { Global, Domain } from '@istock-shell/iswork';
import { InputController } from './input.controller';
import { InputService } from './input.service';

@Global()
@Domain({
  name: 'input',
  viewName: '命令输入',
  providers: [InputService],
  controllers: [InputController],
  imports: [],
  exports: [],
})
export class InputDomain {}
