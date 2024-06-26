// everything that is important has an id so we're just going to go search for closest ids
export const getClosestElementFromLine = ({
  startingPoint,
  endingPoint,
  excludedIds,
}: {
  startingPoint: { x: number; y: number };
  endingPoint: { x: number; y: number };
  excludedIds?: Set<string>;
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
    return null;
  }

  const linePoints = getPointsAlongLine({ startingPoint, endingPoint });

  for (let i = 0; i < linePoints.length; i++) {
    const { x, y } = linePoints[i];
    const elements = document.elementsFromPoint(x, y) as HTMLElement[];

    for (let i = 0; i < elements.length; i++) {
      if (!elements[i].id || (excludedIds && excludedIds.has(elements[i].id))) {
        continue;
      }

      if (elements[i].id) {
        return elements[i];
      }
    }
  }

  return null;
};

export const getClosestElementForElement = ({
  element,
  interval,
  direction,
  range,
}: {
  element: HTMLElement;
  interval: number;
  direction: "left" | "down" | "up" | "right";
  range: number;
}) => {
  const { top, bottom, left, right } = element.getBoundingClientRect();

  const horizontal = direction === "left" || direction === "right";
  const vertical = direction === "down" || direction === "up";

  const middlex = (left + right) / 2;
  const middley = (top + bottom) / 2;
  let startingPoint;
  let endingPoint;
  switch (direction) {
    case "left":
      startingPoint = { x: left, y: middley };
      endingPoint = { x: 0, y: middley };
      break;

    case "down":
      startingPoint = { x: middlex, y: bottom };
      endingPoint = { x: middlex, y: window.innerHeight };
      break;

    case "up":
      startingPoint = { x: middlex, y: top };
      endingPoint = { x: middlex, y: 0 };
      break;

    case "right":
      startingPoint = { x: right, y: middley };
      endingPoint = { x: window.innerWidth, y: middley };
      break;
  }

  const closestElement = getClosestElementFromLine({
    startingPoint: startingPoint,
    endingPoint: endingPoint,
    excludedIds: new Set([element.id]),
  });
  if (closestElement) {
    return closestElement;
  }

  let count = 0;
  if (horizontal) {
    let positiveDeltaPointY = startingPoint.y + interval;
    let negativeDeltaPointY = startingPoint.y - interval;

    while (
      count <= range &&
      (positiveDeltaPointY <= bottom || negativeDeltaPointY >= top)
    ) {
      if (positiveDeltaPointY <= bottom) {
        const positiveDeltaStartingPoint = {
          x: startingPoint.x,
          y: positiveDeltaPointY,
        };
        const positiveDeltaEndingPoint = {
          x: endingPoint.x,
          y: positiveDeltaPointY,
        };
        const closestPositiveDeltaElement = getClosestElementFromLine({
          startingPoint: positiveDeltaStartingPoint,
          endingPoint: positiveDeltaEndingPoint,
          excludedIds: new Set([element.id]),
        });
        if (closestPositiveDeltaElement) {
          return closestPositiveDeltaElement;
        }
      }

      if (negativeDeltaPointY >= top) {
        const negativeDeltaStartingPoint = {
          x: startingPoint.x,
          y: negativeDeltaPointY,
        };
        const negativeDeltaEndingPoint = {
          x: endingPoint.x,
          y: negativeDeltaPointY,
        };
        const closestNegativeDeltaElement = getClosestElementFromLine({
          startingPoint: negativeDeltaStartingPoint,
          endingPoint: negativeDeltaEndingPoint,
          excludedIds: new Set([element.id]),
        });
        if (closestNegativeDeltaElement) {
          return closestNegativeDeltaElement;
        }
      }

      positiveDeltaPointY += interval;
      negativeDeltaPointY -= interval;
      count++;
    }
  } else if (vertical) {
    let positiveDeltaPointX = startingPoint.x + interval;
    let negativeDeltaPointX = startingPoint.x - interval;

    while (
      count <= range &&
      (positiveDeltaPointX <= right || negativeDeltaPointX >= left)
    ) {
      if (positiveDeltaPointX <= right) {
        const positiveDeltaStartingPoint = {
          x: positiveDeltaPointX,
          y: startingPoint.y,
        };
        const positiveDeltaEndingPoint = {
          x: positiveDeltaPointX,
          y: endingPoint.y,
        };
        const closestPositiveDeltaElement = getClosestElementFromLine({
          startingPoint: positiveDeltaStartingPoint,
          endingPoint: positiveDeltaEndingPoint,
          excludedIds: new Set([element.id]),
        });
        if (closestPositiveDeltaElement) {
          return closestPositiveDeltaElement;
        }
      }

      if (negativeDeltaPointX >= left) {
        const negativeDeltaStartingPoint = {
          x: negativeDeltaPointX,
          y: startingPoint.y,
        };
        const negativeDeltaEndingPoint = {
          x: negativeDeltaPointX,
          y: endingPoint.y,
        };
        const closestNegativeDeltaElement = getClosestElementFromLine({
          startingPoint: negativeDeltaStartingPoint,
          endingPoint: negativeDeltaEndingPoint,
          excludedIds: new Set([element.id]),
        });
        if (closestNegativeDeltaElement) {
          return closestNegativeDeltaElement;
        }
      }

      positiveDeltaPointX += interval;
      negativeDeltaPointX -= interval;
      count++;
    }
  }

  return null;
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

  let [x0, y0] = [Math.round(startingPoint.x), Math.round(startingPoint.y)];
  let [x1, y1] = [Math.round(endingPoint.x), Math.round(endingPoint.y)];

  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    points.push({ x: x0, y: y0 });

    if (x0 === x1 && y0 === y1) break;

    let err2 = 2 * err;
    if (err2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (err2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
  return points;
};

export const getElementSurroundings = (element: HTMLElement) => {
  const INTERVAL = 10;
  const RANGE = 15;

  const leftElement = getClosestElementForElement({
    element: element,
    interval: INTERVAL,
    direction: "left",
    range: RANGE,
  });

  const downElement = getClosestElementForElement({
    element: element,
    interval: INTERVAL,
    direction: "down",
    range: RANGE,
  });

  const upElement = getClosestElementForElement({
    element: element,
    interval: INTERVAL,
    direction: "up",
    range: RANGE,
  });

  const rightElement = getClosestElementForElement({
    element: element,
    interval: INTERVAL,
    direction: "right",
    range: RANGE,
  });

  return { leftElement, downElement, upElement, rightElement };
};
