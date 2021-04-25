export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
}

export const computeTranslation = (options: ComputeTranslationOptions): ComputeTranslationReturn => {
  const { oldScale, newScale, cursorX, cursorY, rect } = options;

  const xPercent = +((cursorX - (rect.left)) / rect.width).toFixed(2);
  const yPercent = +((cursorY - rect.top) / rect.height).toFixed(2);
  const x = Math.round(cursorX - (xPercent * (rect.width * newScale / oldScale))) - rect.originalLeft;
  const y = Math.round(cursorY - (yPercent * (rect.height * newScale / oldScale))) - rect.originalTop;

  return { x, y };
}

export const zoom = (e: ZoomEvent, state: ZoomState, element: HTMLElement, scaleData: ScaleData): ZoomReturn => {
  let scale = e.deltaY > 0
    // zoom out
    ? state.scale / scaleData.factor
    // zoom in
    : state.scale * scaleData.factor;

    scale = clamp(scale, scaleData.minScale, scaleData.maxScale);
    scale = +scale.toFixed(2);

  const rect = element.getBoundingClientRect() as ZoomRect;
  rect.originalLeft = rect.left - state.x;
  rect.originalTop = rect.top - state.y;

  const { x, y } = computeTranslation({
    oldScale: state.scale,
    newScale: scale,
    cursorX: e.clientX,
    cursorY: e.clientY,
    rect,
  });

  return {
    scale,
    x: +x.toFixed(2),
    y: +y.toFixed(2),
  };
}

type OriginalPosition = {
  originalLeft: number,
  originalTop: number,
}

type ZoomRect = DOMRect & OriginalPosition;

export type ComputeTranslationOptions = {
  oldScale: number;
  newScale: number;
  cursorX: number;
  cursorY: number;
  rect: ZoomRect;
}

export type ComputeTranslationReturn = {
  x: number;
  y: number;
}

export type ZoomEvent = {
  deltaY: number;
  clientX: number;
  clientY: number;
}

export type ZoomState = {
  x: number;
  y: number;
  scale: number;
}

export type ScaleData = {
  factor: number;
  minScale: number;
  maxScale: number;
}

export type ZoomReturn = {
  scale: number;
  x: number;
  y: number;
}
