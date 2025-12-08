import { type MentionOptions, type MentionNodeAttrs } from '@tiptap/extension-mention';
import { computePosition, shift, type ComputePositionConfig } from '@floating-ui/dom';

/**
 * 命令编辑器提及建议数据类型
 * @public
 */
export interface MentionSuggestionData extends MentionNodeAttrs {
  id: string;
  label: string;
  value: string;
  type: string;
  extra?: Record<string, any>;
}

/**
 * 命令编辑器提及建议选项类型
 * @public
 */
export type MentionSuggestionOption = {
  getSuggestionList: (query: string) => Promise<MentionSuggestionData[]>;
  renderSuggestionList: (
    list: MentionSuggestionData[],
    state: 'start' | 'update',
    onSelectedCallback?: (item: MentionSuggestionData) => void
  ) => Promise<HTMLElement | undefined>;
  updateSuggestionListPosition: (x: number, y: number, position: string) => void;
  onKeyDownSuggestion: (event: KeyboardEvent) => boolean;
  onDestroySuggestion: () => void;
} & MentionOptions['suggestion'];

/**
 * 命令编辑器提及建议扩展类型
 * @public
 */
export const getMentionSuggestions = (option: MentionSuggestionOption): MentionOptions['suggestions'] => {
  const {
    getSuggestionList,
    renderSuggestionList,
    updateSuggestionListPosition,
    onKeyDownSuggestion,
    onDestroySuggestion,
    ...other
  } = option;
  const computePositionConfig: ComputePositionConfig = {
    placement: 'top-start',
    middleware: [shift()],
  };
  /**
   * 更新建议列表位置
   * @param floatElement - 浮动元素
   * @param clientRect - 客户端矩形函数，用于获取参考元素位置
   */
  const updatePosition = async (floatElement: HTMLElement, clientRect?: (() => DOMRect | null) | null) => {
    if (!clientRect) {
      return;
    }
    // 创建虚拟参考元素，使用 clientRect 获取位置信息
    const virtualElement = {
      getBoundingClientRect: () => clientRect() || new DOMRect(0, 0, 0, 0),
    };
    const { x, y, strategy } = await computePosition(virtualElement, floatElement, computePositionConfig);
    updateSuggestionListPosition(x, y, strategy);
  };
  return [
    {
      items: ({ query }: { query: string }) => {
        return getSuggestionList(query);
      },
      render: () => {
        return {
          onStart: async (props) => {
            const floatElement = await renderSuggestionList(props.items, 'start', props.command);
            if (floatElement) await updatePosition(floatElement, props.clientRect);
          },
          onUpdate: async (props) => {
            const floatElement = await renderSuggestionList(props.items, 'update', props.command);
            if (floatElement) await updatePosition(floatElement, props.clientRect);
          },
          onKeyDown: (props) => {
            return onKeyDownSuggestion(props.event);
          },
          onExit: () => {
            onDestroySuggestion();
          },
        };
      },
      ...other,
    },
  ];
};
