import { Controller, Method, Field } from '@istock/iswork';
import type { TToken } from '@istock/command-parser';
import { InputService } from './input.service';

@Controller('input')
export class InputController {
  constructor(private readonly inputService: InputService) {}

  @Method('merge')
  mergeInput(@Field('input') tokens: TToken[], @Field('merge') merge: string) {
    return this.inputService.mergeInput(tokens, merge);
  }
}
