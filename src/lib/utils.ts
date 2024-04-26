import type { Writable } from "svelte/store";
import type { VimNavigationElement } from "./types";

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
      lookupElements.add(elements[i]);

      if (!lookup || (!lookup.ids && !lookup.classes)) {
        elementList.push(elements[i]);
        continue;
      }

      if (lookup.ids && lookup.ids.has(elements[i].id)) {
        elementList.push(elements[i]);
        continue;
      }

      if (lookup.classes && lookup.classes.has(elements[i].className)) {
        elementList.push(elements[i]);
      }
    }
  }

  return elementList;
};

export const getClosestElementFromLine = ({
  startingPoint,
  endingPoint,
  inclusion,
  exclusion,
}: {
  startingPoint: { x: number; y: number };
  endingPoint: { x: number; y: number };
  inclusion?: {
    ids?: Set<string>;
    classes?: Set<string>;
  };
  exclusion?: {
    ids?: Set<string>;
    classes?: Set<string>;
  };
}) => {
  console.log(inclusion);
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

  if (!inclusion || (!inclusion.ids && !inclusion.classes)) {
    return document.elementFromPoint(startingPoint.x, startingPoint.y);
  }

  const linePoints = getPointsAlongLine({ startingPoint, endingPoint });

  const lookupElements = new Set();
  const cacheElementList = new Set();

  for (let i = 0; i < linePoints.length; i++) {
    const { x, y } = linePoints[i];
    const elements = document.elementsFromPoint(x, y);
    if (cacheElementList.has(elements.toString())) {
      continue;
    }
    cacheElementList.add(elements.toString());

    for (let i = 0; i < elements.length; i++) {
      if (lookupElements.has(elements[i].outerHTML)) {
        continue;
      }
      lookupElements.add(elements[i].outerHTML);

      const hasExcludedId =
        exclusion && exclusion.ids && exclusion.ids.has(elements[i].id);
      const hasExcludedClass =
        exclusion &&
        exclusion.classes &&
        !Array.from(exclusion.classes).every(
          (cls) => !elements[i].className.includes(cls),
        );
      if (hasExcludedId || hasExcludedClass) {
        continue;
      }

      console.log(elements[i]);

      if (inclusion.ids && inclusion.ids.has(elements[i].id)) {
        return elements[i];
      }

      if (
        inclusion.classes &&
        !Array.from(inclusion.classes).every(
          (cls) => !elements[i].className.includes(cls),
        )
      ) {
        return elements[i];
      }
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
  const inclusiveIds = new Set([
    "nav-jason-kwok",
    "nav-socials",
    "nav-essays",
    "nav-journal",
  ]);
  inclusiveIds.delete(element.id);

  let inclusiveClasses = new Set<string>();
  switch (window.location.pathname) {
    case "/socials":
      inclusiveClasses.add("social-link");
      break;
    case "/essays":
      inclusiveClasses.add("essay-link");
      break;
    case "/journal":
      inclusiveClasses.add("timeline-item");
  }

  const exclusiveIds = new Set([element.id]);

  const { top, left, right, bottom } = element.getBoundingClientRect();
  const middlex = (left + right) / 2;
  const middley = (top + bottom) / 2;

  console.log("left");
  const leftElement = getClosestElementFromLine({
    startingPoint: { x: left, y: middley },
    endingPoint: { x: 0, y: middley },
    inclusion: { ids: inclusiveIds, classes: inclusiveClasses },
    exclusion: { ids: exclusiveIds },
  }) as HTMLElement;

  console.log("down");
  console.log(window.innerHeight);
  const downElement = getClosestElementFromLine({
    startingPoint: { x: middlex, y: bottom },
    endingPoint: { x: middlex, y: window.innerHeight },
    inclusion: { ids: inclusiveIds, classes: inclusiveClasses },
    exclusion: { ids: exclusiveIds },
  }) as HTMLElement;

  console.log("up");
  const upElement = getClosestElementFromLine({
    startingPoint: { x: middlex, y: top },
    endingPoint: { x: middlex, y: 0 },
    inclusion: { ids: inclusiveIds, classes: inclusiveClasses },
    exclusion: { ids: exclusiveIds },
  }) as HTMLElement;

  console.log("right");
  const rightElement = getClosestElementFromLine({
    startingPoint: { x: right, y: middley },
    endingPoint: { x: window.innerWidth, y: middley },
    inclusion: { ids: inclusiveIds, classes: inclusiveClasses },
    exclusion: { ids: exclusiveIds },
  }) as HTMLElement;

  return { leftElement, downElement, upElement, rightElement };
};
