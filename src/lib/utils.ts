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

  if (!lookup || (!lookup.ids && !lookup.classes)) {
    return document.elementFromPoint(startingPoint.x, startingPoint.y);
  }

  const linePoints = getPointsAlongLine({ startingPoint, endingPoint });

  const lookupElements = new Set();
  const cacheElementList = new Set();

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

      if (lookup.ids && lookup.ids.has(elements[i].id)) {
        return elements[i];
      }

      if (lookup.classes && lookup.classes.has(elements[i].className)) {
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

export const getElementSurroundings = (element: HTMLElement) => {
  let classes = new Set<string>();
  switch (window.location.pathname) {
    case "socials":
      classes.add("social-link");
      break;
    case "essays":
      classes.add("essay-link");
      break;
    case "journal":
      classes.add("timeline-item");
  }

  const { top, left, right, bottom } = element.getBoundingClientRect();
  const middlex = (left + right) / 2;
  const middley = (top + bottom) / 2;

  const leftElement = getClosestElementFromLine({
    startingPoint: { x: left, y: middley },
    endingPoint: { x: 0, y: middley },
    lookup: {
      ids: new Set([
        "nav-jason-kwok",
        "nav-socials",
        "nav-essays",
        "nav-journal",
      ]),
      classes: classes,
    },
  }) as HTMLElement;

  const downElement = getClosestElementFromLine({
    startingPoint: { x: middlex, y: bottom },
    endingPoint: { x: middlex, y: window.innerHeight },
    lookup: {
      ids: new Set(["nav-socials", "nav-essays", "nav-journal"]),
      classes: classes,
    },
  }) as HTMLElement;

  const upElement = getClosestElementFromLine({
    startingPoint: { x: middlex, y: top },
    endingPoint: { x: middlex, y: 0 },
    lookup: {
      ids: new Set(["nav-jason-kwok", "nav-socials", "nav-essays"]),
      classes: classes,
    },
  }) as HTMLElement;

  const rightElement = getClosestElementFromLine({
    startingPoint: { x: right, y: middley },
    endingPoint: { x: window.innerWidth, y: middley },
    lookup: {
      classes: classes,
    },
  }) as HTMLElement;

  return { leftElement, downElement, upElement, rightElement };
};
