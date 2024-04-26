let scrollTimeout: number | null = null;

export const scrollToView = (element: Element) => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  scrollTimeout = setTimeout(() => {
    const top_gap = (window.innerHeight * 27) / 100;
    let { left, top } = element.getBoundingClientRect();
    window.scrollBy({ top: top - top_gap, left });
  });
};
