import { Injectable } from '@istock/iswork';
import { ETokenType, type TToken } from '@istock/command-parser';

@Injectable()
export class InputService {
  mergeInput(tokens: TToken[], merge: string) {
    let index = tokens.length - 1;
    while (index) {
      const token = tokens[index];
      if (token.type === ETokenType.command && merge.startsWith(token.value)) {
        token.value = merge;
        tokens[index] = token;
        break;
      }
      index--;
    }
    return tokens;
  }
}
