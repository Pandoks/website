// ordering of the returned list is left top most element to left bottom element to right most
export const getElementsFromHorizontalLine = ({
  startx,
  endx,
  y,
  lookup,
}: {
  startx: number;
  endx: number;
  y: number;
  lookup?: {
    ids?: Set<string>;
    classes?: Set<string>;
  };
}) => {
  if (
    startx < 0 ||
    startx > endx ||
    endx > window.innerWidth ||
    startx > window.innerWidth
  ) {
    throw new Error(
      "Starting X and Ending X coordinates need to be within the window size",
    );
  }
  if (y < 0 || y > window.innerHeight) {
    throw new Error("Y coordinate needs to be within the window size");
  }

  const lookupElements = new Set();
  const cacheElementList = new Set();
  const elementList = [];
  for (let x = startx; x <= endx; x++) {
    const elements = document.elementsFromPoint(x, y);
    if (cacheElementList.has(elements)) {
      continue;
    }

    cacheElementList.add(elements);
    for (let i = 0; i < elements.length; i++) {
      if (lookupElements.has(elements[i])) {
        continue;
      }

      if (!lookup || (!lookup.ids && !lookup.classes)) {
        lookupElements.add(elements[i]);
        elementList.push(elements[i]);
        continue;
      }

      if (lookup.ids && lookup.ids.has(elements[i].id)) {
        lookupElements.add(elements[i]);
        elementList.push(elements[i]);
        continue;
      }

      if (lookup.classes && lookup.classes.has(elements[i].className)) {
        lookupElements.add(elements[i]);
        elementList.push(elements[i]);
      }
    }
  }

  return elementList;
};
