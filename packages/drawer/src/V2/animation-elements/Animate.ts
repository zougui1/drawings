import { AnimationElementType } from './AnimationElementType';
import { AnimationElement, AnimationElementJSON } from './AnimationElement';

export class Animate extends AnimationElement {

  public readonly elementType: AnimationElementType.animate = AnimationElementType.animate;
  protected _attributeName: string = '';
  protected _attributeType: string | undefined;

  //#region edit element
  public attributeName(attributeName: string): this {
    return this.setAttributeName(attributeName);
  }

  public attributeType(attributeType: string): this {
    return this.setAttributeType(attributeType);
  }
  //#endregion

  //#region accessors
  public getAttributeName(): string {
    return this._attributeName;
  }

  public setAttributeName(attributeName: string): this {
    this._attributeName = attributeName.trim();
    return this;
  }

  public getAttributeType(): string | undefined {
    return this._attributeType;
  }

  public setAttributeType(attributeType: string): this {
    this._attributeType = attributeType.trim();
    return this;
  }
  //#endregion

  //#region helpers
  protected checkValidity(): boolean {
    super.checkValidity();

    if (!this._attributeName) {
      throw new Error('The attribute name is required.');
    }

    return true;
  }
  //#endregion

  //#region parsing
  public toJSON(): AnimateJSON {
    return {
      type: AnimationElementType.animate,
      name: this._name,
      keyframes: this._keyframes.toJSON(),
      duration: this._duration,
      attributeName: this._attributeName,
      attributeType: this._attributeType,
    };
  }
  //#endregion
}

export interface AnimateJSON extends AnimationElementJSON {
  type: AnimationElementType.animate;
  attributeName: string;
  attributeType: string | undefined;
}
