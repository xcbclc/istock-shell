import { Controller, Method, Field } from '@istock-shell/iswork';
import type { Token } from '@istock-shell/command-parser';
import { InputService } from './input.service';

@Controller('input')
export class InputController {
  constructor(private readonly inputService: InputService) {}

  @Method('merge')
  mergeInput(@Field('input') tokens: Token[], @Field('merge') merge: string) {
    return this.inputService.mergeInput(tokens, merge);
  }
}
