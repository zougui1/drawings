import { Keyframes, KeyframesJSON } from '../Keyframes';

const reFirstNumber = /^[0-9]+/;

export class Animation {
  public static readonly type: string = 'animation';

  protected _name: string = '';

  protected _keyframes: Keyframes = new Keyframes();

  protected _from: string | undefined;
  protected _to: string | undefined;
  protected _by: string | undefined;
  protected _calcMode: string | undefined;
  protected _values: string | undefined;
  protected _keyTimes: string | undefined;
  protected _keySplines: string | undefined;

  protected _additive: 'sum' | 'replace' | undefined;
  protected _accumulate: 'none' | 'sum' | undefined;

  protected _duration: string | undefined;
  protected _begin: string | undefined;
  protected _end: string | undefined;
  protected _min: string | undefined;
  protected _max: string | undefined;
  protected _restart: string | undefined;
  protected _fill: string | undefined = 'freeze';
  protected _repeatDur: string | undefined;
  protected _repeatCount: string | undefined = 'indefinite';

  constructor(name: string) {
    this._name = name;
  }

  //#region edit element
  begin(begin: string): this {
    this._begin = begin;
    return this;
  }

  end(end: string): this {
    this._end = end;
    return this;
  }

  from(from: string): this {
    this._from = from;
    return this;
  }

  to(to: string): this {
    this._to = to;
    return this;
  }

  duration(duration: string | undefined): this {
    this._duration = duration;
    return this;
  }

  repeatCount(repeatCount: string): this {
    this._repeatCount = repeatCount;
    return this;
  }

  fill(fill: string): this {
    this._fill = fill;
    return this;
  }

  addFrame(value: string): this;
  addFrame(time: number | string | 'start' | 'end', value: string): this;
  addFrame(timeOrValue: number | string | 'start' | 'end', value?: string): this {
    if (value === undefined) {
      this._keyframes.addFrame(undefined, timeOrValue.toString());
      return this;
    }

    let _time: number;

    switch (timeOrValue) {
      case 'start':
        _time = 0;
        break;
      case 'end':
        _time = 1;
        break;

      default:
        const dirtyTime = typeof timeOrValue === 'string'
          ? +(timeOrValue.trim().match(reFirstNumber)?.[0] ?? 0)
          : timeOrValue;

        _time = dirtyTime / 100;
        break;
    }

    this._keyframes.addFrame(_time, value);
    return this;
  }
  //#region syntax sugar
  //#region repeatCount
  once(): this {
    this._repeatCount = '0';
    return this;
  }

  twice(): this {
    this._repeatCount = '1';
    return this;
  }

  thrice(): this {
    this._repeatCount = '2';
    return this;
  }

  nonStop(): this {
    this._repeatCount = 'indefinite';
    return this;
  }
  //#endregion

  //#region fill
  freeze(): this {
    this._fill = 'freeze';
    return this;
  }
  //#endregion
  //#endregion
  beginAfterEnd(animate: Animation, offset: string = '0s'): this {
    this._begin = `${animate._name}.end + ${offset}`;
    return this;
  }

  beginAfterBegin(animate: Animation, offset: string = '0s'): this {
    this._begin = `${animate._name}.begin + ${offset}`;
    return this;
  }

  beginAfterRepeat(animate: Animation, nth: number = 1): this {
    this._begin = `${animate._name}.repeat(${nth})`;
    return this;
  }
  //#endregion
  //#region parsing
  toObject(): AnimationJSON {
    return {
      _type: Animation.type,
      name: this._name,
      from: this._from,
      to: this._to,
      by: this._by,
      calcMode: this._calcMode,
      keyframes: this._keyframes.toJSON(),
      keySplines: this._keySplines,
      additive: this._additive,
      accumulate: this._accumulate,
      dur: this._duration,
      begin: this._begin,
      end: this._end,
      min: this._min,
      max: this._max,
      restart: this._restart,
      fill: this._fill,
      repeatDur: this._repeatDur,
      repeatCount: this._repeatCount,
    };
  }

  static fromJSON(data: AnimationJSON): Animation {
    const animate = new Animation(data.name);
    animate._from = data.from;
    animate._to = data.to;
    animate._by = data.by;
    animate._calcMode = data.calcMode;
    animate._keyframes = Keyframes.from(data.keyframes);
    animate._keySplines = data.keySplines;
    animate._additive = data.additive;
    animate._accumulate = data.accumulate;
    animate._duration = data.dur;
    animate._begin = data.begin;
    animate._end = data.end;
    animate._min = data.min;
    animate._max = data.max;
    animate._restart = data.restart;
    animate._fill = data.fill;
    animate._repeatDur = data.repeatDur;
    animate._repeatCount = data.repeatCount;

    return animate;
  }
  //#endregion
}

export interface AnimationJSON {
  _type: string;
  name: string;

  from: string | undefined;
  to: string | undefined;
  by: string | undefined;
  calcMode: string | undefined;
  keyframes: KeyframesJSON;
  keySplines: string | undefined;

  additive: 'sum' | 'replace' | undefined;
  accumulate: 'none' | 'sum' | undefined;

  dur: string | undefined;
  begin: string | undefined;
  end: string | undefined;
  min: string | undefined;
  max: string | undefined;
  restart: string | undefined;
  fill: string | undefined;
  repeatDur: string | undefined;
  repeatCount: string | undefined;
}
