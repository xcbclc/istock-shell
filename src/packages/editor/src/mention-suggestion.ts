import { type MentionOptions } from '@tiptap/extension-mention';
import { computePosition, type ComputePositionConfig } from '@floating-ui/dom';

export interface MentionSuggestionData extends Record<string, any> {
  id: string | number;
  label: string;
  value: string;
  type: string;
  extra?: Record<string, any>;
}

export interface MentionSuggestionOption {
  getSuggestionList: (query: string) => Promise<MentionSuggestionData[]>;
  renderSuggestionList: (list: MentionSuggestionData[], state: 'start' | 'update') => Promise<HTMLElement | undefined>;
  updateSuggestionListPosition: (x: number, y: number, position: string) => void;
  onKeyDownSuggestion: (event: KeyboardEvent) => boolean;
  onDestroySuggestion: () => void;
}

export const getMentionSuggestions = (option: MentionSuggestionOption): MentionOptions['suggestions'] => {
  const {
    getSuggestionList,
    renderSuggestionList,
    updateSuggestionListPosition,
    onKeyDownSuggestion,
    onDestroySuggestion,
  } = option;
  const computePositionConfig: ComputePositionConfig = {
    placement: 'bottom-start',
    strategy: 'absolute',
  };

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
            const floatElement = await renderSuggestionList(props.items, 'start');
            if (floatElement) await updatePosition(floatElement, props.clientRect);
          },
          onUpdate: async (props) => {
            const floatElement = await renderSuggestionList(props.items, 'update');
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
    },
  ];
};
