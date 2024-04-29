import { ScopeError } from '@istock/util';

export enum ETokenType {
  space = 'space',
  lineR = 'lineR', // r换行符
  lineN = 'lineN', // n换行符
  parentheses = 'parentheses',
  command = 'command',
  parameter = 'parameter',
  optionKey = 'optionKey',
  pipe = 'pipe',
  keyCommand = 'keyCommand',
  keyCommandContent = 'keyCommandContent',
}

export type TToken = {
  type: ETokenType;
  value: string;
};

export type TTokenMethodResult = {
  isContinue: boolean;
  index: number;
};

export const keyCommand = {
  ai: {
    command: 'ai:',
    content: /^.$/,
  },
  search: {
    command: 'ss:',
    content: /^.$/,
  },
  alias: {
    command: ':',
    content: /^.$/,
  },
};

export class Tokenizer {
  // 空格
  // eslint-disable-next-line no-irregular-whitespace
  readonly #space = /^[\u0020\u3000' ']$/;
  // 所有空白字符
  readonly #whitespace = /^\s$/;
  // 换行符
  readonly #lineR = /^\r$/;
  readonly #lineN = /^\n$/;
  // 关键词
  readonly #keyCommand = keyCommand;

  // 圆括号字符
  readonly #parenthesesLeft = /^[(（]$/;
  readonly #parenthesesRight = /^[)）]$/;
  // 管道
  readonly #pipeAnd = /^&$/;
  readonly #pipeOr = /^\|$/;

  // 命令
  readonly #command = /^[a-zA-Z]$/;
  // 参数
  readonly #parameter = /^[^()（）|&\s]$/;
  // 选项
  readonly #optionKeyPrefix = /^-$/;
  readonly #optionKey = /^[-a-zA-Z0-9\u4E00-\u9FA5]$/;
  // 字符串符号
  readonly #strSymbol = /^['"`]$/;

  symbol = {
    parenthesesLeft: ['(', '（'],
    parenthesesRight: [')', '）'],
    pipeOr: ['|'], // 无论第一个命令是否错误，都会执行第二个命令，只显示第二个命令输出
    pipeAnd: ['&'], // 无论第一个命令是否错误，都会显示第一个命令和第二个命令的输出
    pipe2Or: ['||'], // 第一个命令正确，显示第一命令输出。第一个命令错误，显示第二个命令输出。
    pipe2And: ['&&'], // 第一个命令正确，第一个和第二个命令的输出都会显示。第一个命令错误，不执行第二个命令。
    options: ['-'],
  };

  /**
   * 把输入字符串解析成token
   * @param input
   * @param isCheck
   */
  parse(input: string, isCheck = true) {
    let currentIndex = 0;
    const tokens: TToken[] = [];

    while (currentIndex < input.length) {
      const char = input[currentIndex];

      const whiteSpaceResult = this.#whiteSpaceSymbol(tokens, input, currentIndex);
      currentIndex = whiteSpaceResult.index;
      if (whiteSpaceResult.isContinue) continue;

      // 处理左圆括号
      if (this.#parenthesesLeft.test(char)) {
        tokens.push({
          type: ETokenType.parentheses,
          value: char,
        });
        currentIndex++;
        continue;
      }

      // 处理右圆括号
      if (this.#parenthesesRight.test(char)) {
        tokens.push({
          type: ETokenType.parentheses,
          value: char,
        });
        currentIndex++;
        continue;
      }

      // 处理and管道操作符
      if (this.#pipeAnd.test(char)) {
        let value = char;
        currentIndex++;
        if (this.#pipeAnd.test(input[currentIndex])) {
          value += input[currentIndex];
          currentIndex++;
        }
        tokens.push({ type: ETokenType.pipe, value });
        continue;
      }

      // 处理or管道操作符
      if (this.#pipeOr.test(char)) {
        let value = char;
        currentIndex++;
        if (this.#pipeOr.test(input[currentIndex])) {
          value += input[currentIndex];
          currentIndex++;
        }
        tokens.push({ type: ETokenType.pipe, value });
        continue;
      }

      // 关键词命令
      const keywordsResult = this.#tokenizerKeywords(tokens, input, currentIndex);
      currentIndex = keywordsResult.index;
      if (keywordsResult.isContinue) continue;

      // 命令处理
      const commandResult = this.#tokenizerCommand(tokens, input, currentIndex);
      currentIndex = commandResult.index;
      if (commandResult.isContinue) continue;

      // 容错处理，如果我们什么都没有匹配到，说明这个token不在我们的解析范围内
      throw new ScopeError(`command.${this.constructor.name}`, `解析第${currentIndex + 1}个字符${char}失败`);
    }

    if (isCheck) this.#checkSyntax(tokens);

    return tokens;
  }

  /**
   * 检查是否有格式错误
   * @param tokens
   * @private
   */
  #checkSyntax(tokens: TToken[]) {
    // 过滤掉无意义的符号
    tokens = tokens.filter((token) => {
      return ![ETokenType.space, ETokenType.lineN, ETokenType.lineR].includes(token.type);
    });
    let index = 0;
    const symbol = this.symbol;

    const check: () => void = () => {
      let token: TToken = tokens[index];
      // 左括号匹配校验
      if (token.type === ETokenType.parentheses && symbol.parenthesesLeft.includes(token.value)) {
        token = tokens[++index];
        if (!token) {
          throw new ScopeError(
            `command.${this.constructor.name}`,
            `左圆括号后面需要有命令，位置"${this.#getErrorPosition(tokens, index)}"`
          );
        }
        if (token.type === ETokenType.pipe) {
          throw new ScopeError(
            `command.${this.constructor.name}`,
            `左圆括号身后不能有操作符，位置"${this.#getErrorPosition(tokens, index)}"`
          );
        }
        if (token.type === ETokenType.parentheses && symbol.parenthesesRight.includes(token.value)) {
          throw new ScopeError(
            `command.${this.constructor.name}`,
            `圆括号里面没有命令，位置"${this.#getErrorPosition(tokens, index)}"`
          );
        }

        while (token.type !== ETokenType.parentheses || !symbol.parenthesesRight.includes(token.value)) {
          check();
          token = tokens[index];
          if (!token) {
            throw new ScopeError(
              `command.${this.constructor.name}`,
              `未匹配右圆括号，位置"${this.#getErrorPosition(tokens, index)}"`
            );
          }
        }
        // index已经验证为右圆括号，所以执行下个token验证
        index++;
        return;
      }
      // 右括号匹配校验
      if (token.type === ETokenType.parentheses && symbol.parenthesesRight.includes(token.value)) {
        throw new ScopeError(
          `command.${this.constructor.name}`,
          `未匹配到左圆括号，位置"${this.#getErrorPosition(tokens, index)}"`
        );
      }

      // 管道校验
      const isPipe =
        symbol.pipeOr.includes(token.value) ||
        symbol.pipeAnd.includes(token.value) ||
        symbol.pipe2Or.includes(token.value) ||
        symbol.pipe2And.includes(token.value);
      if (token.type === ETokenType.pipe && isPipe) {
        const afterToken = tokens[index + 1];
        if (
          !afterToken ||
          ![ETokenType.command, ETokenType.keyCommand, ETokenType.parentheses].includes(afterToken.type) ||
          (ETokenType.parentheses === afterToken.type && !symbol.parenthesesLeft.includes(afterToken.value))
        ) {
          throw new ScopeError(
            `command.${this.constructor.name}`,
            `管道后面需要跟命令名，位置"${this.#getErrorPosition(tokens, index)}"`
          );
        }
      }

      // 关键字命令校验
      if (token.type === ETokenType.keyCommand) {
        const afterToken = tokens[index + 1];
        if (!afterToken || afterToken.type !== ETokenType.keyCommandContent) {
          throw new ScopeError(
            `command.${this.constructor.name}`,
            `关键字命令后面需要有内容，位置"${this.#getErrorPosition(tokens, index)}"`
          );
        }
      }

      // 命令校验
      if (token.type === ETokenType.command) {
        /* empty */
      }

      index++;
    };

    while (index < tokens.length) {
      check();
    }
  }

  /**
   * 符号分析
   * @param tokens token数组
   * @param input 输入字符串
   * @param index 当前索引
   * @private
   */
  #whiteSpaceSymbol(tokens: TToken[], input: string, index: number) {
    const char = input[index];
    const firstIndex = index;
    // 空格
    if (this.#space.test(char)) {
      tokens.push({
        type: ETokenType.space,
        value: char,
      });
      index++;
    }

    // \r
    if (this.#lineR.test(char)) {
      tokens.push({
        type: ETokenType.lineR,
        value: char,
      });
      index++;
    }

    // \n
    if (this.#lineN.test(char)) {
      tokens.push({
        type: ETokenType.lineN,
        value: char,
      });
      index++;
    }

    // 如果上面没匹配到再匹配，匹配到其它空白字符跳过不处理
    if (firstIndex === index && this.#whitespace.test(char)) {
      index++;
    }

    return { isContinue: firstIndex !== index, index };
  }

  /**
   * 分析每一条关键字语句命令
   * @param tokens token数组
   * @param input 输入字符串
   * @param index 当前索引
   * @private
   */
  #tokenizerKeywords(tokens: TToken[], input: string, index: number): TTokenMethodResult {
    const { ai, search, alias } = this.#keyCommand;
    let char = input[index];
    if (index === 0 && alias.command[0] === char) {
      tokens.push({ type: ETokenType.keyCommand, value: alias.command });
      index += alias.command.length;
      char = input[index];
      if (char) {
        let content = '';
        while (alias.content.test(char)) {
          content += char;
          char = input[++index];
        }
        if (content) {
          tokens.push({ type: ETokenType.keyCommandContent, value: content.trim() });
        }
      }
      return { isContinue: true, index };
    }
    // ai关键字匹配
    if (index === 0 && ai.command[0] === char) {
      const command = input.substring(index, ai.command.length);
      if (command === ai.command) {
        tokens.push({ type: ETokenType.keyCommand, value: command });
        index += ai.command.length;
        char = input[index];
        if (char) {
          let content = '';
          while (ai.content.test(char)) {
            content += char;
            char = input[++index];
          }
          if (content) {
            tokens.push({ type: ETokenType.keyCommandContent, value: content.trim() });
          }
        }
        return { isContinue: true, index };
      }
    }

    // search关键字匹配
    if (index === 0 && search.command[0] === char) {
      const command = input.substring(index, search.command.length);
      if (command === search.command) {
        tokens.push({ type: ETokenType.keyCommand, value: command });
        index += search.command.length;
        char = input[index];
        if (char) {
          let content = '';
          while (search.content.test(char)) {
            content += char;
            char = input[++index];
          }
          if (content) {
            tokens.push({ type: ETokenType.keyCommandContent, value: content.trim() });
          }
        }
        return { isContinue: true, index };
      }
    }

    // 不是命令相关字符标记后面程序继续处理
    return { isContinue: false, index };
  }

  /**
   * 分析每一条命令
   * @param tokens token数组
   * @param input 输入字符串
   * @param index 当前索引
   * @private
   */
  #tokenizerCommand(tokens: TToken[], input: string, index: number): TTokenMethodResult {
    let acceptParameterToken = false;
    const commandFirstIndex = index;

    while (index < input.length) {
      let char = input[index];

      const whiteSpaceResult = this.#whiteSpaceSymbol(tokens, input, index);
      index = whiteSpaceResult.index;
      if (whiteSpaceResult.isContinue) continue;

      // 选项key处理
      if (this.#optionKeyPrefix.test(char)) {
        let value = '';
        while (this.#optionKey.test(char)) {
          value += char;
          char = input[++index];
        }
        tokens.push({ type: ETokenType.optionKey, value });
        continue;
      }

      // 处理命令字符
      if (this.#command.test(char) && !acceptParameterToken) {
        let value = '';
        while (this.#command.test(char)) {
          value += char;
          char = input[++index];
        }
        tokens.push({ type: ETokenType.command, value });
        acceptParameterToken = true;
        continue;
      }

      // 参数处理
      if (this.#parameter.test(char) && acceptParameterToken) {
        let value = '';
        // 处理字符串的情况，允许字符串里面有各种字符
        if (this.#strSymbol.test(char)) {
          // `'"符号分隔
          let symbol: string | undefined;
          while (index < input.length) {
            value += char;
            // 字符串尾跳出循环
            if (symbol === char) {
              char = input[++index];
              break;
            }
            // 字符串首赋值给字符串尾去判断
            if (symbol === undefined) symbol = char;
            char = input[++index];
          }
        } else {
          while (char && !this.#space.test(char)) {
            // 空格分隔
            value += char;
            char = input[++index];
          }
        }
        tokens.push({ type: ETokenType.parameter, value });
        continue;
      }

      break;
    }

    acceptParameterToken = false;

    // 不是命令相关字符标记后面程序继续处理
    return { isContinue: commandFirstIndex !== index, index };
  }

  /**
   * 获取错误位置
   * @param tokens
   * @param currentIndex
   * @private
   */
  #getErrorPosition(tokens: TToken[], currentIndex: number): string {
    const beforeToken = tokens[currentIndex - 1];
    const token = tokens[currentIndex];
    const afterToken = tokens[currentIndex + 1];
    return [beforeToken, token, afterToken]
      .filter((token) => token)
      .map((token) => token.value)
      .join(' ');
  }
}

/* const tokenizer = new Tokenizer();
function log (input: string) {
  let result: any;
  try {
    result = tokenizer.parse(input);
  } catch (e) {
    result = e;
  } finally {
    console.log(result);
  }
}
log('(aaa bbb -dd');
log('aaa bbb -dd)');
log('ai:');
log('(ai');
log('ping a -a ||');
log('ping a -a &');
log('ping a -a && (npm run | docker run');
log('ping a -a && npm run | docker run)');
log('ping a -a && (npm run | docker run)'); */
