import { Preview, PreviewJSON } from './Preview';

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
  toJSON(): PreviewsJSON {
    return {
      small: this.small.toJSON(),
      halfScreen: this.halfScreen.toJSON(),
      fullscreen: this.fullscreen.toJSON(),
    };
  }

  static fromJSON(data: PreviewsJSON): Previews {
    const previews = new Previews();
    previews.small = Preview.fromJSON(data.small);
    previews.halfScreen = Preview.fromJSON(data.halfScreen);
    previews.fullscreen = Preview.fromJSON(data.fullscreen);

    return previews;
  }
  //#endregion
}

export type PreviewsJSON = Record<PreviewSize, PreviewJSON>;
