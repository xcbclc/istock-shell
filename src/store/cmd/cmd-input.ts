import { writable, type Writable, get } from 'svelte/store';
import type { TToken } from '@istock/command-parser';
import type { CmdWindowContext } from '@/window/cmd-window-context';

export type TCmdInputNode = {
  id?: number;
} & TToken;
export type TCmdInputNodes = TCmdInputNode[];
export interface ICmdInput {
  inputNodes: TCmdInputNodes;
  editInputNodes: TCmdInputNodes;
}
export interface ICmdInputWritable extends Writable<ICmdInput> {
  /**
   * 命令输入更新响应处理
   * @param cmd
   * @param isEdit
   */
  inputUpdate: (nodes: TCmdInputNodes, isEdit?: boolean) => Promise<void>;
  /**
   * 合并推荐列表命令到当前输入框
   * @param tokenValue
   */
  inputMerge: (tokenValue: string) => Promise<void>;
}

export const getCmdInput = (ctx: CmdWindowContext) => {
  const { message } = ctx;
  const cmdInput: ICmdInputWritable = Object.create(
    writable<ICmdInput>({
      inputNodes: [],
      editInputNodes: [],
    })
  );

  cmdInput.inputUpdate = async (nodes, isEdit = false) => {
    cmdInput.update((data) => {
      data.inputNodes = nodes;
      if (isEdit) data.editInputNodes = nodes;
      return data;
    });
  };
  cmdInput.inputMerge = async (tokenValue) => {
    const { inputNodes } = get(cmdInput);
    const response = await message.send<TCmdInputNodes>('input', 'input.merge', {
      tokenValue,
      tokens: inputNodes,
    });
    cmdInput.update((data) => {
      if (response.payload) {
        data.inputNodes = response.payload;
      }
      return data;
    });
  };
  return cmdInput;
};
