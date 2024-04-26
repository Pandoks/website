// ordering of the returned list is left top most element to left bottom element to right most
export const getElementsFromLine = ({
  startx,
  endx,
  starty,
  endy,
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

// Bresenham's line algorithm
export const getPointsAlongLine = ({
  startx,
  endx,
  starty,
  endy,
}: {
  startx: number;
  endx: number;
  starty: number;
  endy: number;
}) => {
  let points = [];
  let dx = Math.abs(endx - startx);
  let dy = Math.abs(endy - starty);
  let sx = startx < endx ? 1 : -1;
  let sy = starty < endy ? 1 : -1;
  let err = dx - dy;

  while (true) {
    points.push({ x: startx, y: starty });

    if (startx === endx && starty === endy) break;

    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      startx += sx;
    }
    if (e2 < dx) {
      err += dx;
      starty += sy;
    }
  }
  return points;
};
