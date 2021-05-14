import { Preview, PreviewObject } from './Preview';

export enum PreviewSize {
  small = 'small',
  halfScreen = 'halfScreen',
  fullscreen = 'fullscreen',
}

export class Previews {

  small = new Preview();
  halfScreen = new Preview();
  fullscreen = new Preview();

   //#region parsing
  toObject(): PreviewsObject {
    return {
      small: this.small.toObject(),
      halfScreen: this.halfScreen.toObject(),
      fullscreen: this.fullscreen.toObject(),
    };
  }

  static fromObject(data: PreviewsObject): Previews {
    const previews = new Previews();
    previews.small = Preview.fromObject(data.small);
    previews.halfScreen = Preview.fromObject(data.halfScreen);
    previews.fullscreen = Preview.fromObject(data.fullscreen);

    return previews;
  }
  //#endregion
}

export type PreviewsObject = Record<PreviewSize, PreviewObject>;
