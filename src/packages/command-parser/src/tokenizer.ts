import { ScopeError } from '@istock-shell/util';

/**
 * Token 类型枚举
 *
 * 定义了词法分析过程中可能产生的所有 Token 类型。
 * 每种类型代表命令行输入中的不同语法元素。
 *
 * @public
 */
export enum TokenType {
  /** 空格字符 */
  space = 'space',
  /** 回车符 (\r) */
  lineR = 'lineR',
  /** 换行符 (\n) */
  lineN = 'lineN',
  /** 圆括号字符（包括左右圆括号） */
  parentheses = 'parentheses',
  /** 普通命令 */
  command = 'command',
  /** 参数值 */
  parameter = 'parameter',
  /** 选项键（如 -v、--help 等） */
  optionKey = 'optionKey',
  /** 管道操作符（如 |、&、||、&& 等） */
  pipe = 'pipe',
  /** 关键字命令（如 ai:、ss: 等） */
  keyCommand = 'keyCommand',
  /** 关键字命令的内容部分 */
  keyCommandContent = 'keyCommandContent',
  /** 提及（如 @[id,label] 或 #[id,label]） */
  mention = 'mention',
}

/**
 * Token 数据结构
 *
 * 表示词法分析过程中产生的最小语法单元
 *
 * @public
 */
export type Token = {
  /** Token 的类型 */
  type: TokenType;
  /** Token 的值 */
  value: string;
};

/**
 * Token 方法执行结果
 *
 * 用于内部方法返回处理状态和索引位置
 *
 * @internal
 */
export type TokenMethodResult = {
  /** 是否应该继续处理下一个字符 */
  isContinue: boolean;
  /** 当前处理到的字符索引 */
  index: number;
};

/**
 * 关键字命令配置
 *
 * 定义了支持的关键字命令及其匹配规则
 *
 * @public
 */
export const keyCommand = {
  /** AI 助手命令配置 */
  ai: {
    /** 命令前缀 */
    command: 'ai:',
    /** 内容匹配正则表达式 */
    content: /^.$/,
  },
  /** 搜索命令配置 */
  search: {
    /** 命令前缀 */
    command: 'ss:',
    /** 内容匹配正则表达式 */
    content: /^.$/,
  },
  /** 别名命令配置 */
  alias: {
    /** 命令前缀 */
    command: ':',
    /** 内容匹配正则表达式 */
    content: /^.$/,
  },
};

/**
 * 词法分析器类
 *
 * 负责将输入的命令行字符串分解为 Token 序列。
 * 该类是命令解析流程的第一步，将连续的字符串转换为
 * 具有语义的词法单元，为后续的语法分析做准备。
 *
 * 支持的语法元素包括：
 * - 普通命令和参数
 * - 选项键（如 -v、--help）
 * - 管道操作符（|、&、||、&&）
 * - 圆括号分组
 * - 关键字命令（ai:、ss:、:）
 * - 字符串字面量（支持单引号、双引号、反引号）
 *
 * @example
 * ```typescript
 * const tokenizer = new Tokenizer();
 * const tokens = tokenizer.parse('ls -la | grep test');
 * console.log(tokens);
 * ```
 *
 * @public
 */
export class Tokenizer {
  /** 空格字符正则表达式（包括普通空格、全角空格等） */

  readonly #space = /^[\u0020\u3000' ']$/;

  /** 所有空白字符正则表达式 */
  readonly #whitespace = /^\s$/;

  /** 回车符正则表达式 */
  readonly #lineR = /^\r$/;

  /** 换行符正则表达式 */
  readonly #lineN = /^\n$/;

  /** 关键字命令配置 */
  readonly #keyCommand = keyCommand;

  /** 左圆括号正则表达式（支持中英文圆括号） */
  readonly #parenthesesLeft = /^[(（]$/;

  /** 右圆括号正则表达式（支持中英文圆括号） */
  readonly #parenthesesRight = /^[)）]$/;

  /** AND 管道操作符正则表达式 */
  readonly #pipeAnd = /^&$/;

  /** OR 管道操作符正则表达式 */
  readonly #pipeOr = /^\|$/;

  /** 命令起始正则表达式（支持字母） */
  readonly #commandStart = /^[a-zA-Z]$/;

  /** 命令内容正则表达式（支持字母、数字和下划线） */
  readonly #commandContent = /^[a-zA-Z0-9_]$/;

  /** 参数值正则表达式（排除特殊字符） */
  readonly #parameter = /^[^()（）|&\s]$/;

  /** 选项键前缀正则表达式 */
  readonly #optionKeyPrefix = /^-$/;

  /** 选项键正则表达式（支持字母、数字、中文、下划线） */
  readonly #optionKey = /^[-a-zA-Z0-9_\u4E00-\u9FA5]$/;

  /** 字符串引号正则表达式（支持单引号、双引号、反引号） */
  readonly #strSymbol = /^['"\`]$/;

  /**
   * 符号配置对象
   *
   * 定义了各种操作符和分隔符的具体值及其语义
   */
  symbol = {
    /** 左圆括号符号列表 */
    parenthesesLeft: ['(', '（'],
    /** 右圆括号符号列表 */
    parenthesesRight: [')', '）'],
    /** OR 管道符号列表 - 无论第一个命令是否错误，都会执行第二个命令，只显示第二个命令输出 */
    pipeOr: ['|'],
    /** AND 管道符号列表 - 无论第一个命令是否错误，都会显示第一个命令和第二个命令的输出 */
    pipeAnd: ['&'],
    /** 条件 OR 管道符号列表 - 第一个命令正确，显示第一命令输出。第一个命令错误，显示第二个命令输出 */
    pipe2Or: ['||'],
    /** 条件 AND 管道符号列表 - 第一个命令正确，第一个和第二个命令的输出都会显示。第一个命令错误，不执行第二个命令 */
    pipe2And: ['&&'],
    /** 选项前缀符号列表 */
    options: ['-'],
  };

  /**
   * 解析输入字符串为 Token 序列
   *
   * 这是词法分析的主要方法，将输入的命令行字符串逐字符解析，
   * 识别各种语法元素并生成对应的 Token。解析过程包括：
   *
   * 1. 逐字符扫描输入字符串
   * 2. 识别空白字符并处理行列位置
   * 3. 识别关键字命令（如 ai:、ss: 等）
   * 4. 识别普通命令、参数、选项等
   * 5. 进行语法检查，确保括号匹配、管道符使用正确等
   *
   * @param input - 要解析的命令行字符串
   * @param isCheck - 是否进行语法检查，默认为 true
   * @returns Token 序列数组
   *
   * @example
   * ```typescript
   * const tokenizer = new Tokenizer();
   *
   * // 解析简单命令
   * const tokens1 = tokenizer.parse('ls -la');
   * console.log(tokens1);
   * // 输出: [{type: 'command', value: 'ls'}, {type: 'space', value: ' '}, {type: 'optionKey', value: '-la'}]
   *
   * // 解析带管道的命令
   * const tokens2 = tokenizer.parse('ls | grep test');
   * // 输出包含命令、管道和参数的 Token 序列
   *
   * // 解析关键字命令
   * const tokens3 = tokenizer.parse('ai: help me');
   * // 输出包含关键字命令和内容的 Token 序列
   *
   * // 跳过语法检查
   * const tokens4 = tokenizer.parse('incomplete command', false);
   * ```
   *
   * @throws {ScopeError} 当遇到无法识别的字符或语法错误时抛出
   *
   * @public
   */
  parse(input: string, isCheck = true) {
    /** 当前处理的字符索引位置 */
    let currentIndex = 0;
    /** 生成的 Token 序列数组 */
    const tokens: Token[] = [];

    // 逐字符扫描输入字符串
    while (currentIndex < input.length) {
      const char = input[currentIndex];

      // 处理空白字符（空格、制表符、换行符等）
      const whiteSpaceResult = this.#whiteSpaceSymbol(tokens, input, currentIndex);
      currentIndex = whiteSpaceResult.index;
      if (whiteSpaceResult.isContinue) continue;

      // 处理左圆括号（支持中英文圆括号）
      if (this.#parenthesesLeft.test(char)) {
        tokens.push({
          type: TokenType.parentheses,
          value: char,
        });
        currentIndex++;
        continue;
      }

      // 处理右圆括号（支持中英文圆括号）
      if (this.#parenthesesRight.test(char)) {
        tokens.push({
          type: TokenType.parentheses,
          value: char,
        });
        currentIndex++;
        continue;
      }

      // 处理 AND 管道操作符（& 和 &&）
      if (this.#pipeAnd.test(char)) {
        let value = char;
        currentIndex++;
        // 检查是否为双字符操作符 &&
        if (this.#pipeAnd.test(input[currentIndex])) {
          value += input[currentIndex];
          currentIndex++;
        }
        tokens.push({ type: TokenType.pipe, value });
        continue;
      }

      // 处理 OR 管道操作符（| 和 ||）
      if (this.#pipeOr.test(char)) {
        let value = char;
        currentIndex++;
        // 检查是否为双字符操作符 ||
        if (this.#pipeOr.test(input[currentIndex])) {
          value += input[currentIndex];
          currentIndex++;
        }
        tokens.push({ type: TokenType.pipe, value });
        continue;
      }

      // 尝试解析关键字命令（如 ai:、ss:、: 等）
      const keywordsResult = this.#tokenizerKeywords(tokens, input, currentIndex);
      currentIndex = keywordsResult.index;
      if (keywordsResult.isContinue) continue;

      // 尝试解析普通命令、参数、选项等
      const commandResult = this.#tokenizerCommand(tokens, input, currentIndex);
      currentIndex = commandResult.index;
      if (commandResult.isContinue) continue;

      // 容错处理：如果无法识别当前字符，抛出错误
      throw new ScopeError(
        `command.${this.constructor.name}`,
        `解析第${currentIndex + 1}个字符'${char}'失败，该字符不在支持的语法范围内`
      );
    }

    // 根据参数决定是否进行语法检查
    if (isCheck) this.#checkSyntax(tokens);

    return tokens;
  }

  /**
   * 检查 Token 序列的语法正确性
   *
   * 对生成的 Token 序列进行语法检查，确保命令行语法的正确性。
   * 检查项目包括：
   *
   * 1. 圆括号匹配检查 - 确保左右圆括号数量匹配且顺序正确
   * 2. 管道符使用检查 - 确保管道符不在开头/结尾，不连续出现
   * 3. 关键字命令检查 - 确保关键字命令后有相应参数
   * 4. 普通命令检查 - 确保命令语法结构正确
   *
   * @param tokens - 要检查的 Token 序列
   * @throws {ScopeError} 当发现语法错误时抛出详细的错误信息
   *
   * @private
   */
  #checkSyntax(tokens: Token[]) {
    // 过滤掉无意义的符号
    tokens = tokens.filter((token) => {
      return ![TokenType.space, TokenType.lineN, TokenType.lineR].includes(token.type);
    });
    let index = 0;
    const symbol = this.symbol;

    const check: () => void = () => {
      let token: Token = tokens[index];
      // 左括号匹配校验
      if (token.type === TokenType.parentheses && symbol.parenthesesLeft.includes(token.value)) {
        token = tokens[++index];
        if (!token) {
          throw new ScopeError(
            `command.${this.constructor.name}`,
            `左圆括号后面需要有命令，位置"${this.#getErrorPosition(tokens, index)}"`
          );
        }
        if (token.type === TokenType.pipe) {
          throw new ScopeError(
            `command.${this.constructor.name}`,
            `左圆括号身后不能有操作符，位置"${this.#getErrorPosition(tokens, index)}"`
          );
        }
        if (token.type === TokenType.parentheses && symbol.parenthesesRight.includes(token.value)) {
          throw new ScopeError(
            `command.${this.constructor.name}`,
            `圆括号里面没有命令，位置"${this.#getErrorPosition(tokens, index)}"`
          );
        }

        while (token.type !== TokenType.parentheses || !symbol.parenthesesRight.includes(token.value)) {
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
      if (token.type === TokenType.parentheses && symbol.parenthesesRight.includes(token.value)) {
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
      if (token.type === TokenType.pipe && isPipe) {
        const afterToken = tokens[index + 1];
        if (
          !afterToken ||
          ![TokenType.command, TokenType.keyCommand, TokenType.parentheses].includes(afterToken.type) ||
          (TokenType.parentheses === afterToken.type && !symbol.parenthesesLeft.includes(afterToken.value))
        ) {
          throw new ScopeError(
            `command.${this.constructor.name}`,
            `管道后面需要跟命令名，位置"${this.#getErrorPosition(tokens, index)}"`
          );
        }
      }

      // 关键字命令校验
      if (token.type === TokenType.keyCommand) {
        const afterToken = tokens[index + 1];
        if (!afterToken || afterToken.type !== TokenType.keyCommandContent) {
          throw new ScopeError(
            `command.${this.constructor.name}`,
            `关键字命令后面需要有内容，位置"${this.#getErrorPosition(tokens, index)}"`
          );
        }
      }

      // 命令校验
      if (token.type === TokenType.command) {
        /* empty */
      }

      index++;
    };

    while (index < tokens.length) {
      check();
    }
  }

  /**
   * 处理空白字符
   *
   * 检查当前字符是否为空白字符（空格、制表符、换行符等），
   * 如果是则跳过该字符，继续处理下一个字符。
   *
   * @param tokens - Token 序列数组
   * @param input - 输入字符串
   * @param index - 当前字符索引
   * @returns 包含更新后索引和是否继续处理标志的对象
   *
   * @private
   */
  #whiteSpaceSymbol(tokens: Token[], input: string, index: number) {
    const char = input[index];
    const firstIndex = index;
    // 空格
    if (this.#space.test(char)) {
      tokens.push({
        type: TokenType.space,
        value: char,
      });
      index++;
    }

    // \r
    if (this.#lineR.test(char)) {
      tokens.push({
        type: TokenType.lineR,
        value: char,
      });
      index++;
    }

    // \n
    if (this.#lineN.test(char)) {
      tokens.push({
        type: TokenType.lineN,
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
   * 解析关键字命令
   *
   * 尝试匹配当前位置是否为关键字命令（如 ai:、ss:、: 等）。
   * 关键字命令是特殊的命令前缀，用于标识特定类型的操作。
   *
   * @param tokens - Token 序列数组，用于添加识别到的关键字命令 Token
   * @param input - 输入字符串
   * @param index - 当前字符索引
   * @returns 包含更新后索引和是否继续处理标志的对象
   *
   * @private
   */
  #tokenizerKeywords(tokens: Token[], input: string, index: number): TokenMethodResult {
    const { ai, search, alias } = this.#keyCommand;
    let char = input[index];
    if (index === 0 && alias.command[0] === char) {
      tokens.push({ type: TokenType.keyCommand, value: alias.command });
      index += alias.command.length;
      char = input[index];
      if (char) {
        let content = '';
        while (alias.content.test(char)) {
          content += char;
          char = input[++index];
        }
        if (content) {
          tokens.push({ type: TokenType.keyCommandContent, value: content.trim() });
        }
      }
      return { isContinue: true, index };
    }
    // ai关键字匹配
    if (index === 0 && ai.command[0] === char) {
      const command = input.substring(index, ai.command.length);
      if (command === ai.command) {
        tokens.push({ type: TokenType.keyCommand, value: command });
        index += ai.command.length;
        char = input[index];
        if (char) {
          let content = '';
          while (ai.content.test(char)) {
            // 检查是否为 mention 格式 @[id,label] 或 #[id,label]
            if ((char === '@' || char === '#') && input[index + 1] === '[') {
              let tempIndex = index + 2;
              let foundComma = false;
              let foundClose = false;
              while (input[tempIndex]) {
                if (input[tempIndex] === ']') {
                  foundClose = true;
                  break;
                }
                if (input[tempIndex] === ',') {
                  foundComma = true;
                }
                tempIndex++;
              }

              if (foundComma && foundClose) {
                if (content) {
                  tokens.push({ type: TokenType.keyCommandContent, value: content });
                  content = '';
                }
                const mention = input.substring(index, tempIndex + 1);
                tokens.push({ type: TokenType.mention, value: mention });
                index = tempIndex + 1;
                char = input[index];
                continue;
              }
            }
            content += char;
            char = input[++index];
          }
          if (content) {
            tokens.push({ type: TokenType.keyCommandContent, value: content });
          }
        }
        return { isContinue: true, index };
      }
    }

    // search关键字匹配
    if (index === 0 && search.command[0] === char) {
      const command = input.substring(index, search.command.length);
      if (command === search.command) {
        tokens.push({ type: TokenType.keyCommand, value: command });
        index += search.command.length;
        char = input[index];
        if (char) {
          let content = '';
          let hasPushedToken = false;
          while (search.content.test(char)) {
            // 检查是否为 mention 格式 @[id,label] 或 #[id,label]
            if ((char === '@' || char === '#') && input[index + 1] === '[') {
              let tempIndex = index + 2;
              let foundComma = false;
              let foundClose = false;
              while (input[tempIndex]) {
                if (input[tempIndex] === ']') {
                  foundClose = true;
                  break;
                }
                if (input[tempIndex] === ',') {
                  foundComma = true;
                }
                tempIndex++;
              }

              if (foundComma && foundClose) {
                if (!hasPushedToken) {
                  content = content.trimStart();
                }
                if (content) {
                  tokens.push({ type: TokenType.keyCommandContent, value: content });
                  content = '';
                  hasPushedToken = true;
                }
                const mention = input.substring(index, tempIndex + 1);
                tokens.push({ type: TokenType.mention, value: mention });
                hasPushedToken = true;
                index = tempIndex + 1;
                char = input[index];
                continue;
              }
            }
            content += char;
            char = input[++index];
          }
          if (content) {
            tokens.push({ type: TokenType.keyCommandContent, value: content });
          }
        }
        return { isContinue: true, index };
      }
    }

    // 不是命令相关字符标记后面程序继续处理
    return { isContinue: false, index };
  }

  /**
   * 解析命令、参数、选项等
   *
   * 这是词法分析的核心方法之一，负责识别和解析：
   * - 选项键（以 - 开头的参数，如 -v、--help）
   * - 普通命令（以字母开头的命令名）
   * - 字符串字面量（用引号包围的参数）
   * - 普通参数（其他非特殊字符组成的参数）
   *
   * @param tokens - Token 序列数组，用于添加识别到的 Token
   * @param input - 输入字符串
   * @param index - 当前字符索引
   * @returns 包含更新后索引和是否继续处理标志的对象
   *
   * @private
   */
  #tokenizerCommand(tokens: Token[], input: string, index: number): TokenMethodResult {
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
        tokens.push({ type: TokenType.optionKey, value });
        continue;
      }

      // 处理命令字符
      if (this.#commandStart.test(char) && !acceptParameterToken) {
        let value = '';
        while (this.#commandContent.test(char)) {
          value += char;
          char = input[++index];
        }
        tokens.push({ type: TokenType.command, value });
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
        tokens.push({ type: TokenType.parameter, value });
        continue;
      }

      break;
    }

    acceptParameterToken = false;

    // 不是命令相关字符标记后面程序继续处理
    return { isContinue: commandFirstIndex !== index, index };
  }

  /**
   * 获取指定索引位置的错误上下文信息
   *
   * 用于错误报告和调试，返回指定位置前后的 Token 值，
   * 帮助用户定位语法错误的具体位置。
   *
   * @param tokens - Token 序列数组
   * @param currentIndex - 当前 Token 索引
   * @returns 包含前后上下文的错误位置字符串
   *
   * @private
   */
  #getErrorPosition(tokens: Token[], currentIndex: number): string {
    const beforeToken = tokens[currentIndex - 1];
    const token = tokens[currentIndex];
    const afterToken = tokens[currentIndex + 1];
    return [beforeToken, token, afterToken]
      .filter((token) => token)
      .map((token) => token.value)
      .join(' ');
  }
}
