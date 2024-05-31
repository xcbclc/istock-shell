export interface IInfiniteScroll {
  updateObserve: () => Promise<void>;
  disconnect: () => void;
}

export type TInfiniteScrollOption = {
  hideClassName: string;
  childrenSelector?: string;
};

export function getInfiniteScroll(
  element: HTMLElement | null,
  option: TInfiniteScrollOption = { hideClassName: 'is-hidden' }
): IInfiniteScroll {
  const observer: IntersectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((row) => {
        const { target } = row;
        if (row.isIntersecting) {
          if (target.classList.contains(option.hideClassName)) {
            target.classList.remove(option.hideClassName);
          }
        } else {
          if (!target.classList.contains(option.hideClassName)) {
            target.classList.add(option.hideClassName);
          }
        }
      });
    },
    {
      root: element,
      rootMargin: '50% 0% 50% 0%',
    }
  );
  return {
    updateObserve: async () => {
      observer && observer.disconnect();
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (option.childrenSelector) {
        const children = document.querySelectorAll(option.childrenSelector);
        for (const child of children) {
          observer.observe(child);
        }
        return;
      }
      if (observer && element?.children) {
        for (const el of element.children) {
          observer.observe(el);
        }
      }
    },
    disconnect: () => {
      observer.disconnect();
    },
  };
}
