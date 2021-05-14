export const computeElementsBounding = (elements: HTMLElement[]): DOMRect => {
  let left = Infinity;
  let top = Infinity;
  let right = 0;
  let bottom = 0;

  for (const element of elements) {
    const rect = element.getBoundingClientRect();

    left = Math.min(left, rect.left);
    top = Math.min(top, rect.top);
    right = Math.max(right, rect.right);
    bottom = Math.max(bottom, rect.bottom);
  }

  const width = right - left;
  const height = bottom - top;

  return new DOMRect(left, top, width, height);
}
