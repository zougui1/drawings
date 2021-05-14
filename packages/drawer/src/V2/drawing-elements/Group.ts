import { DrawingElement, DrawingElementJSON } from './DrawingElement';
import { Path, PathJSON } from './Path';
import { DrawingElementType } from './DrawingElementType';
import { Transform } from '../Transform';
import { DrawingData } from '../types';

export class Group extends DrawingElement {

  protected currentPath: Path | undefined;
  protected _pathsMap: Record<string, Path> = {};
  public readonly elementType: DrawingElementType.group = DrawingElementType.group;

  //#region create elements
  public path(data: DrawingData): Path {
    const path = new Path();
    const { name, zIndex, stroke, fill, strokeWidth } = data;

    path
      .setNamespace(this.getNamespace())
      .setName(name)
      .setStroke(stroke ?? 'none')
      .setFill(fill ?? 'none')
      .setZIndex(zIndex)
      .setStrokeWidth(strokeWidth ?? 1)
      .init();

    this.addPath(path);
    return path;
  }

  public group(name: string, drawer: (drawer: this) => void): this {
    const previousNamespace = this._namespace;
    this._namespace = this._namespace ? `${this._namespace} > ${name}` : name;
    drawer(this);
    this._namespace = previousNamespace;

    return this;
  }
  //#endregion

  //#region public API
  public hasPath(name: string): boolean {
    return !!this._pathsMap[name];
  }

  public getPath(path: Path): Path | undefined {
    return this._pathsMap[path.buildNeutralName()];
  }

  public getPaths(): Path[] {
    return Object.values(this._pathsMap);
  }

  public addPath(path: Path): this {
    const pathName = path.buildNeutralName();

    if (this.hasPath(pathName)) {
      throw new Error(`The path "${pathName}" already exists.`);
    }

    this._pathsMap[pathName] = path;
    this.currentPath = path;
    return this;
  }
  //#endregion

  //#region parsing
  toJSON(): GroupJSON {
    return {
      type: DrawingElementType.group,
      name: this._name,
      namespace: this._namespace,
      fullName: this.buildName(),
      paths: this.getPaths().map(path => path.toJSON()),
      zIndex: this._zIndex,
      transform: this.transform.toJSON(),
      isAnimated: this.isAnimated,
      animatedOnKeyframes: this._animatedOnKeyframes,
    };
  }
  //#endregion
}

export interface GroupJSON extends DrawingElementJSON {
  type: DrawingElementType.group;
  paths: PathJSON[];
}
