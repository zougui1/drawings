import { PreviewSize } from 'drawer';

export const getSize = (newSize: string): PreviewSize => {
  switch (newSize) {
    case PreviewSize.small:
    case PreviewSize.halfScreen:
    case PreviewSize.fullscreen:
      return newSize;

    default:
      return PreviewSize.small;
  }
}
