import { get } from 'svelte/store';
import { isNil, ScopeError } from '@istock/util';
import {
  type TCommandItemResult,
  type TKeyCommandResult,
  type TCommandResult,
  EAstTreeType,
} from '@istock/command-parser';
import { EMessageCmdAction, EMessageStatus } from '@istock/iswork';
import type { TAnyObject } from '@istock/iswork';
import type { CmdWindowContext } from '@/window/cmd-window-context';
import type { ICmdOutput, ICmdOutputData, ICmdOutputWritable } from './store';
import { getOutputErrorData } from './default-output';

type TDeepOutputs = Array<ICmdOutputData[] | ICmdOutputData>;

/**
 * 命令执行流方法
 * @param ctx
 * @param cmdOutput
 * @param input
 */
export const sendCmdExecutionFlow = async (ctx: CmdWindowContext, cmdOutput: ICmdOutputWritable, input: string) => {
  const maxExecution = 50;
  const { workerMessage, domainStore } = ctx;
  const originPrompt = get(ctx.cmdStore.cmdPrompt);
  const { domains } = originPrompt;

  const domainNames: string[] = domains.map((domain) => domain.name);
  const metaDomain: string = domainNames.join('.');
  const commandParserResult = ctx.cmdParser.parse(input);
  const symbol = ctx.cmdParser.symbol;

  const allOutputs: TDeepOutputs = [];

  const sendToWebWork = async (cmdResultList: TCommandItemResult[], outputs: TDeepOutputs) => {
    const outputStatus: boolean[] = [];
    let index = 0;
    try {
      let pipeValue: string = '';
      while (index < cmdResultList.length) {
        if (outputStatus.length >= maxExecution) {
          throw new ScopeError('store.cmd-output', `超出最大(${maxExecution})发送命令限制`);
        }
        const cmdItemResult = cmdResultList[index];
        const nextCmdItemResult = cmdResultList[index + 1];

        // 括号命令优先执行
        if (cmdItemResult.type === EAstTreeType.parentheses) {
          const childrenOutputs: ICmdOutputData[] = [];
          allOutputs.push(childrenOutputs);
          const result = await sendToWebWork(cmdItemResult.children, childrenOutputs);
          outputStatus.push(result.status);
          index++;
          continue;
        }

        // 管道符记录管道值并跳过
        if (cmdItemResult.type === EAstTreeType.pipe) {
          pipeValue = cmdItemResult.value;
          index++;
          continue;
        }

        if ([EAstTreeType.keyCommand, EAstTreeType.command].includes(cmdItemResult.type)) {
          let domainPath: string = '';
          let executePath: string = '';
          let payload: TAnyObject | null = null;
          let hasPipeSymbol = false;
          const previousOutput = outputs[outputs.length - 1] ?? null;

          // 判断下一个指令是否是管道符
          if (nextCmdItemResult && nextCmdItemResult.type === EAstTreeType.pipe) {
            hasPipeSymbol = true;
          }

          // 管道操作符逻辑处理
          if (pipeValue) {
            const status = outputStatus[outputStatus.length - 1] ?? true;
            // 删除上个命令输出，需要继续执行
            if (symbol.pipeOr.includes(pipeValue)) {
              outputs.pop();
            }
            // 继续执行
            if (symbol.pipeAnd.includes(pipeValue)) {
              /* empty */
            }
            // 上个命令输出正确显示上个命令输出，不执行第二个命令；否则，删除上个命令输出，执行这个命令
            if (symbol.pipe2Or.includes(pipeValue)) {
              if (status) {
                pipeValue = '';
                cmdOutput.updateLastOutputData(allOutputs.flat(maxExecution), 'message');
                break;
              } else {
                outputs.pop();
              }
            }
            // 上个命令输出正确显示上个命令输出，上个命令和这个命令输出都要显示，否则，不执行这个命令
            if (symbol.pipe2And.includes(pipeValue)) {
              if (!status) {
                pipeValue = '';
                cmdOutput.updateLastOutputData(allOutputs.flat(maxExecution), 'message');
                break;
              }
            }
            pipeValue = '';
            cmdOutput.updateLastOutputData(allOutputs.flat(maxExecution), 'message');
          }

          // 关键字命令
          // todo 特殊请求处理
          if (cmdItemResult.type === EAstTreeType.keyCommand) {
            const keyCommandResult = cmdItemResult as unknown as TKeyCommandResult;
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
            payload = { arguments: keyCommandResult.arguments };
          }
          // 命令
          if (cmdItemResult.type === EAstTreeType.command) {
            let commandResult = cmdItemResult as unknown as TCommandResult;
            const cmds: string[] = [commandResult.cmd];
            while (commandResult?.subCommand) {
              commandResult = commandResult.subCommand;
              cmds.push(commandResult.cmd);
            }
            const cmdpAddressInfo = domainStore.cmdRoute.getCmdpAddressInfo(cmds, domainNames);
            if (!cmdpAddressInfo) {
              throw new ScopeError('store.cmd-output', `未找该命令:${input}`);
            }
            domainPath = cmdpAddressInfo.domainPath;
            executePath = cmdpAddressInfo.executePath;
            payload = {
              options: commandResult.options,
              arguments: commandResult.arguments,
              previous: {
                output: previousOutput,
              },
            };
          }
          try {
            // 发送命令数据
            const result = await workerMessage.send<ICmdOutput>(domainPath, executePath, payload, {
              domainName: metaDomain,
            });
            const response = result.payload;
            if (!response) {
              throw new ScopeError('store.cmd-output', '未返回数据');
            }
            const outputData = response.output;
            outputs.push(outputData);
            outputStatus.push(true);
            if (!hasPipeSymbol) cmdOutput.updateLastOutputData(allOutputs.flat(maxExecution), 'message');
            if (result.ports?.length && result.meta?.status !== EMessageStatus.COMPLETE) {
              cmdOutput.closeCmdLoading(); // 关闭loading 交给通道消息处理
              // 有消息通道，则监听消息通道的消息
              const messageChannelAsyncIterator = ctx.getMessageChannelAsyncIterator(result);
              for await (const message of messageChannelAsyncIterator) {
                const { meta, payload } = message;
                if (isNil(payload)) continue;
                if (!meta) continue;
                const output = payload?.output;
                // 新增
                if (meta.cmdAction === EMessageCmdAction.APPEND) {
                  output && cmdOutput.updateLastOutputData(output, 'message');
                }
                // 替换
                if (meta.cmdAction === EMessageCmdAction.REPLACE) {
                  output && cmdOutput.replaceLastOutputData(output, 'message');
                }
                cmdOutput.closeCmdLoading(); // 每次收到通道消息关闭loading
              }
            }
          } catch (e) {
            // 接口请求错误
            const errorOutputData = getOutputErrorData(e as Error);
            outputs.push(errorOutputData);
            outputStatus.push(false);
            cmdOutput.updateLastOutputData(errorOutputData, 'message');
          }
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
      cmdOutput.updateLastOutputData(errorOutputData, 'self');
    }
    return {
      outputs,
      status: outputStatus.every((status) => status),
    };
  };
  return await sendToWebWork(commandParserResult.children, allOutputs);
};
