import _ from 'lodash';

import { DrawingElement, DrawingElementObject } from './DrawingElement';
import { Path, PathObject } from './Path';
import { Transform } from '../Transform';
import { last } from '../utils';
import { DrawingData, ObjectLiteral } from '../types';

export class Group extends DrawingElement {

  static readonly type: 'group' = 'group';
  private static count = 0;
  protected _parsed: GroupObject | undefined;

  id = `group-${Group.count}`;
  elements: DrawingElement[] = [];
  elementsMap: Record<string, DrawingElement> = {};


  constructor(data: ObjectLiteral) {
    super(data);

    Group.count++;
  }

  //#region create elements
  path(data: DrawingData): Path {
    const path = new Path(this.data);
    const { name, zIndex, stroke, fill, strokeWidth } = data;

    path
      .namespace(this.buildName())
      .setName(name)
      .zIndex(zIndex)
      .stroke(stroke ?? 'none')
      .fill(fill ?? 'none')
      .strokeWidth(strokeWidth ?? 1);

    this.addElement(path);

    return path;
  }

  group(name: string, draw: (drawer: Group) => void): this {
    const group = new Group(this.data);

    group.namespace(this.buildName()).name(name);
    draw(group);
    this.addElement(group);

    return this;
  }
  //#endregion

  //#region public API
  isEmpty(): boolean {
    return !this.elements.length;
  }

  exec(executor: (group: this) => any): this {
    executor(this);
    return this;
  }

  findGroup(group: Group): Group | undefined {
    return this.getGroups().find(currentGroup => {
      const isCorrectNamespace = currentGroup.getNamespace() === group.getNamespace();
      const isCorrectName = currentGroup.getName() === group.getName();

      if (isCorrectNamespace && isCorrectName) {
        return currentGroup;
      }
    });
  }

  findPath(path: Path): Path | undefined {
    return this.getPaths().find(currentPath => {
      const isCorrectNamespace = currentPath.getNamespace() === path.getNamespace();
      const isCorrectName = currentPath.getName() === path.getName();

      if (isCorrectNamespace && isCorrectName) {
        return currentPath;
      }
    });
  }

  getGroups(): Group[] {
    let groups: Group[] = [];

    for (const element of this.elements) {
      if (element instanceof Group) {
        groups.push(element);
        groups = groups.concat(element.getGroups());
      }
    }

    return groups;
  }

  getPaths(): Path[] {
    let paths: Path[] = [];

    for (const element of this.elements) {
      if (element instanceof Group) {
        paths = paths.concat(element.getPaths());
      } else if (element instanceof Path) {
        paths.push(element);
      }
    }

    return paths;
  }
  //#endregion

  //#region helpers
  addElement(element: DrawingElement): this {
    this.elementsMap[element.getName()] = element;
    this.elements.push(element);
    return this;
  }

  protected lastElement(): DrawingElement | undefined {
    return last(this.elements);
  }
  //#endregion

  //#region parsing
  toObject(): GroupObject {
    return this._parsed ??= {
      type: Group.type,
      id: this.id,
      name: this.buildName(),
      zIndex: this._zIndex,
      transform: this._transform.toObject(),
      children: this.elements.map(elm => elm.toObject()),
    };
  }

  static fromObject(data: GroupObject): Group {
    const group = new Group({});
    group.id = data.id;
    group._transform = Transform.fromObject(data.transform);
    group._name = data.name;
    group._zIndex = data.zIndex;

    group.elements = data.children.map(element => {
      switch (element.type) {
        case Path.type:
          return Path.fromObject(element as PathObject);
        case Group.type:
          return Group.fromObject(element as GroupObject);

        default:
          throw new Error(`Invalid element '${element.type}'`);
      }
    });

    return group;
  }
  //#endregion
}

export interface GroupObject extends DrawingElementObject {
  type: 'group';
  id: string;
  children: DrawingElementObject[];
}
