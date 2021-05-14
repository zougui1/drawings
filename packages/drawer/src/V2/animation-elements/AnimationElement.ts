import { AnimationElementType } from './AnimationElementType';
import { Keyframes, KeyframesJSON } from './Keyframes';

export abstract class AnimationElement {

  public abstract readonly elementType: AnimationElementType;
  protected _name: string = '';
  protected _keyframes: Keyframes = new Keyframes();
  protected _duration!: number;

  //#region edit element
  public name(name: string): this {
    return this.setName(name);
  }

  public duration(duration: number): this {
    return this.setDuration(duration);
  }

  public keyframes(keyframes: Record<number, string> | string[]): this {
    this._keyframes.keyframes(keyframes);
    return this;
  }
  //#endregion

  //#region accessors
  public getName(): string {
    return this._name;
  }

  public setName(name: string): this {
    this._name = name;
    return this;
  }

  public getDuration(): number | undefined {
    return this._duration;
  }

  public setDuration(duration: number): this {
    if (!Number.isFinite(duration)) {
      throw new Error(`The duration must be a valid number. Got "${duration}".`);
    }

    this._duration = duration;
    return this;
  }
  //#endregion

  //#region helpers
  protected checkValidity(): boolean {
    if (!Number.isFinite(this._duration)) {
      throw new Error(`The duration must be a valid number. Got "${this._duration}".`);
    }

    return true;
  }
  //#endregion

  //#region parsing
  public abstract toJSON(): AnimationElementJSON;
  //#endregion
}

export interface AnimationElementJSON {
  type: AnimationElementType;
  name: string;
  duration: number;
  keyframes: KeyframesJSON;
}
