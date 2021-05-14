import { PreviewSize } from 'drawer';

export const getOtherPreviewSize = (currentSize: PreviewSize, newSize: PreviewSize): PreviewSize | undefined => {
  if (newSize === PreviewSize.halfScreen) {
    return PreviewSize.halfScreen;
  }

  if (currentSize === PreviewSize.halfScreen) {
    return PreviewSize.small;
  }
}
