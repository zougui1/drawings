import { DrawingElement, DrawingElementJSON } from './DrawingElement';
import { Group, GroupJSON } from './Group';
import { DrawingElementType } from './DrawingElementType';
import { Point } from '../point';
import { Previews, PreviewsJSON } from '../Previews';

export class Drawer extends DrawingElement {

  protected _size: Point | undefined;
  public root: Group = new Group().setName('root');
  public readonly elementType: DrawingElementType.drawer = DrawingElementType.drawer;
  public previews: Previews = new Previews();
  protected _slug: string;

  constructor(name: string) {
    super();

    this._name = name;
    this._slug = this._name.replace(/ /g, '-').toLowerCase(),
    this.root.setNamespace(this._slug);
  }

  //#region public API
  size(width: number, height: number): this {
    this._size = new Point(width, height);
    return this;
  }
  //#endregion

  //#region parsing
  toJSON(): DrawerJSON {
    if (!this._size) {
      throw new Error(`The drawer needs a size to work with.`);
    }

    return {
      type: DrawingElementType.drawer,
      root: this.root.toJSON(),
      width: this._size.x,
      height: this._size.y,
      transform: this.transform.toJSON(),
      name: this._name,
      namespace: this._namespace,
      fullName: this.buildName(),
      zIndex: this._zIndex,
      previews: this.previews.toJSON(),
      slug: this._slug,
      isAnimated: this.isAnimated,
      animatedOnKeyframes: this._animatedOnKeyframes,
    };
  }
  //#region
}

export interface DrawerJSON extends DrawingElementJSON {
  root: GroupJSON;
  slug: string;
  width: number;
  height: number;
  previews: PreviewsJSON;
}
