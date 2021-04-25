import { Animation, AnimationJSON } from './Animation';
import { Keyframes } from '../Keyframes';

export class Animate extends Animation {
  public static readonly type: 'animate' = 'animate';

  protected _attributeName: string = '';
  protected _attributeType: string | undefined;
  protected _type: string | undefined;

  constructor(name: string, attributeName: string) {
    super(name);
    this._attributeName = attributeName;
  }

  //#region edit element
  attributeName(attributeName: string): this {
    this._attributeName = attributeName;
    return this;
  }

  //#region parsing
  toObject(): AnimateJSON {
    return {
      _type: Animate.type,
      name: this._name,
      attributeName: this._attributeName,
      attributeType: this._attributeType,
      type: this._type,
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

  static fromObject(data: AnimateJSON): Animate {
    const animate = new Animate(data.name, data.attributeName);
    animate._attributeType = data.attributeType;
    animate._type = data.type;
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

export interface AnimateJSON extends AnimationJSON {
  _type: typeof Animate.type;

  attributeName: string;
  attributeType: string | undefined;
  type: string | undefined;
}
