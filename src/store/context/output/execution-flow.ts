import { isNil, ScopeError } from '@istock-shell/util';
import {
  type CommandItemResult,
  type KeyCommandResult,
  type CommandResult,
  AstTreeType,
} from '@istock-shell/command-parser';
import { MessageCmdAction, MessageStatus, type AnyObject } from '@istock-shell/iswork';
import type { Output, OutputStoreDataItem, OutputStoreComponentInfo } from '@/store';
import type { CmdWindowContextData } from '@/window';
import { getOutputErrorData } from './default-output';

type DeepOutputs = Array<OutputStoreComponentInfo[] | OutputStoreComponentInfo>;

/**
 * 解析命令信息
 */
const resolveCommandInfo = (
  cmdItemResult: CommandItemResult,
  cmdRoute: any,
  domainNames: string[],
  input: string,
  context?: CmdWindowContextData,
  previousOutput?: any
) => {
  let domainPath = '';
  let executePath = '';
  let payload: AnyObject | null = null;

  if (cmdItemResult.type === AstTreeType.keyCommand) {
    const keyCommandResult = cmdItemResult as unknown as KeyCommandResult;
    switch (keyCommandResult.cmd) {
      /* case '':
        domainPath = 'global';
        executePath = 'cmdAlias.recommend';
        break; */
      case 'ai':
        domainPath = 'global';
        executePath = 'ai.send';
        break;
      case 'ss':
        domainPath = '';
        executePath = '';
        break;
      default:
        throw new ScopeError('store.cmd-output', `没有找到该关键字命令处理程序:${keyCommandResult.cmd}`);
    }
    payload = { arguments: keyCommandResult.arguments, context: context?.messageContext };
  } else if (cmdItemResult.type === AstTreeType.command) {
    let commandResult = cmdItemResult as unknown as CommandResult;
    const cmds: string[] = [commandResult.cmd];
    while (commandResult?.subCommand) {
      commandResult = commandResult.subCommand;
      cmds.push(commandResult.cmd);
    }
    const cmdpAddressInfo = cmdRoute.getCmdpAddressInfo(cmds, domainNames);
    if (!cmdpAddressInfo) {
      throw new ScopeError('store.cmd-output', `未找该命令:${input}`);
    }
    domainPath = cmdpAddressInfo.domainPath;
    executePath = cmdpAddressInfo.executePath;
    payload = {
      options: commandResult.options,
      arguments: commandResult.arguments,
      context: context?.messageContext,
      previous: {
        output: previousOutput,
      },
    };
  }

  return { domainPath, executePath, payload };
};

/**
 * 处理管道逻辑
 * 返回 true 表示需要中断执行
 */
const processPipeLogic = (
  pipeValue: string,
  symbol: any,
  outputStatus: boolean[],
  outputs: DeepOutputs,
  allOutputs: DeepOutputs,
  output: Output,
  maxExecution: number
): boolean => {
  const status = outputStatus[outputStatus.length - 1] ?? true;
  let shouldBreak = false;

  if (symbol.pipeOr.includes(pipeValue)) {
    outputs.pop();
  }
  if (symbol.pipeAnd.includes(pipeValue)) {
    /* empty */
  }
  if (symbol.pipe2Or.includes(pipeValue)) {
    if (status) {
      shouldBreak = true;
    } else {
      outputs.pop();
    }
  }
  if (symbol.pipe2And.includes(pipeValue)) {
    if (!status) {
      shouldBreak = true;
    }
  }

  output.updateLastOutputData(allOutputs.flat(maxExecution) as OutputStoreComponentInfo[], 'message');
  return shouldBreak;
};

/**
 * 执行消息发送
 */
const executeMessage = async (
  output: Output,
  domainPath: string,
  executePath: string,
  payload: any,
  metaDomain: string,
  outputs: DeepOutputs,
  outputStatus: boolean[],
  allOutputs: DeepOutputs,
  maxExecution: number,
  hasPipeSymbol: boolean
) => {
  try {
    // 发送命令数据
    const result = await output.ctx.message.send<OutputStoreDataItem>(domainPath, executePath, payload, {
      domainName: metaDomain,
    });
    const response = result.payload;
    if (!response) {
      throw new ScopeError('store.cmd-output', '未返回数据');
    }
    const outputData = response.output;
    outputs.push(outputData);
    outputStatus.push(true);
    if (!hasPipeSymbol) {
      output.updateLastOutputData(allOutputs.flat(maxExecution) as OutputStoreComponentInfo[], 'message');
    }

    if (result.ports?.length && result.meta?.status !== MessageStatus.COMPLETE) {
      output.closeCmdLoading(); // 关闭loading 交给通道消息处理
      // 有消息通道，则监听消息通道的消息
      const messageChannelAsyncIterator = output.ctx.message.getMessageChannelAsyncIterator(result);
      for await (const message of messageChannelAsyncIterator) {
        const { meta, payload: msgPayload } = message;
        if (isNil(msgPayload)) continue;
        if (!meta) continue;
        const componentInfo = msgPayload?.output;
        // 新增
        if (meta.cmdAction === MessageCmdAction.APPEND) {
          componentInfo && output.updateLastOutputData(componentInfo, 'message');
        }
        // 替换
        if (meta.cmdAction === MessageCmdAction.REPLACE) {
          componentInfo && output.replaceLastOutputData(componentInfo, 'message');
        }
        output.closeCmdLoading(); // 每次收到通道消息关闭loading
      }
    }
  } catch (e) {
    // 接口请求错误
    const errorOutputData = getOutputErrorData(e as Error);
    outputs.push(errorOutputData);
    outputStatus.push(false);
    output.updateLastOutputData(errorOutputData, 'message');
  }
};

/**
 * 获取当前命令窗口的所有域名
 */
const getDomainNames = (output: Output) => {
  return output.ctx.store.prompt.data.domains.map((domain) => domain.name);
};

/**
 * 命令执行流方法
 * @param output
 * @param input
 * @param context
 */
export const sendCmdExecutionFlow = async (output: Output, input: string, context?: CmdWindowContextData) => {
  const maxExecution = 50;
  const { cmdRoute } = output.ctx.store;

  const commandParserResult = output.ctx.cmdWindow.cmdParser.parse(input);
  const symbol = output.ctx.cmdWindow.cmdParser.symbol;

  const allOutputs: DeepOutputs = [];

  const sendToWebWork = async (cmdResultList: CommandItemResult[], outputs: DeepOutputs) => {
    const outputStatus: boolean[] = [];
    let index = 0;
    let pipeValue: string = '';

    try {
      while (index < cmdResultList.length) {
        if (outputStatus.length >= maxExecution) {
          throw new ScopeError('store.cmd-output', `超出最大(${maxExecution})发送命令限制`);
        }
        const cmdItemResult = cmdResultList[index];
        const nextCmdItemResult = cmdResultList[index + 1];

        // 1. 括号命令优先执行
        if (cmdItemResult.type === AstTreeType.parentheses) {
          const childrenOutputs: OutputStoreComponentInfo[] = [];
          allOutputs.push(childrenOutputs);
          const result = await sendToWebWork(cmdItemResult.children, childrenOutputs);
          outputStatus.push(result.status);
          index++;
          continue;
        }

        // 2. 管道符记录管道值并跳过
        if (cmdItemResult.type === AstTreeType.pipe) {
          pipeValue = cmdItemResult.value;
          index++;
          continue;
        }

        // 3. 处理命令 (Command / KeyCommand)
        if ([AstTreeType.keyCommand, AstTreeType.command].includes(cmdItemResult.type)) {
          // 3.1 处理管道逻辑 (如果有待处理的管道符)
          let pipeInputData: any = null;
          if (pipeValue) {
            if (symbol.pipeOr.includes(pipeValue)) {
              pipeInputData = outputs[outputs.length - 1];
            }
            const shouldBreak = processPipeLogic(
              pipeValue,
              symbol,
              outputStatus,
              outputs,
              allOutputs,
              output,
              maxExecution
            );
            pipeValue = ''; // 重置管道符
            if (shouldBreak) break;
            // 3.2 暂时延迟一段时间，确保依赖的上一个通道消息处理完成
            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          // 3.2 解析命令参数
          const previousOutput = pipeInputData ?? outputs[outputs.length - 1] ?? null;
          const { domainPath, executePath, payload } = resolveCommandInfo(
            cmdItemResult,
            cmdRoute,
            getDomainNames(output),
            input,
            context,
            previousOutput
          );

          // 3.3 执行命令
          const hasPipeSymbol = nextCmdItemResult?.type === AstTreeType.pipe;
          await executeMessage(
            output,
            domainPath,
            executePath,
            payload,
            getDomainNames(output).join('.'),
            outputs,
            outputStatus,
            allOutputs,
            maxExecution,
            hasPipeSymbol
          );

          index++;
          continue;
        }

        throw new ScopeError('store.cmd-output', `该未知类型未处理，${JSON.stringify(cmdItemResult)}`);
      }
    } catch (e) {
      // 命令运行时错误
      const errorOutputData = getOutputErrorData(e as Error);
      outputs.push(errorOutputData);
      outputStatus.push(false);
      output.updateLastOutputData(errorOutputData, 'self');
    }

    return {
      outputs,
      status: outputStatus[outputStatus.length - 1] ?? true,
    };
  };

  return await sendToWebWork(commandParserResult.children, allOutputs);
};
