import { Keyframe, KeyframeJSON } from './Keyframe';

export class Keyframes {
  public static readonly type: 'keyframes' = 'keyframes';

  protected _keyframes: Keyframe[] = [];

  //#region edit keyframes
  addFrame(time: number | undefined, value: string): this {
    if (time === undefined) {
      if (!this._keyframes.every(kf => kf.getTime() === undefined)) {
        throw new Error(`Can't have keyframes with and without keyTime together.`);
      }

      this._keyframes.push(new Keyframe(undefined, value));
      return this;
    }

    if (time < 0) {
      throw new Error(`A keyframe cannot start before '0'. Got "${time}"`);
    }

    if (time > 1) {
      throw new Error(`A keyframe cannot finish after '1'. Got "${time}"`);
    }

    if (this._keyframes.some(kf => kf.getTime() === time)) {
      throw new Error(`Can't have 2 keyframe at the same time. Time = ${time}`);
    }

    this._keyframes.push(new Keyframe(time, value));
    return this;
  }
  //#endregion

  //#region helpers
  protected sort(): Keyframe[] {
    return this._keyframes = this._keyframes.sort((a, b) => a.safeGetTime() - b.safeGetTime());
  }
  //#endregion

  //#region parsing
  toJSON(): KeyframesJSON {
    return {
      type: Keyframes.type,
      keyframes: this._keyframes.map(kf => kf.toObject()),
    };
  }

  public toValues(): string {
    return this
      .sort()
      .map(kf => kf.getValue())
      .join('; ');
  }

  public toKeyTimes(): string {
    return this
      .sort()
      .map(kf => kf.getTime())
      .filter(time => time !== undefined)
      .join('; ');
  }

  static from(data: KeyframesJSON): Keyframes {
    const keyframes = new Keyframes();
    keyframes._keyframes = data.keyframes.map(kf => Keyframe.from(kf));

    return keyframes;
  }
  //#endregion
}

export interface KeyframesJSON {
  type: typeof Keyframes.type;
  keyframes: KeyframeJSON[];
}
