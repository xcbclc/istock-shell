export function resize(node: HTMLElement, param: any) {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      let height = entry.contentRect.height;
      if (width < param.maxWidth) {
        height = (param.maxHeight / param.maxWidth) * width;
        node.style.height = `${height}px`;
      } else {
        node.style.height = `${param.maxHeight}px`;
      }
      node.dispatchEvent(
        new CustomEvent('domResize', {
          detail: {
            width,
            height,
          },
        })
      );
    }
  });

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}
