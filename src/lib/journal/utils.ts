let scrollTimeouts: Set<number> = new Set();

export const scrollToView = (element: Element) => {
  if (scrollTimeouts.size > 0) {
    scrollTimeouts.forEach(clearTimeout);
    scrollTimeouts.clear();
  }

  const timeoutId = setTimeout(() => {
    const top_gap = (window.innerHeight * 27) / 100;
    let { left, top } = element.getBoundingClientRect();
    window.scrollBy({ top: top - top_gap, left });
  }, 0);

  scrollTimeouts.add(timeoutId);
};
