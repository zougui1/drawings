import { parseKeyframesObject } from '../utils';

export class Keyframes {
  protected _keyframes: Keyframe[] = [];

  //#region public API
  public keyframes(keyframes: Record<number, string> | string[]): this {
    if (Array.isArray(keyframes)) {
      this._keyframes = keyframes.map(kf => ({ value: kf }));
      return this;
    }

    this._keyframes = parseKeyframesObject(keyframes, {
      min: 1,
      //end: 1,
      valueType: 'string',
    });

    return this;
  }
  //#endregion

  //#region parsing
  public toJSON(): KeyframesJSON {
    return this._keyframes.map(kf => {
      return {
        time: kf.time,
        value: kf.value,
      };
    });
  }

  public toValues(): string {
    return this._keyframes.map(kf => kf.value).join('; ');
  }

  public toKeyTimes(): string {
    return this._keyframes
      .map(kf => kf.time)
      .filter(time => time !== undefined)
      .join('; ');
  }
  //#endregion
}

export interface Keyframe {
  time?: number;
  value: string;
}

export type KeyframesJSON = Keyframe[];
