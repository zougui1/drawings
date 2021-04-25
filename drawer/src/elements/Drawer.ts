import { DrawingElement, DrawingElementObject } from './DrawingElement';
import { Group, GroupObject } from './Group';
import { Path } from './Path';
import { Previews, PreviewsObject } from '../Previews';
import { last } from '../utils';
import { ObjectLiteral } from '../types';

export class Drawer extends DrawingElement {

  static readonly type: 'svg' = 'svg';

  id: string = 'drawer';
  _width: number = 0;
  _height: number = 0;
  isEmpty: boolean = true;
  _svgName: string;
  root: Group;
  previews = new Previews();
  elements: DrawingElement[] = [];

  constructor(data: ObjectLiteral | null, svgName: string) {
    super(data ?? {});

    this.root = new Group(data ?? {})
    this._svgName = svgName;
    this.isEmpty = !data;
  }

  //#region public API
  setSize(width: number, height: number): this {
    this._width = width;
    this._height = height;
    return this;
  }
  //#endregion

  //#region create elements
  path(name?: string): this {
    const path = new Path(this.data);

    if (name) {
      path.name(name);
    }

    return this.addElement(path);
  }

  group(name: string, drawer: (group: Group) => any): this {
    const group = new Group(this.data);
    group.name(name);
    drawer(group);

    return this.addElement(group);
  }
  //#endregion

  //#region helpers
  protected addElement(element: DrawingElement): this {
    this.elements.push(element);
    return this;
  }

  protected lastElement(): DrawingElement | undefined {
    return last(this.elements);
  }
  //#endregion

  //#region parsing
  toObject(): DrawerObject {
    return {
      type: Drawer.type,
      id: this.id,
      data: this.data,
      root: this.root.toObject(),
      width: this._width,
      height: this._height,
      svgName: this._svgName,
      transform: this._transform.toObject(),
      name: this._name,
      zIndex: this._zIndex,
      children: this.elements.map(elm => elm.toObject()),
      previews: this.previews.toObject(),
      animationElements: [],
    };
  }

  static fromObject(data: DrawerObject): Drawer {
    const drawer = new Drawer(data.data, data.svgName);
    drawer._width = data.width;
    drawer._height = data.height;
    drawer.root = Group.fromObject(data.root);
    drawer.previews = Previews.fromObject(data.previews);

    drawer.elements = data.children.map((element: any) => {
      switch (element.type) {
        case Path.type:
          return Path.fromObject(element);
        case Group.type:
          element.data = data.data;
          return Group.fromObject(element);

        default:
          throw new Error(`Invalid element '${element.type}'`);
      }
    });

    return drawer;
  }
  //#endregion
}

export interface DrawerObject extends DrawingElementObject {
  type: 'svg';
  width: number;
  height: number;
  svgName: string;
  root: GroupObject;
  previews: PreviewsObject;
  children: DrawingElementObject[];
}
