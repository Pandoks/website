export const scrollToView = (element: Element): Promise<void> => {
  return new Promise((resolve) => {
    const top_gap = (window.innerHeight * 27) / 100;
    let { left, top } = element.getBoundingClientRect();

    setTimeout(() => {
      ({ left, top } = element.getBoundingClientRect());
      window.scrollBy(left, top - top_gap);
      resolve();
    });
  });
};
