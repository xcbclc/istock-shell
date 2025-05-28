import { Injectable } from '@istock-shell/iswork';
import { TokenType, type Token } from '@istock-shell/command-parser';

@Injectable()
export class InputService {
  mergeInput(tokens: Token[], merge: string) {
    let index = tokens.length - 1;
    while (index) {
      const token = tokens[index];
      if (token.type === TokenType.command && merge.startsWith(token.value)) {
        token.value = merge;
        tokens[index] = token;
        break;
      }
      index--;
    }
    return tokens;
  }
}
