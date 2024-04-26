// ordering of the returned list is left top most element to left bottom element to right most
export const getElementsFromLine = ({
  startingPoint,
  endingPoint,
  lookup,
}: {
  startingPoint: { x: number; y: number };
  endingPoint: { x: number; y: number };
  lookup?: {
    ids?: Set<string>;
    classes?: Set<string>;
  };
}) => {
  if (
    startingPoint.x < 0 ||
    startingPoint.x > window.innerWidth ||
    endingPoint.x < 0 ||
    endingPoint.x > window.innerWidth ||
    startingPoint.y < 0 ||
    startingPoint.y > window.innerHeight ||
    endingPoint.y < 0 ||
    endingPoint.y > window.innerHeight
  ) {
    throw new Error("Coordinates need to be within the window size");
  }

  const lookupElements = new Set();
  const cacheElementList = new Set();
  const elementList = [];

  const linePoints = getPointsAlongLine({ startingPoint, endingPoint });
  for (let i = 0; i < linePoints.length; i++) {
    const { x, y } = linePoints[i];
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
  startingPoint,
  endingPoint,
}: {
  startingPoint: { x: number; y: number };
  endingPoint: { x: number; y: number };
}) => {
  let points = [];

  let startx = startingPoint.x;
  let starty = startingPoint.y;
  let endx = endingPoint.x;
  let endy = endingPoint.y;

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

// ordered by closest elements to starting point
export const findClosestElementOnLine = ({
  startingPoint,
  endingPoint,
  lookup,
}: {
  startingPoint: { x: number; y: number };
  endingPoint: { x: number; y: number };
  lookup?: {
    ids?: Set<string>;
    classes?: Set<string>;
  };
}) => {
  if (!lookup) {
    const detectedLines = getElementsFromLine({
      startingPoint,
      endingPoint,
    });

    return detectedLines[0];
  }

  const detectedLines = getElementsFromLine({
    startingPoint,
    endingPoint,
    lookup,
  });

  return detectedLines[0];
};
