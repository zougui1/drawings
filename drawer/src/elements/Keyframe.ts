const reFirstNumber = /^[0-9]+/;

export class Keyframe {
  public static readonly type: 'keyframe' = 'keyframe';

  protected _time?: number;
  protected _value: string;

  constructor(time: number | undefined, value: string) {
    this._time = time;
    this._value = value;
  }

  //#region public API
  public safeGetTime(): number {
    return this._time ?? 0;
  }

  public getTime(): number | undefined {
    return this._time;
  }

  public getValue(): string {
    return this._value;
  }
  //#endregion

  //#region parsing
  toObject(): KeyframeJSON {
    return {
      type: Keyframe.type,
      value: this._value,
      time: this._time,
    };
  }

  public static from(data: KeyframeJSON): Keyframe {
    return new Keyframe(data.time, data.value);
  }
  //#endregion
}

export interface KeyframeJSON {
  type: typeof Keyframe.type;
  time?: number;
  value: string;
}
